import crypto from 'crypto'
import { db } from '../../../db.js'
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
  const { transactionId, orderId } = req.body // 從請求中獲取交易ID和訂單ID
  const client = await db.connect()
  const result = await client.query(`SELECT * FROM lightup."Order" where orderid =${orderId}`)
  const order = result.rows[0]
  if (!order) {
    console.log(`查詢失敗 找不到訂單${orderId}`)
    res.status(500).json({ message: '查詢失敗', detail: `找不到訂單${orderId}` })
  }

  const channelId = process.env.LINE_PAY_CHANNEL_ID
  const channelSecretKey = process.env.LINE_PAY_CHANNEL_SECRET
  const uri = `/v3/payments/${transactionId}/confirm` // 根據實際API調整
  const body = {
    amount: order.totalamount, // 付款金額，實際使用時應該從數據庫或其他存儲中動態獲取
    currency: 'TWD',
  }
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
    await client.query(
      `UPDATE  lightup."Order" SET transactionid=${transactionId}, paymenttime=NOW() , status=1 where orderid = ${orderId}`,
    )
    client.release()
    res.status(200).json(data)
  } else {
    console.log(`linepayConfirm error: ${JSON.stringify(data)}`)
    await client.query(`delete from lightup."Order" WHERE orderid= ${orderId} ; `)
    res.status(500).json(data)
  }
}
