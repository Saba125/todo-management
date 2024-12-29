// src/global.d.ts
export {}

declare global {
  interface Window {
    cloudinary: any // Replace `any` with a specific type if available
  }
}
