<script lang="ts">
  export let words: number;
  export let articleTotal: number;
  export let termsTotal: number;

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

  const scale = createLinearScale([0, termsTotal], [0, 190000]);
</script>

<div class="container">
  <div style="--side: {Math.sqrt(scale(articleTotal))}px;" class="square">
    <div style="--side: {Math.sqrt(scale(words))}px;"></div>
  </div>

  <div style="--side: {Math.sqrt(scale(termsTotal))}px;" class="square">
    <div style="--side: {Math.sqrt(scale(words))}px;"></div>
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-end;
  }
  .square {
    width: var(--side);
    height: var(--side);
    position: relative;
    box-sizing: content-box;
    background-color: #fdb39d66;
  }

  .square div {
    position: absolute;
    bottom: 0;
    left: 0;
    width: var(--side);
    height: var(--side);
    background-color: antiquewhite;
  }
</style>
