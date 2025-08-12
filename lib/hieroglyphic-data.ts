/**
 * Ancient Egyptian Hieroglyphic Data
 * Based on Gardiner Sign List and Manuel de Codage (MdC) conventions
 *
 * Notes:
 * - Phonetic mode maps sounds (consonants) to canonical uniliteral signs.
 * - Vowels are generally omitted (Egyptian script is primarily consonantal).
 * - There is no uniliteral "l"; we approximate l → r when needed.
 * - Cartouche mode is decorative (tourism/jewelry style), not linguistic.
 */

export const phoneticMapping: Record<
  string,
  {
    gardiner: string
    unicode: string
    description: string
    sound: string
  }
> = {
  "ꜣ": { gardiner: "G1", unicode: "𓄿", description: "Egyptian vulture", sound: "aleph / glottal stop" },
  "ʾ": { gardiner: "G1", unicode: "𓄿", description: "Egyptian vulture", sound: "aleph / glottal stop" },

  "ꜥ": { gardiner: "D36", unicode: "𓂝", description: "forearm", sound: "ayin / pharyngeal" },
  "ʿ": { gardiner: "D36", unicode: "𓂝", description: "forearm", sound: "ayin / pharyngeal" },

  j: { gardiner: "M17", unicode: "𓇋", description: "reed", sound: "y / i" },
  y: { gardiner: "M17", unicode: "𓇋", description: "reed", sound: "y" },
  w: { gardiner: "G43", unicode: "𓅱", description: "quail chick", sound: "w" },

  b: { gardiner: "D58", unicode: "𓃀", description: "foot", sound: "b" },
  p: { gardiner: "Q3", unicode: "𓊪", description: "stool", sound: "p" },
  f: { gardiner: "I9", unicode: "𓆑", description: "horned viper", sound: "f" },
  m: { gardiner: "G17", unicode: "𓅓", description: "owl", sound: "m" },
  n: { gardiner: "N35", unicode: "𓈖", description: "water", sound: "n" },
  r: { gardiner: "D21", unicode: "𓂋", description: "mouth", sound: "r" },

  h: { gardiner: "O4", unicode: "𓉔", description: "reed shelter", sound: "h" },
  ḥ: { gardiner: "V28", unicode: "𓎛", description: "twisted flax", sound: "emphatic h (ḥ)" },
  ḫ: { gardiner: "Aa1", unicode: "𓐍", description: "placenta", sound: "kh (velar) ḫ" },
  ẖ: { gardiner: "F32", unicode: "𓄡", description: "animal belly with tail/teats", sound: "kh (palatal) ẖ" },

  s: { gardiner: "S29", unicode: "𓋴", description: "folded cloth", sound: "s" },
  š: { gardiner: "N37", unicode: "𓈙", description: "garden pool", sound: "sh (š)" },

  q: { gardiner: "N29", unicode: "𓈎", description: "slope of hill", sound: "q (uvular / ḳ)" },
  ḳ: { gardiner: "N29", unicode: "𓈎", description: "slope of hill", sound: "q (uvular / ḳ)" },

  k: { gardiner: "V31", unicode: "𓎡", description: "basket with handle", sound: "k" },
  g: { gardiner: "W11", unicode: "𓎼", description: "jar stand", sound: "g" },

  t: { gardiner: "X1", unicode: "𓏏", description: "bread bun", sound: "t" },
  ṯ: { gardiner: "V13", unicode: "𓍿", description: "tethering rope", sound: "ch as in 'church' (ṯ)" },
  d: { gardiner: "D46", unicode: "𓂧", description: "hand", sound: "d" },
  ḏ: { gardiner: "I10", unicode: "𓆓", description: "cobra", sound: "j as in 'judge' (ḏ)" },

 
  z: { gardiner: "O34", unicode: "𓊃", description: "door bolt", sound: "z" },
}

export const cartoucheMapping: Record<
  string,
  {
    unicode: string
    description: string
    decorative: boolean
  }
> = {
  a: { unicode: "𓄿", description: "Egyptian vulture (decorative A)", decorative: true },
  b: { unicode: "𓃀", description: "foot (decorative B)", decorative: true },
  c: { unicode: "𓎡", description: "basket (decorative C)", decorative: true },
  d: { unicode: "𓂧", description: "hand (decorative D)", decorative: true },
  e: { unicode: "𓇋", description: "reed (decorative E)", decorative: true },
  f: { unicode: "𓆑", description: "horned viper (decorative F)", decorative: true },
  g: { unicode: "𓎼", description: "jar stand (decorative G)", decorative: true },
  h: { unicode: "𓉔", description: "reed shelter (decorative H)", decorative: true },
  i: { unicode: "𓇋", description: "reed (decorative I)", decorative: true },
  j: { unicode: "𓆓", description: "cobra (decorative J)", decorative: true },
  k: { unicode: "𓎡", description: "basket (decorative K)", decorative: true },
  l: { unicode: "𓃭", description: "lion (decorative L)", decorative: true }, // biliteral rw — decorative only
  m: { unicode: "𓅓", description: "owl (decorative M)", decorative: true },
  n: { unicode: "𓈖", description: "water (decorative N)", decorative: true },
  o: { unicode: "𓅱", description: "quail chick (decorative O)", decorative: true },
  p: { unicode: "𓊪", description: "stool (decorative P)", decorative: true },
  q: { unicode: "𓈎", description: "slope of hill (decorative Q)", decorative: true },
  r: { unicode: "𓂋", description: "mouth (decorative R)", decorative: true },
  s: { unicode: "𓋴", description: "folded cloth (decorative S)", decorative: true },
  t: { unicode: "𓏏", description: "bread bun (decorative T)", decorative: true },
  u: { unicode: "𓅱", description: "quail chick (decorative U)", decorative: true },
  v: { unicode: "𓆑", description: "horned viper (decorative V)", decorative: true },
  w: { unicode: "𓅱", description: "quail chick (decorative W)", decorative: true },
  x: { unicode: "𓐍", description: "placenta (decorative X)", decorative: true },
  y: { unicode: "𓇋", description: "reed (decorative Y)", decorative: true },
  z: { unicode: "𓊃", description: "door bolt (decorative Z)", decorative: true },
}

