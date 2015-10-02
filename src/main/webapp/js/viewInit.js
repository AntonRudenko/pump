$(document).ready(
    function() {
        $("#log").niceScroll();
        $("#clearAll").click(function() {
            $("#log").empty();
        })
    }
);
