// components/w-backTop/w-back-top.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleBackTop(){
      // console.log("-----")
      // 调用pageScrollTo接口回顶
      wx.pageScrollTo({
        scrollTop: 0,
      })
    }
  }
})
