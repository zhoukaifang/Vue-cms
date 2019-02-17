<template>
  <div>
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
      >
        <div class="mui-scroll">
          <a
            :class="['mui-control-item' ,{'mui-active' : item.id ==0}]"
            v-for="item in categories"
            :key="item.id"
            @click="getPhotoList(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>
    <ul class="photo-list">
      <router-link
        v-for="item in photoList"
        :key="item.id"
        :to="'/home/photoInfo/'+item.id"
        tag="li"
      >
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
import mui from "@/lib/mui/js/mui.min.js";
export default {
  data() {
    return {
      categories: [],
      photoList: []
    };
  },
  created() {
    this.getPhotoList(0);
    this.getCategories();
  },
  mounted() {
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005
    });
  },
  methods: {
    getCategories() {
      this.$http.get("getimgcategory").then(result => {
        this.categories = result.body.message;
        this.categories.unshift({ id: 0, title: "全部" });
      });
    },
    getPhotoList(cateId) {
      this.$http.get("getimages/" + cateId).then(result => {
        this.photoList = result.body.message;
      });
    }
  }
};
</script>
<style lang="less" scoped>
* {
  touch-action: pan-y;
}
.photo-list {
  padding: 10px;
  padding-bottom: 0px;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }
    .info {
      color: #fff;
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
