<template>
  <div>
    <van-nav-bar title="全部分类-孔夫子旧书网" left-arrow class="mytitle" @click-left="goBackFn">
      <van-icon name="ellipsis" slot="right" color="rgb(102,102,102)" size="0.3419rem" />
    </van-nav-bar>
    <van-tree-select
      height="auto"
      :items="items"
      :main-active-index.sync="activeIndex"
      class="container nav-list-item"
      id="floorNavList"
    >
      <template slot="content">
        <div v-for="(item,index) in items" :key="index">
          <h3 class="title" v-if="activeIndex===index">{{item.text}}</h3>
          <div class="itemlist" v-if="activeIndex===index">
            <div  v-for="(book,index) in books" :key="index" class="items" @click="search(book.name)">
              <img
                :src="book.img"
                alt
                class="img"
                v-if="item.cid===book.pid"
              />
              <div class="des" v-if="item.cid===book.pid">
                <div class="name">{{book.name}}</div>
                <!-- <div class="num">{{book.num}}</div> -->
              </div>
            </div>
          </div>
        </div>
      </template>
    </van-tree-select>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeIndex: 0,
      items: [],
      books: []
    };
  },
  methods: {
    goBackFn() {
      this.$router.go(-1);
    },
    search(data){
      console.log(data)
 this.$router.push({name:"search",query:{name:data,tag:0}}); 
    }
  },
  mounted() {
    let that = this;
    this.axios
      .post("/public/Category")
      .then(function(res) {
        res.data[0].map((item) => {
          that.items.push({text : item.name,cid:item.cid});
        });
        console.log(that.items)
        that.books = res.data[1];
        console.log(that.books)
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
<style scoped>
.container {
  position: absolute;
  top: 0.56rem;
}
.mytitle {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}
.van-tree-select__nav {
  flex: 0 1 auto;
  width: 1.1602rem;
}
.van-tree-select__content {
  flex: 0 1 auto;
  width: 3.41969rem;
  text-align: left;
}

.van-sidebar-item {
  font-size: 0.207627rem;
}
.van-nav-bar__title {
  font-size: 0.207627rem;
  font-weight: 700;
}
.van-nav-bar__arrow {
  font-size: 0.24422rem;
  color: rgb(140, 140, 140);
}
.van-nav-bar {
  height: 0.341975rem;
  line-height: 0.341973rem;
  margin-bottom: 0.244267rem;
  color: #262626;
  padding: 0.0977067rem 0;
  background-color: #fff;
}
.van-nav-bar__left,
.van-nav-bar__right {
  bottom: 9px;
}
.van-hairline--bottom::after {
  border: none;
}
/* .content {
  
} */

.itemlist {
  width: 2.8rem;
  margin: 0 0.305333rem;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
}

.items {
  display: flex;
  align-items: center;
  margin-bottom: 0.305333rem;
}
.title {
  font-size: 0.158773rem;
  color: #666;
  margin-left: 0.30533rem;
  padding-top: 0.30533rem;
  margin-bottom: 0.21984rem;
  margin-top: 0;
}
.img {
  width: 0.427344rem;
  height: 0.549531rem;
}
.des {
  margin-left: 0.0977067rem;
}
.name {
  width: 0.732656rem;
  line-height: 0.244267rem;
  color: #555;
  font-size: 0.170987rem;
}
.num {
  font-size: 0.14656rem;
  line-height: 0.244267rem;
  color: #999;
}
</style>