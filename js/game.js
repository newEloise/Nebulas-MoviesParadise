$(document).ready(function () {
    var movieNameArray = ["三傻大闹宝莱坞","乱世佳人","大话西游之大圣娶亲","天堂电影院","少年派的奇幻漂流",
        "当幸福来敲门", "忠犬八公的故事","怦然心动","搏击俱乐部","放牛班的春天",
        "教父","无间道","星际穿越","机器人总动员","楚门的世界",
        "泰坦尼克号", "活着","海上钢琴师","熔炉","盗梦空间",
        "美丽人生","肖申克的救赎","蝙蝠侠：黑暗骑士","触不可及","辛德勒的名单",
        "这个杀手不太冷","闻香识女人","阿甘正传","霸王别姬","鬼子来了"];
    var idArr = [];
    var tenMovieArray = [];

    var startFlag = 0;
    $("#start").click(function () {
        setTenMovie();
        startFlag = 1;
    });

    $("#refresh").click(function () {
        if(startFlag != 1){
            layer.alert('请先点击开始游戏再点击刷新！', {icon: 7});
            return;
        }
        setTenMovie();
    });

    function setTenMovie(){
        idArr = [];
        tenMovieArray = [];
        var json = {};
        while(idArr.length < 10){
            var k = Math.round(Math.random()*30) - 1;
            if(!json[k]){
                json[k]=true;
                idArr.push(k);
                tenMovieArray.push(movieNameArray[k]);
            }
        }
        $("#noBox").empty();
        $("#movieBox").empty();
        for(var i=0; i<idArr.length; i++){
            $("#noBox").append('<li><div>'+(i+1)+'</div></li>');
            $("#movieBox").append('<li><div><img src="images/game/'+idArr[i]+'.jpg"></div></li>');
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
    }

    $("#push").click(function () {
        if(startFlag != 1){
            layer.alert('请先点击开始游戏后再提交答案！', {icon: 7});
            return;
        }
        var result = 0;
        if($("#movieName1").val() == tenMovieArray[0]){
            result += 1;
        }
        if($("#movieName2").val() == tenMovieArray[1]){
            result += 1;
        }
        if($("#movieName3").val() == tenMovieArray[2]){
            result += 1;
        }
        if($("#movieName4").val() == tenMovieArray[3]){
            result += 1;
        }
        if($("#movieName5").val() == tenMovieArray[4]){
            result += 1;
        }
        if($("#movieName6").val() == tenMovieArray[5]){
            result += 1;
        }
        if($("#movieName7").val() == tenMovieArray[6]){
            result += 1;
        }
        if($("#movieName8").val() == tenMovieArray[7]){
            result += 1;
        }
        if($("#movieName9").val() == tenMovieArray[8]){
            result += 1;
        }
        if($("#movieName10").val() == tenMovieArray[9]){
            result += 1;
        }
        if(result < 5){
            layer.alert('再接再厉哦，10道题目答对了'+result+'题！', {icon: 5});
        }else{
            layer.alert('恭喜你，10道题目答对了'+result+'题！', {icon: 6});
        }
    });


});