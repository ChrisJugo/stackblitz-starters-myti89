"use client"

import { useState, useCallback } from "react"
import { useDropzone } from 'react-dropzone'
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { ArrowRight, Search, Filter, Upload, FileUp, Tag, Plus, Save, List, FileText } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Contact {
  id: number
  name: string
  email: string
  phone: string
  tags: string[]
  vehicleAge?: number
  mileage?: number
  warrantyStatus?: string
  loyaltyTier?: string
}

interface SavedList {
  id: string
  name: string
  filters: typeof defaultFilters
  contacts: number[]
}

const mockContacts: Contact[] = [
  { 
    id: 1, 
    name: "John Doe", 
    email: "john@example.com", 
    phone: "123-456-7890", 
    tags: ["VIP", "Service Due"],
    vehicleAge: 3,
    mileage: 45000,
    warrantyStatus: "Active",
    loyaltyTier: "Gold"
  },
  { 
    id: 2, 
    name: "Jane Smith", 
    email: "jane@example.com", 
    phone: "234-567-8901", 
    tags: ["New Customer"],
    vehicleAge: 1,
    mileage: 15000,
    warrantyStatus: "Active",
    loyaltyTier: "Silver"
  },
  { 
    id: 3, 
    name: "Bob Johnson", 
    email: "bob@example.com", 
    phone: "345-678-9012", 
    tags: ["Warranty Expiring"],
    vehicleAge: 5,
    mileage: 75000,
    warrantyStatus: "Expiring",
    loyaltyTier: "Bronze"
  },
]

const defaultFilters = {
  vehicleAge: [0, 10],
  mileage: [0, 150000],
  warrantyStatus: "",
  loyaltyTier: "",
}

