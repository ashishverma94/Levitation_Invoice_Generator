import React from "react";

const InvoiceRow = ({ pName, pQty, pRate }) => {
  return (
    <div className="w-full ml-4 text-[15px] font-[400] flex items-center mb-1  h-[40px] ">
      <div className="w-[30%] ml-3 ">{pName}</div>
      <div className="w-[20%] text-[blue]">{pQty}</div>
      <div className="w-[20%]">{pRate}</div>
      <div className="w-[30%] ml-2">INR {pRate * pQty}</div>
    </div>
  );
};

export default InvoiceRow;
