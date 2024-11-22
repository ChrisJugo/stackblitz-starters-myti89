"use client"

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  action?: {
    label: string;
    handler: () => void;
  };
  autoClose?: boolean;
}

export function GlobalNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])

  // Mock function to add notifications (replace with actual implementation)
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    }
    setNotifications(prev => [...prev, newNotification])
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  useEffect(() => {
    // Mock notifications (replace with actual data fetching)
    const mockNotifications: Omit<Notification, 'id' | 'timestamp'>[] = [
      {
        type: 'success',
        title: 'Call Completed',
        message: 'Successfully resolved customer inquiry',
        autoClose: true,
      },
      {
        type: 'warning',
        title: 'High Call Volume',
        message: 'Unusually high number of incoming calls',
        action: {
          label: 'View Queue',
          handler: () => console.log('Viewing queue'),
        },
      },
    ]

    mockNotifications.forEach(notification => {
      addNotification(notification)
    })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setNotifications(prev => 
        prev.filter(notification => {
          if (notification.autoClose) {
            const now = new Date()
            const diff = now.getTime() - notification.timestamp.getTime()
            return diff < 5000 // Remove after 5 seconds
          }
          return true
        })
      )
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (notifications.length === 0) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-2">
      {notifications.map(notification => (
        <Card
          key={notification.id}
          className={`p-4 w-80 shadow-lg transition-all duration-200 ${
            notification.type === 'success' ? 'bg-[#22c55e] text-white' :
            notification.type === 'warning' ? 'bg-[#f59e0b] text-white' :
            notification.type === 'error' ? 'bg-[#ef4444] text-white' :
            'bg-[#3b82f6] text-white'
          }`}
        >
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-medium">{notification.title}</h4>
              <p className="text-sm mt-1">{notification.message}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 text-white hover:bg-white/20"
              onClick={() => removeNotification(notification.id)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {notification.action && (
            <Button
              variant="outline"
              size="sm"
              className="mt-2 bg-white text-black hover:bg-white/90"
              onClick={notification.action.handler}
            >
              {notification.action.label}
            </Button>
          )}
        </Card>
      ))}
    </div>
  )
}

