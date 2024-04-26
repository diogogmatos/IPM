# IPM-Project: E.S.Ideal
## Overview
This project implements a user interface for employees of ES.Ideal, a fictional service station with car workshops, 
using Vue.js for the frontend and json-server for simulating a backend API. This interface provides a central hub for
employees to manage various aspects of the service station's operations.

## Technologies Used
### **Frontend:** Vue.js 
### **Backend (Simulation):** json-server

### **Cors Everywhere**
In order to connect the _frontend_ and the _backend_ locally it´s necessary to include CORS (Cross-Origin Resource Sharing) in _backend_ requests.
For security reasons, by _default_ the _browsers_ restrict HTTP _Cross origin_ requests initiated by scripts, to allow them for development purposes, you should use this [Firefox addon](https://addons.mozilla.org/en-US/firefox/addon/cors-everywhere/).

## Setup
### Prerequisites: 
Ensure you have Node.js (version 14 or later) and npm (Node Package Manager) installed on your system. 
### Clone the Repository:
Use Git to clone this repository locally:
```
git clone https://github.com/UMinho-ENGINF-IPM/trabalho-pr-tico-grupo_02.git
```
### Install Dependencies
Navigate to the project directory and run the following command in your terminal to install the required dependencies:
```
npm install
```

## Compiling and Runnning
1. Start the json-server:
```
npm run db:serve
```
2. Navigate to the ```src``` directory and start the Vue.js application:
```
npm run dev
```

## Developed by
- Carlos Ribeiro, A100761
- Diogo Matos, A100741
- José Correia, A100610
- Júlio Pinto, A100742
- Mário Rodrigues, A100109
