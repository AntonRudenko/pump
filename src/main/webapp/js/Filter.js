function SimpleSearchFilter(filterVal) {
    this.filterVal = filterVal

    this.filter = function(message) {
        return message.content.indexOf(filterVal) != -1
    }
}

function LogLevelRangeFilterUp(level) {
    var levels = LOG_LEVEL.slice(LOG_LEVEL.indexOf(level))

    this.filter = function(message) {
        return levels.indexOf(message.level) != - 1
    }
}

function LogLevelRangeFilterDown(level) {
    var levels = LOG_LEVEL.slice(0, LOG_LEVEL.indexOf(level) + 1)

    this.filter = function(message) {
        return levels.indexOf(message.level) != - 1
    }
}