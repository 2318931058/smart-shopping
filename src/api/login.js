// 此文件用于存放所有登录相关的接口请求
import request from '@/utils/request'

// 获取图形验证码
export const getPicCode = () => {
  return request.get('/captcha/image')
}

// 2. 获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode, // 图形验证码
      captchaKey, // 图形验证码key
      mobile // 接收验证码的手机号
    }
  })
}

// 3. 登录接口
export const codeLogin = (mobile, smsCode) => {
  return request.post('/passport/login', {
    form: {
      isParty: false, // 是否存在第三方用户信息
      partyData: {}, // 三方登录信息，默认为{}
      mobile, // 手机号
      smsCode // 短信验证码，测试环境验证码为246810
    }
  })
}
