"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, ZoomIn } from "lucide-react"
import { Button } from "@/components/ui/button"

const IMAGES = [
  "/pyramids-01.jpeg",
  "/pyramids-02.jpeg",
  "/pyramids-03.jpeg",
  "/pyramids-04.jpeg",
  "/pyramids-05.jpeg",
  "/pyramids-06.jpeg",
  "/pyramids-07.jpeg",
  "/pyramids-08.jpeg",
  "/pyramids-09.jpeg",
  "/pyramids-10.jpeg",
  "/pyramids-11.jpeg",
  "/pyramids-12.jpeg",
  "/pyramids-13.jpeg",
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100/80">
      <div className="container mx-auto px-3 md:px-4 py-8 md:py-12 max-w-7xl">
        <div className="flex items-center gap-3 mb-6">
          <Link href="/">
            <Button variant="outline" className="border-yellow-500/40">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl md:text-3xl font-dramatic text-majestic text-yellow-800 tracking-wide">
            Giza Pyramids — A piece of Egypt
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {IMAGES.map((src, i) => (
            <div key={src} className="relative overflow-hidden rounded-xl border-2 border-yellow-400/30 bg-white/90">
              <Image
                src={src}
                alt={`Pyramids ${i + 1}`}
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                priority={i < 2}
              />
              <div className="absolute bottom-2 right-2">
                <a href={src} target="_blank" rel="noreferrer">
                  <Button size="sm" variant="secondary" className="bg-white/80 backdrop-blur">
                    <ZoomIn className="w-4 h-4 mr-2" />
                    View
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
