import { useState, useEffect, useContext } from "react"
import { buildQuery } from "../context/CrudActions"
import CrudContext from "../context/CrudContext"
const axios = require("axios").default

function useDeleteCategory(id, name) {
  const { cxDeleteCategory } = useContext(CrudContext)

  const deleteCategory = ({ name, id }) => {
    // `Are you sure want to delete?\r\n${name}\r\n\r\nThis category has ${subcategoryCount} subcategories and ${itemCount} items.
    const q = buildQuery({
      api: "delete",
      type: "category",
      id,
    })
    console.log("Q: ", q)

    if (
      window.confirm(
        `Are you sure want to delete?\r\n${name}\r\n\r\nThis category may have items attached.`
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
            alert("Category deleted successfully")
            cxDeleteCategory(id)
          }
        })
        .catch(function (response) {
          //handle error
          console.log(response)
        })
    }
  }

  return { deleteCategory }
}

export { useDeleteCategory }
