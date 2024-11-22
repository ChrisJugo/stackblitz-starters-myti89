"use client"

import { useState } from "react"
import { Upload, File, LinkIcon, Trash2, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"

interface ScriptTemplate {
  id: string;
  name: string;
  category: string;
  content: string;
  variables: string[];
  successRate?: number;
}

const scriptTemplates: ScriptTemplate[] = [
  {
    id: "warranty-expiring",
    name: "Warranty Expiration Outreach",
    category: "warranty",
    content: `Hello {customer_name}, this is {agent_name} from {dealership_name}. 
    I'm calling about your {vehicle_year} {vehicle_model}'s warranty that's expiring in {days_until_expiration} days. 
    We have some excellent renewal options that I'd like to discuss with you...`,
    variables: ["customer_name", "agent_name", "dealership_name", "vehicle_year", "vehicle_model", "days_until_expiration"],
    successRate: 32
  },
  {
    id: "service-due",
    name: "Service Due Reminder",
    category: "service",
    content: `Hi {customer_name}, this is {agent_name} from {dealership_name} service department. 
    According to our records, your {vehicle_year} {vehicle_model} is due for {service_type}. 
    Would you like to schedule an appointment?`,
    variables: ["customer_name", "agent_name", "dealership_name", "vehicle_year", "vehicle_model", "service_type"],
    successRate: 45
  }
]

export function EnhancedTrainingManager() {
  const [activeTab, setActiveTab] = useState("scripts")
  const [selectedTemplate, setSelectedTemplate] = useState<ScriptTemplate | null>(null)

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Training & Knowledge Base Manager</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="scripts">Call Scripts</TabsTrigger>
            <TabsTrigger value="responses">Response Library</TabsTrigger>
            <TabsTrigger value="products">Product Knowledge</TabsTrigger>
            <TabsTrigger value="policies">Policies & Procedures</TabsTrigger>
          </TabsList>

          <TabsContent value="scripts" className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h3 className="font-medium">Script Templates</h3>
                <p className="text-sm text-muted-foreground">
                  Manage and customize call scripts for different scenarios
                </p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                New Template
              </Button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Script List */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Available Templates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {scriptTemplates.map((template) => (
                      <div
                        key={template.id}
                        className={`p-3 rounded-lg cursor-pointer transition-colors
                          ${selectedTemplate?.id === template.id ? 'bg-accent' : 'hover:bg-accent/50'}`}
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-medium">{template.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Success Rate: {template.successRate}%
                            </div>
                          </div>
                          <Badge>{template.category}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Script Editor */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Script Editor</CardTitle>
                </CardHeader>
                <CardContent>
                  {selectedTemplate ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Template Name</Label>
                        <Input value={selectedTemplate.name} />
                      </div>
                      <div className="space-y-2">
                        <Label>Category</Label>
                        <Select defaultValue={selectedTemplate.category}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="warranty">Warranty</SelectItem>
                            <SelectItem value="service">Service</SelectItem>
                            <SelectItem value="sales">Sales</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Script Content</Label>
                        <Textarea 
                          value={selectedTemplate.content}
                          rows={8}
                          className="font-mono text-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Variables</Label>
                        <div className="flex flex-wrap gap-2">
                          {selectedTemplate.variables.map((variable) => (
                            <Badge key={variable} variant="outline">
                              {`{${variable}}`}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline">Reset</Button>
                        <Button>Save Changes</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-muted-foreground p-8">
                      Select a template to edit
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="responses" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Common Responses Library</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Warranty Objections */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Warranty Objections</h3>
                    <div className="grid gap-4">
                      <div className="p-4 bg-accent rounded-lg">
                        <div className="font-medium mb-2">Price Objection</div>
                        <p className="text-sm text-muted-foreground mb-2">
                          "I understand your concern about the cost. Let's break down the coverage value..."
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">Success Rate: 75%</Badge>
                          <Button variant="outline" size="sm">Use Template</Button>
                        </div>
                      </div>

                      <div className="p-4 bg-accent rounded-lg">
                        <div className="font-medium mb-2">Already Have Coverage</div>
                        <p className="text-sm text-muted-foreground mb-2">
                          "That's great that you're thinking about protection. Let me show you how our coverage compares..."
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">Success Rate: 68%</Badge>
                          <Button variant="outline" size="sm">Use Template</Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Service Responses */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Service Scheduling</h3>
                    <div className="grid gap-4">
                      <div className="p-4 bg-accent rounded-lg">
                        <div className="font-medium mb-2">Maintenance Due</div>
                        <p className="text-sm text-muted-foreground mb-2">
                          "Based on your vehicle's mileage, we recommend scheduling these key services..."
                        </p>
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">Success Rate: 82%</Badge>
                          <Button variant="outline" size="sm">Use Template</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Warranty Products Knowledge Base</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="basic">
                  <TabsList>
                    <TabsTrigger value="basic">Basic Coverage</TabsTrigger>
                    <TabsTrigger value="extended">Extended Protection</TabsTrigger>
                    <TabsTrigger value="premium">Premium Plans</TabsTrigger>
                  </TabsList>

                  <TabsContent value="basic" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div className="grid gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle>Basic Powertrain Warranty</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div>
                                <h4 className="font-medium mb-2">Coverage Details</h4>
                                <ul className="list-disc pl-4 space-y-1 text-sm">
                                  <li>Engine components</li>
                                  <li>Transmission systems</li>
                                  <li>Drive axle</li>
                                  <li>Basic electrical systems</li>
                                </ul>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Key Selling Points</h4>
                                <ul className="list-disc pl-4 space-y-1 text-sm">
                                  <li>Most affordable option</li>
                                  <li>Essential coverage for critical components</li>
                                  <li>Transferable coverage</li>
                                  <li>No deductible option available</li>
                                </ul>
                              </div>
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-sm font-medium">Average Cost</div>
                                  <div className="text-2xl font-bold">$1,200</div>
                                </div>
                                <Button>View Full Details</Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="policies" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Policies & Procedures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Compliance Requirements */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Compliance Guidelines</h3>
                    <div className="grid gap-4">
                      <div className="p-4 bg-accent rounded-lg">
                        <div className="font-medium mb-2">Call Recording Notice</div>
                        <p className="text-sm text-muted-foreground">
                          "This call may be recorded for quality and training purposes..."
                        </p>
                        <Badge className="mt-2">Required</Badge>
                      </div>
                      
                      <div className="p-4 bg-accent rounded-lg">
                        <div className="font-medium mb-2">Warranty Disclosure</div>
                        <p className="text-sm text-muted-foreground">
                          "The following are the terms and conditions of the warranty coverage..."
                        </p>
                        <Badge className="mt-2">Required</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Call Procedures */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Call Procedures</h3>
                    <div className="grid gap-4">
                      <div className="p-4 bg-accent rounded-lg">
                        <div className="font-medium mb-2">Customer Verification</div>
                        <p className="text-sm text-muted-foreground">
                          Steps to verify customer identity and vehicle ownership
                        </p>
                        <Button variant="outline" className="mt-2">View Checklist</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

