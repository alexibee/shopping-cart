import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { StoreItem, StoreItemProps } from "../components/StoreItem";
import { useCart } from "../context/CartContext";

export function Store() {

  const {products} = useCart()

  return (
    <>
      <h1> Store </h1>
      {products?.length && (
        <>
          <Row md={2} xs={1} lg={3} className='g-3'>
            {products.map((item:StoreItemProps) =>
              <Col key={item.id}>
                <StoreItem {...item}/>
              </Col>
            )}
          </Row>
        </>
        )
      }
    </>

  )
}
