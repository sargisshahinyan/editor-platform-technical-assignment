/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PEXEL_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
