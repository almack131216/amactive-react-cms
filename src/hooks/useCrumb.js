import { useContext } from "react"
import CrudContext from "../context/CrudContext"

const BREADCRUMBS = {
  CATEGORY_LIST: {
    type: "category-list",
    name: "Categories",
    slug: `/category/list`,
  },
  CATEGORY_ADD: {
    type: "category-add",
    name: "Add",
    slug: `/category/add`,
  },
  SUBCATEGORY_LIST: {
    type: "subcategory-list",
    name: "Subcategories",
    slug: `/subcategory/list`,
  },
  SUBCATEGORY_ADD: {
    type: "subcategory-add",
    name: "Add",
    slug: `/subcategory/add`,
  },
  ITEM_LIST: {
    type: "item-list",
    name: "Items",
    slug: `/item/list`,
  },
  ITEM_ADD: {
    type: "item-add",
    name: "Add",
    slug: `/item/add`,
  },
}

function useCrumb({ page, categoryId, subcategoryId }) {
  const { showCLG, activeCategory, activeSubcategory } = useContext(CrudContext)
  let breadcrumbArr = [BREADCRUMBS.CATEGORY_LIST]

  switch (page) {
    case "category-add":
      !categoryId && breadcrumbArr.push(BREADCRUMBS.CATEGORY_ADD)
      break

    case "subcategory-list":
      !categoryId && breadcrumbArr.push(BREADCRUMBS.SUBCATEGORY_LIST)
      break

    case "subcategory-add":
      if(!categoryId){
        breadcrumbArr.push(BREADCRUMBS.SUBCATEGORY_LIST,BREADCRUMBS.SUBCATEGORY_ADD)
      }
      break

    case "item-list":
      if (!subcategoryId) {
        breadcrumbArr.push(BREADCRUMBS.SUBCATEGORY_LIST, BREADCRUMBS.ITEM_LIST)
      }
      break

    case "item-add":
      if (!categoryId && !subcategoryId) {
        breadcrumbArr.push(
          BREADCRUMBS.SUBCATEGORY_LIST,
          BREADCRUMBS.ITEM_LIST,
          BREADCRUMBS.ITEM_ADD
        )
      }
      break

    default:
  }
  let activeCategoryCrumb = null
  let activeSubcategoryCrumb = null

  if (activeCategory.id)
    activeCategoryCrumb = {
      page: "category-active",
      id: activeCategory.id,
      name: `${activeCategory.name}${
        page === "category-edit" ? " [edit]" : ""
      }`,
      slug: `/c${activeCategory.id}/subcategory/list`,
    }
  if (activeSubcategory.id)
    activeSubcategoryCrumb = {
      page: "subcategory-active",
      id: activeSubcategory.id,
      name: `${activeSubcategory.name}${
        page === "subcategory-edit" ? " [edit]" : ""
      }`,
      slug: `/c${activeCategory.id}/subcategory/list`,
    }

  activeCategoryCrumb && breadcrumbArr.push(activeCategoryCrumb)
  activeSubcategoryCrumb && breadcrumbArr.push(activeSubcategoryCrumb)

  // showCLG && console.log("CRUMB cat:", categoryId, activeCategory)
  // showCLG && console.log("CRUMB subcat:", subcategoryId, activeSubcategory)
  showCLG && console.log("[useCrumb] > CRUMB ARR:", breadcrumbArr)
  return { breadcrumbArr }
}

export { useCrumb }
