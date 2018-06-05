$(document).ready(function () {
    var NebPay = require("nebpay");
    var nebPay = new NebPay();
    //检查“webExtensionWallet”扩展是否已安装
    if(typeof(webExtensionWallet) === "undefined") {
        $("#noExtension").show();
    }

    var dappAddress = "n231D89R8Vb9WcUBjjeeLotEzhYxw97GptF";
    getRcentMovies();
    getHottestMovies();
    getTopMovies();

    getRcentMovies2();
    getHottestMovies2();
    getTopMovies2();

    function getRcentMovies() {
        var to = dappAddress;
        var value = "0";
        var callFunction = "getRcentMovies";
        var callArgs = [];
        callArgs.push("1");
        callArgs.push("9");
        nebPay.simulateCall(to, value, callFunction, JSON.stringify(callArgs), { //使用nebpay的simulateCall接口去执行get查询, 模拟执行.不发送交易,不上链
            listener: cbSearch1 //指定回调函数
        });
    }

    function cbSearch1(resp) {
        if(!resp.result) return;
        var result = $.parseJSON(JSON.parse(resp.result));
        if(result !== 'null') {
            $("#movie-1-left").empty();
            if(result.length > 0){
                var html1 = $("#movieTemplate1").html();
                html1 = html1.replace("{{name}}",result[0].name);
                if(result[0].story.length > 100){
                    html1 = html1.replace("{{story}}",result[0].story.substring(0,97)+"...");
                }else{
                    html1 = html1.replace("{{story}}",result[0].story);
                }
                html1 = html1.replace("{{releaseDate}}",result[0].releaseDate);
                html1 = html1.replace("{{genreName}}",result[0].genreName);
                html1 = html1.replace("{{code}}",result[0].code);
                html1 = html1.replace("{{movieName}}",result[0].name);
                html1 = html1.replace("{{movieId}}",result[0].id);
                html1 = html1.replace("images/movie/demo.jpg",result[0].imgSrc);
                var starHtml = getStarHtml(result[0].score);
                html1 = html1.replace("{{starHtml}}",starHtml);
                $("#movie-1-left").append(html1);
            }
            $("#movie-1-right").empty();
            if(result.length > 1){
                for(var i=1; i<result.length; i++){
                    var html2 = $("#movieTemplate2").html();
                    var index = result[i].name.indexOf("：");
                    if(index > -1){
                        html2 = html2.replace("{{name}}",result[i].name.substring(0,index));
                    }else{
                        html2 = html2.replace("{{name}}",result[i].name);
                    }
                    html2 = html2.replace("{{releaseDate}}",result[i].releaseDate.substring(0,4));
                    html2 = html2.replace("{{code}}",result[i].code);
                    html2 = html2.replace("{{movieName}}",result[i].name);
                    html2 = html2.replace("{{movieId}}",result[i].id);
                    html2 = html2.replace("images/movie/demo.jpg",result[i].imgSrc);
                    var starHtml = getStarHtml(result[i].score);
                    html2 = html2.replace("{{starHtml}}",starHtml);
                    $("#movie-1-right").append(html2);
                }
            }
        }
    }

    function getHottestMovies() {
        var to = dappAddress;
        var value = "0";
        var callFunction = "getHottestMovies";
        var callArgs = [];
        callArgs.push("1");
        callArgs.push("9");
        nebPay.simulateCall(to, value, callFunction, JSON.stringify(callArgs), { //使用nebpay的simulateCall接口去执行get查询, 模拟执行.不发送交易,不上链
            listener: cbSearch2 //指定回调函数
        });
    }

    function cbSearch2(resp) {
        if(!resp.result) return;
        var result = $.parseJSON(JSON.parse(resp.result));
        if(result !== 'null') {
            $("#movie-2-left").empty();
            if(result.length > 0){
                var html1 = $("#movieTemplate1").html();
                html1 = html1.replace("{{name}}",result[0].name);
                if(result[0].story.length > 100){
                    html1 = html1.replace("{{story}}",result[0].story.substring(0,97)+"...");
                }else{
                    html1 = html1.replace("{{story}}",result[0].story);
                }
                html1 = html1.replace("{{releaseDate}}",result[0].releaseDate);
                html1 = html1.replace("{{genreName}}",result[0].genreName);
                html1 = html1.replace("{{code}}",result[0].code);
                html1 = html1.replace("{{movieName}}",result[0].name);
                html1 = html1.replace("{{movieId}}",result[0].id);
                html1 = html1.replace("images/movie/demo.jpg",result[0].imgSrc);
                var starHtml = getStarHtml(result[0].score);
                html1 = html1.replace("{{starHtml}}",starHtml);
                $("#movie-2-left").append(html1);
            }
            $("#movie-2-right").empty();
            if(result.length > 1){
                for(var i=1; i<result.length; i++){
                    var html2 = $("#movieTemplate2").html();
                    var index = result[i].name.indexOf("：");
                    if(index > -1){
                        html2 = html2.replace("{{name}}",result[i].name.substring(0,index));
                    }else{
                        html2 = html2.replace("{{name}}",result[i].name);
                    }
                    html2 = html2.replace("{{releaseDate}}",result[i].releaseDate.substring(0,4));
                    html2 = html2.replace("{{code}}",result[i].code);
                    html2 = html2.replace("{{movieName}}",result[i].name);
                    html2 = html2.replace("{{movieId}}",result[i].id);
                    html2 = html2.replace("images/movie/demo.jpg",result[i].imgSrc);
                    var starHtml = getStarHtml(result[i].score);
                    html2 = html2.replace("{{starHtml}}",starHtml);
                    $("#movie-2-right").append(html2);
                }
            }
        }
    }

    function getTopMovies() {
        var to = dappAddress;
        var value = "0";
        var callFunction = "getTopMovies";
        var callArgs = [];
        callArgs.push("1");
        callArgs.push("9");
        nebPay.simulateCall(to, value, callFunction, JSON.stringify(callArgs), { //使用nebpay的simulateCall接口去执行get查询, 模拟执行.不发送交易,不上链
            listener: cbSearch3 //指定回调函数
        });
    }

    function cbSearch3(resp) {
        if(!resp.result) return;
        var result = $.parseJSON(JSON.parse(resp.result));
        if(result !== 'null') {
            $("#movie-3-left").empty();
            if(result.length > 0){
                var html1 = $("#movieTemplate1").html();
                html1 = html1.replace("{{name}}",result[0].name);
                if(result[0].story.length > 100){
                    html1 = html1.replace("{{story}}",result[0].story.substring(0,97)+"...");
                }else{
                    html1 = html1.replace("{{story}}",result[0].story);
                }
                html1 = html1.replace("{{releaseDate}}",result[0].releaseDate);
                html1 = html1.replace("{{genreName}}",result[0].genreName);
                html1 = html1.replace("{{code}}",result[0].code);
                html1 = html1.replace("{{movieName}}",result[0].name);
                html1 = html1.replace("{{movieId}}",result[0].id);
                html1 = html1.replace("images/movie/demo.jpg",result[0].imgSrc);
                var starHtml = getStarHtml(result[0].score);
                html1 = html1.replace("{{starHtml}}",starHtml);
                $("#movie-3-left").append(html1);
            }
            $("#movie-3-right").empty();
            if(result.length > 1){
                for(var i=1; i<result.length; i++){
                    var html2 = $("#movieTemplate2").html();
                    var index = result[i].name.indexOf("：");
                    if(index > -1){
                        html2 = html2.replace("{{name}}",result[i].name.substring(0,index));
                    }else{
                        html2 = html2.replace("{{name}}",result[i].name);
                    }
                    html2 = html2.replace("{{releaseDate}}",result[i].releaseDate.substring(0,4));
                    html2 = html2.replace("{{code}}",result[i].code);
                    html2 = html2.replace("{{movieName}}",result[i].name);
                    html2 = html2.replace("{{movieId}}",result[i].id);
                    html2 = html2.replace("images/movie/demo.jpg",result[i].imgSrc);
                    var starHtml = getStarHtml(result[i].score);
                    html2 = html2.replace("{{starHtml}}",starHtml);
                    $("#movie-3-right").append(html2);
                }
            }
        }
    }

    function getRcentMovies2() {
        var to = dappAddress;
        var value = "0";
        var callFunction = "getRcentMovies";
        var callArgs = [];
        callArgs.push("1");
        callArgs.push("10");
        nebPay.simulateCall(to, value, callFunction, JSON.stringify(callArgs), { //使用nebpay的simulateCall接口去执行get查询, 模拟执行.不发送交易,不上链
            listener: cbSearch4 //指定回调函数
        });
    }

    function cbSearch4(resp) {
        if(!resp.result) return;
        var result = $.parseJSON(JSON.parse(resp.result));
        if(result !== 'null') {
            $("#recent-movie-list").empty();
            if(result.length > 0){
                for(var i=0; i<result.length; i++){
                    var html = $("#movieTemplate3").html();
                    var index = result[i].name.indexOf("：");
                    if(index > -1){
                        html = html.replace("{{name}}",result[i].name.substring(0,index));
                    }else{
                        html = html.replace("{{name}}",result[i].name);
                    }
                    html = html.replace("{{releaseDate}}",result[i].releaseDate.substring(0,4));
                    html = html.replace("{{code}}",result[i].code);
                    html = html.replace("{{movieName}}",result[i].name);
                    html = html.replace("{{movieId}}",result[i].id);
                    html = html.replace("images/movie/demo.jpg",result[i].imgSrc);
                    var starHtml = getStarHtml(result[i].score);
                    html = html.replace("{{starHtml}}",starHtml);
                    $("#recent-movie-list").append(html);
                }
            }
            $("#recent-movie-list").owlCarousel({
                autoPlay: 3000, //Set AutoPlay to 3 seconds
                autoPlay: true, navigation: true,
                navigationText: ['上一个', '下一个'],
                items: 5,
                itemsDesktop: [640, 4],
                itemsDesktopSmall: [414, 3]
            });
        }
    }
    
    function getHottestMovies2() {
        var to = dappAddress;
        var value = "0";
        var callFunction = "getHottestMovies";
        var callArgs = [];
        callArgs.push("1");
        callArgs.push("10");
        nebPay.simulateCall(to, value, callFunction, JSON.stringify(callArgs), { //使用nebpay的simulateCall接口去执行get查询, 模拟执行.不发送交易,不上链
            listener: cbSearch5 //指定回调函数
        });
    }

    function cbSearch5(resp) {
        if(!resp.result) return;
        var result = $.parseJSON(JSON.parse(resp.result));
        if(result !== 'null') {
            $("#hottest-movie-list").empty();
            if(result.length > 0){
                for(var i=0; i<result.length; i++){
                    var html = $("#movieTemplate4").html();
                    var index = result[i].name.indexOf("：");
                    if(index > -1){
                        html = html.replace("{{name}}",result[i].name.substring(0,index));
                    }else{
                        html = html.replace("{{name}}",result[i].name);
                    }
                    html = html.replace("{{releaseDate}}",result[i].releaseDate.substring(0,4));
                    html = html.replace("{{code}}",result[i].code);
                    html = html.replace("{{movieName}}",result[i].name);
                    html = html.replace("{{movieId}}",result[i].id);
                    html = html.replace("images/movie/demo.jpg",result[i].imgSrc);
                    var starHtml = getStarHtml(result[i].score);
                    html = html.replace("{{starHtml}}",starHtml);
                    $("#hottest-movie-list").append(html);
                }
            }
        }
    }
    
    function getTopMovies2() {
        var to = dappAddress;
        var value = "0";
        var callFunction = "getTopMovies";
        var callArgs = [];
        callArgs.push("1");
        callArgs.push("9");
        nebPay.simulateCall(to, value, callFunction, JSON.stringify(callArgs), { //使用nebpay的simulateCall接口去执行get查询, 模拟执行.不发送交易,不上链
            listener: cbSearch6 //指定回调函数
        });
    }

    function cbSearch6(resp) {
        if(!resp.result) return;
        var result = $.parseJSON(JSON.parse(resp.result));
        if(result !== 'null') {
            $("#top-movie-list-2").empty();
            if(result.length > 0){
                var html1 = $("#movieTemplate1").html();
                html1 = html1.replace("{{name}}",result[0].name);
                if(result[0].story.length > 100){
                    html1 = html1.replace("{{story}}",result[0].story.substring(0,97)+"...");
                }else{
                    html1 = html1.replace("{{story}}",result[0].story);
                }
                html1 = html1.replace("{{releaseDate}}",result[0].releaseDate);
                html1 = html1.replace("{{genreName}}",result[0].genreName);
                html1 = html1.replace("{{code}}",result[0].code);
                html1 = html1.replace("{{movieName}}",result[0].name);
                html1 = html1.replace("{{movieId}}",result[0].id);
                html1 = html1.replace("images/movie/demo.jpg",result[0].imgSrc);
                var starHtml = getStarHtml(result[0].score);
                html1 = html1.replace("{{starHtml}}",starHtml);
                $("#top-movie-list-2").append(html1);
            }
            $("#top-movie-list-1").empty();
            if(result.length > 1){
                for(var i=1; i<result.length; i++){
                    var html2 = $("#movieTemplate2").html();
                    var index = result[i].name.indexOf("：");
                    if(index > -1){
                        html2 = html2.replace("{{name}}",result[i].name.substring(0,index));
                    }else{
                        html2 = html2.replace("{{name}}",result[i].name);
                    }
                    html2 = html2.replace("{{releaseDate}}",result[i].releaseDate.substring(0,4));
                    html2 = html2.replace("{{code}}",result[i].code);
                    html2 = html2.replace("{{movieName}}",result[i].name);
                    html2 = html2.replace("{{movieId}}",result[i].id);
                    html2 = html2.replace("images/movie/demo.jpg",result[i].imgSrc);
                    var starHtml = getStarHtml(result[i].score);
                    html2 = html2.replace("{{starHtml}}",starHtml);
                    $("#top-movie-list-1").append(html2);
                }
            }
        }
    }





});