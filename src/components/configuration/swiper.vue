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
  mounted(){
  // this.imageFile = this.processingRightData
    // this.showImage()
  },  
  methods:{
    changeFile(e){
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
