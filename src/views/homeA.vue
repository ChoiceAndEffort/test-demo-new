<template>
  <div>
    <div>
      <div class="monitor-list">
        <!-- 左边按钮 -->
        <div class="btn" @click="scrollLeft">
          <i class="el-icon el-icon-caret-left" />
        </div>
        <!-- 中间列表 -->
        <div class="list-box">
          <div class="list">
            <div v-for="item in monitorList" :key="item.id" class="list-item">
              <img
                v-if="item.status"
                width="60"
                height="60"
                :src="imgList.alive"
                alt=""
              />
              <img v-else width="60" height="60" :src="imgList.down" alt="" />
              {{ item.name }}
            </div>
          </div>
        </div>
        <!-- 右边按钮 -->
        <div class="btn" @click="scrollRight">
          <i class="el-icon el-icon-caret-right" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      monitorList: [],
      imgList: {
        alive:
          "https://img1.baidu.com/it/u=3340721466,2283465351&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=528",
        down: "https://img2.baidu.com/it/u=1812800965,2509111185&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500",
      },
    };
  },
  created() {
    this.initMonitorList();
  },
  methods: {
    initMonitorList() {
      for (let i = 1; i < 21; i++) {
        this.monitorList.push({
          id: i,
          name: `item${i + 1}`,
          status: 0,
        });
      }
    },
    // 左滑动逻辑
    scrollLeft() {
      const allLength = this.monitorList.length * 120;
      const boxLength = document.querySelector(".list-box").clientWidth;
      if (allLength < boxLength) return;
      const listEl = document.querySelector(".list");
      const leftMove = Math.abs(
        parseInt(window.getComputedStyle(listEl, null)?.left)
      );
      if (leftMove + boxLength - 360 < boxLength) {
        // 到最开始的时候
        listEl.style.left = "0px";
      } else {
        listEl.style.left = "-" + (leftMove - 360) + "px";
      }
    },
    // 右滑动逻辑
    scrollRight() {
      const allLength = this.monitorList.length * 120;
      const boxLength = document.querySelector(".list-box").clientWidth;
      if (allLength < boxLength) return;
      const listEl = document.querySelector(".list");
      const leftMove = Math.abs(
        parseInt(window.getComputedStyle(listEl, null)?.left)
      );
      if (leftMove + boxLength + 360 > allLength) {
        listEl.style.left = "-" + (allLength - boxLength) + "px";
      } else {
        listEl.style.left = "-" + (leftMove + 360) + "px";
      }
    },
  },
};
</script>
<style lang="less" scoped>
.monitor-list {
  display: flex;
  justify-content: space-between;
  height: 95px;

  .btn {
    border: 1px solid #b3d8ff;
    width: 50px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    cursor: pointer;
    background-color: #ecf5ff;
    // icon
    font-size: 24px;
    color: #409eff;

    &:hover {
      background-color: #409eff;
      color: white;
    }
  }
  .list-box {
    // width: calc(100vw - 100px);
    width: 800px;
    overflow: hidden;

    .list {
      // width: calc(100vw - 100px);
      width: 800px;
      display: flex;
      transform: all 2s;
      .list-item {
        width: 100px;
        height: 95px;
        text-align: center;
        padding: 10px;
        cursor: pointer;
        margin-left: 40px;
      }
      position: relative;
      left: 0;
      transition: left 1s;
    }
  }
}
</style>
7