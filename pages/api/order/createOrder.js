import { db } from '../../../db.js'
export default async function createOrder(req, res) {
  const client = await db.connect()
  try {
    if (req.method !== 'POST') {
      // 處理非 POST 請求
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    const { car, tableid } = req.body
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

    await client.query(
      `INSERT INTO lightup."Order" (totalamount, status, tableid, createtime, item)
       VALUES ('${totalAmount}', 0, '${tableid}', NOW(), '${JSON.stringify(orderitemlist)}')`,
    )

    await client.query('COMMIT')
    res.status(200).json({ success: true })
  } catch (err) {
    console.log(err)
    await client.query('ROLLBACK')
    res.status(500).json({ error: err.message })
  } finally {
    client.release() // 確保在操作完畢後釋放連接
  }
}
