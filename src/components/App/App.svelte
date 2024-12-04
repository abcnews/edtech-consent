<script lang="ts">
  import {
    getReadableStore,
    getReadableStateStore,
    getReadableProgressStore,
    type State,
    type Progress
  } from '@abcnews/progress-utils';
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

  const getText = (index?: number) => {
    switch (index) {
      case 0:
        return `You've read (or at least scrolled past) ${getWordTotal($state?._index || 0)} words — thanks for sticking with it!
        In the same time you could have read less than one per cent of the ClassDojo documents.`;
      case 1:
        return `If you’d spent this time reading ClassDojo's policy documents instead of this story, you'd be about ${((getWordTotal($state?._index || 0) / TERM_TOTAL_WORDS) * 100).toFixed(1)} per cent of the way through them. Unlikely to have made you much more confident making a decision to check that box on the consent form.`;
      case 2:
        return `With the density of the legalease, at this point it wouldn't be surprising if you found yourself with more questions and less confidence that you'd be making the right decision about ClassDojo. And you're only ${((getWordTotal($state?._index || 0) / TERM_TOTAL_WORDS) * 100).toFixed(1)} per cent into the effort!`;
      case 3:
        return '';
      case 4:
        return `Remember, ClassDojo is just one of the more than 20 services Kim was asked to give consent for. If one of them suffered a data breach how would it affect your child? Would you even know if there was a breach?`;
      case 5:
        return ``;
      case 6:
        return ``;
    }
  };
</script>

{#if $progress?.envelope > 0 && $progress?.region < 1}
  <div transition:fade class="container">
    <div class="inner">
      <p>{getText($state?._index) || ''}</p>

      <ProgressVis
        words={getWordTotal($state?._index || 0)}
        articleTotal={sum(wordCounts)}
        termsTotal={TERM_TOTAL_WORDS}
      />
    </div>
  </div>
{/if}

<style lang="scss">
  .container {
    position: fixed;
    z-index: 1;
    margin: 0;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    display: grid;
    justify-content: center;
    pointer-events: none;
  }

  .inner {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 600px;
  }
</style>
