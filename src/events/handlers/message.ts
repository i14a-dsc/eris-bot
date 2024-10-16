import { Message } from 'eris';
import { Client } from '../../init.js';

export async function create(message: Message, client: Client) {
  if (message.author.bot) return;

  const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase();

  if (!message.content.startsWith(client.config.prefix)) return;

  if (command === 'stop') {
    await message.channel.createMessage({
      content: 'Bot is shutting down...',
      messageReference: {
        messageID: message.id,
        channelID: message.channel.id,
        failIfNotExists: false,
      },
    });
    client.stop();
  }

  if (command === 'ping') {
    const now = Date.now();
    const reply = await message.channel.createMessage({
      embeds: [
        {
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL,
          },
          description: 'Pong!',
          fields: [
            {
              name: 'Message Latency',
              value: '⌛ Calucating...',
            },
          ],
        },
      ],
    });

    const end = Date.now();
    reply.edit({
      embeds: [
        {
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL,
          },
          description: 'Pong!',
          fields: [
            {
              name: 'Message Latency',
              value: `🌀 ${end - now}ms`,
            },
          ],
        },
      ],
    });
  }
}
