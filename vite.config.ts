import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "WanderWise",
        short_name: "WanderWise",
        description: "Your smart travel companion.",
        start_url: "/",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#6366F1",
        icons: [
          {
            src: "icons/W.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "icons/WanderWise.png",
            sizes: "512x512",
            type: "image/png"
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
})
