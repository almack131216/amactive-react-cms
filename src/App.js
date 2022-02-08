import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { CrudProvider } from "./context/CrudContext"
import NavBar from "./components/NavBar"
import Breadcrumbs from "./components/Breadcrumb"
// import Footer from "./components/Footer"
import Home from "./pages/Home"
import Category from "./pages/Category"
import CategoryAdd from "./pages/CategoryAdd"
import CategoryEdit from "./pages/CategoryEdit"
import CategoryList from "./pages/CategoryList"
import Subcategory from "./pages/Subcategory"
import SubcategoryAdd from "./pages/SubcategoryAdd"
import SubcategoryEdit from "./pages/SubcategoryEdit"
import SubcategoryList from "./pages/SubcategoryList"
import Item from "./pages/Item"
import ItemAdd from "./pages/ItemAdd"
import ItemEdit from "./pages/ItemEdit"
import ItemList from "./pages/ItemList"
import Help from "./pages/Help"

function App() {
  return (
    <>
      <CrudProvider>
        <Router>
          <NavBar />
          <Container>
            <Breadcrumbs />
            <Routes>
              <Route exact path='/' element={<Home />} />
              {/* list (root) / list (c) / list (sc) / add / show / edit  */}
              {/* Category */}
              <Route path='/category/list' element={<CategoryList />} />
              <Route path='/category/:categoryId' element={<Category />} />
              <Route
                path='/category/edit/:categoryId'
                element={<CategoryEdit />}
              />
              <Route path='/category/add' element={<CategoryAdd />} />
              {/* Subcategory */}
              <Route path='/subcategory/list' element={<SubcategoryList />} />
              <Route
                path='/c:categoryId/subcategory/list'
                element={<SubcategoryList />}
              />
              <Route
                path='/c:categoryId/subcategory/add'
                element={<SubcategoryAdd />}
              />
              <Route
                path='/c:categoryId/subcategory/edit/:subcategoryId'
                element={<SubcategoryEdit />}
              />
              <Route
                path='/subcategory/show/:subcategoryId'
                element={<Subcategory />}
              />
              {/* Item */}
              <Route path='/item/list' element={<ItemList />} />
              <Route path='/c:categoryId/item/list' element={<ItemList />} />
              <Route
                path='/c:categoryId/sc:subcategoryId/item/list'
                element={<ItemList />}
              />
              <Route path='/item/add' element={<ItemAdd />} />
              <Route path='/item/show/:itemId' element={<Item />} />
              <Route path='/item/edit/:itemId' element={<ItemEdit />} />
              {/* Help */}
              <Route path='/help' element={<Help />} />
            </Routes>
          </Container>
        </Router>
        {/* <Footer /> */}
      </CrudProvider>
    </>
  )
}

export default App
