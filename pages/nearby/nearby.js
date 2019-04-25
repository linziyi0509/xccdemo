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
    this.getPermission(0, this);
  },
  //选择获取地理位置
  getAddress: function () {
    var that = this;
    this.getPermission(1,that);
  }, 
  //获取用户地理位置权限
  getPermission: function (once,obj) {
    if (once == 0){
      wx.chooseLocation({
        success: function (res) {
          console.log('chooseLocation---' + res);
          console.log('location---:' + res.name + '--' + res.address + '---' + res.latitude + '---' + res.longitude);
          obj.setData({
            empty: false,
            latitude: res.latitude,
            longitude: res.longitude
          })
        }
    })
    }else{
      wx.chooseLocation({
        success: function (res) {
          console.log('chooseLocation---' + res);
          console.log('location---:' + res.name + '--' + res.address + '---' + res.latitude + '---' + res.longitude);
          obj.setData({
            empty: false,
            latitude: res.latitude,
            longitude: res.longitude
          })
        },
        fail: function (failres) {
          console.log('failres:'+failres.errMsg);
          wx.getSetting({
            success: function (res) {
              var statu = res.authSetting;
              if (!statu['scope.userLocation']) {
                wx.showModal({
                  title: '是否授权当前位置',
                  content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                  success: function (tip) {
                    if (tip.confirm) {
                      wx.openSetting({
                        success: function (data) {
                          if (data.authSetting["scope.userLocation"] === true) {
                            wx.showToast({
                              title: '授权成功',
                              icon: 'success',
                              duration: 1000
                            })
                            //授权成功之后，再调用chooseLocation选择地方
                            wx.chooseLocation({
                              success: function (res) {
                                console.log('chooseLocation---' + res);
                                console.log('location---:' + res.name + '--' + res.address + '---' + res.latitude + '---' + res.longitude);
                                this.setData({
                                  empty: false,
                                  latitude: res.latitude,
                                  longitude: res.longitude
                                })
                              },
                            })
                          } else {
                            wx.showToast({
                              title: '授权失败',
                              icon: 'success',
                              duration: 1000
                            })
                          }
                        }
                      })
                    }
                  }
                })
              }
            },
            fail: function (res) {
              wx.showToast({
                title: '调用授权窗口失败',
                icon: 'success',
                duration: 1000
              })
            }
          })
        }
      })
    }
  },
})
