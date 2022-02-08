import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"
import { Link } from "react-router-dom"

function NavBar() {
  return (
    <>
      <Navbar bg='light' expand='lg'>
        <Container>
          <Navbar.Brand as={Link} to='/'>
            amactive CMS
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              <Nav.Link as={Link} to='/'>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to='/category/list'>
                Categories
              </Nav.Link>
              <Nav.Link as={Link} to='/subcategory/list'>
                Subcategories
              </Nav.Link>
              <Nav.Link as={Link} to='/item/list'>
                Items
              </Nav.Link>
              <NavDropdown title='ADD' id='basic-nav-dropdown'>
                <NavDropdown.Item as={Link} to='/category/add'>
                  Add Category
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/subcategory/add'>
                  Add Subcategory
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to='/item/add'>
                  Add Item
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to='/help'>
                  Help
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar
