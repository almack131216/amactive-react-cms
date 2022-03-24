import { useContext } from "react"
import Input from "./Input"
import Select from "./Select"
import Checkbox from "./Checkbox"
import CrudContext from "../../../context/CrudContext"

const Element = ({
  field: {
    type,
    name,
    label,
    tip,
    placeholder,
    value
  },categoryId,error
}) => {

  const {selectCategoryOptions} = useContext(CrudContext)

  switch (type) {
    case "text":
      return (
        <Input
          name={name}
          label={label}
          tip={tip}
          placeholder={placeholder}
          value={value}
          error={error}
        />
      )

    case "checkbox":
      return (
        <Checkbox
          name={name}
          label={label}
          tip={tip}
          value={value}
        />
      )

    case "select":
      const options = name === "categoryId" ? selectCategoryOptions : []

      return (
        <Select
          name={name}
          label={label}
          tip={tip}
          placeholder={placeholder}
          value={value}
          options={options}
        />
      )

    default:
      return null
  }
}

export default Element
