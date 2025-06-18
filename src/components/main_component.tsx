import carrouselImage1 from "@/assets/carrousel_image1.jpg";
import carrouselImage2 from "@/assets/carrousel_image3.jpg";
import carrouselImage3 from "@/assets/carrousel_image3.jpg";
import { ProductCard } from "@/components/product_card_component";
import { useState, useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import Image from "next/image";
import { ExclamationCircle, CheckCircle } from "react-bootstrap-icons";
import { faSpa } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FetchProducts } from "@/services/product_service";
import { ProductInterface } from "@/models/product_interface";

export function MainComponent({ searchTerm }: { searchTerm: string }) {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductInterface[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    const trimmedSearchTerm = searchTerm.trim();

    if (trimmedSearchTerm === "") {
      if (filteredProducts.length !== products.length) {
        setIsFiltering(false);
        setFilteredProducts(products);
      }
    } else {
      setIsFiltering(true);
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(trimmedSearchTerm.toLowerCase())
      );
      if (JSON.stringify(filtered) !== JSON.stringify(filteredProducts)) {
        setFilteredProducts(filtered);
      }

      if (filtered.length > 0) {
        setShowSuccessModal(true);
        setTimeout(() => setShowSuccessModal(false), 1000);
      } else {
        setShowErrorModal(true);
        setTimeout(() => setShowErrorModal(false), 3000);
      }
    }
  }, [searchTerm, products]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const products = await FetchProducts();
        setProducts(products);
        setFilteredProducts(products);
      } catch (error) {
        console.error("Ocurrió un error al traer los productos: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <header className="bg-dark">
        {!isFiltering && (
          <div id="carouselExampleCaptions" className="carousel slide">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <Image
                  src={carrouselImage1}
                  className="carousel-image w-100"
                  alt="Flores 1"
                ></Image>
                <div className="carousel-caption d-none d-md-block bg-dark">
                  <h3 className="carousel-text">
                    El lenguaje de las flores, en cada detalle
                  </h3>
                </div>
              </div>
              <div className="carousel-item">
                <Image
                  src={carrouselImage2}
                  className="carousel-image w-100"
                  alt="Flores 2"
                ></Image>
                <div
                  className="carousel-caption d-none d-md-block bg-dark"
                  style={{
                    borderTopLeftRadius: "2rem",
                    borderTopRightRadius: "2rem",
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  <h3 className="carousel-text">
                    Flores que dicen lo que las palabras no pueden
                  </h3>
                </div>
              </div>
              <div className="carousel-item">
                <Image
                  src={carrouselImage3}
                  className="carousel-image w-100"
                  alt="Flores 3"
                ></Image>
                <div
                  className="carousel-caption d-none d-md-block bg-dark"
                  style={{
                    borderTopLeftRadius: "2rem",
                    borderTopRightRadius: "2rem",
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  <h3 className="carousel-text">
                    Más que flores, son momentos inolvidables
                  </h3>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        )}
        {isFiltering && (
          <header className="bg-dark py-3 text-white">
            <h4 className="mx-30 ps-4">
              Resultados de la búsqueda &quot;{searchTerm}&quot;
              <FontAwesomeIcon icon={faSpa} size="1x" color="white" />
            </h4>
          </header>
        )}
      </header>
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {loading
              ? // Mostrar placeholders mientras se cargan los productos
                Array.from({ length: 16 }).map((_, index) => (
                  <div key={index} className="col mb-5">
                    <div className="card h-100">
                      <div className="card-body p-4">
                        <div className="text-center">
                          <Spinner
                            style={{ color: "pink" }}
                            animation="border"
                            role="status"
                          ></Spinner>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              : filteredProducts.map((product, index) => (
                  <ProductCard key={index} {...product} />
                ))}
          </div>
        </div>
      </section>
      <Modal show={loading} onHide={() => setLoading(false)} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Cargando las flores...</Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center">
          <Spinner />
        </Modal.Body>
      </Modal>
      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Resultado de la búsqueda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CheckCircle color="green" size={36} />{" "}
          {/* Muestra un icono de check verde */}
          Se encontraron {filteredProducts.length} resultados
        </Modal.Body>
      </Modal>
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>No se encontró</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ExclamationCircle color="dark" size={36} />{" "}
          {/* Muestra un icono de check verde */}
          No se encontraron resultados.
        </Modal.Body>
      </Modal>
    </>
  );
}

// Ya llegue, BUenas?
