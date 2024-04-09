import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3001",
  responseType: "json",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export async function list_ServiceDefinitions(){
    const response = await API.get("/service-definitions");
    return response.data;
}

export async function get_ServiceDefinition(id: string){
    const response = await API.get(`/service-definitions/${id}`);
    return response.data;
}

export async function list_vehicleTypes(){
    const response = await API.get("/vehicle-types");
    return response.data;
}

export async function get_vehicleType(id: string){
    const response = await API.get(`/vehicle-types/${id}`);
    return response.data;
}

export async function list_Clients(){
    const response = await API.get("/clients");
    return response.data;
}

export async function get_Client(id: string){
    const response = await API.get(`/clients/${id}`);
    return response.data;
}

export async function list_Services(){
    const response = await API.get("/services");
    return response.data;
}

export async function get_Service(id: string){
    const response = await API.get(`/services/${id}`);
    return response.data;
}
