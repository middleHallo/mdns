// pages/mdns/mdns.js
// 服务发现事件的list（也就是解析成功）
let serviceList = []
// 服务解析失败事件的list
let resolveFailList = []
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lists:[],
    resolveFailList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLocalService()
    
    
  },

  /**
   * 开始搜索
   */
  startDiscovery:function(){
    let that = this
    serviceList = []
    resolveFailList = []
    wx.startLocalServiceDiscovery({
      serviceType:'_http._tcp.',
      success:function(res){
        
        
      },
      fail:function(err){
        console.log(err)
      },
      complete:function(){
        console.log('complete')
      }
    })

  },

  /**
   * stopDiscovery
   */
  stopDiscovery:function(){
    let that = this
    wx.stopLocalServiceDiscovery({
      success: function () {
        that.showTips('停止搜索成功','success')
        serviceList = []
        resolveFailList = []
        that.setData({
          lists:[],
          resolveFailList:[]
        })
        
        
      },
      fail: function () {
        that.showTips('停止搜索失败，请重试！')
      },
      complete: function () {
        console.log('stopDiscovery complete')
      }
    })
  },

  /**
   * 提示方法
   */
  showTips:function(title='出错啦',icon='none'){
    wx.showToast({
      title: title,
      icon: icon,
      duration:2000
    })
  },

  /**
   * 监听方法合集
   */
  onLocalService:function(){
    let that = this
    // 监听服务发现事件
    wx.onLocalServiceFound(function (obj) {
      console.log(obj)
      serviceList.forEach(function(){
        
      })
      serviceList.push(obj);
      that.setData({
        lists: serviceList
      })
    })

    // 监听服务解析失败事件
    wx.onLocalServiceResolveFail(function (obj){
      resolveFailList.push(obj)
      that.setData({
        resolveFailList: resolveFailList
      })
    })

    // 监听服务离开
    wx.onLocalServiceLost(function (obj){
      that.showTips('有服务离开啦');
      console.log(obj)
    })

    // 监听搜索停止
    wx.onLocalServiceDiscoveryStop(function (obj){
      console.log('监听到搜索停止事件')
    })

  },

  /**
   * offLocalService
   */
  offLocalService: function () {

    console.log('是否执行此部分数据')
    // 取消监听服务发现事件
    wx.offLocalServiceFound(function () {
      console.log('取消监听服务发现事件 成功')
    })

    // 取消监听服务解析失败事件
    wx.offLocalServiceResolveFail(function () {
      console.log('取消监听 mDNS 服务解析失败的事件 成功')
    })

    // 取消监听服务离开
    wx.offLocalServiceLost(function () {
      console.log('取消监听服务离开事件 成功')
    })

    // 取消监听搜索停止
    wx.offLocalServiceDiscoveryStop(function () {
      console.log('取消监听 mDNS 服务停止搜索的事件 成功')
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})