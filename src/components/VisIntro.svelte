<script lang="ts">
  import { BLOCKS } from '../constants';
  import Square from './Square.svelte';

  export let wordsPerBlock: number;
  export let readingProgress: number;

  $: progress = Math.round(readingProgress / wordsPerBlock);
</script>

<div class="container">
  <p class="circle-label">This circle represents about {Math.round(wordsPerBlock)} words.</p>
  <div class="unit">
    <div class="viz"><Square total={1} progress={1} /></div>
  </div>
  <p>
    Keep that in mind — we'll use these circles to keep track of your progress through this story and compare it to the
    scale of the task Kim had been asked to complete by her daughter's school.
  </p>
  <p>So far you've read about about <br />{readingProgress} words.</p>
  <div class="story">
    <div class="label-this-story"><span>This story</span></div>
    <div class="circles">
      <Square total={BLOCKS} {progress} />
    </div>
  </div>
</div>

<style>
  .container {
  }
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
