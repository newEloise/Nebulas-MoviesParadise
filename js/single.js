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
    getRcentMovies();

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
                if(result[0].author){
                    html1 = html1.replace("{{author}}",result[0].author);
                }else{
                    html1 = html1.replace("{{author}}","n1bUSoYrgTr7iBUR1LDS5svjLBd6wGdB4Ur2018");
                }
                html1 = html1.replace("{{score}}",result[0].score);
                html1 = html1.replace("{{submitTime}}",result[0].submitTime);
                html1 = html1.replace("{{likeNum}}",result[0].likeNum);
                html1 = html1.replace("{{btn}}","btn-"+result[0].id);
                $("#hottest-review2").append(html1);
                setSpecialIcon1('#btn-'+result[0].id);
            }
            $("#other-review").empty();
            if(result.length > 1){
                for(var i=1; i<result.length; i++){
                    var html2 = $("#reviewTemplate2").html();
                    html2 = html2.replace("{{reviewId}}",result[i].id);
                    html2 = html2.replace("{{title}}",result[i].title);
                    html2 = html2.replace("{{comment}}",result[i].comment);
                    if(result[i].author){
                        html2 = html2.replace("{{author}}",result[i].author);
                    }else{
                        html2 = html2.replace("{{author}}","n1bUSoYrgTr7iBUR1LDS5svjLBd6wGdB4Ur2018");
                    }
                    html2 = html2.replace("{{score}}",result[i].score);
                    html2 = html2.replace("{{submitTime}}",result[i].submitTime);
                    html2 = html2.replace("{{likeNum}}",result[i].likeNum);
                    html2 = html2.replace("{{btn2}}","btn-"+result[i].id);
                    $("#other-review").append(html2);
                    setSpecialIcon2('#btn-'+result[i].id);
                }
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

    function setSpecialIcon1(element) {
        var el9 = document.querySelector(element),
            el9span = el9.querySelector('span');
        el9span.style.WebkitTransformOrigin = el9span.style.transformOrigin = '-10% 50%';
        new Animocon(el9, {
            tweens : [
                // burst animation
                new mojs.Burst({
                    parent: el9,
                    duration: 1500,
                    delay: 350,
                    shape : 'circle',
                    fill : [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
                    x: '50%',
                    y: '50%',
                    opacity: 0.6,
                    radius: {40:90},
                    count: 6,
                    angle: 135,
                    degree: 90,
                    isRunLess: true,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                }),
                // burst animation
                new mojs.Burst({
                    parent: el9,
                    duration: 1500,
                    delay: 550,
                    shape : 'circle',
                    fill : [ '#988ADE', '#DE8AA0', '#8AAEDE', '#8ADEAD', '#DEC58A', '#8AD1DE' ],
                    x: '50%',
                    y: '50%',
                    opacity: 0.6,
                    radius: {40:100},
                    count: 6,
                    angle: 45,
                    degree: -90,
                    isRunLess: true,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                }),
                // ring animation
                new mojs.Transit({
                    parent: el9,
                    duration: 750,
                    type: 'circle',
                    radius: {0: 50},
                    fill: 'transparent',
                    stroke: '#988ADE',
                    strokeWidth: {35:0},
                    opacity: 0.6,
                    x: '50%',
                    y: '50%',
                    isRunLess: true,
                    easing: mojs.easing.bezier(0, 1, 0.5, 1)
                }),
                // ring animation
                new mojs.Transit({
                    parent: el9,
                    duration: 750,
                    delay: 200,
                    type: 'circle',
                    radius: {0: 50},
                    fill: 'transparent',
                    stroke: '#988ADE',
                    strokeWidth: {35:0},
                    opacity: 0.6,
                    x: '50%',
                    y: '50%',
                    isRunLess: true,
                    easing: mojs.easing.bezier(0, 1, 0.5, 1)
                }),
                // icon scale animation
                new mojs.Tween({
                    duration : 1500,
                    onUpdate: function(progress) {
                        if(progress > 0.3) {
                            var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
                            el9span.style.WebkitTransform = el9span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1) rotate3d(0,0,1,' + 90*(1-elasticOutProgress) + 'deg)';
                        }
                        else {
                            el9span.style.WebkitTransform = el9span.style.transform = 'scale3d(0,0,1)';
                        }
                    }
                })
            ],
            onCheck : function() {
                el9.style.color = '#988ADE';
            },
            onUnCheck : function() {
                el9.style.color = '#C0C1C3';
            }
        });
    }

    function setSpecialIcon2(element) {
        var el2 = document.querySelector(element),
            el2span = el2.querySelector('span');
        new Animocon(el2, {
            tweens : [
                // burst animation
                new mojs.Burst({
                    parent: el2,
                    duration: 1500,
                    delay: 300,
                    shape : 'circle',
                    fill: '#C0C1C3',
                    x: '50%',
                    y: '50%',
                    opacity: 0.6,
                    radius: {40:90},
                    count: 6,
                    isRunLess: true,
                    easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
                }),
                // ring animation
                new mojs.Transit({
                    parent: el2,
                    duration: 600,
                    type: 'circle',
                    radius: {0: 50},
                    fill: 'transparent',
                    stroke: '#C0C1C3',
                    strokeWidth: {35:0},
                    opacity: 0.6,
                    x: '50%',
                    y: '50%',
                    isRunLess: true,
                    easing: mojs.easing.ease.inout
                }),
                // icon scale animation
                new mojs.Tween({
                    duration : 1100,
                    onUpdate: function(progress) {
                        if(progress > 0.3) {
                            var elasticOutProgress = mojs.easing.elastic.out(1.43*progress-0.43);
                            el2span.style.WebkitTransform = el2span.style.transform = 'scale3d(' + elasticOutProgress + ',' + elasticOutProgress + ',1)';
                        }
                        else {
                            el2span.style.WebkitTransform = el2span.style.transform = 'scale3d(0,0,1)';
                        }
                    }
                })
            ],
            onCheck : function() {
                el2.style.color = '#988ADE';
            },
            onUnCheck : function() {
                el2.style.color = '#C0C1C3';
            }
        });
    }

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
