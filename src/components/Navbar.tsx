import { Nav, Navbar as NavbarBs } from "react-bootstrap"
import { Container } from "react-bootstrap"
import { NavLink } from "react-router-dom"

export function Navbar(){
  const pages = [['Home','/'],['Store', '/store'], ['About','/about']]

  return (
    <NavbarBs className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          {pages.map(page =>
            <Nav.Link to={page[1]} as={NavLink}>{page[0]}</Nav.Link>
          )}

        </Nav>
        Hi
      </Container>

    </NavbarBs>
  )
}
