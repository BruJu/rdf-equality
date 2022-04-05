import rdfNamespace from '@rdfjs/namespace';
import assert from 'assert';
import * as N3 from 'n3';
import { quadsToString } from '../src/isomorphism-approximation';
const ex = rdfNamespace("http://ex.org/", { factory: N3.DataFactory });

describe("quadsToString", () => {
  it("should work", () => {
    const quad = N3.DataFactory.quad(ex.a, ex.b, ex.c);

    assert.deepStrictEqual(
      quadsToString([quad]),
      [
        "http://ex.org/a http://ex.org/b http://ex.org/c"
      ]
    );
  });
})