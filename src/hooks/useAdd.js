import { useState } from "react"
import { buildQuery } from "../context/CrudActions"
const axios = require("axios").default

function useAddCategory(id, name, slug) {
  const [loading, setLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  //   const { id, name, slug } = formData
  const addForm = ({ id, name, slug }) => {
    setIsSubmitting(true)
    const q = buildQuery({
      api: "insert",
      type: "category",
    })
    console.log("[POST] Q: ", q)
    console.log("name: ", name)

    let formDataNew = new FormData()
    formDataNew.append("id", id)
    formDataNew.append("name", name)
    formDataNew.append("slug", slug)
    formDataNew.append("type", "category")

    console.log("formData: ", formDataNew, name)

    const insertData = async () => {
      try {
        await axios
          .post(q, formDataNew)
          .then(function (response) {
            //handle success
            console.log(response)
            if (response.status === 200) {
              alert("Category added successfully.")
            }
            setIsSubmitting(false)
          })
          .catch(function (response) {
            //handle error
            console.log(response)
            setIsSubmitting(false)
          })
      } catch (error) {
        console.log("Error: ", error)
        setError(error)
        setLoading(false)
        console.error(error)
      }
    }
    insertData()
  }

  return { addForm, error, loading, isSubmitting }
}

function useAddSubcategory(name, slug, categoryId) {
  const [loading, setLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  //   const { id, name, slug } = formData
  const addForm = ({ name, slug, categoryId }) => {
    setIsSubmitting(true)
    const q = buildQuery({
      api: "insert",
      type: "subcategory",
    })
    console.log("[POST] Q: ", q)
    console.log("name: ", name, " categoryId: ", categoryId)

    let formDataNew = new FormData()
    formDataNew.append("name", name)
    formDataNew.append("slug", slug)
    formDataNew.append("categoryId", categoryId)
    formDataNew.append("type", "subcategory")

    console.log("formData: ", formDataNew, name)

    const insertData = async () => {
      try {
        await axios
          .post(q, formDataNew)
          .then(function (response) {
            //handle success
            console.log(response)
            if (response.status === 200) {
              alert("Subcategory added successfully.")
            }
            setIsSubmitting(false)
          })
          .catch(function (response) {
            //handle error
            console.log(response)
            setIsSubmitting(false)
          })
      } catch (error) {
        console.log("Error: ", error)
        setError(error)
        setLoading(false)
        console.error(error)
      }
    }
    insertData()
  }

  return { addForm, error, loading, isSubmitting }
}

export { useAddCategory, useAddSubcategory }
