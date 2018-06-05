$(document).ready(function () {
    var NebPay = require("nebpay");
    var nebPay = new NebPay();
    //检查“webExtensionWallet”扩展是否已安装
    if(typeof(webExtensionWallet) === "undefined") {
        $("#noExtension").show();
    }
    var dappAddress = "n231D89R8Vb9WcUBjjeeLotEzhYxw97GptF";
    getMovieSize();
    getTopMovies();

    var movieSize = 0;
    function getMovieSize() {
        var to = dappAddress;
        var value = "0";
        var callFunction = "getMovieSize";
        var callArgs = [];
        nebPay.simulateCall(to, value, callFunction, JSON.stringify(callArgs), { //使用nebpay的simulateCall接口去执行get查询, 模拟执行.不发送交易,不上链
            listener: cbSearch1 //指定回调函数
        });
    }

    function cbSearch1(resp) {
        if(!resp.result) return;
        var result = $.parseJSON(JSON.parse(resp.result));
        if(result !== 'null') {
            movieSize = result;
            $("#movie-size").html(movieSize);
        }
    }

    function getTopMovies() {
        var to = dappAddress;
        var value = "0";
        var callFunction = "getTopMovies";
        var callArgs = [];
        callArgs.push("1");
        callArgs.push("100");
        nebPay.simulateCall(to, value, callFunction, JSON.stringify(callArgs), { //使用nebpay的simulateCall接口去执行get查询, 模拟执行.不发送交易,不上链
            listener: cbSearch2 //指定回调函数
        });
    }

    function cbSearch2(resp) {
        if(!resp.result) return;
        var result = $.parseJSON(JSON.parse(resp.result));
        if(result !== 'null') {
            $("#movie-table").empty();
            if(result.length > 0){
                for(var i=0; i<result.length; i++){
                    var html = $("#template").html();
                    html = html.replace("{{index}}",(i+1));
                    html = html.replace("{{name}}",result[i].name);
                    html = html.replace("{{area}}",result[i].area);
                    html = html.replace("{{areaName}}",result[i].areaName);
                    html = html.replace("{{areaName}}",result[i].areaName);
                    html = html.replace("{{genre}}",result[i].genre);
                    html = html.replace("{{genreName}}",result[i].genreName);
                    html = html.replace("{{genreName}}",result[i].genreName);
                    html = html.replace("{{score}}",result[i].score);
                    html = html.replace("{{releaseDate}}",result[i].releaseDate);
                    html = html.replace("{{code}}",result[i].code);
                    html = html.replace("{{movieName}}",result[i].name);
                    html = html.replace("{{movieId}}",result[i].id);
                    html = html.replace("images/movie/demo.jpg",result[i].imgSrc);
                    $("#movie-table").append(html);
                }
            }
        }
    }
});