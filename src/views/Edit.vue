<template>
  <div>
    <component
      :is="listInfo[typeId]"
      @changeTab="tab"
      :processingRightData="processingRightData"
      :rIndex="rIndex"
      @changeProcessingRightData="changeProcessingRightData"
    ></component>
  </div>
</template>

<script>
import images from "@/components/configuration/images";
import swiper from "@/components/configuration/swiper";
export default {
  name: "Edit",
  data() {
    return {
      listInfo: {
        2: "images",
        3: "swiper",
      },
      processingRightData:{}
    };
  },
  props: ["rightData", "rIndex","typeId"],
  components: {
    images,
    swiper,
  },
  mounted() {
    this.changeRigthData(this.rightData)
  },
  methods: {
     /* 传递值的作用 */
    tab(val) {
      this.$emit("rightProp", val, this.rIndex);
    },
    // 根据不同组件传不同的值
    changeRigthData(val){
      console.log(1);
         this.processingRightData = val
    },
    // 改变值的作用
    changeProcessingRightData(val){
      this.processingRightData = val
    }
  },
};
</script>

<style scoped></style>
