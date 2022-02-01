import {useParams} from "react-router-dom"

function Subcategory() {
    const params = useParams()

  return <div>Subcategory: {params.subcategoryId}</div>;
}

export default Subcategory;
