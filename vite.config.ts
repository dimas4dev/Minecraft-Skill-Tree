import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    plugins: [react(), svgr()],
    server: {
        port: 3000,
    },
    css: {
        modules: {
            exportGlobals: false,
            generateScopedName: function (name, filename) {
                const file = path.basename(filename, '.module.css');
                return file + '__' + name + '__' + Math.random().toString(36).substring(7);
            },
        },
    },
});
