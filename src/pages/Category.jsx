import { Link, useNavigate, useParams } from "react-router-dom"

function Category() {
  // const navigate = useNavigate()
  const params = useParams()

  return <div>Category: {params.categoryId}</div>
}

export default Category
