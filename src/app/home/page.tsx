"use client";
import { FooterComponent } from "@/components/footer_component";
import { HeaderComponent } from "@/components/header_component";
import { MainComponent } from "@/components/main_component";
import { useState } from "react";
export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <HeaderComponent setSearchTerm={setSearchTerm} />
      <MainComponent searchTerm={searchTerm} />
      <FooterComponent />
    </>
  );
}
