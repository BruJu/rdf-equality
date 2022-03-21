# RDF test util

This package has been developed to make easier testing RDF quad lists testable, or more accurately, to find where the difference between the result of a process and the expected list of RDF quads is.

## Main functions

- `checkIsomorphism(output: RDF.Quad[], expected: RDF.Quad[])`: returns an object `result` such that
  - `result.areIsomorphic` is true if output and expected are isomorphic
  - `result.text` is a text with the serialization of both datasets, with some coloration to show similar quads, if and only if the two list of quads are not isomorphic.

It is expected to be used with the NodeJS assert module:

```ts
import assert from "assert";
import * as RDF from "@rdfjs/types";
import checkIsomorphism from "@bruju/rdf-test-util";

describe("Example", () => {
  it("Usage example", () => {
    const output: RDF.Quad[] = /* ... */;
    const expected: RDF.Quad[] = /* ... */;
    const r = checkIsomorphism(output, expected);
    assert.ok(r.areIsomorphic, r.text);
  })
});
const output = [];
const expected = readSomeQuads();

```


- `strictEqualityCheck(lhs: RDF.Quad[], rhs: RDF.Quad[])`: returns true if the two lists of quads have strictly the same quads.

