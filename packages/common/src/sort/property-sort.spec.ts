import { PropertySort } from './property-sort';

describe('PropertySort', () => {
  it('should properly use the property selector', () => {
    const dateSort = new PropertySort((obj) => new Date(obj.dateStr).getTime());
    const dateValues = [
      { dateStr: '1960-08-04T00:00:00+01:00' },
      { dateStr: '2000-12-13T00:00:00+01:00' },
      { dateStr: '1990-12-07T00:00:00+01:00' },
    ];

    let values: any[] = dateSort.apply(dateValues.slice());
    expect(values).toEqual([
      { dateStr: '1960-08-04T00:00:00+01:00' },
      { dateStr: '1990-12-07T00:00:00+01:00' },
      { dateStr: '2000-12-13T00:00:00+01:00' },
    ]);

    values = dateSort.apply(dateValues.slice(), 'descending');
    expect(values).toEqual([
      { dateStr: '2000-12-13T00:00:00+01:00' },
      { dateStr: '1990-12-07T00:00:00+01:00' },
      { dateStr: '1960-08-04T00:00:00+01:00' },
    ]);
  });

  it('should sort alphanumeric values properly', () => {
    const sort = new PropertySort((value) => value);

    let values: any[] = sort.apply(['b', 'd', 'c', 'a', 'e']);
    expect(values).toEqual(['a', 'b', 'c', 'd', 'e']);

    values = sort.apply([3, 5, 2, 1, 4], 'descending');
    expect(values).toEqual([5, 4, 3, 2, 1]);
  });
});
