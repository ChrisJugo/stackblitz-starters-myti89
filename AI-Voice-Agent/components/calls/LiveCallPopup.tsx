"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Phone, Mic, Volume2, X } from 'lucide-react'

interface LiveCallPopupProps {
  callId: string
  onClose: () => void
}

export function LiveCallPopup({ callId, onClose }: LiveCallPopupProps) {
  const [callData, setCallData] = useState({
    customerName: "John Doe",
    phoneNumber: "+1 (555) 123-4567",
    duration: 0,
    sentiment: 0.5,
  })

  useEffect(() => {
    // In a real application, you would fetch live call data here
    // and update it periodically
    const timer = setInterval(() => {
      setCallData(prev => ({
        ...prev,
        duration: prev.duration + 1,
        sentiment: Math.min(1, Math.max(0, prev.sentiment + (Math.random() - 0.5) * 0.1)),
      }))
    }, 1000)

    return () => clearInterval(timer)
  }, [callId])

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <Card className="w-96 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Live Call</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-green-500" />
            <span className="font-medium">{callData.customerName}</span>
          </div>
          <div className="text-sm text-muted-foreground">{callData.phoneNumber}</div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Duration</span>
            <span>{formatDuration(callData.duration)}</span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Sentiment</span>
              <Badge variant={callData.sentiment > 0.6 ? "success" : callData.sentiment < 0.4 ? "destructive" : "default"}>
                {callData.sentiment > 0.6 ? "Positive" : callData.sentiment < 0.4 ? "Negative" : "Neutral"}
              </Badge>
            </div>
            <Progress value={callData.sentiment * 100} className="h-2" />
          </div>
          <div className="flex justify-center space-x-2">
            <Button variant="outline" size="sm">
              <Mic className="h-4 w-4 mr-2" />
              Mute
            </Button>
            <Button variant="outline" size="sm">
              <Volume2 className="h-4 w-4 mr-2" />
              Listen
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

