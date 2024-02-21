//VITE_URL_API_REGISTRATION
import {
  PostulantPreInscription,
} from "@/types/postulantTypes";
import axios, { AxiosInstance } from "axios";
export default class RegistrationService {
  public http: AxiosInstance;
  constructor() {
    const url: string = import.meta.env.VITE_URL_API_REGISTRATION;
    this.http = axios.create({
      baseURL: url,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  //registrar preinscripcion

  async store(data: PostulantPreInscription) {
    const response = await this.http.post("/registrations/", data);
    return response.data;
  }
  async searchByPostulantId(postulantId: string) {
    const response = await this.http.get(`/registrations/?Id=${postulantId}`);
    return response.data;
  }
}
