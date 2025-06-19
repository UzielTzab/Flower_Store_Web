"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { HeaderComponent } from "@/components/header_component";
import { FooterComponent } from "@/components/footer_component";

import Link from "next/link";
import Image from "next/image";
interface CartItem {
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export default function PayPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <PayPageContent />
    </Suspense>
  );
}

function PayPageContent() {
  const searchParams = useSearchParams();
  const totalQuantity = Number(searchParams.get("totalQuantity")) || 0;
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    // Leer los productos comprados desde localStorage
    const bought = JSON.parse(localStorage.getItem("boughtItems") || "[]");
    setCartItems(bought);
  }, []);

  const HandleToHome = () => {
    localStorage.removeItem("cart");
    localStorage.removeItem("boughtItems");
    window.location.href = "/";
  };

  return (
    <>
      <HeaderComponent />
      <div className="container mt-5">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">Principal</Link>
            </li>
            <li className="breadcrumb-item">
              <a href="/cart-page">Carrito</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Pago
            </li>
          </ol>
        </nav>
        <div className="card">
          <div className="card-header bg-dark  text-white">
            <h4>Detalles de la compra</h4>
          </div>
          <div className="card-body">
            <h5 className="card-title">¡Gracias por su compra!</h5>
            <p className="card-text">Detalles de la compra:</p>
            <ul className="list-group mb-3">
              {cartItems.map((item, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between lh-condensed align-items-center"
                >
                  <div className="d-flex justify-content-center">
                    <div>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={100}
                        height={100}
                        style={{ objectFit: "cover", borderRadius: "0.5rem" }}
                      />
                    </div>
                    <div className="d-flex flex-column justify-content-center px-4">
                      <h6 className="my-0">{item.name}</h6>
                      <small className="text-muted">
                        Cantidad: {item.quantity}
                      </small>
                    </div>
                  </div>
                  <span className="text-muted">${item.price}</span>
                </li>
              ))}
              <li className="list-group-item d-flex justify-content-end">
                <span className="pe-4">Total:</span>
                <span className="fw-bolder">${totalQuantity.toFixed(2)}</span>
                <span className="ps-1">(MXN)</span>
              </li>
            </ul>
            <div className="d-flex justify-content-end">
              <button className="btn btn-dark" onClick={HandleToHome}>
                Ir a la pantalla principal
              </button>
            </div>
          </div>
        </div>
      </div>
      <FooterComponent />
    </>
  );
}
