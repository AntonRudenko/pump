var socket = new WebSocket("ws://localhost:8080/logs");
var logList = new LogList();
var logAnalyser = new LogAnalyser();
var messageIdHolder = 0;
var defaultLogColor = "#17becf";

//utility methods

var getMessageType = function(str) {
    if (logAnalyser.isNewException(str)) return MessageTypes.EXCEPTION;
    if (logAnalyser.isExceptionBody(str)) return MessageTypes.EXCEPTION_BODY;
    return MessageTypes.COMMON;
};

//utility methods

outgoingMessageType = [
    'REGISTER',
    'UNREGISTER',
    'ENABLE_LOG',
    'DISABLE_LOG',
    'LOG_LIST'
];

socket.onopen = function() {

    var registerMessage = {
        type: 'REGISTER'
    };
    socket.send(JSON.stringify(registerMessage)) ;

    var requestLogsMessage = {
        type: 'LOG_LIST'
    };
    socket.send(JSON.stringify(requestLogsMessage)) ;
};

//socket.onclose = function() {
//    var registerMessage = {
//        type: 'UNREGISTER'
//    };
//    socket.send(JSON.stringify(registerMessage)) ;
//};

outgoingMessageType = [
    'LOG',
    'LOG_LIST'
];

socket.onmessage = function(event) {
    var $log = $("#log");
    var message = JSON.parse(event.data);

    switch (message.type) {
        case "LOG":
            messageIdHolder++;
            var messageType = getMessageType(message.message);
            switch (messageType) {
                case MessageTypes.COMMON:
                    $log.append(`
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
                    $log.append(`
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
            break;
        case "LOG_LIST":
            var $logList = $("#logList");
            $logList.empty();
            message.logList.forEach(function(log) {
                $logList.append(`
                    <div>
                        <input type='checkbox' checked='1' id='${log.name}'/> <div id = "${log.name}-color-picker" class="color-picker"/>${log.name}
                    </div>
                `);

                var logModel = new Log(log.name, defaultLogColor);

                var logColorPicker = $(`#${log.name}-color-picker`);
                logColorPicker.css({'background-color': defaultLogColor});
                logColorPicker.ColorPicker(
                    {
                        onSubmit: function(hsb, hex, rgb, el) {
                            $(el).css({'background-color': hex});
                            $(el).ColorPickerHide();
                            logModel.color = hex;
                        }
                    }
                );

                logList.addLog(logModel)
            });


            $logList.find("input:checkbox").click(function () {
                var $this = $(this);
                // $this will contain a reference to the checkbox
                var log = $this.attr("id")
                if ($this.is(':checked')) {
                    var enableLogMessage = {
                        type: 'ENABLE_LOG',
                        log: log
                    };
                    findLog(log).enabled = true;
                    socket.send(JSON.stringify(enableLogMessage));
                } else {
                    var disableLogMessage = {
                        type: 'DISABLE_LOG',
                        log: log
                    };
                    findLog(log).enabled = false;
                    socket.send(JSON.stringify(disableLogMessage));
                }
            });
            break;
        default:
            console.error("unknown message type " + message.type);
    }

};

