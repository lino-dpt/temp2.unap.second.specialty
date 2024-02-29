import {
  PostulantInitPreInscription,
  PostulantPreInscription,
} from "@/types/postulantTypes";
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
  //documents/preinscription

  async storePreinscriptionFiles(data: PostulantPreInscription) {
    // "fileDocument": "[object File]",
    // "photoAvatar": "[object File]"
    // const formData = new FormData();
    // formData.append("fileDocument", data.fileDocument);
    // formData.append("photoAvatar", data.photoAvatar);
    // formData.append("postulantId", data.postulantId);
    // formData.append("documentNumber", data.postulantId);
    // formData.append("specialty", data.specialty);

    const response = await this.http.post("/documents/preinscription", data, {
      headers: {
        //quitar =>  strict-origin-when-cross-origin
        //header para enviar un archivo en base64

        "Content-Type": "application/json",
      },
    });

    return response.data;
  }
}
