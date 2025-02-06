<script lang="ts">
  import { BLOCKS, TERM_TOTAL_WORDS } from '../constants';
  import Square from './Square.svelte';

  export let readingProgress: number;
  export let wordsPerBlock: number;

  export let text: string = '';
  $: progress = Math.round(readingProgress / wordsPerBlock);
</script>

<div class="container">
  <div class="label-this-story"><span>This story</span></div>
  <div class="story square">
    <Square total={BLOCKS} {progress} />
  </div>
  <p class="note">{text}</p>
  <div class="label-terms"><span>ClassDojo documents</span></div>
  <div class="terms square">
    <Square total={Math.ceil(TERM_TOTAL_WORDS / wordsPerBlock)} {progress} />
  </div>
</div>

<style>
  .container {
    width: 100%;
    position: relative;
    display: grid;

    /* Default supports regular mobile layout with a portrait container aspect ratio */
    grid-template-columns: repeat(10, 10%);
    grid-template-rows: auto auto auto;
    grid-template-areas:
      'a a b b b b b b b b'
      'c c c c c c c c c c'
      'd d d d d d d d d d';
    grid-template-areas:
      'a b b b b b b b b b'
      'c c c c c c c c c c'
      'd d d d d e e e e e';
  }

  .square {
    position: relative;
    box-sizing: content-box;
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
  }

  .label-this-story::before {
    transform: rotate(90deg);
    display: inline-block;
    vertical-align: middle;
    width: 3rem;
    height: 3rem;
    content: '';
    margin-inline: 1em;
    background-image: var(--edtech-arrow);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  .note {
    grid-area: c;
    /* border: 1px solid green; */
  }

  .terms {
    grid-area: d;
  }

  .label-terms {
    grid-area: e;
    position: unset;
    margin-inline: 1em;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  @container (max-width: 430px) {
    .label-terms {
      flex-direction: column;
      justify-content: space-around;
      align-items: start;
    }
  }

  .label-terms::before {
    transform: rotate(90deg);
    display: inline-block;
    vertical-align: middle;
    width: 3em;
    height: 3em;
    margin-inline: 1em;
    content: '';
    background-image: var(--edtech-arrow);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }

  /* Swap things around for landscape container aspect ratios */
  @container (min-aspect-ratio: 1) {
    .container {
      grid-template-columns: repeat(20, 5%);
      grid-template-rows: auto 1fr auto;
      grid-template-areas:
        'a b b b b b b b b b b b b b b d d d d d'
        'e e e e e e e e e e e e e e e d d d d d'
        'c c c c c c c c c c c c c c c c c c c c';
    }

    .label-terms {
      grid-area: e;
      position: unset;
      margin-left: 1em;
      margin-inline: 1em;
      justify-content: flex-end;
    }

    .label-terms::before {
      content: none;
      margin-left: 0;
    }
    .label-terms::after {
      transform: rotate(270deg);
      display: inline-block;
      vertical-align: middle;
      width: 3em;
      height: 3em;
      content: '';
      background-image: var(--edtech-arrow);
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
</style>
