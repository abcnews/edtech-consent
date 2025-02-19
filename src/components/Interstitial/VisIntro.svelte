<script lang="ts">
  import { BLOCKS } from '../../constants';
  import Square from './Unit.svelte';

  export let wordsPerBlock: number;
  export let readingProgress: number;
  export let content: string;

  $: progress = Math.round(readingProgress / wordsPerBlock);
</script>

<div class="container">
  <p class="circle-label">This circle represents about {Math.round(wordsPerBlock)} words.</p>
  <div class="unit">
    <div class="viz"><Square total={1} progress={1} /></div>
  </div>
  {@html content}
  <div class="story">
    <div class="label-this-story"><span>This story</span></div>
    <div class="circles">
      <Square total={BLOCKS} {progress} />
    </div>
  </div>
</div>

<style>
  .unit {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .unit .viz {
    width: 20px;
    margin-left: 1em;
  }

  .unit::before {
    content: '';
    background-image: var(--edtech-arrow);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    transform: rotate(270deg);
    width: 3rem;
    height: 3rem;
    margin: 0;
    display: inline-block;
  }

  .circles {
    margin: 0;
    width: 100px;
  }

  .story {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
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
</style>
