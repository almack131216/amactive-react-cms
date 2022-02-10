import { useEffect, useContext } from "react"
import { Container, Table, Button } from "react-bootstrap"
import { buildQuery } from "../context/CrudActions"
import { useCrumb } from "../hooks/useCrumb"
import { useFetchItems } from "../hooks/useFetchList"
import { Link, useParams } from "react-router-dom"
import CrudContext from "../context/CrudContext"
import { useDeleteItem } from "../hooks/useDelete"

function ItemList() {
  console.log("[P]--ItemList")
  const { cxSetBreadcrumbs } = useContext(CrudContext)
  const params = useParams()
  const { breadcrumbArr } = useCrumb({
    page: "item-list",
    categoryId: params.categoryId,
    subcategoryId: params.subcategoryId,
  })

  const q = buildQuery({
    api: "items",
    categoryId: params.categoryId ? params.categoryId : null,
    subcategoryId: params.subcategoryId ? params.subcategoryId : null,
    limit: 10,
  })
  console.log("Q: ", q)

  const { loading, error, items } = useFetchItems(q, {})

  const { deleteItem, deletedId } = useDeleteItem()

  useEffect(() => {
    cxSetBreadcrumbs(breadcrumbArr)
  }, [items])

  if (error) {
    return <h1>Error: {error}</h1>
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (deletedId) {
    console.log("deletedId: ", deletedId)
  }

  if (items !== {}) {
    console.log("Subcategories loaded...", items)
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
            {items.map((item) => {
              return (
                <tr key={item.id}>
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
                          type: "item",
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
