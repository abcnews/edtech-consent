<script lang="ts">
  import { getReadableStateStore, getReadableProgressStore } from '@abcnews/progress-utils';
  import acto from '@abcnews/alternating-case-to-object';
  import { onMount } from 'svelte';
  import './global.scss';
  import ProgressVis from '../ProgressVis.svelte';
  import VisIntro from '../VisIntro.svelte';
  import { BLOCKS, TERM_TOTAL_WORDS } from '../../constants';

  const state = getReadableStateStore('panel', {
    indicatorSelector: name => `[data-key="${name}"]`,
    indicatorStateParser: el => {
      if (el instanceof HTMLElement) {
        const dataStr = el.dataset.tag?.substring(10);
        return acto(dataStr || '');
      }
      return {};
    },
    regionThreshold: 0.1, // This needs to be 1/2 of 1-interstitial space (which is 80dvh or 0.8) to guaranteed it won't be seen above the relevant panel
    shouldOptimiseIndicatorTracking: false
  });

  const progress = getReadableProgressStore('panel', {
    indicatorSelector: name => `[data-key="${name}"]`
  });

  let wordCounts: number[] = [];
  let articleTotal = 0;
  let readingProgress = 0;

  // $: articleTotal = sum(wordCounts);
  $: readingProgress = Math.round(articleTotal * $progress?.envelope || 0); // sum(wordCounts.slice(0, $state?._index || 0 + 1));
  $: termsProgressPct = ((readingProgress / TERM_TOTAL_WORDS) * 100).toFixed(1);

  $: wordsPerBlock = articleTotal / BLOCKS;

  onMount(() => {
    articleTotal = document.querySelector('#content')?.textContent?.split(' ').length || 0;
    wordCounts = Array.from(document.querySelectorAll('[data-key="panel"]')).map(el => {
      el.dataset.scheme = 'light';
      return el.textContent?.split(' ').length || 0;
    });
  });

  let interstitialTextOptions: (string | false)[] = [];

  $: interstitialTextOptions = [
    'a',
    `You've read (or at least scrolled past) ${readingProgress} words — thanks for sticking with it! In the same time you could have read less than one per cent of the ClassDojo documents.`,
    `If you'd spent this time reading ClassDojo's policy documents instead of this story, you'd be about ${termsProgressPct} per cent of the way through them. Unlikely to have made you much more confident making a decision to check that box on the consent form.`,
    `With the density of the legalease, at this point it wouldn't be surprising if you found yourself with more questions and less confidence that you'd be making the right decision about ClassDojo. And you're only ${termsProgressPct} per cent into the effort!`,
    `Remember, ClassDojo is just one of the more than 20 services Kim was asked to give consent for. If one of them suffered a data breach how would it affect your child? Would you even know if there was a breach?`,
    ' ',
    ' ',
    ' ',
    ' ',
    ' ',
    ' '
  ];

  $: text = typeof $state?._index !== 'undefined' ? interstitialTextOptions[$state._index] : false;
</script>

<!-- <div style="position: fixed; top: 0; left: 0; z-index: 100;">
  <p>Envelope: {$progress?.envelope}</p>
  <p>Region: {$progress?.region}</p>
  <p>Index: {$state?._index}</p>
  <p>Reading progress: {readingProgress}</p>
</div> -->

{#if $progress?.envelope > 0 && $progress?.region < 1 && text}
  <div class="container">
    {#if $state?._index === 0}
      <VisIntro {wordsPerBlock} {readingProgress} />
    {:else}
      <ProgressVis {text} {readingProgress} {wordsPerBlock} />
    {/if}
  </div>
{/if}

<style lang="scss">
  .container {
    z-index: 0;
    margin: 0;
    padding: 12px;
    max-width: 590px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: 75dvh;
    width: calc(100vw - 24px);
    container-type: size;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
