import axios from "axios";
import { ProductInterface } from "@/models/product_interface";

const API_URL = "https://apiflowerstore.onrender.com/api/products";

export const FetchProducts = async (): Promise<ProductInterface[]> => {
  const response = await axios.get<ProductInterface[]>(API_URL);
  console.log("Response from FetchProducts:", response.data);
  return response.data;
};

export const substractProducts = async (
  products: { id: number; quantity: number }[]
) => {
  const url = "https://apiflowerstore.onrender.com/api/products/purchase";
  const response = await axios.post(url, products, {
    headers: { "Content-Type": "application/json" },
  });
  console.log("Response from substractProducts:", response.data);
  return response.data;
};
