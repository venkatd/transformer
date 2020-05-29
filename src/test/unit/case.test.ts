import * as assert from 'assert';
import * as transforms from '../../transforms/case';

import { suite, test } from 'mocha';

suite('case transforms', () => {
  test('lowerkebab', () => {
    assert.equal(transforms.lowerkebab('LowerKebab'), 'lower-kebab');
  });

  test('camelcase', () => {
    assert.equal(transforms.camelcase('camel-case'), 'camelCase');
    assert.equal(transforms.camelcase('CamelCase'), 'camelCase');
  });
});
