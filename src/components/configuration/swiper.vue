<!--
 * @Description: 😎
 * @Version: 2.0
 * @Autor: 曹老板
 * @Date: 2021-12-06 09:35:25
 * @LastEditors: 曹老板
 * @LastEditTime: 2021-12-17 19:01:25
-->
<template>
  <div>

    <input type="file" id="file" onChange="preview(this)" multiple @change="changeFile">
    <div v-for="(item,index) in processingRightData" :key="index">
       <img :src="item.imageUrl" alt="" class="image">
    </div>
    
  </div>
</template>

<script>
export default {
  data(){
    return{
      imageUrl:null,
      imageFile:[]
      }
  },
  props: {
    processingRightData: {
      type:[Array,Object] ,
      default:function(){
        return []
      }
    },
  },
  created(){
    },  
  methods:{
    changeFile(e){
      // 把这个赋值的动作放在选择图片后
      this.imageFile = this.processingRightData
    for(let key in e.target.files){
      if(!isNaN(Number.parseInt(key) )){
       let fileObj = {
         name:"",
         imageUrl:URL.createObjectURL(e.target.files[key])
       }
       this.imageFile.push(fileObj)
      }
    }
    this.$emit('changeProcessingRightData',this.imageFile)
    this.$emit('changeTab',this.imageFile)
    },
  }
};
</script>

<style scoped>
.image {
  width: 30px;
  height: 30px;
}
</style>
