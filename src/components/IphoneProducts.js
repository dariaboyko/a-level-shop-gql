import Products from "./Products";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider, connect } from "react-redux";
 import { useLocation } from "react-router-dom";
 import ProductInfo from "./ProductInfo";
function IphoneProducts() {
  function promiseReducer(state, { type, status, name, payload, error }) {
    if (state === undefined) {
      return {};
    }

    if (type === "PROMISE") {
      return {
        ...state,
        [name]: { status, payload, error },
      };
    }

    return state;
  }

  const actionPending = (name) => ({
    type: "PROMISE",
    status: "PENDING",
    name,
  });
  const actionFulfilled = (name, payload) => ({
    type: "PROMISE",
    status: "FULFILLED",
    name,
    payload,
  });
  const actionRejected = (name, error) => ({
    type: "PROMISE",
    status: "REJECTED",
    name,
    error,
  });
  const actionPromise = (name, promise) => async (dispatch) => {
    dispatch(actionPending(name));
    try {
      let payload = await promise;
      dispatch(actionFulfilled(name, payload));
      return payload;
    } catch (err) {
      dispatch(actionRejected(name, err));
    }
  };

  let gql = (url, query, variables) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ query, variables }),
    }).then((res) => res.json());

  const store = createStore(promiseReducer, applyMiddleware(thunk));
  store.dispatch(
    actionPromise(
      "iphoneData",
      gql(
        "http://shop-roles.node.ed.asmer.org.ua/graphql",
        `query catById($q:String){
      CategoryFindOne(query:$q){
        _id name 
        goods{
          _id name images{
            url
          }
          description price 
        }
      }
    }`,
        { q: JSON.stringify([{ _id: "62c9472cb74e1f5f2ec1a0d4" }]) }
      )
    )
  );
  const ProductsIphone = connect((state) => ({
    data: state.iphoneData.payload,
  }))(Products);
  const ProductsIphoneInfo = connect((state) => ({
    data: state.iphoneData.payload,
  }))(ProductInfo);
  const location = useLocation();
  if (location.pathname === "/iphone") {
    return (
      <Provider store={store}>
        <ProductsIphone />
      </Provider>
    );
  }
  return (
    <Provider store={store}>
      <ProductsIphoneInfo />
    </Provider>
  );
}
export default IphoneProducts;