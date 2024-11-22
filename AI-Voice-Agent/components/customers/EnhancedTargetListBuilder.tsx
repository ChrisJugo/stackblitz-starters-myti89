"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FilterState {
  vehicle: {
    age: string[];
    mileage: [number, number];
    make: string[];
    type: string[];
  };
  warranty: {
    status: string[];
    expirationWindow: number;
    type: string[];
    value: [number, number];
  };
  service: {
    lastVisit: number;
    frequency: string;
    spending: [number, number];
    dueForService: boolean;
  };
  customer: {
    loyaltyTier: string[];
    lifetimeValue: [number, number];
    leadSource: string[];
  };
}

export function EnhancedTargetListBuilder() {
  const [filters, setFilters] = useState<FilterState>({
    vehicle: {
      age: [],
      mileage: [0, 150000],
      make: [],
      type: [],
    },
    warranty: {
      status: [],
      expirationWindow: 90,
      type: [],
      value: [1000, 5000],
    },
    service: {
      lastVisit: 180,
      frequency: 'any',
      spending: [0, 10000],
      dueForService: false,
    },
    customer: {
      loyaltyTier: [],
      lifetimeValue: [0, 100000],
      leadSource: [],
    },
  })

  const quickFilters = [
    {
      label: "Warranty Expiring (30 Days)",
      filter: { warranty: { ...filters.warranty, expirationWindow: 30 } }
    },
    {
      label: "High-Value Service Due",
      filter: { service: { ...filters.service, dueForService: true } }
    },
    {
      label: "Premium Vehicle Owners",
      filter: { vehicle: { ...filters.vehicle, type: ['luxury', 'premium'] } }
    },
    {
      label: "Loyal Customers (Gold+)",
      filter: { customer: { ...filters.customer, loyaltyTier: ['gold', 'platinum'] } }
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Advanced Target List Builder</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Quick Filters */}
          <div className="space-y-2">
            <Label>Quick Filters</Label>
            <div className="flex flex-wrap gap-2">
              {quickFilters.map((filter) => (
                <Badge
                  key={filter.label}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                  onClick={() => setFilters({ ...filters, ...filter.filter })}
                >
                  {filter.label}
                </Badge>
              ))}
            </div>
          </div>

          {/* Vehicle Filters */}
          <div className="space-y-4">
            <h3 className="font-medium">Vehicle Criteria</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Vehicle Age</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select age range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-3">0-3 Years</SelectItem>
                    <SelectItem value="3-5">3-5 Years</SelectItem>
                    <SelectItem value="5-7">5-7 Years</SelectItem>
                    <SelectItem value="7+">7+ Years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Mileage Range</Label>
                <div className="pt-2">
                  <Slider
                    value={[filters.vehicle.mileage[0]]}
                    max={150000}
                    step={5000}
                    onValueChange={(value) => 
                      setFilters({
                        ...filters,
                        vehicle: { 
                          ...filters.vehicle,
                          mileage: [value[0], filters.vehicle.mileage[1]]
                        }
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Warranty Filters */}
          <div className="space-y-4">
            <h3 className="font-medium">Warranty Status</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Expiration Window</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">Next 30 Days</SelectItem>
                    <SelectItem value="60">Next 60 Days</SelectItem>
                    <SelectItem value="90">Next 90 Days</SelectItem>
                    <SelectItem value="expired">Recently Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Coverage Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select coverage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="powertrain">Powertrain</SelectItem>
                    <SelectItem value="extended">Extended</SelectItem>
                    <SelectItem value="comprehensive">Comprehensive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Service History Filters */}
          <div className="space-y-4">
            <h3 className="font-medium">Service History</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Last Service Visit</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select timeframe" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="90">Within 90 Days</SelectItem>
                    <SelectItem value="180">Within 180 Days</SelectItem>
                    <SelectItem value="365">Within 1 Year</SelectItem>
                    <SelectItem value="365+">Over 1 Year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Service Frequency</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="regular">Regular</SelectItem>
                    <SelectItem value="occasional">Occasional</SelectItem>
                    <SelectItem value="rare">Rare</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Results and Actions */}
          <div className="border-t pt-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Matched Customers: 245</h3>
                <p className="text-sm text-muted-foreground">Estimated campaign value: $147,000</p>
              </div>
              <div className="space-x-2">
                <Button variant="outline">Save List</Button>
                <Button>Create Campaign</Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

