import { Button, Nav, Navbar as NavbarBs } from "react-bootstrap"
import { Container } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import {TiShoppingCart as ShopCart} from "react-icons/ti"
import { useCart } from "../context/CartContext"

export function Navbar(){
  const pages = [['Home','/'],['Store', '/store'], ['About','/about']]
  const {openCart, cartQuantity} = useCart()
  return (
    <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          {pages.map(page =>
            <Nav.Link to={page[1]} as={NavLink} key={page[0]}>{page[0]}</Nav.Link>
          )}
        </Nav>
        {cartQuantity > 0 && (
          <Button
            onClick={openCart}
            style={{width:"3rem", height:"3rem", position: "relative"}}
            variant="outline-primary"
            className="rounded-circle"
            >
            <ShopCart style={{fontSize:"22px"}}/>
            <div className='rounded-circle bg-danger d-flex justify-content-center align-items-center'
            style={{color:"white", width:"1.5rem", height:"1.5rem", position:"absolute", bottom:"0", right:"0", transform:"translate(25%, 25%)"}}>{cartQuantity}</div>
          </Button>
        )}
      </Container>

    </NavbarBs>
  )
}
