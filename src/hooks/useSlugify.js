export const useSlugify = () => {
  // console.log("[useSlugify] > useSlugify()")

  const slugMe = (string) => {    
    const slug = string
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-")
      .replace(/^-+/, "")
      .replace(/-+$/, "")

      // console.log("[useSlugify] > slugMe: ", string, slug)
      return slug
  }

  return {
    slugMe,
  }
}

export default useSlugify
