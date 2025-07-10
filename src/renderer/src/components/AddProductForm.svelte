<script>
  const entry = {
    barCode: '',
    name: ''
  }

  // Campi rimossi per snellire il db: solo barCode e name
  let error = ''
  let success = false
  let step = 'barcode' // 'barcode', 'add', 'update'
  let existingProduct = null
  // Quantità non gestita nel db minimal

  async function checkBarcode(e) {
    e?.preventDefault()
    error = ''
    success = false
    if (!entry.barCode) {
      error = 'Inserisci un BarCode'
      return
    }
    try {
      const product = await window.api.product.getById(entry.barCode)
      if (product) {
        existingProduct = product
        step = 'update'
        console.log('Prodotto trovato:', product)
      } else {
        step = 'add'
      }
    } catch (e) {
      error = 'Errore nella verifica del BarCode: ' + e.message
    }
  }

  async function handleAddSubmit(e) {
    e.preventDefault()
    error = ''
    success = false
    if (!entry.barCode || !entry.name) {
      error = 'BarCode e Nome sono obbligatori'
      return
    }
    try {
      const result = await window.api.product.add(entry)
      if (result) {
        success = true
        const event = new CustomEvent('productAdded', { detail: entry })
        dispatchEvent(event)
        resetForm()
      } else {
        error = "Errore durante l'inserimento."
      }
    } catch (e) {
      error = 'Errore: ' + e.message
    }
  }

  // Funzione update rimossa: la gestione quantità non è presente nel db minimal

  function resetForm() {
    entry.barCode = ''
    entry.name = ''
    step = 'barcode'
    existingProduct = null
  }
</script>

{#if step === 'barcode'}
  <form
    onsubmit={(e) => {
      checkBarcode(e)
      console.log('Form submitted, checking barcode')
    }}
    class="product-form"
  >
    <div>
      <label
        >BarCode* <input
          bind:value={entry.barCode}
          required
          onkeydown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              checkBarcode(e)
              console.log('Enter pressed, checking barcode')
            }
          }}
        /></label
      >
    </div>
    <button type="submit">Verifica</button>
    {#if error}
      <div class="error">{error}</div>
    {/if}
  </form>
{:else if step === 'add'}
  <form onsubmit={handleAddSubmit} class="product-form">
    <div>
      <label>BarCode* <input value={entry.barCode} readonly /></label>
    </div>
    <div>
      <label>Nome* <input bind:value={entry.name} required /></label>
    </div>
    <button type="submit">Aggiungi prodotto</button>
    {#if error}
      <div class="error">{error}</div>
    {/if}
    {#if success}
      <div class="success">Prodotto aggiunto!</div>
    {/if}
  </form>
{:else if step === 'update'}
  <div class="product-form">
    <div>
      <label>BarCode <input value={entry.barCode} readonly /></label>
    </div>
    <div>
      <span>Prodotto già presente: <b>{existingProduct.name}</b></span>
    </div>
    <div class="info">Prodotto già presente nel database. Nessuna azione necessaria.</div>
    <button type="button" onclick={resetForm}>Annulla</button>
  </div>
{/if}

<style>
  .product-form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    max-width: 400px;
  }
  .product-form label {
    display: flex;
    flex-direction: column;
    font-weight: bold;
  }
  .product-form input {
    margin-top: 0.2rem;
    padding: 0.3rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: #2d8fdd;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  button:hover {
    background: #1867b0;
  }
  .error {
    color: #b00020;
    margin-top: 0.5rem;
  }
  .success {
    color: #2e7d32;
    margin-top: 0.5rem;
  }
</style>
