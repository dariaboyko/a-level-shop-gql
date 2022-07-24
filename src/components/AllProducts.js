import Products from "./Products";
import { createStore, applyMiddleware } from "redux";
import { useLocation } from "react-router-dom";
import thunk from "redux-thunk";
import { Provider, connect } from "react-redux";
import ProductInfo from "./ProductInfo";
function AllProducts() {
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
      "data",
      gql(
        "http://shop-roles.node.ed.asmer.org.ua/graphql",
        `query cats($q:String){
            CategoryFind(query:$q){
                _id name
                goods{
                     _id name images{
                    url
                }
                description price 
            }
        }}`,
        { q: JSON.stringify([{}]) }
      )
    )
  );
  const AllProducts = connect((state) => ({
    data: state.data.payload,
  }))(Products);
  const AllProductsInfo = connect((state) => ({
    data: state.data.payload,
  }))(ProductInfo);
  const location = useLocation();
  if (location.pathname === "/all") {
    return (
      <Provider store={store}>
        <AllProducts />
      </Provider>
    );
  }
  return <Provider store={store}><AllProductsInfo /></Provider>;
}
export default AllProducts;
