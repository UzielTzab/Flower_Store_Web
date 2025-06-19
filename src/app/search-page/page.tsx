"use client";

import { FooterComponent } from "@/components/footer_component";
import { HeaderComponent } from "@/components/header_component";
import { useEffect, useState, Suspense } from "react";
import { ProductCard } from "@/components/product_card_component";
import { Modal, Spinner } from "react-bootstrap";
import { ExclamationCircle, CheckCircle } from "react-bootstrap-icons";
import { ProductInterface } from "@/models/product_interface";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}

function SearchPageContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const [filteredProducts, setProducts] = useState<ProductInterface[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  useEffect(() => {
    const storedProducts = localStorage.getItem("product_on_stock");
    setLoading(true);
    if (storedProducts) {
      const allProducts: ProductInterface[] = JSON.parse(storedProducts);
      const filteredProducts = allProducts.filter((product: ProductInterface) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setProducts(filteredProducts);
      setShowSuccessModal(true);
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 1000);
      setLoading(false);
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [search]);

  return (
    <>
      <HeaderComponent />
      <section className="py-5">
        <header className="bg-dark py-3 text-white">
          <h4 className="mx-30 ps-4">
            Resultados de la búsqueda &quot;{search}&quot;
          </h4>
        </header>
        <div className="container px-4 px-lg-5 mt-5">
          {filteredProducts.length === 0 && !loading && (
            <div className="alert alert-warning text-center">
              No se encontraron productos.
            </div>
          )}
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
          <CheckCircle color="green" size={36} /> Se encontraron{" "}
          {filteredProducts.length} resultados
        </Modal.Body>
      </Modal>
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ExclamationCircle color="red" size={36} /> Correo electrónico o
          contraseña incorrecta.
        </Modal.Body>
      </Modal>
      <FooterComponent />
    </>
  );
}
