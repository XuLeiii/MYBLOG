<template>
  <div class="box">
    <div class="main-login" :style="{ height: islogin ? '380px' : '550px' }">
      <!-- 1.两种样式 -->
      <div class="login-box">
        <!-- 1.1表格信息 -->
        <h2 @click="change(true)">登录</h2>

        <div class="item">
          <span>电子邮箱</span>
          <input
            type="text"
            v-model="email"
            @blur="verifyEmail('email', 'errEmail')"
          />
          <div class="err-msg" v-show="errEmail">
            <i class="el-icon-info">邮箱格式不正确</i>
          </div>
        </div>
        <div class="item">
          <span>密码(8-12位字符)</span>
          <input
            type="password"
            v-model="password"
            @blur="verifyTrue('password', 'errPassword')"
          />
          <div class="err-msg" v-show="errPassword">
            <i class="el-icon-info">密码不符合要求</i>
          </div>
        </div>
        <!-- 1.2登录注册按钮 -->
        <el-button v-show="islogin" @click="login()">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      islogin: true,
      email: "",
      password: "",
      username: "",
      rePassword: "",
      errUsername: false,
      errEmail: false,
      errPassword: false,
      errRepassword: false,
    };
  },
  methods: {
    //点击登录按钮时触发，通过判断errmail等的布尔值决定是否去向后端发送登录事件
    async login() {
      try {
        let result = null;
        if (!this.errEmail && !this.errPassword) {
          //通过vuex向后端发送axios请求，获取后端响应数据
          console.log(1);
          result = await this.$store.dispatch("login", {
            email: this.email,
            password: this.password,
          });
          console.log(result);
          console.log(2);
        } else {
          this.$message.error("请检查是否所有信息都正确填写！");
          return;
        }
        //处理后端响应的数据
        if (result.data.status === 200) {
          this.$message.success(result.data.msg);
          this.$router.push("/home/article");
        } else {
          this.$message.error(result.data.msg);
          return;
        }
      } catch (error) {
        console.log(error);
        this.$message.error("错误");
      }
    },
    //点击注册按钮触发，通过判断当前校验信息的值是否为false来发送axios的注册事件
    async register() {
      try {
        let result = null;
        if (
          !this.errEmail &&
          !this.errPassword &&
          !this.errRepassword &&
          !this.errUsername
        ) {
          result = await this.$store.dispatch("register", {
            email: this.email,
            password: this.password,
            username: this.username,
          });
        } else {
          this.$message.error("请检查所有信息是否填写正确");
          return;
        }
        //测试result是否接收到后端返回的数据
        // console.log("这里是login中的result",result);
        if (result.status === 200) {
          //提示框
          this.$message.success(result.msg);
          //注册成功后切换到登陆界面
          this.islogin = true;
        }
      } catch (error) {
        console.log(error);
        this.$message.error("出错了！请重新注册");
      }
    },
    //点击登录和注册字样时触发，控制v-show决定输入框是否显示，切换登陆样式
    change(bool) {
      this.islogin = bool;
      this.email = "";
      this.password = "";
      this.username = "";
      this.rePassword = "";
      this.errUsername = false;
      this.errEmail = false;
      this.errPassword = false;
      this.errRepassword = false;
    },
    // 输入框失去焦点时触发，判断a输入框中的值是否为空，决定是否显示校验信息
    verifyTrue(a, b) {
      if (this[a] === "") {
        this[b] = true;
      }
    },
    //输入框失去焦点时触发， 通过校验邮箱格式决定是否显示校验信息
    verifyEmail() {
      if (
        /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(
          this.email
        )
      ) {
        this.errEmail = false;
      } else {
        this.errEmail = true;
      }
    },
  },
};
</script>

<style lang="less" scoped>
.box {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-image: url("../assets/img/background.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .main-login {
    width: 400px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    border-radius: 20px;
    background-color: rgba(58, 58, 58, 0.8);
    box-shadow: 0px 0px 5px 1px #5c5c5c;
    h2 {
      display: inline-block;
      color: #d8d8d8;
      font-size: 25px;
      margin: 30px 0px 0px 20px;
      cursor: pointer;
    }
    .login-box {
      width: 100%;
      height: 100%;
      // background-color: pink;
      .item {
        margin-top: 30px;
        padding: 0px 20px;
        input {
          width: 100%;
          height: 20px;
          border: none;
          outline: none;
          background-color: transparent;
          border-bottom: 1px solid;
          color: #fff;
          margin-top: 5px;
        }
        span {
          color: #fff;
        }
      }
      .el-button {
        width: 100px;
        margin: 50px 50px 0px 150px;
      }
    }
    .register-box {
      width: 100%;
      height: 100%;
      // background-color: pink;
      .item {
        margin-top: 30px;
        padding: 0px 20px;
        input {
          width: 100%;
          height: 20px;
          border: none;
          outline: none;
          background-color: transparent;
          border-bottom: 1px solid;
          color: #fff;
          margin-top: 5px;
        }
        span {
          color: #fff;
        }
      }
      .el-button {
        width: 100px;
        margin: 40px 50px 50px 150px;
      }
    }
    .err-msg {
      font-size: 10px;
      color: rgb(255, 0, 0);
    }
  }
}
</style>
