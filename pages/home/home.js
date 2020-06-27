// pages/home/home.js
import { getMultiData,getGoodsData } from "../../service/home.js"

const types = ['pop', 'new', 'sell']
const TOP_DISTANCE = 1000;

Page({

  /**
   * 页面的初始数据
   */

  data: {
    banners:[],
    recommends:[],
    titles: ['流行', '新款', '精选'],
    goods:{
      'pop': { page: 0, list: [] },
      'new': { page: 0, list: [] },
      'sell': { page: 0, list: [] },
    },
    currentType:'pop',
    isShowBackTop:false,
    isTabFixed:false,
    tabScrollTop:0
  },
  // 事件监听函数
  handleTabClick(event){
    // console.log(event);
    // 1.获取当前点击的index
    const index = event.detail.index;
    // 2将currentType与index相匹配，采用中间数组
    this.setData({
      currentType:types[index]
    })
  },
  // 获取轮播图和推荐数据
  _getMultiData(){
    getMultiData().then(res => {
      // console.log(res);
      const banners = res.data.data.banner.list;
      // console.log(banners);
      const recommends = res.data.data.recommend.list;
      // console.log(recommends);
      this.setData({
        banners,
        recommends
      })
    }).catch(err => {
      console.log(err)
    })
  },
  _getGoodsData(type){
    // 1获取页码
    const page = this.data.goods[type].page + 1;

    // 2发送网络请求
    getGoodsData(type,page).then(res => {
      // console.log(res);
    
    // 3取出list数据
    const list = res.data.data.list;

    // 4因为我们并非替换goods,而是替换goods[type]的list
    // 所以将获取的list通过一个中间变量添加进goods.list
    const oldList = this.data.goods[type].list;
    oldList.push(...list); //...list是es6语法，即是将list数组解构成每一个数组元素再添加进数组，也可以采用es6for...of
    // 注意:此处比Vue多了几步声明变量并修改数据，这是因为到第四步这里小程序非响应式，真正修改数据需要再走下面第五步，方能真正实现响应式数据更新
    // 单独修改goods中的list，采用以下办法
    const typeKey = `goods.${type}.list`
    const pageKey = `goods.${type}.page`

    // 5将数据在setData中进行修改
    this.setData({
      [typeKey]:oldList,
      [pageKey]:page
    })
    }).catch(err => {
      console.log(err)
    })
  },
  imgLoad(){
    // console.log("----")
    wx.createSelectorQuery().select('#tab-controll').boundingClientRect(rect => {
      // console.log(rect);
      // 将获取的高度进行保存进tabScrollTop
      this.data.tabScrollTop = rect.top;
    }).exec()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function(options){
    // 展示轮播和推荐数据
    this._getMultiData();
    // 展示商品数据
    this._getGoodsData('pop');
    this._getGoodsData('new');
    this._getGoodsData('sell');
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   * 页面显示未必所有图片加载完成
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
    // console.log("滚动到底部")
    // 调用getGoodsData函数,获取当前类型的页面和数据并添加进去
    this._getGoodsData(this.data.currentType);
  },
  onPageScroll(options){
    // console.log(options)
    // 获取当前滚动高度
    const scrollTop = options.scrollTop;

    // 比较当前高度与设定高度是否一致
    // 官方文档：不要在滚动函数回调中频繁调用this.setData 所以通过if函数进行判断
    const flag1 = scrollTop >= TOP_DISTANCE;
    if(flag1 != this.data.isShowBackTop){
      this.setData({
        isShowBackTop:flag1
      })
    }
    // 修改isTabFixed属性
    const flag2 = scrollTop >= this.data.tabScrollTop;
    if (flag2 != this.data.isTabFixed){
      this.setData({
        isTabFixed:flag2
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})
// 获取全局数据并展示 getApp()用户获取App的实例对象，不需要new getApp()
// let app = getApp();
// console.log(app.golobeData.name);
// console.log(app.golobeData.age);