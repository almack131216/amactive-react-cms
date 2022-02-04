import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { buildQuery } from "../context/CrudActions"
import { Container, Form, Button, Row, Col } from "react-bootstrap"

const axios = require('axios').default;

function ItemEdit() {
  const params = useParams()
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({})

  const { id, name, slug, images, categoryId, subcategoryId, description } = formData

  // Fetch listing to edit
  useEffect(() => {
    setLoading(true)

    const fetchItem = async () => {
      const q = buildQuery({
        api: "items",
        id: params.itemId,
      })
      console.log("Q: ", q)

      try {
        const response = await axios.get(q);
        const data = response.data
        console.log(data);
        
        if (data.length) {
          const dataLite = {
            id: parseInt(data[0].id),
            status: parseInt(data[0].status),
            slug: data[0].slug,
            name: data[0].name,
            categoryId: parseInt(data[0].category),
            subcategoryId: parseInt(data[0].catalogue_subcat_id),
            description: data[0].description,
            images: [],
          }
          console.log(dataLite)
          setFormData(dataLite)
          setLoading(false)
        }
      } catch (error) {
        setLoading(false)
        console.error(error);
      }
    }

    fetchItem()
  }, [])

  if (loading) {
    return <h3>Loading...</h3>
  }

  return (
    <>
<Container>
      <h1>EDIT item: {params.itemId}</h1>

      <Form>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm='2'>
            Name
          </Form.Label>
          <Col sm='10'>
            <Form.Control plaintext defaultValue={name} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm='2'>
            subcategory
          </Form.Label>
          <Col sm='10'>
            <Form.Control plaintext defaultValue={subcategoryId} />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className='mb-3'>
          <Form.Label column sm='2'>
            Description
          </Form.Label>
          <Col sm='10'>
          <Form.Control as="textarea" rows={3} defaultValue={description} />
          </Col>
        </Form.Group>
      </Form>
      </Container>
    </>
  )
}

export default ItemEdit
