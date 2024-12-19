import acto from '@abcnews/alternating-case-to-object';
import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { getMountValue, Mount, selectMounts } from '@abcnews/mount-utils';
import App from './components/App/App.svelte';
import { proxy } from '@abcnews/dev-proxy';
import ImageFader from './components/ImageFader.svelte';

Promise.all([proxy('edtech-consent'), whenOdysseyLoaded]).then(() => {
  let [appMountEl] = selectMounts('edtechconsent');
  if (appMountEl) initComponent(appMountEl, App);

  let imageFaderEls = document.querySelectorAll('[data-key="imagefader"]');
  Array.from(imageFaderEls).forEach(el => {
    initComponent(el, ImageFader);
  });
});

const initComponent = (el: Element, Component) => {
  let appProps: any = acto(getMountValue(el));
  new Component({
    target: el,
    props: { ...appProps, children: el.children }
  });
  updateIframeColourMode();
};

if (process.env.NODE_ENV === 'development') {
  console.debug(`[edtech-consent] public path: ${__webpack_public_path__}`);
}

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
