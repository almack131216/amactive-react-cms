import { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { Table, Button } from "react-bootstrap"
import CrudContext from "../context/CrudContext"
import { BREADCRUMBS, buildQuery } from "../context/CrudActions"
import { useFetchCategories } from "../hooks/useFetch"
import { useDeleteCategory } from "../hooks/useDelete"

function CategoryList() {
  console.log("[P]--CategoryList")
  const { cxSetBreadcrumbs } = useContext(CrudContext)

  useEffect(() => {
    let breadcrumbArr = [BREADCRUMBS.CATEGORY_LIST]
    cxSetBreadcrumbs(breadcrumbArr)
  }, [])

  const q = buildQuery({
    api: "categories",
  })
  console.log("Q: ", q)

  const { loading, error, categories } = useFetchCategories(q, {})

  const { deleteCategory } = useDeleteCategory()

  if (error) return <h1>Error: {error}</h1>

  if (loading) return <h1>Loading...</h1>

  return (
    <>
      <h1>Categories</h1>
      <Link to='/category/add'>Add Category</Link>
      {categories.length && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => {
              return (
                <tr key={index}>
                  <td>{category.id}</td>
                  <td>
                    <Link to={`/c${category.id}/subcategory/list`}>
                      {category.name}
                    </Link>
                  </td>
                  <td>
                    <Link
                      variant='outline-danger'
                      size='sm'
                      to={`/category/edit/${category.id}`}
                      className='btn btn-outline-primary btn-sm'
                    >
                      Edit
                    </Link>
                    <Button
                      variant='outline-danger'
                      size='sm'
                      onClick={() =>
                        deleteCategory({
                          name: category.name,
                          id: category.id,
                          // subcategoryCount: category.subcategoryCount,
                          // itemCount: category.itemCount
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
    </>
  )
}

export default CategoryList
