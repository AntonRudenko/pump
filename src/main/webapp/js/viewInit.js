$(document).ready(
    function () {
        $("#log").niceScroll();
        $(".jq-clearAll").click(function () {
            $("#log").empty();
            logList.clearMessages()
        })

        $(".jq-rerender").click(() => {
            logRenderer.rerender()
        })

        $(".jq-filter-button").click(() => {
            var filter = $(".jq-filter-text").val()
            logRenderer.rerender(new SimpleSearchFilter(filter))
        })

        $(".jq-filter-level-button-up").click(() => {
            var level = $(".jq-filter-level-select").val()
            logRenderer.rerender(new LogLevelRangeFilterUp(level))
        })

        $(".jq-filter-level-button-down").click(() => {
            var level = $(".jq-filter-level-select").val()
            logRenderer.rerender(new LogLevelRangeFilterDown(level))
        })
    }
);
