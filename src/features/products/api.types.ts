import { Product } from "@/features/products/product.types";

export interface ApiResponseSingleProduct {
  data: Product;
  meta: Record<string, unknown>;
}

export interface ApiResponseAllProducts {
  data: Product[];
  meta: {
    isFirstPage: boolean;
    isLastPage: boolean;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    pageCount: number;
    totalCount: number;
  };
}
