package ru.tonyware.pump;

import org.apache.commons.io.input.TailerListenerAdapter;

/**
 * Created by Anton Rudenko on 26.09.15.
 */
public class LogTailerListenerAdapter extends TailerListenerAdapter {

    private String logName;
    private LogsService logsService;

    public LogTailerListenerAdapter(String logName, LogsService logsService) {
        this.logName = logName;
        this.logsService = logsService;
    }

    @Override
    public void handle(String line) {
        logsService.sendMessage(logName, line);
    }

}
