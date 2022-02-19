import { useContext } from "react"
import { FormContext } from "../../../context/FormContext"

const Select = ({ id, label, options }) => {
  const { handleChange } = useContext(FormContext)

  return (
    <>
      <label>{label}</label>
      <select
        className='form-select'
        onChange={(e) => handleChange(id, e)}
      >
        <option>Choose...</option>
        {options.length > 0 &&
          options.map((option, i) => (
            <option key={i} value={option.option_label}>
              {option.option_label}
            </option>
          ))}
      </select>
    </>
  )
}

export default Select
