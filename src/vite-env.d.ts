interface ImportMetaEnv {
  readonly VITE_TILE_URL_TEMPLATE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  __gpsCameraEnv?: {
    tileUrlTemplate?: string;
  };
}
