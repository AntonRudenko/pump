package ru.tonyware.pump.message.outgoing;

import ru.tonyware.pump.Log;

import java.util.List;

/**
 * Created by Anton Rudenko on 30.09.15.
 */
public class LogListMessage extends OutgoingMessage {

    public List<Log> logList;

    public LogListMessage() {
    }

    public LogListMessage(List<Log> logList) {
        this.logList = logList;
    }

    @Override
    public OutgoingMessageType getType() {
        return OutgoingMessageType.LOG_LIST;
    }
}
