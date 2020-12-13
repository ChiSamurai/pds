import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { Resource } from '../src/decorator/resource';
import { Property } from '../src/decorator/resource-property';
import { ResourceDecoder } from '../src/client/resource-decoder';
import { ResourceReader } from '../src/client/resource-reader';
import { JsonValue } from '../src/client/shared';

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

describe('a ResourceReader', () => {

  let reader: ResourceReader;
  let httpMock: HttpTestingController;
  let now: number;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ResourceReader,
        ResourceDecoder
      ],
      imports: [ HttpClientTestingModule ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    reader = TestBed.inject(ResourceReader);
    now = Date.now();
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should be able to resolve the url for find operations', () => {
    const findUrl = reader.resolveUrl(FooResource, { defaultRewrite: ':id' });
    const findUrlWithRewrite = reader.resolveUrl(FooResource, { defaultRewrite: ':id', rewrite: 'find' });

    expect(findUrl).toMatch('/api/foo/:id');
    expect(findUrlWithRewrite).toMatch('/api/foo/bar/:id');
  });
  it('should be able to resolve the url for list operations', () => {
    const listUrl = reader.resolveUrl(FooResource);
    const listUrlWithRewrite = reader.resolveUrl(FooResource, { rewrite: 'list' });

    expect(listUrl).toMatch('/api/foo');
    expect(listUrlWithRewrite).toMatch('/api/foo/bar');
  });


  it('should be able to find and parse a foo resource', () => {
    const bar: JsonValue = { name: 'bar42' };
    const resource: JsonValue = {
      'dob': now, 'bars': Array(5).fill(bar)
    };

    reader.find(FooResource, '42').subscribe(foo => {
      expect(foo).toBeDefined();
      expect(foo.dateOfBirth).toBeDefined();
      expect(foo.dateOfBirth).toBeInstanceOf(Date);
      expect(foo.dateOfBirth.getTime()).toBe(now);
      expect(foo.bars).toHaveLength(5);
      expect(foo.bars[ 0 ]).toBeInstanceOf(BarResource);
      expect(foo.bars[ 0 ]?.name).toMatch(bar.name as string);
    });

    httpMock.expectOne('/api/foo/bar/42').flush(resource);
  });

});
