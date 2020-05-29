import * as assert from 'assert';
import * as transforms from '../../transforms/case';

suite('case transforms', () => {
  test('lowerkebab', () => {
    assert.equal(transforms.lowerkebab('LowerKebab'), 'lower-kebab');
  });
});
