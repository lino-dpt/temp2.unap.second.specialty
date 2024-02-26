import axios, { AxiosInstance } from "axios";
//PostulantInitPreInscription
import { PostulantInitPreInscription } from "../types/postulantTypes";
export default class PaymentService {
  public http: AxiosInstance;
  constructor() {
    const url: string = import.meta.env.VITE_URL_API_BASE as string;
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

  //actualizar imageUrl de un pago
  // Route::put('update-image-url/{id}', [PaymentController::class, 'updateImageUrl']);

  async updateImageUrl(id: string, imageUrl: string) {
    const response = await this.http.put(`/update-image-url/${id}`, {
      imageUrl,
    });
    return response.data;
  }

}
