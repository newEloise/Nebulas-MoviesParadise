"use strict";

var Movie = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.id = obj.id;//ID
        this.name = obj.name;//名称
        this.code = obj.code;//编号
        this.genre = obj.genre;//类型
        this.releaseDate = obj.releaseDate;//上映日期
        this.story = obj.story;//剧情简介
        this.score = obj.score;//平均评分
        this.totalScore = obj.totalScore;//总分
        this.scoreNumber = obj.scoreNumber;//评分人数
        this.director = obj.director;//导演
        this.screenWriter = obj.screenWriter;//编剧
        this.leadActor = obj.leadActor;//主演
        this.area = obj.area;//制片国家/区域
        this.areaName = obj.areaName;//制片国家/区域
        this.min = obj.min;//片长
        this.imgSrc = obj.imgSrc;//图片地址
        this.heat = obj.heat;//热度
    } else {
        this.id = 0;//ID
        this.name = "";//名称
        this.code = "";//编号
        this.genre = "";//类型
        this.releaseDate = "";//上映日期
        this.story = "";//剧情简介
        this.score = "";//平均评分
        this.totalScore = "";//总分
        this.scoreNumber = 0;//评分人数
        this.director = "";//导演
        this.screenWriter = "";//编剧
        this.leadActor = "";//主演
        this.area = "";//制片国家/区域
        this.areaName = "";//制片国家/区域
        this.min = 0;//片长
        this.imgSrc = "";//图片地址
        this.heat = 0;//热度
    }
};

Movie.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};

var MovieReview = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.id = obj.id;//ID
        this.movieId = obj.movieId;//电影ID
        this.author = obj.author;//作者
        this.submitTime = obj.submitTime;//提交时间
        this.comment = obj.comment;//内容
        this.score = obj.score;//评分
        this.likeNum = obj.likeNum;//点赞数量
    } else {
        this.id = 0;//ID
        this.movieId = 0;//电影ID
        this.author = "";//作者
        this.submitTime = "";//提交时间
        this.comment = "";//内容
        this.score = 0;//评分
        this.likeNum = 0;//点赞数量
    }
};

MovieReview.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};

var News = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.id = obj.id;//ID
        this.title = obj.title;//新闻标题
        this.subTitle = obj.subTitle;//短标题
        this.author = obj.author;//作者
        this.comment = obj.comment;//内容
        this.form = obj.form;//来源
        this.imgSrc = obj.imgSrc;//图片地址
        this.newstime = obj.newstime;//发布时间
    } else {
        this.id = 0;//ID
        this.title = "";//新闻标题
        this.subTitle = "";//短标题
        this.author = "";//作者
        this.comment = "";//内容
        this.form = "";//来源
        this.imgSrc = "";//图片地址
        this.newstime = "";//图片地址
    }
};

News.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};

var NewsReview = function (text) {
    if (text) {
        var obj = JSON.parse(text);
        this.id = obj.id;//ID
        this.newId = obj.newId;//新闻ID
        this.author = obj.author;//作者
        this.submitTime = obj.submitTime;//提交时间
        this.comment = obj.comment;//内容
        this.score = obj.score;//评分
        this.likeNum = obj.likeNum;//点赞数量
    } else {
        this.id = 0;//ID
        this.newId = 0;//新闻ID
        this.author = "";//作者
        this.submitTime = "";//提交时间
        this.comment = "";//内容
        this.score = 0;//评分
        this.likeNum = 0;//点赞数量
    }
};

NewsReview.prototype = {
    toString: function () {
        return JSON.stringify(this);
    }
};

var MoviesParadiseContract = function () {
    LocalContractStorage.defineMapProperty(this, "movieRecords");
    LocalContractStorage.defineMapProperty(this, "movieReviewRecords");
    LocalContractStorage.defineMapProperty(this, "newsRecords");
    LocalContractStorage.defineMapProperty(this, "newsReviewrecords");

    LocalContractStorage.defineProperty(this, "movieSize");
    LocalContractStorage.defineProperty(this, "movieReviewSize");
    LocalContractStorage.defineProperty(this, "newsSize");
    LocalContractStorage.defineProperty(this, "newsReviewSize");

};

