<template>
  <div class="image-module">
    <el-image :src="centreData.url" style="width: 100%; height: 100%">
      <div slot="error" class="image-slot">
        <i class="el-icon-picture-outline"></i>
      </div>
    </el-image>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    centreData: {
      type: Object,
      default: function () {
        return {
          url: "",
        };
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.image-module {
  height: 300px;
  background-color: #fff;
  line-height: 300px;
  text-align: center;
}
</style>
