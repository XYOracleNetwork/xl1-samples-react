import type { XyoClient } from '@xyo-network/xl1-protocol'
import { useSyncExternalStore } from 'react'

import { getXyoClient } from '../helpers/index.ts'

interface ClientState {
  client?: XyoClient
  error: Error | null
  isLoading: boolean
}

let currentState: ClientState = {
  client: undefined,
  error: null,
  isLoading: false,
}

const listeners = new Set<() => void>()

const emitChange = () => {
  for (const listener of listeners) listener()
}

const updateState = (newState: Partial<ClientState>) => {
  currentState = { ...currentState, ...newState }
  emitChange()
}

const initializeClient = async () => {
  if (currentState.isLoading || currentState.client) return

  updateState({ isLoading: true, error: null })

  try {
    const client = await getXyoClient()
    updateState({
      client, isLoading: false, error: null,
    })
  } catch (error) {
    updateState({ error: error as Error, isLoading: false })
  }
}

const subscribe = (listener: () => void) => {
  listeners.add(listener)

  void initializeClient()

  return () => {
    listeners.delete(listener)
  }
}

const getSnapshot = (): ClientState => currentState

export const useClient = () => {
  return useSyncExternalStore(subscribe, getSnapshot)
}
