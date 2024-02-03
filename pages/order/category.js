// pages/index.js
import axios from '../../utils/axiosInstance'
import Image from 'next/image'
import { useEffect, useState } from 'react' // 添加 useState 和 useEffect 导入

function Category({ onSelect }) {
  // 使用 useState 定义 categorys 和 loading 状态
  const [categorys, setcategorys] = useState([])
  const [loading, setLoading] = useState(true)

  // 添加 useEffect，当 categorys 改变时更新 loading 状态
  useEffect(() => {
    axios.get('/category/getAllCategory').then((res) => {
      console.log(res)
      setcategorys(res.data)
      setLoading(false)
    })
  }, [])

  const selectCategory = (categoryid) => {
    onSelect(categoryid)
  }

  // 如果 loading 为 true，显示加载中消息
  if (loading) {
    return <p>Loading...</p>
  }

  return (
    <div>
      <ul role="list" className="divide-y">
        {categorys.map((category) => (
          <li
            key={category.categoryid}
            onClick={() => selectCategory(category.categoryid)} // 修复这里的 onClick
            className="group relative flex cursor-pointer justify-between  border-current pb-3 pt-9  text-2xl font-black text-primary"
          >
            <div>{category.name}</div>
            <div>
              <Image src="/images/star.svg" alt="star" width={36} height={36} layout="responsive" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Category
