import type { Metadata } from 'next';
import "./styles/App.scss";
import { CartProvider } from "../components/cart/cart-context";

export const metadata: Metadata = {
  title: "BRAVEX",
  description: "BRAVEX",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        <body>
          <CartProvider>{children}</CartProvider>
        </body>
    </html>
  );
}
