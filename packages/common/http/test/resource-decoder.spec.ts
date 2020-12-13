import { async, TestBed } from '@angular/core/testing';
import { DATE_PROPERTY_DECODER_PROVIDER } from '../src/decoder/date-property-decoder';
import { Resource } from '../src/decorator/resource';
import { Property } from '../src/decorator/resource-property';
import { ResourceDecoder } from '../src/client/resource-decoder';

@Resource({ baseUrl: '/foo' })
class FooResource {

  @Property()
  bar: string;

  @Property({ type: Date, key: 'dob' })
  barBirth: Date;

}

describe('a ResourceDecoder', () => {

  let decoder: ResourceDecoder;
  let now: number;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        DATE_PROPERTY_DECODER_PROVIDER,
        ResourceDecoder
      ]
    });

    decoder = TestBed.inject(ResourceDecoder);
    now = Date.now();
  }));

  it('should be able to decode a json property value', () => {
    const foo = decoder.decodeProperty('bar');
    const date = decoder.decodeProperty(now, Date);

    expect(foo).toMatch('bar');
    expect(date).toBeInstanceOf(Date);
    expect(date.getTime()).toBe(now);
  });

  it('should be able to decode a json object into an actual instance', () => {
    const foo = decoder.decodeResource({
      'bar': 'bar',
      'bar_dob': now,
      'ignored': null
    }, FooResource);

    expect(foo.bar).toMatch('bar');
    expect(foo.barBirth).toBeInstanceOf(Date);
    expect(foo.barBirth.getTime()).toBe(now);
    expect(foo).not.toHaveProperty('ignored');
  });
});
