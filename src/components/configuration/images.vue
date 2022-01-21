<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="https://jsonplaceholder.typicode.com/posts/"
      accept=".jpg,.bpm,.png"
      :on-change="handleChange"
      :file-list="fileList"
      :http-request="upload"
      :show-file-list="false"
      :limit="1"
      :auto-upload="false"
    >
      <el-button slot="trigger" size="small" type="primary">添加图片</el-button>
    </el-upload>
    <div v-if="processingRightData.url">
      <img
        :src="processingRightData.url"
        alt=""
        class="image"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],              
      imageUrl: null,
    };
  },
  props: {
    processingRightData: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  mounted() {
    console.log(1);
  },
  methods: {
    handleChange(file, fileList) {
      const files = {
        name: "",
        url: URL.createObjectURL(file.raw),
      };
      this.$emit('changeProcessingRightData',{url:files.url})
      this.$emit("changeTab", files);
    },
    upload(parms) {
      //   const form = new FormData();
      //   form.append("file", file);
      //   form.append("clientType", "multipart/form-data");
    },
  },
};
</script>

<style>
.image {
  width: 30px;
  height: 30px;
}
</style>
