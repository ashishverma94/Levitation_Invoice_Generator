import axios from "axios";
import { server } from "../../server";

// load product
export const loadProduct = () => async (dispatch) => {

  try {
    dispatch({
      type: "LoadProductRequest",
    });
    const { data } = await axios.get(`${server}/product/get-products`);
    dispatch({
      type: "LoadProductSuccess",
      payload: data.allProducts,
    });
  } catch (error) {
    dispatch({
      type: "LoadProductFail",
      payload: error.response.data.message,
    });
  }
};
