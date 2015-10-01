package ru.tonyware.pump;

import org.apache.commons.io.input.Tailer;
import org.apache.commons.io.input.TailerListenerAdapter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Properties;

/**
 * Created by Anton Rudenko on 26.09.15.
 */
@Service
public class LogTailService {

    @Autowired
    private LogsService logsService;

    @Autowired
    @Qualifier("logs")
    private Properties properties;

    List<Tailer> tailerList = new ArrayList<>();

    @PostConstruct
    public void init() {
        for (Map.Entry<Object, Object> log : properties.entrySet()) {
            String logName = ((String) log.getKey());
            String path = ((String) log.getValue());

            TailerListenerAdapter tailerListenerAdapter = new LogTailerListenerAdapter(logName, logsService);

            Tailer tailer = Tailer.create(new File(path), tailerListenerAdapter);
            tailerList.add(tailer);

            logsService.addLog(new Log(logName, path));
        }         
    }

    @PreDestroy
    public void shutdown() {
        tailerList.forEach(Tailer::stop);
    }
    
}
