<template>
  <div class="image-module">
    <el-carousel trigger="click" height="150px">
      <el-carousel-item v-for="(item,index) in centreData" :key="index">
       <img class="img" :src="item.imageUrl" alt="">
      </el-carousel-item>
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
