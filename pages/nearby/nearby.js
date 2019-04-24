//nearby.js
//获取应用实例
const app = getApp()

Page({
  data: {
    latitude:"",
    longitude:"",
    searchList:{},
    empty:true
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onReady: function(){

  },
  onLoad: function () {
    this.getLocation();
  },
  getLocation:function(){
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        wx.chooseLocation({
          type: 'wgs84',
          success: res => {
            console.log('location---:' + res.name + '--' + res.address + '---' + res.latitude + '---' + res.longitude);
            that.setData({
              empty: false,
              latitude: res.latitude,
              longitude: res.longitude
            })
          }
        })
      }
    })
  }
})
