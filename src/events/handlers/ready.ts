import { Client } from 'eris';

export function ready(client: Client) {
  console.log('Ready! Logged in as ' + client.user.username);
}
