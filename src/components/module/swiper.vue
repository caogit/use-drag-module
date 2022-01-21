<!--
 * @Description: 😎
 * @Version: 2.0
 * @Autor: 曹老板
 * @Date: 2021-12-01 14:21:59
 * @LastEditors: 曹老板
 * @LastEditTime: 2021-12-16 09:47:22
-->
<template>
  <div class="image-module">
    <el-carousel trigger="click" height="150px">
      <template v-if="centreData.length>0">
      <el-carousel-item v-for="(item,index) in centreData" :key="index" >
       <img class="img" :src="item.imageUrl" alt="" >
      </el-carousel-item>
      </template>
       <img class="img" src='@/assets/logo.png' alt="" v-else>
    </el-carousel>
  </div>
</template>

<script>
export default {
  props:{
    centreData:{
      type:Array,
      default:()=>{
        return []
      }
    }
  },
};
</script>

<style scoped>
.image-module {
  background-color: #fff;
}
.img{
  width: 100%;
  height: 150px;
}
</style>
