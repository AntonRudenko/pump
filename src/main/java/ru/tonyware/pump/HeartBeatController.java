package ru.tonyware.pump;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by dark on 25.03.15.
 */
@RestController
@RequestMapping(value = "/heartbeat")
public class HeartBeatController {

    @RequestMapping(method = RequestMethod.GET)
    public String test() {
        return "I'm alive!";
    }

}
