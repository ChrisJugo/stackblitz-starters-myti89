"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Phone, Mic, PhoneOff, UserPlus, Volume2 } from 'lucide-react'

export function ActiveCallDialog() {
  return (
    <Dialog open>
      <DialogContent className="max-w-6xl h-[80vh] p-0">
        <div className="flex flex-col h-full">
          {/* Call Header */}
          <div className="border-b p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Badge variant="default" className="bg-green-500 text-white animate-pulse">
                Active Call
              </Badge>
              <span className="text-sm text-muted-foreground">Duration: 2:45</span>
            </div>
            <Button variant="destructive" size="sm">
              <PhoneOff className="h-4 w-4 mr-2" />
              End Call
            </Button>
          </div>

          {/* Call Content */}
          <div className="grid grid-cols-2 gap-4 p-4 flex-1">
            {/* Left Panel - Call Controls */}
            <div className="space-y-4">
              <Card className="p-4">
                {/* Waveform Visualization Placeholder */}
                <div className="h-32 bg-accent rounded-md flex items-center justify-center">
                  <Volume2 className="h-8 w-8 text-accent-foreground/50" />
                </div>
                
                {/* Call Controls */}
                <div className="flex justify-center space-x-4 mt-4">
                  <Button variant="outline" size="icon">
                    <Mic className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <UserPlus className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Volume2 className="h-4 w-4" />
                  </Button>
                </div>
              </Card>

              {/* Call Info */}
              <Card className="p-4">
                <h3 className="font-medium mb-2">Call Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Customer ID</span>
                    <span>#123456</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone Number</span>
                    <span>+1 234 567 8900</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Queue Time</span>
                    <span>0:42</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Right Panel - Transcription */}
            <Card className="p-4 flex flex-col">
              <h3 className="font-medium mb-4">Live Transcription</h3>
              <div className="flex-1 space-y-4 overflow-y-auto">
                <div className="bg-accent rounded-lg p-3">
                  <p className="text-sm">Hello, thank you for calling. How can I assist you today?</p>
                  <span className="text-xs text-muted-foreground">Agent - 2:43 PM</span>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-sm">I'd like to inquire about my warranty status.</p>
                  <span className="text-xs text-muted-foreground">Customer - 2:43 PM</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

