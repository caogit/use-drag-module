<!--
 * @Description: 😎
 * @Version: 2.0
 * @Autor: 曹老板
 * @Date: 2021-12-17 09:11:25
 * @LastEditors: 曹老板
 * @LastEditTime: 2021-12-24 10:58:51
-->
<template>
  <div>
    <el-tabs type="border-card" v-model="paneName">
      <!-- <el-tab-pane label="4" name="4" v-for="(i,sub) in paneName"> -->
      <el-tab-pane :label="i.label" :name="i.name" v-for="(i,sub) in tabs.paneTabs" :key="sub">
          <!-- <template v-if="paneName === i.name"> -->
             <template v-for="(item, index) in tabs.children">
          <div :key="index">
            <div>
              <span>{{ index+1 }}</span>
            </div>
            <div>
              <el-form label-width="80px">
                <el-form-item label="icon链接">
                  <el-input v-model="item.icon"></el-input>
                </el-form-item>
                <el-form-item label="icon文字">
                  <el-input v-model="item.text"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
        <!-- </template> -->
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  props: {
    processingRightData: {
      type: [Array,Object],
    },
  },
 
  watch:{
      paneName(newv,oldv){
          if(newv!=oldv){
      this.findPaneTabs()
      }
      },
      tabs:{
        handler: function (val, oldVal) { 
            this.saveIcon()
        },
        deep:true
      }  
  },
  data() {
    return {
      paneName: "4",
      tabs:{
        paneTabs:[
           {
              label:"4",
              name:"4",
          },
          {
              label:"5",
              name:"5",
         },
          {
              label:"6",
              name:"6",
          }
        ],
        children:[{
          icon:'icon-caoduosucai',
          text:'积分365'
        },
        {
          icon:'icon-caoa-gouwugouwudai',
          text:'聪明购'
        },
        {
          icon:'icon-caoa-beibaolvhangbao',
          text:'贵宾出行'
        },
        {
          icon:'icon-caoa-hangbanfeiji',
          text:'手机充值'
        },]
      }
    };
  },
  created(){
      this.changeList()
      this.findPaneTabs()
  },
  methods:{
      changeList(){
        let isBoolean = Object.keys(this.processingRightData).length>0
        if(isBoolean){
            this.paneName = String(this.processingRightData.length)
                    this.tabs.children = this.processingRightData
                }
        },
        /* table切换 */
      findPaneTabs(){
          for(let i =0;i<Number(this.paneName);i++){
            if(this.tabs.children.length<Number(this.paneName)){
              this.tabs.children.push({icon:'',text:''})
            }else{
              this.tabs.children.splice(this.tabs.children.length-1,this.tabs.children.length-this.paneName)
            }
          }
      },
      saveIcon(){
      // const fineThis = this.searchTabs(this.paneName)
      this.$emit("changeTab", this.tabs.children);
      },
  }
}
</script>

<style>
</style>