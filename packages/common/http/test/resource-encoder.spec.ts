import { async, TestBed } from '@angular/core/testing';
import { Resource } from '../src/decorator/resource';
import { Property } from '../src/decorator/resource-property';
import { DATE_PROPERTY_ENCODER_PROVIDER } from '../src/encoder/date-property-encoder';
import { ResourceEncoder } from '../src/client/resource-encoder';

@Resource({ baseUrl: '/foo' })
class FooResource {

  @Property()
  bar: string;

  @Property({ type: Date, key: 'bar_dob' })
  barBirth: Date;

}

describe('a ResourceEncoder', () => {

  let encoder: ResourceEncoder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        DATE_PROPERTY_ENCODER_PROVIDER,
        ResourceEncoder
      ]
    });

    encoder = TestBed.inject(ResourceEncoder);
  }));

  it('should be able to encode a property value to json', () => {
    const foo = encoder.encodeProperty('bar');
    const date = encoder.encodeProperty(new Date(), Date);

    expect(foo).toMatch('bar');
    expect(date).toBeDefined();
  });

  it('should be able to encode a resource instance into json', () => {
    // todo
  });
});
