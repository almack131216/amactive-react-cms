import React, { useState } from "react"

export const useForm = (callback) => {
  // Form Values
  const [values, setValues] = useState({})
  // Errors
  const [errors, setErrors] = useState({})

  const removeError = (getParameter) => {
    let newObj = { ...errors }
    delete newObj[getParameter]
    setErrors(newObj)
  }

  const validate = (e, name, value) => {
    console.log("validate: ", name, value)
    // validate each input value
    switch (name) {
      case "name":
        if (value.length <= 3) {
          // set error
          setErrors({
            ...errors,
            name: "Name must be at least 4 characters",
          })
        } else {
          // remove error from input
          removeError("name")
        }
        break

      case "slug":
        if (value.length <= 3) {
          setErrors({
            ...errors,
            slug: "Slug must be at least 4 characters",
          })
        } else {
          removeError("slug")
        }
        break

      case "email":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          setErrors({
            ...errors,
            email: "Enter a valid email address",
          })
        } else {
          removeError("email")
        }
        break

      case "password":
        if (
          !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
        ) {
          setErrors({
            ...errors,
            password:
              "Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers",
          })
        } else {
          removeError("password")
        }
        break

      default:
        break
    }
  }

  // set parentCategory
  const setParentCategory = (id) => {
    setValues({
      ...values,
      parentCategoryId: id,
    })
  }

  // Method to handle form inputs
  const handleChange = (e) => {
    e.persist()
    // console.log("input name: ", e.target.name);
    // console.log("input value: ", e.target.value);
    validate(e, e.target.name, e.target.value)
    // Set values in state
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    if (e) e.preventDefault()

    if (Object.keys(errors).length === 0 && Object.keys(values).length) {
      callback()
    } else {
      alert("there is an error ")
    }
  }

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    setParentCategory
  }
}

export default useForm
