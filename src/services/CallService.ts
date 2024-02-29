import axios, { AxiosInstance } from "axios";

export default class AcademicProgramService {
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

  //getAcademicProgramBySlug
  // Route::get('get-call-by-slug/{slug}', [CallController::class, 'getCallBySlug']);
  async getCallBySlug(slug: string) {
    const response = await this.http.get(`get-call-by-slug/${slug}`);
    return response.data;
  }
  //getActiveCalls
  // Route::get('get-active-calls', [CallController::class, 'getActiveCalls']);
  async getActiveCalls() {
    const response = await this.http.get(`get-active-calls`);
    return response.data;
  }
}
