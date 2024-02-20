import { db } from '../../../db.js'
export default async function createOrder(req, res) {
  try {
    if (req.method !== 'POST') {
      // 處理非 POST 請求
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    const client = await db.connect()

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

    const addOrderAndItems = async () => {
      try {
        await client.query('BEGIN')

        //建立訂單並回傳訂單id
        const orderResult = await client.query(
          `INSERT INTO lightup."Order" (totalamount, status, tableid, createtime,item)
         VALUES ($1, $2, $3, NOW(),$4)
         RETURNING orderid`,
          [totalAmount, 0, tableid, JSON.stringify(orderitemlist)], // 這些值根據實際情況動態替換
        )

        // const orderId = orderResult.rows[0].orderid

        // //加入orderitem
        // const itemsQuery = {
        //   text: `INSERT INTO lightup."OrderItems" (orderid, productid, quantity, subtotal)
        //        VALUES ${orderitemlist.map((_, i) => `($1, $${i * 3 + 2}, $${i * 3 + 3}, $${i * 3 + 4})`).join(', ')}`,
        //   values: [orderId, ...orderitemlist.flatMap((item) => [item.productid, item.quantity, item.subtotal])],
        // }
        // await client.query(itemsQuery)
        await client.query('COMMIT')
      } catch (e) {
        await client.query('ROLLBACK')
        throw e
      }
    }
    addOrderAndItems().catch((err) => {
      console.log(err)
      return res.status(500).json({ error: err.message })
    })
    client.release()

    return res.status(200).json({ success: true })
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
}
