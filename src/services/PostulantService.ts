import axios, { AxiosInstance } from "axios";
//PostulantInitPreInscription
import { PostulantInitPreInscription, PostulantPreInscription } from "../types/postulantTypes";
export default class PostulantService {
  public http: AxiosInstance;
  constructor() {
    const url: string = import.meta.env.VITE_URL_API_POSTULANT;
    this.http = axios.create({
      baseURL: url,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  //inicializar la preinscripcion
  async initzializePreinscription(data: PostulantInitPreInscription) {
    const formData = new FormData();
    formData.append("documentType", data.documentType);
    formData.append("documentNumber", data.documentNumber);
    formData.append("paymentId", data.paymentId);
    formData.append("paymentDate", data.paymentDate);
    const response = await this.http.post(
      "initzialize-preinscription",
      formData
    );
    console.log("response", response);

    return response.data;
  }

  //obtener la preinscripcion
  async getPreinscription(hash: string) {
    const response = await this.http.get(`get-preinscription/${hash}`);
    return response.data;
  }

  //search-by-document
  async searchByDocument(documentType: string, documentNumber: string) {
    const response = await this.http.get(
      `search-by-document/${documentType}/${documentNumber}`
    );
    console.log("response", response);
    // si la data es
    return response.data ?? null;
  }

  //save-preinscription
  async storePostulant(data: PostulantPreInscription) {
    
    const response = await this.http.post("postulants/preinscription", data);

    console.log("response", response);
    return response.data;

  }


}
