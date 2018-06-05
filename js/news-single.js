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
        var result = JSON.parse(resp.result);
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
            var items = [].slice.call(document.querySelectorAll('.grid > .grid__item'));
            var el1 = items[0].querySelector('button.icobutton'), el1span = el1.querySelector('span');
            new Animocon(el1, {
                tweens : [
                    // burst animation
                    new mojs.Burst({
                        parent: el1,
                        duration: 1700,
                        shape : 'circle',
                        fill: '#C0C1C3',
                        x: '50%',
                        y: '50%',
                        opacity: 0.6,
                        childOptions: { radius: {15:0} },
                        radius: {30:90},
                        count: 6,
                        isRunLess: true,
                        easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                    }),
                    // ring animation
                    new mojs.Transit({
                        parent: el1,
                        duration: 700,
                        type: 'circle',
                        radius: {0: 60},
                        fill: 'transparent',
                        stroke: '#C0C1C3',
                        strokeWidth: {20:0},
                        opacity: 0.6,
                        x: '50%',
                        y: '50%',
                        isRunLess: true,
                        easing: mojs.easing.sin.out
                    }),
                    // icon scale animation
                    new mojs.Tween({
                        duration : 1200,
                        onUpdate: function(progress) {
                            if(progress > 0.3) {
                                var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
                                el1span.style.WebkitTransform = el1span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
                            }
                            else {
                                el1span.style.WebkitTransform = el1span.style.transform = 'scale3d(0,0,1)';
                            }
                        }
                    })
                ],
                onCheck : function() {
                    el1.style.color = '#988ADE';
                },
                onUnCheck : function() {
                    el1.style.color = '#C0C1C3';
                }
            });
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

    // taken from mo.js demos
    function isIOSSafari() {
        var userAgent;
        userAgent = window.navigator.userAgent;
        return userAgent.match(/iPad/i) || userAgent.match(/iPhone/i);
    };

    // taken from mo.js demos
    function isTouch() {
        var isIETouch;
        isIETouch = navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
        return [].indexOf.call(window, 'ontouchstart') >= 0 || isIETouch;
    };

    // taken from mo.js demos
    var isIOS = isIOSSafari(),
        clickHandler = isIOS || isTouch() ? 'touchstart' : 'click';

    function extend( a, b ) {
        for( var key in b ) {
            if( b.hasOwnProperty( key ) ) {
                a[key] = b[key];
            }
        }
        return a;
    }

    function Animocon(el, options) {
        this.el = el;
        this.options = extend( {}, this.options );
        extend( this.options, options );

        this.checked = false;

        this.timeline = new mojs.Timeline();

        for(var i = 0, len = this.options.tweens.length; i < len; ++i) {
            this.timeline.add(this.options.tweens[i]);
        }

        var self = this;
        this.el.addEventListener(clickHandler, function() {
            if( self.checked ) {
                self.options.onUnCheck();
            }
            else {
                self.options.onCheck();
                self.timeline.start();
            }
            self.checked = !self.checked;
        });
    }

    Animocon.prototype.options = {
        tweens : [
            new mojs.Burst({
                shape : 'circle',
                isRunLess: true
            })
        ],
        onCheck : function() { return false; },
        onUnCheck : function() { return false; }
    };
});


