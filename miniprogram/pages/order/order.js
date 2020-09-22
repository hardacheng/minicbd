// pages/order/order.js
let db = wx.cloud.database();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    autoplay:true,
    indicatordots:true,
    // 侧边栏标签数据
    plabel:[],
    // 导航栏选中id
    val:0,
    active_index:0,
    // 当点击左侧便签到scroll-view完成锚点定位这段时间,滚动时间不触发,不让val值变化,从而设置一个时间死区变量
    block:false,
    // 右侧滚动块数据
    plist:[],
    // 右侧滑块
    pswipers:[],

  },
  getLabel(){
    let collect =db.collection('plabel');
    collect.get().then(res=>{
      this.setData({
        plabel:res.data
      })
      // console.log(this.data.plabel)
    })
  },
  selectIndex(e){
    // console.log(e)
    this.setData({
      val: e.currentTarget.dataset.index,
      active_index: e.currentTarget.dataset.index,
      block:true
    })
    // 在这1秒内容足够scroll-view完成锚点定位了
    setTimeout(()=>{this.setData({
      block:false
    })},1500)

  },
  getPswipers(){
    let collect =db.collection('pswipers');
    collect.get().then(res=>{
      this.setData({
        pswipers:res.data
      })
      // console.log(this.data.pswipers)
    })
  },
  getPlist(){
    let collect =db.collection('pscroll');
    collect.get().then(res=>{
      this.setData({
        plist:res.data
      })
      // console.log(this.data.plist)
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getLabel();
    this.getPswipers();
    this.getPlist();
    wx.showToast({
      title: '商品即将呈现~',
      image:"../../images/load2.gif",
      duration: 1000
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
//   实现滚动联动标签需要首先知道每类内容的区域范围，

// 通过监听当前滚动的top距离来计算出对应的分类。

// 要获取每个锚点的位置信息，

// 应该在界面渲染完毕的情况下进行，

// 这里我们放在onReady()中去处理
  onReady: function () {
   
    // 我们在plabel中为每个分类保存了一个top属性
  setTimeout(()=>{  
    wx.createSelectorQuery().selectAll('.indexName').boundingClientRect((rects)=>{
      console.log(rects)
      rects.forEach(rect=>{
        let key = 'plabel['+rect.dataset.id+'].top';
        console.log(key,typeof key)
        this.setData({[key]: rect.top});
      });
    }).exec()
  },1000);

  },
  // 在scroll()方法中通过滚动内容区域识别出对应的标签分类：
  scroll(e) {
    // console.log(e)
    // 只有当不是时间死区时才触发滚动事件
    this.data.block ||this.data.plabel.some((v, k) => {
      // console.log(v.top)
      // 每个便签有个一一对应的内容模块的高度
      // 如果当前便签距离顶部的高度小于等于 (对应的)内容模块在滚动区域的滚动高度(就该换下一个便签了)
      if(v.top <= e.detail.scrollTop) {
        if(this.data.plabel[k+1] && this.data.plabel[k+1].top > e.detail.scrollTop) {
          // 设置当前选中的便签
          this.setData({val: k});
          return true;
        }
      }
    })
  },
  // 触底事件触发不太灵光
  bottom(e) {
    console.log('ddd')
    this.setData({val: this.data.plabel.length-1});
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    wx.setNavigationBarTitle({
      title: '饮品选购'
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