import acto from '@abcnews/alternating-case-to-object';
import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { getMountValue, selectMounts } from '@abcnews/mount-utils';
import { proxy } from '@abcnews/dev-proxy';
import Interstitial from './components/Interstitial/Interstitial.svelte';
import Sticker from './components/Sticker/Sticker.svelte';

import './global.scss';

Promise.all([proxy('edtech-consent'), whenOdysseyLoaded]).then(() => {
  // Interstitial vis
  let [appMountEl] = selectMounts('edtechconsent');
  if (appMountEl) {
    initComponent(appMountEl, Interstitial);
  }

  // Stickers
  Array.from(selectMounts('sticker')).forEach(el => {
    initComponent(el, Sticker);
  });

  updatePanelColourMode();
  updateIframeColourMode();
});

const initComponent = (el: Element, Component) => {
  // @ts-expect-error Block mount is always an element
  let appProps: any = acto(getMountValue(el));
  new Component({
    target: el,
    props: { ...appProps, children: el.children }
  });
};

if (process.env.NODE_ENV === 'development') {
  console.debug(`[edtech-consent] public path: ${__webpack_public_path__}`);
}

const updatePanelColourMode = () => {
  Array.from(document.querySelectorAll('[data-key="panel"')).forEach(el => {
    el.setAttribute('data-scheme', 'light');
  });
};

const updateIframeColourMode = () => {
  // Set correct mode for Datawrapper embeds, based on current background
  const datawrapperIframes = document.querySelectorAll(`.Main [data-component="Iframe"] iframe[src*="datawrapper"]`);
  datawrapperIframes.forEach(el => {
    if (!(el instanceof HTMLIFrameElement)) {
      return;
    }
    const shouldBeDark = false;
    const desiredParam = `dark=${shouldBeDark}`;
    const paramPattern = /dark=\w+/;
    const desiredSrc = paramPattern.test(el.src)
      ? el.src.replace(paramPattern, desiredParam)
      : `${el.src}&${desiredParam}`;

    // Always remove the white background (set by PL's className)
    el.style.setProperty('background-color', 'transparent');
    el.style.setProperty('color-scheme', shouldBeDark ? 'dark' : 'light');

    // Change the URL, if needed
    if (el.src !== desiredSrc) {
      el.src = desiredSrc;
    }
  });
};
