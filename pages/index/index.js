var app = getApp()
var calendar = require('../../calendar/calendar.js')
Page({
  data:{
    d_item:[],
    id_argument:0,
    // hot_item:[]
    calendar : {},
    visible : false
  },
  onLoad:function(){
    let _this = this
    wx.request({
      url: 'https://news-at.zhihu.com/api/4/news/latest',
      method:'GET',
      success:function(res){
        //console.log(res.data.top_stories)
        //console.log(res.data.stories)
        // 新闻列表
        var d_item = res.data.stories
        _this.setData({
          d_item : d_item
        })
      }
    })
    _this.init()
    console.log(_this.data)
  },
  // 初始化模板
  init : function(){
    let _this = this
    calendar.init.apply(_this, [])
  },
  // 显隐日历
  showCalendar : function(){
    this.visible = !this.visible
    this.setData({
      visible : this.visible
    })
  },
  // 获取当前点击的日期
  getDay:function (e) {
    let _this = this
    let that = this.data.calendar
    if(e.target.dataset.item < 10){
      e.target.dataset.item = '0' + e.target.dataset.item
    }
    _this.currentDay = that.currentYear + '' + that.currentMonth + '' + e.target.dataset.item
    _this.setData({
      currentDay : _this.currentDay
    })
    _this.news_refresh()
    _this.setData({
      visible : false
    })
  },
  // 跳转到当前日期的新闻列表
  news_refresh:function(){
    let _this = this
    let api = 'https://news-at.zhihu.com/api/4/news/before/' + _this.currentDay
    wx.request({
      url: api,
      method:'GET',
      success:function(res){
        var d_item = res.data.stories
        _this.setData({
          d_item : d_item
        })
      }
    })
  },
  // 跳转到详细内容页面
  readArticle:function(e){
    let _this = this
    let val = e.currentTarget.id
    _this.setData({
      id_argument : e.currentTarget.id
    })
    wx.navigateTo({
      url: '../news/news?id='+_this.data.id_argument
    })
  }
})