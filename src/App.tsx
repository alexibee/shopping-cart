import {Routes, Route } from "react-router-dom"
import {Container, Nav} from "react-bootstrap"
import { Home } from "./pages/Home"
import { Store } from "./pages/Store"
import { About } from "./pages/About"
import { Navbar } from "./components/Navbar"
import { CartProvider } from "./context/CartContext"
import { useEffect, useState } from "react"

function App() {
  return (
    <CartProvider>
      <Navbar/>
      <Container className='mb-4'>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/store" element={<Store/>}/>
          <Route path="/about" element={<About/>}/>
        </Routes>
      </Container>
    </CartProvider>
  )
}

export default App
