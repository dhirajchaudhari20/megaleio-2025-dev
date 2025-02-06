"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Event {
  id: number
  title: string
  description: string
  image: string
}

const events: Event[] = [
  {
    id: 1,
    title: "Minecraft Championship",
    description:
      "Join the ultimate battle royale in our custom-built arena. Compete with players worldwide for amazing prizes!",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-29%20204405-CEVISQjcL2BN228FpR50B5evy9P1Be.png",
  },
  {
    id: 2,
    title: "Building Competition",
    description:
      "Show off your creative building skills in this themed competition. Winners will be featured on our homepage!",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "Survival Challenge",
    description: "Can you survive 100 days in hardcore mode? Join our community challenge with weekly milestones.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 4,
    title: "Server Launch",
    description: "Be the first to explore our new server with custom plugins and unique gameplay mechanics!",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "Community Event",
    description: "Join our monthly community gathering with mini-games, prizes, and special guests!",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const getRotation = (index: number) => {
    const totalItems = events.length
    const angleIncrement = 360 / totalItems
    const baseRotation = (index - currentIndex) * angleIncrement
    return baseRotation
  }

  const getPosition = (index: number) => {
    const rotation = getRotation(index)
    const radian = (rotation * Math.PI) / 180
    const radius = 150 // Adjust this value to change the curve radius
    const x = Math.sin(radian) * radius
    const y = -Math.cos(radian) * radius
    return { x, y }
  }

  const getScale = (index: number) => {
    const distance = Math.abs(index - currentIndex)
    const maxDistance = Math.floor(events.length / 2)
    return 1 - distance * 0.15
  }

  const getOpacity = (index: number) => {
    const distance = Math.abs(index - currentIndex)
    return 1 - distance * 0.3
  }

  return (
    <div className="w-full min-h-screen bg-black/90 text-white overflow-hidden">
      <div className="container mx-auto px-4 py-8 relative">
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-[600px]">
          {/* Main Content */}
          <div className="w-full lg:w-2/3 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <Card className="bg-gray-900/50 backdrop-blur border-gray-800">
                  <CardContent className="p-6">
                    <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={events[currentIndex].image || "/placeholder.svg"}
                        alt={events[currentIndex].title}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                    <h2 className="text-2xl font-bold mb-4">{events[currentIndex].title}</h2>
                    <p className="text-gray-300 mb-6">{events[currentIndex].description}</p>
                    <div className="flex gap-4">
                      <Button className="bg-primary hover:bg-primary/90">Register</Button>
                      <Button variant="outline">Learn More</Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Curved Carousel Navigation */}
          <div
            className="lg:absolute lg:left-0 bottom-0 lg:h-full w-full lg:w-32 flex lg:flex-col items-center justify-center py-8"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative w-full h-32 lg:h-[500px]">
              {events.map((event, index) => {
                const position = getPosition(index)
                return (
                  <motion.div
                    key={event.id}
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                    animate={{
                      x: position.x,
                      y: position.y,
                      scale: getScale(index),
                      opacity: getOpacity(index),
                      rotateZ: isHovered ? 0 : getRotation(index),
                    }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      stiffness: 100,
                      damping: 15,
                    }}
                    onClick={() => setCurrentIndex(index)}
                    style={{
                      zIndex: events.length - Math.abs(currentIndex - index),
                    }}
                  >
                    <div
                      className={`w-16 h-16 lg:w-24 lg:h-24 rounded-lg overflow-hidden border-2 
                      ${index === currentIndex ? "border-primary" : "border-gray-600"}`}
                    >
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentIndex((prev) => (prev - 1 + events.length) % events.length)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => setCurrentIndex((prev) => (prev + 1) % events.length)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

