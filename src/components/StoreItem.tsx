import { useState } from "react"
import { Button, Card } from "react-bootstrap"
import { useCart } from "../context/CartContext"
import { formatCurrency } from "../utilities/formatCurrency"

export type StoreItemProps = {
  id: number,
  title: string,
  price: string,
  category: string,
  description: string,
  image: string,
}


export function StoreItem({id,title,price,category,description,image}:StoreItemProps){

  const {getItemQuantity,increaseQuantity,decreaseQuantity,removeItem} = useCart()
  const quantity = getItemQuantity(id)

  return(
    <Card style={{height:'400px'}}>
      <Card.Img variant='top' src={image} height='200px' style={{ objectFit:'cover'}}/>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4" style={{height:'70px'}}>
          <span className="fs-6">{title}</span>
          <span className="ms-2 text-muted">{formatCurrency(parseInt(price))}</span>
        </Card.Title>
        <div className="mt-auto">
          {quantity === 0 ? (
            <Button className='w-100' onClick={()=>increaseQuantity(id)}> + Add To Cart</Button>) :
            <div className="d-flex align-items-center flex-column" style={{gap:'.5rem'}}>
              <div className="d-flex align-items-center justify-content-center" style={{gap:'.5rem'}}>
                <Button onClick={()=>decreaseQuantity(id)}>-</Button>
                <div>
                  <span className="fs-6">{quantity}</span> in cart
                </div>
                <Button onClick={()=>increaseQuantity(id)}>+</Button>
              </div>
              <Button onClick={()=>removeItem(id)} variant="danger" size="sm">Remove</Button>
            </div>
          }
        </div>
      </Card.Body>
    </Card>
  )
}
