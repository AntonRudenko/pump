package ru.tonyware.pump;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;
import ru.tonyware.pump.message.outgoing.LogListMessage;
import ru.tonyware.pump.message.outgoing.LogMessage;
import ru.tonyware.pump.message.outgoing.OutgoingMessageSender;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by Anton Rudenko on 24.09.15.
 */
@Service
public class LogsService {

    @Autowired
    private OutgoingMessageSender sender;

    private final Logger logger = LoggerFactory.getLogger(LogsService.class);

    private List<WebSocketSession> clients = new ArrayList<>();

    private List<Log> logList = new ArrayList<>();

    private final ObjectMapper objectMapper = new ObjectMapper();

    public void addClient(WebSocketSession session) {
        clients.add(session);
    }

    public void removeClient(WebSocketSession session) {
        clients.remove(session);
    }

    public void sendMessage(String log, String message) {
        clients.forEach(c -> sender.sendMessage(c, new LogMessage(log, message)));
    }

    public void addLog(Log log) {
        logList.add(log);
    }

    public List<Log> getLogList() {
        return logList;
    }

    public void enableLog(WebSocketSession session, String log) {
        // do nothing for a moment
    }

    public void disable(WebSocketSession session, String log) {
        // do nothing for now
    }

    public void sendLogList(WebSocketSession session) {
        sender.sendMessage(session, new LogListMessage(logList));
    }
}
