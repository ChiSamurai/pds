export { ResourcePropertyMetadata, Property } from './decorator/resource-property';
export { isResourceType, Resource, ResourceMetadata } from './decorator/resource';

export * from './client/client';
export * from './client/client-config';
export * from './client/resource-client';
export * from './client/resource-factory';
export * from './client/resource-decoder';
export * from './client/resource-encoder';
export * from './client/resource-reader';
export * from './client/resource-writer';
export * from './client/url-rewriter';

export * from './decoder/date-property-decoder';
export * from './encoder/date-property-encoder';

export * from './params/http-params-encoding';

export * from './utils/remove-empty-schema-properties';
export * from './utils/trim-schema-properties';
