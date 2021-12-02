<template>
  <div id="drag-box">
    <!-- 左侧可拖动区域 -->
    <div class="left-drag">
      <!-- 拖拽元素 -->
      <ul class="drag-icon-ul" @dragstart="dragstart" @dragend="dragend">
        <li
          class="drag-icon-item"
          v-for="(item, index) in typeList"
          :key="index + 1"
          draggable
          :data-type="index"
        >
          <i :class="`iconfont ${item.icon} icon-class`"></i>
          <div>{{ item.text }}</div>
        </li>
      </ul>
    </div>
    <!-- 中间移动端 -->
    <div class="center-drag">
      <!-- 释放区域 -->
      <section
        class="phone-box"
        @drop="drops"
        @dragover="dragover"
        @dragleave="dragleave"
      >
        <!-- header 不可拖拽 -->
        <div class="top-nav">
          <img src="./../assets/image/topNavBlack.png" />
          <span class="tit">页面标题</span>
        </div>
        <!-- body拖拽部分 -->
        <div class="body-drag">
          <!-- 这里必须套一层div class是item的 -->
          <div class="item">
            <template v-for="(item, index) in view">
              <template v-if="item.dragUnderWay">
                <div class="waiting" :key="index">
                  {{ typeList[item.type].text }}
                </div>
              </template>
              <template v-else>
                <component
                  :is="typeList[item.type].com"
                  :key="index"
                ></component>
              </template>
            </template>
          </div>
        </div>
      </section>
    </div>
    <!-- 右侧配置区 -->
    <div class="rigth-drag"></div>
  </div>
</template>

<script>
import images from "@/components/module/images";
import pinterest from "@/components/module/pinterest";
import swiper from "@/components/module/swiper";
export default {
  data() {
    return {
      typeList: [
        {
          text: "瀑布流",
          icon: "icon-caochanpinliebiaopubuliumoshi",
          com: pinterest,
        },
        {
          text: "图片",
          icon: "icon-caotupian",
          com: images,
        },
        {
          text: "轮播图",
          icon: "icon-caolunbotuguanli",
          com: swiper,
        },
      ],
      type: null,
      view: [],
      isPush: false,
      index: null,
      whichModule: null,
    };
  },
  // components: {
  //   images,
  //   pinterest,
  //   swiper,
  // },
  methods: {
    dragstart(e) {
      console.log("start", e.target.dataset.type);
      this.type = e.target.dataset.type;
    },
    dragend(e) {
      console.log("end", e);
    },
    drops(e) {
      console.log("在可释放目标上被释放时触发", e);
      this.$set(this.view[this.view.length - 1], "dragUnderWay", false);
      this.isPush = false;
      this.type = null;
    },
    dragleave(e) {
      console.log("🚀 ~ file: Home.vue ~ line 104 ~ dragleave ~ e", e);
      this.view.splice(this.view.length - 1, 1);
      this.isPush = false;
      // 此处不能写this.type = null  因为你离开在移入的时候type成null了
    },
    dragover(e) {
      e.preventDefault();
      e.stopPropagation();
      let name = e.target.className;
      // 1. 移动的时候就默认添加进去一个对象，用于显示你要拖进去的组件名,这里的type是上面标签中data-type添加进去的
      const defaultData = {
        type: this.type, // 组件类型
        dragUnderWay: true, // 是否是拖拽中
        data: [], // 数据
        options: {}, // 选项操作
      };
      // 2. 根据class名判断，当你移入到的元素不在其他元素上面，e.target.className就是phone-box，否则就是body-drag
      if (name === "phone-box") {
        // 3. isPush是拖拽元素是否已push到页面数据中，最后将它赋为true
        if (!this.isPush) {
          this.view.push(defaultData);
        }
      } else {
        // 4. 也就是在已有元素的上方，则需要计算位置，上/下方，添加 or 移动
        if (!this.isPush) {
          this.view.push({
            type: this.type, // 组件类型
            dragUnderWay: true, // 是否是拖拽中
            data: [], // 数据
            options: {}, // 选项操作
          });
        }
      }
      this.isPush = true;
    },
  },
};
</script>

<style lang="scss">
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
    .drag-icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      transition: all 0.3s;
      cursor: pointer;
      border-radius: 6px;
      padding: 10px 10px;
      &:hover {
        background-color: #efefef;
      }
    }
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
      padding-top: 72px;
      .top-nav {
        position: absolute;
        top: 0;
        background: #f2f5c8;
        z-index: 999;
        transition: all 0.3s;
        & * {
          pointer-events: none;
        }
        &:hover {
          transform: scale(0.95);
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 0 10px #afafaf;
        }
        .tit {
          position: absolute;
          left: 50%;
          bottom: 10px;
          transform: translateX(-50%);
        }
        img {
          max-width: 100%;
          image-rendering: -moz-crisp-edges;
          image-rendering: -o-crisp-edges;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          -ms-interpolation-mode: nearest-neighbor;
        }
      }
      .body-drag {
        max-width: 400px;
        .waiting {
          width: 100%;
          height: 30px;
          background-color: cornflowerblue;
          line-height: 30px;
          text-align: center;
        }
        .item {
          pointer-events: none;
          & * {
            pointer-events: none;
          }
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
