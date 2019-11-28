<template>
  <div>
    <div class="first">
      <div class="title">
        <div class="back" @click="fallback">
          <van-icon name="arrow-left" />
        </div>
        <div class="Bname">书目</div>
        <div class="select">
          <van-icon name="ellipsis" @click="fallbacks" />
          <div class="sele_back" v-if="tag">
            <ul>
              <li>首页</li>
              <li>
                <span>购物车</span>
                <van-icon name="cart-o" info="9" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- 轮播 -->
      <div class="my_bswiper">
        <van-swipe indicator-color="white">
          <van-swipe-item>
            <img :src="book1.bimg" alt />
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
    <!-- 书籍详细信息 -->
    <div class="book">
      <p>{{book1.bname}}</p>
      <div class="bcate">
        <div class="jianjie">{{book1.brief}}</div>
        <div class="price">
          <span class="pricem">￥{{book1.price}}</span>
          <span class="address">北京朝阳</span>
        </div>
        <div class="count">
          <span>全新</span>
          <span>库存量{{book1.count}}</span>
        </div>
        <div class="all">
          <ul>
            <li v-for="(item,key) in all " :key="key">
              <span class="name">{{item.name}}</span>
              <span class="xinxi">{{item.xinxi}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- 购物车 -->
    <div class="bootombar">
      <div class="left">
        <div @click="first">
          <van-icon name="wap-home-o" />
          <span class="sizemin">首页</span>
        </div>
        <div @click="collect($route.query.bId)">
          <van-icon name="like-o" :color="$store.state.definecolor"/>
          <span class="sizemin">收藏</span>
        </div>
      </div>
      <div class="right">
        <div class="shop">
          <div class="sku-container">
            <van-sku
              v-model="showBase"
              :sku="skuData.sku"
              :goods="goods_info"
              :goods-id="skuData.goods_id"
              :hide-stock="skuData.sku.hide_stock"
              :quota="skuData.quota"
              :quota-used="skuData.quota_used"
              :initial-sku="initialSku"
              reset-stepper-on-hide
              reset-selected-sku-on-hide
              disable-stepper-input
              :close-on-click-overlay="closeOnClickOverlay"
              :custom-sku-validator="customSkuValidator"
              @buy-clicked="onBuyClicked"
              @add-cart="onAddCartClicked"
            />
            <van-button block type="primary" @click="showBase = true" class="shop1">加入购物车</van-button>
          </div>
        </div>
        <div class="car">
          <div class="sku-container">
            <van-sku
              v-model="showBase"
              :sku="skuData.sku"
              :goods="goods_info"
              :goods-id="skuData.goods_id"
              :hide-stock="skuData.sku.hide_stock"
              :quota="skuData.quota"
              :quota-used="skuData.quota_used"
              :initial-sku="initialSku"
              reset-stepper-on-hide
              reset-selected-sku-on-hide
              disable-stepper-input
              :close-on-click-overlay="closeOnClickOverlay"
              :custom-sku-validator="customSkuValidator"
              @buy-clicked="onBuyClicked"
              @add-cart="onAddCartClicked"
            />
            <van-button block type="primary" @click="showBase = true" class="car1">立即购买</van-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import skuData from "../data.js";
export default {
  data() {
    return {
      tag: false,
      book1: [],
      all: [],
      storage: [],
      skuData: skuData,
      showBase: false,
      showCustom: false,
      showStepper: false,
      showSoldout: false,
      closeOnClickOverlay: true,
      // definecolor:"black",
      initialSku: {
        selectedNum: 1
      },
      goods_info: {
        picture: ""
      },
      customSkuValidator: () => "请选择xxx!"
    };
  },
  mounted() {
    let that = this;
    this.axios
      .post("/public/xiangqing", { id: this.$route.query.bId })
      .then(function(res) {
        that.all = [
          { name: "作者", xinxi: res.data[0].author },
          { name: "出版时间", xinxi: res.data[0].pubtime },
          { name: "装帧", xinxi: res.data[0].pubstyle },
          { name: "开本", xinxi: res.data[0].openbook },
          { name: "页数", xinxi: res.data[0].pagenum },
          { name: "定价", xinxi: res.data[0].price },
          { name: "执行编辑", xinxi: res.data[0].bianji },
          { name: "推荐", xinxi: res.data[0].tuijian }
        ];
        that.book1 = res.data[0];
        skuData.sku.price = res.data[0].price;
        skuData.sku.stock_num = res.data[0].count;
        skuData.sku.goods_id = res.data[0].rid;
        that.goods_info.picture = res.data[0].bimg;
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    collect(bid){
      this.$store.commit("addCollect",bid)
    },
    fallback() {
      this.$router.go(-1);
    },
    first() {
      this.$router.replace("/");
    },
    fallbacks() {
      if (this.tag == false) {
        this.tag = true;
      } else {
        this.tag = false;
      }
    },
    onBuyClicked(data) {
      let that=this;
      let time=new Date();
      this.axios
        .post("/public/Order", {
          id: that.book1.rid,
          count: data.selectedNum,
          addtime:time
        })
        .then(function(res) {
          if (res.data.statu == "ok") {
            that.$router.replace("/order");
          }
          if(res.data.statu=="login"){
            that.$router.replace("/login");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    onAddCartClicked(data) {
      var a = JSON.parse(localStorage.getItem("shops"));
      this.storage = a;
      let good = {
        id: this.book1.rid,
        src: this.book1.bimg,
        name: this.book1.bname,
        price: this.book1.price,
        count: data.selectedNum
      };
      this.storage.push(good);
      localStorage.setItem("shops", JSON.stringify(this.storage));
      this.$router.replace("/shop");
      console.log(JSON.parse(localStorage.getItem("shops")));
    }
  }
};
</script>
<style lang="scss" scoped>
.first {
  font-size: 0.16rem;
  background-color: #fff;
  .title {
    height: 0.5rem;

    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .select {
    position: relative;
    .sele_back {
      z-index: 100;
      position: absolute;
      padding: 0.1rem 0.1rem 0 0.1rem;
      width: 1rem;
      left: -0.96rem;
      top: 0.25rem;
      background-color: #fff;
      box-shadow: 2px 2px 16px 0 hsla(0, 0%, 67%, 0.5);
    }
  }
}
.sele_back::before {
  content: "";
  display: block;
  position: absolute;
  left: 0.75rem;
  top: -0.17rem;
  width: 0px;
  height: 0px;
  border: 0.08rem solid transparent;
  border-bottom-color: #fff;
}
.sele_back li {
  height: 0.25rem;
  position: relative;
  margin-bottom: 0.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0.25rem;
}
.sele_back li:nth-child(1):after {
  content: "";
  display: block;
  position: absolute;
  left: 0px;
  top: 30px;
  width: 100%;
  height: 1px;
  background-color: rgb(231, 229, 229);
}
// swiper
.my_bswiper {
  width: 100vw;
  height: 2.5rem;
  display: flex;
  text-align: center;
  flex-direction: column;
  img {
    width: 70%;
    height: 2.5rem;
  }
}
// 书籍详情
.book {
  padding: 0.1rem;
  background-color: #fff;
  p {
    font-weight: 600;
    font-size: 0.2rem;
    margin-bottom: 0.1rem;
  }
  .bcate {
    flex-direction: column;
    display: flex;
    .jianjie {
      overflow: hidden;
      color: #856d49;
      font-size: 0.16rem;
      line-height: 0.22rem;
      max-height: 0.44rem;
      letter-spacing: 0;
      text-align: justify;
    }
    .price {
      margin-top: 0.1rem;
      display: flex;
      justify-content: space-between;
      .pricem {
        font-size: 0.2rem;
        color: #9e100e;
      }
      .address {
        font-size: 0.14rem;
        color: #999;
      }
    }
  }
}
.count {
  margin-top: 0.1rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.14rem;
  color: #999;
}
.all {
  margin-top: 0.1rem;
  li {
    margin-bottom: 0.06rem;
  }
  .name {
    text-align: left;
    width: 0.8rem;
    margin-right: 0.2rem;
    display: inline-block;
    font-size: 0.14rem;
    color: #999;
  }
  .xinxi {
    text-align: left;
  }
}
// 底部
.bootombar {
  width: 100vw;
  height: 0.4rem;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  .left {
    width: 30%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      text-align: center;
      font-size: 0.2rem;
      .sizemin {
        font-size: 0.12rem;
      }
    }

    background-color: #fff;
  }
  .right {
    line-height: 0.4rem;
    width: 70%;
    height: 0.4rem;
    color: #fff;
    display: flex;
    text-align: center;

    .shop,
    .car {
      width: 50%;
      height: 100%;

      background: #d48c68;
    }
    .car {
      background: #9e100e;
    }
  }
}
.car1 {
  background: #9e100e;
  border: 0;
}
.shop1 {
  background: #d48c68;
  border: 0;
}
</style>