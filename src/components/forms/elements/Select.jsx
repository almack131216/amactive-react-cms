import { useContext } from "react"
import { FormContext } from "../../../context/FormContext"

const Select = ({ name, label, options, value }) => {
  const { handleChange } = useContext(FormContext)

  return (
    <>
      <div className='form-group row'>
        <label htmlFor={name} className='col-sm-2 col-form-label'>
          {label}
        </label>
        <div className={`col-sm-10`}>
          <select name={name} value={value} className='form-select' onChange={(e) => handleChange(name, e)}>
            <option>Choose...</option>
            {options.length > 0 &&
              options.map((option, i) => (
                <option key={i} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
        </div>
      </div>
    </>
  )
}

export default Select
