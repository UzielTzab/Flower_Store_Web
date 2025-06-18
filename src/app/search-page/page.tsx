import { FooterComponent } from "../components/footer_component";
import { HeaderComponent } from "../components/header_component";
import { useEffect, useState } from "react";
import { ProductCard } from "../components/product_card_component"; // Asegúrate de importar este componente si lo usas
import { useLocation } from "react-router-dom";
import { Modal, Spinner } from "react-bootstrap";
import { ExclamationCircle, CheckCircle } from "react-bootstrap-icons";
import { ProductInterface } from "../models/interfaces/product_interface";

export function Search() {
  const location = useLocation();
  const search = location.state?.search || "";

  const [filteredProducts, setProducts] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    // Filtra los productos por el término de búsqueda
    const storedProducts = localStorage.getItem("product_on_stock");
    setLoading(true);
    if (storedProducts) {
      setLoading(false);
      setShowSuccessModal(true);
      const allProducts: ProductInterface[] = JSON.parse(storedProducts);
      const filteredProducts = allProducts.filter((product: ProductInterface) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setProducts(filteredProducts);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 1000);
    }
  }, [search]);

  return (
    <>
      <HeaderComponent />
      <section className="py-5">
        <header className="bg-dark py-3 text-white">
          <h4 className="mx-30 ps-4">Resultados de la busqueda "{search}"</h4>
        </header>
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {filteredProducts.map((product, index) => (
              <ProductCard
                key={index}
                name={product.name}
                price={product.price}
                quantity={product.quantity}
                discount={product.discount}
                image={product.image}
                description={product.description}
              />
            ))}
          </div>
        </div>
      </section>
      <Modal show={loading} onHide={() => setLoading(false)} backdrop="static">
        <Modal.Body className="d-flex justify-content-center">
          <Spinner />
        </Modal.Body>
      </Modal>
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Éxito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CheckCircle color="green" size={36} />{" "}
          {/* Muestra un icono de check verde */}
          Se encontrarón {filteredProducts.length} resultados
        </Modal.Body>
      </Modal>
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error al crear la cuentan</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ExclamationCircle color="red" size={36} />{" "}
          {/* Muestra un icono de check verde */}
          Correo electronico o contraseña incorrecta.
        </Modal.Body>
      </Modal>
      <FooterComponent />
    </>
  );
}
