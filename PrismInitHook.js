(function () {

  class PrismInitHook {

    constructor(cfg) {
      this.config = cfg;
    }

    applyHook() {
      const theme = this.config?.presentation?.getPluginConfig('prism')?.theme;

      const prismCss = theme
        ? `${Heed.plugins.prism.pluginBase}/css/prism-${theme}.min.css`
        : `${Heed.plugins.prism.pluginBase}/css/prism.css`;

      return Heed.loadStylesheet(prismCss);
    }

  };

  Heed.HookRegistry.register('prism:init', PrismInitHook, ['init']);

})();
