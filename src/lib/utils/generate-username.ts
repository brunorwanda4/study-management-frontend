export const getInitialsUsername = (text: string, isSubClass?: boolean) => {
  const cleaned = (text || "").trim();
  if (!cleaned) return "";
  const parts = cleaned.split(/\s+/);

  if (isSubClass) {
    let abbrev = "";
    const usedKeywords = new Set<string>(); // track keywords we've consumed

    // remove any year-like parts (e.g. "2025-2026" or "2024/2025")
    const filtered = parts.filter((p) => !/^\d{4}[-/]\d{4}$/.test(p));

    // remove consecutive duplicate words like "Primary Primary"
    const deduped = filtered.filter(
      (w, i) => i === 0 || w.toLowerCase() !== filtered[i - 1].toLowerCase(),
    );

    if (deduped.length === 0) return "";

    // last meaningful token
    const last = deduped[deduped.length - 1];

    for (let i = 0; i < deduped.length - 1; i++) {
      const word = deduped[i];

      // Handle common school patterns
      if (/^level$/i.test(word) && deduped[i + 1]) {
        const num =
          deduped[i + 1].replace(/\D/g, "") || deduped[i + 1][0].toUpperCase();
        abbrev += `L${num}`;
        usedKeywords.add("level");
        i++;
      } else if (/^primary$/i.test(word) && deduped[i + 1]) {
        const num =
          deduped[i + 1].replace(/\D/g, "") || deduped[i + 1][0].toUpperCase();
        abbrev += `P${num}`;
        usedKeywords.add("primary");
        i++;
      } else if (/^senior$/i.test(word) && deduped[i + 1]) {
        const num =
          deduped[i + 1].replace(/\D/g, "") || deduped[i + 1][0].toUpperCase();
        abbrev += `S${num}`;
        usedKeywords.add("senior");
        i++;
      } else if (/^ordinary$/i.test(word)) {
        abbrev += "OL";
        usedKeywords.add("ordinary");
      } else if (/^advanced$/i.test(word)) {
        abbrev += "AL";
        usedKeywords.add("advanced");
      } else if (/^\d+$/.test(word)) {
        abbrev += word; // standalone number like 3
      } else {
        // default: take first letter
        abbrev += word[0].toUpperCase();
      }
    }

    // Decide whether to append last token:
    // - If last is a single letter (section) -> append it (e.g., "B", "J")
    // - Else if last matches any consumed keyword (primary/level/senior/ordinary/advanced) -> skip
    // - Else if last duplicates any earlier meaningful token -> skip
    // - Otherwise append first letter of last
    const lowerLast = last.toLowerCase();
    const isSingleLetter = /^[A-Za-z]$/.test(last);
    const isKeyword = [
      "primary",
      "level",
      "senior",
      "ordinary",
      "advanced",
    ].includes(lowerLast);
    const duplicatesEarlier = deduped
      .slice(0, deduped.length - 1)
      .some((w) => w.toLowerCase() === lowerLast);

    if (isSingleLetter) {
      abbrev += last.toUpperCase();
    } else if (!isKeyword && !duplicatesEarlier) {
      // append initial if it's not a keyword or duplicate
      abbrev += last[0].toUpperCase();
    } // else skip appending

    return abbrev;
  }

  // Normal mode (2 initials)
  const partsNormal = cleaned.split(/\s+/);
  const initials =
    partsNormal.length >= 2
      ? `${partsNormal[0][0]}${partsNormal[1][0]}`
      : cleaned.slice(0, 2);
  return initials.toUpperCase();
};
