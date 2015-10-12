function LogAnalyser() {

    var levelRegex = /(FINEST|FINER|FINE|CONFIG|INFO|WARNING|SEVERE|ERROR).*/;

    var exceptionBodyRegex = /at .*/;
    var exceptionBodyRegexFirstString = /java\.lang.*/;
    var exceptionBodyRegexCause = /Caused by:.*/;
    var exceptionBodyTail = /\.\.\. \d+ more/;

    var newExceptionLogger = /(FINEST|FINER|FINE|CONFIG|INFO|WARNING|SEVERE|ERROR).*exception/;
    var newException = /Exception in thread ".*" java\.lang\..*:\s*/;

    this.isNewException = function (str) {
        var isNewExceptionLogger = str.search(newExceptionLogger) != -1;
        var isNewException = str.search(newException) != -1;
        return isNewExceptionLogger || isNewException;
    };

    this.isExceptionBody = function (str) {
        var isBody = str.search(exceptionBodyRegex) != -1;
        var isBodyFirstString = str.search(exceptionBodyRegexFirstString) != -1;
        var isBodyCause = str.search(exceptionBodyRegexCause) != -1;
        var isBodyTail = str.search(exceptionBodyTail) != -1;
        return isBody || isBodyFirstString || isBodyCause || isBodyTail;
    };

    this.getLevel = function (str) {
        var matches = str.match(levelRegex);
        if (matches && matches.length != 0) return matches[1];
        return "";
    }

}



