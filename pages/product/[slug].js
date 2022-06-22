import React, { useState } from "react";
import { client, urlFor } from "../../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Product } from "../../components";
import { useStateContext } from "../../context/State-Context";

const ProductDetail = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  ////////////////////////////////////////////////////
  const { decQty, incQty, qty, onAdd } = useStateContext();

  console.log(product);
  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="product-detail-image">
            <img src={urlFor(image && image[index])} />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <div
                onMouseEnter={() => {
                  setIndex(i);
                }}
                key={i}
                className={
                  i === index
                    ? "small-images-box selected-image"
                    : "small-images-box"
                }>
                <img className="small-image " src={urlFor(item)} />
              </div>
            ))}
          </div>
        </div>
        <div className="product-detail-desc">
          <h1>{name}</h1>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details :</h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity :</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num" onClick="">
                {qty}
              </span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              className="add-to-cart"
              type="button"
              onClick={() => onAdd(product, qty)}>
              ADD TO CART
            </button>
            <button className="buy-now" type="button" onClick="">
              BUY-NOW
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You May Like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((product) => (
              <Product key={product._id} productsData={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
///////////////////////////////////////////
export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
      slug {
        current
      }
    }
    `;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
///////////////////////////////////////////
export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};
//////////////////////////////////////////
export default ProductDetail;
