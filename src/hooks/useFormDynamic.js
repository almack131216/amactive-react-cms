import { useEffect, useState } from "react"
import useSlugify from "./useSlugify"
import useValidation from "./useValidation"
// import formJSON from "../components/forms/data/formAddCategory.json"

export const useForm = (callback) => {
  // Form Elements
  const [elements, setElements] = useState(null)
  // Form Values
  const [values, setValues] = useState({})
  // Errors
  const [errors, setErrors] = useState({})
  // Slug
  const { slugMe } = useSlugify()
  // Validate
  const { returnValidationError } = useValidation()

  useEffect(() => {
    // setElements(formJSON[0])
  }, [])

  const removeError = (getParameter) => {
    let newObj = { ...errors }
    delete newObj[getParameter]
    setErrors(newObj)
  }

  const validate = (name, value) => {
    console.log("validate: ", name, value)
    const hasError = returnValidationError(name, value)

    if (hasError) {
      // set error
      setErrors({
        ...errors,
        [name]: hasError,
      })
    } else {
      // remove error from input
      removeError(name)
    }
  }

  // set parentCategory
  const setParentCategoryId = (id) => {
    setValues({
      ...values,
      categoryId: id,
    })
  }

  // Method to handle form inputs
  const handleChange = (getName, e) => {
    console.log("handleChange")

    const newElements = { ...elements }
    newElements.fields.forEach((field) => {
      const { type, name } = field
      if (name === getName) {
        switch (type) {
          case "checkbox":
            field["value"] = e.target.checked
            break

          default:
            field["value"] = e.target.value
            break
        }
      }
      setElements(newElements)
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      })
      validate(e.target.name, e.target.value)

      // if(name === "name"){
      //   handleSlug('name')
      //   console.log("handleChange, name: ", name, " getName: ", getName);
      // }
    })

    console.log("Elements: ", elements)
    console.log("Errors: ", errors)
  }

  // Method to submit form inputs and callback to page
  const handleSubmit = (e) => {
    if (e) e.preventDefault()

    if (Object.keys(errors).length === 0 && Object.keys(values).length) {
      callback()
    } else {
      alert("there is an error ")
    }
  }

  const handleSlug = (getNameField) => {
    let nameFieldName = getNameField ? getNameField : "name"
    let nameFieldValue = ""
    let newSlug = ""

    const newElements = { ...elements }
    newElements.fields.forEach((field) => {
      const { type, name } = field
      if (name === nameFieldName) {
        nameFieldValue = field["value"]
      }
      if (name === "slug") {
        newSlug = slugMe(nameFieldValue)
        console.log("handleSlug: ", nameFieldValue, newSlug)
        field["value"] = newSlug
        validate("slug", newSlug)
      }
    })

    setElements(newElements)
    setValues({
      ...values,
      slug: newSlug,
    })

    console.log("Elements: ", elements)
    // return newSlug
  }

  // RETURN values & functions
  return {
    elements,
    values,
    errors,
    handleChange,
    handleSubmit,
    handleSlug,
    setElements,
    setParentCategoryId,
  }
}

export default useForm
