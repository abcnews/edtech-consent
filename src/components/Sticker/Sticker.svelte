<script>
  import monkey from './monkey-optimised.svg';
  import pencil from './pencil-optimised.svg';
  import scribble from './scribble-optimised.svg';
  import sunlion from './sunlion-optimised.svg';
  import rainbow from './rainbow-optimised.svg';

  import bagtag from './bagtag.png';
  import doubleendedpencil from './doubleendedpencil.png';
  import orangepencil from './orangepencil.png';
  import outlinedshavings from './outlinedshavings.png';
  import protractor from './protractor.png';
  import ruler from './ruler.png';
  import scissors from './scissors.png';
  import scribblescissors from './scribblescissors.png';
  import shavings from './shavings.png';
  import sunlionbagtag from './sunlionbagtag.png';

  const stickers = {
    monkey,
    pencil,
    scribble,
    sunlion,
    rainbow,
    bagtag,
    doubleendedpencil,
    orangepencil,
    outlinedshavings,
    protractor,
    ruler,
    scissors,
    scribblescissors,
    shavings,
    sunlionbagtag
  };

  export let name;
</script>

{#if stickers[name]}
  <img src={stickers[name]} alt="" class="sticker" role="none" />
{/if}

<style>
  img {
    display: block;
    margin: 0 auto;
    max-width: 600px;
    max-height: 200px;
  }
</style>
