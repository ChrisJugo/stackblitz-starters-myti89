"use client"

import { useState } from "react"
import { Upload, File, Link as LinkIcon, Trash2 } from "lucide-react"
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

export function TrainingManager() {
  const [activeFiles, setActiveFiles] = useState([
    { id: 1, name: "Brand Guidelines.pdf", type: "document", status: "active" },
    { id: 2, name: "Customer Service Script.docx", type: "script", status: "processing" },
    { id: 3, name: "https://company.com/faq", type: "url", status: "active" },
  ])

  const [url, setUrl] = useState("")
  const [script, setScript] = useState("")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newFiles = Array.from(files).map((file, index) => ({
        id: activeFiles.length + index + 1,
        name: file.name,
        type: "document",
        status: "processing" as const,
      }))
      setActiveFiles([...activeFiles, ...newFiles])
    }
  }

  const handleAddUrl = () => {
    if (url) {
      setActiveFiles([
        ...activeFiles,
        {
          id: activeFiles.length + 1,
          name: url,
          type: "url",
          status: "active" as const,
        },
      ])
      setUrl("")
    }
  }

  const handleSaveScript = () => {
    if (script) {
      setActiveFiles([
        ...activeFiles,
        {
          id: activeFiles.length + 1,
          name: "Custom Script",
          type: "script",
          status: "active" as const,
        },
      ])
      setScript("")
    }
  }

  const handleDeleteFile = (id: number) => {
    setActiveFiles(activeFiles.filter((file) => file.id !== id))
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>AI Training Data</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="upload" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upload">Upload Files</TabsTrigger>
            <TabsTrigger value="urls">Add URLs</TabsTrigger>
            <TabsTrigger value="scripts">Scripts</TabsTrigger>
          </TabsList>

          <TabsContent value="upload">
            <div className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-8 text-center">
                <Upload className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                <div className="space-y-2">
                  <h3 className="font-medium">Upload Training Files</h3>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop files or click to browse
                  </p>
                </div>
                <Input
                  type="file"
                  className="hidden"
                  id="file-upload"
                  multiple
                  accept=".pdf,.doc,.docx,.txt"
                  onChange={handleFileUpload}
                />
                <Button variant="outline" className="mt-4" onClick={() => document.getElementById('file-upload')?.click()}>
                  Select Files
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="urls">
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input 
                  placeholder="Enter URL (e.g., company knowledge base, documentation)" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <Button onClick={handleAddUrl}>Add URL</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Add URLs to web pages containing company information, FAQs, or documentation
              </p>
            </div>
          </TabsContent>

          <TabsContent value="scripts">
            <div className="space-y-4">
              <Textarea
                className="w-full h-32 p-2 rounded-md border bg-background resize-none"
                placeholder="Enter conversation scripts, responses, or common phrases..."
                value={script}
                onChange={(e) => setScript(e.target.value)}
              />
              <Button onClick={handleSaveScript}>Save Script</Button>
            </div>
          </TabsContent>

          <div className="mt-8">
            <h3 className="font-medium mb-4">Active Training Data</h3>
            <div className="space-y-2">
              {activeFiles.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-accent"
                >
                  <div className="flex items-center space-x-3">
                    {file.type === 'url' ? (
                      <LinkIcon className="h-5 w-5 text-blue-400" />
                    ) : (
                      <File className="h-5 w-5 text-blue-400" />
                    )}
                    <div>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Added on {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge
                      variant={file.status === 'active' ? 'default' : 'secondary'}
                    >
                      {file.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive/90"
                      onClick={() => handleDeleteFile(file.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}

