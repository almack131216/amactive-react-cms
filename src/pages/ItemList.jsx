import { useEffect, useContext, useRef } from "react"
import { Container, Table, Button } from "react-bootstrap"
import { buildQuery, BREADCRUMBS } from "../context/CrudActions"
import { useFetchItems } from "../hooks/useFetch"
import { Link, useParams } from "react-router-dom"
import CrudContext from "../context/CrudContext"
import { useDeleteItem } from "../hooks/useDelete"

function ItemList() {
  console.log("[P]--ItemList")
  const { cxSetBreadcrumbs, activeCategory, activeSubcategory } = useContext(CrudContext)
  let breadcrumbArr = [BREADCRUMBS.CATEGORY_LIST]
  // eslint-disable-next-line
  const params = useParams()
  const isMounted = useRef(true)

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
    if (!items.length) return
    if (isMounted) {
      params.categoryId &&
        breadcrumbArr.push({
          type: "category-active",
          name: activeCategory.name ? activeCategory.name : `c${params.categoryId}`,
          slug: `/c${activeCategory.id ? activeCategory.id : params.categoryId}/subcategory/list`,
        })
      params.subcategoryId &&
        breadcrumbArr.push({
          type: "subcategory-active",
          name: activeSubcategory.name ? activeSubcategory.name : `sc${params.subcategoryId}`,
          slug: `/c${activeSubcategory.id ? activeSubcategory.id : params.subcategoryId}/subcategory/list`,
        })

      if (breadcrumbArr.length) {
        console.log("LOAD BREADCRUMBS...", breadcrumbArr)
        cxSetBreadcrumbs(breadcrumbArr)
      }
    }

    return () => {
      isMounted.current = false
    }
  }, [isMounted, items])

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
