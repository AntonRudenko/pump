package ru.tonyware.pump.message.incoming;

/**
 * Created by Anton Rudenko on 30.09.15.
 */
public class DisableLogMessage extends IncomingMessage {

    public String log;

    @Override
    public IncomingMessageType getType() {
        return IncomingMessageType.DISABLE_LOG;
    }
}