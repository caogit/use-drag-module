<template>
  <div id="drag-box">
    <!-- 左侧可拖动区域 -->
    <div class="left-drag">
      <!-- 拖拽元素 -->
      <!--使用draggable组件-->
      <draggable
        class="drag-icon-ul"
        v-model="typeList"
        chosenClass="chosen"
        ghost-class="ghost"
        dragClass="dragClass"
        :options="{ group: { name: 'module', pull: 'clone' }, sort: false }"
        animation="200"
        @end="l_onEnd"
      >
        <div class="item" v-for="item in typeList" :key="item.id">
          <i :class="`iconfont ${item.icon} icon-class`"></i>
          {{ item.text }}
        </div>
      </draggable>
    </div>
    <!-- 中间移动端 -->
    <div class="center-drag">
      <!-- 释放区域 -->
      <section class="phone-box">
        <!-- header 不可拖拽 -->
        <div class="top-nav">页面标题</div>
        <!-- body拖拽部分 -->
        <div class="body-drag">
          <draggable
            class="dragCeneter"
            v-model="view"
            animation="200"
            dragClass="dragClass"
            ghostClass="ghost"
            chosenClass="chosen"
            :options="{ group: { name: 'module', pull: '' }, sort: true }"
            @end="c_onEnd"
            :move="onMove"
            @change="bog"
          >
            <div
              class="viewItem"
              v-for="(item, index) in view"
              :key="index"
              @click="checkModule(item.r_data,item.id, index)"
            >
              <span
                class="el-icon-close icon-com"
                @click.stop="deleteCom(index)"
              ></span>
              <component
                :is="item.com"
                :centreData="item.r_data"
              ></component>
            </div>
          </draggable>
        </div>
        <div style="text-align:center">
        <el-button>点击提交</el-button>
        </div>
      </section>
    </div>
    <!-- 右侧配置区 rightProp从右侧配置区拿过来的配置  -->
    <div class="rigth-drag">
      <Edit
        v-if="isRight"
        :rIndex="rIndex"
        @rightProp="rightProp"
        :rightData="rightData"
        :typeId="rId"
      ></Edit>
    </div>
  </div>
</template>

<script>
import images from "@/components/module/images";
import pinterest from "@/components/module/pinterest";
import swiper from "@/components/module/swiper";
import draggable from "vuedraggable";
import Edit from "./Edit.vue";
export default {
  data() {
    return {
      /* id是唯一表示，com是组件,r_data是传递数据 */
      typeList: [
        {
          id: 1,
          text: "瀑布流",
          icon: "icon-caochanpinliebiaopubuliumoshi",
          com: pinterest,
        },
        {
          id: 2,
          text: "图片",
          icon: "icon-caotupian",
          com: images,
          r_data: {
            url: "",
          },
        },
        {
          id: 3,
          text: "轮播图",
          icon: "icon-caolunbotuguanli",
          com: swiper,
          r_data: []
        },
      ],

      view: [],
      // 传递到右侧的data
      rightData: {},
      // 传递到右侧的index
      rIndex: 0,
      // 传递到右侧的id
      rId:0,
      isRight: false,
      initIndex: 0,
    };
  },
  components: {
    draggable,
    Edit,
  },
  methods: {
    l_onEnd(e) {
      // console.log("🚀 ~ file: Home.vue ~ line 116 ~ l_onEnd ~ evt", e);
      /* 这里必须使用这个做一层深拷贝 如果用json.parse就报错！！！！ */
      // let obj = { ...this.view[e.newIndex] };
      // this.initIndex++;
      // obj.atIndex = e.newIndex;
      // console.log("🚀 ~ file: Home.vue ~ line 131 ~ l_onEnd ~ obj", obj);
      // this.view.splice(e.newIndex, 1, obj);
      // console.log(evt);
      // const item = evt.added.element;
      // const idx = this.view.findIndex((e) => e.id === item.id);
      // let temp = [...this.view];
      // temp[idx].atIndex = evt.added.newIndex;
      // this.view = temp;
    },
    bog(evt) {},
    c_onEnd() {},
    /* 点击每一项 */
    checkModule(data,id, index) {
      // 这里的isRight用来控制右侧配置去的显示隐藏，保证每次组件都是销毁后重新创建的，这样每次都会触发组件的mounted
      this.isRight = false;
      this.rightData = data
      console.log("🚀 ~ file: Home.vue ~ line 151 ~ checkModule ~ this.rightData", this.rightData)
      this.rIndex = index;
      this.rId = id
      this.$nextTick(() => (this.isRight = true));
    },
    /* 删除每一项 */
    deleteCom(sub) {
      this.view.splice(sub, 1);
    },
    onMove(e) {
      // let views = [];
      // views = this.view.map((item, index) => {
      //   item.id = index;
      //   return item;
      // });
      // this.view = views;
    },
    /* 接收从右侧配置区拿过来的配置 */
    rightProp(val, sub) {
      console.log("🚀 ~ file: Home.vue ~ line 162 ~ rightProp ~ val", val)
      let its = this.deepCopy(this.view);
      // this.view.forEach((item, index) => {
        
        //   if (index == sub) {
          //     item.r_data = val;
      this.$set(its[sub], "r_data", val);
      //   } else {
        //     item.r_data = "";
      //   }
      // });

      // for (let i = 0; i < its.length; i++) {
        //   if (i == sub) {
          //     this.$set(its[i], "r_data", val);
      //   } else {
        //     this.$set(its[i], "r_data", "");
      //   }
      // }

      this.view = its;
      this.rightData = its[sub]
      // console.log("🚀 ~ file: Home.vue ~ line 163 ~ rightProp ~ its", its);
      // this.view[sub].r_data = its[sub].r_data;
    },

    getType(ele) {
      return Object.prototype.toString.call(ele).slice(8, -1);
    },
    deepCopy(ele) {
      const eleType = this.getType(ele);
      let result;
      if (eleType === "Object") {
        result = {};
      } else if (eleType === "Array") {
        result = [];
      } else {
        result = ele;
      }

      for (let i in ele) {
        const value = ele[i];
        const valueType = this.getType(value);
        if (valueType === "Object" || valueType === "Array") {
          result[i] = this.deepCopy(value);
        } else {
          result[i] = value;
        }
      }
      return result;
    },
  },
};
</script>

<style lang="scss" scoped>
.icon-class {
  font-size: 40px;
}
#drag-box {
  width: 100%;
  height: 100%;
  font-size: 14px;
  background-color: #f7f8f9;
  display: flex;
  .left-drag {
    width: 20%;
    background-color: #fff;
    padding-top: 20px;
    min-width: 300px;
    .drag-icon-ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
    }
  }
  .center-drag {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .phone-box {
      width: 400px;
      position: relative;
      height: 700px;
      background-color: #f5f5f5;
      box-shadow: 0 2px 6px #ccc;

      .top-nav {
        height: 72px;
        background: #f2f5c8;
        background: url("./../assets/image/topNavBlack.png");
        background-size: 100%;
        background-repeat: no-repeat;
        text-align: center;
        line-height: 88px;
        background-color: #fff;
      }
      .body-drag {
        max-width: 400px;
        height: calc(100% - 72px);
        overflow-x: hidden;
        overflow-y: auto;
        &::-webkit-scrollbar-thumb {
          background: #dbdbdb;
          border-radius: 10px;
        }
        &::-webkit-scrollbar-track {
          background: #f6f6f6;
          border-radius: 10px;
        }
        &::-webkit-scrollbar {
          width: 6px;
        }
      }
    }
  }
  .rigth-drag {
    flex: 1;
    background-color: #fff;
  }
}
</style>
