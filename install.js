import { cp, readdir } from 'fs/promises';
import path from 'path';

const moduleRoot = path.join('.', 'node_modules', 'prismjs');
const pluginJsFolder = path.join('.', 'js');
const pluginCssFolder = path.join('.', 'css');

/** Copy the main prism.js */
await cp(path.join(moduleRoot, 'prism.js'), path.join(pluginJsFolder, 'prism.js'));

/** Copy language grammars */
const componentRoot = path.join(moduleRoot, 'components');
const pluginCmpRoot = path.join(pluginJsFolder, 'components');
const components = await readdir(componentRoot);

for (const cmp of components) {
  if (cmp.endsWith('.min.js')) {
    await cp(path.join(componentRoot, cmp), path.join(pluginCmpRoot, cmp));
  }
}

/** Copy prism plugins */
const pluginRoot = path.join(moduleRoot, 'plugins');
const heedPluginRoot = path.join(pluginJsFolder, 'plugins');

await cp(pluginRoot, heedPluginRoot, { recursive: true });

/** Copy prism css */
const themesRoot = path.join(moduleRoot, 'themes');

await cp(themesRoot, pluginCssFolder, { recursive: true });
