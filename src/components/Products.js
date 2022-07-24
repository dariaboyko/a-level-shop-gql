import classes from "./Products.module.css";
import ProductCard from "./ProductCard";
function Products({ data }) {
  let products = []
  if(data){
  if (data.data.CategoryFindOne) {
      data.data.CategoryFindOne.goods.forEach((product) => {
        products.push(product);
      });
    }
    if (data.data.CategoryFind) {
      console.log("yes");
      data.data.CategoryFind.forEach((category) => {
        if (category.goods) {
          category.goods.forEach((product) => {
            products.push(product);
          });
        }
      });
    }
  }
  return (
    <section>
      <div className={classes.products}>
        {data&&products.map((product) => {return <ProductCard data={product} key={product._id} />})}
      </div>
    </section>
  );
}
export default Products;
