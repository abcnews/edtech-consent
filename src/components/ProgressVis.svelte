<script lang="ts">
  export let words: number;
  export let articleTotal: number;
  export let termsTotal: number;
  export let text: string = '';

  const BLOCKS = 25;
  const wordsPerBlock = articleTotal / BLOCKS;

  function createLinearScale(domain: [number, number], range: [number, number] = [0, 1], clamp: boolean = false) {
    return (value: number) => {
      if (domain[0] === domain[1] || range[0] === range[1]) {
        return range[0];
      }

      const ratio = (range[1] - range[0]) / (domain[1] - domain[0]),
        result = range[0] + ratio * (value - domain[0]);

      return clamp ? Math.min(range[1], Math.max(range[0], result)) : result;
    };
  }

  const scale = createLinearScale([0, termsTotal], [0, 100000]);
</script>

<div class="container">
  <div class="label-this-story"><span>This story</span></div>
  <div
    class="story square"
    style="--side: {Math.ceil(Math.sqrt(scale(articleTotal)))}px; --side-count: {Math.sqrt(BLOCKS)}"
  >
    {#each new Array(BLOCKS) as _, i}
      <div class="unit" style="transition-delay: {100 * i}ms" class:filled={i <= words / wordsPerBlock}></div>
    {/each}
  </div>
  <p class="note">{text}</p>
  <div class="label-terms"><span>ClassDojo Terms and Privacy Policy</span></div>
  <div
    class="terms square"
    style="--side: {Math.ceil(Math.sqrt(scale(termsTotal)))}px; --side-count: {Math.ceil(
      Math.sqrt(termsTotal / (articleTotal / BLOCKS))
    )};"
  >
    {#each new Array(Math.ceil(termsTotal / (articleTotal / BLOCKS))) as _, i}
      <div class="unit" class:filled={i <= words / wordsPerBlock}></div>
    {/each}
  </div>
</div>

<style>
  .container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(10, 10%);
    grid-template-rows: auto auto auto;
    grid-template-areas:
      'a a b b b b b b b b'
      'c c c c c c c c c c'
      'd d d d d d d d d d';
  }

  .square {
    display: grid;
    gap: 1px;
    position: relative;
    box-sizing: content-box;
    background-color: #fdb39d66;
    grid-template-columns: repeat(var(--side-count), 1fr);
    grid-auto-rows: 1fr;
  }

  .square::before {
    content: '';
    width: 0;
    padding-bottom: 100%;
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  .square > *:first-child {
    grid-row: 1 / 1;
    grid-column: 1 / 1;
  }

  .unit {
    background: rgba(0, 0, 0, 0.2);
    transition-duration: 100ms;
    transition-property: background-color;
  }

  .unit.filled {
    background-color: #fff;
  }

  .story {
    grid-area: a;
    /* border: 1px solid blue; */
  }

  .label-this-story {
    grid-area: b;
    /* border: 1px solid red; */
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 1em;
  }

  .label-this-story span::before {
    content: '← ';
  }

  .note {
    grid-area: c;
    /* border: 1px solid green; */
  }

  .terms {
    grid-area: d;
    grid-template-columns: repeat(var(--side-count), 1fr);
    position: relative;
    /* border: 1px solid yellow; */
  }

  .label-terms {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    grid-area: d;
    /* border: 1px solid purple; */
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @container (min-aspect-ratio: 1 / 2) {
    .container {
      grid-template-areas:
        'a b b b b b b b b b'
        'c c c c c c c c c c'
        'd d d d d e e e e e';
    }

    .label-terms {
      grid-area: e;
      position: unset;
    }

    .label-terms span::before {
      content: '← ';
      margin-left: 1em;
    }
  }

  @container (min-aspect-ratio: 1) {
    .container {
      grid-template-rows: auto 1fr auto;
      grid-template-areas:
        'a b b b b d d d d d'
        'e e e e e d d d d d'
        'c c c c c c c c c c';
    }

    .label-terms {
      grid-area: e;
      position: unset;
    }

    .label-terms span::before {
      content: '';
      margin-left: 0;
    }
    .label-terms span::after {
      content: ' →';
      margin-right: 1em;
    }
  }
</style>
