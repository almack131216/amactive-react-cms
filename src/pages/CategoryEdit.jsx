import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { useCrumb } from "../hooks/useCrumb"
import { buildQuery } from "../context/CrudActions"
import { useFetchCategory } from "../hooks/useFetchSingle"
import { Form, Button, Row, Col } from "react-bootstrap"
import CrudContext from "../context/CrudContext"

const axios = require("axios").default

function CategoryEdit() {
  console.log("[P]--CategoryEdit")
  // 1 CONTEXT
  const { cxSetActiveCategory, cxSetBreadcrumbs, activeCategory } =
    useContext(CrudContext)
  const params = useParams()
  const { breadcrumbArr } = useCrumb({
    page: "category-edit",
    categoryId: params.categoryId,
  })
  const [formData, setFormData] = useState({})
  // FETCH
  const q = buildQuery({
    api: "categories",
    id: params.categoryId ? params.categoryId : null,
  })
  console.log("Q: ", q)
  const { loading, error, categoryObj } = useFetchCategory(q, {
    type: "category",
  })
  const { id, name, slug } = categoryObj
  // USEEFFECT
  useEffect(() => {
    cxSetBreadcrumbs(breadcrumbArr)
  }, [])

  // 2Do - form validations
  const onChange = (e) => {
    // console.log(e.target.value)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // RETURNED PROPS
  if (error) return <h1>Error: {error}</h1>
  if (loading) return <h1>Loading...</h1>

  // 2Do - custom hook
  const updateForm = ({ id, name, slug }) => {
    const q = buildQuery({
      api: "update",
      type: "category",
      id,
    })
    console.log("[POST] Q: ", q)
    console.log("name: ", formData.name)

    let formDataNew = new FormData()
    formDataNew.append("id", id)
    formDataNew.append("name", formData.name)
    formDataNew.append("slug", formData.slug)
    formDataNew.append("type", "category")

    console.log("formData: ", formDataNew, name)

    axios
      .post(q, formDataNew)
      .then(function (response) {
        //handle success
        console.log(response)
        if (response.status === 200) {
          alert("Category update successfully.")
          cxSetActiveCategory({
            id: id,
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
      <h1>EDIT category: {id}</h1>

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

export default CategoryEdit
