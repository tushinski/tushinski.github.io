/// <reference types="vite/client" />

declare module '*.md?raw' {
  const value: string;
  export default value;
}
