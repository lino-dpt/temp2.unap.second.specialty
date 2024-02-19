import axios, { AxiosInstance } from "axios";
//PostulantInitPreInscription
import { PostulantInitPreInscription } from "../types/postulantTypes";
export default class PaymentService {
  public http: AxiosInstance;
  constructor() {
    const url: string = import.meta.env.VITE_URL_API_PAYMENT;
    this.http = axios.create({
      baseURL: url,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  //inicializar la preinscripcion
  async store(data: PostulantInitPreInscription) {
    const body = {
      secuencia: data.paymentId,
      monto: data.paymentAmount,
      fecha_pago: data.paymentDate,
      image_url: data.fileId,
      id_postulante: data.postulantId,
    };
    const response = await this.http.post("/pago", body);
    return response.data;
  }
}
