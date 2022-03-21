import { isomorphic } from "rdf-isomorphic";
import * as RDF from "@rdfjs/types";
import { toStringWithDiffColors } from "./src/isomorphism-approximation";
export * from "./src/graph-substitution";
export * from "./src/isomorphism-approximation";
export * from "./src/test-util";

/**
 * Check if the two given list of quads are isomorphic.
 * If they are not, the returned object provides a serialization of the list of
 * quads with colors to tell what are the different quads.
 * @param output The first quad list
 * @param expected The second quad list
 * @returns An object that explains if the two lists are isomorphic or not
 */
export default function checkIsomorphism(
  output: RDF.Quad[],
  expected: RDF.Quad[],
  indent: number = 0
): IsomorphismResult {
  if (isomorphic(output, expected)) {
    return { areIsomorphic: true, text: "" };
  }

  const [lhsStr, rhsStr] = toStringWithDiffColors(output, expected, indent);
  return {
    areIsomorphic: false,

    text:
      "The output is not isomorphic to the expected result"
      + `\n • Output (${output.length} quads):` + "\n" + lhsStr
      + `\n\n • Expected (${expected.length} quads):` + "\n" + rhsStr,
    
    output  : { size: output.length  , text: lhsStr },
    expected: { size: expected.length, text: rhsStr }
  };
}

export type IsomorphismResult = IsomorphismGoodResult | IsomorphismBadResult;

export type IsomorphismGoodResult = {
  /** True if the two lists of quads are isomorphic */
  readonly areIsomorphic: true;
  readonly text: "";
};

export type IsomorphismBadResult = {
  /** True if the two lists of quads are isomorphic */
  readonly areIsomorphic: false;
  /** A serialization of the lists of quads if they were not isomorphic */
  readonly text: string;

  /** Content of the output quad list */
  readonly output: {
    /** Number of quads */ size: number;
    /** Serialization */ text: string;
  }
  /** Content of the expected quad list */
  readonly expected: {
    /** Number of quads */ size: number;
    /** Serialization */ text: string;
  }
};
