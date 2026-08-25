import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://fdbkjfyqwmghcycijcaw.supabase.co'
const supabasePublishableKey = 'sb_publishable_XCmp4q9GgkOQas3h9-aXXw_ytSh7ji6'

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
})
