"use client";
import { useEffect, useState } from "react";
import { FooterComponent } from "@/components/footer_component";
import { HeaderComponent } from "@/components/header_component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faCheckCircle,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCcMastercard,
  faCcVisa,
  faCcAmex,
  faCcPaypal,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CartItem {
  name: string;
  price: number;
  discount: number;
  image: string;
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  // const [boughtItems, setBoughtItems] = useState<CartItem[]>([]);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [totalDiscount, setTotalDiscount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false);
  const [textTitleForModal, setTextTitleForModal] = useState<string>(
    "Procesando la transacción"
  );
  const [textForModal, setTextForModal] = useState<string>(
    "¡Serás redirigido en breve al detalle de pago!"
  );
  const [formData, setFormData] = useState({
    fullName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const router = useRouter();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCartItems(cart);
    calculateTotalQuantity(cart);
    calculateTotalDiscount(cart);
  }, []);

  const calculateTotalQuantity = (cart: CartItem[]) => {
    const total = cart.reduce(
      (acc, item) => acc + (item.price - item.discount) * item.quantity,
      0
    );
    setTotalQuantity(total);
  };

  const calculateTotalDiscount = (cart: CartItem[]) => {
    const discount = cart.reduce(
      (acc, item) => acc + item.discount * item.quantity,
      0
    );
    setTotalDiscount(discount);
  };

  const handleRemoveFromCart = (name: string) => {
    const updatedCart = cartItems.filter((item) => item.name !== name);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotalQuantity(updatedCart);
    calculateTotalDiscount(updatedCart);
    setShowModal(true);
    // Despacha el evento personalizado
    window.dispatchEvent(new Event("cartUpdated"));

    setTextTitleForModal("Producto eliminado");
    setTextForModal("El producto ha sido eliminado del carrito");
    setTimeout(() => {
      setShowModal(false);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    let formattedValue = value;

    switch (id) {
      case "fullName":
        formattedValue = value.replace(/[^a-zA-Z\s]/g, ""); // Solo letras y espacios
        break;
      case "cardNumber":
        formattedValue = value.replace(/[^0-9]/g, ""); // Solo números
        break;
      case "expiryDate":
        formattedValue = value
          .replace(/[^0-9]/g, "") // Solo números
          .slice(0, 6); // Limita el input a MMYYYY

        // Formatear mientras escribe
        if (formattedValue.length >= 3) {
          formattedValue = `${formattedValue.slice(
            0,
            2
          )}/${formattedValue.slice(2)}`;
        }
        break;
      case "cvv":
        formattedValue = value.replace(/[^0-9]/g, ""); // Solo números
        break;
      default:
        break;
    }

    setFormData({ ...formData, [id]: formattedValue });

    // Validaciones
    switch (id) {
      case "fullName":
        setErrors({
          ...errors,
          fullName: /^[a-zA-Z\s]+$/.test(formattedValue)
            ? ""
            : "El nombre solo debe contener letras y espacios.",
        });
        break;
      case "cardNumber":
        setErrors({
          ...errors,
          cardNumber: /^\d{16}$/.test(formattedValue)
            ? ""
            : "El número de tarjeta debe tener 16 dígitos.",
        });
        break;
      case "expiryDate":
        setErrors({
          ...errors,
          expiryDate: /^(0[1-9]|1[0-2])\/\d{4}$/.test(formattedValue)
            ? ""
            : "La fecha debe estar en formato MM/AAAA.",
        });
        break;
      case "cvv":
        setErrors({
          ...errors,
          cvv: /^\d{3,4}$/.test(formattedValue)
            ? ""
            : "El CVV debe tener 3 o 4 dígitos.",
        });
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!Object.values(errors).some((error) => error !== "")) {
      console.log("Formulario enviado:", formData);
    } else {
      alert("Corrige los errores antes de enviar el formulario.");
    }
  };

  const handleCheckout = () => {
    // Validar antes de continuar
    let hasError = false;
    const newErrors = { ...errors };
    // Mensajes originales
    const originalMessages = {
      fullName: "El nombre solo debe contener letras y espacios.",
      cardNumber: "El número de tarjeta debe tener 16 dígitos.",
      expiryDate: "La fecha debe estar en formato MM/AAAA.",
      cvv: "El CVV debe tener 3 o 4 dígitos.",
    };
    if (!formData.fullName) {
      newErrors.fullName = "El nombre es obligatorio.";
      hasError = true;
    } else if (
      errors.fullName &&
      errors.fullName !== originalMessages.fullName
    ) {
      newErrors.fullName = originalMessages.fullName;
    }
    if (!formData.cardNumber) {
      newErrors.cardNumber = "El número de tarjeta es obligatorio.";
      hasError = true;
    } else if (
      errors.cardNumber &&
      errors.cardNumber !== originalMessages.cardNumber
    ) {
      newErrors.cardNumber = originalMessages.cardNumber;
    }
    if (!formData.expiryDate) {
      newErrors.expiryDate = "La fecha de expiración es obligatoria.";
      hasError = true;
    } else if (
      errors.expiryDate &&
      errors.expiryDate !== originalMessages.expiryDate
    ) {
      newErrors.expiryDate = originalMessages.expiryDate;
    }
    if (!formData.cvv) {
      newErrors.cvv = "El CVV es obligatorio.";
      hasError = true;
    } else if (errors.cvv && errors.cvv !== originalMessages.cvv) {
      newErrors.cvv = originalMessages.cvv;
    }
    setErrors(newErrors);
    if (
      hasError ||
      Object.values(newErrors).some(
        (error) =>
          error !== "" && !Object.values(originalMessages).includes(error)
      )
    ) {
      return;
    }
    if (cartItems.length === 0) {
      setShowErrorModal(true);
      return;
    }
    setShowModal(true);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setTotalQuantity(0);
      setTotalDiscount(0);
      localStorage.setItem("boughtItems", JSON.stringify(cartItems));
      localStorage.removeItem("cart");
      setTimeout(() => {
        // Navegación a la página de pago usando Next.js y query params
        router.push(`/pay-page?totalQuantity=${totalQuantity}`);
      }, 3000);
    }, 3000);
  };

  return (
    <>
      <HeaderComponent />
      {showModal && (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header bg-dark text-white">
                <h5 className="modal-title">{textTitleForModal}</h5>
              </div>
              <div className="modal-body">
                {isLoading ? (
                  <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <p>
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="text-success me-2"
                    />
                    {textForModal}
                  </p>
                )}
              </div>
              {!isLoading && (
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {showErrorModal && (
        <div className="modal show d-block" tabIndex={-1} role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="text-danger me-2"
                  />
                  Información
                </h5>
              </div>
              <div className="modal-body">
                <p>
                  Tu carrito está vacío, por favor añade productos para realizar
                  la compra.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setShowErrorModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="h-100 h-custom bg-gray-200">
        <div className="container py-5 h-100">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/about">About</Link>
              </li>
              {/* <li className="breadcrumb-item"><a href="/ProductPresentation">Producto</a></li> */}
              <li className="breadcrumb-item active" aria-current="page">
                Carrito
              </li>
            </ol>
          </nav>
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col">
              <div className="card">
                <div className="card-body p-4">
                  <div className="row">
                    {/* Left Section */}
                    <div className="col-lg-7">
                      <h5 className="mb-3">
                        <span className="text-body">
                          <i className="fas fa-long-arrow-alt-left me-2"></i>
                          Seguir comprando
                        </span>
                      </h5>
                      <hr />
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <p className="mb-0">
                          Tienes <strong>{cartItems.length}</strong> artículos
                          en tu carrito
                        </p>
                        <div>
                          <p className="mb-0">
                            <span className="text-muted">Ordenar por:</span>{" "}
                            <span className="text-bod fw-semibold">
                              precio <i className="fas fa-angle-down mt-1"></i>
                            </span>
                          </p>
                        </div>
                      </div>
                      {/* Items */}
                      {cartItems.map((item, index) => (
                        <div className="card mb-3" key={index}>
                          <div className="card-body">
                            <div className="d-flex justify-content-between">
                              <div className="d-flex flex-row align-items-center">
                                <div>
                                  <Image
                                    src={item.image}
                                    className="img-fluid rounded-3"
                                    alt="Shopping item"
                                    style={{ width: "65px" }}
                                    width={65}
                                    height={65}
                                  />
                                </div>
                                <div className="ms-3">
                                  <h5>{item.name}</h5>
                                  <p className="small mb-0">
                                    Precio con descuento: ${item.discount}
                                  </p>
                                </div>
                              </div>
                              <div className="d-flex flex-row align-items-center">
                                <div style={{ width: "50px" }}>
                                  <h5 className="fw-normal mb-0">
                                    {item.quantity}
                                  </h5>
                                </div>
                                <div style={{ width: "80px" }}>
                                  <h5 className="mb-0">
                                    ${item.price.toFixed(2)}
                                  </h5>
                                </div>
                                <a
                                  onClick={() =>
                                    handleRemoveFromCart(item.name)
                                  }
                                >
                                  <FontAwesomeIcon icon={faTrashAlt} />
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Right Section */}
                    <div className="col-lg-5">
                      <div className="card bg-dark text-white rounded-3">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <h5 className="mb-0">Detalles del carrito</h5>
                          </div>
                          <p className="small mb-2">Tipos de tarjeta</p>
                          <a href="#!" className="text-white me-2">
                            <FontAwesomeIcon icon={faCcMastercard} size="2x" />
                          </a>
                          <a href="#!" className="text-white me-2">
                            <FontAwesomeIcon icon={faCcVisa} size="2x" />
                          </a>
                          <a href="#!" className="text-white me-2">
                            <FontAwesomeIcon icon={faCcAmex} size="2x" />
                          </a>
                          <a href="#!" className="text-white me-2">
                            <FontAwesomeIcon icon={faCcPaypal} size="2x" />
                          </a>
                          <form onSubmit={handleSubmit} className="mt-4">
                            {/* Nombre completo */}
                            <div className="form-outline form-white mb-4">
                              <input
                                type="text"
                                id="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                className={`form-control form-control-lg fs-6 ${
                                  errors.fullName ? "is-invalid" : ""
                                }`}
                                placeholder="Diego Alejandro Martínez López"
                              />
                              <label className="form-label" htmlFor="fullName">
                                Nombre completo
                              </label>
                              {errors.fullName && (
                                <small className="text-danger">
                                  {errors.fullName}
                                </small>
                              )}
                            </div>

                            {/* Número de tarjeta */}
                            <div className="form-outline form-white mb-4">
                              <input
                                type="text"
                                id="cardNumber"
                                value={formData.cardNumber}
                                onChange={handleChange}
                                className={`form-control form-control-lg fs-6 ${
                                  errors.cardNumber ? "is-invalid" : ""
                                }`}
                                placeholder="1234567890123456"
                                maxLength={16}
                              />
                              <label
                                className="form-label"
                                htmlFor="cardNumber"
                              >
                                Número de la tarjeta
                              </label>
                              {errors.cardNumber && (
                                <small className="text-danger">
                                  {errors.cardNumber}
                                </small>
                              )}
                            </div>

                            {/* Fecha de expiración */}
                            <div className="form-outline form-white mb-4">
                              <input
                                type="text"
                                id="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                className={`form-control form-control-lg fs-6 ${
                                  errors.expiryDate ? "is-invalid" : ""
                                }`}
                                placeholder="MM/AAAA"
                                maxLength={7} // Limita a MM/AAAA
                              />
                              <label
                                className="form-label"
                                htmlFor="expiryDate"
                              >
                                Fecha de expiración
                              </label>
                              {errors.expiryDate && (
                                <small className="text-danger">
                                  {errors.expiryDate}
                                </small>
                              )}
                            </div>

                            {/* CVV */}
                            <div className="form-outline form-white mb-4">
                              <input
                                type="password"
                                id="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                className={`form-control form-control-lg fs-6 ${
                                  errors.cvv ? "is-invalid" : ""
                                }`}
                                placeholder="•••"
                                maxLength={4}
                              />
                              <label className="form-label" htmlFor="cvv">
                                CVV
                              </label>
                              {errors.cvv && (
                                <small className="text-danger">
                                  {errors.cvv}
                                </small>
                              )}
                            </div>
                          </form>
                          <hr className="my-4" />
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Subtotal</p>
                            <p className="mb-2">${totalQuantity.toFixed(2)}</p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Costo de Envío</p>
                            <p className="mb-2">$20.00</p>
                          </div>
                          <div className="d-flex justify-content-between">
                            <p className="mb-2">Descuento Total</p>
                            <p className="mb-2">${totalDiscount}.00</p>
                          </div>
                          <div className="d-flex justify-content-between mb-4">
                            <p className="mb-2">Total (IVA incl.)</p>
                            <p className="mb-2">${totalQuantity.toFixed(2)}</p>
                          </div>

                          <div className="d-flex justify-content-end">
                            <button
                              type="button"
                              className="btn btn-info btn-block btn-lg"
                              onClick={handleCheckout}
                            >
                              <div className="d-flex justify-content-between">
                                <span>
                                  Pagar{" "}
                                  <i className="fas fa-long-arrow-alt-right ms-2"></i>
                                </span>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FooterComponent />
    </>
  );
}
