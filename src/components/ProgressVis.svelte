<script lang="ts">
  export let words: number;
  export let articleTotal: number;
  export let termsTotal: number;

  const BLOCKS = 100;
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
  <div class="story square" style="--side: {Math.ceil(Math.sqrt(scale(articleTotal)))}px;">
    {#each new Array(100) as _, i}
      <div class="unit" class:filled={i <= words / wordsPerBlock}></div>
    {/each}
  </div>
  <div
    class="terms square"
    style="--side: {Math.ceil(Math.sqrt(scale(termsTotal)))}px; --side-count: {Math.ceil(
      Math.sqrt(termsTotal / (articleTotal / 100))
    )};"
  >
    {#each new Array(Math.ceil(termsTotal / (articleTotal / 100))) as _, i}
      <div class="unit" class:filled={i <= words / wordsPerBlock}></div>
    {/each}
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-end;
  }

  .unit {
    background: rgba(0, 0, 0, 0.2);
  }

  .unit.filled {
    background-color: #fff;
  }

  .square {
    display: grid;
    gap: 1px;
    width: var(--side);
    height: var(--side);
    position: relative;
    box-sizing: content-box;
    background-color: #fdb39d66;
    grid-template-columns: repeat(10, 1fr);
  }

  .terms {
    grid-template-columns: repeat(var(--side-count), 1fr);
    margin-top: calc(var(--side) / var(--side-count) * 2);
  }
</style>
