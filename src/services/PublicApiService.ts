import axios, { AxiosInstance } from "axios";

export default class PublicApiService {
  public http: AxiosInstance;
  constructor() {
    const url: string = import.meta.env.VITE_URL_API_UNAP;
    this.http = axios.create({
      baseURL: url,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async _DocumentTypes() {
    let response = await this.http.get("/TYPE_DOCUMENTS/v1/sunedu/");
    console.log("document types", response.data);

    return response.data;
  }

  //ubigeo de la reniec
  //https://api.unap.edu.pe/PLACES/v1/departments/
  //https://api.unap.edu.pe/PLACES/v1/provinces/<ID de Región (2 dígitos)>/
  //https://api.unap.edu.pe/PLACES/v1/districts/<ID de Provincia (4 dígitos)>/
  //
  async _Provinces(departmentCode: string) {
    let response = await this.http.get(
      `/PLACES/v1/provinces/${departmentCode}/`
    );
    return response.data.data;
  }

  async _Districts(provinceCode: string) {
    let response = await this.http.get(`/PLACES/v1/districts/${provinceCode}/`);
    return response.data.data;
  }
}
