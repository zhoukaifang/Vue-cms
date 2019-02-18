<template>
  <div class="goodsinfo-container">
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="ball" v-show="ballFlag" ref="ball"></div>
    </transition>
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <swipe :banners="lunbotu"></swipe>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">{{goodsinfo.title}}</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p class="price">
            市场价：
            <del>￥{{goodsinfo.market_price}}</del>&nbsp;&nbsp;销售价：
            <span class="now_price">￥{{goodsinfo.sell_price}}</span>
          </p>
          <div class="numbox">
            <span class="title">购买数量：</span>
            <input
              :disabled="buyCount==1"
              type="button"
              value="-"
              @click="buyCount >=2 && buyCount--"
            >
            <input @change="filterMaxCount" type="number" v-model="buyCount">
            <input
              :disabled="buyCount==goodsinfo.stock_quantity"
              type="button"
              value="+"
              @click="buyCount < goodsinfo.stock_quantity && buyCount++"
            >
          </div>
          <p>
            <mt-button type="primary" size="small">立即购买</mt-button>
            <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
          </p>
        </div>
      </div>
    </div>
    <div class="mui-card">
      <div class="mui-card-header">商品参数</div>
      <div class="mui-card-content">
        <div class="mui-card-content-inner">
          <p>商品货号：{{ goodsinfo.goods_no }}</p>
          <p>库存情况：{{ goodsinfo.stock_quantity }}件</p>
          <p>上架时间：{{ goodsinfo.add_time | dataFormat }}</p>
        </div>
      </div>
      <div class="mui-card-footer">
        <mt-button @click="goDesc(id)" type="primary" size="large" plain>图文介绍</mt-button>
        <mt-button @click="goComment(id)" type="danger" size="large" plain>商品评论</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      lunbotu: [],
      goodsinfo: [],
      buyCount: 1,
      ballFlag: false
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getLunbotu() {
      this.$http.get("getthumimages/" + this.id).then(result => {
        this.lunbotu = result.body.message;
      });
    },
    getGoodsInfo() {
      this.$http.get("goods/getinfo/" + this.id).then(result => {
        this.goodsinfo = result.body.message[0];
      });
    },
    addToShopCar() {
      this.ballFlag = !this.ballFlag;
      this.$store.commit("addToCar", {
        id: this.goodsinfo.id,
        count: this.buyCount,
        price: this.goodsinfo.sell_price,
        selected: true
      });
    },
    filterMaxCount() {
      if (this.buyCount > this.goodsinfo.stock_quantity) {
        this.buyCount = this.goodsinfo.stock_quantity;
      }
    },
    goComment(id) {
      this.$router.push("/home/goodsComment/" + id);
    },
    goDesc(id) {
      this.$router.push("/home/goodsDesc/" + id);
    },
    beforeEnter: el => {
      el.style.transform = "translate(0,0)";
    },
    enter(el, done) {
      el.offsetWidth;
      const ballPosition = this.$refs.ball.getBoundingClientRect();
      const badgePosition = document
        .getElementById("badge")
        .getBoundingClientRect();
      const xDist = badgePosition.left - ballPosition.left;
      const yDist = badgePosition.top - ballPosition.top;
      el.style.transform = `translate(${xDist}px, ${yDist}px)`;
      el.style.transition = "all 0.5s cubic-bezier(.4,-0.3,1,.68)";
      done();
    },
    afterEnter() {
      this.ballFlag = !this.ballFlag;
    }
  }
};
</script>
<style lang='less' scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;
  .numbox {
    display: flex;
    height: 50px;
    align-items: center;
    input {
      width: 30px;
      height: 30px;
      padding: 0;
      margin: 0;
      text-align: center;
      &[type="number"] {
        border-left: 0;
        border-right: 0;
        font-size: 12px;
        color: gray;
      }
    }
  }
  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }

  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }
  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 398px;
    left: 132px;
  }
}
</style>
