import {
  getSession,
  getSubscription,
  getActiveProductsWithPrices
} from '@/app/supabase/supabase-server';
import Pricing from "@/components/web/Pricing";


export default async function PricingPage() {
  const [session, products, subscription] = await Promise.all([
    getSession(),
    getActiveProductsWithPrices(),
    getSubscription(),
  ])

  return (
    <>
      <Pricing
        session={session}
        user={session?.user}
        products={products}
        subscription={subscription}
      />
    </>
  );
}
