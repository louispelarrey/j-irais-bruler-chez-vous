import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jiraisbrulerchezvous.app',
  appName: 'JBCV',
  webDir: 'dist/apps/front-web',
  server: {
    androidScheme: 'https'
  }
};

export default config;
