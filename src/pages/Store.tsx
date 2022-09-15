import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { StoreItem, StoreItemProps } from "../components/StoreItem";

export function Store() {

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

  return (
    <>
      <h1> Store </h1>
      {products.length &&
        <>
          <Row md={2} xs={1} lg={3} className='g-3'>
            {products.map((item:StoreItemProps) =>
              <Col key={item.id}>
                <StoreItem {...item}/>
              </Col>
            )}
          </Row>
        </>
      }
    </>

  )
}
