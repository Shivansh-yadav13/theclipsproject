'use client';

import { useState } from 'react';
import { useSupabase } from '../../app/supabase/supabase-provider';
import { useRouter } from 'next/navigation';

export default function SignOutButton() {
  const [loading, setLoading] = useState<boolean>();
  const router = useRouter();
  const { supabase } = useSupabase();
  return (
    <button
    className={`font-semibold text-sm my-2 ${ loading ? 'bg-red-800' : 'hover:bg-red-600' } hover:text-primary py-5 rounded-lg`}
      onClick={async () => {
        await supabase.auth.signOut();
        router.push('/account');
      }}
    >
      Sign out
    </button>
  );
}