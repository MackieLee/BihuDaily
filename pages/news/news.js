var WxParse = require("../../wxParse/wxParse")
Page({
  data:{
    body:''
  },
  onLoad:function(option){
    let _this = this
    let id = option.id
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/'+id,
      method:'GET',
      success:function(res){
        _this.setData({
          body : res.data.body
        })
        WxParse.wxParse('article', 'html', _this.data.body, _this, 0)
      }
    })
  }
})