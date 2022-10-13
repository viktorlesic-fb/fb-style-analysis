import { printTable } from 'console-table-printer';

function roundNumber(number) {
  return (Math.round(number * 10) / 10).toFixed(1);
}

function prettifyNumber(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
}

function print(dataSet, extract, title) {
  console.log('');
  console.log(title);
  printTable(dataSet.map(extract));
}

export function printGeneral(dataSet) {
  const extract = data => {
    const {
      fileName,
      analysis: {
        stylesheet: {
          linesOfCode,
          size
        },
        rules,
        selectors,
        declarations
      }
    } = data;
  
    return {
      'Name': fileName,
      'Lines': prettifyNumber(linesOfCode),
      'Size': `${roundNumber(size / 1000)} kb`,
      'Rules': prettifyNumber(rules.total),
      'Selectors': prettifyNumber(selectors.total),
      'Declarations': prettifyNumber(declarations.total)
    };
  }

  print(dataSet, extract, 'General'); 
}

export function printRuleSets(dataSet) {
  const extract = data => {
    const {
      fileName,
      analysis: {
        rules: {
          total,
          selectors,
          declarations
        }
      }
    } = data;


    return {
      'Name': fileName,
      'Total': total,
      'Selectors per ruleset': `max: ${selectors.max}, mode: ${selectors.mode}, mean: ${roundNumber(selectors.mean)}, min: ${roundNumber(selectors.min)}`,
      'Declarations per ruleset': `max: ${declarations.max}, mode: ${declarations.mode}, mean: ${roundNumber(declarations.mean)}, min: ${roundNumber(declarations.min)}`,
    };
  }

  print(dataSet, extract, 'Rulesets');
}

export function printSelectors(dataSet) {
  const extract = data => {
    const {
      fileName,
      analysis: {
        selectors: {
          total,
          totalUnique,
          complexity,
          specificity,
          id
        }
      }
    } = data;
    const specificityAvg = specificity.mean.map(roundNumber);

    return {
      'Name': fileName,
      'Total (unique)': `${total} (${totalUnique})`,
      'Complexity': `max: ${complexity.max}, mode: ${complexity.mode}, mean: ${roundNumber(complexity.mean)}, min: ${roundNumber(complexity.min)}`,
      'Specificity': `max: [${specificity.max}], mode: [${specificity.mode}], mean: [${specificityAvg}], min: [${specificity.min}]`,
      'IDs': id.total
    };
  }

  print(dataSet, extract, 'Selectors');
}

export function printDeclarations(dataSet) {
  const extract = data => {
    const {
      fileName,
      analysis: {
        declarations: {
          total
        }
      }
    } = data;

    return {
      'Name': fileName,
      'Total': total
    };
  }

  print(dataSet, extract, 'Declarations');
}

export function printValues(dataSet) {
  const extract = data => {
    const {
      fileName,
      analysis: {
        values: {
          colors,
          fontFamilies,
          fontSizes,
          zindexes,
          boxShadows
        }
      }
    } = data;

    return {
      'Name': fileName,
      'Colors': `total: ${colors.total}, unique: ${colors.totalUnique}`,
      'Font families': `total: ${fontFamilies.total}, unique: ${fontFamilies.totalUnique}`,
      'Font sizes': `total: ${fontSizes.total}, unique: ${fontSizes.totalUnique}`,
      'Z indexes': `total: ${zindexes.total}, unique: ${zindexes.totalUnique}`,
      'Box shadows': `total: ${boxShadows.total}, unique: ${boxShadows.totalUnique}`
    };
  }

  print(dataSet, extract, 'Values');
}

export function printAll(data, ...fns) {
  for (const fn of fns) {
    fn(data);
  }
}
