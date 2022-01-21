<!--
 * @Description: 😎
 * @Version: 2.0
 * @Autor: 曹老板
 * @Date: 2021-12-02 15:20:50
 * @LastEditors: 曹老板
 * @LastEditTime: 2021-12-17 19:01:59
-->
<template>
  <div>
    <component
      :is="listInfo[typeId]"
      @changeTab="tab"
      :processingRightData="processingRightData"
      @changeProcessingRightData="changeProcessingRightData"
      :rIndex="rIndex"
     
    ></component>
  </div>
</template>

<script>
import images from "@/components/configuration/images";
import swiper from "@/components/configuration/swiper";
import icon from "@/components/configuration/icon";
export default {
  name: "Edit",
  data() {
    return {
      listInfo: {
        2: "images",
        3: "swiper",
        4: "icon",
      },
      processingRightData:''
    };
  },
  props: ["rightData", "rIndex","typeId"],
  components: {
    images,
    swiper,
    icon
  },
  /* 这里必须使用created，不能使用mounted */
  created() {
      this.processingRightData = JSON.parse(JSON.stringify(this.rightData)) 
  },
  methods: {
     /* 传递值的作用 */
    tab(val) {
      this.$emit("rightProp", val, this.rIndex);
    },
    // 改变值的作用
    changeProcessingRightData(val){
      this.processingRightData = val
    }
  },
};
</script>

<style scoped></style>
