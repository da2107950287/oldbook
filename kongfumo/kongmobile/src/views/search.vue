<template>
  <div class="goodserach">
    <div class="back" @click="back">
      <van-icon name="arrow-left" />
    </div>
    <div>
      <ul>
        <li v-for="(item,key) in book" :key="key" @click="xiangqing(item.rid)">
          <div class="good">
            <div class="left">
              <img :src="item.bimg" alt />
            </div>
            <div class="right">
              <p class="bname">{{item.bname}}</p>
              <p class="jianjie">{{item.characteristic}}</p>

              <div class="last">
                <p class="athor">{{item.author}}</p>
                <p class="tuijian">
                  <van-icon name="like-o" />
                  {{item.tuijian}}
                </p>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      book: []
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    xiangqing(data) {
      this.$router.push({ name: "xiang", query: { bId: data } });
    }
  },
  mounted() {
    let that = this;
    if (this.$route.query.tag == 0) {
      this.axios
        .post("/public/searchmobile", { name: this.$route.query.name })
        .then(function(res) {
          that.book = res.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    } else if (this.$route.query.tag == 1) {
      this.axios
        .get("/public/searchall", {params:{value: this.$route.query.name}  })
        .then(function(res) {
          that.book = res.data;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.goodserach {
  padding: 0.2rem;
  overflow: hiddle;
  background-color: #fff;
}
.good {
  display: flex;
  width: 100vw;
  margin-top: 0.2rem;
}
.back {
  font-size: 0.3rem;
}
.left {
  flex-shrink: 0;
  width: 1rem;
  height: 100%;

  img {
    width: 100%;
    height: 100%;
  }
}
.right {
  display: flex;
  margin-left: 0.2rem;
  flex-direction: column;
  overflow: hidden;
  width: 70%;
  .bname {
    font-weight: 600;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .jianjie {
    color: #856d49;
    font-size: 0.14rem;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 0.15rem;
    margin-bottom: 0.15rem;
    background-color: #fff;
  }
}
.athor {
  font-size: 0.14rem;
  color: #999;
}

.last {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tuijian {
  position: relative;
  right: 0.6rem;
  text-align: right;
}
</style>