<template>
    <div>
        <!-- 顶部滑动条区域 -->
        <div id="slider" class="mui-slider">
			<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll">
					<router-link :class="['mui-control-item', item.id ==  0 ? 'mui-active' : '']" v-for="item in msg" :key="item.id" @click="getimages(item.id)" :to="'/home/photoinfo/' + item.id" tag="li">
						{{ item.title }}
          </router-link>
				</div>
			</div>
		</div>
        <!-- 图片列表区域 -->
        <ul class="photo-list">
            <li v-for="item in list" :key="item.id">
              <img v-lazy="item.img_url">
              <div class="info">
                <div class="info-title">{{ item.title }}</div>
                <div class="info-body">{{ item.zhaiyao }}</div>
              </div>
            </li>
        </ul>
    </div>
</template>

<script>
// 导入 mui 的js文件
import mui from "../../lib/mui/js/mui.min.js";

export default {
  data() {
    return {
      msg: [],
      list: []
    };
  },
  created() {
    this.getMessage();
    this.getimages(0);
  },
  mounted() {
    // 初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getMessage() {
      this.$http.get("api/getimgcategory").then(data => {
        if (data.body.status == 0) {
          data.body.message.unshift({ title: "全部", id: 0 });
          this.msg = data.body.message;
        }
      });
    },
    getimages(cateid) {
      this.$http.get("api/getimages/" + cateid).then(data => {
        if (data.body.status == 0) {
          this.list = data.body.message;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    position: relative;
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info{
      color:white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
    }
  }
}
</style>
