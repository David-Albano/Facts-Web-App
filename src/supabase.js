
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://srehzlaytuvzzqkcpnjp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNyZWh6bGF5dHV2enpxa2NwbmpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODYyNDAwODcsImV4cCI6MjAwMTgxNjA4N30.7sb-ONRnlSpM0n402crQiBl2LEDzqZ-WEna7plqmOos'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase