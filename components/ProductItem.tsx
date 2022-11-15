/* eslint-disable @next/next/no-img-element */
import { Product } from '../utils/data';
import Link from 'next/link';

export default function ProductItem({ product }: { product: Product }) {
  return (
    <div className="card">
      <Link href={`/product/${product.slug}`}>
        <img
          src={product.image}
          alt={product.name}
          className="rounded shadow"
        />
      </Link>
      <div className="flex flex-col justify-center items-center p-5">
        <Link href={`/product/${product.slug}`} className="text-lg">
          {product.name}
        </Link>
        <p className="mb-2">{product.brand}</p>
        <p className="mb-2">${product.price}</p>
        <button className="primary-button" type="button">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
