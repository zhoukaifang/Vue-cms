<template>
  <scroller
    refreshLayerColor="darkorange"
    loadingLayerColor="darkorange"
    ref="sc"
    refreshText="用力点拉~~"
    noDataText="客官冒得了~~"
    :on-refresh="refresh"
    :on-infinite="infinite"
  >
    <div class="goods-list">
      <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
        <img :src="item.img_url">
        <h1 class="title">{{item.title}}</h1>
        <div class="info">
          <p class="price">
            <span class="now">￥{{item.sell_price}}</span>
            <span class="old">￥{{item.market_price}}</span>
          </p>
          <p class="sell">
            <span>热卖中</span>
            <span>剩{{item.stock_quantity}}件</span>
          </p>
        </div>
      </div>
    </div>
  </scroller>
</template>
<script>
export default {
  data() {
    return {
      goodslist: [],
      pageindex: 1
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList(refresh) {
      return this.$http
        .get("getgoods?pageindex=" + this.pageindex)
        .then(result => {
          if (refresh) {
            this.goodslist = result.body.message;
          } else {
            this.goodslist = this.goodslist.concat(result.body.message);
          }
        });
    },
    goDetail(id) {
      this.$router.push("/home/goodsInfo/" + id);
    },

    refresh() {
      this.pageindex = 1;
      this.getGoodsList(true).then(() => {
        this.$refs.sc.finishPullToRefresh();
      });
    },
    infinite() {
      setInterval(() => {
        this.pageindex++;
        this.getGoodsList().then(() => {
          this.$refs.sc.finishInfinite(this.goodslist.length >= 15);
        });
      }, 2000);
    }
  }
};
</script>
<style lang="less">
._v-content {
  padding-top: 40px;
  padding-bottom: 50px;
}
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
    }
    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
      .sell {
        display: flex;
        justify-content: space-between;
        font-size: 13px;
      }
    }
  }
}
</style>
