<!-- src/renderer/src/components/DbList.svelte -->
<script>
  import { productList } from '../stores.js'
</script>

<h2>Lista Prodotti in Magazzino</h2>

<table>
  <thead>
    <tr>
      <th>Nome</th>
      <th>BarCode</th>
    </tr>
  </thead>
  <tbody>
    {#each $productList as product (product.barCode)}
      <tr>
        <td>{product.name}</td>
        <td>{product.barCode}</td>
      </tr>
    {/each}
  </tbody>
</table>
