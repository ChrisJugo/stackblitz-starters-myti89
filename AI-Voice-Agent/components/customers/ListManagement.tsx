"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Upload, FileUp, Search, Filter, Save, Send } from 'lucide-react'

// Mock data for demonstration
const mockCustomers = [
  { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", vehicle: "2019 Toyota Camry", lastService: "2023-05-15", warrantyStatus: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "234-567-8901", vehicle: "2020 Honda Civic", lastService: "2023-06-20", warrantyStatus: "Expiring Soon" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", phone: "345-678-9012", vehicle: "2018 Ford F-150", lastService: "2023-04-10", warrantyStatus: "Expired" },
]

export function ListManagement() {
  const [customers, setCustomers] = useState(mockCustomers)
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    warrantyStatus: "",
    vehicleAge: [0, 10],
    lastServiceDate: "",
  })

  const handleImport = (type: "crm" | "file") => {
    // Implement CRM or file import logic here
    console.log(`Importing from ${type}`)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleFilterChange = (key: string, value: any) => {
    setFilters({ ...filters, [key]: value })
  }

  const applyFilters = () => {
    // Implement filter logic here
    console.log("Applying filters:", filters)
  }

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Customer List Management</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="import">
          <TabsList>
            <TabsTrigger value="import">Import</TabsTrigger>
            <TabsTrigger value="manage">Manage</TabsTrigger>
          </TabsList>
          <TabsContent value="import">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button onClick={() => handleImport("crm")}>
                  <FileUp className="mr-2 h-4 w-4" />
                  Import from CRM
                </Button>
                <Button onClick={() => handleImport("file")}>
                  <Upload className="mr-2 h-4 w-4" />
                  Import from File
                </Button>
              </div>
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  Drag and drop files or click to browse
                </p>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="manage">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={searchTerm}
                  onChange={handleSearch}
                />
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Warranty Status</Label>
                  <Select
                    onValueChange={(value) => handleFilterChange("warrantyStatus", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="expiring">Expiring Soon</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Vehicle Age (Years)</Label>
                  <Slider
                    min={0}
                    max={20}
                    step={1}
                    value={filters.vehicleAge}
                    onValueChange={(value) => handleFilterChange("vehicleAge", value)}
                  />
                </div>
                <div>
                  <Label>Last Service Date</Label>
                  <Input
                    type="date"
                    onChange={(e) => handleFilterChange("lastServiceDate", e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={applyFilters}>
                <Filter className="mr-2 h-4 w-4" />
                Apply Filters
              </Button>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Vehicle</TableHead>
                    <TableHead>Last Service</TableHead>
                    <TableHead>Warranty Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCustomers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.vehicle}</TableCell>
                      <TableCell>{customer.lastService}</TableCell>
                      <TableCell>
                        <Badge>{customer.warrantyStatus}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Save List
                </Button>
                <Button>
                  <Send className="mr-2 h-4 w-4" />
                  Create Campaign
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

