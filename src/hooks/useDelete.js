import { useState, useEffect, useContext } from "react"
import { buildQuery } from "../context/CrudActions"
import CrudContext from "../context/CrudContext"
const axios = require("axios").default

function useDeleteCategory() {
  const { cxDeleteCategory, cxDeleteSubcategory } = useContext(CrudContext)
  const [deletedId, setDeletedId] = useState(null)

  const deleteCategory = ({ name, id, type, categoryId }) => {
    // `Are you sure want to delete?\r\n${name}\r\n\r\nThis category has ${subcategoryCount} subcategories and ${itemCount} items.
    const q = buildQuery({
      api: "delete",
      type: type,
      id,
    })
    console.log("Q: ", q)

    if (
      window.confirm(
        `Are you sure want to delete this ${type}?\r\n${name}\r\n\r\nThis ${type} may have items attached.`
      )
    ) {
      axios({
        method: "post",
        url: q,
      })
        .then(function (response) {
          //handle success
          console.log(response)
          if (response.status === 200) {
            alert(`${name} deleted successfully`)
            setDeletedId(id)
            type === "category" && cxDeleteCategory(id)
            type === "subcategory" && cxDeleteSubcategory(id)
          }
        })
        .catch(function (response) {
          //handle error
          console.log(response)
        })
    }
  }

  return { deleteCategory, deletedId }
}

function useDeleteItem() {
  const { cxDeleteItem } = useContext(CrudContext)
  const [deletedId, setDeletedId] = useState(null)

  const deleteItem = ({ name, id, type, categoryId }) => {
    // `Are you sure want to delete?\r\n${name}\r\n\r\nThis category has ${subcategoryCount} subcategories and ${itemCount} items.
    const q = buildQuery({
      api: "delete",
      type: type,
      id,
    })
    console.log("Q: ", q)

    if (
      window.confirm(
        `Are you sure want to delete this ${type}?\r\n${name}`
      )
    ) {
      axios({
        method: "post",
        url: q,
      })
        .then(function (response) {
          //handle success
          console.log(response)
          if (response.status === 200) {
            alert(`${name} deleted successfully`)
            setDeletedId(id)
            cxDeleteItem(id)
          }
        })
        .catch(function (response) {
          //handle error
          console.log(response)
        })
    }
  }

  return { deleteItem, deletedId }
}

export { useDeleteCategory, useDeleteItem }
