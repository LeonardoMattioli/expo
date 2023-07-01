import 'react-native-url-polyfill/auto'
import * as SecureStore from 'expo-secure-store'
import { createClient } from '@supabase/supabase-js'

const store = new Map<string, string>();

const ExpoSecureStoreAdapter = {
  getItem: (key: string) => {
    return SecureStore.getItemAsync(key)
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key, value)
  },
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key)
  },
}

const InsecureStoreAdapter = {
  getItem: (key: string) => {
    return Promise.resolve(store.get(key))
  },
  setItem: (key: string, value: string) => {
    store.set(key, value)
  },
  removeItem: (key: string) => {
    store.delete(key)
  },
}

const Store = (process.env.BUILD_ENV == "TEST") ? InsecureStoreAdapter : ExpoSecureStoreAdapter;

let supabaseUrl;
let supabaseAnonKey;

if (process.env.BUILD_ENV == "TEST"){
  supabaseUrl = 'http://localhost:54321'
  supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
} else {
  supabaseUrl = 'https://kxhcklrirqlyknkretwj.supabase.co'
  supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4aGNrbHJpcnFseWtua3JldHdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc5NzEwNTEsImV4cCI6MjAwMzU0NzA1MX0.PUDvu9zWzGp3MSoG3zKvZMtl-K-l1pbsrV3fgfDJFyk'
}



export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: Store as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})