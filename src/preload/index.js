import { contextBridge, ipcRenderer } from 'electron'

// Espone solo le API custom necessarie al renderer
const product = {
  add: (data) => ipcRenderer.invoke('db:addProduct', data),
  getAll: () => ipcRenderer.invoke('db:getAllProducts'),
  getById: (barCode) => ipcRenderer.invoke('db:getProductById', barCode)
  // ...altre funzioni come updateQuantity
}

const api = { product }

api.onDbUpdate = (callback) => {
  // Usa ipcRenderer.on (non .handle) per ascoltare eventi in arrivo.
  // Quando arriva un messaggio sul canale 'db-updated',
  // esegui la funzione di callback che ti è stata passata dal codice Svelte.
  ipcRenderer.on('db-updated', (event, ...args) => callback(...args))
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.api = api
}
