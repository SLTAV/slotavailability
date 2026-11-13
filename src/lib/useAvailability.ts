import { useEffect, useState } from 'react';
import { responseSchema, type AvailabilityResponse } from '../../shared/availability';

export function useAvailability(provider?: string, country?: string) {
  const [data, setData] = useState<AvailabilityResponse | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [version, setVersion] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort('timeout'), 12000);
    const params = new URLSearchParams();
    if (provider) params.set('provider', provider);
    if (country) params.set('country', country);
    let active = true;
    setLoading(true);
    setError(false);
    setData(null);
    fetch(`/api/availability?${params}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw Error();
        return response.json();
      })
      .then((json) => {
        if (active) setData(responseSchema.parse(json));
      })
      .catch(() => {
        if (active) setError(true);
      })
      .finally(() => {
        clearTimeout(timeout);
        if (active) setLoading(false);
      });
    return () => {
      active = false;
      clearTimeout(timeout);
      controller.abort();
    };
  }, [provider, country, version]);
  return { data, loading, error, retry: () => setVersion((value) => value + 1) };
}
