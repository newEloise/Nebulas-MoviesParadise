$(document).ready(function () {
    var NebPay = require("nebpay");
    var nebPay = new NebPay();
    //检查“webExtensionWallet”扩展是否已安装
    if(typeof(webExtensionWallet) === "undefined") {
        $("#noExtension").show();
    }

    var dappAddress = "n231D89R8Vb9WcUBjjeeLotEzhYxw97GptF";
    getRcentNews();
    getRcentMovies();

    function getRcentNews() {
        var to = dappAddress;
        var value = "0";
        var callFunction = "getRcentNews";
        var callArgs = [];
        callArgs.push("1");
        callArgs.push("10");
        nebPay.simulateCall(to, value, callFunction, JSON.stringify(callArgs), { //使用nebpay的simulateCall接口去执行get查询, 模拟执行.不发送交易,不上链
            listener: cbSearch //指定回调函数
        });
    }

    function cbSearch(resp) {
        if(!resp.result) return;
        var result = $.parseJSON(JSON.parse(resp.result));
        if(result !== 'null') {
            $("#news-list").empty();
            for(var i=0; i<result.length; i++){
                var html = $("#newsTemplate").html();
                html = html.replace("{{newsId}}",result[i].id);
                html = html.replace("{{newsId}}",result[i].id);
                html = html.replace("{{title}}",result[i].title);
                if(result[i].comment.length > 150){
                    html = html.replace("{{comment}}",result[i].comment.substring(0,147)+"...");
                }else{
                    html = html.replace("{{comment}}",result[i].comment);
                }
                html = html.replace("{{newstime}}",result[i].newstime);
                html = html.replace("{{form}}",result[i].form);
                html = html.replace("{{author}}",result[i].author);
                html = html.replace("images/news/demo.jpg",result[i].imgSrc);
                $("#news-list").append(html);
            }
        }
    }

    function getRcentMovies() {
        var to = dappAddress;
        var value = "0";
        var callFunction = "getRcentMovies";
        var callArgs = [];
        callArgs.push("1");
        callArgs.push("4");
        nebPay.simulateCall(to, value, callFunction, JSON.stringify(callArgs), { //使用nebpay的simulateCall接口去执行get查询, 模拟执行.不发送交易,不上链
            listener: cbSearch3 //指定回调函数
        });
    }

    function cbSearch3(resp) {
        debugger;
        if(!resp.result) return;
        var result = $.parseJSON(JSON.parse(resp.result));
        if(result !== 'null') {
            $("#movie-right-1").empty();
            if(result.length > 0){
                var html1 = $("#movieTemplate2").html();
                html1 = html1.replace("{{name}}",result[0].name);
                if(result[0].story.length > 100){
                    html1 = html1.replace("{{story}}",result[0].story.substring(0,97)+"...");
                }else{
                    html1 = html1.replace("{{story}}",result[0].story);
                }
                html1 = html1.replace("{{releaseDate}}",result[0].releaseDate);
                html1 = html1.replace("{{genre}}",result[0].genre);
                html1 = html1.replace("{{genreName}}",result[0].genreName);
                html1 = html1.replace("{{genreName}}",result[0].genreName);
                html1 = html1.replace("{{code}}",result[0].code);
                html1 = html1.replace("{{movieName}}",result[0].name);
                html1 = html1.replace("{{movieId}}",result[0].id);
                html1 = html1.replace("images/movie/demo.jpg",result[0].imgSrc);
                var starHtml = getStarHtml(result[0].score);
                html1 = html1.replace("{{starHtml}}",starHtml);
                $("#movie-right-1").append(html1);
            }
            $("#movie-right-2").empty();
            if(result.length > 1){
                for(var i=1; i<result.length; i++){
                    var html2 = $("#movieTemplate3").html();
                    var index = result[i].name.indexOf("：");
                    if(index > -1){
                        html2 = html2.replace("{{name}}",result[i].name.substring(0,index));
                    }else{
                        html2 = html2.replace("{{name}}",result[i].name);
                    }
                    if(result[i].story.length > 60){
                        html2 = html2.replace("{{story}}",result[i].story.substring(0,57)+"...");
                    }else{
                        html2 = html2.replace("{{story}}",result[i].story);
                    }
                    html2 = html2.replace("{{releaseDate}}",result[i].releaseDate);

                    html2 = html2.replace("{{code}}",result[i].code);
                    html2 = html2.replace("{{movieName}}",result[i].name);
                    html2 = html2.replace("{{movieId}}",result[i].id);
                    html2 = html2.replace("{{code}}",result[i].code);
                    html2 = html2.replace("{{movieName}}",result[i].name);
                    html2 = html2.replace("{{movieId}}",result[i].id);

                    html2 = html2.replace("{{heat}}",result[i].heat);
                    html2 = html2.replace("images/movie/demo.jpg",result[i].imgSrc);
                    $("#movie-right-2").append(html2);
                }
            }
        }
    }
});