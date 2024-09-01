import { config } from 'dotenv';
config();

export default {
  PORT: process.env.PORT ?? 3001,
  STACKONE_API_KEY: Buffer.from(process.env.STACKONE_API_KEY ?? "").toString('base64'),
  STACKONE_BASE_URL: 'https://api.stackone.com',
  STACKONE_ATS_URL: 'https://api.stackone.com/unified/ats',
  ORIGIN_OWNER_ID: process.env.ORIGIN_OWNER_ID,
  ORIGIN_OWNER_NAME: process.env.ORIGIN_OWNER_NAME
};