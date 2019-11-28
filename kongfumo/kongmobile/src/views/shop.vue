<template>
  <div class="shop">
     <div class="title">
      购物车
      <span>{{AllCount}}</span>
    </div>
    <div class="content1" v-if="this.AllCount===0">
      <div class="cartempty">
        <img src="../imgs/购物车.png" alt />
        <div class="empty1">购物车是空的</div>
        <div class="empty2" @click="toIndex">去逛逛</div>
      </div>
    </div>
    <div v-if="this.AllCount!==0">
    <div class="allcheck" >
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      >全选</el-checkbox>
      <!-- <div>商品</div>
      <div>单价</div>
      <div>数量</div>
      <div>金额</div>
      <div>操作</div> -->
    </div>
    <!-- 下划线 -->
    <div class="line"></div>
    <!-- 全部购物车订单 -->
    <div class="content">
      <el-checkbox-group v-model="checkedshop" @change="handleCheckedshopChange">
        <el-checkbox v-for="item in shops" :label="item.id" :key="item.id" class="all">
          <div class="xinxi">
            <img v-bind:src="item.src" alt="书籍图片" />
            <div class="name">
              {{item.name}}
            </div>
          <span class="all-3">{{item.price}}</span>
          </div>
        
        </el-checkbox>
      </el-checkbox-group>
      <div class="changeNum">
        <ul>
          <li v-for="item in shops" :key="item.id">
            <div class="all-4" >
              <div class="all-4-num">
                <div class="subl" @click="delCount(item.id)">-</div>
                <input class="subm" :value="item.count" disabled>
                <div class="subf" @click="addCount(item.id)">+</div>
              </div>
            </div>
            <input class="all-5" :value="(item.count*item.price).toFixed(2)" disabled>
            <div class="all-6" @click="delectGoods(item.id)">删除</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="bill">
      <div class="left">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
          id="bill"
        >全选</el-checkbox>
        <div class="all-6" @click="delectGoodsAll(checkedshop)">批量删除</div>
      </div>
      <div class="right">
        <span>已选&nbsp;&nbsp;{{AllCount}}&nbsp;&nbsp;件商品</span>
        <span>合计(不含运费):</span>
        <span class="bookprice">￥{{AllPrice}}</span>
        <div class="submit-bill" @click="submitorder">去结算</div>
      </div>
    </div>
  </div>
  <tabbar></tabbar>
  </div>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      flagshop:false,
      checkAll: false,
      checkedshop: [],
      isIndeterminate: true,
      tag: false,
     
    };
  },
  created(){
    this.$store.state.added=JSON.parse(localStorage.getItem('shops'));
  },
  mounted() {
  //  if(this.AllCount==0)
  //  {this.tag=true;
  //  this.flagshop=false;
  //  }
  //  else{
  //    this.tag=false;
  //    this.flagshop=true;
  //  } 
  },
  computed: {
    ...mapGetters(["shop_list", "getAllCount", "getAllPrice", "getPrice"]),
    shops: function() {
      return this.$store.state.added;
    },
    AllCount:function(){

       return this.$store.getters.getAllCount;
    },
    AllPrice:function(){
       return this.$store.getters.getAllPrice;
    }
  },
  methods: {
    toIndex(){
      this.$router.push({name:"home"})
    },
    ...mapMutations(["delectGoodsAll", "delectGoods","addCount","delCount"]),
    handleCheckAllChange() {
      this.checkAll = !!this.checkAll;
      let checked = this.$store.state.added.map(function(item) {
        return item.id;
      });
      this.checkedshop = this.checkAll ? checked : [];
      this.isIndeterminate = false;
      console.log("1：" + this.checkedshop);
    },
    handleCheckedshopChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.shops.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.shops.length;
      console.log("2:" + this.checkedshop);
    },
submitorder(){
  // localStorage.setItem('shops',[]);
  // localStorage["shops"]=this.shops.toString();
  // console.log(this.shops);
}
  }
};
</script>
<style lang="scss" scoped>
.shop{
  box-sizing: border-box;
}
.subl,
.subf {
  width: 0.22rem;
  height: 0.22rem;
  cursor: pointer;
  text-align: center;
  line-height: 0.22rem;
  background-color: #e5e5e5;
}
.subm {
  width: 0.4rem;
  height: 0.22rem;
  border: 0px;
  text-align: center;
  background-color: #fff;
}
.all-4 {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.all-4-num {
  justify-content: center;
  align-items: center;
  display: flex;
  height: 100%;
}
.shop {
  padding: 0.2rem 0.1rem 0.2rem 0.1rem;
  width: 100%;
  box-sizing: border-box;

}
.line {
  height: 1px;
  width: 100%;
  background-color: #999;
  margin: 0.1rem 0px;
}
.allcheck {
  color: #666;
  font-size: 0.12rem;
  display: flex;
  width: 100%;
  justify-content: space-between;
}
/* 订单 */
.all-5{
  background-color: #fff;
  border:0px;
  width: 0.5rem;
  margin: 0px 0.1rem 0px 0.1rem;
}
.el-checkbox img {
  width: 0.4rem;
  height: 0.5rem;
}
.el-checkbox {
  display: block;
  display: flex;
}
.el-checkbox__input {
  margin: auto;
}
.el-checkbox__label {
  display: block;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.all {
  margin: 0.2rem 0;
  border-bottom: 1px solid #e5e5e5;
}
.is-checked {
  color: rgb(64, 140, 255);
  background: #f8f7f3;
}


.all-6:hover {
  color: rgb(252, 89, 89);
  cursor: pointer;
}
.xinxi {
  display: flex;
  justify-content: center;

}
.name {
  font-size: 0.12rem;
  margin-left: 0.05rem;
  height:  0.5rem;
 width: 1rem;
  text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
margin-right: 0.1rem;
}
.name > a {
  white-space: pre-wrap;
}
/* 账单 */
.bill{
  width:100%;
}
.bill,
.right,
.left {
  background: #e6e4e0;
  height: 0.6rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.12rem;
}

.right {
  width: 400px;
}
#bill {
  background: #e6e4e0;
}
.submit-bill {
  font-size: 20px;
  width: 100px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  cursor: pointer;
  background-color: #7b111b;
  color: #fff;
}
.bookprice {
  font-weight: 700;
  color: #8c222c;
  font-size: 26px;
}
.content{
  display:flex;
  box-sizing: border-box;
}
.changeNum ,.changeNum > ul {
  height: 100%;
  display: flex;
  margin-left: 0.05rem;
  flex-direction: column;
}

.changeNum > ul > li {
  display: flex;
  justify-content: space-between;
  margin-top: 0.1rem;
  margin-bottom: 0.4rem;
}

.content::after {
  content: "";
  display: block;
  clear: both;
}
/* 购物车为0 */
.title {
  text-align: center;
  height: 0.7rem;
  font-size: 0.2rem;
  width: 100%;
  background-color: #fff;
  line-height: 0.7rem;
}
.content1 {
  min-height: 4rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cartempty {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    width: 100px;
    height: 100px;
  }
  .empty1 {
    margin-top: 0.1rem;
    color: #999;
    height: 0.25rem;
    line-height: 0.25rem;
  }
  .empty2 {
    width: 0.8rem;
    height: 0.4rem;
    border: 1px solid rgb(240, 61, 61);
    border-radius: 0.03rem;
    line-height: 0.4rem;
    text-align: center;
    margin-top: 0.1rem;
    background-color: #fff;
  }
}
</style>