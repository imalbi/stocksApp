<script>
  import AddProductForm from './components/AddProductForm.svelte'
  import DbList from './components/DbList.svelte'
  import NavBar from './components/NavBar.svelte'
  import { productList } from './stores.js' // Store per i prodotti

  // Funzione per caricare i prodotti
  async function loadProducts() {
    console.log('Fetching products...')
    const products = await window.api.product.getAll()
    productList.set(products) // Aggiorna lo store con i nuovi dati
  }

  //Effect per gestire il ciclo di vita
  $effect(() => {
    // Esegui il caricamento iniziale la prima volta
    loadProducts()

    // Listen per gli aggiornamenti dal processo main.
    // loadProducts verrà eseguita ogni volta
    // che il main invia il messaggio 'db-updated'.
    const unsubscribe = window.api.onDbUpdate(() => {
      console.log('Received db-updated notification! Reloading...')
      loadProducts()
    })

    // La funzione di cleanup di $effect è perfetta per rimuovere il listener
    // quando il componente viene distrutto, evitando memory leak.
    return () => {
      console.log('Cleaning up db update listener...')
      unsubscribe()
    }
  })
</script>

<NavBar />
<DbList />
<AddProductForm />
