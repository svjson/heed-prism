(function () {

  class PrismCodeBlock extends Heed.AbstractContentSection {
    constructor(section, slide) {
      super(section, slide);
      this.prism = Heed.plugins.prism;
    }

    renderTo(el) {
      el.innerHTML = `<pre></pre>`;
      const preBlock = el.querySelector('pre');
      const namespace = {};
      if (this.section.id) {
        namespace[this.section.id] = el;
        preBlock.id = this.section.id;
      }

      const lang = this.section.lang;

      const grammarPromise = lang
        ?  Heed.loadScript(`${this.prism.pluginBase}/js/components/prism-${this.section.lang}.min.js`)
        : Promise.resolve();

      grammarPromise.then(() => {
        return this.section.source
          ? Heed.loadResource(this.slide.path + this.section.source)
          : this.section.content;
      }).then(code => {
        preBlock.innerHTML = `<code class="language-${this.section.lang}">${code}</code>`;
        const codeBlock = el.querySelector('code');
        Prism.highlightElement(codeBlock);
        this.applyCommonProperties(el);
      });

      return namespace;
    }
  }

 window.Heed.ContentSectionRegistry.register('prism:code-block', PrismCodeBlock);

})();
