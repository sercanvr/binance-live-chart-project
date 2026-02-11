/**
 * Vitest Yapılandırması
 * =====================
 * Birim testleri için Vitest ayarları.
 * jsdom ortamı ile React bileşenlerini test etmeye olanak sağlar.
 * Vite config'inden plugin'leri miras alır.
 */
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
plugins: [react()],
test: {
    environment: 'jsdom', // DOM API simülasyonu
    globals: true, // describe, it, expect global olarak kullanılabilir
    setupFiles: './src/__tests__/setup.js', // Test öncesi hazırlıklar
},
});