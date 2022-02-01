import { useContext } from "react"
import CrudContext from "../context/CrudContext"

function SubcategoryList() {
  const { subcategories } = useContext(CrudContext)
  console.log("[P]--SubcategoryList:", subcategories)
  return (
    <>
      <h1>Subcategories</h1>
      {subcategories && (
        <ul>
          {subcategories.map((subcategory, index) => {
            return <li key={index}>{subcategory.name}</li>
          })}
        </ul>
      )}
    </>
  )
}

export default SubcategoryList
