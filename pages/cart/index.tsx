import { useContext } from 'react';
import Layout from '../../components/Layout';
import { Store, StoreActionEnum } from '../../utils/store';
import Image from 'next/image';
import Link from 'next/link';
import { XCircleIcon } from '@heroicons/react/24/outline';

export default function CartScreen() {
  const { state, dispatch } = useContext(Store);

  return (
    <Layout title="Shopping Cart">
      <div>
        <p className="mb-4 text-xl">Shopping Cart</p>
        {state.cart.length === 0 ? (
          <div>
            Cart is empty. <Link href="/">Go shopping</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-4 md:gap-5">
            <div className="md:col-span-3 overflow-x-auto">
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="p-5 text-left">Item</th>
                    <th className="text-right">Quantity</th>
                    <th className="text-right">Price</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {state.cart.map((item) => (
                    <tr key={item.slug} className="border-b">
                      <td className="p-5 text-left">
                        <Link
                          href={`/product/${item.slug}`}
                          className="flex flex-row justify-start items-center"
                        >
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                            className="mr-5"
                          />
                          <span>{item.name}</span>
                        </Link>
                      </td>
                      <td className="text-right">{item.quantity}</td>
                      <td className="text-right">${item.price}</td>
                      <td className="text-center">
                        <button
                          onClick={() => {
                            dispatch({
                              type: StoreActionEnum.CART_REMOVE_ITEM,
                              payload: item,
                            });
                          }}
                        >
                          <XCircleIcon width={25} height={25} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="col-span-1">
              <div className="card p-5">
                <div className="mb-3 text-xl">
                  Subtotal(
                  {state.cart.reduce((preValue: number, currentValue) => {
                    return preValue + currentValue.quantity;
                  }, 0)}
                  ): $
                  {state.cart.reduce((preValue: number, currentValue) => {
                    return (
                      preValue + currentValue.quantity * currentValue.price
                    );
                  }, 0)}
                </div>
                <button className="primary-button w-full">Check Out</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
