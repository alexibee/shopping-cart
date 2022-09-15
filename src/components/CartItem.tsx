import { Button, Stack } from "react-bootstrap"
import { useCart } from "../context/CartContext"
import { formatCurrency } from "../utilities/formatCurrency"

type CartItemProps = {
  id: number
  quantity: number
}

export function CartItem({id,quantity}: CartItemProps){
  const {removeItem, products} = useCart()
  const item = products.find(i => i.id === id)
  if (item==null) return null
  return (
    <Stack direction='horizontal' gap={2} className='d-flex align-items-center'>
      <img src={item.image} style={{width:'100px', height:'75px', objectFit:'cover'}}/>
      <div className="me-auto">
        <div style={{fontSize:'.8rem'}}>
          {item.title} {quantity > 1 && <span className="text-muted" style={{fontSize:'.55rem'}}>x{quantity}</span>}
        </div>
        <div className="text-muted" style={{fontSize:'.65rem'}}>{formatCurrency(parseInt(item.price))}</div>
      </div>
      <div className="text-muted" style={{fontSize:'.65rem'}}>{formatCurrency(parseInt(item.price) * quantity)}</div>
      <Button variant='outline-danger' size='sm' onClick={()=>removeItem(item.id)}>&times;</Button>
    </Stack>
  )
}
