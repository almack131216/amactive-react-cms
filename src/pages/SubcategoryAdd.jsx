import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { BREADCRUMBS, buildQuery } from "../context/CrudActions"
import { Form, Button, Row, Col } from "react-bootstrap"
import CrudContext from "../context/CrudContext"

const axios = require("axios").default

function SubcategoryAdd() {
  const { cxSetActiveCategory, cxSetBreadcrumbs } = useContext(CrudContext)
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { id, name, slug } = formData

  const addForm = ({ id, name, slug }) => {
    setIsSubmitting(true)
    const q = buildQuery({
      api: "insert",
      type: "subcategory",
      id,
    })
    console.log("[POST] Q: ", q)
    console.log("name: ", formData.name)

    let formDataNew = new FormData()
    formDataNew.append("id", id)
    formDataNew.append("categoryId", 2)
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
          alert("Subcategory added successfully.")
        }
        setIsSubmitting(false)
      })
      .catch(function (response) {
        //handle error
        console.log(response)
        setIsSubmitting(false)
      })
  }

  // Fetch listing to edit
  useEffect(() => {
    let breadcrumbArr = [BREADCRUMBS.CATEGORY_LIST]   
    cxSetBreadcrumbs(breadcrumbArr) 
  }, [])

  if (loading) {
    return <h3>Loading...</h3>
  }

  const onChange = (e) => {
    // console.log(e.target.value)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <h1>ADD subcategory</h1>

      <Form>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm='2'>
            Name
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              plaintext
              placeholder="Subcategory Name"
              name='name'
              onChange={(e) => onChange(e)}
              value={name}
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
              placeholder="subcategory-slug"
              name='slug'
              onChange={(e) => onChange(e)}
              value={slug}
            />
          </Col>
        </Form.Group>
      </Form>

      <Button type='submit' onClick={() => addForm({ id, name, slug })}  disabled={isSubmitting}>
        add
      </Button>
    </>
  )
}

export default SubcategoryAdd
