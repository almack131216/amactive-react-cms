import { useContext } from "react"
import CrudContext from "../context/CrudContext"

function ItemList() {
  const { items } = useContext(CrudContext)
  console.log("[P]--ItemList:", items)
  return (
    <>
      <h1>Items</h1>
      {items && (
        <ul>
          {items.map((item, index) => {
            return <li key={index}>{item.name}</li>
          })}
        </ul>
      )}
    </>
  )
}

export default ItemList
