package ru.tonyware.pump;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import ru.tonyware.pump.message.incoming.*;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Created by Anton Rudenko on 23.09.15.
 */
public class Handler extends TextWebSocketHandler {

    @Autowired
    private LogsService logsService;

    private final Logger logger = LoggerFactory.getLogger(Handler.class);
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final Pattern messagePattern = Pattern.compile(".*\"type\":\"(\\w*)\".*");

    @PostConstruct
    public void init() {
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) {
        logger.info("IncomingMessage: {}", message);

        IncomingMessageType incomingMessageType = getIncomingMessageType(message.getPayload());
        IncomingMessage incomingMessage = deserialiseMessage(message.getPayload(), incomingMessageType);

        switch (incomingMessage.getType()) {
            case REGISTER:
                logsService.addClient(session);
                break;
            case UNREGISTER:
                logsService.removeClient(session);
                break;
            case ENABLE_LOG:
                EnableLogMessage enableLogMessage = ((EnableLogMessage) incomingMessage);
                logsService.enableLog(session, enableLogMessage.log);
                break;
            case DISABLE_LOG:
                DisableLogMessage disableLogMessage = ((DisableLogMessage) incomingMessage);
                logsService.disable(session, disableLogMessage.log);
                break;
            case LOG_LIST:
                logsService.sendLogList(session);
                break;
            default:
                throw new RuntimeException("Unhandled message type: " + incomingMessage.getType());

        }

    }

    private IncomingMessageType getIncomingMessageType(String body) {
        Matcher matcher = messagePattern.matcher(body);
        if (!matcher.matches()) throw new RuntimeException("Unknown message type");

        String typeStr = matcher.group(1);

        return IncomingMessageType.valueOf(typeStr);
    }

    private IncomingMessage deserialiseMessage(String body, IncomingMessageType incomingMessageType) {
        try {
            return (IncomingMessage) objectMapper.readValue(body, incomingMessageType.getClazz());
        } catch (IOException e) {
            throw new RuntimeException("Can't deserialise message", e);
        }
    }

}
