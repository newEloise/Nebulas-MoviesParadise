function getUrlParam(name){
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]); return null;
}

function getDateStr(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h= h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second=date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
}

function getStarHtml(score) {
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
