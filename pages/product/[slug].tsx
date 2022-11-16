import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';
import { Store, StoreActionEnum } from '../../utils/store';

export default function ProductDetail() {
  const router = useRouter();
  const { slug } = router.query;
  const product = data.products.find((item) => item.slug === slug);
  const { state, dispatch } = useContext(Store);

  if (!product) {
    return <div>No Product</div>;
  }

  const addProductToCart = () => {
    const existProduct = state.cart.find((item) => item.slug === slug);
    const quantity = existProduct ? existProduct.quantity + 1 : 1;
    if (quantity > product.countInStock) {
      alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({
      type: StoreActionEnum.CART_ADD_ITEM,
      payload: {
        ...product,
        quantity,
      },
    });
  };

  return (
    <Layout title={product.name}>
      <div>
        <div className="py-3 font-bold">
          <Link href="/">back to products</Link>
        </div>
        <div className="grid md:grid-cols-4 md:gap-3">
          <div className="md:col-span-2">
            <Image
              src={product.image}
              alt={product.name}
              width={640}
              height={640}
            />
          </div>
          <div>
            <ul>
              <li className="text-lg">{product.name}</li>
              <li>Category: {product.category}</li>
              <li>Brand: {product.brand}</li>
              <li>
                {product.rating} of {product.numReviews} reviews
              </li>
              <li>Description: {product.description}</li>
            </ul>
          </div>
          <div>
            <div className="card p-5">
              <div className="flex flex-row justify-between items-center mb-2">
                <span>Price</span>
                <span>${product.price}</span>
              </div>
              <div className="flex flex-row justify-between items-center mb-2">
                <span>Status</span>
                <span>
                  {product.countInStock > 0 ? 'In stock' : 'Unavailable'}
                </span>
              </div>
              <div>
                <button
                  className="primary-button w-full"
                  onClick={addProductToCart}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
