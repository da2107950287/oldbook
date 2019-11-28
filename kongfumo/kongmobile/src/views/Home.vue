<template>
  <div class="home">
    <div class="search_bar">
      <div class="logo">
        <img src="../imgs/logo.png" alt />
      </div>
      <div class="inner">
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          show-action
          shape="round"
          style="background:#f5f5f5"
          @search="onSearch"
        >
          <div slot="action" @click="onSearch(value)">搜索</div>
        </van-search>
      </div>
    </div>
    <!-- 轮播 -->
    <div class="my_bswiper">
      <van-swipe :autoplay="3000" indicator-color="white">
        <van-swipe-item>
          <img src="../imgs/lunbo1.jpg" alt />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../imgs/lunbo1.jpg" alt />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../imgs/lunbo1.jpg" alt />
        </van-swipe-item>
        <van-swipe-item>
          <img src="../imgs/lunbo1.jpg" alt />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 分类 -->
    <div class="book_class">
      <ul @click="search">
        <li>
          <div class="b_logo">
            <img src="../imgs/分类1.png" alt />
          </div>
          <div class="b_name">
            <span>线装古籍</span>
          </div>
        </li>
        <li>
          <div class="b_logo">
            <img src="../imgs/分类2.png" alt />
          </div>
          <div class="b_name">
            <span>民国旧书</span>
          </div>
        </li>
        <li>
          <div class="b_logo">
            <img src="../imgs/分类3.png" alt />
          </div>
          <div class="b_name">
            <span>名人墨迹</span>
          </div>
        </li>
        <li>
          <div class="b_logo">
            <img src="../imgs/分类4.png" alt />
          </div>
          <div class="b_name">
            <span>古玩杂项</span>
          </div>
        </li>
        <li>
          <div class="b_logo">
            <img src="../imgs/分类5.png" alt />
          </div>
          <div class="b_name">
            <span>全部分类</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- 分类推荐2 -->
    <div class="book_class1">
      
        <div class="b_cnew" @click="xiangqing1(0)">
          <div class="left">
            <p>今日上新</p>
            <span>发现新上好书</span>
          </div>
          <div class="right">
            <img src="../imgs/新上好书.png" alt />
          </div>
        </div>
      
      
        <div class="b_cnew" @click="xiangqing1(1)">
          <div class="left">
            <p>藏书单</p>
            <span>为你推荐好书</span>
          </div>
          <div class="right">
            <img src="../imgs/藏书单.png" alt />
          </div>
        </div>
     
    </div>
    <!-- 好书推荐 -->
    <div class="newbook">
      <div class="titlebox">
        <div>
          <p>好书推荐</p>
        </div>
        <div>
          <a href>更多 ></a>
        </div>
      </div>
      <div class="content">
        <ul>
          <li v-for="(item,key) in book" :key="key"  @click="xiangqing(item.rid)">
            <div>
              <img :src="item.bimg" alt />
            </div>
            <div class="content-t">
              <p>{{item.bname}}</p>
              <p>{{item.author}}</p>
              <p>{{item.price}}元</p>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <!-- 新书推荐 -->
    <div class="goodbook">
      <div class="titlebox">
        <div>
          <p>新书广场</p>
        </div>
        <div>
          <a href>更多 ></a>
        </div>
      </div>
      <div class="goodcontent">
        <ul>
          <li v-for="(item,key) in book" :key="key" @click="xiangqing(item.rid)">
            <div class="abtag">￥{{item.price}}起</div>
            <div>
              <img :src="item.bimg" alt />
            </div>
            <div class="gcontent-t">
              <p class="gcontent-t1">{{item.bname}}</p>
              <p class="gcontent-t2">{{item.author}}</p>
              <div class="sign_box">
                <span v-for="(item1,key) in item.keyword.split(',')" :key="key">
                  {{item1}}
                  <div class="jiao">
                    <div class="jiao-inner"></div>
                  </div>
                </span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script>
