"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { X, Phone, Mic, PhoneOff, UserPlus, Volume2, AlertCircle, MessageSquare, Clock, FileText, Heart, ChevronRight, Car, Calendar, DollarSign } from 'lucide-react'

interface EnhancedCallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EnhancedCallDialog({ open, onOpenChange }: EnhancedCallDialogProps) {
  const [activeTab, setActiveTab] = useState('transcription')
  const [isMuted, setIsMuted] = useState(false)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-7xl h-[90vh] p-0 gap-0">
        <div className="flex flex-col h-full">
          {/* Enhanced Header with Vehicle Info */}
          <div className="border-b p-6 bg-background">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Badge variant="default" className="bg-green-500 text-white animate-pulse">
                  Live Call
                </Badge>
                <div className="flex flex-col">
                  <span className="font-medium text-lg">John Doe</span>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Car className="h-4 w-4 mr-1" />
                    2020 Toyota Camry - Warranty expires in 30 days
                  </div>
                </div>
                <Badge variant="outline">Priority: High</Badge>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <div className="text-sm font-medium">Duration</div>
                  <div className="text-2xl tabular-nums tracking-tight">02:45</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="destructive" size="lg">
                    <PhoneOff className="h-4 w-4 mr-2" />
                    End Call
                  </Button>
                  <DialogClose asChild>
                    <Button variant="outline" size="icon" className="h-10 w-10">
                      <X className="h-4 w-4" />
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-4 gap-4 mt-4">
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Sentiment</span>
                  <Heart className="h-4 w-4 text-green-500" />
                </div>
                <div className="mt-1 text-2xl font-semibold">Positive</div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Script Match</span>
                  <FileText className="h-4 w-4 text-blue-500" />
                </div>
                <div className="mt-1 text-2xl font-semibold">92%</div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Next Service</span>
                  <Calendar className="h-4 w-4 text-orange-500" />
                </div>
                <div className="mt-1 text-2xl font-semibold">15 Days</div>
              </Card>
              <Card className="p-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Warranty Value</span>
                  <DollarSign className="h-4 w-4 text-green-500" />
                </div>
                <div className="mt-1 text-2xl font-semibold">$2,400</div>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-12 gap-4 p-4 flex-1 overflow-hidden">
            {/* Left Panel - Call Controls & Info */}
            <div className="col-span-5 space-y-4 overflow-y-auto">
              <Card className="p-4">
                {/* Waveform Visualization */}
                <div className="h-32 bg-accent rounded-md flex items-center justify-center relative">
                  <Volume2 className="h-8 w-8 text-accent-foreground/50" />
                  {/* Add actual waveform visualization here */}
                  <div className="absolute bottom-2 left-2">
                    <Progress value={65} className="w-24 h-1" />
                  </div>
                </div>
                
                {/* Call Controls */}
                <div className="flex justify-center space-x-4 mt-4">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                    className={isMuted ? "bg-red-500/10 text-red-500" : ""}
                  >
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

              {/* Vehicle Info */}
              <Card className="p-4">
                <h3 className="font-medium mb-4">Vehicle Information</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Vehicle</span>
                      <span>2020 Toyota Camry SE</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">VIN</span>
                      <span>1HGCM82633A123456</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Mileage</span>
                      <span>45,230 miles</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-medium mb-2">Current Warranty</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Type</span>
                        <span>Extended Powertrain</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Expires</span>
                        <span className="text-orange-500">30 days</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Coverage</span>
                        <span>60,000 miles</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="p-4">
                <h3 className="font-medium mb-4">Quick Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-between">
                    <span>Schedule Service Appointment</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    <span>View Service History</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="w-full justify-between">
                    <span>Generate Warranty Quote</span>
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            </div>

            {/* Right Panel - Transcription & Info */}
            <div className="col-span-7 flex flex-col overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
                <TabsList>
                  <TabsTrigger value="transcription">Live Transcription</TabsTrigger>
                  <TabsTrigger value="script">Script</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                </TabsList>

                <div className="flex-1 overflow-hidden">
                  <TabsContent value="transcription" className="h-full">
                    <Card className="h-full">
                      <div className="p-4 space-y-4 h-full overflow-y-auto">
                        <div className="bg-accent rounded-lg p-3">
                          <p className="text-sm">Hello, this is Alisa from Toyota of Springfield. I'm calling about your 2020 Camry's extended warranty coverage.</p>
                          <span className="text-xs text-muted-foreground">Agent - 2:43 PM</span>
                        </div>
                        <div className="bg-muted rounded-lg p-3">
                          <p className="text-sm">Oh yes, I've been meaning to look into that. What do I need to know?</p>
                          <span className="text-xs text-muted-foreground">Customer - 2:43 PM</span>
                        </div>
                        <div className="bg-accent rounded-lg p-3">
                          <p className="text-sm">I see your current warranty expires in 30 days. We have some excellent renewal options to ensure your Camry stays protected.</p>
                          <span className="text-xs text-muted-foreground">Agent - 2:44 PM</span>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="script" className="h-full">
                    <Card className="h-full">
                      <div className="p-4 space-y-4 h-full overflow-y-auto">
                        <div className="space-y-2">
                          <h4 className="font-medium">Warranty Renewal Script</h4>
                          <div className="text-sm space-y-4">
                            <p>1. Greeting: "Hello, this is [Name] from [Dealership]. I'm calling about your [Year] [Model]'s warranty coverage."</p>
                            <p>2. Verify: "I see you purchased your vehicle on [Date]. Is that correct?"</p>
                            <p>3. Current Status: "Your current warranty expires in [X] days/miles. Are you aware of this?"</p>
                            <p>4. Value Proposition: "We have several coverage options that can help protect your investment..."</p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-medium">Recommended Responses</h4>
                          <div className="space-y-2">
                            <Button variant="outline" className="w-full justify-start text-sm">
                              "Let me explain our most popular coverage option..."
                            </Button>
                            <Button variant="outline" className="w-full justify-start text-sm">
                              "Would you like to hear about our special renewal pricing?"
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </TabsContent>

                  <TabsContent value="notes" className="h-full">
                    <Card className="h-full">
                      <div className="p-4 space-y-4 h-full overflow-y-auto">
                        <textarea
                          className="w-full h-full min-h-[200px] p-2 bg-background resize-none text-sm"
                          placeholder="Add call notes here..."
                        />
                      </div>
                    </Card>
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

