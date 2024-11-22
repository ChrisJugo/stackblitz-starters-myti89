"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Play, Pause, SkipForward, Volume2 } from 'lucide-react'

export function CallPreviewCard() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const scriptSteps = [
    {
      speaker: "AI Agent",
      text: "Hello, this is Sarah from Springfield Toyota calling about your 2020 Camry's warranty coverage.",
      duration: "0:00 - 0:06"
    },
    {
      speaker: "Customer",
      text: "[Pause for response]",
      duration: "0:06 - 0:08"
    },
    {
      speaker: "AI Agent",
      text: "I can see your warranty is expiring in 30 days. We have some excellent renewal options I'd like to discuss.",
      duration: "0:08 - 0:14"
    }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Call Preview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Waveform Visualization */}
          <div className="h-24 bg-accent rounded-md flex items-center justify-center relative">
            <Volume2 className="h-8 w-8 text-accent-foreground/50" />
            <div className="absolute bottom-2 left-2 right-2">
              <div className="h-1 bg-primary rounded-full" style={{ width: `${(currentStep / scriptSteps.length) * 100}%` }} />
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex justify-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentStep((prev) => Math.min(prev + 1, scriptSteps.length - 1))}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>

          {/* Script Steps */}
          <div className="space-y-2">
            {scriptSteps.map((step, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg transition-colors ${
                  currentStep === index ? 'bg-accent' : 'bg-background'
                }`}
              >
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{step.speaker}</span>
                  <span className="text-muted-foreground">{step.duration}</span>
                </div>
                <p className="text-sm mt-1">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

