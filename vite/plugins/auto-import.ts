import autoImport from 'unplugin-auto-import/vite'
import type { Plugin } from 'vite';
export default function createAutoImport(): Plugin {
    return autoImport({
        imports: [
            'vue',
            'vue-router',
            'pinia'
        ],
        dts: false
    })
}
