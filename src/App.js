import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { CrudProvider } from "./context/CrudContext"
import NavBar from "./components/NavBar"
// import Footer from "./components/Footer"
import Home from "./pages/Home"
import Category from "./pages/Category"
import CategoryAdd from "./pages/CategoryAdd"
import CategoryList from "./pages/CategoryList"
import Subcategory from "./pages/Subcategory"
import SubcategoryAdd from "./pages/SubcategoryAdd"
import SubcategoryList from "./pages/SubcategoryList"
import Item from "./pages/Item"
import ItemAdd from "./pages/ItemAdd"
import ItemList from "./pages/ItemList"
import Help from "./pages/Help"

function App() {
  return (
    <>
      <CrudProvider>
        <Router>
        <NavBar />
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/category/:categoryId' element={<Category />} />
            <Route path='/category/add' element={<CategoryAdd />} />
            <Route path='/categories' element={<CategoryList />} />
            <Route path='/subcategory/:subcategoryId' element={<Subcategory />} />
            <Route path='/subcategory/add' element={<SubcategoryAdd />} />
            <Route path='/subcategories' element={<SubcategoryList />} />
            <Route path='/item/:itemId' element={<Item />} />
            <Route path='/item/add' element={<ItemAdd />} />
            <Route path='/items' element={<ItemList />} />
            <Route path='/help' element={<Help />} />
          </Routes>
        </Router>
        {/* <Footer /> */}
      </CrudProvider>
    </>
  )
}

export default App
