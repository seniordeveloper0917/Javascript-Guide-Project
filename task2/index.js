var historyArray = new Array();
var historyIndex = 0;
var latestStr = new Array();
var flag = true;
var str = new Array();
var successArray = new Array();
var num = 0;
var option = 3;

$(document).ready(function() {
    init();
});

function init() {
    redraw();
    getRandomNumber();
    arrangeNumber();
    historyArray.push(str.slice());
    historyIndex++;
}

function redraw() {
    var html = "";
    $(".row-cell").css("width", (option * 100 + 5) + "px");
    $(".row-cell").css("height", (option * 100 + 5) + "px");
    for (var i = 1; i < option * option; i++) {
        html += "<div class = 'card' id = 'card-" + i + "'>" + i + "</div>";
    }
    $(".row-cell").html(html);
}

function arrangeNumber() {
    for (i = 0; i < str.length; i++) {
        $(`#card-${str[i]}`).animate({
            left: (i % option) * 100
        }, 400);
        $(`#card-${str[i]}`).animate({
            top: (parseInt(i / option)) * 100
        }, 400);
    }
}

function getRandomNumber() {
    ranNums = [];
    var nums = [],
        ranNums = [],
        i = nums.length,
        j = 0;

    for (var i = 1; i < option * option; i++) {
        nums.push(i);
    }
    i--;
    while (i--) {
        j = Math.floor(Math.random() * (i + 1));
        ranNums.push(nums[j]);
        nums.splice(j, 1);
    }
    str = ranNums;
    str.push(0);
}

function getZero(val) {
    return val == 0;
}

function moveCard(x, val) {
    if (x == 10000)
        x = option;
    else if (x == 10001)
        x = option - option * 2;
    currentPosition = str.findIndex(getZero);
    targetPosition = parseInt(currentPosition + x);
    targetNumber = str[targetPosition];
    if (targetNumber != undefined && parseInt(targetPosition / option) == parseInt(currentPosition / option) || targetNumber != undefined && parseInt(targetPosition % option) == parseInt(currentPosition % option)) {
        str[currentPosition] = "A";
        str[targetPosition] = 0;
        str[currentPosition] = targetNumber;
        checkResult();
        arrangeNumber();
        if (val == 0) {
            num = num + 1;
            $('#count').html(num);
            historyArray.push(str.slice());
            historyIndex++;
            latestStr = str.slice();
        }
    } else {
        if (val == 1)
            historyIndex++;
        else if (val == 2)
            historyIndex--;
    }
}

function reset() {
    getRandomNumber();
    arrangeNumber();
    num = 0;
    $('#count').html(num);
    historyArray = new Array();
    historyIndex = 0;
}

function undo() {
    if (historyIndex == 1) {
        return;
    }
    historyIndex--;
    moveCard(historyArray[historyIndex - 1].findIndex(getZero) - str.findIndex(getZero), 1);
}

function redo() {
    if (isEqual(str, latestStr)) {
        return;
    }
    historyIndex++;
    moveCard(historyArray[historyIndex - 1].findIndex(getZero) - str.findIndex(getZero), 2);
}

function checkResult() {
    for (var i = 1; i < option * option; i++) {
        successArray.push(i);
    }
    successArray.push(0);
    if (isEqual(str, successArray)) {
        alert("Success! Congratulate!");
    }
    return;
}

function changeOption(val) {
    option = parseInt(val);
    init();
}

function isEqual(a, b) {
    // if length is not equal 
    if (a.length != b.length)
        return false;
    else {
        // comapring each element of array 
        for (var i = 0; i < a.length; i++)
            if (a[i] != b[i])
                return false;
        return true;
    }
}

$(document).keydown(function(e) {
    if (e.which == 37) {
        moveCard(1, 0);
    };
    if (e.which == 38) {
        moveCard(option, 0);
    };
    if (e.which == 39) {
        moveCard(-1, 0);
    };
    if (e.which == 40) {
        moveCard(option - option * 2, 0);
    };
})