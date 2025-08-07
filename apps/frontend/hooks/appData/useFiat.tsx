import { useFiatStore } from '@/store';
import { useMemo } from 'react';

const useFiat = () => {
  const { fiats } = useFiatStore();

  const fiatOptions = useMemo(() => [...fiats.map((f) => f.id)], [fiats]);
  const fiatSymbols: Record<string, string> = useMemo(
    () => Object.fromEntries(fiats.map((f) => [f.id, f.symbol])),
    [fiats],
  );
  const fiatLabels: Record<string, string> = useMemo(
    () => Object.fromEntries(fiats.map((f) => [f.id, f.code])),
    [fiats],
  );

  return {
    fiatOptions,
    fiatSymbols,
    fiatLabels,
  };
};

type FiatOption = ReturnType<typeof useFiat>['fiatOptions'][number];

export default useFiat;
export { FiatOption };
