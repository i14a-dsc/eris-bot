import 'dotenv/config';

if (!process.env.TOKEN) {
  throw new Error('Missing Environment Variables.');
}

export const config = {
  prefix: process.env.PREFIX || '!',
};
export const env = {
  token: process.env.TOKEN || '',
};
