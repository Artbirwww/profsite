/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_API_LOCAL_URL: string
}
interface ImportMeta {
    readonly env: ImportMetaEnv
}
declare module "*.svg" {
  const content: string;
  export default content;
}