package ru.tonyware.pump.message.outgoing;

/**
 * Created by Anton Rudenko on 30.09.15.
 */
public class LogMessage extends OutgoingMessage {

    public String log;
    public String message;

    public LogMessage() {
    }

    public LogMessage(String log, String message) {
        this.log = log;
        this.message = message;
    }

    @Override
    public OutgoingMessageType getType() {
        return OutgoingMessageType.LOG;
    }
}
