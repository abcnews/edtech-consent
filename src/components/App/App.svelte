<script lang="ts">
  import { getReadableStateStore, getReadableProgressStore } from '@abcnews/progress-utils';
  import acto from '@abcnews/alternating-case-to-object';
  import { onMount } from 'svelte';
  import './global.css';
  import ProgressVis from '../ProgressVis.svelte';
  import { fade } from 'svelte/transition';

  const TERM_TOTAL_WORDS = 40403;

  const sum = (arr, acc = d => d) => arr.reduce((t, d) => t + acc(d), 0);

  const state = getReadableStateStore('panel', {
    indicatorSelector: name => `[data-key="${name}"]`,
    indicatorStateParser: el => {
      if (el instanceof HTMLElement) {
        const dataStr = el.dataset.tag?.substring(10);
        return acto(dataStr || '');
      }
      return {};
    },
    regionThreshold: 0.1,
    shouldOptimiseIndicatorTracking: false
  });

  const progress = getReadableProgressStore('panel', {
    indicatorSelector: name => `[data-key="${name}"]`
  });

  let wordCounts: number[] = [];

  const getWordTotal = (index: number) => sum(wordCounts.slice(0, index + 1));

  onMount(() => {
    wordCounts = Array.from(document.querySelectorAll('[data-key="panel"]')).map(el => {
      return el.textContent?.split(' ').length || 0;
    });
  });

  const getText = (index?: number): string | false => {
    const options: (string | false)[] = [
      false,
      `You've read (or at least scrolled past) ${getWordTotal($state?._index || 0)} words — thanks for sticking with it! In the same time you could have read less than one per cent of the ClassDojo documents.`,
      `If you'd spent this time reading ClassDojo's policy documents instead of this story, you'd be about ${((getWordTotal($state?._index || 0) / TERM_TOTAL_WORDS) * 100).toFixed(1)} per cent of the way through them. Unlikely to have made you much more confident making a decision to check that box on the consent form.`,
      `With the density of the legalease, at this point it wouldn't be surprising if you found yourself with more questions and less confidence that you'd be making the right decision about ClassDojo. And you're only ${((getWordTotal($state?._index || 0) / TERM_TOTAL_WORDS) * 100).toFixed(1)} per cent into the effort!`,
      `Remember, ClassDojo is just one of the more than 20 services Kim was asked to give consent for. If one of them suffered a data breach how would it affect your child? Would you even know if there was a breach?`,
      ' ',
      ' ',
      ' ',
      ' ',
      ' ',
      ' '
    ];

    return index ? options[index] : false;
  };

  const getAnnotations = (index?: number) => {
    return index ? [][index] : false;
  };
</script>

<div class="container">
  {#if $progress?.envelope > 0 && $progress?.region < 1 && getText($state?._index)}
    <ProgressVis
      text={getText($state?._index) || ''}
      words={getWordTotal($state?._index || 0)}
      articleTotal={sum(wordCounts)}
      termsTotal={TERM_TOTAL_WORDS}
    />
  {/if}
</div>

<style lang="scss">
  .container {
    z-index: 1;
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
