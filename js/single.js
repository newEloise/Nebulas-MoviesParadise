$(document).ready(function () {
    var code = getUrlParam("code");
    var name = getUrlParam("name");
    var movieId = getUrlParam("movieId");
    $("#movieName").html(name);
    $("#hottest-review").html(name + "的最热门影评");

    var NebPay = require("nebpay");
    var nebPay = new NebPay();
    //检查“webExtensionWallet”扩展是否已安装
    if(typeof(webExtensionWallet) === "undefined") {
        $("#noExtension").show();
    }
    var dappAddress = "n231D89R8Vb9WcUBjjeeLotEzhYxw97GptF";
    getMovieByCode(code);
    getAllReview(movieId);

    function getMovieByCode(code) {
        var to = dappAddress;
        var value = "0";
        var callFunction = "getMovieByCode";
        var callArgs = [];
        callArgs.push(code);
        nebPay.simulateCall(to, value, callFunction, JSON.stringify(callArgs), { //使用nebpay的simulateCall接口去执行get查询, 模拟执行.不发送交易,不上链
            listener: cbSearch1 //指定回调函数
        });
    }
    function cbSearch1(resp) {
        if(!resp.result) return;
        var result = JSON.parse(resp.result);
        if(result !== 'null') {
            $("#movie-description").empty();
            var html = $("#movieTemplate1").html();
            html = html.replace("{{name}}",result.name);
            html = html.replace("{{director}}",result.director);
            html = html.replace("{{screenWriter}}",result.screenWriter);
            html = html.replace("{{leadActor}}",result.leadActor);
            html = html.replace("{{genreName}}",result.genreName);
            html = html.replace("{{areaName}}",result.areaName);
            html = html.replace("{{releaseDate}}",result.releaseDate);
            html = html.replace("{{min}}",result.min);
            html = html.replace("{{min}}",result.min);
            html = html.replace("images/movie/demo.jpg",result.imgSrc);
            html = html.replace("{{story}}",result.story);
            var starHtml = getStarHtml(result.score);
            $("#movie-description").append(html);
        }
    }

    function getAllReview(movieId) {
        var to = dappAddress;
        var value = "0";
        var callFunction = "getMovieReviewsByMovieId";
        var callArgs = [];
        callArgs.push(movieId);
        nebPay.simulateCall(to, value, callFunction, JSON.stringify(callArgs), {
            listener: cbSearch2
        });
    }
    function cbSearch2(resp) {
        if(!resp.result) return;
        var result = $.parseJSON(JSON.parse(resp.result));
        if(result !== 'null') {
            var compare = function (obj1, obj2) {
                var val1 = obj1.likeNum;
                var val2 = obj2.likeNum;
                if (val1 > val2) {
                    return -1;
                } else if (val1 < val2) {
                    return 1;
                } else {
                    if(obj1.submitTime > obj2.submitTime ){
                        return -1;
                    } else if(obj1.submitTime < obj2.submitTime ){
                        return 1;
                    } else {
                        return 0;
                    }
                }
            };
            result.sort(compare);
            $("#hottest-review2").empty();
            if(result.length > 0){
                var html1 = $("#reviewTemplate1").html();
                html1 = html1.replace("{{reviewId}}",result[0].id);
                html1 = html1.replace("{{title}}",result[0].title);
                html1 = html1.replace("{{comment}}",result[0].comment);
                html1 = html1.replace("{{author}}",result[0].author);
                html1 = html1.replace("{{score}}",result[0].score);
                html1 = html1.replace("{{submitTime}}",result[0].submitTime);
                html1 = html1.replace("{{likeNum}}",result[0].likeNum);
                $("#hottest-review2").append(html1);
            }
            $("#other-review").empty();
            if(result.length > 1){
                for(var i=1; i<result.length; i++){
                    var html2 = $("#reviewTemplate2").html();
                    html2 = html2.replace("{{reviewId}}",result[i].id);
                    html2 = html2.replace("{{title}}",result[i].title);
                    html2 = html2.replace("{{comment}}",result[i].comment);
                    html2 = html2.replace("{{author}}",result[i].author);
                    html2 = html2.replace("{{score}}",result[i].score);
                    html2 = html2.replace("{{submitTime}}",result[i].submitTime);
                    html2 = html2.replace("{{likeNum}}",result[i].likeNum);
                    $("#other-review").append(html2);
                }
            }
        }
    }

    $("#form-submit").click(function(){
        if($(".rater-star-result").html() == ''){
            layer.alert('没有评分哟！');
            return;
        }
        if($("#form-title").val() == ''){
            layer.alert('影评标题不能为空哟！');
            return;
        }else if($("#form-title").val() > 30) {
            layer.alert('影评标题内容太长了！');
            return;
        }
        if($("#form-content").val() == '') {
            layer.alert('影评内容不能为空哟！');
            return;
        } else if($("#form-content").val() > 200) {
            layer.alert('影评内容太长了！');
            return;
        }

        var title = $("#form-title").val();
        var comment = $("#form-content").val();
        var submitTime = getDateStr(new Date());
        var score = $(".rater-star-result").html().substring(0,1);

        var to = dappAddress;
        var value = "0";
        var callFunction = "submitMovieReview";
        var callArgs = [];
        callArgs.push(movieId);
        callArgs.push(submitTime);
        callArgs.push(title);
        callArgs.push(comment);
        callArgs.push(score);
        nebPay.call(to, value, callFunction, JSON.stringify(callArgs), {
            listener: cbPush
        });
    });

    function cbPush(resp) {
        initStarHtml();
        $("#form-title").val('');
        $("#form-content").val('');

        setTimeout(function() {
            window.location.replace("single.html?code="+code+"&name="+name+"&movieId="+movieId);
        },20000);
    }

    function initStarHtml() {
        $(".rater-star-result").html("");
        var options	= {
            max	: 5,
            title_format	: function(value) {
                var title = '';
                switch (value) {
                    case 1 :
                        title	= '很不满意';
                        break;
                    case 2 :
                        title	= '不满意';
                        break;
                    case 3 :
                        title	= '一般';
                        break;
                    case 4 :
                        title	= '满意';
                        break;
                    case 5 :
                        title	= '非常满意';
                        break;
                    default :
                        title = value;
                        break;
                }
                return title;
            },
            info_format	: function(value) {
                var info = '';
                switch (value) {
                    case 1 :
                        info	= '<div class="info-box">1分&nbsp;很不满意<div>电影的拍摄质量和故事情节都非常差，太令人失望了！</div></div>';
                        break;
                    case 2 :
                        info	= '<div class="info-box">2分&nbsp;不满意<div>电影的拍摄质量和故事情节不好，不能满足要求。</div></div>';
                        break;
                    case 3 :
                        info	= '<div class="info-box">3分&nbsp;一般<div>电影的拍摄质量和故事情节感觉一般。</div></div>';
                        break;
                    case 4 :
                        info	= '<div class="info-box">4分&nbsp;满意<div>电影的拍摄质量和故事情节都比较满意，符合我的期望。</div></div>';
                        break;
                    case 5 :
                        info	= '<div class="info-box">5分&nbsp;非常满意<div>我很喜欢！电影的拍摄质量和故事情节都很满意，太棒了！</div></div>';
                        break;
                    default :
                        info = value;
                        break;
                }
                return info;
            }
        };
        $('#rate-comment').rater(options);
    }
});
