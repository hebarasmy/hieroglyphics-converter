"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { Trash2, LinkIcon, Copy, ArrowLeft, PlayCircle, ExternalLink } from "lucide-react"

type VideoItem = {
  id: string
  title: string
  originalTitle?: string
  source?: string
  addedAt: number
}

const STORAGE_KEY = "egyptVideos"

// Seed list (includes your new links)
const SEED_VIDEOS: Omit<VideoItem, "addedAt">[] = [
  { id: "PAZmoB3I-M4", title: "Secrets of the Saqqara Tomb (2020) — Official Trailer", source: "Netflix / YouTube" },
  { id: "BR2ZMj3o5EU", title: "Pyramids and King Tut (Full Episode) | Lost Treasures of Egypt", source: "National Geographic" },
  {
    id: "K99sFPnZ0V0",
    originalTitle: "حصريًا ولأول مرة: قصة طوفان هلاك فرعون ... والعلامات التي سبقت نهاية فرعون",
    title: "Exclusive: The Cataclysm that Destroyed Pharaoh — signs before his end (Arabic)",
    source: "YouTube",
  },
  { id: "VANTQdAm5eA", title: "King Tut's Treasures: Hidden Secrets Rediscovered (Full Episode)", source: "National Geographic" },
  { id: "L_A8B_MdAdY", title: "The Greatest Female Pharaoh — Hatshepsut — Ancient Egypt", source: "YouTube" },
  { id: "E-gBU4hHaGA", title: "Ancient Egypt: Invasion of the Hyksos", source: "YouTube" },
  {
    id: "bWWB_dfSs-k",
    originalTitle: "كنوز وحكّام | كنوز مصر المفقودة | ناشونال جيوغرافيك أبوظبي",
    title: "Treasures & Rulers | Egypt’s Lost Treasures (Arabic) | Nat Geo Abu Dhabi",
    source: "Nat Geo Abu Dhabi",
  },
  { id: "9G69n11o3z8", title: "Cleopatra's Lost Tomb (Full Episode) | Lost Treasures of Egypt", source: "National Geographic" },
  { id: "8AgeNvHZ_ks", title: "Egypt's Ancient Empire | Egypt From Above (Full Episode) — The Nile", source: "National Geographic" },
  {
    id: "oG8bGK2CNik",
    originalTitle: "كنوز مصر المفقودة: الملكة الفرعونية المحاربة | ناشونال جيوغرافيك أبوظبي",
    title: "Egypt’s Lost Treasures: The Warrior Queen (Arabic) | Nat Geo Abu Dhabi",
    source: "Nat Geo Abu Dhabi",
  },
  { id: "Ocw9opvMX3c", title: "Nefertiti — Facial Reconstructions & History Documentary", source: "YouTube" },
]

function idToShareUrl(id: string) {
  return `https://youtu.be/${id}`
}
function idToThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}

export default function VideosPage() {
  const [videos, setVideos] = useState<VideoItem[]>([])

  useEffect(() => {
    let saved: VideoItem[] = []
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) saved = JSON.parse(raw)
    } catch {}
    const have = new Set(saved.map(v => v.id))
    const toSeed: VideoItem[] = []
    for (const s of SEED_VIDEOS) {
      if (!have.has(s.id)) {
        toSeed.push({ ...s, addedAt: Date.now() })
      }
    }
    const merged = [...toSeed, ...saved]
    setVideos(merged)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged))
    } catch {}
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(videos))
    } catch {}
  }, [videos])

  function remove(id: string) {
    setVideos(prev => prev.filter(v => v.id !== id))
    toast({ title: "Removed video" })
  }

  function copyShareLink(id: string) {
    const share = idToShareUrl(id)
    navigator.clipboard.writeText(share).then(
      () => toast({ title: "Copied link", description: share }),
      () => toast({ title: "Copy failed", variant: "destructive" })
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100/80">
      <div className="container mx-auto px-3 md:px-4 py-8 md:py-12 max-w-7xl">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="outline" className="border-yellow-500/40">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            </Link>
            <h1 className="text-2xl md:text-3xl font-dramatic text-majestic text-yellow-800 tracking-wide">
              Ancient Egypt — Documentaries
            </h1>
          </div>
          <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold">
            {videos.length} saved
          </Badge>
        </div>

        {/* Grid */}
        {videos.length === 0 ? (
          <Card className="border-2 border-yellow-400/30 bg-white/80">
            <CardContent className="p-8 text-center text-yellow-800">
              No videos yet.
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {videos.map(v => (
              <Card
                key={v.id}
                className="overflow-hidden border-2 border-yellow-400/30 bg-white/90 hover:shadow-xl transition-shadow"
              >
                {/* Thumbnail with overlay */}
                <div className="relative group">
                  <img
                    src={idToThumb(v.id)}
                    alt={v.title}
                    className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                    <div className="flex items-center gap-2">
                      <PlayCircle className="w-5 h-5 opacity-90" />
                      <span className="font-semibold leading-tight">{v.title}</span>
                    </div>
                    {v.originalTitle && (
                      <div className="text-xs opacity-90 mt-1 truncate">{v.originalTitle}</div>
                    )}
                    {v.source && (
                      <div className="text-[10px] mt-1 opacity-80 uppercase tracking-wide">{v.source}</div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-yellow-800">
                    <LinkIcon className="w-4 h-4" />
                    <span className="font-mono text-xs sm:text-sm truncate">youtu.be/{v.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <a href={idToShareUrl(v.id)} target="_blank" rel="noreferrer">
                      <Button variant="outline" size="sm" title="Open on YouTube">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </a>
                    <Button variant="outline" size="sm" onClick={() => copyShareLink(v.id)} title="Copy link">
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="sm" onClick={() => remove(v.id)} title="Remove">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
