"use client"

import { useState } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePickerWithRange } from "@/components/ui/date-picker-with-range"
import { Slider } from "@/components/ui/slider"

export function CreateCampaignWizard() {
  const [step, setStep] = useState(1)
  const [campaignData, setCampaignData] = useState({
    name: "",
    description: "",
    targetList: "",
    script: "",
    schedule: {
      dateRange: { from: new Date(), to: new Date() },
      timeSlots: [],
      concurrentCalls: 1
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCampaignData({ ...campaignData, [e.target.name]: e.target.value })
  }

  const handleNext = () => setStep(step + 1)
  const handlePrevious = () => setStep(step - 1)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Campaign - Step {step} of 4</CardTitle>
      </CardHeader>
      <CardContent>
        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                id="name"
                name="name"
                value={campaignData.name}
                onChange={handleInputChange}
                placeholder="Enter campaign name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={campaignData.description}
                onChange={handleInputChange}
                placeholder="Enter campaign description"
              />
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="targetList">Target List</Label>
              <Select onValueChange={(value) => setCampaignData({ ...campaignData, targetList: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a target list" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="list1">Q1 Warranty Expiration List</SelectItem>
                  <SelectItem value="list2">High-Value Customers</SelectItem>
                  <SelectItem value="list3">Service Due Reminders</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="script">Call Script</Label>
              <Select onValueChange={(value) => setCampaignData({ ...campaignData, script: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a script template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="script1">Warranty Renewal Script</SelectItem>
                  <SelectItem value="script2">Service Reminder Script</SelectItem>
                  <SelectItem value="script3">Customer Satisfaction Survey</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="scriptContent">Customize Script</Label>
              <Textarea
                id="scriptContent"
                name="script"
                value={campaignData.script}
                onChange={handleInputChange}
                placeholder="Customize your call script here"
                rows={10}
              />
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Campaign Duration</Label>
              <DatePickerWithRange
                dateRange={campaignData.schedule.dateRange}
                onDateRangeChange={(dateRange) =>
                  setCampaignData({
                    ...campaignData,
                    schedule: { ...campaignData.schedule, dateRange }
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Time Slots</Label>
              <Input type="time" placeholder="Start time" className="mb-2" />
              <Input type="time" placeholder="End time" />
            </div>
            <div className="space-y-2">
              <Label>Concurrent Calls</Label>
              <Slider
                defaultValue={[campaignData.schedule.concurrentCalls]}
                max={10}
                step={1}
                onValueChange={(value) => setCampaignData({
                  ...campaignData,
                  schedule: { ...campaignData.schedule, concurrentCalls: value[0] }
                })}
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {step > 1 && (
          <Button onClick={handlePrevious} variant="outline">
            Previous
          </Button>
        )}
        {step < 4 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={() => console.log("Create campaign", campaignData)}>
            Create Campaign
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

