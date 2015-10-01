var socket = new WebSocket("ws://localhost:8080/logs");

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
    var message = JSON.parse(event.data);

    switch (message.type) {
        case "LOG":
            $("#log").append("<div>" + message.log + ": " + event.data + "</div>")
            break;
        case "LOG_LIST":
            var controls = $("#controls");
            controls.empty();
            message.logList.forEach(function(log) {
                controls.append("<div>");
                controls.append("<input type='checkbox' checked='1' id='" + log.name + "'/>");
                controls.append(log.name);
                controls.append("</div>");
            });

            controls.find("input:checkbox").click(function () {
                var $this = $(this);
                // $this will contain a reference to the checkbox
                if ($this.is(':checked')) {
                    var enableLogMessage = {
                        type: 'ENABLE_LOG',
                        log: $this.attr("id")
                    };
                    socket.send(JSON.stringify(enableLogMessage));
                } else {
                    var disableLogMessage = {
                        type: 'DISABLE_LOG',
                        log: $this.attr("id")
                    };
                    socket.send(JSON.stringify(disableLogMessage));
                }
            });
            break;
        default:
            console.error("unknown message type " + message.type);
    }

};
