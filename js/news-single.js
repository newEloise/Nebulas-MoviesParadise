$(document).ready(function () {
    var newsId = getUrlParam("newsId");

    var NebPay = require("nebpay");
    var nebPay = new NebPay();
    //检查“webExtensionWallet”扩展是否已安装
    if(typeof(webExtensionWallet) === "undefined") {
        $("#noExtension").show();
    }
    var dappAddress = "n231D89R8Vb9WcUBjjeeLotEzhYxw97GptF";
    getNewsById(newsId);
    getNewsReviewsByNewsId(newsId);

    function getNewsById(newsId) {
        var to = dappAddress;
        var value = "0";
        var callFunction = "getNewsById";
        var callArgs = [];
        callArgs.push(newsId);
        nebPay.simulateCall(to, value, callFunction, JSON.stringify(callArgs), { //使用nebpay的simulateCall接口去执行get查询, 模拟执行.不发送交易,不上链
            listener: cbSearch1 //指定回调函数
        });
    }
    function cbSearch1(resp) {
        if(!resp.result) return;
        var result = $.parseJSON(JSON.parse(resp.result));
        if(result !== 'null') {
            $("#news-description").empty();
            var html = $("#newsTemplate").html();
            html = html.replace("{{title}}",result.title);
            html = html.replace("{{newstime}}",result.newstime);
            html = html.replace("{{form}}",result.form);
            html = html.replace("{{author}}",result.author);
            html = html.replace("{{comment}}",result.comment);
            html = html.replace("images/news/demo.jpg",result.imgSrc);
            $("#news-description").append(html);
        }
    }

    function getNewsReviewsByNewsId(newsId) {
        var to = dappAddress;
        var value = "0";
        var callFunction = "getNewsReviewsByNewsId";
        var callArgs = [];
        callArgs.push(newsId);
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
            $("#hottest-review").empty();
            if(result.length > 0){
                var html1 = $("#reviewTemplate1").html();
                html1 = html1.replace("{{reviewId}}",result[0].id);
                html1 = html1.replace("{{title}}",result[0].title);
                html1 = html1.replace("{{comment}}",result[0].comment);
                html1 = html1.replace("{{author}}",result[0].author);
                html1 = html1.replace("{{submitTime}}",result[0].submitTime);
                html1 = html1.replace("{{likeNum}}",result[0].likeNum);
                $("#hottest-review").append(html1);
            }
            $("#other-review").empty();
            if(result.length > 1){
                for(var i=1; i<result.length; i++){
                    var html2 = $("#reviewTemplate2").html();
                    html2 = html2.replace("{{reviewId}}",result[i].id);
                    html2 = html2.replace("{{title}}",result[i].title);
                    html2 = html2.replace("{{comment}}",result[i].comment);
                    html2 = html2.replace("{{author}}",result[i].author);
                    html2 = html2.replace("{{submitTime}}",result[i].submitTime);
                    html2 = html2.replace("{{likeNum}}",result[i].likeNum);
                    $("#other-review").append(html2);
                }
            }
        }
    }

    $("#form-submit").click(function(){
        if($("#form-title").val() == ''){
            layer.alert('评论标题不能为空哟！');
            return;
        }else if($("#form-title").val() > 30) {
            layer.alert('评论标题内容太长了！');
            return;
        }
        if($("#form-content").val() == '') {
            layer.alert('评论内容不能为空哟！');
            return;
        } else if($("#form-content").val() > 200) {
            layer.alert('评论内容太长了！');
            return;
        }

        var title = $("#form-title").val();
        var comment = $("#form-content").val();
        var submitTime = getDateStr(new Date());

        var to = dappAddress;
        var value = "0";
        var callFunction = "submitNewsReview";
        var callArgs = [];
        callArgs.push(newsId);
        callArgs.push(submitTime);
        callArgs.push(title);
        callArgs.push(comment);
        nebPay.call(to, value, callFunction, JSON.stringify(callArgs), {
            listener: cbPush
        });
    });

    function cbPush(resp) {
        $("#form-title").val('');
        $("#form-content").val('');

        setTimeout(function() {
            window.location.replace("news-single.html?newsId="+newsId);
        },20000);
    };

    function cbPush2(resp) {

    };
});
