import React from "react";
import { HeroBanner, Product, FooterBanner } from "../components";
import { client } from "../lib/client";

const Home = ({ productsData, bannerData }) => {
  return (
    <React.Fragment>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      {console.log("bannerData", bannerData)}
      {/* //////////////////////////////////////////// */}

      <div className="products-heading">
        <h2>Best Selling Products</h2>
      </div>
      {/* //////////////////////////////////////////// */}

      {console.log("productsData", productsData)}
      <div className="products-container">
        {productsData?.map((product) => (
          <Product key={product._id} productsData={product} />
        ))}
      </div>
      {/* //////////////////////////////////////////// */}

      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </React.Fragment>
  );
};
export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const productsData = await client.fetch(productQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { productsData, bannerData },
  };
};

export default Home;
