import { Component, h, Element, State } from '@stencil/core';

import { mathjax } from 'mathjax-full/js/mathjax';
import { browserAdaptor } from 'mathjax-full/js/adaptors/browserAdaptor';
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html';
import { MathML } from 'mathjax-full/js/input/mathml';
import { SVG } from 'mathjax-full/js/output/svg';
import { STATE } from 'mathjax-full/js/core/MathItem';

const mathMLMarkup = `
<math xmlns="http://www.w3.org/1998/Math/MathML">
  <mrow>
    <mrow>
      <msup>
        <mi>a</mi>
        <mn>2</mn>
      </msup>
      <mo>+</mo>
      <msup>
        <mi>b</mi>
        <mn>2</mn>
      </msup>
    </mrow>
    <mo>=</mo>
    <msup>
      <mi>c</mi>
      <mn>2</mn>
    </msup>
  </mrow>
</math>
`;
@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  @Element()
  public el: HTMLElement;

  @State()
  bla: string;

  componentDidLoad() {
    // mathjax.init();
    console.log(`BF mathjax`, mathjax);

    const adaptor = browserAdaptor();
    RegisterHTMLHandler(adaptor);

    const mathml = new MathML({});
    const svg = new SVG({ fontCache: 'none' });
    const markErrors = [STATE.TYPESET + 1, null, onError];

    function onError(math: any) {
      const { root, typesetRoot } = math;
      if (root.toString().substr(0, 14) === 'math([merror([') {
        const merror = root.childNodes[0].childNodes[0];
        const text = merror.attributes.get('data-mjx-error') || merror.childNodes[0].childNodes[0].getText();
        adaptor.setAttribute(typesetRoot, 'data-mjx-error', text);
      }
    }

    const mathml_html = mathjax.document('', {
      InputJax: mathml,
      OutputJax: svg,
      renderActions: {
        markErrors,
      },
    });

    /**
     * Does a single convert call to MathJax. Tex from inputText is converted and options are the MathJax options
     */
    function convert(srcSpec: any, node: HTMLElement, display: boolean): string {
      // Type: SourceSpecification
      const { src, lang } = srcSpec;
      let html = mathml_html;
      const math: string = src.trim();
      const metrics = svg.getMetricsFor(node, display);
      const outerHTML = adaptor.outerHTML(
        html.convert(math, {
          display,
          ...metrics,
        }),
      );
      html.updateDocument();
      // updateCSS('MATHJAX-SVG-STYLESHEET', svg.cssStyles.cssText);
      return outerHTML;
    }

    this.bla = convert({ src: mathMLMarkup }, this.el, true);

    // forceUpdate(this);
  }

  render() {
    return (
      <div>
        INSIDE STENCIL:
        <div
          innerHTML={this.bla}
          // ref={ref => {
          //   if (ref) {
          //     ref.innerHTML = mathMLMarkup;
          //   }
          // }}
        ></div>
      </div>
    );
  }
}