export function TargetListBuilder() {
  const [activeTab, setActiveTab] = useState("contacts")
  const [filters, setFilters] = useState(defaultFilters)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedContacts, setSelectedContacts] = useState<number[]>([])
  const [contacts, setContacts] = useState<Contact[]>(mockContacts)
  const [savedLists, setSavedLists] = useState<SavedList[]>([])
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [newListName, setNewListName] = useState("")
  const [importProgress, setImportProgress] = useState<number | null>(null)

  // File upload handling
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader()
      
      reader.onabort = () => toast({
        title: "File reading was aborted",
        variant: "destructive"
      })
      
      reader.onerror = () => toast({
        title: "File reading has failed",
        variant: "destructive"
      })
      
      reader.onload = () => {
        // Start progress simulation
        setImportProgress(0)
        const interval = setInterval(() => {
          setImportProgress(prev => {
            if (prev === null || prev >= 100) {
              clearInterval(interval)
              return null
            }
            return prev + 10
          })
        }, 500)

        // Process CSV/Excel file
        try {
          // Mock implementation - in real app, parse the file content
          const newContacts: Contact[] = [
            // ... parsed contacts would go here
          ]
          setContacts(prev => [...prev, ...newContacts])
          toast({
            title: "File imported successfully",
            description: `Imported ${newContacts.length} contacts`
          })
        } catch (error) {
          toast({
            title: "Error importing file",
            description: "Please check the file format and try again",
            variant: "destructive"
          })
        }
      }
      
      reader.readAsText(file)
    })
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'text/csv': ['.csv'],
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    }
  })

  const handleImportCRM = async () => {
    // Mock CRM import
    setImportProgress(0)
    const interval = setInterval(() => {
      setImportProgress(prev => {
        if (prev === null || prev >= 100) {
          clearInterval(interval)
          toast({
            title: "CRM Import Complete",
            description: "Successfully imported contacts from CRM"
          })
          return null
        }
        return prev + 10
      })
    }, 500)
  }

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
  }

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const toggleContactSelection = (contactId: number) => {
    setSelectedContacts(prev => 
      prev.includes(contactId)
        ? prev.filter(id => id !== contactId)
        : [...prev, contactId]
    )
  }

  const handleSaveList = () => {
    if (!newListName.trim()) {
      toast({
        title: "Please enter a list name",
        variant: "destructive"
      })
      return
    }

    const newList: SavedList = {
      id: Date.now().toString(),
      name: newListName,
      filters: filters,
      contacts: selectedContacts
    }

    setSavedLists(prev => [...prev, newList])
    setNewListName("")
    setShowSaveDialog(false)
    toast({
      title: "List saved successfully",
      description: `Created new list: ${newListName}`
    })
  }

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = 
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone.includes(searchTerm)

    const matchesFilters =
      (!filters.warrantyStatus || contact.warrantyStatus === filters.warrantyStatus) &&
      (!filters.loyaltyTier || contact.loyaltyTier === filters.loyaltyTier) &&
      (contact.vehicleAge !== undefined && 
        contact.vehicleAge >= filters.vehicleAge[0] && 
        contact.vehicleAge <= filters.vehicleAge[1]) &&
      (contact.mileage !== undefined && 
        contact.mileage >= filters.mileage[0] && 
        contact.mileage <= filters.mileage[1])

    return matchesSearch && matchesFilters
  })

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Target List Builder</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="import">Import</TabsTrigger>
              <TabsTrigger value="contacts">Contacts & Lists</TabsTrigger>
              <TabsTrigger value="active">Active Campaigns</TabsTrigger>
            </TabsList>
            
            <TabsContent value="import">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Button onClick={handleImportCRM}>
                    <FileUp className="mr-2 h-4 w-4" />
                    Import from CRM
                  </Button>
                  <Button onClick={() => document.getElementById('file-upload')?.click()}>
                    <Upload className="mr-2 h-4 w-4" />
                    Import from File
                  </Button>
                </div>

                <div
                  {...getRootProps()}
                  className={`
                    border-2 border-dashed rounded-lg p-8 text-center transition-colors
                    ${isDragActive ? 'border-primary bg-primary/10' : 'border-border'}
                  `}
                >
                  <input {...getInputProps()} id="file-upload" />
                  <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {isDragActive
                      ? "Drop the files here..."
                      : "Drag and drop files or click to browse"}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Supported formats: CSV, Excel (.xlsx, .xls)
                  </p>
                </div>

                {importProgress !== null && (
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground text-center">
                      Importing... {importProgress}%
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2.5">
                      <div
                        className="bg-primary h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${importProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="contacts">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search contacts..." 
                      value={searchTerm}
                      onChange={handleSearch}
                      className="w-[300px]"
                    />
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" onClick={() => setShowSaveDialog(true)}>
                      <Save className="h-4 w-4 mr-2" />
                      Save List
                    </Button>
                    <Button variant="outline">
                      <List className="h-4 w-4 mr-2" />
                      Saved Lists ({savedLists.length})
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Vehicle Age</Label>
                      <Select 
                        value={filters.vehicleAge.join('-')} 
                        onValueChange={(value) => {
                          const [min, max] = value.split('-').map(Number)
                          handleFilterChange("vehicleAge", [min, max])
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select age range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-3">0-3 Years</SelectItem>
                          <SelectItem value="3-5">3-5 Years</SelectItem>
                          <SelectItem value="5-7">5-7 Years</SelectItem>
                          <SelectItem value="7-10">7+ Years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Mileage Range</Label>
                      <Slider
                        value={[filters.mileage[0], filters.mileage[1]]}
                        min={0}
                        max={150000}
                        step={5000}
                        onValueChange={(value) => handleFilterChange("mileage", value)}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{filters.mileage[0].toLocaleString()}</span>
                        <span>{filters.mileage[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Warranty Status</Label>
                      <Select 
                        value={filters.warrantyStatus}
                        onValueChange={(value) => handleFilterChange("warrantyStatus", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Expiring">Expiring Soon</SelectItem>
                          <SelectItem value="Expired">Expired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Loyalty Tier</Label>
                      <Select 
                        value={filters.loyaltyTier}
                        onValueChange={(value) => handleFilterChange("loyaltyTier", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select tier" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Platinum">Platinum</SelectItem>
                          <SelectItem value="Gold">Gold</SelectItem>
                          <SelectItem value="Silver">Silver</SelectItem>
                          <SelectItem value="Bronze">Bronze</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[50px]">
                        <Checkbox 
                          checked={selectedContacts.length === filteredContacts.length}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedContacts(filteredContacts.map(c => c.id))
                            } else {
                              setSelectedContacts([])
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Vehicle Age</TableHead>
                      <TableHead>Mileage</TableHead>
                      <TableHead>Warranty</TableHead>
                      <TableHead>Tier</TableHead>
                      <TableHead>Tags</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.map((contact) => (
                      <TableRow key={contact.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedContacts.includes(contact.id)}
                            onCheckedChange={() => toggleContactSelection(contact.id)}
                          />
                        </TableCell>
                        <TableCell>{contact.name}</TableCell>
                        <TableCell>{contact.email}</TableCell>
                        <TableCell>{contact.phone}</TableCell>
                        <TableCell>{contact.vehicleAge} years</TableCell>
                        <TableCell>{contact.mileage?.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge variant={
                            contact.warrantyStatus === "Active" ? "default" :
                            contact.warrantyStatus === "Expiring" ? "warning" : "destructive"
                          }>
                            {contact.warrantyStatus}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary">{contact.loyaltyTier}</Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-wrap gap-1">
                            {contact.tags.map((tag, index) => (
                              <Badge key={index} variant="outline">{tag}</Badge>
                            ))}
                            <Button variant="ghost" size="sm" className="h-5 w-5 p-0">
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {selectedContacts.length} contacts selected
                  </div>
                  <Button disabled={selectedContacts.length === 0}>
                    Create Campaign
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="active">
              <div className="space-y-4">
                {savedLists.map(list => (
                  <div key={list.id} className="flex items-center justify-between p-4 rounded-lg bg-accent hover:bg-accent/80 cursor-pointer transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span className="font-medium">{list.name}</span>
                        <Badge variant="secondary">
                          {list.contacts.length} contacts
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">Edit</Button>
                      <Button variant="ghost" size="sm">Delete</Button>
                      <Link href={`/campaigns/new?list=${list.id}`}>
                        <Button size="sm">
                          Create Campaign
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
                {savedLists.length === 0 && (
                  <div className="text-center text-muted-foreground py-8">
                    No saved lists yet. Create one by selecting contacts and clicking "Save List".
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Contact List</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>List Name</Label>
              <Input
                placeholder="Enter list name"
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              This list will include {selectedContacts.length} selected contacts and the current filter settings.
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowSaveDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveList}>
              Save List
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

