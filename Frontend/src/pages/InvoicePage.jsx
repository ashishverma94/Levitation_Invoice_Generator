import axios from "axios";
import { server } from "../server.js";
import { toast } from "react-toastify";
import Logo from "../assets/logo.png";
import { useEffect, useRef } from "react";
import Loading from "../assets/loading.gif";
import { useSelector, useDispatch } from "react-redux";
import { loadProduct } from "../redux/actions/product.js";
import InvoiceRow from "../components/ProductRow/InvoiceRow.jsx";
import pdfService from "../utils/pdfService.js";

const InvoicePage = () => {
  const ref = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadProduct());
  }, []);

  const { products, pLoading } = useSelector((state) => state.products);

  let total = 0;
  const today = new Date();
  const nextThreeDays = new Date(today.setDate(today.getDate() + 3));
  const month = nextThreeDays.getMonth() + 1;
  const year = nextThreeDays.getFullYear();
  const day = nextThreeDays.getDate();

  const downloadPDF = () => {
    try {
      return pdfService.downloadPDF().then((res) => {
        const filename = "Invoice.pdf";
        const blogobj = new Blob([res.data], {
          type: "application/pdf",
        });
        const anchorlink = document.createElement("a");
        anchorlink.href = window.URL.createObjectURL(blogobj);
        anchorlink.setAttribute("download", filename);
        anchorlink.click();
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handlePdf = () => {
    axios
      .get(`${server}/data/get-pdf`)
      .then(() => {
        downloadPDF();
        toast.success("PDF downloaded !");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };

  // react-to-print
  return (
    <>
      <div className="fixed right-0 mt-3 mr-5 border-[2px] border-[black] text-[black] rounded-[7px] text-[15px] font-[600]  hover:bg-[#878383] hover:text-[black] px-3 py-2">
        <button onClick={() => handlePdf()}>Print</button>
      </div>
      <div className="flex justify-center font-[700] text-[27px] mt-5 w-full">
        <h1> Details of invoice</h1>
      </div>
      {/* --------content--------- */}
      {pLoading === true ? (
        <div className="w-full flex justify-center h-[600px] items-center">
          <img src={Loading} alt="loading_gif" />
        </div>
      ) : (
        <div className="w-[700px] border-[black] p-3 m-auto my-5  border-[2px] ">
          <div
            ref={ref}
            className=" printContainer w-full border-[white] m-auto p-6  border-[2px]"
          >
            <div className="w-full flex justify-between items-center mt-3 ">
              <div>
                <h1 className="ml-7 text-[19px] font-[700]">
                  INVOICE GENERATOR
                </h1>
                <h1 className="ml-7 text-[12px] ">Levitation Infotech</h1>
              </div>
              <div className="flex mr-5  ">
                <div>
                  <img src={Logo} alt="logo" className="h-[37px] w-[120px]" />
                </div>
              </div>
            </div>
            <div className="mr-10">
              <div className="w-full ml-4 text-[15px] mt-8 font-[700] flex items-center mb-1  h-[40px] ">
                <div className="w-[30%] ml-3 ">Product</div>
                <div className="w-[20%]">Qty</div>
                <div className="w-[20%]">Rate</div>
                <div className="w-[30%] ml-2">Total</div>
              </div>
              <div className="w-full mt-5 h-[1.5px] bg-[#cfcdcd]"></div>

              {products &&
                products.map((item) => {
                  total += item.qty * item.rate;
                })}

              {products &&
                products.map((item, index) => {
                  return (
                    <InvoiceRow
                      key={index}
                      pName={item.name}
                      pQty={item.qty}
                      pRate={item.rate}
                    />
                  );
                })}

              <div className="w-full mt-5 h-[1.5px] bg-[#bdbbbb]"></div>
            </div>

            {/* total box  */}
            <div className="flex justify-end mr-14 mt-5">
              <div className=" w-[210px]  text-[13px]">
                <div className="flex my-1 justify-between ">
                  <span className="font-[600]">Total</span>{" "}
                  <span> INR {total}</span>
                </div>
                <div className="flex mt-2 mb-3 justify-between ">
                  <span className="">GST</span>{" "}
                  <span className="font-[100]"> 18%</span>
                </div>
                <div className="w-full mt-5 h-[2px] bg-[#bdbbbb]"></div>
                <div className="flex my-2 justify-between ">
                  <span className="font-[600]">Grand Total</span>{" "}
                  <span className="text-[blue]">
                    ₹ {(total + total * (18 / 100)).toFixed(0)}
                  </span>
                </div>
                <div className="w-full mb-2 h-[2px] bg-[#bdbbbb]"></div>
              </div>
            </div>

            <div className="ml-6 mt-7 text-[12px]">
              <span>Valid Until:</span>
              <span className="ml-2 font-[500]">
                {month}/{day}/{year}
              </span>
            </div>

            <div className="w-full rounded-full py-3 mt-[150px] bg-[black]">
              <div className="text-[white] mx-9">
                <h1 className="font-[500] text-[14px]">Terms and Conditions</h1>
                <h1 className="text-[11px]">
                  We are happy to supply any further information you may need
                  and trust that you call on us to fill your order. which will
                  reveice our prompt and careful attention.
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ------------------ */}
    </>
  );
};

export default InvoicePage;
