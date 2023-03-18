
import createAutoImport from './auto-import'
import createSvgIcon from './svg-icon'
import createCompression from './compression'
import createSetupExtend from './setup-extend'

export default function createVitePlugins(viteEnv, isBuild = false) {
    const vitePlugins = []
    vitePlugins.push(createAutoImport())
	  vitePlugins.push(createSetupExtend())
    vitePlugins.push(createSvgIcon(isBuild))
	  isBuild && vitePlugins.push(...createCompression(viteEnv))
    return vitePlugins
}
