// pages/ProductList.js
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ProductList() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // 從 API 獲取產品資料
    fetch(process.env.NEXT_PUBLIC_API_BASE_URL + '/api/getAllProduct')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products)
      })
  }, [])

  // 實現新增、修改和刪除功能...

  return (
    <div className="container mx-auto px-4">
      <h1 className="my-4 text-xl font-bold">產品列表</h1>
      <Link href="/product/createProduct" className="bg-blue-500 px-4 py-2 text-white">
        Create
      </Link>
      <div>
        {/* 顯示產品列表 */}
        {products.map((product) => (
          <div key={product.id} className="border-b p-4">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            <div className="mt-2">
              <button className="mr-2 bg-blue-500 px-4 py-2 text-white">修改</button>
              <button className="bg-red-500 px-4 py-2 text-white">刪除</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
