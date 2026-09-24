import Header from "@/src/components/layout/header/header";
import OrderSummary from "@/src/components/orderSummary/orderSummary";
import CheckoutForm, { type ShippingMethod } from "@/src/components/checkout/checkoutForm";

import stl from "@/src/components/checkout/checkout.module.scss";

async function getShippingMethods(): Promise<ShippingMethod[]> {
  const apiBases = [
    process.env.API_URL,
    process.env.NEXT_PUBLIC_API_URL,
    "http://backend:8080",
    "http://localhost:8080",
  ].filter((value, index, array): value is string => Boolean(value) && array.indexOf(value) === index);

  for (const apiBase of apiBases) {
    try {
      const res = await fetch(`${apiBase}/api/shipping-methods`, { cache: "no-store" });

      if (res.ok) {
        return (await res.json()) as ShippingMethod[];
      }
    } catch {
      continue;
    }
  }

  return [];
}

export default async function CheckoutPage() {
  const shippingMethods = await getShippingMethods();

  return (
    <>
      <Header />
      <h1 className={stl.cart__title}>Checkout</h1>
      <div className={stl.container}>
        <CheckoutForm shippingMethods={shippingMethods} />
        <OrderSummary />
      </div>
    </>
  );
}
