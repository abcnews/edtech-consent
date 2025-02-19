<script>
  import monkey from './monkey-optimised.svg';

  const stickers = { monkey };

  export let name;
</script>

{#if stickers[name]}
  <img src={stickers[name]} alt="" class="sticker" role="none" />
{/if}

<style>
  img {
    display: block;
    margin: 0 auto;
    max-width: 200px;
  }
</style>
