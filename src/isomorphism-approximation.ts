import * as RDF from "@rdfjs/types";
import { termToString } from "rdf-string";

/**
 * Tries to build an approximation of the isomorphism.
 * @param quads1 
 * @param quads2 
 * @returns A list of two list of numbers. For each list, the ith member is the
 * position of the ith quad in the other list of quads.
 * 
 * For example [1, undefined], [undefined, 0] means that the 0th
 * quad of quads1 is the 1st quad of quads2, and the others quads are not
 * in the other list of quads.
 */
export function approximateIsomorphism(quads1: RDF.Quad[], quads2: RDF.Quad[])
:[IsomorphicMatch, IsomorphicMatch] {
  function makeBaseR(quads: RDF.Quad[]): IsomorphicMatch {
    return quads.map(_ => undefined);
  }

  let r1 = makeBaseR(quads1);
  let r2 = makeBaseR(quads2);

  // First step: equal quads
  for (let i1 = 0 ; i1 != quads1.length ; ++i1) {
    let i2 = quads2.findIndex(q2 => quads1[i1].equals(q2));

    if (i2 !== -1) {
      r1[i1] = i2;
      r2[i2] = i1;
    }
  }

  // TODO: find a way to have some blank node isomorphism
  // Second step: Maybe with some kind of "Well formed" blank node equality
  

  return [r1, r2];
}

/**
 * The isomorphic match x of a quad list A wrt another quad list B is the list
 * such that for all i, A[i] is isomorphic B[x[i]] if x[i] != undefined
 */
export type IsomorphicMatch = (number | undefined)[];

/**
 * Convert a list of quads into a list of string
 * @param quads The list of quads to convert
 */
export function quadsToString(quads: RDF.Quad[]): string[] {
  return quads.map(quad => {
    const asTermString = termToString(quad);
    // remove leading << and trailing >>
    return asTermString.substring(2, asTermString.length - 2);
  });
}

/**
 * Convert the two lists of quads to two serialization with colors to show the
 * common quads
 * @param quads1 The first list of quads
 * @param quads2 The second list of quads
 * @param indent Number of spaces at the beginning of each line
 * @returns The serialization of the lists
 */
export function toStringWithDiffColors(quads1: RDF.Quad[], quads2: RDF.Quad[], indent: number = 0): [string, string] {
  let [s1, s2] = approximateIsomorphism(quads1, quads2)
  return [
    toStringWithColor(quads1, s1, indent),
    toStringWithColor(quads2, s2, indent)
  ];
}

function toStringWithColor(quads: RDF.Quad[], match: IsomorphicMatch, indent: number) {
  const asString = quadsToString(quads);

  for (let i = 0 ; i != quads.length ; ++i) {
    if (match[i] === undefined) continue;

    if (match[i]! >= 0) asString[i] = "\x1b[36m" + asString[i] + "\x1b[0m";
  }

  const prefix = "".padStart(indent, " ");

  return asString.map(s => prefix + s).join("\n");
}

