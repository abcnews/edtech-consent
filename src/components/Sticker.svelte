<script>
  import monkey from './monkey-optimised.svg';

  const stickers = { monkey };

  export let name;
</script>

<img src={stickers[name]} alt="Sticker" class="sticker" />

<style>
  img {
    display: block;
    margin: 0 auto;
    max-width: 200px;
  }
</style>
