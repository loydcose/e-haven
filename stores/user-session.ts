import type { JWTPayload } from "jose"
import { createStore } from "zustand/vanilla"
import { useStore } from "zustand"

// Define the user session store
type UserSessionStore = {
  session: JWTPayload | null
  setSession: (session: JWTPayload | null) => void
  resetSession: () => void
}

// Create a vanilla Zustand store
export const userSessionStore = createStore<UserSessionStore>((set) => ({
  session: null,
  setSession: (session) => set(() => ({ session })),
  resetSession: () => set(() => ({ session: null })),
}))

// Create a Zustand hook for client components using `useStore`
export const useUserSessionStore = <T>(
  selector: (state: UserSessionStore) => T
) => useStore(userSessionStore, selector)
