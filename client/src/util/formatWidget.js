export function getCentury(year) {
    let century;
    if (year <= 0) {
        century = Math.ceil(year / -100);
    } else {
        century = Math.floor((year - 1) / 100) + 1;
    }

    let suffix;
    if (century % 100 === 11 || century % 100 === 12 || century % 100 === 13) {
        suffix = "th";
    } else if (century % 10 === 1) {
        suffix = "st";
    } else if (century % 10 === 2) {
        suffix = "nd";
    } else if (century % 10 === 3) {
        suffix = "rd";
    } else {
        suffix = "th";
    }

    return `${century}${suffix}`;
}

export function formatNumber(number) {
    const suffixes = ["", "K", " MIL", " BIL", " TRIL", " QUAT"];
    let suffixNum = Math.floor(("" + number).length / 3);
    let shortValue = parseFloat((suffixNum !== 0 ? (number / Math.pow(1000, suffixNum)) : number).toPrecision(2));

    if (shortValue < 1 && shortValue >= 0.1) {
        shortValue *= 1000;
        suffixNum--;
    }

    if (shortValue % 1 !== 0) {
        shortValue = shortValue.toFixed(1);
    }
    return shortValue + suffixes[suffixNum];
}

export function extractYear(dateString) {
    const yearRegex = /-?\d+\s*(?:CE|BCE)/g;
    const match = dateString.match(yearRegex);
  
    if (match) {
      const yearStr = match[0].replace(/[^\d-]/g, '');
      let year = parseInt(yearStr, 10);
      if (!isNaN(year)) {
        if (dateString.includes('BCE')) {
          year = -year; 
        }
        return year;
      }
    }
  
    return null;
  }
  