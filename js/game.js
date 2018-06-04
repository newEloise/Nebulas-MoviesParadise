$(document).ready(function () {
    var movieNameArray = ["1","2","3","4","5","6","7","8","9","10"];

    $("#noBox").empty();
    $("#movieBox").empty();
    for(var i=0; i<movieNameArray.length; i++){
        $("#noBox").append('<li><div>'+(i+1)+'</div></li>');
        $("#movieBox").append('<li><div><img src="images/game/'+movieNameArray[i]+'.jpg"></div></li>');
    }
    $('.box1').polygon({
        width: 70,
        height: 70,
        timer: 0
    });
    $('.box2').polygon({
        width: 120,
        height: 120,
        timer: 0
    });
});