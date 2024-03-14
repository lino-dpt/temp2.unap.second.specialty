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

  //inicio de sesión
  // Route::post('/sign-in', [App\Http\Controllers\Api\Auth\AuthController::class , 'signIn']);
  async signIn(credentials: { email: string; password: string }) {

    try {

      const response = await this.http.post(`sign-in`, credentials);

      if (response.data.status === true) {
        localStorage.setItem("token", response.data.token);
      }

      return response.data;
    }
    catch (error) {

      alert("Error en el inicio de sesión, verifique sus credenciales");
      return error.response.data;
    }
  }
  //current user
  // Route::get('/validate-token', [App\Http\Controllers\Api\Auth\AuthController::class , 'currentUser'])->middleware('auth:sanctum');
  async validateToken() {
    try {
      const response = await this.http.get(`validate-token`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return response.data.status;
    } catch (error) {
      return false;
    }
  }
  // Route::post('/sign-out', [App\Http\Controllers\Api\Auth\AuthController::class, 'signOut'])->middleware('auth:sanctum');
  async signOut() {
    const response = await this.http.post(`sign-out`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    localStorage.removeItem("token");
    return response.data;
  }
}
