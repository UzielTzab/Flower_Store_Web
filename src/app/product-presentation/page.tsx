import { useLocation } from "react-router-dom";
import { ProductViewComponent } from "../components/product_view_component";
import { FooterComponent } from "../components/footer_component";
import { HeaderComponent } from "../components/header_component";
import { SidebarCart } from "../components/sidebar_cart";

export function Product_presentation() {
  const location = useLocation();
  const { name, price, discount, image, description } = location.state;

  return (
    <div>
      <HeaderComponent />
      <ProductViewComponent
        name={name}
        price={price}
        discount={discount}
        image={image}
        quantity={0}
        description={description}
      />
      <SidebarCart />
      <FooterComponent />
    </div>
  );
}
