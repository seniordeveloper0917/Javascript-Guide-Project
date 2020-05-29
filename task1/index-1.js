$(document).on("click", ".output", function(e) {
    var flag = false;
    //get input number
    var first_number = parseInt($("#first_number").val());
    var last_number = parseInt($("#last_number").val());
    //add number array in output
    $(".output-cell").each(function() {
        if ($(this).hasClass("active")) {
            flag = true;
        }
    })
    var html = "";
    if (first_number < last_number) {
        for (var i = first_number; i <= last_number; i++) {
            html += "<div class='output-cell'>" + i + "</div>";
        }
    } else {
        for (var i = first_number; i >= last_number; i--) {
            html += "<div class='output-cell'>" + i + "</div>";
        }
    }
    if (flag == true)
        $(".active").last().after(html);
    else
        $(".output-container").append(html);
})

$(document).on("click", ".output-cell", function(e) {
    if (e.shiftKey) {
        $(".active").removeClass("active");
        $(".end").removeClass("end");
        $(this).addClass("end");
        var flag = false;
        $(".output-cell").each(function() {
            if ($(this).hasClass("start") || $(this).hasClass("end")) {
                flag = !flag;
            }
            if (flag || $(this).hasClass("start") || $(this).hasClass("end")) {
                $(this).addClass("active");
            }
        })
    } else if (e.ctrlKey) {
        $(".start").removeClass("start");
        $(this).addClass("active start");
    } else {
        $(".active").removeClass("active");
        $(".start").removeClass("start");
        $(this).addClass("active start");
    }
})

$(document).on("change", "#text_color", function(e) {
    var value = e.target.value;
    $(".output-cell").each(function() {
        if ($(this).hasClass("active")) {
            //If a number selected, set text color
            $(this).css("color", value);
            $(this).addClass("text-active");
        }
    })
})

$(document).on("change", "#back_color", function(e) {
    var value = e.target.value;
    $(".output-cell").each(function() {
        if ($(this).hasClass("active")) {
            //If a number selected, set text color
            $(this).css("background-color", value);
            $(this).addClass("background-active");
        }
    })
})

$(document).on("click", ".previous", function(e) {
    $(".output-cell").each(function() {
        if ($(this).hasClass("active")) {
            $(this).prev().addClass("active");
            $(this).removeClass("active");
        }
    })
})

$(document).on("click", ".next", function(e) {
    $($(".output-cell").get().reverse()).each(function() {
        if ($(this).hasClass("active")) {
            $(this).next().addClass("active");
            $(this).removeClass("active");
        }
    })
})

$(document).on("click", ".delete", function(e) {
    var temp = false;
    if ($(".output-cell").first().hasClass("active")) {
        temp = true;
    }
    $(".active").prev().addClass("active").next().remove();
    if (temp == true) {
        $(".output-cell").first().remove();
        $(".output-cell").first().addClass("active");
    }
})

$(document).on("click", ".move-up", function(e) {
    $(".output-cell").each(function() {
        if ($(this).hasClass("active")) {
            if ($(this).prev().hasClass("active") == false) {
                $(this).prev().before($(this));
            }
        }
    })
})

$(document).on("click", ".move-down", function(e) {
    $($(".output-cell").get().reverse()).each(function() {
        if ($(this).hasClass("active")) {
            if ($(this).next().hasClass("active") == false) {
                $(this).next().after($(this));
            }
        }
    })
})

$(document).on("click", ".move-top", function(e) {
    $(".active").parent().prepend($(".active"));
})

$(document).on("click", ".move-bottom", function(e) {
    $(".active").parent().append($(".active"));
})