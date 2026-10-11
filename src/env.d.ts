interface ImportMetaEnv {
  readonly PUBLIC_ADSENSE_CLIENT?: string;
  readonly PUBLIC_ADSENSE_SLOT?: string;
  readonly SHOW_DRAFTS?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
