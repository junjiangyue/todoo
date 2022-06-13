<template>

    <div>
      <span class="titleWord"><img :src="ListIcon" style="margin-right: 0.5em;">账号信息</span>
    </div>
  <div class="mainContent">
    <div class="informationContent">
      <el-form>
        <el-form-item>
          <p class="WordSize">用户名</p>
          <el-input class="inputSize" placeholder="游客123"></el-input>
          <el-button type="primary" class="infoButton">修改用户名</el-button>
        </el-form-item>
        <el-form-item>
          <p class="WordSize">邮箱</p>
          <el-input class="inputSize" placeholder="123456789@qq.com"></el-input>
          <el-button type="primary" class="infoButton">修改邮箱</el-button>
        </el-form-item>
        <el-form-item>
          <p class="WordSize">密码</p>
          <el-input class="inputSize" placeholder="已设置"></el-input>
          <el-button type="primary" class="infoButton">修改密码</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="pictureContent">
      <div class="pictureLocation">
        <img src="../assets/icon/userpic.png" style="width: 150px;height: 150px">
      </div>
      <div class="pictureBtnLocation">
        <el-button type="primary" class="infoButton">上传头像</el-button>
      </div>
    </div>
  </div>
  <div class="btnSaveStyle">
    <el-button type="primary" class="infoButton">保存</el-button>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data() {
    return {
      ListIcon: new URL('../assets/icon/rightarrow2.png', import.meta.url).href,
      form: {
        userId: '',
        userName: '',
        headIcon: '',
        phone: '',
        email: '',
        wechat: '',
        QQ: '',
        role: ''
      },
      loading: false,
      imageUrl: '',
      multipartFile: '',
      rules: {
        userName: [
          {required: true, message: '请输入昵称', trigger: 'blur'},
          {min: 2, max: 16, message: '长度在 2 到 16 个字符', trigger: 'blur'}
        ],
        userPhonenumber: [
          {min: 11, max: 11, message: '请输入 11 位手机号', trigger: 'blur'},
          {pattern: /^1[3456789][0-9]{9}$/, message: '目前只支持中国大陆的手机号码', trigger: 'blur'}
        ],
        userEmail: [
          {min: 6, max: 64, message: '长度在 6 到 64 个字符', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
  }
}
</script>

<style scoped>
@import "../assets/css/main.css";

.informationContent{
  height: 35vh;
  width: 40vw;
  display: inline;
/*  background-color: #757575;*/
}

.titleWord{
  height: fit-content;
  width: fit-content;
  text-align: left;
  display: block;
  font-size: 25px;
  margin-top: 3%;
}

.inputSize {
  height: 45px;
  width: 50%;
  margin-left: 3%;
}

.infoButton{
  width: 15%;
  margin-left: 2%;
  background-color: #FFFFFF;
  height: 40px;
  color: #409EFF;
  border-color: #409EFF;
  border-width: 1px;
}

.WordSize{
  font-size: 20px;
  margin-left: 5%;
  margin-top: 2%;
  text-align: center;
  font-weight: bold;
  width: 70px;
}

.mainContent{
  width: 100%;
  height: 100%;
  margin-left: auto;
  margin-right: auto;
  display: flex;
}

.pictureContent{
  height: 35vh;
  width: 40vw;
}

.pictureLocation{
  margin-left: 5%;
}

.pictureBtnLocation{
  margin-left: 6%;
  margin-top: 4%;
}

.btnSaveStyle{
  margin-top: 5%;
  margin-left: 29%;
  width: 40vw;
}

</style>
