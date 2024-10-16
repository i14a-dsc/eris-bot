import { Client as ErisClient, IntentStrings } from 'eris';
import { config, env } from './config.js';
import { ready } from './events/handlers/ready.js';
import { create } from './events/handlers/message.js';

export class Client extends ErisClient {
  config = config;
  env = env;
  constructor() {
    super(env.token, { intents: getIntents() });
  }

  async init() {
    await super.connect();
    this._registerEvents();
  }

  private async _registerEvents() {
    super.on('ready', () => ready(this));
    super.on('messageCreate', async e => create(await super.getMessage(e.channel.id, e.id), this));
  }

  private async _preventUnsafeDisconnect() {
    process.on('SIGINT', this.stop);
    process.on('SIGTERM', this.stop);
    process.on('SIGKILL', this.stop);
  }

  public async stop() {
    console.log('Shutting down...');
    if (!this.user) {
      process.kill(1, 'SIGHUP');
    }

    await super.disconnect({ reconnect: false });
    process.exit(0);
  }
}

function getIntents(): IntentStrings[] {
  return ['guilds', 'guildMessages', 'guildMembers', 'messageContent'];
}
