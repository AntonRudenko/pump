package ru.tonyware.pump.message.incoming;

/**
 * Created by Anton Rudenko on 30.09.15.
 */
public enum IncomingMessageType {
    REGISTER(RegisterMessage.class),
    UNREGISTER(UnregisterMessage.class),
    ENABLE_LOG(EnableLogMessage.class),
    DISABLE_LOG(DisableLogMessage.class),
    LOG_LIST(RequestLogListMessage.class);

    private Class clazz;

    IncomingMessageType(Class clazz) {
        this.clazz = clazz;
    }

    public Class getClazz() {
        return clazz;
    }
}
