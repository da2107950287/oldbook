<template>
    <div class="box"> 
    <van-nav-bar title="账户管理" left-arrow class="mytitle"  @click-left="onClickLeft">
      <van-icon name="ellipsis" slot="right" color="rgb(102,102,102)" size="0.3419rem" />
    </van-nav-bar>
    <div class="userinfo">
      <div class="common">
        <div>用户名(昵称)：</div>
        <input type="text" name id v-model="mydata.nickname"/>
      </div>
      <div class="common">
        <div>我的头像：</div>
        <!-- <input type="" name="" id=""> -->
        <van-uploader  :after-read="afterRead"  v-model="fileList" :max-count="1" />
      </div>
      <div class="common">
        <div>性别：</div>
        <van-radio-group v-model="radio" class="radiobox">
          <van-radio name="1" checked-color="red" class="vanr">男</van-radio>
          <van-radio name="2" checked-color="red" class="vanr">女</van-radio>
          <van-radio name="3" checked-color="red" class="vanr">保密</van-radio>
        </van-radio-group>
      </div>
      <div class="common">
        <div>QQ号码：</div>
        <input type="text" name id :value="mydata.qq"/>
      </div>
      <div class="common">
        <div>生日：</div>
        <input type="text" name id="timeipt" @click="showpopup" ref="timeipt" v-model="mydata.birthday" />

        <van-popup v-model="show" position="bottom">
          <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            @confirm="confirmclick"
            @cancel="cancelclick"
          />
        </van-popup>
      </div>
      <!-- <div class="common">
        <div>所在地：</div>

        <input type="text" name id @click="showpopup1" ref="areaipt" value />

        <van-popup v-model="showArea" position="bottom">
          <van-area :area-list="areaList" @confirm="areaConfirm" />
        </van-popup>
      </div>
      <div class="blank"></div>
      <div>
        <div class="comtext">个性签名：</div>
        <textarea name id cols="50" rows="2" class="comtext"></textarea>
      </div>
      <div class="blank"></div>

      <div>
        <div class="comtext">自我介绍：</div>
        <textarea name id cols="50" rows="2" class="comtext"></textarea>
      </div>
      <div class="exp"></div> -->
      <div class="operate">
        <van-button type="default">取消</van-button>
        <van-button type="default" @click="baocun">保存</van-button>
      </div>
      <div class="exp"></div>
    </div>
  </div>
</template>
<script>
import area from "../area";
export default {
  data() {
    return {
      fileList: [],
      message: "",
      areaList: area,
      endTimePop: true,
      username: "",
      radio: "3",
      show: false,
      showArea: false,
      minDate: new Date(),
      currentDate: new Date(),
      mydata: {}
    };
  },
  mounted() {},
  created() {
    let that = this;
    this.axios
      .get("/public/myself")
      .then(function(res) {
        if (res.data[0] == null) {
          that.$router.push({ name: "login" });
        } else {
          that.mydata = res.data[0];
          console.log(that.mydata)
          that.fileList[0]={};
           that.fileList[0].isImage=that.mydata.avator;
          console.log(that.fileList[0].isImage);
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  },
  methods: {
    baocun() {},
    onClickLeft() {
      this.$router.go(-1);
    },
    confirmclick() {
      var date = this.currentDate;
      var seperator1 = "-";
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      this.currentDate =
        date.getFullYear() + seperator1 + month + seperator1 + strDate;
      this.$refs.timeipt.value = this.currentDate;
      this.show = false;
    },
    cancelclick() {
      this.show = false;
    },
    // beforeRead(file) {
    //   if (file.type !== 'image/jpeg') {
    //     Toast('请上传 jpg 格式图片');
    //     return false;
    //   }

    //   return true;
    // },
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    showpopup: function() {
      if (!this.show) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    showpopup1: function() {
      if (!this.showArea) {
        this.showArea = true;
      } else {
        this.showArea = false;
      }
    },
    areaConfirm(arr) {
      if (arr[0].name !== arr[1].name) {
        this.$refs.areaipt.value =
          arr[0].name + " " + arr[1].name + " " + arr[2].name;
      } else {
        this.$refs.areaipt.value = arr[0].name + " " + arr[2].name;
      }
      this.showArea = false;
    },
    areaConcel() {
      this.showArea = false;
    }
  }
};
</script>
<style  scoped>
.box {
  overflow-x: hidden;
}
.mytitle {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
}
.exp {
  height: 1px;
  background-color: #eee;
}
.van-nav-bar__arrow {
  font-size: 0.24422rem;
  color: rgb(140, 140, 140);
}
.userinfo {
  font-size: 17px;
  position: absolute;
  top: 0.56rem;
  left: 0;
  width: 100vw;
}
.common {
  display: flex;
  font-size: 17px;
  line-height: 20px;
  margin-left: 15px;
  padding: 15px 15px 15px 0px;
  border-bottom: 1px solid #eee;
  align-items: center;
}
.radiobox {
  display: flex;
  justify-content: space-evenly;
  flex: 1;
}
.vanr {
  flex: 1;
}
.comtext {
  border-bottom: 1px solid #eee;
  padding: 15px 15px 15px 0px;
  display: flex;
  justify-content: flex-start;
  text-align: left;
  margin-left: 15px;
}
input[type="text"],
textarea.comtext {
  outline: 0;
  border: none;
  flex: 1;
  background: #f2f3f7;
}

.blank {
  height: 7px;
  background: #f8f8f8;
}
.operate {
  display: flex;
  justify-content: space-around;
  padding: 15px 15px 15px 0px;
}
.van-button {
  width: 140px;
  height: 35px;
  line-height: 35px;
}
</style>