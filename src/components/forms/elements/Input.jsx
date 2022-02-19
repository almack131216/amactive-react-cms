import { useContext } from "react"
import { FormContext } from "../../../context/FormContext"

const Input = ({ name, label, tip, placeholder, value, error }) => {
  const { handleChange, handleSlug, errors } = useContext(FormContext)

  return (
    <div className='form-group row'>
      <label htmlFor={name} className='col-sm-2 col-form-label'>
        {label}
      </label>
      <div className={`col-sm-10`}>
        <div className={`${name === "slug" ? "input-group" : null}`}>
          <input
            type='text'
            className='form-control'
            name={name}
            placeholder={placeholder ? placeholder : ""}
            value={value}
            onChange={(e) => handleChange(name, e)}
            autoComplete={"off"}
            minLength={2}
            maxLength={100}
          />

          {name === "slug" && (
            <div className='input-group-append'>
              <button
                type='button'
                onClick={() => handleSlug("name")}
                className='btn btn-outline-secondary'
              >
                Generate Slug From Name
              </button>
            </div>
          )}
        </div>

        {tip && <div className='form-text'>{tip}</div>}
        {error && <p>Error: {error}</p>}
        {/* {errors && <p>Errors</p>} */}
      </div>
    </div>
  )
}

export default Input
