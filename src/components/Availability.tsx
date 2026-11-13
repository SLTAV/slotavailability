import { Link } from 'react-router-dom';
import { Button, Skeleton } from '@mui/material';
import { ArrowUpRight, CircleDashed, RefreshCw } from 'lucide-react';
import { formatDate, type AvailabilityStatus, type Observation } from '../../shared/availability';
import { countryName, providerName } from '../data/catalog';
import { useAvailability } from '../lib/useAvailability';

export function StatusBadge({ status }: { status: AvailabilityStatus }) {
  return (
    <span className={`availability-badge status-${status}`}>
      <span />
      {
        {
          available: 'Available',
          unavailable: 'Not available',
          mixed: 'Mixed reports',
          unknown: 'Unknown',
        }[status]
      }
    </span>
  );
}
export function ObservationTable({ rows }: { rows: Observation[] }) {
  return (
    <div className="table-container">
      <table className="observations-table">
        <thead>
          <tr>
            <th>Provider / market</th>
            <th>Recorded status</th>
            <th>Last checked</th>
            <th>
              <span className="sr-only">View details</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={`${row.providerSlug}-${row.countrySlug}-${i}`}>
              <td>
                <Link to={`/availability?provider=${row.providerSlug}&country=${row.countrySlug}`}>
                  <strong>{providerName(row.providerSlug)}</strong>
                  <span>
                    {countryName(row.countrySlug)}
                    {row.casino ? ` · ${row.casino}` : ' · Casino not specified'}
                  </span>
                </Link>
              </td>
              <td>
                <StatusBadge
                  status={
                    row.available === true
                      ? 'available'
                      : row.available === false
                        ? 'unavailable'
                        : 'unknown'
                  }
                />
              </td>
              <td>{formatDate(row.checkedAt)}</td>
              <td>
                <Link
                  className="row-arrow"
                  to={`/availability?provider=${row.providerSlug}&country=${row.countrySlug}`}
                  aria-label={`View ${providerName(row.providerSlug)} in ${countryName(row.countrySlug)}`}
                >
                  <ArrowUpRight size={17} />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export function AvailabilityPanel({
  provider,
  country,
  limit = 5,
  datedOnly = false,
}: {
  provider?: string;
  country?: string;
  limit?: number;
  datedOnly?: boolean;
}) {
  const { data, loading, error, retry } = useAvailability(provider, country);
  if (loading)
    return (
      <div className="loading-panel" role="status" aria-label="Loading availability">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} variant="rounded" height={44} sx={{ mb: 1 }} />
        ))}
      </div>
    );
  if (error)
    return (
      <div className="empty-panel">
        <CircleDashed size={28} />
        <div>
          <strong>We couldn’t load the latest checks.</strong>
          <p>The directory is still available. Please try again in a moment.</p>
        </div>
        <Button onClick={retry} startIcon={<RefreshCw size={15} />}>
          Try again
        </Button>
      </div>
    );
  const rows =
    data?.observations.filter(
      (row) => !datedOnly || (row.checkedAt && !Number.isNaN(Date.parse(row.checkedAt))),
    ) ?? [];
  if (!rows.length)
    return (
      <div className="empty-panel">
        <CircleDashed size={28} />
        <div>
          <strong>No published checks yet.</strong>
          <p>
            {data?.configured
              ? 'There are no observations for this selection.'
              : 'The directory is ready. Verified observations will appear here when the data source is connected.'}
          </p>
        </div>
      </div>
    );
  return (
    <>
      <ObservationTable rows={rows.slice(0, limit)} />
      {data?.truncated && (
        <p className="data-note">
          Showing a limited set of recent observations. This is not a complete coverage count.
        </p>
      )}
    </>
  );
}
