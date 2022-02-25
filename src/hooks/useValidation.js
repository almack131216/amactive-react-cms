export const useValidation = () => {
  // console.log("[useValidation] > useValidation...")

  const returnValidationError = (name, value) => {
    // console.log("[useValidation] > returnValidationError(): ", name, value)
    // validate each input value
    switch (name) {
      case "name":
        if (value.replace(/\s/g, "").length < 4) {
          // set error
          return "Name must be at least 4 characters"
        }
        break

      case "slug":
        if (value.replace(/\s/g, "").length < 4) {
          return "Slug must be at least 4 characters"
        }
        break

      case "categoryId":
        if (value === 0) {
          return "Category not set"
        }
        break

      case "email":
        if (
          !new RegExp(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ).test(value)
        ) {
          return "Enter a valid email address"
        }
        break

      case "password":
        if (
          !new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/).test(value)
        ) {
          return "Password should contains atleast 8 charaters and containing uppercase,lowercase and numbers"
        }
        break

      default:
        return null
    }
  }

  return {
    returnValidationError,
  }
}

export default useValidation
