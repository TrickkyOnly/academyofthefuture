import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: Number(process.env.PORT || 4000),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  telegramBotToken: process.env.TELEGRAM_BOT_TOKEN || '',
  telegramChatId: process.env.TELEGRAM_CHAT_ID || ''
};