export const phoneticRules: Record<string, string> = {
  "c(?=[eiy])": "s", // soft c before e/i/y
  ch: "ṯ",           // English "ch" ≈ ṯ
  sh: "š",
  th: "t",           
  kh: "ḫ",
  ph: "f",
  gh: "g",

  ck: "k",
  qu: "k",
  x: "ks",          // handle as k + s
  c: "k",           // default hard c
}

export const vowelsToSkip = ["a", "e", "i", "o", "u"]
export const semiVowels = ["y", "w"] 

export interface ConversionResult {
  hieroglyphs: string
  breakdown: Array<{
    input: string
    output: string
    description: string
    gardiner?: string
  }>
  style: "cartouche" | "phonetic"
  explanation: string
}

export function convertToCartouche(name: string): ConversionResult {
  const breakdown: ConversionResult["breakdown"] = []
  let hieroglyphs = ""

  for (const char of name.toLowerCase()) {
    if (char === " ") {
      hieroglyphs += " "
      continue
    }

    const mapping = cartoucheMapping[char]
    if (mapping) {
      hieroglyphs += mapping.unicode
      breakdown.push({
        input: char.toUpperCase(),
        output: mapping.unicode,
        description: mapping.description,
      })
    } else {
      // Keep unmapped characters as-is
      hieroglyphs += char
      breakdown.push({
        input: char,
        output: char,
        description: "Unmapped character",
      })
    }
  }

  return {
    hieroglyphs,
    breakdown,
    style: "cartouche",
    explanation:
      "Decorative letter-by-letter substitution used in jewelry/tourism. Visually appealing but not linguistically accurate.",
  }
}

export function convertToPhonetic(name: string): ConversionResult {
  const breakdown: ConversionResult["breakdown"] = []
  let hieroglyphs = ""

  let processedName = name.toLowerCase().trim()

  for (const [pattern, replacement] of Object.entries(phoneticRules)) {
    processedName = processedName.replace(new RegExp(pattern, "g"), replacement)
  }

  let i = 0
  while (i < processedName.length) {
    const char = processedName[i]

    if (char === " ") {
      hieroglyphs += " "
      i++
      continue
    }

    if (vowelsToSkip.includes(char) && !semiVowels.includes(char)) {
      breakdown.push({
        input: char.toUpperCase(),
        output: "∅",
        description: "Vowel omitted (authentic Egyptian practice)",
      })
      i++
      continue
    }

    // Direct match
    const mapping = phoneticMapping[char]
    if (mapping) {
      hieroglyphs += mapping.unicode
      breakdown.push({
        input: char === "ʾ" ? "'" : char.toUpperCase(),
        output: mapping.unicode,
        description: `${mapping.description} (${mapping.sound})`,
        gardiner: mapping.gardiner,
      })
      i++
      continue
    }

    const closestMapping = findClosestPhonetic(char)
    if (closestMapping) {
      hieroglyphs += closestMapping.unicode
      breakdown.push({
        input: char.toUpperCase(),
        output: closestMapping.unicode,
        description: `${closestMapping.description} (approximated from ${char})`,
        gardiner: closestMapping.gardiner,
      })
      i++
      continue
    }

    breakdown.push({
      input: char.toUpperCase(),
      output: "?",
      description: "No phonetic equivalent found",
    })
    i++
  }

  return {
    hieroglyphs,
    breakdown,
    style: "phonetic",
    explanation:
      "Linguistically oriented transliteration: vowels omitted, consonants mapped to canonical uniliteral signs (Gardiner codes).",
  }
}

function findClosestPhonetic(char: string): (typeof phoneticMapping)[string] | null {
  const approximations: Record<string, string> = {
    l: "r",   
    v: "f",
    c: "k",   
    j: "ḏ",   
    x: "ḫ",   
  }
  const approximation = approximations[char]
  return approximation ? phoneticMapping[approximation] : null
}

export const educationalContent = {
  cartouche: {
    title: "Cartouche Style — Decorative",
    description:
      "Replaces each English letter with a hieroglyphic-looking symbol.",
    uses: ["Jewelry & pendants", "Decorative art", "Tourism souvenirs", "Personal gifts"],
    accuracy: "Decorative (not historical)",
    badge: { label: "Decorative", tone: "warning" as const },
  },
  phonetic: {
    title: "Phonetic Transliteration — Authentic",
    description:
      "Follows ancient Egyptian practice: consonants only (vowels omitted).",
    uses: ["Educational", "Historical display", "Linguistic study"],
    accuracy: "Historically oriented",
    badge: { label: "Phonetic", tone: "success" as const },
  },
}
