import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

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
    products.forEach((e)=>{
      console.log(e)
    })
  }, [])

  return (
    <>
      <h1> Store </h1>
      {products.length &&
        <>
          <Row>
            {products.map((el:any) =>
              <Col key={el.title}>
                {el.title}
              </Col>
            )}
          </Row>
        </>
      }
    </>

  )
}
