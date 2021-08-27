export interface IStackblitzComponentAsset {
  assetUrl: string,
  stackblitzFilename: string
}

export interface IStackblitzComponent {
  name: string,
  moduleName: string,
  componentSelector: string,
  assets: IStackblitzComponentAsset[],
  dependencies: { [key: string]: string }
}
