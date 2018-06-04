$(document).ready(function () {
    var country = getUrlParam("country");
    var countryName = getUrlParam("countryName");
    $("#countryName").html(countryName+" <span>电影</span>");

    var NebPay = require("nebpay");
    var nebPay = new NebPay();
    //检查“webExtensionWallet”扩展是否已安装
    if(typeof(webExtensionWallet) === "undefined") {
        $("#noExtension").show();
    }
    var dappAddress = "n231D89R8Vb9WcUBjjeeLotEzhYxw97GptF";
    getMoviesByArea(country);
    getHottestMovies();

    function getMoviesByArea(country) {
        var to = dappAddress;
        var value = "0";
        var callFunction = "getMoviesByArea";
        var callArgs = [];
        callArgs.push(country);
        callArgs.push("1");
        callArgs.push("10");
        nebPay.simulateCall(to, value, callFunction, JSON.stringify(callArgs), { //使用nebpay的simulateCall接口去执行get查询, 模拟执行.不发送交易,不上链
            listener: cbSearch1 //指定回调函数
        });
    }

    function cbSearch1(resp) {
        if(!resp.result) return;
        var result = eval(JSON.parse(resp.result));
        if(result !== 'null') {
            $("#movie-genres-list").empty();
            if(result.length > 0){
                for(var i=0; i<result.length; i++){
                    var html = $("#movieTemplate1").html();
                    html = html.replace("{{name}}",result[i].name);
                    html = html.replace("{{releaseDate}}",result[i].releaseDate);
                    html = html.replace("{{code}}",result[i].code);
                    html = html.replace("{{movieName}}",result[i].name);
                    html = html.replace("{{movieId}}",result[i].id);
                    html = html.replace("images/movie/demo.jpg",result[i].imgSrc);
                    var starHtml = getStarHtml(result[i].score);
                    html = html.replace("{{starHtml}}",starHtml);
                    $("#movie-genres-list").append(html);
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
        callArgs.push("10");
        nebPay.simulateCall(to, value, callFunction, JSON.stringify(callArgs), { //使用nebpay的simulateCall接口去执行get查询, 模拟执行.不发送交易,不上链
            listener: cbSearch2 //指定回调函数
        });
    }

    function cbSearch2(resp) {
        if(!resp.result) return;
        var result = eval(JSON.parse(resp.result));
        if(result !== 'null') {
            $("#hottest-movie-list").empty();
            if(result.length > 0){
                for(var i=0; i<result.length; i++){
                    var html = $("#movieTemplate2").html();
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
            $("#hottest-movie-list").owlCarousel({
                autoPlay: 3000, //Set AutoPlay to 3 seconds
                autoPlay: true, navigation: true,
                navigationText: ['上一个', '下一个'],
                items: 5,
                itemsDesktop: [640, 4],
                itemsDesktopSmall: [414, 3]
            });
        }
    }
});