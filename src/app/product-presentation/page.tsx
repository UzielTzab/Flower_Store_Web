"use client";
import { useSearchParams } from "next/navigation";
import { ProductViewComponent } from "@/components/product_view_component";
import { FooterComponent } from "@/components/footer_component";
import { HeaderComponent } from "@/components/header_component";
import { SidebarCart } from "@/components/sidebar_cart";

export default function ProductPresentation() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name") || "";
  const price = Number(searchParams.get("price")) || 0;
  const discount = Number(searchParams.get("discount")) || 0;
  const image = searchParams.get("image") || "";
  const description = searchParams.get("description") || "";

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
