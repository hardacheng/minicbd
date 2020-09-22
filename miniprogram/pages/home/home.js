// pages/home/home.js
let db = wx.cloud.database();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swipers:[]

  },
  showToast(){
    wx.showToast({
      title: '未关联任何公众号~',
      icon:"none",
      image:"../../images/error.png",
      mask:true
    })
  },
  showToast2(){
    wx.showToast({
      title: '您还不是会员~',
      icon:"none",
      image:"../../images/error.png",
      mask:true
    })
  },
  getAll(){
    let collect =db.collection('hswipers');
    collect.get().then(res=>{
      this.setData({
        swipers:res.data
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showToast({
      title: '等一下下~',
      image:"../../images/load2.gif",
      duration: 1000
    });
    this.getAll();


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