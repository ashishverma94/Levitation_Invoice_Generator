import React from "react";

const ProductRow = ({ pName, pQty, pRate,index }) => {
  return (
    <div className={`${index%2 === 0 ? "bg-[#c5c3c3]":"bg-[#e6e9e6]"}  w-full  text-[19px] font-[400] flex items-center mb-1  h-[40px]`}>
      <div className="w-[30%] flex justify-center ml-3 ">{pName}</div>
      <div className="w-[20%] flex justify-center ml-4">{pQty}</div>
      <div className="w-[20%] flex justify-center ml-3">{pRate}</div>
      <div className="w-[30%] flex justify-center ml-5">INR {pQty * pRate}</div>
    </div>
  );
};

export default ProductRow;
