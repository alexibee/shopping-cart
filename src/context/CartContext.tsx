import { createContext, ReactNode, useContext, useState } from "react";

type CartProviderProps = {
  children: ReactNode
}

type CartItem = {
  id: number
  quantity: number
}

type CartContext = {
  getItemQuantity: (id: number) => number
  increaseQuantity: (id:number) => void
  decreaseQuantity: (id:number) => void
  removeItem: (id:number) => void
}

const CartContext = createContext({} as CartContext)

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({children}:CartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  function getItemQuantity(id: number):number {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  function increaseQuantity(id:number):void {
    const item = cartItems.find(item => item.id === id)
    setCartItems(currentItems => {
      if(item==null){
        return [...currentItems, {id, quantity: 1}]
      }
      return currentItems.map(item => {
        if(item.id===id) {
          return {...item, quantity: item.quantity+1}
        }
        return item
      })
    })
  }

  function removeItem(id:number):void{
    setCartItems(currentItems => {
      return currentItems.filter(item => item.id !== id)
    })
  }

  function decreaseQuantity(id:number):void{
    const item = cartItems.find(item => item.id === id)
    if(item && item.quantity === 1){
      removeItem(id)
    } else {
      setCartItems(currentItems => {
        if(item){
          return currentItems.map(item => {
            if(item.id===id) {
              return {...item, quantity: item.quantity-1}
            }
            return item
            })
        }
        return currentItems
      })
    }
  }


  return (
    <CartContext.Provider value={{getItemQuantity,increaseQuantity,decreaseQuantity,removeItem}}>
      {children}
    </CartContext.Provider>
  )
}
