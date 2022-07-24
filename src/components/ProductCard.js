import classes from './Products.module.css'
 import {Link, useLocation} from "react-router-dom";
function ProductCard({ data }) {
const location = useLocation();
     return (
       <div className={classes.productWrapper}>
         <Link to={location.pathname + "/" + data._id}>
           <div className={classes.productImgWrapper}>
             <img
               src={
                 "http://shop-roles.node.ed.asmer.org.ua/" + data.images[0].url
               }
               alt={data.name}
               className={classes.productImg}
             />
           </div>
           <div className={classes.productName}>{data.name}</div>
           <div className={classes.price}>
             {data.price} $
           </div>
         </Link>
       </div>
     );
}
export default ProductCard;