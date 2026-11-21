import {
  ApiResponseAllProducts,
  ApiResponseSingleProduct,
} from "@/features/products/api.types";

const API_URL = process.env.NOROFF_API_URL;
const API_KEY = process.env.NOROFF_API_KEY ?? "";

async function getErrorMessage(res: Response, fallback: string) {
  if (res.status === 404) {
    return "Not found (404).";
  }
  try {
    const errorData = await res.json();
    return errorData.errors?.[0]?.message ?? fallback;
  } catch {
    return `${fallback} ${res.statusText}`;
  }
}

export async function getAllProducts(): Promise<ApiResponseAllProducts> {
  const res = await fetch(`${API_URL}/online-shop`, {
    headers: { "X-Noroff-API-Key": API_KEY },
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    throw new Error(
      await getErrorMessage(
        res,
        `Could not fetch products. Status: ${res.status}`,
      ),
    );
  }
  return res.json();
}

export async function getProduct(
  id: string,
): Promise<ApiResponseSingleProduct> {
  const res = await fetch(`${API_URL}/online-shop/${id}`, {
    headers: { "X-Noroff-API-Key": API_KEY },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(
      await getErrorMessage(res, `Could not fetch product with ID: ${id}`),
    );
  }
  return res.json();
}
