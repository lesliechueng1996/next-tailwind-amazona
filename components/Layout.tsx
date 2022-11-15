import { ReactNode, useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Store } from '../utils/store';

export default function Layout({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  const storeContext = useContext(Store);
  if (!storeContext) {
    return <div>This Component should in the StoreProvider</div>;
  }
  const { state } = storeContext;

  return (
    <>
      <Head>
        <title>{title ? `${title} - Amazona` : 'Amazona'}</title>
        <meta name="description" content="next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-between min-h-screen">
        <header>
          <nav className="flex flex-row justify-between shadow-md h-12 items-center px-4">
            <Link href="/" className="text-lg font-bold">
              Amazona
            </Link>
            <div>
              <Link href="/cart" className="p-2">
                Cart
                <span className="rounded-full bg-red-600 text-white px-2 py-1 font-bold text-xs ml-1">
                  {state.cart.reduce<number>((preValue, currValue) => {
                    return preValue + currValue.quantity;
                  }, 0)}
                </span>
              </Link>
              <Link href="/login" className="p-2">
                Login
              </Link>
            </div>
          </nav>
        </header>
        <main className="container grow mx-auto mt-4 px-4">{children}</main>
        <footer className="flex flex-row justify-center items-center shadow-inner h-10">
          <p>Copyright © 2022 Amazona</p>
        </footer>
      </div>
    </>
  );
}
