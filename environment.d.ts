declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
      PORT: string;
      EMAIL_SERVICE: string;
      EMAIL_HOST: string;
      EMAIL_HOST_PASSWORD: string;
      EMAIL_HOST_USER: string;
      EMAIL_PORT: string;
      SITE_NAME: string;
    }
  }
}

export {};
