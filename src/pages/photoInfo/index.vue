<template>
  <div class="photoinfo-container">
    <h3>{{ photoInfo.title }}</h3>
    <p class="subtitle">
      <span>发表时间：{{ photoInfo.add_time | dataFormat }}</span>
      <span>点击：{{ photoInfo.click }}次</span>
    </p>

    <hr>
    <div class="thumbs">
      <img
        class="preview-img"
        v-for="(item, index) in list"
        :key="index"
        :src="item.src"
        height="100"
        @click="$preview.open(index, list)"
      >
    </div>
    <div class="content" v-html="photoInfo.content"></div>
    <comment :id="id"></comment>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      photoInfo: [],
      list: []
    };
  },
  created() {
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods: {
    getPhotoInfo() {
      this.$http.get("getimageInfo/" + this.id).then(result => {
        this.photoInfo = result.body.message[0];
      });
    },
    getThumbs() {
      this.$http.get("getthumimages/" + this.id).then(result => {
        result.body.message.forEach(item => {
          item.w = 600;
          item.h = 400;
        });
        this.list = result.body.message;
      });
    }
  }
};
</script>
<style lang="less" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }

  .thumbs {
    img {
      margin: 10px;
      box-shadow: 0 0 8px #999;
    }
  }
}
</style>
