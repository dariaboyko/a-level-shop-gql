import SimpleImageSlider from "react-simple-image-slider";
import "../App.css";
import classes from "./Products.module.css";
function ProductInfoWindow({ data }) {
  console.log(data.images);
  return (
    <div className={classes.infoWindow}>
      <SimpleImageSlider
        width={600}
        height={504}
        images={data.images.map((i) => {
          return { url: "http://shop-roles.node.ed.asmer.org.ua/" + i.url };
        })}
        showBullets={true}
        showNavs={true}
        bgColor={"#FFFF"}
      />
      <p className={classes.description}>
        <h2 className={classes.productName}>{data.name}</h2>
        <p className={classes.price}>{data.price} $</p>
        <p>{data.description}</p>
      </p>
    </div>
  );
}
export default ProductInfoWindow;
