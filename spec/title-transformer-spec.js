'use babel';
import transform from '../lib/title-transformer';
import sinon from 'sinon';



describe('transform', () => {
  const baseTitle = 'A title';
  const otherTitle = 'Another little title';


  it ('should transform title into title', () => {
    // Use fake timers so that we get the same date
    const transObj = transform(baseTitle);

    // Asserts
    expect(transObj).not.toBeUndefined();
    expect(transObj.title).toEqual(baseTitle);
  });
  it ('should transform title into fileName', () => {
    const date = new Date()
    var clock = sinon.useFakeTimers(date)

    const transObj = transform(baseTitle);
    clock.restore();

    const dateString = date.toISOString().split('T')[0];
    const re = new RegExp(`${dateString}-a-title.md`)
    expect(transObj.fileName).not.toBeUndefined();
    expect(transObj.fileName).toMatch(re);

    // Test again with another date
  })
  it ('should transform title into fileName with other date', () => {
    const dateString = '2017-01-01';
    const date = new Date(dateString)

    var clock = sinon.useFakeTimers(date);

    var transObj = transform(otherTitle);

    clock.restore();

    const re = new RegExp(`${dateString}-another-little-title.md`);
    expect(transObj.fileName).toMatch(re);
  })
  it ('should have date', () => {
    const date = new Date();
    const otherDate = new Date('2016-01-01');

    var clock = sinon.useFakeTimers(date);
    expect(transform(baseTitle).date).toMatch(date.toISOString())
    clock.restore();

    clock = sinon.useFakeTimers(otherDate);
    expect(transform(baseTitle).date).toMatch(otherDate.toISOString());
    clock.restore();

  });
  it ('should have path field', () => {
    expect(transform(baseTitle).path).toMatch('/a-title/');
    expect(transform(otherTitle).path).toMatch('/another-little-title/');
  });
});
