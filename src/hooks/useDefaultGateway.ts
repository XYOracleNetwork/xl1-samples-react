import type { XyoGatewayProvider } from '@xyo-network/xl1-protocol'
import { useSyncExternalStore } from 'react'

import { getXyoGateway } from '../helpers/index.ts'

interface GatewayState {
  gateway?: XyoGatewayProvider
  error: Error | null
  isLoading: boolean
}

let currentState: GatewayState = {
  gateway: undefined,
  error: null,
  isLoading: false
}

const listeners = new Set<() => void>()

const emitChange = () => {
  listeners.forEach(listener => listener())
}

const updateState = (newState: Partial<GatewayState>) => {
  currentState = { ...currentState, ...newState }
  emitChange()
}

const initializeGateway = async () => {
  if (currentState.isLoading || currentState.gateway) return
  
  updateState({ isLoading: true, error: null })
  
  try {
    const gateway = await getXyoGateway({ assert: true })
    updateState({ gateway, isLoading: false, error: null })
  } catch (error) {
    updateState({ error: error as Error, isLoading: false })
  }
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)
  
  void initializeGateway()
  
  return () => {
    listeners.delete(listener)
  }
}

const getSnapshot = (): GatewayState => currentState

export const useDefaultGateway = () => {
  return useSyncExternalStore(subscribe, getSnapshot)
}

