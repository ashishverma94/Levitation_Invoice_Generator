import http from "./httpService";
import {server } from "../server";

const apiURL = `${server}/data/get-pdf`;
const pdfService = {
  downloadPDF: function () {
    return http.get(apiURL, {
      responseType: "blob",
      headers: {
        Accept: "application/pdf",
      },
    });
  },
};

export default pdfService;
