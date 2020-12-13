import { async, TestBed } from '@angular/core/testing';
import { UrlRewriter } from '../src/client/url-rewriter';

describe('a UrlRewriter', () => {

  let urlRewriter: UrlRewriter;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [ UrlRewriter ]
    });

    urlRewriter = TestBed.inject(UrlRewriter);
  }));

  it('should be able to interpolate a given url value', () => {
    const rewriteContext: any = {
      prop1: 'c',
      prop2: 'f/g'
    };

    expect(urlRewriter.interpolate('/a/b/:prop1/d/e/:prop2/h', rewriteContext))
      .toMatch('/a/b/c/d/e/f/g/h');
  });

  it('should be able to rewrite (concat) a given url value', () => {
    const baseUrl = '/api/foo';

    expect(urlRewriter.rewrite(baseUrl, 'bar/:id'))
      .toMatch('/api/foo/bar/:id');
    expect(urlRewriter.rewrite(baseUrl, 'bar/:id', { id: 'secret_id' }))
      .toMatch('/api/foo/bar/secret_id')
  });

  it('should be able to rewrite (overwrite) a given url value', () => {
    const baseUrl = '/api/foo';

    expect(urlRewriter.rewrite(baseUrl, '/api/bar/:id'))
      .toMatch('/api/bar/:id');
    expect(urlRewriter.rewrite(baseUrl, '/api/bar/:id', { id: 'secret_id' }))
      .toMatch('/api/bar/secret_id')
    expect(urlRewriter.rewrite(baseUrl, '/:url/:id'))
      .toMatch('/api/foo/:id')
  });

});
