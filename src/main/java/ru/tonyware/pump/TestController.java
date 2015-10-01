package ru.tonyware.pump;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by Anton Rudenko on 23.09.15.
 */
@RestController
public class TestController {

    @Autowired
    private LogsService logsService;

    private final Logger logger = LoggerFactory.getLogger(TestController.class);

    @RequestMapping(value = "/test/sendMessage", method = RequestMethod.POST)
    public void sendMessage(@RequestParam String message) {
        logsService.sendMessage("test", message);
    }

    @RequestMapping(value = "/test/exception", method = RequestMethod.POST)
    public void sendException() {
        logger.error("exception", new RuntimeException("Just test exception"));
    }
}
