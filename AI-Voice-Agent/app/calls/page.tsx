"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search } from 'lucide-react'
import { EnhancedQueue } from "@/components/calls/EnhancedQueue"
import { EnhancedCallDialog } from "@/components/calls/EnhancedCallDialog"

const calls = [
  { id: 1, number: "+1 234 567 890", status: "Active", duration: "2m 34s" },
  { id: 2, number: "+1 987 654 321", status: "Completed", duration: "5m 12s" },
  { id: 3, number: "+1 555 123 456", status: "Failed", duration: "0m 45s" },
]

export default function CallManagement() {
  const [selectedCall, setSelectedCall] = useState(null)
  const [showCallDialog, setShowCallDialog] = useState(false)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Call Management</h1>
      <div className="flex justify-between items-center">
        <form className="relative w-[300px]">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search calls..." className="pl-8" />
        </form>
        <Button onClick={() => setShowCallDialog(true)}>New Call</Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Active Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Number</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {calls.map((call) => (
                  <TableRow key={call.id}>
                    <TableCell>{call.number}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          call.status === "Active"
                            ? "default"
                            : call.status === "Completed"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {call.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{call.duration}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setSelectedCall(call)
                          setShowCallDialog(true)
                        }}
                      >
                        Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Call Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedCall ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Number</div>
                    <div>{selectedCall.number}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Status</div>
                    <div>{selectedCall.status}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-muted-foreground">Duration</div>
                    <div>{selectedCall.duration}</div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Transcription</h3>
                  <p className="text-sm text-muted-foreground">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                Select a call to view details
              </p>
            )}
          </CardContent>
        </Card>
      </div>
      <EnhancedQueue />
      <EnhancedCallDialog 
        open={showCallDialog} 
        onOpenChange={setShowCallDialog}
      />
    </div>
  )
}

