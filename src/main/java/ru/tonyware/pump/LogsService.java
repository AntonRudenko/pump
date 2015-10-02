package ru.tonyware.pump;

import com.fasterxml.jackson.databind.ObjectMapper;
import io.undertow.server.session.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;
import ru.tonyware.pump.message.outgoing.LogListMessage;
import ru.tonyware.pump.message.outgoing.LogMessage;
import ru.tonyware.pump.message.outgoing.OutgoingMessageSender;

import java.util.*;
import java.util.stream.Collectors;

/**
 * Created by Anton Rudenko on 24.09.15.
 */
@Service
public class LogsService {

    @Autowired
    private OutgoingMessageSender sender;

    private final Logger logger = LoggerFactory.getLogger(LogsService.class);
    private List<Log> logList = new ArrayList<>();
    private Map<WebSocketSession, Set<String>> clientToLogsMap = new HashMap<>();

    public void addClient(WebSocketSession session) {
        clientToLogsMap.put(session, logList.stream().map(Log::getName).collect(Collectors.toSet()));
    }

    public void removeClient(WebSocketSession session) {
        clientToLogsMap.remove(session);
    }

    public void sendMessage(String log, String message) {
        clientToLogsMap.forEach( (client, logSet) -> {
            if (logSet.contains(log)) sender.sendMessage(client, new LogMessage(log, message));
        });
    }

    public void addLog(Log log) {
        logList.add(log);
    }

    public List<Log> getLogList() {
        return logList;
    }

    public void enableLog(WebSocketSession session, String log) {
        if (!clientToLogsMap.containsKey(session)) return;
        clientToLogsMap.get(session).add(log);
    }

    public void disable(WebSocketSession session, String log) {
        if (!clientToLogsMap.containsKey(session)) return;
        clientToLogsMap.get(session).remove(log);
    }

    public void sendLogList(WebSocketSession session) {
        sender.sendMessage(session, new LogListMessage(logList));
    }
}
