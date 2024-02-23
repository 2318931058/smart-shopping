import request from '@/utils/request'

// 1. 获取商品列表数据
export const searchListData = (obj) => {
  const { categoryId, goodsName, page } = obj
  return request.get('/goods/list', {
    params: {
      categoryId, goodsName, page
    }
  })
}

// 2. 获取商品详情数据
export const getProDetail = (goodsId) => {
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

// 3. 获取商品评价
export const getProComments = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit // 显示的评论数量
    }
  })
}
