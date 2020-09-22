// pages/wallet/wallet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:'',
    danhao:0,
    // 根据商品页传的参来获取数据请求数据库,循环渲染
    plist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '正在加载~',
      image:"../../images/load2.gif",
      duration: 1000
    });
    this.setData({danhao:Math.floor(Math.random()*999)})
    if(!this.data.userInfo){
      
      wx.getUserInfo({
        success: function(res) {
          // console.log(res.userInfo)
        }
      })
    }
    
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
    wx.setNavigationBarTitle({
      title: '我的订单'
    });
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#fff',
    });
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