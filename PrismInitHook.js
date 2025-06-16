(function () {

  class PrismInitHook {

    constructor(cfg) {
      this.cfg = cfg;
      Object.assign(this, Heed.plugins.prism);
    }

    applyHook() {
      const theme = this.config?.theme;

      const prismCss = theme
        ? `${this.pluginBase}/css/prism-${theme}.min.css`
        : `${this.pluginBase}/css/prism.css`;

      return Heed.loadStylesheet(prismCss);
    }

  };

  Heed.HookRegistry.register('prism:init', PrismInitHook, ['init']);

})();
