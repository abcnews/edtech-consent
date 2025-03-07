<script lang="ts">
  import { getReadableStateStore } from '@abcnews/progress-utils';
  import { onMount } from 'svelte';
  import ProgressVis from './ProgressVis.svelte';
  import VisIntro from './VisIntro.svelte';
  import { BLOCKS, TERM_TOTAL_WORDS } from '../../constants';
  import { sum } from '../../utils';

  const indicatorSelector = (name: string) => `[data-key="${name}"],[id^="sticker"]`;

  let state = getReadableStateStore('interstitial', {
    indicatorSelector,
    regionThreshold: 0.9,
    regionTop: 0.1,
    shouldOptimiseIndicatorTracking: false
  });
  let interstitials: { html: string; words: number }[] = [];
  let articleTotal = 0;
  let wordsPerBlock: number;

  onMount(() => {
    interstitials = Array.from(document.querySelectorAll(indicatorSelector('interstitial'))).flatMap((el, i) => {
      const parent = el.parentElement;
      if (!parent) return [];

      const children = Array.from(parent.children);
      const words = sum(children.slice(0, children.indexOf(el)), d => d.textContent?.split(' ').length || 0);
      const html = Array.from(el.children)
        .map(
          d =>
            `<p>${(d.textContent || '')
              .replace(/\s\d+\swords/, ` ${words} words`)
              .replace(
                /\s\d+\sper\scent/,
                ` ${((words / TERM_TOTAL_WORDS) * 100).toFixed(1).replace(/\.0$/, '')} per cent`
              )
              .replace('ClassDojo', '<span class="dojo">ClassDojo</span>')}</p>`
        )
        .join('');

      el.innerHTML = '';
      return [{ html, words }];
    });

    articleTotal = interstitials[interstitials.length - 1].words;
    wordsPerBlock = articleTotal / BLOCKS;
  });

  $: interstitial = typeof $state?._index !== 'undefined' ? interstitials[$state?._index] : null;
</script>

<!--
<div style="position: fixed; top: 0; left: 0; z-index: 100; background: white; padding: 12px;">
  {JSON.stringify($state, null, 2)}
</div> -->

<div class="interstitial">
  {#if interstitial && $state?.interstitial !== false}
    {#if $state?._index === 1}
      <VisIntro {wordsPerBlock} {articleTotal} readingProgress={interstitial.words} content={interstitial.html} />
    {:else}
      <ProgressVis {wordsPerBlock} {articleTotal} readingProgress={interstitial.words} content={interstitial.html} />
    {/if}
  {/if}
</div>

<style lang="scss">
  .interstitial {
    z-index: 0;
    margin: 0;
    padding: 0 calc(var(--sl-border-radius) + 10px);
    height: 75dvh;
    width: 100%;
    container-type: size;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: var(--od-font-stack-serif);
  }
</style>
