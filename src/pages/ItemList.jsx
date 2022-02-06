import { useEffect, useState, useContext } from "react"
import { Container, Table, Button } from "react-bootstrap"
import { buildQuery } from "../context/CrudActions"
import { Link, useParams } from "react-router-dom"
import CrudContext from "../context/CrudContext"

const axios = require("axios").default

function ItemList() {
  const { items, cxSetItems, cxDeleteItem } = useContext(CrudContext)
  const [loading, setLoading] = useState(false)
  const params = useParams()

  useEffect(() => {
    cxSetItems([])

    const getItems = async () => {
      const q = buildQuery({
        api: "items",
        categoryId: params.categoryId ? params.categoryId : null,
        subcategoryId: params.subcategoryId ? params.subcategoryId : null,
        limit: 10,
      })
      console.log("Q: ", q)

      try {
        const response = await axios.get(q)
        const data = response.data
        console.log(data[0])

        if (data.length) {
          cxSetItems(data)
          setLoading(false)
        } else {
          cxSetItems([])
        }
      } catch (error) {
        setLoading(false)
        console.error(error)
      }
    }

    getItems()
  }, [])

  const deleteItem = ({ name, id }) => {
    // 1. Build API url
    const q = buildQuery({
      api: "delete",
      type: "item",
      id,
    })

    // 2. Confirm window... DO
    if (
      window.confirm(`Are you sure you want to delete this item?\r\n${name}`)
    ) {
      axios({
        method: "post",
        url: q,
      }).then((response) => {
        // handle success
        console.log(response)
        if (response.status === 200) {
          alert("Item successfully deleted")
          cxDeleteItem(id)
        }
      })
    }
  }

  console.log("[P]--ItemList:", items[0])
  return (
    <Container>
      <h1>Items</h1>
      {items.length > 0 && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>
                    <Link to={`/item/edit/${item.id}`}>{item.name}</Link>
                  </td>
                  <td>
                    <Link
                      to={`/item/edit/${item.id}`}
                      className='btn btn-outline-primary btn-sm'
                    >
                      Edit
                    </Link>
                    <Button
                      variant='outline-danger'
                      size='sm'
                      onClick={() =>
                        deleteItem({
                          name: item.name,
                          id: item.id,
                        })
                      }
                    >
                      DELETE
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      )}
    </Container>
  )
}

export default ItemList
