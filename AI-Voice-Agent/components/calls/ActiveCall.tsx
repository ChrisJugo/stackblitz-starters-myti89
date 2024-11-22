"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { speechServices } from '@/lib/api/speech/services'
import { nlpServices } from '@/lib/api/nlp/services'
import { callServices } from '@/lib/api/calls/services'
import { CallState } from '@/lib/api/calls/types'
import { SpeechRecognitionResult } from '@/lib/api/speech/types'
import { NLPResult } from '@/lib/api/nlp/types'

export function ActiveCall() {
  const [callState, setCallState] = useState<CallState | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcription, setTranscription] = useState<SpeechRecognitionResult | null>(null)
  const [nlpResult, setNlpResult] = useState<NLPResult | null>(null)

  const startCall = async () => {
    setIsProcessing(true)
    try {
      const call = await callServices.initiateCall({
        customerId: '123',
        priority: 'high',
        recordingEnabled: true
      })
      
      // Start speech recognition
      await speechServices.startRecognition({
        contentType: 'audio/wav',
        language: 'en-US'
      })
      
      setCallState(call)
    } catch (error) {
      console.error('Failed to start call:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const endCall = async () => {
    if (!callState) return

    setIsProcessing(true)
    try {
      await callServices.endCall(callState.id)
      await speechServices.endRecognition('mock-session')
      setCallState(null)
    } catch (error) {
      console.error('Failed to end call:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const processInput = async (text: string) => {
    try {
      const result = await nlpServices.processInput(text, {
        modelName: 'default',
        confidence: 0.7,
        language: 'en'
      })
      setNlpResult(result)
    } catch (error) {
      console.error('Failed to process input:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Active Call</CardTitle>
      </CardHeader>
      <CardContent>
        {callState ? (
          <div>
            <p>Call Status: {callState.status}</p>
            <p>Duration: {callState.duration} seconds</p>
            <Button onClick={endCall} disabled={isProcessing}>End Call</Button>
          </div>
        ) : (
          <Button onClick={startCall} disabled={isProcessing}>Start Call</Button>
        )}
        {transcription && (
          <div>
            <h3>Transcription</h3>
            <p>{transcription.text}</p>
          </div>
        )}
        {nlpResult && (
          <div>
            <h3>NLP Result</h3>
            <p>Intent: {nlpResult.intent.name} (Confidence: {nlpResult.intent.confidence})</p>
            <p>Next Actions: {nlpResult.nextActions.join(', ')}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

