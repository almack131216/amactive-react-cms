import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { buildQuery } from "../context/CrudActions"
import { Container, Form, Button, Row, Col } from "react-bootstrap"

const axios = require("axios").default

function SubcategoryEdit() {
  const params = useParams()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({})

  const { id, name, slug } = formData

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
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response)
      })
  }

  // Fetch listing to edit
  useEffect(() => {
    setLoading(true)

    const fetchItem = async () => {
      const q = buildQuery({
        api: "subcategories",
        id: params.subcategoryId ? params.subcategoryId : null,
      })
      console.log("[useEffect] Q: ", q)

      try {
        const response = await axios.get(q)
        const data = response.data
        console.log(data)

        if (data.length) {
          const dataLite = {
            id: parseInt(data[0].id),
            status: parseInt(data[0].status),
            slug: data[0].slug,
            name: data[0].name,
          }
          console.log(dataLite)
          setFormData(dataLite)
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
        console.error(error)
      }
    }

    fetchItem()
  }, [params.subcategoryId])

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
      <Container>
        <h1>EDIT subcategory: {id}</h1>

        <Form>
          <Form.Group as={Row} className='mb-3'>
            <Form.Label column sm='2'>
              Name
            </Form.Label>
            <Col sm='10'>
              <Form.Control plaintext defaultValue={name} name='name' onChange={(e) => onChange(e)} />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className='mb-3'>
            <Form.Label column sm='2'>
              Slug
            </Form.Label>
            <Col sm='10'>
              <Form.Control plaintext defaultValue={slug} name='slug' onChange={(e) => onChange(e)}/>
            </Col>
          </Form.Group>
        </Form>

        <Button type='submit' onClick={() => updateForm({ id, name, slug })}>
          update
        </Button>
      </Container>
    </>
  )
}

export default SubcategoryEdit
