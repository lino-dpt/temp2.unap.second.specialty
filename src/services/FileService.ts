import { PostulantInitPreInscription } from "@/types/postulantTypes";
import axios, { AxiosInstance } from "axios";
export default class FileService {
  public http: AxiosInstance;
  constructor() {
    const url: string = import.meta.env.VITE_URL_API_FILE;
    this.http = axios.create({
      baseURL: url,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  //subir archivo
  async store(data: PostulantInitPreInscription) {
    const formData = new FormData();
    formData.append("paymentVoucher", data.paymentVoucher);
    formData.append("postulantId", data.postulantId);
    formData.append("paymentId", data.paymentId);
    formData.append("paymentDate", data.paymentDate);

    const response = await this.http.post("/documents", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
}
