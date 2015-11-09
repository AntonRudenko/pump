function LogRenderer(alogList) {
    var logList = alogList;

    var $log = $("#log");
    var messageIdHolder = 0;
    var logAnalyser = new LogAnalyser();

    this.addMessage = (message) => {
        addLogMessage(message)
    };

    this.rerender = (filter) => {
        // cleaning
        messageIdHolder = 0;
        get$Log().empty()

        //rearange messages by date
        var messageList = []
        logList.getLogList().forEach( (l) => {
            if (l.enabled) {
                l.messages.forEach( (m) => {
                    messageList.push(m)
                })
            }
        })

        // filtering
        if (filter) {
            messageList = messageList.filter( (m) =>  filter.filter(m))
        }

        // sort by creation date
        messageList.sort((m1, m2) => {return m1.dateCreated.getTime() - m2.dateCreated.getTime()})

        messageList.forEach(message => {
            messageIdHolder++
            if (!message.isException) {
                get$Log().append(`
                        <div id="message${messageIdHolder}">
                            <p class='logEntry'>
                                <span class='logName' style='color: ${message.log.color}'>${message.log.name}</span>
                                <span class='logEntryMessage'>${message.content}</span>
                            </p>
                        </div>
                    `);
            } else {
                get$Log().append(`
                        <div id="message${messageIdHolder}">
                            <p class='logEntry'>
                                <span class='logName mainLogName' style='color: ${message.log.color}'>${message.log.name}</span>
                                <span class='logEntryMessage'>${message.getExceptionHeader()}</span>
                            </p>
                        </div>
                    `);

                var messageBodyList = message.getExceptionBody()
                if (messageBodyList.length != 0) {
                    var $exception = $(`#message${messageIdHolder}`);

                    $exception.append(`<div class="exceptionBody"></div>`)
                    var $exceptionBody = $(`#message${messageIdHolder}`).find(`.exceptionBody`)

                    // hide exception under hood
                    $exceptionBody.slideToggle('fast');

                    var $mainLogName = $exception.find('.mainLogName');
                    $mainLogName.css({'text-decoration': 'underline'})

                    $exception.click(function(){
                        if (!$exceptionBody.is(":visible")) {
                            $mainLogName.css({'text-decoration': 'none'})
                        } else {
                            $mainLogName.css({'text-decoration': 'underline'})
                        }
                        $exceptionBody.slideToggle('fast', () => $("#log").getNiceScroll().resize());
                    })

                    // write all body messages
                    message.getExceptionBody().forEach(b => {
                        $exceptionBody.append(`
                          <p class='logEntry'>
                                <span class='logName' style='color: ${message.log.color}'>| ${message.log.name}</span>
                                <span class='logEntryMessage'>${b}</span>
                          </p>
                        `);
                    })
                }

            }
        })

    };

    var get$Log = () => {
        if ($log) return $log;
        var $log = $("#log");
        return $log;
    };

    var getMessageType = function(str) {
        if (logAnalyser.isNewException(str)) return MessageTypes.EXCEPTION;
        if (logAnalyser.isExceptionBody(str)) return MessageTypes.EXCEPTION_BODY;
        return MessageTypes.COMMON;
    };

    var addLogMessage = function(message) {
        messageIdHolder++;
        var messageType = getMessageType(message.message);
        switch (messageType) {
            case MessageTypes.COMMON:
                get$Log().append(`
                        <div id="message${messageIdHolder}">
                            <p class='logEntry'>
                                <span class='logName' style='color: ${logList.findLog(message.log).color}'>${message.log}</span>
                                <span class='logEntryMessage'>${message.message}</span>
                            </p>
                        </div>
                    `);
                logList.addMessage(message.log, new Message(messageIdHolder, message.message, logAnalyser.getLevel(message.message), false));
                // just create new message and append it
                break;
            case MessageTypes.EXCEPTION:
                get$Log().append(`
                        <div id="message${messageIdHolder}">
                            <p class='logEntry'>
                                <span class='logName mainLogName' style='color: ${logList.findLog(message.log).color}'>${message.log}</span>
                                <span class='logEntryMessage'>${message.message}</span>
                            </p>
                        </div>
                    `);
                logList.addMessage(message.log, new Message(messageIdHolder, message.message, logAnalyser.getLevel(message.message), true));
                // create new message and append it:
                break;
            case MessageTypes.EXCEPTION_BODY:
                // find last exception and append string to it;
                var exception = logList.findLastException(message.log);
                if (exception == null) throw "Can't find exception";
                exception.content += "\n";
                exception.content += message.message;

                var $exceptionBody = $(`#message${exception.id}`).find(`.exceptionBody`);
                if ($exceptionBody.size() == 0) {
                    var $exception = $(`#message${exception.id}`);

                    var $mainLogName = $exception.find('.mainLogName');

                    $exception.append(`<div class="exceptionBody"></div>`)
                    var $exceptionBody = $(`#message${exception.id}`).find(`.exceptionBody`)

                    // hide exception under hood
                    $exceptionBody.slideToggle('fast');
                    $mainLogName.css({'text-decoration': 'underline'})

                    $exception.click(function(){
                        if (!$exceptionBody.is(":visible")) {
                            $mainLogName.css({'text-decoration': 'none'})
                        } else {
                            $mainLogName.css({'text-decoration': 'underline'})
                        }
                        $exceptionBody.slideToggle('fast', () => $("#log").getNiceScroll().resize());
                    })

                }

                $exceptionBody.append(`
                          <p class='logEntry'>
                                <span class='logName' style='color: ${logList.findLog(message.log).color}'>| ${message.log}</span>
                                <span class='logEntryMessage'>${message.message}</span>
                          </p>
                    `);
                break;
            default:
                console.error("unknown message type " + messageType);
        }
    }
}