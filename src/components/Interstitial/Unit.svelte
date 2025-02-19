<script lang="ts">
  import { scrollDirection } from '../../utils';
  export let total: number; // Total number of units
  export let progress: number; // Filled units
  export let cellSize = 10;
  export let gap = 1;
  export let animationDelay = 200; // ms
  export let fill = '#fff';

  let sideCount = 0;
  $: sideCount = Math.ceil(Math.sqrt(total));
</script>

<svg
  width="100%"
  height="100%"
  viewBox={`0 0 ${sideCount * (cellSize + gap) - gap} ${sideCount * (cellSize + gap) - gap}`}
  style="--fill: {fill};"
>
  {#each new Array(sideCount) as _, i}
    {#each new Array(sideCount) as _, j}
      {#if i * sideCount + j < total}
        <rect
          shape-rendering="geometricPrecision"
          color-rendering="optimizeQuality"
          x={j * (cellSize + gap)}
          y={i * (cellSize + gap)}
          width={cellSize}
          height={cellSize}
          class="unit"
          {fill}
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

  .unit {
    fill: #002866;
    transition: fill 0.5s;
    stroke: none;
    stroke-width: 0;
  }

  .unit.filled {
    fill: var(--fill, white);
  }
</style>
