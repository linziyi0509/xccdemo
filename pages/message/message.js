//message.js
//获取应用实例
const app = getApp()

Page({
  data: {
    page:1,
    singleTrade: [],
    empty: true,
    domain: app.globalData.domain,
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    
  },
  getSingleTrade: function(page){
    wx.showToast({
      title: '没有更新记录了',
      icon: 'none'
    })
    wx.stopPullDownRefresh()
  },
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    wx.showToast({
      title: '刷新中',
      icon: 'loading'
    })
    this.setData({ singleTrade: [], page: 1 })
    this.getSingleTrade(1)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading'
    })
    this.getSingleTrade(++this.data.page)
  },
})
