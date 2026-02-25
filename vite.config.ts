import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "apple-touch-icon.svg",
        "icon-192.svg",
        "icon-512.svg",
      ],
      manifest: {
        name: "FahrVerse",
        short_name: "FahrVerse",
        description:
          "Nigeria's driver-first fleet platform. We give you the car. You drive and earn.",
        start_url: "/",
        display: "standalone",
        orientation: "portrait",
        background_color: "#060b1a",
        theme_color: "#3b82f6",
        categories: ["business", "finance", "productivity"],
        icons: [
          {
            src: "/icon-192.svg",
            sizes: "192x192",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
          {
            src: "/icon-512.svg",
            sizes: "512x512",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
        shortcuts: [
          {
            name: "Apply to Drive",
            url: "/apply",
            description: "Start your driver application",
          },
          {
            name: "Driver Dashboard",
            url: "/driver",
            description: "View your driver portal",
          },
          {
            name: "Fleet Login",
            url: "/login",
            description: "Fleet owner login",
          },
        ],
      },
      workbox: {
        // Cache JS/CSS/HTML
        globPatterns: ["**/*.{js,css,html,ico,svg,png,woff2}"],
        // Network first for navigation, cache first for assets
        navigateFallback: "/index.html",
        navigateFallbackDenylist: [/^\/api/],
        runtimeCaching: [
          {
            // Google Fonts
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          charts: ["recharts"],
          icons: ["lucide-react"],
        },
      },
    },
  },
});
