export type ServiceDisplay = {
  id: string
  title: string
  time: number
  status: string
  date: Date
  description: string
  client_name: string
  client_email: string
  client_phone: string
  vehicleId: string
  vehicle_type: string
  vehicle_torque: number
  vehicle_power: number
  vehicle_kms: number
}

export type ServiceDefinition = {
  id: string
  descr: string
  duração: number
}

export type ServiceDefinitionDict = {
  [key: string]: ServiceDefinition
}

export type VehicleType = {
  id: string
  serviços: string[]
}

export type VehicleTypeDict = {
  [key: string]: VehicleType
}

export type Client = {
  id: string
  nome: string
  email: string
  telefone: string
}

export type ClientDict = {
  [key: string]: Client
}

export type Vehicle = {
  id: string
  clientId: string
  'vehicle-typeId': string
  cilindrada: number
  potencia: number
  kms: number
}

export type VehicleDict = {
  [key: string]: Vehicle
}

export type Service = {
  id: string
  vehicleId: string
  'service-definitionId': string
  estado: string
  data: {
    dia: number
    mes: number
    ano: number
    hora: number
    minutos: number
  }
  descrição: string
}

export type ServiceDict = {
  [key: string]: Service
}
