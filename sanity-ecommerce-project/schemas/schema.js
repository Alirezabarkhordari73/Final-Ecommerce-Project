import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";
import Product from "./Product";
import Banner from "./Banner";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([Product, Banner]),
});
