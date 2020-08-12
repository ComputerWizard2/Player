/*
  1:歌曲搜索接口
    请求地址:https://autumnfish.cn/search
    请求方法:get
    请求参数:keywords(查询关键字)
    响应内容:歌曲搜索结果

     2:歌曲url获取接口
    请求地址:https://autumnfish.cn/song/url
    请求方法:get
    请求参数:id(歌曲id)
    响应内容:歌曲url地址

    3.歌曲详情获取
    请求地址:https://autumnfish.cn/song/detail
    请求方法:get
    请求参数:ids(歌曲id)
    响应内容:歌曲详情(包括封面信息)

      4.热门评论获取
    请求地址:https://autumnfish.cn/comment/hot?type=0
    请求方法:get
    请求参数:id(歌曲id,地址中的type固定为0)
    响应内容:歌曲的热门评论

    5.mv地址获取
    请求地址:https://autumnfish.cn/mv/url
    请求方法:get
    请求参数:id(mvid,为0表示没有mv)
    响应内容:mv的地址
    */
   var app =new Vue({
    el:"#player",
    data:{
        query:"",
        musicList:[],
        srcMusic:"",
        imageMusic:"",
        hotComments:[],
        flag:false,
        mvUrl:"",
        isShow:false,
       
    },
    methods:{
        searchMusic:function(){
            var that =this;
            axios.get("https://autumnfish.cn/search?keywords="+this.query).then(function(response){
               // console.log(response);
               that.musicList=response.data.result.songs;
               
            },function(erro){});
        },
        playMusic:function(id){
            var that =this;
               axios.get("https://autumnfish.cn/song/url?id="+id).then(function(response){

            //console.log(response.data)
            that.srcMusic=response.data.data[0].url;
           

               },function(erro){});

               axios.get("https://autumnfish.cn/song/detail?ids="+id).then(function(response){
                //console.log(response);
               // console.log(response.data.songs[0].al.picUrl);
                that.imageMusic=response.data.songs[0].al.picUrl;

               },function(erro){});

               axios.get("https://autumnfish.cn/comment/hot?type=0&id="+id).then(function(response){

                   //console.log(response);
                   // console.log(response.data.data.hotComments)
                    that.hotComments=response.data.hotComments;
               },function(error){});

        },
        play:function(){
           // console.log("play");
           this.flag=true;
        },
        pause:function(){

            //console.log("pause");
            this.flag=false;
        },
        playMv:function(mvId){
            var that=this;
            axios.get("https://autumnfish.cn/mv/url?id="+mvId).then(function(response){
                that.isShow=true;
               that.mvUrl=response.data.data.url;

            },function(erro){});
        },
        hide:function(){
            this.isShow=false;
            this.mvUrl="";
        }
    
        
    }

   });