import { Component, h } from '@stencil/core';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  render() {
    const mathML = `
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
    return (
      <div>
        INSIDE STENCIL:
        <div
          innerHTML={mathML}
          // ref={ref => {
          //   if (ref) {
          //     ref.innerHTML = mathML;
          //   }
          // }}
        >
        </div>
      </div>
    );
  }
}
