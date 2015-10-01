package ru.tonyware.pump.message.incoming;

/**
 * Created by Anton Rudenko on 30.09.15.
 */
public class RequestLogListMessage extends IncomingMessage {

    @Override
    public IncomingMessageType getType() {
        return IncomingMessageType.LOG_LIST;
    }
}
