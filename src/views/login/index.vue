<template>
  <div>
    <van-nav-bar
      title="会员登陆"
      left-text="返回"
      left-arrow
      @click-left="$router.go(-1)"
    />

    <div class="container">
      <div class="title">
        <h3>手机号登录</h3>
        <p>未注册的手机号登录后将自动注册</p>
      </div>

      <div class="form">
        <div class="form-item">
          <input v-model="mobile" class="inp" maxlength="11" placeholder="请输入手机号码" type="text">
        </div>
        <div class="form-item">
          <input v-model="picCode" class="inp" maxlength="5" placeholder="请输入图形验证码" type="text">
          <img v-if="picUrl" :src="picUrl" @click="getPicCode()">
        </div>
        <div class="form-item">
          <input v-model="msgCode" class="inp" placeholder="请输入短信验证码" type="text">
          <button @click="getCode()">{{totalSecond === second ? '获取验证码':`${second}秒后重新发送`}}</button>
        </div>
      </div>

      <div @click="login" class="login-btn">登录</div>
  </div>

    </div>
</template>

<script>
// 导入请求实例
import { getPicCode, getMsgCode, codeLogin } from '@/api/login'
export default {
  name: 'LoginIndex',
  data () {
    return {
      // 图形验证码相关
      picCode: '', // 用户输入的图形验证码
      picKey: '', // 将来请求传递的图形验证码唯一标识
      picUrl: '', // 存储请求渲染的图片地址

      // 手机验证码相关
      totalSecond: 60, // 倒计时总秒数
      second: 60, // 倒计时剩余秒数
      timer: null, // 定时器id
      mobile: '', // 手机号码
      msgCode: '' // 短信验证码

    }
  },
  methods: {
    // 获取图形验证码
    async getPicCode () {
      // 此处的picCode是封装的请求方法
      const { data: { base64, key } } = await getPicCode()
      this.picUrl = base64
      this.picKey = key
    },
    // 校验手机号码与图片验证码
    validFn () {
      if (!/^1[3-9]\d{9}$/.test(this.mobile)) {
        this.$toast('请输入正确的手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.picCode)) {
        this.$toast('请输入正确的图形验证码')
        return false
      }
      return true
    },
    // 手机验证码
    async getCode () {
      if (!this.validFn()) {
        // 校验不通过就没必要继续往下走了
        return false
      }
      // 发送短信验证码
      await getMsgCode(this.picCode, this.picKey, this.mobile)
      this.$toast('短信发送成功，请注意查收')
      // 没有定时器开着且总秒数与剩余秒数相等时才可以开启定时器
      if (!this.timer && this.second === this.totalSecond) {
        this.timer = setInterval(() => {
          this.second--
          // 如果剩余秒数小于等于零时清除定时器、重置定时器id和让剩余秒数重新等于总秒数
          if (this.second <= 0) {
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSecond
          }
        }, 1000)
      }
    },
    // 登录校验
    async login () {
      if (!this.validFn()) {
        return
      }
      if (!/^\d{6}$/.test(this.msgCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      const res = await codeLogin(this.mobile, this.msgCode)
      // 将个人权证信息挂在到vuex中
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast('登录成功')

      // 进行判断：看地址栏是否有回调地址；若有，则是其他页面拦截而来，需要会跳，反之去首页
      const url = this.$route.query.backUrl || '/'
      this.$router.push(url)
    }
  },
  async created () {
    this.getPicCode()
  },
  // 离开页面时清除定时器
  destroyed () {
    clearInterval(this.timer)
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 49px 29px;

  .title {
    margin-bottom: 20px;
    h3 {
      font-size: 26px;
      font-weight: normal;
    }
    p {
      line-height: 40px;
      font-size: 14px;
      color: #b8b8b8;
    }
  }

  .form-item {
    border-bottom: 1px solid #f3f1f2;
    padding: 8px;
    margin-bottom: 14px;
    display: flex;
    align-items: center;
    .inp {
      display: block;
      border: none;
      outline: none;
      height: 32px;
      font-size: 14px;
      flex: 1;
    }
    img {
      width: 94px;
      height: 31px;
    }
    button {
      height: 31px;
      border: none;
      font-size: 13px;
      color: #cea26a;
      background-color: transparent;
      padding-right: 9px;
    }
  }

  .login-btn {
    width: 100%;
    height: 42px;
    margin-top: 39px;
    background: linear-gradient(90deg,#ecb53c,#ff9211);
    color: #fff;
    border-radius: 39px;
    box-shadow: 0 10px 20px 0 rgba(0,0,0,.1);
    letter-spacing: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
// 设置导航条 返回箭头 颜色
::v-deep .van-nav-bar .van-icon {
  color: #333;
}
::v-deep  .van-nav-bar__text {
  color: #333;
}
</style>
