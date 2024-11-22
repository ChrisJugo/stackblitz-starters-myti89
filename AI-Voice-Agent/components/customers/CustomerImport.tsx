import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, FileText, UserPlus } from 'lucide-react'

export function CustomerImport() {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Import Customer Data</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="crm">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="crm">CRM Integration</TabsTrigger>
            <TabsTrigger value="upload">File Upload</TabsTrigger>
            <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          </TabsList>
          
          <TabsContent value="crm">
            <div className="space-y-4">
              <Select>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select CRM" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dealertrack">DealerTrack</SelectItem>
                  <SelectItem value="reynolds">Reynolds & Reynolds</SelectItem>
                  <SelectItem value="cdk">CDK Global</SelectItem>
                  <SelectItem value="dealersocket">DealerSocket</SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex justify-end">
                <Button>Connect CRM</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="upload">
            <div className="space-y-4">
              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">CSV, XLS, or XLSX (MAX. 10MB)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                </label>
              </div>
              <div className="flex justify-end">
                <Button>Upload File</Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="manual">
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Customer Name</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" placeholder="+1 (555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="vehicle">Vehicle</Label>
                  <Input id="vehicle" placeholder="2018 Toyota Camry" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit">Add Customer</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

