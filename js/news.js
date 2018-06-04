$(document).ready(function () {
    var NebPay = require("nebpay");
    var nebPay = new NebPay();
    //检查“webExtensionWallet”扩展是否已安装
    if(typeof(webExtensionWallet) === "undefined") {
        $("#noExtension").show();
    }

    var dappAddress = "n231D89R8Vb9WcUBjjeeLotEzhYxw97GptF";
    getRcentNews();

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
        var result = eval(JSON.parse(resp.result));
        if(result !== 'null') {
            $("#news-list").empty();
            for(var i=0; i<result.length; i++){
                var html = $("#newsTemplate").html();
                html = html.replace("{{newsId}}",result[i].id);
                html = html.replace("{{title}}",result[i].title);
                if(result[i].comment.length > 100){
                    html = html.replace("{{comment}}",result[i].comment.substring(0,97)+"...");
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
});