import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { SvgIconData, SvgIconRegistry } from './svg-icon-registry';

const SVG_ELEMENT_START_TAG = /(<\s*)(svg)(\s*)/i;
const SVG_ELEMENT_END_TAG = /(<\/\s*)(svg)(\s*>)/i;

@Injectable({ providedIn: 'root' })
export class SvgIconHost {
  protected readonly parser: DOMParser = new DOMParser();

  protected readonly svg: SVGSVGElement;

  constructor(
    protected readonly registry: SvgIconRegistry,
    @Inject(DOCUMENT) protected readonly document: /* @dynamic */ Document,
    @Inject(PLATFORM_ID) platformId: any
  ) {
    if (!isPlatformBrowser(platformId))
      throw new Error('Cannot use SvgIconHost implementation outside any browser platform');
    // minimal svg icon host setup
    this.svg = this.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this.svg.toggleAttribute('hidden', true);
    this.svg.style.display = 'none';
    // called internally to initially attach
    this.reattach();
    // listen for any registration changes
    this.registry.unregisters.subscribe(([id, data]) => this.onIconUnregister(id, data));
    this.registry.registers.subscribe(([id, data]) => this.onIconRegister(id, data));
  }

  addSymbol(id: string, data: SvgIconData): void {
    if (data != null && data.trim() !== '') {
      let svgData = data.replace(SVG_ELEMENT_START_TAG, '$1symbol$3');
      svgData = svgData.replace(SVG_ELEMENT_END_TAG, '$1symbol$3');

      const svgSymbol = this.parser.parseFromString(svgData, 'image/svg+xml')?.firstChild as SVGSymbolElement;
      svgSymbol.id = id;
      this.svg.appendChild(svgSymbol);
    }
  }
  removeSymbol(id: string): void {
    this.svg.childNodes.forEach((node) => {
      if (node instanceof SVGSymbolElement && node.id === id) this.svg.removeChild(node);
    });
  }

  reattach(): void {
    this.document.body.prepend(this.svg);
  }
  detach(): void {
    this.document.removeChild(this.svg);
  }

  protected onIconRegister(id: string, data: SvgIconData): void {
    this.addSymbol(id, data);
  }
  protected onIconUnregister(id: string, data: SvgIconData): void {
    this.removeSymbol(id);
  }
}
