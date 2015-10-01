package ru.tonyware.pump.message.incoming;

/**
 * Created by Anton Rudenko on 30.09.15.
 */
public class EnableLogMessage extends IncomingMessage {

    public String log;

    @Override
    public IncomingMessageType getType() {
        return IncomingMessageType.ENABLE_LOG;
    }
}
