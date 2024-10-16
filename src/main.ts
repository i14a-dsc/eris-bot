import { Client } from './init.js';
export const client = new Client();

(() => {
  client.init();
})();
