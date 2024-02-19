import axios, { AxiosInstance } from "axios";
//PostulantInitPreInscription
import { PostulantInitPreInscription } from "../types/postulantTypes";
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
}
