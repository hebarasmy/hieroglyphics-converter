'use client'

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Sparkles, Eye, BookOpen, Crown, Scroll, Youtube, Images } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"
import { Toaster } from "@/components/ui/toaster"
import {
  convertToCartouche,
  convertToPhonetic,
  educationalContent,
  type ConversionResult,
} from "@/lib/hieroglyphic-data"

const egyptianFacts = [
  "The capstone of the Great Pyramid was covered in electrum, a shining alloy of gold and silver, to reflect the sun’s divine light.",
  "Pharaoh Ramesses II ruled for 66 years and is believed to have fathered over 100 children.",
  "Ancient Egyptians believed the heart was the seat of intelligence and emotion, while the brain was considered unimportant.",
  "The Great Pyramid is aligned with the cardinal directions (north, south, east, and west) with astonishing accuracy.",
  "Tombs were often inscribed with powerful curses and spells to protect the deceased from grave robbers.",
  "Pharaoh Akhenaten attempted to change the entire religion to the worship of a single god, the Aten, or sun disk.",
  "Gigantic obelisks, carved from a single piece of stone, were transported by boat to decorate temple entrances.",
  "Queen Hatshepsut became pharaoh and wore a ceremonial false beard to project power and authority.",
  "Ancient Egyptians made toothpaste from a mixture of crushed rock salt, mint, and dried iris flowers.",
  "Some secret rooms within the pyramids remain unopened and their contents a complete mystery to this day.",
  "Pharaohs were buried with everything they needed for the afterlife, from food and furniture to games and model boats.",
  "The title 'pharaoh' originally meant 'Great House,' referring to the royal palace rather than the king himself.",
  "The Step Pyramid of Djoser at Saqqara was the world's first great stone building, a precursor to the true pyramids.",
  "Many temples were astronomically aligned to catch the sun's rays on special days, such as the solstice.",
  "The annual flooding of the Nile River deposited fertile silt, making Egypt's land incredibly rich for farming.",
  "The pyramids were built by a skilled workforce of thousands of paid craftsmen and laborers, not by slaves.",
  "The ancient Egyptians invented the world's first form of paper, made from the papyrus plant that grew along the Nile.",
  "During mummification, the brain was removed through the nose, but the heart was carefully left in the body.",
  "The scarab beetle was a powerful symbol of rebirth and the sun god, and was worn as a protective amulet.",
  "Pharaohs held multiple names throughout their reign, each with a different symbolic and religious meaning.",
  "Ancient Egyptians wore kohl eyeliner not just for beauty, but also to protect their eyes from the sun and ward off infections.",
  "The Eye of Horus was a sacred symbol of protection, healing, and royal power.",
  "Scrolls known as the 'Book of the Dead' were placed in tombs to guide the deceased through the afterlife.",
  "Cats were revered as sacred animals, associated with the goddess Bastet, and often mummified after their deaths.",
  "The lost tomb of the legendary Queen Cleopatra VII remains one of the great mysteries of archaeology.",
  "Ancient Egyptians were skilled metalworkers who created a natural alloy of gold and silver called electrum.",
  "The precise location of many ancient gold mines remains a mystery, though much gold came from Nubia to the south.",
  "King Tutankhamun's tomb was filled with board games and sandals, alongside his treasures.",
  "The ancient Egyptians were the first to develop a solar calendar with 365 days.",
  "Beer was a staple of the ancient Egyptian diet and was even used as a form of payment.",
  "Egyptians of both genders wore elaborate wigs and headdresses to protect their heads from the sun.",
  "The Rosetta Stone, discovered in 1799, was the key to deciphering hieroglyphs.",
  "The pyramids of Giza were built for three different pharaohs: Khufu, Khafre, and Menkaure.",
  "Imhotep, the architect of the Step Pyramid, is the first known architect in history.",
  "They used honey as a powerful antibiotic to treat wounds and prevent infection.",
  "Egyptian writing, or hieroglyphs, means 'sacred carvings' in Greek.",
  "The symbol of the ankh represented eternal life and was a powerful religious icon.",
  "Many ancient temples were originally painted in vibrant colors, but these have faded over millennia.",
  "The Sphinx was once painted in bright red, yellow, and blue colors."
]

