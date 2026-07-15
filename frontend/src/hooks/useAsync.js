import { useCallback, useState } from 'react';
export default function useAsync(initialData = null) {
  const [data, setData] = useState(initialData); const [error, setError] = useState(null); const [loading, setLoading] = useState(false);
  const execute = useCallback(async (task) => { setLoading(true); setError(null); try { const result = await task(); setData(result); return result; } catch (err) { setError(err.response?.data?.message || err.message || 'Something went wrong'); throw err; } finally { setLoading(false); } }, []);
  return { data, setData, error, setError, loading, execute };
}
