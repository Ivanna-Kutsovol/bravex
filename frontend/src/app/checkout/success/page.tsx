import Link from "next/link";

import stl from "./page.module.scss";

type Props = {
  searchParams?: Promise<{
    orderId?: string;
  }>;
};

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const params = searchParams ? await searchParams : undefined;
  const orderId = params?.orderId;

  return (
    <main className={stl.successPage}>
      <section className={stl.successCard}>
        <span className={stl.successBadge}>Order confirmed</span>
        <h1 className={stl.successTitle}>Thank you. Your order has been accepted.</h1>
        <p className={stl.successText}>
          We have received your request and started processing it. A confirmation flow can be added here later by
          email or in the user account.
        </p>
        {orderId ? (
          <div className={stl.successMeta}>
            <span className={stl.successMetaLabel}>Order number</span>
            <strong className={stl.successNumber}>#{orderId}</strong>
          </div>
        ) : null}
        <Link href="/" className={stl.successButton}>
          Return to homepage
        </Link>
      </section>
    </main>
  );
}
