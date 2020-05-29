var index = 1;
var selectNumber = 0;
var defaultBackground = "#267de8";
var defaultText = "#ff0000";

function output() {
    //get input number
    let first_number = $("#first_number").val();
    let last_number = $("#last_number").val();
    //add number array in output
    if (first_number < last_number) {
        for (let i = first_number; i <= last_number; i++) {
            let html = "<div id='index-" + index + "' class='output-cell' onclick='select_number(" + index + ")'>" + i + "</div>";
            $(".output-container").append(html);
            index++;
        }
    } else {
        for (let i = first_number; i >= last_number; i--) {
            let html = "<div id='index-" + index + "' class='output-cell' onclick='select_number(" + index + ")'>" + i + "</div>";
            $(".output-container").append(html);
            index++;
        }
    }
}

function select_number(value) {
    selectNumber = value;
    //set default background and text color
    $("#back_color").val(defaultBackground);
    $("#text_color").val(defaultText);
    //set default background and text color in selected number
    $(".output-cell").each(function() {
        if ($(this).hasClass("background-active") == false) {
            $(this).css("background-color", "white");
        }
        if ($(this).hasClass("text-active") == false) {
            $(this).css("color", "black");
        }
    });
    //remove style of previous selected number
    if ($("#index-" + value).hasClass("text-active") == false) {
        $("#index-" + value).css("color", defaultText);
    }
    if ($("#index-" + value).hasClass("background-active") == false) {
        $("#index-" + value).css("background-color", defaultBackground);
    }
}

function change_text(value) {
    if (selectNumber == 0) {
        //If no number selected
        return;
    } else {
        //If a number selected, set text color
        $("#index-" + selectNumber).css("color", value);
        $("#index-" + selectNumber).addClass("text-active");
    }
}

function change_background(value) {
    if (selectNumber == 0) {
        //If no number selected
        return;
    } else {
        //If a number selected, set background color
        $("#index-" + selectNumber).css("background-color", value);
        $("#index-" + selectNumber).addClass("background-active");
    }
}

function prev_select() {
    $("#index-" + selectNumber).prev().click();
}

function next_select() {
    $("#index-" + selectNumber).next().click();
}

function delete_number() {
    $("#index-" + selectNumber).css("display", "none");
    $("#index-" + selectNumber).prev().click();
}