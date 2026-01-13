import { Suspense } from 'react';
import CoinOverview from '@/components/home/CoinOverview';
import TrendingCoins from '@/components/home/TrendingCoins';
import {
  CoinOverviewFallback,
  TrendingCoinFallback,
} from '@/components/home/fallback';

export default async function Home() {
  return (
    <main className="main-container">
      <section className="home-grid">
        <Suspense fallback={<CoinOverviewFallback />}>
          <CoinOverview />
        </Suspense>

        <Suspense fallback={<TrendingCoinFallback />}>
          <TrendingCoins />
        </Suspense>
      </section>

      <section className="mt-7 w-full space-y-4">
        <p>Categories</p>
      </section>
    </main>
  );
}
