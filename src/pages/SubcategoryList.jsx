import { useEffect, useState, useContext, useRef } from "react"
import { Link, useParams } from "react-router-dom"
import { Container, Table, Button } from "react-bootstrap"
import { buildQuery } from "../context/CrudActions"
import { useCrumb } from "../hooks/useCrumb"
import { useFetchCategoryList } from "../hooks/useFetchList"
import CrudContext from "../context/CrudContext"
import { useDeleteCategory } from "../hooks/useDelete"
import PageTitle from "../components/PageTitle"

function SubcategoryList() {
  console.log("[P]--SubcategoryList")
  const { cxSetBreadcrumbs } = useContext(CrudContext)
  const params = useParams()
  const {breadcrumbArr} = useCrumb({page:'subcategory-list', categoryId: params.categoryId})
  const isMounted = useRef(true)
  const [categoryId, setCategoryId] = useState(
    params.categoryId ? params.categoryId : null
  )

  const q = buildQuery({
    api: "subcategories",
    categoryId: categoryId,
  })

  const { loading, error, subcategories } = useFetchCategoryList(q, {
    type: "subcategory",
  })

  const { deleteCategory, deletedId } = useDeleteCategory()

  useEffect(() => {

        console.log("LOAD BREADCRUMBS...", breadcrumbArr)
        cxSetBreadcrumbs(breadcrumbArr)

  }, [subcategories])

  if (error) {
    return <h1>Error: {error}</h1>
  }

  if (loading) {
    return <h1>Loading...</h1>
  }

  if (deletedId) {
    console.log("deletedId: ", deletedId)
  }

  return (
    <Container>
      <PageTitle
        title='Subcategories'
        addButton={{
          text: "add subcategory",
          slug: `/c${categoryId}/subcategory/add`,
        }}
      />

      {!subcategories.length && <p>No subcategories</p>}
      {subcategories.length > 0 && (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subcategories.map((subcategory) => {
                return (
                  <tr key={subcategory.id}>
                    <td>{subcategory.id}</td>
                    <td>
                      <Link
                        to={`/c${subcategory.categoryId}/sc${subcategory.id}/item/list`}
                      >
                        {subcategory.name}
                      </Link>
                    </td>
                    <td>
                      <Link
                        to={`/c${subcategory.categoryId}/subcategory/edit/${subcategory.id}`}
                        className='btn btn-outline-primary btn-sm'
                      >
                        Edit
                      </Link>

                      <Button
                        variant='outline-danger'
                        size='sm'
                        onClick={() =>
                          deleteCategory({
                            name: subcategory.name,
                            id: subcategory.id,
                            type: "subcategory",
                            categoryId: subcategory.categoryId,
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
        </>
      )}
    </Container>
  )
}

export default SubcategoryList
