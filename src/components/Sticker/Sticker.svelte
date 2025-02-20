<script>
  import monkey from './monkey-optimised.svg';
  import pencil from './pencil-optimised.svg';
  import scribble from './scribble-optimised.svg';
  import sunlion from './sunlion-optimised.svg';
  import rainbow from './rainbow-optimised.svg';

  const stickers = { monkey, pencil, scribble };

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
    max-height: 200px;
  }
</style>
