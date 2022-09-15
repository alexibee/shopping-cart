import { Offcanvas, Stack } from "react-bootstrap";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";

type ShoppingCartProps = {
  isCartOpen: boolean
}

export function ShoppingCart({isCartOpen}:ShoppingCartProps){
  const {closeCart, cartItems, products} = useCart()
  return <Offcanvas show={isCartOpen} onHide={closeCart} placement='end'>
    <Offcanvas.Header closeButton>
      <Offcanvas.Title>
        Cart
      </Offcanvas.Title>
    </Offcanvas.Header>
    <Offcanvas.Body>
      <Stack gap={3}>
        {cartItems.map(item => (
          <CartItem key={item.id} {...item}/>
          ))}
        <div className="ms-auto">
          Total {formatCurrency(cartItems.reduce((total,cartItem) => {
            const item = products.find(i => i.id === cartItem.id)
            return total + parseInt(item?.price || '0') * cartItem.quantity
          },0))}
        </div>
      </Stack>
    </Offcanvas.Body>
  </Offcanvas>
}
