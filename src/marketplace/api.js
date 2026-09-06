import { marketplaceProducts } from "./products.js";

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getMarketplaceProducts() {
  await wait(650);
  return marketplaceProducts;
}

export async function getMarketplaceProduct(id) {
  await wait(450);
  const product = marketplaceProducts.find((item) => item.id === id);

  if (!product) {
    throw new Error("Product not found");
  }

  return product;
}
