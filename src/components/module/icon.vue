<!--
 * @Description: 😎
 * @Version: 2.0
 * @Autor: 曹老板
 * @Date: 2021-12-16 09:55:06
 * @LastEditors: 曹老板
 * @LastEditTime: 2021-12-20 09:06:08
-->
<template>
  <div class="icon">
    <div class="item-icon" v-for="(item,index) in assignList" :key="index">
    <div><i :class="`iconfont ${item.icon} icon-class`  "></i></div>
    <div><span class="icon-text">{{item.text}}</span></div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      list:[
       
      ],
      assignList:[]
    }
  },
  watch:{
    centreData:{
      immediate:true,
      handler:function(){
        // let foo = Object.keys(this.centreData).length <=0
        // let sts = true
        // if(this.centreData instanceof Array){
        //   sts = this.centreData.every(i=> i.icon==''&&i.text=='')
        // }
        // if(foo||sts ){
        //     this.assignList = this.list
        //     }else{
              this.assignList =this.centreData
            // }
      },
      deep:true
    }
  },
  created(){
  },
  props:{
     centreData: {
      type: [Array,Object],
    },
  }

}
</script>

<style scoped lang="scss">
.icon{
  background-color: #fff;
  width: 100%;
  height: auto;
  min-height: 100px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  .item-icon{
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon-class{
      font-size: 25px;
    }
    .icon-text{
      font-size: 14px;
    }
    
  }
}

</style>