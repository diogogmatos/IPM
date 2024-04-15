import axios from 'axios'
import * as types from './types'

const API = axios.create({
  baseURL: 'http://localhost:3001',
  responseType: 'json',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
})

export async function list_ServiceDisplay() {
  const services = await list_Services()
  const serviceDefinitions = await list_ServiceDefinitions()
  const vehicles = await list_Vehicles()
  const clients = await list_Clients()

  const display: types.ServiceDisplay[] = []
  for (const id in services) {
    const service = services[id]
    const serviceDefinition = serviceDefinitions[service['service-definitionId']]
    const vehicle = vehicles[service.vehicleId]
    const client = clients[vehicles[service.vehicleId].clientId]

    display.push({
      id: service.id,
      title: serviceDefinition.descr,
      time: serviceDefinition.duração,
      status: service.estado,
      notes: service.notas,
      motive: service.motivo,
      aditional_services: service['serviços-adicionais'],
      date:
        service.data &&
        new Date(
          service.data.ano,
          service.data.mes,
          service.data.dia,
          service.data.hora,
          service.data.minutos
        ),
      description: service.descrição,
      client_name: client.nome,
      client_email: client.email,
      client_phone: client.telefone,
      vehicleId: vehicle.id,
      vehicle_type: vehicle['vehicle-typeId'],
      vehicle_torque: vehicle.cilindrada,
      vehicle_power: vehicle.potencia,
      vehicle_kms: vehicle.kms
    })
  }

  return display
}

export async function get_ServiceDisplay(id: string) {
  const service = await get_Service(id)
  const serviceDefinition = await get_ServiceDefinition(service['service-definitionId'])
  const vehicle = await get_Vehicle(service.vehicleId)
  const client = await get_Client(vehicle.clientId)

  return {
    id: service.id,
    title: serviceDefinition.descr,
    time: serviceDefinition.duração,
    status: service.estado,
    notes: service.notas,
    motive: service.motivo,
    aditional_services: service['serviços-adicionais'],
    date:
      service.data &&
      new Date(
        service.data.ano,
        service.data.mes,
        service.data.dia,
        service.data.hora,
        service.data.minutos
      ),
    description: service.descrição,
    client_name: client.nome,
    client_email: client.email,
    client_phone: client.telefone,
    vehicleId: vehicle.id,
    vehicle_type:
      vehicle['vehicle-typeId'].charAt(0).toUpperCase() + vehicle['vehicle-typeId'].slice(1),
    vehicle_torque: vehicle.cilindrada,
    vehicle_power: vehicle.potencia,
    vehicle_kms: vehicle.kms
  }
}

export async function list_ServiceDefinitions() {
  const response = await API.get('/service-definitions')
  const data: types.ServiceDefinition[] = response.data
  const dict: types.ServiceDefinitionDict = {}
  data.forEach((item) => {
    dict[item.id] = item
  })
  return dict
}

export async function get_ServiceDefinition(id: string) {
  const response = await API.get(`/service-definitions/${id}`)
  const data: types.ServiceDefinition = response.data
  return data
}

export async function list_Vehicles() {
  const response = await API.get('/vehicles')
  const data: types.Vehicle[] = response.data
  const dict: types.VehicleDict = {}
  data.forEach((item) => {
    dict[item.id] = item
  })
  return dict
}

export async function get_Vehicle(id: string) {
  const response = await API.get(`/vehicles/${id}`)
  const data: types.Vehicle = response.data
  return data
}

export async function list_Clients() {
  const response = await API.get('/clients')
  const data: types.Client[] = response.data
  const dict: types.ClientDict = {}
  data.forEach((item) => {
    dict[item.id] = item
  })
  return dict
}

export async function get_Client(id: string) {
  const response = await API.get(`/clients/${id}`)
  const data: types.Client = response.data
  return data
}

export async function list_Services() {
  const response = await API.get('/services')
  const data: types.Service[] = response.data
  const dict: types.ServiceDict = {}
  data.forEach((item) => {
    dict[item.id] = item
  })
  return dict
}

export async function get_Service(id: string) {
  const response = await API.get(`/services/${id}`)
  const data: types.Service = response.data
  return data
}
