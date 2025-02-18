<script lang="ts">
  import { scrollDirection } from '../utils';
  export let total: number; // Total number of circles
  export let progress: number; // Filled circles
  export let cellSize = 10;
  export let gap = 2;
  export let stroke = 1;
  export let animationDelay = 200; // ms

  let sideCount = 0;
  $: sideCount = Math.ceil(Math.sqrt(total));
</script>

<svg
  width="100%"
  height="100%"
  viewBox={`0 0 ${sideCount * (cellSize + gap) - gap} ${sideCount * (cellSize + gap) - gap}`}
>
  {#each new Array(sideCount) as _, i}
    {#each new Array(sideCount) as _, j}
      {#if i * sideCount + j < total}
        <circle
          cx={j * (cellSize + gap) + cellSize / 2}
          cy={i * (cellSize + gap) + cellSize / 2}
          r={cellSize / 2 - stroke}
          class:filled={i * sideCount + j < progress}
          style="transition-delay: {$scrollDirection === 'down'
            ? animationDelay * (i * sideCount + j)
            : animationDelay * (progress - (i * sideCount + j))}ms"
        />
      {/if}
    {/each}
  {/each}
</svg>

<style>
  svg {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    max-height: 100%;
  }

  circle {
    fill: transparent;
    transition: fill 0.5s;
    stroke: white;
    stroke-width: 1;
  }

  circle.filled {
    fill: white;
  }
</style>
