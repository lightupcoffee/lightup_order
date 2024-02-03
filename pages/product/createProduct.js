// // components/ProductForm.js 或在您的頁面組件中

// import { useState } from 'react'

// export default function createProduct() {
//   const [product, setProduct] = useState({
//     name: '',
//     description: '',
//     price: '',
//     category: '',
//   })

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setProduct({ ...product, [name]: value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     try {
//       const res = await fetch('/api/addProduct', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(product),
//       })

//       if (res.status === 200) {
//         const result = await res.json()
//         console.log(result)
//         // 處理成功後的操作，例如清空表單或顯示成功訊息
//       } else {
//         // 處理錯誤情況
//       }
//     } catch (error) {
//       console.error('提交產品時發生錯誤:', error)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="mx-auto max-w-xl rounded-lg p-4 shadow-md">
//       <div className="mb-4">
//         <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//           產品名稱
//         </label>
//         <input
//           type="text"
//           name="name"
//           value={product.name}
//           onChange={handleChange}
//           placeholder="產品名稱"
//           className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="description" className="block text-sm font-medium text-gray-700">
//           產品描述
//         </label>
//         <textarea
//           name="description"
//           value={product.description}
//           onChange={handleChange}
//           placeholder="產品描述"
//           rows="4"
//           className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="price" className="block text-sm font-medium text-gray-700">
//           價格
//         </label>
//         <input
//           type="text"
//           name="price"
//           value={product.price}
//           onChange={handleChange}
//           placeholder="價格"
//           className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
//         />
//       </div>
//       <div className="mb-4">
//         <label htmlFor="category" className="block text-sm font-medium text-gray-700">
//           分類
//         </label>
//         <input
//           type="text"
//           name="category"
//           value={product.category}
//           onChange={handleChange}
//           placeholder="分類"
//           className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
//         />
//       </div>
//       <button type="submit" className="w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
//         新增產品
//       </button>
//     </form>
//   )
// }
