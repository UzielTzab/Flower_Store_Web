import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { ProductInterface } from "@/models/product_interface";
import Link from "next/link";
import Image from "next/image";

export function ProductViewComponent({
  id,
  name,
  price,
  image,
  discount,
  description,
  stock,
  status,
}: ProductInterface) {
  const [quantity, setQuantity] = useState(1);
  const [showBanner, setShowBanner] = useState(false);
  const [cartQuantity, setCartQuantity] = useState(0);
  const router = useRouter();

  // Sincronizar cantidad en carrito al montar y cuando cambie el id
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      const cartItem = cart.find(
        (item: ProductInterface) => Number(item.id) === Number(id)
      );
      setCartQuantity(cartItem ? cartItem.quantity : 0);
    }
  }, [id, showBanner]);

  const isOutOfStock = !stock || stock <= 0 || status === "inactive";
  const maxSelectable = stock - cartQuantity;
  const reachedStockLimit = maxSelectable <= 0;

  const handleAddToCart = () => {
    console.log("Intentando añadir al carrito:", { id, name, quantity });
    if (id === null || id === undefined || Number(id) <= 0) {
      console.log("ID inválido:", id);
      setShowBanner(true);
      setTimeout(() => setShowBanner(false), 1500);
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    console.log("Carrito antes:", cart);
    const existingProductIndex = cart.findIndex(
      (item: ProductInterface) => Number(item.id) === Number(id)
    );
    if (existingProductIndex !== -1) {
      console.log("Producto ya en carrito:", cart[existingProductIndex]);
      // No permitir añadir más de lo disponible en stock
      if (cart[existingProductIndex].quantity + quantity > stock) {
        console.log(
          "Intento de exceder stock:",
          cart[existingProductIndex].quantity,
          "+",
          quantity,
          ">",
          stock
        );
        setShowBanner(true);
        setTimeout(() => setShowBanner(false), 1500);
        return;
      }
      cart[existingProductIndex].quantity += quantity;
      console.log("Cantidad actualizada:", cart[existingProductIndex]);
    } else {
      const newProduct = {
        id: Number(id),
        name,
        price,
        image,
        discount,
        quantity,
        description,
        stock,
        status,
      };
      cart.push(newProduct);
      console.log("Producto añadido nuevo:", newProduct);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    console.log(
      "Carrito después:",
      JSON.parse(localStorage.getItem("cart") || "[]")
    );
    setShowBanner(true);
    window.dispatchEvent(new Event("cartUpdated"));
    setTimeout(() => {
      setShowBanner(false);
      console.log("Navegando a /cart-page");
      router.push("/cart-page");
    }, 1000);
  };

  useEffect(() => {
    // Si la cantidad seleccionada supera el máximo, ajustarla automáticamente
    if (quantity > maxSelectable && !reachedStockLimit) {
      setQuantity(maxSelectable);
    }
    if (reachedStockLimit) {
      setQuantity(1);
    }
  }, [maxSelectable, reachedStockLimit]);

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 my-5">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">Principal</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Productos
            </li>
          </ol>
        </nav>
        <Modal show={showBanner} onHide={() => setShowBanner(false)} centered>
          <Modal.Body className="text-center">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-success fs-1"
            />
            <p className="mt-2">
              {isOutOfStock
                ? "No hay stock disponible"
                : reachedStockLimit
                ? "Has seleccionado el máximo de stock disponible"
                : "Producto añadido al carrito"}
            </p>
          </Modal.Body>
        </Modal>
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <Image
              className="card-img-top mb-5 mb-md-0"
              src={image}
              alt={"..."}
              width={500}
              height={600}
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="col-md-6">
            <h1 className="display-5 fw-bolder">{name}</h1>
            <div className="mb-3 d-flex gap-2 align-items-center">
              <span className="badge bg-secondary">Stock: {stock}</span>
              <span
                className={`badge ${
                  status === "inactive" ? "bg-danger" : "bg-success"
                }`}
              >
                {status}
              </span>
            </div>
            <div className="fs-5 mb-5">
              <span className="text-decoration-line-through">${price}</span>
              <span>${price - (discount || 0)}</span>
            </div>
            <p className="lead">{description}</p>
            {/* Mostrar el control de cantidad si hay stock y no se alcanzó el máximo */}
            {!isOutOfStock && !reachedStockLimit && (
              <div className="d-flex align-items-center">
                <input
                  className="form-control text-center me-3"
                  id="inputQuantity"
                  type="number"
                  value={quantity}
                  min={1}
                  max={maxSelectable}
                  onChange={(e) => {
                    let value = Number(e.target.value);
                    if (value < 1) value = 1;
                    if (value > maxSelectable) value = maxSelectable;
                    setQuantity(value);
                  }}
                  style={{ maxWidth: "4.5rem" }}
                />
                <button
                  onClick={handleAddToCart}
                  className="btn btn-outline-dark mt-auto"
                  disabled={quantity > maxSelectable || maxSelectable <= 0}
                >
                  Añadir al carrito
                </button>
              </div>
            )}
            {/* Si no hay stock o ya se alcanzó el límite, mostrar mensaje */}
            {isOutOfStock && (
              <div className="alert alert-danger mt-3">
                No hay stock disponible
              </div>
            )}
            {!isOutOfStock && reachedStockLimit && (
              <div className="alert alert-warning mt-3">
                Has seleccionado el máximo de stock disponible
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
