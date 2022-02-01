import { ACTIONS } from "./CrudReducer"

export const getCategories = () => {
  console.log("[ACTIONS]-getCategories()")

  const categories = [
    { id: 1, name: "Cars" },
    { id: 2, name: "Motorbikes" },
  ]

  return categories
}

export const getSubcategories = () => {
  console.log("[ACTIONS]-getSubcategories()")

  const subcategories = [
    { id: 1, name: "Vauxhall", categoryId: 1 },
    { id: 2, name: "Toyota", categoryId: 1 },
    { id: 3, name: "Peugeot", categoryId: 1 },
    { id: 4, name: "Nissan", categoryId: 1 },
    { id: 5, name: "Porsche", categoryId: 1 },
    { id: 6, name: "Honda", categoryId: 1 },
  ]

  return subcategories
}

export const getItems = () => {
  console.log("[ACTIONS]-getItems()")

  const items = [
    { id: 1, name: "Vauxhall Corsa 1.4", categoryId: 1, subcategoryId: 1 },
    { id: 2, name: "Toyota MR2 MK1", categoryId: 1, subcategoryId: 2 },
    { id: 3, name: "Peugeot 205GTi", categoryId: 1, subcategoryId: 3 },
    { id: 4, name: "Vauxhall Corsa 1.4LS", categoryId: 1, subcategoryId: 1 },
  ]

  return items
}
