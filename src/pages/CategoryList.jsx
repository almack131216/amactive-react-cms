import { useContext } from "react"
import CrudContext from "../context/CrudContext"

function CategoryList() {
  const { categories } = useContext(CrudContext)
  console.log("[P]--CategoryList:", categories)
  return (
    <>
      <h1>Categories</h1>
      {categories && (
        <ul>
          {categories.map((category, index) => {
            return <li key={index}>{category.name}</li>
          })}
        </ul>
      )}
    </>
  )
}

export default CategoryList
