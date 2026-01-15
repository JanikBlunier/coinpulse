'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { CandlestickChart as CandlestickIcon } from 'lucide-react';

import { fetcher } from '@/lib/coingecko.actions';
import { formatCurrency } from '@/lib/utils';

import CandlestickChart from '@/components/CandlestickChart';
import { CoinOverviewFallback } from '@/components/home/fallback';

export default function CoinOverview() {
  const [coin, setCoin] = useState<CoinDetailsData | null>(null);
  const [coinOHLCData, setCoinOHLCData] = useState<OHLCData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setLoading(true);
        setHasError(false);

        const [coinRes, ohlcRes] = await Promise.all([
          fetcher<CoinDetailsData>('coins/bitcoin', {
            dex_pair_format: 'symbol',
          }),
          fetcher<OHLCData[]>('/coins/bitcoin/ohlc', {
            vs_currency: 'usd',
            days: 1,
            precision: 'full',
          }),
        ]);

        if (!isMounted) return;

        setCoin(coinRes);
        setCoinOHLCData(ohlcRes);
      } catch (error) {
        console.error('Error fetching coin details: ', error);
        if (!isMounted) return;
        setHasError(true);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    }

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <CoinOverviewFallback />;
  if (hasError || !coin || !coinOHLCData) return <CoinOverviewFallback />;

  return (
    <div id="coin-overview">
      <CandlestickChart data={coinOHLCData} coinId="bitcoin">
        <div className="header pt-2">
          <Image
            src={coin.image.large}
            alt={coin.name}
            width={56}
            height={56}
          />
          <div className="info">
            <p>
              {coin.name} / {coin.symbol.toUpperCase()}
            </p>
            <h1>{formatCurrency(coin.market_data.current_price.usd)}</h1>
            <CandlestickIcon />
          </div>
        </div>
      </CandlestickChart>
    </div>
  );
}
