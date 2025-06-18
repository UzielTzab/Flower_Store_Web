import axios from "axios";
import { ProductInterface } from "@/models/product_interface";

const API_URL = "https://apiflowershop.onrender.com/api/products";

export const FetchProducts = async (): Promise<ProductInterface[]> => {
  const response = await axios.get<ProductInterface[]>(API_URL);
  return response.data;
};
