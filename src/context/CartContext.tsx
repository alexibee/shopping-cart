import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { StoreItemProps } from "../components/StoreItem";
import { useLocalStorage } from "../hooks/useLocalStorage";

type CartProviderProps = {
  children: ReactNode
}

type CartItem = {
  id: number
  quantity: number
}

type CartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  increaseQuantity: (id:number) => void
  decreaseQuantity: (id:number) => void
  removeItem: (id:number) => void
  cartQuantity: number
  cartItems: CartItem[]
  products: StoreItemProps[]
}

const CartContext = createContext({} as CartContext)

export function useCart() {
  return useContext(CartContext)
}

export function CartProvider({children}:CartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('cart',[])
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)

  const [products, setProducts] = useState([]);

  async function getProds() {
    await fetch('https://fakestoreapi.com/products')
    .then(res=>res.json())
    .then(json=> {
      setProducts(json)
    })
  }

  useEffect(() => {
    getProds()
  }, [])

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  )

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

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)


  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        cartItems,
        cartQuantity,
        openCart,
        closeCart,
        products
      }}
    >
      {children}
      <ShoppingCart isCartOpen={isCartOpen}/>
    </CartContext.Provider>
  )
}
