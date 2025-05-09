declare namespace NodeJS {
  export type ProcessEnv = {
    NODE_ENV: string;
    DATABASE_URL: string;
    PORT: number;
    BCRYPT_SALT_ROUND: number;
    JWT_SECRET: string;
    EXPIRES_IN: string;
    REFRESH_SECRET: string;
    REFRESH_EXPIRES_IN: string;
    SALT_ROUND: string;
  };
}
