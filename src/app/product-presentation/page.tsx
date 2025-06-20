"use client";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductViewComponent } from "@/components/product_view_component";
import { FooterComponent } from "@/components/footer_component";
import { HeaderComponent } from "@/components/header_component";
import { SidebarCart } from "@/components/sidebar_cart";

export default function ProductPresentation() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ProductPresentationContent />
    </Suspense>
  );
}

function ProductPresentationContent() {
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));
  const name = searchParams.get("name") || "";
  const price = Number(searchParams.get("price")) || 0;
  const discount = Number(searchParams.get("discount")) || 0;
  const image = searchParams.get("image") || "";
  const description = searchParams.get("description") || "";
  const stock = Number(searchParams.get("stock")) || 0;
  const status = searchParams.get("status") || "";

  return (
    <div>
      <HeaderComponent />
      <ProductViewComponent
        id={id}
        name={name}
        price={price}
        discount={discount}
        image={image}
        description={description}
        stock={stock}
        status={status}
        quantity={1}
      />
      <SidebarCart />
      <FooterComponent />
    </div>
  );
}
