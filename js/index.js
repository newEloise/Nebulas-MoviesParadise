$(document).ready(function () {
    var NebPay = require("nebpay");
    var nebPay = new NebPay();

    //检查“webExtensionWallet”扩展是否已安装
    if(typeof(webExtensionWallet) === "undefined") {
        $("#noExtension").show();
    }

    var dappAddress = "n213z7m52AujEDo6DmBJQoGLW4biEPXwA5y";

    getRcentMovies();
    getHottestMovies();
    getTopMovies();

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
        var result = eval(JSON.parse(resp.result));
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
                html1 = html1.replace("images/movie/demo.jpg",result[0].imgSrc);
                var startHtml = getStartHtml(result[0].score);
                html1 = html1.replace("{{startHtml}}",startHtml);
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
                    html2 = html2.replace("images/movie/demo.jpg",result[i].imgSrc);
                    var startHtml = getStartHtml(result[i].score);
                    html2 = html2.replace("{{startHtml}}",startHtml);
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
        var result = eval(JSON.parse(resp.result));
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
                html1 = html1.replace("images/movie/demo.jpg",result[0].imgSrc);
                var startHtml = getStartHtml(result[0].score);
                html1 = html1.replace("{{startHtml}}",startHtml);
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
                    html2 = html2.replace("images/movie/demo.jpg",result[i].imgSrc);
                    var startHtml = getStartHtml(result[i].score);
                    html2 = html2.replace("{{startHtml}}",startHtml);
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
        var result = eval(JSON.parse(resp.result));
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
                html1 = html1.replace("images/movie/demo.jpg",result[0].imgSrc);
                var startHtml = getStartHtml(result[0].score);
                html1 = html1.replace("{{startHtml}}",startHtml);
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
                    html2 = html2.replace("images/movie/demo.jpg",result[i].imgSrc);
                    var startHtml = getStartHtml(result[i].score);
                    html2 = html2.replace("{{startHtml}}",startHtml);
                    $("#movie-3-right").append(html2);
                }
            }
        }
    }

    function getStartHtml(score) {
        if(0 <= score && score < 0.5){
            return '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>';
        }else if(0.5 <= score && score < 1){
            return '<a href="#"><i class="fa fa-star-half-o" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>';
        }else if(1 <= score && score < 1.5){
            return '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>';
        }else if(1.5 <= score && score < 2){
            return '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-half-o" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>';
        }else if(2 <= score && score < 2.5){
            return '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>';
        }else if(2.5 <= score && score < 3){
            return '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-half-o" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>';
        }else if(3 <= score && score < 3.5){
            return '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>';
        }else if(3.5 <= score && score < 4){
            return '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-half-o" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>';
        }else if(4 <= score && score < 4.3){
            return '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-o" aria-hidden="true"></i></a>';
        }else if(4.3 <= score && score < 4.6){
            return '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star-half-o" aria-hidden="true"></i></a>';
        }else if(4.6 <= score && score <= 5){
            return '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>' +
                '<a href="#"><i class="fa fa-star" aria-hidden="true"></i></a>';
        }
    }


});