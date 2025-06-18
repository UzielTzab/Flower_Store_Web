import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons/faCaretRight";

import { CategorySide } from "../scripts/category_dropdown_menu";

export function HeaderComponent({
  setSearchTerm,
}: {
  setSearchTerm?: (search: string) => void;
}) {
  const [searchTerm, setLocalSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("florales");

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);

  const handleSearch = () => {
    setSearchTerm?.(searchTerm);
  };

  useEffect(() => {
    CategorySide();

    const categoryLinks =
      document.querySelectorAll<HTMLElement>(".dropdown-item");
    if (categoryLinks.length > 0) {
      const firstCategoryLink = categoryLinks[0];
      firstCategoryLink.dispatchEvent(new MouseEvent("mouseover"));
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;

      if (target && target.closest(".dropdown") === null) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const categoryLinks =
      document.querySelectorAll<HTMLElement>(".offcanvas-title");

    const allContents =
      document.querySelectorAll<HTMLElement>(".category-content");

    categoryLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const targetCategory = link.getAttribute("data-target");

        if (targetCategory) {
          allContents.forEach((content) => {
            content.style.display = "none";
          });

          const activeContent = document.querySelector<HTMLElement>(
            `.category-content[data-content="${targetCategory}"]`
          );
          if (activeContent) {
            activeContent.style.display = "block";
          }
        }
      });
    });

    return () => {
      categoryLinks.forEach((link) => {
        link.removeEventListener("click", () => {});
      });
    };
  }, []);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartCount(cart.length);
    };

    // Actualiza el contador del carrito al montar el componente
    updateCartCount();

    // Escucha el evento 'cartUpdated' para detectar cambios en el carrito
    window.addEventListener("cartUpdated", updateCartCount);

    // Limpia el evento al desmontar el componente
    return () => {
      window.removeEventListener("cartUpdated", updateCartCount);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid d-flex align-items-center">
        <Link className="navbar-brand navbar-logo" href="/">
          <span className="d-none d-lg-inline">Detalles Florales</span>
          <span className="d-inline d-lg-none">Detalles</span>
        </Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-6 mb-lg-0 ms-lg-4">
            <li
              className="nav-item dropdown"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      id="megaMenu"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded={isOpen ? "true" : "false"}
                    >
                      Categorías
                    </a>
                    <div
                      className={`dropdown-menu ${isOpen ? "show" : ""}`}
                      aria-labelledby="megaMenu"
                      style={{ minWidth: "600px" }}
                    >
                      <div className="row g-3">
                        <div className="col-6 border-end">
                          <a className="dropdown-header">Categorías</a>
                          <a
                            className="dropdown-item d-flex justify-content-between align-items-center"
                            href="#"
                            data-target="arreglos"
                          >
                            Arreglos Florales
                            <FontAwesomeIcon icon={faCaretRight} size="2xs" />
                          </a>
                          <a
                            className="dropdown-item d-flex justify-content-between align-items-center"
                            href="#"
                            data-target="flores"
                          >
                            Tipos de Flores
                            <FontAwesomeIcon icon={faCaretRight} size="2xs" />
                          </a>
                          <a
                            className="dropdown-item d-flex justify-content-between align-items-center"
                            href="#"
                            data-target="eventos"
                          >
                            Eventos y Ocasiones
                            <FontAwesomeIcon icon={faCaretRight} size="2xs" />
                          </a>
                          <a
                            className="dropdown-item d-flex justify-content-between align-items-center"
                            href="#"
                            data-target="plantas"
                          >
                            Plantas y Jardinería
                            <FontAwesomeIcon icon={faCaretRight} size="2xs" />
                          </a>
                          <a
                            className="dropdown-item d-flex justify-content-between align-items-center"
                            href="#"
                            data-target="regalos"
                          >
                            Regalos y Complementos
                            <FontAwesomeIcon icon={faCaretRight} size="2xs" />
                          </a>
                          <a
                            className="dropdown-item d-flex justify-content-between align-items-center"
                            href="#"
                            data-target="decoración"
                          >
                            Decoración Floral
                            <FontAwesomeIcon icon={faCaretRight} size="2xs" />
                          </a>
                          <a
                            className="dropdown-item d-flex justify-content-between align-items-center"
                            href="#"
                            data-target="florerías"
                          >
                            Florerías
                            <FontAwesomeIcon icon={faCaretRight} size="2xs" />
                          </a>
                          <a
                            className="dropdown-item d-flex justify-content-between align-items-center"
                            href="#"
                            data-target="ofertas"
                          >
                            Ofertas y Descuentos
                            <FontAwesomeIcon icon={faCaretRight} size="2xs" />
                          </a>
                          <a
                            className="dropdown-item d-flex justify-content-between align-items-center"
                            href="#"
                            data-target="servicios"
                          >
                            Servicios Especiales
                            <FontAwesomeIcon icon={faCaretRight} size="2xs" />
                          </a>
                          <a
                            className="dropdown-item d-flex justify-content-between align-items-center"
                            href="#"
                            data-target="ecoamigables"
                          >
                            Productos Eco-amigables
                            <FontAwesomeIcon icon={faCaretRight} size="2xs" />
                          </a>
                        </div>
                        <div className="col-6">
                          <div
                            id="category-content-arreglos"
                            className="category-content"
                          >
                            <h6 className="dropdown-header">
                              Todos Arreglos Florales
                            </h6>
                            <a className="dropdown-item" href="#">
                              Ramos personalizados
                            </a>
                            <a className="dropdown-item" href="#">
                              Centros de mesa
                            </a>
                            <a className="dropdown-item" href="#">
                              Arreglos para bodas
                            </a>
                          </div>
                          <div
                            id="category-content-flores"
                            className="category-content"
                          >
                            <h6 className="dropdown-header">Tipos de Flores</h6>
                            <a className="dropdown-item" href="#">
                              Rosas
                            </a>
                            <a className="dropdown-item" href="#">
                              Tulipanes
                            </a>
                            <a className="dropdown-item" href="#">
                              Orquídeas
                            </a>
                          </div>
                          <div
                            id="category-content-eventos"
                            className="category-content"
                          >
                            <h6 className="dropdown-header">
                              Eventos y Ocasiones
                            </h6>
                            <a className="dropdown-item" href="#">
                              Cumpleaños
                            </a>
                            <a className="dropdown-item" href="#">
                              Aniversarios
                            </a>
                            <a className="dropdown-item" href="#">
                              Día de San Valentín
                            </a>
                          </div>
                          <div
                            id="category-content-plantas"
                            className="category-content"
                          >
                            <h6 className="dropdown-header">
                              Plantas y Jardinería
                            </h6>
                            <a className="dropdown-item" href="#">
                              Plantas de interior
                            </a>
                            <a className="dropdown-item" href="#">
                              Plantas de exterior
                            </a>
                          </div>
                          <div
                            id="category-content-regalos"
                            className="category-content"
                          >
                            <h6 className="dropdown-header">
                              Regalos y Complementos
                            </h6>
                            <a className="dropdown-item" href="#">
                              Cestas de regalo
                            </a>
                            <a className="dropdown-item" href="#">
                              Peluches
                            </a>
                            <a className="dropdown-item" href="#">
                              Chocolates
                            </a>
                            <a className="dropdown-item" href="#">
                              Tarjetas de felicitación
                            </a>
                            <a className="dropdown-item" href="#">
                              Aromatizantes y velas
                            </a>
                          </div>
                          <div
                            id="category-content-decoración"
                            className="category-content"
                          >
                            <h6 className="dropdown-header">
                              Decoración Floral
                            </h6>
                            <a className="dropdown-item" href="#">
                              Arcos florales
                            </a>
                            <a className="dropdown-item" href="#">
                              Centros de mesa para eventos
                            </a>
                            <a className="dropdown-item" href="#">
                              Guirnaldas florales
                            </a>
                            <a className="dropdown-item" href="#">
                              Decoraciones para fiestas
                            </a>
                            <a className="dropdown-item" href="#">
                              Adornos florales para el hogar
                            </a>
                          </div>
                          <div
                            id="category-content-florerías"
                            className="category-content"
                          >
                            <h6 className="dropdown-header">Florerías</h6>
                            <a className="dropdown-item" href="#">
                              Florerías cerca de mí
                            </a>
                            <a className="dropdown-item" href="#">
                              Florerías para eventos
                            </a>
                            <a className="dropdown-item" href="#">
                              Florerías con entrega a domicilio
                            </a>
                            <a className="dropdown-item" href="#">
                              Florerías premium
                            </a>
                          </div>
                          <div
                            id="category-content-ofertas"
                            className="category-content"
                          >
                            <h6 className="dropdown-header">
                              Ofertas y Descuentos
                            </h6>
                            <a className="dropdown-item" href="#">
                              Ofertas de temporada
                            </a>
                            <a className="dropdown-item" href="#">
                              Descuentos por cantidad
                            </a>
                            <a className="dropdown-item" href="#">
                              Ofertas por festividades
                            </a>
                            <a className="dropdown-item" href="#">
                              Productos con descuento
                            </a>
                          </div>
                          <div
                            id="category-content-servicios"
                            className="category-content"
                          >
                            <h6 className="dropdown-header">
                              Servicios Especiales
                            </h6>
                            <a className="dropdown-item" href="#">
                              Entrega rápida
                            </a>
                            <a className="dropdown-item" href="#">
                              Personalización de arreglos
                            </a>
                            <a className="dropdown-item" href="#">
                              Arreglos para empresas
                            </a>
                            <a className="dropdown-item" href="#">
                              Decoración para eventos corporativos
                            </a>
                          </div>
                          <div
                            id="category-content-ecoamigables"
                            className="category-content"
                          >
                            <h6 className="dropdown-header">
                              Productos Eco-amigables
                            </h6>
                            <a className="dropdown-item" href="#">
                              Arreglos con flores orgánicas
                            </a>
                            <a className="dropdown-item" href="#">
                              Empaque reciclable
                            </a>
                            <a className="dropdown-item" href="#">
                              Flores locales y de temporada
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#!">
                Servicios
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#!">
                Nosotros
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#!">
                Contacto
              </a>
            </li>
          </ul>
        </div>
        <div
          className="offcanvas offcanvas-start"
          data-bs-scroll="true"
          tabIndex={-1}
          id="offcanvasWithBothOptions"
          aria-labelledby="offcanvasWithBothOptionsLabel"
        >
          <div className="offcanvas-header border-bottom">
            <div className="d-flex align-items-center gap-3 d-lg-none overflow-x-auto w-100 scroll-hidden">
              <a
                className={`offcanvas-title offcanvas-item text-nowrap text-secondary fw-bold ${
                  activeLink === "florales" ? "active" : ""
                }`}
                href="#"
                data-target="florales"
                onClick={() => setActiveLink("florales")}
              >
                Arreglos
              </a>
              <a
                className={`offcanvas-title offcanvas-item text-nowrap text-secondary fw-bold ${
                  activeLink === "tipos" ? "active" : ""
                }`}
                href="#"
                data-target="tipos"
                onClick={() => setActiveLink("tipos")}
              >
                Tipos de Flores
              </a>
              <a
                className={`offcanvas-title offcanvas-item text-nowrap text-secondary fw-bold ${
                  activeLink === "ocasiones" ? "active" : ""
                }`}
                href="#"
                data-target="ocasiones"
                onClick={() => setActiveLink("ocasiones")}
              >
                Eventos
              </a>
              <a
                className={`offcanvas-title offcanvas-item text-nowrap text-secondary fw-bold ${
                  activeLink === "jardineria" ? "active" : ""
                }`}
                href="#"
                data-target="jardineria"
                onClick={() => setActiveLink("jardineria")}
              >
                Jardinería
              </a>
              <a
                className={`offcanvas-title offcanvas-item text-nowrap text-secondary fw-bold ${
                  activeLink === "complementos" ? "active" : ""
                }`}
                href="#"
                data-target="complementos"
                onClick={() => setActiveLink("complementos")}
              >
                Regalos
              </a>
              <a
                className={`offcanvas-title offcanvas-item text-nowrap text-secondary fw-bold ${
                  activeLink === "decoracion" ? "active" : ""
                }`}
                href="#"
                data-target="decoracion"
                onClick={() => setActiveLink("decoracion")}
              >
                Decoración
              </a>
              <a
                className={`offcanvas-title offcanvas-item text-nowrap text-secondary fw-bold ${
                  activeLink === "florerias" ? "active" : ""
                }`}
                href="#"
                data-target="florerias"
                onClick={() => setActiveLink("florerias")}
              >
                Florerías
              </a>
              <a
                className={`offcanvas-title offcanvas-item text-nowrap text-secondary fw-bold ${
                  activeLink === "descuentos" ? "active" : ""
                }`}
                href="#"
                data-target="descuentos"
                onClick={() => setActiveLink("descuentos")}
              >
                Ofertas
              </a>
              <a
                className={`offcanvas-title offcanvas-item text-nowrap text-secondary fw-bold ${
                  activeLink === "especiales" ? "active" : ""
                }`}
                href="#"
                data-target="especiales"
                onClick={() => setActiveLink("especiales")}
              >
                Servicios
              </a>
              <a
                className={`offcanvas-title offcanvas-item text-nowrap text-secondary fw-bold ${
                  activeLink === "ecoamigables" ? "active" : ""
                }`}
                href="#"
                data-target="ecoamigables"
                onClick={() => setActiveLink("ecoamigables")}
              >
                Eco-amigables
              </a>
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body d-lg-none">
            <div
              className="category-content"
              data-content="florales"
              style={{ display: "block" }}
            >
              <ul className="category-list">
                <li className="list-unstyled">
                  <a className="fw-normal text-dark" href="#">
                    Ramos personalizados
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Arreglos para bodas
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Centros de mesa
                  </a>
                </li>
              </ul>
            </div>
            <div
              className="category-content"
              data-content="tipos"
              style={{ display: "none" }}
            >
              <ul className="category-list">
                <li className="list-unstyled">
                  <a className="fw-normal text-dark" href="#">
                    Rosas
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Tulipanes
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Orquídeas
                  </a>
                </li>
              </ul>
            </div>
            <div
              className="category-content"
              data-content="ocasiones"
              style={{ display: "none" }}
            >
              <ul className="category-list">
                <li className="list-unstyled">
                  <a className="fw-normal text-dark" href="#">
                    Cumpleaños
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Aniversarios
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Día de San Valentín
                  </a>
                </li>
              </ul>
            </div>
            <div
              className="category-content"
              data-content="jardineria"
              style={{ display: "none" }}
            >
              <ul className="category-list">
                <li className="list-unstyled">
                  <a className="fw-normal text-dark" href="#">
                    Plantas de interior
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Plantas de exterior
                  </a>
                </li>
              </ul>
            </div>
            <div
              className="category-content"
              data-content="complementos"
              style={{ display: "none" }}
            >
              <ul className="category-list">
                <li className="list-unstyled">
                  <a className="fw-normal text-dark" href="#">
                    Cestas de regalo
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Peluches
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Chocolates
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Tarjetas de felicitación
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Aromatizantes y velas
                  </a>
                </li>
              </ul>
            </div>
            <div
              className="category-content"
              data-content="decoracion"
              style={{ display: "none" }}
            >
              <ul className="category-list">
                <li className="list-unstyled">
                  <a className="fw-normal text-dark" href="#">
                    Arcos florales
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Centros de mesa para eventos
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Guirnaldas florales
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Decoraciones para fiestas
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Adornos florales para el hogar
                  </a>
                </li>
              </ul>
            </div>
            <div
              className="category-content"
              data-content="florerias"
              style={{ display: "none" }}
            >
              <ul className="category-list">
                <li className="list-unstyled">
                  <a className="fw-normal text-dark" href="#">
                    Florerías cerca de mí
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Florerías para eventos
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Florerías con entrega a domicilio
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Florerías premium
                  </a>
                </li>
              </ul>
            </div>
            <div
              className="category-content"
              data-content="descuentos"
              style={{ display: "none" }}
            >
              <ul className="category-list">
                <li className="list-unstyled">
                  <a className="fw-normal text-dark" href="#">
                    Ofertas de temporada
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Descuentos por cantidad
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Ofertas por festividades
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Productos con descuento
                  </a>
                </li>
              </ul>
            </div>
            <div
              className="category-content"
              data-content="especiales"
              style={{ display: "none" }}
            >
              <ul className="category-list">
                <li className="list-unstyled">
                  <a className="fw-normal text-dark" href="#">
                    Entrega rápida
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Personalización de arreglos
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Arreglos para empresas
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Decoración para eventos corporativos
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Arreglos con flores orgánicas
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Empaque reciclable
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Flores locales y de temporada
                  </a>
                </li>
              </ul>
            </div>
            <div
              className="category-content"
              data-content="ecoamigables"
              style={{ display: "none" }}
            >
              <ul className="category-list">
                <li className="list-unstyled">
                  <a className="fw-normal text-dark" href="#">
                    Arreglos con flores orgánicas
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Empaque reciclable
                  </a>
                </li>
                <li className="list-unstyled pt-2">
                  <a className="fw-normal text-dark" href="#">
                    Flores locales y de temporada
                  </a>
                </li>
              </ul>
            </div>
            <div className="side-info">
              <h5>Información</h5>
              <div className="lh-lg">
                <div>
                  <a className="fw-normal text-dark" href="#">
                    Servicios
                  </a>
                </div>
                <div>
                  <a className="fw-normal text-dark" href="#">
                    Nosotros
                  </a>
                </div>
                <div>
                  <a className="fw-normal text-dark" href="#">
                    Contacto
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <form
          className="d-flex responsive-search"
          role="search"
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <input
            className="form-control me-2"
            type="search"
            placeholder="Buscar"
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setLocalSearchTerm(e.target.value)}
          />
        </form>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasWithBothOptions"
          aria-controls="offcanvasWithBothOptions"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <form className="d-flex mx-2">
          <Link href="/Cart" className="btn btn-outline-dark">
            <i className="bi-cart-fill me-1"></i>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="badge  bg-white text-black ms-1 rounded-pill">
              {cartCount}
            </span>
          </Link>
        </form>
      </div>
    </nav>
  );
}
