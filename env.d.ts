/// <reference types="vite/client" />

  interface ImportMetaEnv {
    readonly VITE_BMGT435_SERVICE: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }