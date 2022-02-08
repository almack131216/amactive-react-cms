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

const buildQuery = ({
  api,
  status,
  id,
  type,
  categoryId,
  subcategoryId,
  limit,
}) => {
  //[ITEMLIST] api-base.php?api=items&spec=Live&limit=10
  //[ITEM] api-base.php?api=items&spec=Live&id=38211

  const base = "http://localhost:8080/amactive-react-cms-api/api-base.php"

  let q = `${base}?api=${api}`
  if (type) q = `${q}&type=${type}`
  if (id) q = `${q}&id=${id}`
  if (categoryId) q = `${q}&categoryId=${categoryId}`
  if (subcategoryId) q = `${q}&subcategoryId=${subcategoryId}`
  if (typeof status !== "undefined") q = `${q}&status=${status}`
  if (limit) q = `${q}&limit=${limit}`

  return q
}

export { buildQuery, BREADCRUMBS }
