<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { fetchOne, getImages } from '@abcnews/terminus-fetch';
  import url2cmid from '@abcnews/url2cmid';
  import { getReadableProgressStore } from '@abcnews/progress-utils';

  let root: HTMLDivElement;
  let images: Promise<ReturnType<typeof getImages>[]>;
  let progress: ReturnType<typeof getReadableProgressStore>;
  let container: HTMLDivElement;
  let imageCount = 0;
  let zone = 0;
  let percentageInZone = 0;

  $: if (container) {
    progress = getReadableProgressStore('fader', {
      indicatorSelector: '.fader'
    });
  }

  $: if ($progress) {
    ({ zone, percentageInZone } = calculatePercentageInZone($progress.envelope, 4));
  }

  const renditionsByRatio = (image: ReturnType<typeof getImages>) => {
    const result: { [key: string]: { width: number; height: number; url: string }[] } = {};
    return image.renditions.reduce((res, rendition) => {
      if (!rendition.isUndersizedBinary) {
        res[rendition.ratio] = res[rendition.ratio] || [];
        res[rendition.ratio].push(rendition);
      }
      return res;
    }, result);
  };

  const calculatePercentageInZone = (value: number, zones: number) => {
    if (value < 0 || value > 1) {
      throw new Error('Value must be in the range 0 to 1');
    }

    if (zones <= 0) {
      throw new Error('Number of zones must be greater than 0');
    }

    // Calculate the width of each zone
    const zoneWidth = 1 / zones;

    // Determine which zone the value belongs to
    const zoneIndex = Math.floor(value / zoneWidth);

    // Calculate the lower boundary of the current zone
    const lowerBoundary = zoneIndex * zoneWidth;

    // Calculate the percentage within the current zone
    const percentageInZone = (value - lowerBoundary) / zoneWidth;

    return {
      zone: zoneIndex + 1, // Zone numbers start at 1
      percentageInZone: percentageInZone
    };
  };

  onMount(async () => {
    const parent = root.parentElement;
    if (parent) {
      const others = Array.from(parent.children).filter(d => d !== root);
      const imageDocs = others
        .map(d => {
          d.remove();

          const href = d.querySelector('a')?.getAttribute('href');
          return href ? url2cmid(href) : null;
        })
        .filter(d => typeof d === 'string')
        .map(id => fetchOne(id));

      images = Promise.all(imageDocs).then(d => d.map(dd => getImages(dd)));
      images.then(d => (imageCount = d.length));
    }
  });
</script>

<div bind:this={root} class="fader" style:height={`calc(100dvh * ${imageCount})`}>
  {#if images}
    {#await images then images}
      <div class="container" bind:this={container}>
        {#each images as image, i}
          {@const ratios = renditionsByRatio(image)}

          <picture style:opacity={i === 0 ? 1 : zone < i ? 0 : zone > i ? 1 : percentageInZone}>
            {#each Object.entries(ratios) as [ratio, renditions] (ratio)}
              <source
                media="(min-aspect-ratio: {ratio === '9x16' ? '0' : ratio.replace('x', '/')})"
                srcset={renditions
                  .map(({ url, width }, i, arr) => `${url}${i < arr.length - 1 ? ` ${width}w` : ''}`)
                  .join(',')}
                sizes="100vw"
              />
              {#if ratio === '1x1'}
                <img alt={image.alt} src={renditions[renditions.length - 1].url} />
              {/if}
            {/each}
          </picture>
        {/each}
      </div>
    {/await}
  {/if}
</div>

<style>
  :global(body) {
    overflow: visible;
  }
  .fader {
    position: relative;
    width: calc(100vw - 20px);
    margin-left: calc(-50vw + 10px + 50%);
  }

  .container {
    height: 100dvh;
    position: sticky;
    top: 0;
  }

  picture img {
    object-fit: cover;
    position: absolute;
    top: 10px;
    left: 0px;
    border-radius: var(--sl-border-radius);
    width: 100%;
    height: calc(100dvh - 20px);
    display: block;
  }
</style>