MoviesParadiseContract.prototype = {
    //初始化
    init: function () {
        this.movieSize = 0;
        this.movieReviewSize = 0;
        this.newsSize = 0;
        this.newsReviewSize = 0;
    },
    //根据ID获取电影
    getMovieById: function (index) {
        return this.movieRecords.get(index);
    },
    //根据编号获取电影
    getMovieByCode: function (code) {
        for(var i=0; i<this.movieSize; i++){
            var record = this.movieRecords.get(i);
            if(record.code == code){
                return this.movieRecords.get(i);
            }
        }
        return "";
    },
    //根据名称获取电影
    getMovieByName: function (name) {
        for(var i=0; i<this.movieSize; i++){
            var record = this.movieRecords.get(i);
            if(record.name == name){
                return this.movieRecords.get(i);
            }
        }
        return "";
    },
    //新增电影
    setMovie: function(name,code,genre,releaseDate,story,director,screenWriter,
                       leadActor,area,areaName,min,imgSrc,heat){
        var record = new Movie();
        record.id = this.movieSize//ID
        record.name = name;//名称
        record.code = code;//编号
        record.genre = genre;//类型
        record.releaseDate = releaseDate;//上映日期
        record.story = story;//剧情简介
        record.score = 0;//平均评分
        record.totalScore = 0;//总分
        record.scoreNumber = 0;//评分人数
        record.director = director;//导演
        record.screenWriter = screenWriter;//编剧
        record.leadActor = leadActor;//主演
        record.area = area;//制片国家/区域
        record.areaName = areaName;//制片国家/区域
        record.min = min;//片长
        record.imgSrc = imgSrc;//图片地址
        record.heat = heat;//热度

        this.movieRecords.put(this.movieSize,record);
        this.movieSize += 1;
    },
    //分页得到最新的电影，currentPage当前页，pageNum每页个数
    getRcentMovies:function (currentPage, pageNum) {
        var arr = new Array();
        for(var i=0; i<this.size; i++){
            arr.push(this.movieRecords.get(i));
        }
        for(var i=0; i<arr.length; i++){
            for(var j=i+1; j<arr.length; j++){
                if(arr[i].releaseDate < arr[j].releaseDate){
                    var t = arr[i];
                    arr[i] = arr[j];
                    arr[j] = t;
                }
            }
        }
        currentPage = parseInt(currentPage);
        pageNum = parseInt(pageNum);
        var offset = (currentPage-1)*pageNum + 1;//起始
        if(offset>this.movieSize){
            throw new Error("currentPage is not valid");
        }
        var number = offset + pageNum;//总数
        if(number > this.movieSize){
            number = this.movieSize;
        }
        var result  = [];
        for(var i=offset; i<number; i++){
            var object = arr[i];
            result.push(object);
        }
        return JSON.stringify(result);
    },
    //分页得到最热的电影，currentPage当前页，pageNum每页个数
    getHottestMovies:function (currentPage, pageNum) {
        var arr = new Array();
        for(var i=0; i<this.size; i++){
            arr.push(this.movieRecords.get(i));
        }
        for(var i=0; i<arr.length; i++){
            for(var j=i+1; j<arr.length; j++){
                if(arr[i].heat < arr[j].heat){
                    var t = arr[i];
                    arr[i] = arr[j];
                    arr[j] = t;
                }
            }
        }
        currentPage = parseInt(currentPage);
        pageNum = parseInt(pageNum);
        var offset = (currentPage-1)*pageNum + 1;//起始
        if(offset>this.movieSize){
            throw new Error("currentPage is not valid");
        }
        var number = offset + pageNum;//总数
        if(number > this.movieSize){
            number = this.movieSize;
        }
        var result  = [];
        for(var i=offset; i<number; i++){
            var object = arr[i];
            result.push(object);
        }
        return JSON.stringify(result);
    },
    //分页得到最Top的电影，currentPage当前页，pageNum每页个数
    getTopMovies:function (currentPage, pageNum) {
        var arr = new Array();
        for(var i=0; i<this.size; i++){
            arr.push(this.movieRecords.get(i));
        }
        for(var i=0; i<arr.length; i++){
            for(var j=i+1; j<arr.length; j++){
                if(arr[i].score < arr[j].score){
                    var t = arr[i];
                    arr[i] = arr[j];
                    arr[j] = t;
                }
            }
        }
        currentPage = parseInt(currentPage);
        pageNum = parseInt(pageNum);
        var offset = (currentPage-1)*pageNum + 1;//起始
        if(offset>this.movieSize){
            throw new Error("currentPage is not valid");
        }
        var number = offset + pageNum;//总数
        if(number > this.movieSize){
            number = this.movieSize;
        }
        var result  = [];
        for(var i=offset; i<number; i++){
            var object = arr[i];
            result.push(object);
        }
        return JSON.stringify(result);
    },
    //根据类型分页得到的电影，currentPage当前页，pageNum每页个数
    getMoviesByGenre:function (type, currentPage, pageNum) {
        var arr = new Array();
        for(var i=0; i<this.size; i++){
            if(this.movieRecords.get(i).genre == type){
                arr.push(this.movieRecords.get(i));
            }
        }
        currentPage = parseInt(currentPage);
        pageNum = parseInt(pageNum);
        var offset = (currentPage-1)*pageNum + 1;//起始
        if(offset>this.movieSize){
            throw new Error("currentPage is not valid");
        }
        var number = offset + pageNum;//总数
        if(number > this.movieSize){
            number = this.movieSize;
        }
        var result  = [];
        for(var i=offset; i<number; i++){
            var object = arr[i];
            result.push(object);
        }
        return JSON.stringify(result);
    },
    //根据区域分页得到的电影，currentPage当前页，pageNum每页个数
    getMoviesByArea:function (area, currentPage, pageNum) {
        var arr = new Array();
        for(var i=0; i<this.size; i++){
            if(this.movieRecords.get(i).area == area){
                arr.push(this.movieRecords.get(i));
            }
        }
        currentPage = parseInt(currentPage);
        pageNum = parseInt(pageNum);
        var offset = (currentPage-1)*pageNum + 1;//起始
        if(offset>this.movieSize){
            throw new Error("currentPage is not valid");
        }
        var number = offset + pageNum;//总数
        if(number > this.movieSize){
            number = this.movieSize;
        }
        var result  = [];
        for(var i=offset; i<number; i++){
            var object = arr[i];
            result.push(object);
        }
        return JSON.stringify(result);
    },
    //得到所有电影数量
    getMovieSize:function(){
      return this.movieSize;
    },
    //根据类型得到电影的数量
    getMovieSizeByGenre:function (type) {
        var arr = new Array();
        for(var i=0; i<this.size; i++){
            if(this.movieRecords.get(i).genre == type){
                arr.push(this.movieRecords.get(i));
            }
        }
        return arr.length;
    },
    //根据区域得到电影的数量
    getMovieSizeByArea:function (area) {
        var arr = new Array();
        for(var i=0; i<this.size; i++){
            if(this.movieRecords.get(i).area == area){
                arr.push(this.movieRecords.get(i));
            }
        }
        return arr.length;
    },
    //得到电影的所有的评论
    getMovieReviewsByMovieId:function (movieId) {
        var result  = [];
        for(var i=0; i<this.movieReviewSize; i++){
            if(this.movieReviewRecords[i].movieId == movieId){
                var object = arr[i];
                result.push(object);
            }

        }
        return JSON.stringify(result);
    },
    //提交电影评论
    submitMovieReview:function (movieId, submitTime, comment, score) {
        var record = new MovieReview();
        record.id = this.movieReviewSize;
        record.movieId = movieId;
        record.submitTime = submitTime;
        record.comment = comment;
        record.score = score;
        record.likeNum = 0;
        for(var i=0; i<this.movieSize; i++){
            var rocord = this.movieRecords[i];
            if(rocord.id == movieId){
                var newRecord = new Record();
                newRecord.id = rocord.id//ID
                newRecord.name = rocord.name;//名称
                newRecord.code = rocord.code;//编号
                newRecord.genre = rocord.genre;//类型
                newRecord.releaseDate = rocord.releaseDate;//上映日期
                newRecord.story = rocord.story;//剧情简介
                newRecord.totalScore = rocord.totalScore + score;//总分
                newRecord.scoreNumber = rocord.scoreNumber + 1;//评分人数
                newRecord.score = newRecord.totalScore/newRecord.scoreNumber;//平均评分
                newRecord.director = rocord.director;//导演
                newRecord.screenWriter = rocord.screenWriter;//编剧
                newRecord.leadActor = rocord.leadActor;//主演
                newRecord.area = rocord.area;//制片国家/区域
                newRecord.areaName = rocord.areaName;//制片国家/区域
                newRecord.min = rocord.min;//片长
                newRecord.imgSrc = rocord.imgSrc;//图片地址
                newRecord.heat = rocord.heat;//热度
                this.movieRecords.set(i, newRecord);
            }
        }

        this.movieReviewRecords.put(this.movieReviewSize,record);
        this.movieReviewSize += 1;
    },
    //给电影评论点赞
    likeMovieReview:function (movieReviewId) {
        var likeNum = 0;
        for(var i=0; i<this.movieReviewSize; i++){
          if(this.movieReviewRecords[i].id == movieReviewId){
              var record = this.movieReviewRecords[i];
              likeNum = record.likeNum + 1;
              var newRecord = new MovieReview();
              newRecord.id = record.id;
              newRecord.movieId = record.movieId;
              newRecord.submitTime = record.submitTime;
              newRecord.comment = record.comment;
              newRecord.score = record.score;
              newRecord.likeNum = likeNum;
              this.movieReviewRecords.set(i, newRecord);
          }
        }
    },

    //根据ID获取新闻
    getNewsById: function (index) {
        return this.newsRecords.get(index);
    },
    //新增新闻
    setNews: function(title,subTitle,author,comment,form,imgSrc,newstime){
        var record = new News();
        record.id = this.newsSize//ID
        this.title = title;//新闻标题
        this.subTitle = subTitle;//短标题
        this.author = author;//作者
        this.comment = comment;//内容
        this.form = form;//来源
        this.imgSrc = imgSrc;//图片地址
        this.newstime = newstime;//发布时间

        this.newsRecords.put(this.newsSize,record);
        this.newsSize += 1;
    },
    //分页得到最新的新闻，currentPage当前页，pageNum每页个数
    getRcentNews:function (currentPage, pageNum) {
        var arr = new Array();
        for(var i=0; i<this.size; i++){
            arr.push(this.newsRecords.get(i));
        }
        for(var i=0; i<arr.length; i++){
            for(var j=i+1; j<arr.length; j++){
                if(arr[i].newstime < arr[j].newstime){
                    var t = arr[i];
                    arr[i] = arr[j];
                    arr[j] = t;
                }
            }
        }
        currentPage = parseInt(currentPage);
        pageNum = parseInt(pageNum);
        var offset = (currentPage-1)*pageNum + 1;//起始
        if(offset>this.newsSize){
            throw new Error("currentPage is not valid");
        }
        var number = offset + pageNum;//总数
        if(number > this.newsSize){
            number = this.newsSize;
        }
        var result  = [];
        for(var i=offset; i<number; i++){
            var object = arr[i];
            result.push(object);
        }
        return JSON.stringify(result);
    },
    //得到所有新闻数量
    getNewsSize:function(){
        return this.newsSize;
    },
    //得到新闻的所有的评论
    getNewsReviewsByMovieId:function (newsId) {
        var result  = [];
        for(var i=0; i<this.newsReviewSize; i++){
            if(this.newsReviewRecords[i].newsId == newsId){
                var object = arr[i];
                result.push(object);
            }

        }
        return JSON.stringify(result);
    },
    //提交新闻评论
    submitNewsReview:function (newsId, submitTime, comment, score) {
        var record = new NewsReview();
        record.id = this.newsReviewSize;
        record.newsId = newsId;
        record.submitTime = submitTime;
        record.comment = comment;
        record.score = score;
        record.likeNum = 0;

        this.movieReviewRecords.put(this.movieReviewSize,record);
        this.movieReviewSize += 1;
    },
    //给电影评论点赞
    likeNewsReview:function (newsReviewId) {
        var likeNum = 0;
        for(var i=0; i<this.newsReviewSize; i++){
            if(this.newsReviewRecords[i].id == newsReviewId){
                var record = this.newsReviewRecords[i];
                likeNum = record.likeNum + 1;
                var newRecord = new NewsReview();
                newRecord.id = record.id;
                newRecord.newsId = record.newsId;
                newRecord.submitTime = record.submitTime;
                newRecord.comment = record.comment;
                newRecord.score = record.score;
                newRecord.likeNum = likeNum;
                this.newsReviewRecords.set(i, newRecord);
            }
        }
    },
};

module.exports = MoviesParadiseContract;