
import createAutoImport from './auto-import'
import createSvgIcon from './svg-icon'
import createCompression from './compression'
import createSetupExtend from './setup-extend'
import { PluginOption } from "vite";
import {ViteEnv} from "types"

export default function createVitePlugins(viteEnv: ViteEnv, isBuild = false) {
    const vitePlugins:PluginOption[] = []
    vitePlugins.push(createAutoImport())
	  vitePlugins.push(createSetupExtend())
    vitePlugins.push(createSvgIcon(isBuild))
	  isBuild && vitePlugins.push(...createCompression(viteEnv))
    return vitePlugins
}
