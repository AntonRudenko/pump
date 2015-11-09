var socket = new WebSocket("ws://localhost:8080/logs");
var logList = new LogList();
var logRenderer = new LogRenderer(logList);
var logAnalyser = new LogAnalyser();
var messageIdHolder = 0;
var defaultLogColor = "#17becf";

//utility methods

var getMessageType = function(str) {
    if (logAnalyser.isNewException(str)) return MessageTypes.EXCEPTION;
    if (logAnalyser.isExceptionBody(str)) return MessageTypes.EXCEPTION_BODY;
    return MessageTypes.COMMON;
};

var LOG_LEVEL = ['FINEST', 'FINER', 'FINE', 'CONFIG', 'INFO', 'WARNING', 'SEVERE', 'ERROR'];

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
            logRenderer.addMessage(message)
            break;
        case "LOG_LIST":
            var $logList = $("#logList");
            $logList.empty();
            message.logList.forEach(function(log) {
                $logList.append(`
                    <div class="logSelect">
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

            var $logCheckbox = $logList.find("input:checkbox")
            $logCheckbox.click(function () {
                var $this = $(this);
                // $this will contain a reference to the checkbox
                var log = $this.attr("id")
                if ($this.is(':checked')) {
                    var enableLogMessage = {
                        type: 'ENABLE_LOG',
                        log: log
                    };
                    logList.findLog(log).enabled = true;
                    socket.send(JSON.stringify(enableLogMessage));
                } else {
                    var disableLogMessage = {
                        type: 'DISABLE_LOG',
                        log: log
                    };
                    logList.findLog(log).enabled = false;
                    socket.send(JSON.stringify(disableLogMessage));
                }
            })

            //$logCheckbox.onoff()

            break;
        default:
            console.error("unknown message type " + message.type);
    }

};

