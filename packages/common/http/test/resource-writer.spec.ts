import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { Resource } from '../src/decorator/resource';
import { Property } from '../src/decorator/resource-property';
import { ResourceDecoder } from '../src/client/resource-decoder';
import { ResourceWriter } from '../src/client/resource-writer';

@Resource({ baseUrl: '/bar' })
class BarResource {

  @Property() name: string;

}

@Resource({
  baseUrl: '/foo',
  rewrite: {
    find: 'bar/:id',
    list: 'bar'
  }
})
class FooResource {

  @Property({ type: Date, key: 'dob' })
  dateOfBirth: Date;

  @Property({ type: BarResource, iterable: true })
  bars: BarResource[];

}

describe('a ResourceWriter', () => {

  let writer: ResourceWriter;
  let httpMock: HttpTestingController;
  let now: number;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ResourceWriter,
        ResourceDecoder
      ],
      imports: [ HttpClientTestingModule ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    writer = TestBed.inject(ResourceWriter);
    now = Date.now();
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should be able to resolve the url for create operations', () => {
    const createUrl = writer.resolveUrl(FooResource, { defaultRewrite: ':id' });
    const createUrlWithRewrite = writer.resolveUrl(FooResource, { defaultRewrite: ':id', rewrite: 'create' });

    expect(createUrl).toMatch('/api/foo/:id');
    expect(createUrlWithRewrite).toMatch('/api/foo/bar/:id');
  });
  it('should be able to resolve the url for update operations', () => {
    const url = writer.resolveUrl(FooResource);
    const urlWithRewrite = writer.resolveUrl(FooResource, { rewrite: 'update' });

    expect(url).toMatch('/api/foo');
    expect(urlWithRewrite).toMatch('/api/foo/bar');
  });
  it('should be able to resolve the url for delete operations', () => {
    const url = writer.resolveUrl(FooResource);
    const urlWithRewrite = writer.resolveUrl(FooResource, { rewrite: 'delete' });

    expect(url).toMatch('/api/foo');
    expect(urlWithRewrite).toMatch('/api/foo/bar');
  });

});
