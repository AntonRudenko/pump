package ru.tonyware.pump.message.outgoing;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.websocket.Session;
import java.io.IOException;

/**
 * Created by Anton Rudenko on 30.09.15.
 */
@Component
public class OutgoingMessageSender {

    private final ObjectMapper objectMapper = new ObjectMapper();

    private final static Logger logger = LoggerFactory.getLogger(OutgoingMessageSender.class);

    public Boolean sendMessage(WebSocketSession session, OutgoingMessage message) {
        if (!session.isOpen()) return false;

        try {
            session.sendMessage(new TextMessage(
                    objectMapper.writeValueAsString(message)
            ));
        } catch (IOException e) {
            logger.error("Can't send message to websocekt client", e);
            return false;
        }

        return true;
    }
}
