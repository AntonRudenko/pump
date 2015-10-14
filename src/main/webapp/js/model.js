/**
 * Created by dark on 07.10.15.
 */
function Log(name, color) {
    this.name = name;
    this.enabled = true;
    this.messages = [];
    this.color = color;

    this.addMessage = function(message) {
        this.messages.push(message);
    }
}

function Message(id, content, level, isException) {
    this.content = content;
    this.level = level;
    this.isException = isException;
    this.id = id;
}

function LogList() {
    var logs = [];

    this.addLog = function(log) {
        logs.push(log);
    };

    this.addMessage = function(log, message) {
        findLog(log).addMessage(message);
    };

    this.getLogList = function() {
        return logs;
    };

    this.findLastException = function(logName) {
        var log = findLog(logName);
        var message;
        for (var i = log.messages.length - 1; i >= 0; i--) {
            message = log.messages[i];
            if (message.isException) return message;
        }
        return null;
    };

    this.findLog = function(logName) {
        return findLog(logName);
    };

    var findLog = function(logName) {
        return logs.find(log => log.name == logName)
    };


}

var MessageTypes = {
    EXCEPTION : "EXCEPTION",
    EXCEPTION_BODY : "EXCEPTION_BODY",
    COMMON: "COMMON"
};
