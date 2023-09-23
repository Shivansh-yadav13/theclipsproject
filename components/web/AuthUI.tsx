'use client';

import { useSupabase } from '../../app/supabase/supabase-provider';
import { getURL } from '@/utils/helper';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const customTheme = {
  default: {
    colors: {
      brand: 'hsl(153 60.0% 53.0%)',
      brandAccent: 'hsl(154 54.8% 45.1%)',
      brandButtonText: 'white',
      // ..
    },
  },
  dark: {
    colors: {
      brandButtonText: 'white',
      defaultButtonBackground: '#333',
      defaultButtonBackgroundHover: '#333',
    },
    
  },
  // You can also add more theme variations with different names.
  evenDarker: {
    colors: {
      brandButtonText: 'white',
      defaultButtonBackground: '#1e1e1e',
      defaultButtonBackgroundHover: '#2e2e2e',
      //..
    },
  },
}

export default function AuthUI() {
  const { supabase } = useSupabase();
  return (
    <div className="flex flex-col space-y-4">
      <Auth
        supabaseClient={supabase}
        onlyThirdPartyProviders={true}
        providers={['google', 'twitch']}
        redirectTo={`${getURL()}/`}
        magicLink={true}
        appearance={{
          style: {
            button: {
              background: "#0c0029",
              border: 0,
              borderRadius: "10px",
              padding: "10px",
            }
          },
          // theme: customTheme,
          variables: {
            default: {
              colors: {
                brand: '#000000',
                brandAccent: '#202020'
              }
            }
          }
        }}
        // theme="dark"
      />
    </div>
  );
}
