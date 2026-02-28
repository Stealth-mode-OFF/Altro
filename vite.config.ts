
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';
  import path from 'path';

  export default defineConfig({
    plugins: [react()],
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        'vaul@1.1.2': 'vaul',
        'sonner@2.0.3': 'sonner',
        'recharts@2.15.2': 'recharts',
        'react-resizable-panels@2.1.7': 'react-resizable-panels',
        'react-hook-form@7.55.0': 'react-hook-form',
        'react-day-picker@8.10.1': 'react-day-picker',
        'next-themes@0.4.6': 'next-themes',
        'lucide-react@0.487.0': 'lucide-react',
        'motion/react': path.resolve(__dirname, './node_modules/motion/dist/es/react.mjs'),
        'input-otp@1.4.2': 'input-otp',
        'figma:asset/e22ac4c178d2bbab1324e57e3d6e56436f52bc40.png': path.resolve(__dirname, './src/assets/e22ac4c178d2bbab1324e57e3d6e56436f52bc40.png'),
        'figma:asset/d2f44ae16e31926bf96aef3c5f4e4a3d03368e0a.png': path.resolve(__dirname, './src/assets/d2f44ae16e31926bf96aef3c5f4e4a3d03368e0a.png'),
        'figma:asset/8e479ee20a3f29f31855e79e992e8c5be3d12322.png': path.resolve(__dirname, './src/assets/8e479ee20a3f29f31855e79e992e8c5be3d12322.png'),
        'figma:asset/8051cfda16de3d7aa19331d176f0be2dc150bed1.png': path.resolve(__dirname, './src/assets/8051cfda16de3d7aa19331d176f0be2dc150bed1.png'),
        'figma:asset/72c7ddfeeafb6871bbe3a7be0139e4ff974e0c84.png': path.resolve(__dirname, './src/assets/72c7ddfeeafb6871bbe3a7be0139e4ff974e0c84.png'),
        'figma:asset/6bc4f18e3e30fa0644c76f7df4899136a7bdab79.png': path.resolve(__dirname, './src/assets/6bc4f18e3e30fa0644c76f7df4899136a7bdab79.png'),
        'figma:asset/37bb8a659a4a3f6604f817c626f331b3541fff8a.png': path.resolve(__dirname, './src/assets/37bb8a659a4a3f6604f817c626f331b3541fff8a.png'),
        'figma:asset/2678cc9f1180293e020e020c24637564c46ba85c.png': path.resolve(__dirname, './src/assets/2678cc9f1180293e020e020c24637564c46ba85c.png'),
        'figma:asset/25aa2f7917174e5633532ace212d5bcf77b22ebd.png': path.resolve(__dirname, './src/assets/25aa2f7917174e5633532ace212d5bcf77b22ebd.png'),
        'embla-carousel-react@8.6.0': 'embla-carousel-react',
        'cmdk@1.1.1': 'cmdk',
        'class-variance-authority@0.7.1': 'class-variance-authority',
        '@radix-ui/react-tooltip@1.1.8': '@radix-ui/react-tooltip',
        '@radix-ui/react-toggle@1.1.2': '@radix-ui/react-toggle',
        '@radix-ui/react-toggle-group@1.1.2': '@radix-ui/react-toggle-group',
        '@radix-ui/react-tabs@1.1.3': '@radix-ui/react-tabs',
        '@radix-ui/react-switch@1.1.3': '@radix-ui/react-switch',
        '@radix-ui/react-slot@1.1.2': '@radix-ui/react-slot',
        '@radix-ui/react-slider@1.2.3': '@radix-ui/react-slider',
        '@radix-ui/react-separator@1.1.2': '@radix-ui/react-separator',
        '@radix-ui/react-select@2.1.6': '@radix-ui/react-select',
        '@radix-ui/react-scroll-area@1.2.3': '@radix-ui/react-scroll-area',
        '@radix-ui/react-radio-group@1.2.3': '@radix-ui/react-radio-group',
        '@radix-ui/react-progress@1.1.2': '@radix-ui/react-progress',
        '@radix-ui/react-popover@1.1.6': '@radix-ui/react-popover',
        '@radix-ui/react-navigation-menu@1.2.5': '@radix-ui/react-navigation-menu',
        '@radix-ui/react-menubar@1.1.6': '@radix-ui/react-menubar',
        '@radix-ui/react-label@2.1.2': '@radix-ui/react-label',
        '@radix-ui/react-hover-card@1.1.6': '@radix-ui/react-hover-card',
        '@radix-ui/react-dropdown-menu@2.1.6': '@radix-ui/react-dropdown-menu',
        '@radix-ui/react-dialog@1.1.6': '@radix-ui/react-dialog',
        '@radix-ui/react-context-menu@2.2.6': '@radix-ui/react-context-menu',
        '@radix-ui/react-collapsible@1.1.3': '@radix-ui/react-collapsible',
        '@radix-ui/react-checkbox@1.1.4': '@radix-ui/react-checkbox',
        '@radix-ui/react-avatar@1.1.3': '@radix-ui/react-avatar',
        '@radix-ui/react-aspect-ratio@1.1.2': '@radix-ui/react-aspect-ratio',
        '@radix-ui/react-alert-dialog@1.1.6': '@radix-ui/react-alert-dialog',
        '@radix-ui/react-accordion@1.2.3': '@radix-ui/react-accordion',
        '@jsr/supabase__supabase-js@2.49.8': '@jsr/supabase__supabase-js',
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      outDir: 'build',
      chunkSizeWarningLimit: 1200,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('react')) return 'react-vendor';
              if (id.includes('motion')) return 'motion-vendor';
              if (id.includes('lucide-react')) return 'icons-vendor';
              if (id.includes('radix-ui')) return 'radix-vendor';
              if (id.includes('recharts')) return 'charts-vendor';
              return 'vendor';
            }
          },
        },
      },
    },
    server: {
      port: 3000,
      open: true,
    },
  });