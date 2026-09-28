import { defineConfig } from 'wxt';

export default defineConfig({
  srcDir: 'src',
  modules: ['@wxt-dev/module-react', '@wxt-dev/auto-icons'],
  manifest: ({ browser }) => ({
    name: 'SteamTOR',
    description: 'Simple gaming browser extension',
    permissions: ['storage'],
    host_permissions: ['https://*/*'],
    ...(browser === 'firefox' && {
      browser_specific_settings: {
        gecko: {
          id: process.env.FIREFOX_EXT_ID
        }
      }
    })
  })
});
