import acto from '@abcnews/alternating-case-to-object';
import { whenOdysseyLoaded } from '@abcnews/env-utils';
import { getMountValue, selectMounts } from '@abcnews/mount-utils';
import type { Mount } from '@abcnews/mount-utils';
import App from './components/App/App.svelte';
import { proxy } from '@abcnews/dev-proxy';

let appMountEl: Mount;
let appProps;

Promise.all([proxy('edtech-consent'), whenOdysseyLoaded]).then(() => {
  [appMountEl] = selectMounts('edtechconsent');

  if (appMountEl) {
    appProps = acto(getMountValue(appMountEl));
    new App({
      target: appMountEl
    });
  }
});

if (process.env.NODE_ENV === 'development') {
  console.debug(`[edtech-consent] public path: ${__webpack_public_path__}`);
}
