import Header from "@/src/components/layout/header/header";
import CartItems from "@/src/components/cart/cartItems";
import OrderSummary from "@/src/components/orderSummary/orderSummary";

import stl from "@/src/components/cart/cart.module.scss";

export default function CartPage() {
  return (
    <>
      <Header />
      <h1 className={stl.cart__title}>Shopping Bag</h1>
      <div className={stl.container}>
        <CartItems />
        <OrderSummary checkoutLink />
      </div>
    </>
  );
}
