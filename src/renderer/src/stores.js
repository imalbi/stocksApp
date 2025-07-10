// In src/renderer/stores.js
import { writable } from 'svelte/store'

// Crea uno store "writable" che conterrà l'array dei prodotti.
// Inizialmente è un array vuoto.
export const productList = writable([])
