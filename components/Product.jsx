import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const Product = ({ productsData: { image, name, price, slug } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className="product-card">
          <img
            src={urlFor(image && image[0])}
            width={290}
            height={290}
            className="product-image"
            alt="product-image"
          />
          <p className="product-name">{name}</p>
          <p className="product-price">${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
