"use client"

import { useEffect, useRef } from "react"

interface RideMapProps {
  small?: boolean
}

export default function RideMap({ small = false }: RideMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      const parent = canvas.parentElement
      if (!parent) return

      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight

      drawMap()
    }

    // Draw the map
    const drawMap = () => {
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Background
      ctx.fillStyle = "#f3f4f6"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw roads
      ctx.strokeStyle = "#d1d5db"
      ctx.lineWidth = small ? 2 : 3

      // Horizontal roads
      for (let i = 1; i < 5; i++) {
        const y = canvas.height * (i / 5)
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }

      // Vertical roads
      for (let i = 1; i < 5; i++) {
        const x = canvas.width * (i / 5)
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      // Draw route
      ctx.strokeStyle = "#3b82f6"
      ctx.lineWidth = small ? 3 : 5
      ctx.beginPath()
      ctx.moveTo(canvas.width * 0.2, canvas.height * 0.8)
      ctx.lineTo(canvas.width * 0.2, canvas.height * 0.4)
      ctx.lineTo(canvas.width * 0.6, canvas.height * 0.4)
      ctx.lineTo(canvas.width * 0.6, canvas.height * 0.2)
      ctx.lineTo(canvas.width * 0.8, canvas.height * 0.2)
      ctx.stroke()

      // Start point
      ctx.fillStyle = "#22c55e"
      ctx.beginPath()
      ctx.arc(canvas.width * 0.2, canvas.height * 0.8, small ? 6 : 10, 0, Math.PI * 2)
      ctx.fill()

      // End point
      ctx.fillStyle = "#ef4444"
      ctx.beginPath()
      ctx.arc(canvas.width * 0.8, canvas.height * 0.2, small ? 6 : 10, 0, Math.PI * 2)
      ctx.fill()

      // Add labels if not small
      if (!small) {
        ctx.fillStyle = "#000000"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText("Start", canvas.width * 0.2, canvas.height * 0.8 + 25)
        ctx.fillText("Destination", canvas.width * 0.8, canvas.height * 0.2 + 25)
      }
    }

    // Initial setup
    resizeCanvas()

    // Handle resize
    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [small])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
