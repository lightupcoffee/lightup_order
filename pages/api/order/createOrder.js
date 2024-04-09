import { db } from '../../../db.js'
export default async function createOrder(req, res) {
  const client = await db.connect()
  try {
    if (req.method !== 'POST') {
      // 處理非 POST 請求
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    const { car, tableid, paymenttype } = req.body
    let totalAmount = 0

    //整理購物車資料
    const orderitemlist = Object.keys(car).map((key) => {
      const product = car[key].product

      const orderproductstatus = 0
      const orderitem = [
        product.categoryid, //產品類別
        product.productid, //產品ID
        product.name, //產品名稱
        product.price, //價錢
        car[key].count, //數量
        orderproductstatus, // 記錄這個品項做了沒，0:還沒做 1:已完成
      ]
      totalAmount += product.price * car[key].count
      return orderitem
    })

    // 建立訂單並處理事務
    await client.query('BEGIN')
    const insertQuery = `
    INSERT INTO lightup."Order" (totalamount, status, tableid, createtime, paymenttype, item)
    VALUES ($1, 0, $2, NOW(), $3, $4)
    RETURNING *
  `

    const orderResult = await client.query(insertQuery, [
      totalAmount,
      tableid,
      paymenttype,
      JSON.stringify(orderitemlist),
    ])
    await client.query('COMMIT')
    const order = orderResult.rows[0]
    const orderId = order.orderid // 從返回的訂單中取得 orderid
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '') // 生成 YYYYMMDD 格式的日期
    const ordernumber = `${currentDate}${String(orderId).padStart(5, '0')}` // 生成 ordernumber，如 "2024040900005"

    // 更新 ordernumber
    const updateQuery = ` UPDATE lightup."Order" SET ordernumber = $1 WHERE orderid = $2`

    await client.query(updateQuery, [ordernumber, orderId])
    await client.query('COMMIT')
    order.ordernumber = ordernumber
    console.log(`create oreder success:ordernumber :${ordernumber}`)
    res.status(200).json(order)
  } catch (err) {
    console.log(err)
    await client.query('ROLLBACK')
    res.status(500).json({ error: err.message })
  } finally {
    client.release() // 確保在操作完畢後釋放連接
  }
}
