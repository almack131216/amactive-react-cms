import { useContext } from "react"
import CrudContext from "../context/CrudContext"

const BREADCRUMBS = {
  CATEGORY_LIST: {
    type: "category-list",
    name: "Categories",
    slug: `/category/list`,
  },
  SUBCATEGORY_LIST: {
    type: "category-list",
    name: "Categories",
    slug: `/category/list`,
  },
  ITEM_LIST: {
    type: "item-list",
    name: "Items",
    slug: `/item/list`,
  },
}

function useCrumb({ page, categoryId, subcategoryId }) {
  const { activeCategory, activeSubcategory } = useContext(CrudContext)
  let breadcrumbArr = [BREADCRUMBS.CATEGORY_LIST]

  let activeCategoryCrumb = null
  let activeSubcategoryCrumb = null

  if (categoryId && activeCategory.id)
    activeCategoryCrumb = {
      page: "category-active",
      id: activeCategory.id,
      name: `${activeCategory.name}${page === 'category-edit' ? ' [edit]' : ''}`,
      slug: `/c${activeCategory.id}/subcategory/list`,
    }
  if (subcategoryId && activeSubcategory.id)
    activeSubcategoryCrumb = {
      page: "subcategory-active",
      id: activeSubcategory.id,
      name: `${activeSubcategory.name}${page === 'subcategory-edit' ? ' [edit]' : ''}`,
      slug: `/c${activeCategory.id}/subcategory/list`,
    }

  activeCategoryCrumb && breadcrumbArr.push(activeCategoryCrumb)
  activeSubcategoryCrumb && breadcrumbArr.push(activeSubcategoryCrumb)

  console.log("CRUMB cat:", categoryId, activeCategory)
  console.log("CRUMB subcat:", subcategoryId, activeSubcategory)
  console.log("CRUMB ARR:", breadcrumbArr)
  return { breadcrumbArr }
}

export { useCrumb }
