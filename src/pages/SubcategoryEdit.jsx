import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { useCrumb } from "../hooks/useCrumb"
import { buildQuery } from "../context/CrudActions"
import { Form, Button, Row, Col } from "react-bootstrap"
import CrudContext from "../context/CrudContext"
import { useFetchCategory } from "../hooks/useFetchSingle"
const axios = require("axios").default

function SubcategoryEdit() {
  console.log("[P]--SubcategoryEdit")
  // 1 CONTEXT
  const {
    activeCategory,
    activeSubcategory,
    cxSetBreadcrumbs,
    cxSetActiveSubcategory,
  } = useContext(CrudContext)
  const params = useParams()
  const { breadcrumbArr } = useCrumb({
    page: "subcategory-edit",
    categoryId: params.categoryId,
    subcategoryId: params.subcategoryId,
  })
  const [formData, setFormData] = useState({})
  const [canSubmit, setCanSubmit] = useState(false)
  // FETCH
  const q = buildQuery({
    api: "subcategories",
    id: params.subcategoryId ? params.subcategoryId : null,
  })
  console.log("Q: ", q)
  const { loading, error, categoryObj } = useFetchCategory(q, {
    type: "subcategory",
  })
  const { id, name, slug } = categoryObj
  // USEEFFECT
  useEffect(() => {
    cxSetBreadcrumbs(breadcrumbArr)
  }, [activeSubcategory])
  // RETURNED PROPS
  if (error) return <h1>Error: {error}</h1>
  if (loading) return <h1>Loading...</h1>

  // 2Do - form validations
  const onChange = (e) => {
    console.log(e.target.value)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    console.log("readyToSubmit:", canSubmit, categoryObj)
    setCanSubmit(categoryObj[e.target.name] !== e.target.value ? true : false)
  }
  // 2Do - custom hook
  const updateForm = ({ id, name, slug }) => {
    const q = buildQuery({
      api: "update",
      type: "subcategory",
      id,
    })
    console.log("[POST] Q: ", q)
    console.log("name: ", formData.name)

    let formDataNew = new FormData()
    formDataNew.append("id", id)
    formData.name && formDataNew.append("name", formData.name)
    formData.slug && formDataNew.append("slug", formData.slug)
    formDataNew.append("type", "subcategory")

    console.log("formData: ", formDataNew, name)

    axios
      .post(q, formDataNew)
      .then(function (response) {
        //handle success
        console.log(response)
        if (response.status === 200) {
          alert("Subcategory update successfully.")
          cxSetActiveSubcategory({
            id,
            name: formData.name,
            slug: formData.slug,
          })
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response)
      })
  }

  // XML
  return (
    <>
      <h1>EDIT subcategory: {formData.name}</h1>

      <Form>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm='2'>
            Name
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              plaintext
              defaultValue={name}
              name='name'
              onChange={(e) => onChange(e)}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm='2'>
            Slug
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              plaintext
              defaultValue={slug}
              name='slug'
              onChange={(e) => onChange(e)}
            />
          </Col>
        </Form.Group>
      </Form>

      <Button
        type='submit'
        onClick={() => updateForm({ id, name, slug })}
        disabled={!canSubmit}
      >
        update
      </Button>
    </>
  )
}

export default SubcategoryEdit
