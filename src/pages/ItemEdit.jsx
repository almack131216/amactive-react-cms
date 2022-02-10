import { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { useCrumb } from "../hooks/useCrumb"
import { buildQuery } from "../context/CrudActions"
import { Container, Form, Button, Row, Col } from "react-bootstrap"
import CrudContext from "../context/CrudContext"
import { useFetchItem } from "../hooks/useFetchSingle"

const axios = require("axios").default

function ItemEdit() {
  console.log("P]--ItemEdit")
  // CONTEXT
  const { activeSubcategory, cxSetBreadcrumbs } = useContext(CrudContext)
  const params = useParams()

  const [formData, setFormData] = useState({})
  const [canSubmit, setCanSubmit] = useState(false)
  // Fetch listing to edit
  const q = buildQuery({
    api: "items",
    id: params.itemId,
  })
  console.log("Q: ", q)
  const { loading, error, itemObj } = useFetchItem(q, {
    type: "item",
  })
  const {
    id,
    name,
    slug,
    description,
    categoryId,
    categoryName,
    subcategoryId,
    subcategoryName,
  } = itemObj

  const { breadcrumbArr } = useCrumb({
    page: "item-edit",
    categoryId: categoryId,
    subcategoryId: subcategoryId,
  })

  useEffect(() => {
    cxSetBreadcrumbs(breadcrumbArr)
  }, [activeSubcategory])

  const onMutate = (e) => {
    console.log(e.target.value)
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
    console.log("readyToSubmit:", canSubmit, itemObj)
    setCanSubmit(itemObj[e.target.name] !== e.target.value ? true : false)
  }

  // 2Do - custom hook
  const updateForm = ({ id, name, slug }) => {
    const q = buildQuery({
      api: "update",
      type: "item",
      id,
    })
    console.log("[POST] Q: ", q)
    console.log("name: ", formData.FormDataname)

    let formDataNew = new FormData()
    formDataNew.append("id", id)
    formData.name && formDataNew.append("name", formData.name)
    formData.slug && formDataNew.append("slug", formData.slug)
    formData.description &&
      formDataNew.append("description", formData.description)
    formDataNew.append("type", "item")

    console.log("formData: ", formDataNew, name)

    axios
      .post(q, formDataNew)
      .then(function (response) {
        //handle success
        console.log(response)
        if (response.status === 200) {
          alert("Item update successfully.")
          // 2Do - update item name on page
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response)
      })
  }

  if (loading) {
    return <h3>Loading...</h3>
  }

  return (
    <>
      <h1>EDIT item: {params.itemId}</h1>

      <Form>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm='2'>
            Name
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              plaintext
              name='name'
              defaultValue={name}
              onChange={onMutate}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm='2'>
            slug
          </Form.Label>
          <Col sm='10'>
            <Form.Control
              plaintext
              name='slug'
              defaultValue={slug}
              onChange={onMutate}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm='2'>
            Description
          </Form.Label>
          <Col sm='10'>
            <Form.Control as='textarea' rows={3} defaultValue={description} />
          </Col>
        </Form.Group>
        <Button
          type='submit'
          onClick={() => updateForm({ id, name, slug })}
          disabled={!canSubmit}
        >
          update
        </Button>
      </Form>
    </>
  )
}

export default ItemEdit
