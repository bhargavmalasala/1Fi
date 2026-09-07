import { marketplaceProducts } from "./products.js";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const demoState = () => new URLSearchParams(window.location.search).get("demo");

export async function getMarketplaceProducts() {
  await wait(650);

  if (demoState() === "products-error") {
    throw new Error("Demo product service failure");
  }

  if (demoState() === "empty") {
    return [];
  }

  return marketplaceProducts;
}

export async function getMarketplaceProduct(id) {
  await wait(450);

  if (demoState() === "detail-error") {
    throw new Error("Demo product detail failure");
  }

  const product = marketplaceProducts.find((item) => item.id === id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}
