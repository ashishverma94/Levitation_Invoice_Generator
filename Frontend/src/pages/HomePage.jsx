import axios from "axios";
import { server } from "../server.js";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadProduct } from "../redux/actions/product.js";
import ProductRow from "../components/ProductRow/ProductRow.jsx";

const HomePage = () => {
  const [flagRow, setFlagRow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadProduct());
  }, [flagRow]);

  const { products } = useSelector((state) => state.products);

  const navigate = useNavigate();
  const [error, setError] = useState(true);
  const [prodQty, setProdQty] = useState();
  const [errMsg, setErrMsg] = useState("");
  const [prodRate, setProdRate] = useState();
  const [prodName, setProdName] = useState("");
  const [addItemBox, setAddItemBox] = useState(false);

  const addProduct = (e) => {
    e.preventDefault();
    if (!prodName || !prodQty || !prodRate) {
      setError(true);
      setErrMsg("Fields cannot be empty!");
      return;
    }

    axios
      .post(`${server}/product/add-product`, { prodName, prodQty, prodRate })
      .then(() => {
        setFlagRow(!flagRow);
        toast.success("Product Added Successfully !");
        setProdName("");
        setProdQty("");
        setProdRate("");
        setAddItemBox(false);
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  const handlePrint = () => {
    navigate("/invoice");
  };

  const handleLogout = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(false);
        setErrMsg("");
      }, 5000);
    }
  }, [errMsg]);

  return (
    <>
      <div className="fixed cursor-pointer right-0 mt-3 mr-5 border-[2px] bg-[red] text-[white] shadow-sm rounded-[7px] text-[15px] font-[600]  hover:bg-[#878383] hover:text-[black] px-3 py-2">
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
      <div className="w-full absolute  h-[100vh]">
        <div className="w-full  pt-3 flex justify-center">
          <h1 className="font-[800] text-[40px]">Products Detail</h1>
        </div>
        <div className="flex  justify-center">
          <div className="md:w-[60%]  w-[95%] p-[9px] h-[550px]   border-[2px] border-[black]">
            {/* product qty rate total  */}
            <div className="w-full text-[20px] bg-[#171717]   text-[blue] font-[600] flex items-center mb-1  h-[40px] ">
              <div className="w-[30%] flex justify-center">Product Name</div>
              <div className="w-[20%] flex justify-center">Quantity</div>
              <div className="w-[20%] flex justify-center">Rate</div>
              <div className="w-[30%] flex justify-center">Total</div>
            </div>
            {!products ? (
              <h1 className="flex justify-center items-center h-full font-[600] text-[25px] text-gray-400">
                No Data Available
              </h1>
            ) : (
              <div className=" h-[91%] overflow-y-scroll">
                {products &&
                  products.map((item, index) => {
                    return (
                      <ProductRow
                        key={index}
                        pName={item.name}
                        pQty={item.qty}
                        pRate={item.rate}
                        index={index}
                      />
                    );
                  })}
              </div>
            )}
          </div>
        </div>
        <div className="w-full flex gap-8 justify-center pt-[20px]">
          <button
            onClick={() => setAddItemBox(true)}
            className="px-4 bg-[#355bf5] text-white hover:bg-[#6542ee] py-2 rounded-md"
          >
            Add Product
          </button>
          {products && (
            <button
              onClick={() => handlePrint()}
              className="px-4 bg-[#355bf5] text-white hover:bg-[#6542ee] py-2 rounded-md"
            >
              Print Invoice
            </button>
          )}
        </div>

        {addItemBox && (
          <div className="w-full h-screen bg-[#c1bdbd87] absolute  left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%]">
            <div className="h-[330px] border-[1px] border-[black] rounded-lg absolute shadow-sm  left-[50%] top-[50%] translate-y-[-50%] translate-x-[-50%] w-[400px] bg-[#faf8f8]">
              <div className="w-full flex justify-center text-[20px] font-[500] mt-3">
                Enter Details of New Product
              </div>
              <div className="flex items-center m-4">
                <div className="w-[40%]"> Product Name </div>
                <div className="mt-1">
                  <input
                    type="text"
                    name="name"
                    required
                    onChange={(e) => setProdName(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center m-4">
                <div className="w-[40%]"> Product Quantity </div>
                <div className="mt-1">
                  <input
                    type="number"
                    name="quantity"
                    required
                    onChange={(e) => setProdQty(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center m-4">
                <div className="w-[40%]"> Product Rate </div>
                <div className="mt-1">
                  <input
                    type="number"
                    autoComplete="rate"
                    required
                    onChange={(e) => setProdRate(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              <div className="w-full items-center h-[30px] mb-2 flex justify-center text-[14px] font-[600]">
                {error && <span className="text-[red]">{errMsg}</span>}
              </div>

              <div className=" flex gap-8 justify-center">
                <button
                  onClick={(e) => addProduct(e)}
                  className="bg-[red] w-[120px]  py-2 rounded-[10px] "
                >
                  Add Product
                </button>
                <button
                  onClick={() => setAddItemBox(false)}
                  className="bg-[red] w-[120px]  py-2 rounded-[10px] "
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default HomePage;
