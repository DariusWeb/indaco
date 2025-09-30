export default defineNuxtConfig({
  ssr: true, // keep SSR to help SEO for document pages (fast FCP + crawlers)
  app: {
    head: {
      title: 'Indaco-Lege',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
        { href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Merriweather+Sans:ital,wght@0,300..800;1,300..800&display=swap', rel: 'stylesheet' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }
      ]
    }
  },
  modules: ['@pinia/nuxt', '@nuxt/ui'],
  css: ['~/assets/styles.css'],
  colorMode: {
    preference: 'light'
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || 'http://localhost:3001'
    },
    // admin password for prototype (insecure — only for demo). In production, use real auth.
    adminPassword: process.env.ADMIN_PASSWORD || 'admin123'
  },
})