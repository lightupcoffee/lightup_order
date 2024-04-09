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
  const { transactionId, ordernumber } = req.body // 從請求中獲取交易ID和訂單ID
  const client = await db.connect()
  const updateQuery = `SELECT * FROM lightup."Order" where ordernumber =$1`
  const result = await client.query(updateQuery, [ordernumber])
  const order = result.rows[0]
  if (!order) {
    console.log(`查詢失敗 找不到訂單${ordernumber}`)
    res.status(500).json({ message: '查詢失敗', detail: `找不到訂單${ordernumber}` })
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
    // 使用參數化查詢來更新訂單
    try {
      const updateQuery = `UPDATE lightup."Order" SET transactionid = $1, paymenttime = NOW(), status = 1 WHERE ordernumber = $2`
      await client.query(updateQuery, [transactionId, ordernumber])
      client.release()
    } catch {
      console.log(`set transactionid error ,transactionid:${transactionId}, ordernumber:${ordernumber}`)
    }

    res.status(200).json(data)
  } else {
    console.log(`linepayConfirm error: ${JSON.stringify(data)}`)
    // 使用參數化查詢來刪除訂單
    const deleteQuery = `DELETE FROM lightup."Order" WHERE ordernumber = $1`
    await client.query(deleteQuery, [ordernumber])
    res.status(500).json(data)
  }
}
