// components/w-tab-bar/w-tab-bar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    headLine:{
      type:Array,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex:0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemClick(event){
      // console.log("---",event);
      const index = event.currentTarget.dataset.index;
      this.setData({
        currentIndex:index
      })
      const data = {index:this.data.currentIndex}
      this.triggerEvent('itemClick',data,{});
    }
  }
})
