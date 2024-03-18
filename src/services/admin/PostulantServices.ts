import axios from "axios";




const url: string = import.meta.env.VITE_URL_API_BASE as string;

const http = axios.create({
    baseURL: url,
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
    },
});

export const getPostulantsList = async () => { };

export const getPostulantsGenerals = async (id: string) => {

    const response = await http.get("postulants/generals/" + id);

    return response.data;

};

// Route::get('postulants/evaluation/{id}', [PostulantController::class, 'getEvaluation'])->middleware('auth:sanctum');
export const getEvaluation = async (id: string) => {
    const response = await http.get("postulants/evaluation/" + id);
    // console.log('getEvaluation', response.data);

    return response.data;

};
//initEvaluation
export const initEvaluation = async (data: any) => {
    const response = await http.post("postulants/evaluation", data);
    return response.data;
};
// Route::post('postulants/evaluation-detail', [CVEvaluationDetailController::class, 'storeDetail'])->middleware('auth:sanctum');
export const storeDetail = async (data: any) => {
    const response = await http.post("postulants/evaluation-detail", data);
    return response.data;
};

export const minusYerOfExperience = async (data: any) => {
    const response = await http.post("postulants/experience/minus", data);
    return response.data;
}

export const addYerOfExperience = async (data: any) => {
    const response = await http.post("postulants/experience/add", data);
    return response.data;
}

export const removeEvaluation = async (id: string) => {
    const response = await http.delete("postulants/evaluation/" + id);
    return response.data;
}


export const getPostulantsCV = async () => { };
