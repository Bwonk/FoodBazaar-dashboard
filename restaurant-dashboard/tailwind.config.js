/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          primary: '#F7F7FA',
          card: '#FFFFFF',
          dark: '#1F1F1F',
        },
        text: {
          primary: '#111827',
          secondary: '#6B7280',
          light: '#9CA3AF',
        },
        accent: {
          primary: '#bde83a',    // Ana lime-yeşil
          secondary: '#34D399',  // Tamamlayıcı yeşil (emerald)
          tertiary: '#FBBF24',   // Sıcak amber
          dark: '#059669',       // Koyu yeşil
        },
        status: {
          new: '#DBEAFE',        // Mavi - yeni siparişler
          delivery: '#FED7AA',   // Turuncu - teslimat
          completed: '#D1FAE5',  // Açık yeşil - tamamlanan
        },
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'hover': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
      },
      screens: {
        'xs': '360px',   // Mobile
        'md': '768px',   // Tablet
        'lg': '1024px',  // Desktop
      },
    },
  },
  plugins: [],
}
