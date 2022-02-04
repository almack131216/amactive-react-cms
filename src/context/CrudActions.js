export const buildQuery = ({
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

  const base = "http://localhost:8080/amactive-react-cms/api-base.php"

  let q = `${base}?api=${api}`
  if (type) q = `${q}&type=${type}`
  if (id) q = `${q}&id=${id}`
  if (categoryId) q = `${q}&categoryId=${categoryId}`
  if (subcategoryId) q = `${q}&subcategoryId=${subcategoryId}`
  if (typeof status !== 'undefined') q = `${q}&status=${status}`
  if (limit) q = `${q}&limit=${limit}`

  return q
}
