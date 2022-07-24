import { Route, Routes } from "react-router-dom";
import ProductInfoWindow from "./ProductInfoWindow";

function ProductInfo({ data }) {
    let products = [];
    if(data){
    if (data.data.CategoryFindOne) {
      data.data.CategoryFindOne.goods.forEach((product) => {
        products.push(product);
      });
    }
    if (data.data.CategoryFind) {
      data.data.CategoryFind.forEach((category) => {
         if(category.goods){
          category.goods.forEach((product) => {
            products.push(product);
          });
         }
      });
    }}
  return (
    <Routes>
      {data &&
        products.map((product) => {
          return (
            <Route
              path={product._id}
              element={<ProductInfoWindow data={product} />}
              key={"route" + product._id}
            />
          );
        })}
    </Routes>
  );
}
export default ProductInfo;
