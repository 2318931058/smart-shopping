import request from '@/utils/request'

export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode, // 购物车cart或立即购买buyNow
      delivery: 10, // 10快速配送 20门店自提
      couponId: 0, // 优惠卷id，0表示不使用优惠卷
      isUsePoints: 0, // 积分，o表示不使用积分
      ...obj // 将传递过来的参数对象动态展开
    }
  })
}

// 提交订单
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10, // 物流方式  配送方式 (10快递配送 20门店自提)
    couponId: 0, // 优惠券 id
    payType: 10, // 余额支付
    isUsePoints: 0, // 是否使用积分
    ...obj
  })
}

// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
