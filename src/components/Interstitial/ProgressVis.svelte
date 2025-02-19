<script lang="ts">
  import { BLOCKS, TERM_TOTAL_WORDS } from '../../constants';
  import Square from './Unit.svelte';

  export let readingProgress: number;
  export let wordsPerBlock: number;
  export let content: string;

  $: progress = Math.round(readingProgress / wordsPerBlock);
</script>

<div class="container">
  <div class="label-this-story"><span>This story</span></div>
  <div class="story square">
    <Square total={BLOCKS} {progress} />
  </div>
  <div class="note">{@html content}</div>
  <div class="label-terms"><span>ClassDojo documents</span></div>
  <div class="terms square">
    <Square fill="#FD7218" total={Math.ceil(TERM_TOTAL_WORDS / wordsPerBlock)} {progress} />
  </div>
</div>

<style>
  .container {
    width: 100%;
    position: relative;
    display: grid;

    /* Default supports regular mobile layout with a portrait container aspect ratio */
    grid-template-columns: repeat(20, 5%);
    grid-template-rows: auto auto auto;
    grid-template-areas:
      'a a b b b b b b b b b b b b b b b b b b'
      'c c c c c c c c c c c c c c c c c c c c'
      'd d d d d d d d d d e e e e e e e e e e';
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
  .label-terms span {
    margin-left: 1em;
  }

  @container (max-width: 430px) {
    .container {
      grid-template-areas:
        'a a a b b b b b b b b b b b b b b b b b'
        'c c c c c c c c c c c c c c c c c c c c'
        'd d d d d d d d d d d d d e e e e e e e';
    }
    .label-terms {
      flex-direction: column;
      justify-content: flex-start;
      align-items: start;
    }
    .label-terms span {
      margin-left: 0;
    }
  }

  .label-terms::before {
    transform: rotate(90deg);
    display: inline-block;
    vertical-align: middle;
    width: 3em;
    height: 3em;
    margin-inline: 0em;
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
