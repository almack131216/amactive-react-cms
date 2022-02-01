import { Link, useNavigate, useParams } from "react-router-dom"

function Item() {
    // const navigate = useNavigate()
  const params = useParams()

  return <div>Item: {params.itemId}</div>;
}

export default Item;