export default function HieroglyphicsConverter() {
  const [inputName, setInputName] = useState("")
  const [cartoucheResult, setCartoucheResult] = useState<ConversionResult | null>(null)
  const [phoneticResult, setPhoneticResult] = useState<ConversionResult | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [activeTab, setActiveTab] = useState("cartouche")
  const [currentFact, setCurrentFact] = useState(0)

  // Rotate through facts every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % egyptianFacts.length)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const performConversion = (name: string) => {
    if (!name.trim()) {
      setCartoucheResult(null)
      setPhoneticResult(null)
      return
    }

    setIsConverting(true)

    setTimeout(() => {
      const cartouche = convertToCartouche(name)
      const phonetic = convertToPhonetic(name)

      setCartoucheResult(cartouche)
      setPhoneticResult(phonetic)
      setIsConverting(false)
    }, 500)
  }

  useEffect(() => {
    performConversion(inputName)
  }, [inputName])

  const copyToClipboard = async (text: string, type: string) => {
    if (!text) return

    try {
      await navigator.clipboard.writeText(text)
      toast({
        title: "Copied to clipboard!",
        description: `Your ${type} hieroglyphic name has been copied successfully.`,
      })
    } catch {
      toast({
        title: "Copy failed",
        description: "Please select and copy the text manually.",
        variant: "destructive",
      })
    }
  }

  const ResultCard = ({ result, icon }: { result: ConversionResult; icon: React.ReactNode }) => (
    <Card className="border-2 border-yellow-400/30 bg-gradient-to-br from-white via-yellow-50/50 to-yellow-100/30 shadow-2xl backdrop-blur-sm">
      <CardHeader className="pb-4 md:pb-6 bg-gradient-to-r from-yellow-400/10 via-yellow-300/20 to-yellow-400/10 border-b border-yellow-400/20 p-4 md:p-8">
        <CardTitle className="flex items-center gap-2 md:gap-3 text-xl md:text-2xl font-dramatic text-yellow-900 text-majestic tracking-wide">
          {icon}
          <span className="font-serif text-base sm:text-xl md:text-2xl">{educationalContent[result.style].title}</span>
        </CardTitle>
        <CardDescription className="text-sm md:text-base text-yellow-800/80 font-medium leading-relaxed">
          {educationalContent[result.style].description}
        </CardDescription>
        <Badge
          variant="secondary"
          className={`w-fit text-xs md:text-sm font-bold px-3 md:px-4 py-1 md:py-2 ${
            result.style === "phonetic"
              ? "bg-gradient-to-r from-yellow-600 to-yellow-700 text-white shadow-lg"
              : "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white shadow-lg"
          }`}
        >
          {educationalContent[result.style].accuracy}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4 md:space-y-6 p-4 md:p-8">
        {/* Hieroglyphic Output */}
        <div className="relative">
          <div className="min-h-[100px] md:min-h-[120px] p-4 md:p-8 bg-gradient-to-br from-yellow-50 via-white to-yellow-100/50 border-3 border-dashed border-yellow-400/40 rounded-xl flex items-center justify-center shadow-inner">
            <div className="text-center">
              <div
                className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-relaxed tracking-widest select-all cursor-pointer hover:bg-yellow-200/30 p-2 md:p-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 break-all"
                onClick={() => copyToClipboard(result.hieroglyphs, result.style)}
                title="Click to copy"
                style={{ fontFamily: "serif" }}
              >
                {result.hieroglyphs}
              </div>
              <p className="text-xs md:text-sm text-yellow-700/70 mt-2 md:mt-3 font-semibold tracking-wide">
                ✨ Click the hieroglyphics above to copy ✨
              </p>
            </div>
          </div>
          <Button
            onClick={() => copyToClipboard(result.hieroglyphs, result.style)}
            className="absolute top-2 md:top-3 right-2 md:right-3 h-6 w-6 md:h-10 md:w-10 p-0 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            title="Copy to clipboard"
          >
            <Copy className="w-3 h-3 md:w-5 md:h-5" />
          </Button>
        </div>

        {/* Breakdown Table */}
        <div className="space-y-3 md:space-y-4">
          <h4 className="font-dramatic text-lg md:text-xl text-yellow-900 text-majestic tracking-wide">
            Symbol Breakdown:
          </h4>
          <div className="max-h-64 overflow-y-auto border-2 border-yellow-400/30 rounded-xl shadow-inner bg-white/80">
            <div className="overflow-x-auto">
              <table className="w-full text-sm md:text-base min-w-[400px]">
                <thead className="bg-gradient-to-r from-yellow-400/20 to-yellow-300/20 sticky top-0 border-b border-yellow-400/30">
                  <tr>
                    <th className="text-left p-2 md:p-4 font-bold text-yellow-900 tracking-wide">Input</th>
                    <th className="text-left p-2 md:p-4 font-bold text-yellow-900 tracking-wide">Symbol</th>
                    <th className="text-left p-2 md:p-4 font-bold text-yellow-900 tracking-wide">Description</th>
                    {result.style === "phonetic" && (
                      <th className="text-left p-2 md:p-4 font-bold text-yellow-900 tracking-wide">Gardiner</th>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {result.breakdown.map((item, index) => (
                    <tr key={index} className="border-t border-yellow-400/20 hover:bg-yellow-50/50 transition-colors">
                      <td className="p-2 md:p-4 font-mono font-bold text-yellow-900 text-base md:text-lg">
                        {item.input}
                      </td>
                      <td className="p-2 md:p-4 text-2xl md:text-3xl font-mono">{item.output}</td>
                      <td className="p-2 md:p-4 text-xs md:text-sm text-yellow-800/80 font-medium">
                        {item.description}
                      </td>
                      {result.style === "phonetic" && (
                        <td className="p-2 md:p-4 text-xs md:text-sm font-mono text-yellow-700 font-semibold">
                          {item.gardiner || "-"}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Usage Examples */}
        <div className="text-xs md:text-sm text-yellow-800/80 bg-yellow-50/50 p-3 md:p-4 rounded-lg border border-yellow-400/20">
          <p className="font-bold mb-2 text-yellow-900 tracking-wide">Best used for:</p>
          <ul className="list-disc list-inside space-y-1 font-medium">
            {educationalContent[result.style].uses.map((use, index) => (
              <li key={index}>{use}</li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100/80">
      <div className="container mx-auto px-3 md:px-4 py-8 md:py-12 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-4 md:mb-6">
            <Eye className="w-8 h-8 md:w-12 md:h-12 text-yellow-600 drop-shadow-lg" />
            <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-dramatic text-royal text-majestic drop-shadow-2xl">
              ANCIENT EGYPTIAN
            </h1>
            <Eye className="w-8 h-8 md:w-12 md:h-12 text-yellow-600 drop-shadow-lg" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-dramatic text-yellow-800 text-majestic tracking-wide">
            HIEROGLYPHICS CONVERTER
          </h2>

          {/* Prominent CTA bar (top) */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <Link href="/videos">
              <Button className="h-10 md:h-12 px-4 md:px-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-extrabold shadow-lg hover:shadow-xl">
                <Youtube className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Video Library
              </Button>
            </Link>
            <Link href="/gallery">
              <Button variant="outline" className="h-10 md:h-12 px-4 md:px-6 border-2 border-yellow-500/60 text-yellow-900 font-extrabold hover:bg-yellow-100/50">
                <Images className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Photo Gallery
              </Button>
            </Link>
          </div>

          {/* Top Rotating Facts */}
          <div className="mt-5 text-base sm:text-lg md:text-xl text-yellow-700 max-w-4xl mx-auto font-medium leading-relaxed tracking-wide min-h-[4rem] md:min-h-[3rem] flex items-center justify-center px-4">
            <div
              key={currentFact}
              className="animate-fade-in text-center"
              style={{ animation: "fadeIn 0.5s ease-in-out" }}
            >
              {egyptianFacts[currentFact]}
            </div>
          </div>
        </div>

        {/* Input Section */}
        <Card className="mb-12 shadow-2xl border-2 border-yellow-400/40 bg-gradient-to-br from-white via-yellow-50/30 to-white">
          <CardHeader className="text-center bg-gradient-to-r from-yellow-400/20 via-yellow-300/30 to-yellow-400/20 border-b-2 border-yellow-400/30">
            <CardTitle className="flex items-center gap-3 text-2xl font-dramatic text-yellow-900 text-majestic tracking-wide">
              <Sparkles className="w-8 h-8 text-yellow-600" />
              ENTER YOUR NAME
            </CardTitle>
            <CardDescription className="text-lg text-yellow-800/80 font-medium tracking-wide">
              
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-8">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
              <Input
                type="text"
                placeholder="Enter your name here..."
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                className="text-lg md:text-xl h-10 md:h-12 border-2 border-yellow-400/50 focus:border-yellow-500 bg-white/80 font-semibold tracking-wide placeholder:text-yellow-600/60 text-yellow-900"
              />
              {inputName && (
                <Button
                  variant="outline"
                  onClick={() => setInputName("")}
                  className="h-10 md:h-12 px-4 md:px-6 border-2 border-yellow-400/50 hover:bg-yellow-100/50 text-yellow-800 font-bold tracking-wide whitespace-nowrap"
                >
                  Clear
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Results Section */}
        {(cartoucheResult || phoneticResult || isConverting) && (
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
            {/* Mobile-friendly Tabs */}
            <TabsList
              className="
                w-full
                flex md:grid md:grid-cols-2
                gap-2
                overflow-x-auto
                h-10 md:h-12
                p-1
                bg-gradient-to-r from-yellow-400/30 to-yellow-300/30
                border border-yellow-400/40
                rounded-md
              "
            >
              <TabsTrigger
                value="cartouche"
                className="
                  flex items-center justify-center gap-2
                  shrink-0
                  text-xs sm:text-sm md:text-base
                  px-3 py-2
                  h-full min-h-10
                  rounded-sm
                  data-[state=active]:bg-gradient-to-r
                  data-[state=active]:from-yellow-500
                  data-[state=active]:to-yellow-600
                  data-[state=active]:text-white
                  data-[state=active]:shadow-lg
                "
              >
                <Crown className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                <span className="font-extrabold whitespace-nowrap">CARTOUCHE STYLE</span>
              </TabsTrigger>

              <TabsTrigger
                value="phonetic"
                className="
                  flex items-center justify-center gap-2
                  shrink-0
                  text-xs sm:text-sm md:text-base
                  px-3 py-2
                  h-full min-h-10
                  rounded-sm
                  data-[state=active]:bg-gradient-to-r
                  data-[state=active]:from-yellow-500
                  data-[state=active]:to-yellow-600
                  data-[state=active]:text-white
                  data-[state=active]:shadow-lg
                "
              >
                <Scroll className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
                <span className="font-extrabold whitespace-nowrap">PHONETIC AUTHENTIC</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="cartouche" className="mt-2">
              {isConverting ? (
                <Card className="border-2 border-yellow-400/30 bg-white/80">
                  <CardContent className="flex items-center justify-center p-16">
                    <div className="flex items-center gap-4 text-yellow-700 text-xl font-semibold">
                      <div className="w-6 h-6 border-3 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
                      Converting to hieroglyphics...
                    </div>
                  </CardContent>
                </Card>
              ) : cartoucheResult ? (
                <ResultCard result={cartoucheResult} icon={<Crown className="w-7 h-7 text-yellow-600" />} />
              ) : null}
            </TabsContent>

            <TabsContent value="phonetic" className="mt-8">
              {isConverting ? (
                <Card className="border-2 border-yellow-400/30 bg-white/80">
                  <CardContent className="flex items-center justify-center p-16">
                    <div className="flex items-center gap-4 text-yellow-700 text-xl font-semibold">
                      <div className="w-6 h-6 border-3 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
                      Converting to hieroglyphics...
                    </div>
                  </CardContent>
                </Card>
              ) : phoneticResult ? (
                <ResultCard result={phoneticResult} icon={<Scroll className="w-7 h-7 text-yellow-600" />} />
              ) : null}
            </TabsContent>
          </Tabs>
        )}

        {/* Educational Information */}
        <Card className="border-2 border-yellow-400/40 bg-gradient-to-br from-white via-yellow-50/30 to-white shadow-2xl">
          <CardHeader className="bg-gradient-to-r from-yellow-400/20 via-yellow-300/30 to-yellow-400/20 border-b-2 border-yellow-400/30">
            <CardTitle className="flex items-center gap-3 text-2xl font-dramatic text-yellow-900 text-majestic tracking-wide">
              <BookOpen className="w-7 h-7 text-yellow-600" />
              WHICH STYLE SHOULD I CHOOSE?
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 text-sm md:text-base p-4 md:p-8">
            <div className="space-y-3 md:space-y-4 bg-yellow-50/50 p-4 md:p-6 rounded-xl border border-yellow-400/20">
              <div className="flex items-center gap-2 md:gap-3">
                <Crown className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
                <h4 className="font-dramatic text-lg md:text-xl text-yellow-900 text-majestic tracking-wide">
                  Cartouche
                </h4>
              </div>
              <p className="text-yellow-800/90 font-medium leading-relaxed">
                <strong>Mapping each letter to a symbol!</strong> This style gives each letter of your name its own
                beautiful hieroglyphic symbol. 
              </p>
              <div className="text-xs md:text-sm text-yellow-700/80 bg-white/60 p-3 rounded-lg border border-yellow-400/20">
                <strong className="text-yellow-900">Example:</strong> -HEBA- becomes H-E-B-A → 𓉔𓇋𓃀𓄿 (each letter gets
                its own symbol)
              </div>
            </div>

            <div className="space-y-3 md:space-y-4 bg-yellow-50/50 p-4 md:p-6 rounded-xl border border-yellow-400/20">
              <div className="flex items-center gap-2 md:gap-3">
                <Scroll className="w-5 h-5 md:w-6 md:h-6 text-yellow-600" />
                <h4 className="font-dramatic text-lg md:text-xl text-yellow-900 text-majestic tracking-wide">
                  Phonetic
                </h4>
              </div>
              <p className="text-yellow-800/90 font-medium leading-relaxed">
                <strong>How ancient Egyptians really wrote!</strong> This follows the actual rules they used 3,000 years
                ago. Vowels are skipped and only consonant sounds matter.
              </p>
              <div className="text-xs md:text-sm text-yellow-700/80 bg-white/60 p-3 rounded-lg border border-yellow-400/20">
                <strong className="text-yellow-900">Example:</strong> -HEBA- becomes [h-b] → 𓉔𓃀 (vowels E and A are
                skipped)
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Rotating Facts (mirrors the top) */}
        <div className="text-center mt-8 md:mt-12">
          <div className="text-base sm:text-lg md:text-xl text-yellow-700 max-w-4xl mx-auto font-medium leading-relaxed tracking-wide min-h-[4rem] md:min-h-[3rem] flex items-center justify-center px-4">
            <div
              key={currentFact}
              className="animate-fade-in text-center"
              style={{ animation: "fadeIn 0.5s ease-in-out" }}
            >
              {egyptianFacts[currentFact]}
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}
