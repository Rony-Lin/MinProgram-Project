// pages/home/childCpns/w-recommend/w-recommend.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    recommend:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isLoad:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleImgLoad(){
      // 监听图片是否加载完成
      // 通过设置中间变量使其回调一次
      if (!this.data.isLoad){
        // console.log("加载完成");
        this.triggerEvent('imgLoad');
        this.data.isLoad = true;
      }
    }
  }
})
