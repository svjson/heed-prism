(function () {

  class PrismCodeBlock extends Heed.AbstractContentSection {
    constructor(section, slide) {
      super(section, slide);
    }

    renderTo(el) {
      el.innerHTML = `<pre></pre>`;
      const preBlock = el.querySelector('pre');
      const namespace = {};
      if (this.section.id) {
        namespace[this.section.id] = el;
        preBlock.id = this.section.id;
      }

      fetch(this.slide.path + this.section.source).then(response => {
        return response.text();
      }).then(code => {
        preBlock.innerHTML = `<code class="language-typescript">${code}</code>`;
        const codeBlock = el.querySelector('code');
        Prism.highlightElement(codeBlock);
        this.applyCommonProperties(el);
      });

      return namespace;
    }
  }

 window.Heed.ContentSectionRegistry.register('prism:code-block', PrismCodeBlock);

})();
