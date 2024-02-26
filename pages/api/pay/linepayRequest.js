// pages/api/pay/linepayRequest.js

import crypto from 'crypto'
function generateLinePayHeaders(channelId, channelSecretKey, uri, body) {
  const nonce = crypto.randomUUID()
  const message = channelSecretKey + uri + JSON.stringify(body) + nonce
  const hmac = crypto.createHmac('sha256', channelSecretKey)
  hmac.update(message)
  const signature = hmac.digest('base64')

  return {
    'Content-Type': 'application/json',
    'X-LINE-ChannelId': channelId,
    'X-LINE-Authorization-Nonce': nonce,
    'X-LINE-Authorization': signature,
  }
}

export default async (req, res) => {
  const { order } = req.body

  const channelId = process.env.LINE_PAY_CHANNEL_ID
  const channelSecretKey = process.env.LINE_PAY_CHANNEL_SECRET
  const uri = '/v3/payments/request' // 根據實際API調整

  const body = {
    amount: order.totalamount,
    currency: 'TWD',
    orderId: order.orderid,
    packages: [
      {
        id: '1',
        amount: order.totalamount,
        name: 'Package',
        products: JSON.parse(order.item).map((x) => {
          return {
            name: x[2],
            quantity: x[4],
            price: x[3],
          }
        }),
      },
    ],
    redirectUrls: {
      confirmUrl: `${process.env.API_BASE_URL}/order/linepayconfirm?tableId=${order.tableid}`, //你的確認付款頁面URL
      cancelUrl: `${process.env.API_BASE_URL}?notableId`, //用戶取消付款後的重定向URL
    },
  }

  // 生成請求標頭
  const headers = generateLinePayHeaders(channelId, channelSecretKey, uri, body)

  let baseurl = `https://${process.env.ENV_TYPE === 'development' ? 'sandbox-' : ''}api-pay.line.me`

  // 發送請求到 LINE Pay
  const response = await fetch(baseurl + uri, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })
  const data = await response.json()
  if (data.returnCode === '0000') {
    res.status(200).json(data)
  } else {
    res.status(500).json(data)
  }
}
