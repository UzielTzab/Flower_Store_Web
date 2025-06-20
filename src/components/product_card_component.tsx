import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { ProductInterface } from "@/models/product_interface";
import Image from "next/image";

export function ProductCard({
  id,
  name,
  price,
  image,
  discount,
  description,
  stock,
  status,
}: ProductInterface) {
  const router = useRouter();
  const [quantity] = useState(1);
  const [showBanner, setShowBanner] = useState(false);
  const [isButtonHandler, setIsButtonHandler] = useState(false);
  const [isSpinner, setIsSpinner] = useState(false);

  const handleClick = () => {
    router.push(
      `/product-presentation?id=${id}&name=${encodeURIComponent(
        name
      )}&price=${price}&discount=${discount}&image=${encodeURIComponent(
        image
      )}&description=${encodeURIComponent(
        description
      )}&stock=${stock}&status=${encodeURIComponent(status)}`
    );
  };

  const HandleToCart = () => {
    setIsButtonHandler(!isButtonHandler);
    const product = {
      id,
      name,
      price,
      image,
      discount,
      quantity,
      description,
      stock,
      status,
    };
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existingProductIndex = cart.findIndex(
      (item: ProductInterface) => item.id === id
    );
    let currentQuantity = 0;
    if (existingProductIndex !== -1) {
      currentQuantity = cart[existingProductIndex].quantity;
      // No permitir añadir más de lo disponible en stock
      if (currentQuantity + quantity > stock) {
        setShowBanner(true);
        setTimeout(() => setShowBanner(false), 1500);
        setIsButtonHandler(false);
        setIsSpinner(false);
        return;
      }
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push(product);
      currentQuantity = quantity;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    setShowBanner(true);
    setIsSpinner(true);
    window.dispatchEvent(new Event("cartUpdated"));
    setTimeout(() => {
      setShowBanner(false);
      setIsButtonHandler(false);
      setIsSpinner(false);
    }, 1000);
  };

  // Determinar si hay stock disponible o si ya se alcanzó el límite
  const isOutOfStock = !stock || stock <= 0 || status === "inactive";
  let cart = [];
  if (typeof window !== "undefined") {
    cart = JSON.parse(localStorage.getItem("cart") || "[]");
  }
  const cartItem = cart.find((item: ProductInterface) => item.id === id);
  const reachedStockLimit = cartItem && cartItem.quantity >= stock;

  return (
    <section className="col mb-5">
      <div className="card h-100">
        <Modal show={showBanner} onHide={() => setShowBanner(false)} centered>
          <Modal.Body className="text-center">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-success fs-1"
            />
            <p className="mt-2">Producto añadido al carrito</p>
          </Modal.Body>
        </Modal>
        <button
          onClick={HandleToCart}
          className="btn rounded-circle position-absolute top-25 start-25 m-3 "
          style={{ zIndex: 1, color: "black", backgroundColor: "pink" }}
          disabled={isOutOfStock || reachedStockLimit}
          hidden={isOutOfStock || reachedStockLimit}
        >
          {isButtonHandler ? (
            isSpinner ? (
              <Spinner
                style={{ width: "1rem", height: "1rem" }}
                animation="border"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <FontAwesomeIcon icon={faShoppingCart} size="1x" />
            )
          ) : (
            <FontAwesomeIcon icon={faShoppingCart} className="shoppingCart" />
          )}
        </button>
        <Image
          className="card-img-top"
          src={image}
          alt={name}
          width={300}
          height={300}
          style={{
            objectFit: "cover",
            width: "100%",
            height: "300px",
            borderTopLeftRadius: "0.5rem",
            borderTopRightRadius: "0.5rem",
          }}
        />
        <div className="card-body p-4">
          <div className="text-center">
            <h5 className="fw-bolder">{name}</h5>
            <div className="mb-2">
              ${price} - ${discount}
            </div>
            <div className="d-flex justify-content-center gap-2 mb-1">
              <span className="badge bg-secondary">Stock: {stock}</span>
              <span
                className={`badge ${
                  status === "inactive" ? "bg-danger" : "bg-success"
                }`}
              >
                {status}
              </span>
            </div>
          </div>
        </div>
        <div className="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
          <button
            onClick={handleClick}
            className="btn btn-dark mt-auto rounded-3"
          >
            Ver Producto
          </button>
        </div>
      </div>
    </section>
  );
}
