import * as RDF from "@rdfjs/types";
import TermSet from "@rdfjs/term-set";

export function strictEqualityCheck(lhs: RDF.Quad[], rhs: RDF.Quad[]) {
  const leftSet = new TermSet<RDF.Quad>(lhs);
  const rightSet = new TermSet<RDF.Quad>(rhs);

  if (leftSet.size !== rightSet.size) return false;

  return lhs.every(quad => rightSet.has(quad));
}

