import { Inject, InjectionToken } from '@angular/core';
import { async, TestBed } from '@angular/core/testing';
import { DATE_PROPERTY_DECODER_PROVIDER } from '../src/decoder/date-property-decoder';
import { Resource } from '../src/decorator/resource';
import { ResourceFactory } from '../src/client/resource-factory';

const SOME_SERVICE = new InjectionToken('SOME_SERVICE');

@Resource({ baseUrl: '/foo' })
class FooResource {

  constructor(
    @Inject(SOME_SERVICE) readonly service: any,
    protected factory: ResourceFactory
  ) {
  }

}

describe('a ResourceFactory', () => {

  let factory: ResourceFactory;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: SOME_SERVICE, useValue: 'foo' },
        DATE_PROPERTY_DECODER_PROVIDER,
        ResourceFactory
      ]
    });

    factory = TestBed.inject(ResourceFactory);
  }));

  it('should be able to resolve the dependencies of a resource type', () => {
    const deps = factory.resolveDeps(FooResource);

    expect(deps).toHaveLength(2);
    expect(deps[ 1 ]).toBe(ResourceFactory);
  });

  it('should be able to create a resource instance', () => {
    const resource = factory.create(FooResource);

    expect(resource.service).toBeDefined();
    expect(resource.service).toEqual('foo');
  });


});
