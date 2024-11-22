"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Campaign } from '@/types'

interface CampaignContextType {
  campaigns: Campaign[]
  addCampaign: (campaign: Campaign) => void
  updateCampaign: (id: string, updatedCampaign: Partial<Campaign>) => void
  deleteCampaign: (id: string) => void
}

const CampaignContext = createContext<CampaignContextType | undefined>(undefined)

export function CampaignProvider({ children }: { children: React.ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])

  useEffect(() => {
    // Fetch campaigns from API or local storage
    // This is a mock implementation
    const fetchCampaigns = async () => {
      // Simulating API call
      const response = await fetch('/api/campaigns')
      const data = await response.json()
      setCampaigns(data)
    }

    fetchCampaigns()
  }, [])

  const addCampaign = (campaign: Campaign) => {
    setCampaigns([...campaigns, campaign])
  }

  const updateCampaign = (id: string, updatedCampaign: Partial<Campaign>) => {
    setCampaigns(campaigns.map(campaign => 
      campaign.id === id ? { ...campaign, ...updatedCampaign } : campaign
    ))
  }

  const deleteCampaign = (id: string) => {
    setCampaigns(campaigns.filter(campaign => campaign.id !== id))
  }

  return (
    <CampaignContext.Provider value={{ campaigns, addCampaign, updateCampaign, deleteCampaign }}>
      {children}
    </CampaignContext.Provider>
  )
}

export function useCampaign() {
  const context = useContext(CampaignContext)
  if (context === undefined) {
    throw new Error('useCampaign must be used within a CampaignProvider')
  }
  return context
}

