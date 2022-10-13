import { createAnalysis } from './analysis.js';
import {
  printAll,
  printDeclarations,
  printGeneral,
  printRuleSets,
  printSelectors,
  printValues
} from './print.js';

printAll(
  await createAnalysis(),
  printGeneral,
  printRuleSets,
  printSelectors,
  printDeclarations,
  printValues
);