// // @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  data() {
    return {
      value: "",
      book: []
    }
  },
  methods: {
    onSearch(value) {
      this.$router.push({name:"search",query:{name:value,tag:1}}); 
    },
    xiangqing(data){
     this.$router.push({name:"xiang",query:{bId:data}});
    },
    search(e){
      if(e.path[2].innerText=="全部分类")
      {this.$router.push({name:"category"}); }
      else{
 this.$router.push({name:"search",query:{name:e.path[2].innerText,tag:0}}); 
}
  },
  search1(e){
     this.$router.push({name:"search",query:{name:e.path[2].innerText,tag:0}}); 
  }
  },
  mounted() {
    let that=this;
    this.axios.get("/public/newbook")
            .then(function(res) {        
            that.book=res.data;        
            })
            .catch(function(error) {
              console.log(error);
            });
  }
};
</script>
<style lang="scss" scoped>
.search_bar {
  width: 100vw;
  height: 0.7rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .logo {
    width: 0.4rem;
    height: 0.4rem;
    flex-shrink: 0;
    display: flex;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .inner {
    display: flex;
    height: 0.4rem;
  }
  .van-search {
    width: 3.6rem;
  }
}
// swiper
.my_bswiper {
  width: 100vw;
  height: 2.3rem;
  display: flex;
  flex-direction: column;
  img {
    width: 100%;
    height: 2.3rem;
  }
}

// 分类
.book_class {
  width: 100vw;
  height: 1.5rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 1.2rem;
    font-size: 0;

    li {
      display: flex;
      font-size: 0.12rem;
      flex-direction: column;
      img {
        width: 0.5rem;
        height: 0.5rem;
      }
    }
  }
}

// 分类2
.book_class1 {
  width: 100vw;
  height: 1rem;
  box-sizing: border-box;
  font-size: 0.12rem;
}
.book_class1,
.b_cnew,
.left {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.b_cnew {
  width: 2rem;
  background-color: #f8f8f8;
  border-radius: 0.04rem;
  .left {
    flex-direction: column;
    height: 0.7rem;
    p {
      font-size: 0.18rem;
      font-weight: 700;
      width: 1.1rem;
    }
    span {
      width: 1.1rem;
      color: #999;
      font-size: 0.14rem;
    }
  }
  .right > img {
    width: 0.5rem;
    height: 0.7rem;
  }
}

// 好书推荐
.newbook {
  width: 100vw;
  height: 2.7rem;
  box-sizing: border-box;
  padding: 0 0.1rem 0 0.1rem;
  
}
.titlebox {
  width: 100%;
  height: 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #262626;

  p {
    font-weight: bold;
    font-size: 0.22rem;
  }
  a {
    font-size: 0.12rem;
  }
}
.content,
.content > ul {
  height: 2.3rem;
  width: 100%;
  overflow: hidden;
  overflow: auto;

  // background-color: rgb(106, 224, 9);
}
.content > ul {
  display: flex;
  align-items: center;
}
.content > ul > li {
  flex-shrink: 0;
  width: 1.6rem;
  height: 2.3rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  // background-color: rgb(53, 8, 218);
  img {
    height: 1.6rem;
    width: 1.3rem;
  }
  .content-t {
    display: flex;
    flex-direction: column;
  }
}

// 新书广场
.goodbook {
  box-sizing: border-box;
  width: 100vw;
  padding: 0 0.1rem 0 0.1rem;
  .goodcontent {
    ul,
    ul > li {
      width: 100%;
    }
    ul > li {
      display: flex;
      position: relative;
      margin-bottom: 0.2rem;
      img {
        width: 1.3rem;
        height: 1.1rem;
      }
      .abtag {
        font-size: 0.16rem;
        position: absolute;
        height: 0.3rem;
        line-height: 0.3rem;
        background-color: rgba(158, 16, 14, 0.8);
        border-radius: 0 0.42rem 0.42rem 0;
        color: #fff;
        text-align: center;
        left: 0rem;
        top: 0.1rem;
      }
      .gcontent-t {
        margin-left: 0.2rem;
      }
      .gcontent-t1 {
        font-weight: 700;
        color: #262626;
        overflow: hidden;
        font-size: 0.18rem;
      }
      .gcontent-t2 {
        color: #999;
        font-size: 0.14rem;
        overflow: hidden;
        margin-top: 0.15rem;
      }
    }
  }
}
.sign_box {
  margin-top: 0.2rem;
  overflow: hidden;
  height: 0.27rem;
}
.sign_box span {
  position: relative;
  display: inline-block;
  width: auto;
  height: 0.25rem;
  text-align: center;
  line-height: 0.25rem;
  padding: 0 0.09rem;
  font-size: 0.14rem;
  color: #997f55;
  background-size: 100% 100%;
  margin-right: 0.08rem;
  border: 1px solid rgba(153, 127, 85, 0.6);
  border-radius: 0.05rem;
  margin-bottom: 0.06rem;
}
.sign_box span .jiao {
  width: 0;
  height: 0;
  border-bottom: 0.1rem solid rgba(153, 127, 85, 0.6);
  border-left: 0.1rem solid transparent;
  position: absolute;
  right: -1px;
  bottom: -1px;
}
.sign_box span .jiao .jiao-inner {
  width: 0;
  height: 0;
  border-bottom: 0.08rem solid #fff;
  border-left: 0.08rem solid transparent;
  position: absolute;
  right: 0;
  bottom: -0.1rem;
}
</style>
