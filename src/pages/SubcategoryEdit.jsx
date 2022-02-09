import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { BREADCRUMBS, buildQuery } from "../context/CrudActions"
import { Form, Button, Row, Col } from "react-bootstrap"
import CrudContext from "../context/CrudContext"
import { useFetchCategory } from "../hooks/useFetchSingle"
const axios = require("axios").default

function SubcategoryEdit() {
  console.log("[P]--SubcategoryEdit")
  // 1 CONTEXT
  const {
    cxSetBreadcrumbs,
    activeCategory,
    activeSubcategory,
    cxSetActiveSubcategory,
  } = useContext(CrudContext)
  const [formData, setFormData] = useState({})
  // FETCH
  const params = useParams()
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
    let breadcrumbArr = [BREADCRUMBS.CATEGORY_LIST]

    if (activeCategory.id) {
      breadcrumbArr.push({
        type: "category-list",
        name: activeCategory.name,
        slug: `/c${activeCategory.id}/subcategory/list`,
      })
    }
    if (activeSubcategory.id) {
      breadcrumbArr.push({
        type: "category-list",
        name: activeSubcategory.name,
        slug: `/c${activeCategory.id}/subcategory/edit/sc${activeSubcategory.id}`,
      })
    }
    cxSetBreadcrumbs(breadcrumbArr)
  }, [activeCategory, activeSubcategory])

  // RETURNED PROPS
  if (error) return <h1>Error: {error}</h1>
  if (loading) return <h1>Loading...</h1>

  // 2Do - form validations
  const onChange = (e) => {
    // console.log(e.target.value)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
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
    formDataNew.append("name", formData.name)
    formDataNew.append("slug", formData.slug)
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
      <h1>EDIT subcategory: {name}</h1>

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

      <Button type='submit' onClick={() => updateForm({ id, name, slug })}>
        update
      </Button>
    </>
  )
}

export default SubcategoryEdit
