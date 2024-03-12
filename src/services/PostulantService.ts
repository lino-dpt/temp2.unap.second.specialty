import axios, { AxiosInstance } from "axios";
//PostulantInitPreInscription
import {
  PostulantInitPreInscription,
  PostulantPreInscription,
} from "../types/postulantTypes";
export default class PostulantService {
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
  async startPreinscription(data: PostulantInitPreInscription) {
    const response = await this.http.post("start-preinscription", data);
    return response.data;
  }
  //buscar postulante por Numero de documento
  // Route::get('search-postulant-by-document', [PostulantController::class, 'searchPostulantByDocument']);
  async searchPostulantByDocument(
    documentType: string,
    documentNumber: string
  ) {
    const response = await this.http.get(`search-postulant-by-document`, {
      params: { documentNumber, documentType },
    });
    return response.data;
  }

  //buscar postulante por Id
  // Route::get('search-postulant-by-id', [PostulantController::class, 'searchPostulantById']);
  async searchPostulantById(id: string) {
    const response = await this.http.get(`search-postulant-by-id/${id}`);
    return response.data;
  }

  async storePostulant(data: PostulantPreInscription) {
    const response = await this.http.post(`store-postulant`, data);
    return response.data;
  }

  //eliminar postulante
  // Route::delete('delete-postulant', [PostulantController::class, 'deletePostulant']);
  async deletePostulant(id: string) {
    const response = await this.http.delete(`delete-postulant/${id}`);
    return response.data;
  }


}
