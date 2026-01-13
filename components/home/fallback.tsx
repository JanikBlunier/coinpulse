import DataTable from '@/components/DataTable';
import { cn } from '@/lib/utils';

export function CoinOverviewFallback() {
  return (
    <div id="coin-overview-fallback" className="animate-pulse">
      <div className="header pt-2">
        <div className="header-image bg-dark-400" />
        <div className="info">
          <div className="header-line-sm bg-dark-400 rounded-md" />
          <div className="header-line-lg bg-dark-400 rounded-md" />
        </div>
      </div>
      <div className="chart mt-4">
        <div className="chart-skeleton bg-dark-400" />
      </div>
    </div>
  );
}

export function TrendingCoinFallback() {
  const columns: DataTableColumn<number>[] = [
    {
      header: 'Name',
      cellClassName: 'name-cell',
      cell: () => (
        <div className="name-link">
          <div className="name-image bg-dark-400" />
          <div className="name-line bg-dark-400 rounded-md" />
        </div>
      ),
    },
    {
      header: '24h Change',
      cellClassName: 'change-cell',
      cell: () => (
        <div className="price-change">
          <div className="change-icon bg-dark-400" />
          <div className="change-line bg-dark-400 rounded-md" />
        </div>
      ),
    },
    {
      header: 'Price',
      cellClassName: 'price-cell',
      cell: () => <div className="price-line bg-dark-400 rounded-md" />,
    },
  ];

  return (
    <div id="trending-coins-fallback" className="animate-pulse">
      <h4>Trending Coins</h4>
      <div className="trending-coins">
        <DataTable
          data={[1, 2, 3, 4, 5, 6]}
          columns={columns}
          rowKey={(i) => i}
          tableClassName="trending-coins-table"
          headerCellClassName="py-3!"
          bodyCellClassName="py-2!"
        />
      </div>
    </div>
  );
}
