import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'stencil-math',
  shadow: true,
})
export class Math {
  render() {
    const mathML = `
      <div>INSIDE STENCIL</div>
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
      <Host>
        <div
          style={{ position: 'absolute', marginTop: '40px' }}
          innerHTML={mathML}
          // ref={ref => {
          //   if (ref) {
          //     ref.innerHTML = mathML;
          //   }
          // }}
        />
      </Host>
    );
  }
}
