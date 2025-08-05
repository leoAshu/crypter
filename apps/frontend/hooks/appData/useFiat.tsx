import { useFiatStore } from '@/store';

const useFiat = () => {
  const { fiats } = useFiatStore();

  const fiatOptions = [...fiats.map((f) => f.id)];
  const fiatSymbols: Record<string, string> = { ...Object.fromEntries(fiats.map((f) => [f.id, f.symbol])) };
  const fiatLabels: Record<string, string> = { ...Object.fromEntries(fiats.map((f) => [f.id, f.code])) };

  return {
    fiatOptions,
    fiatSymbols,
    fiatLabels,
  };
};

type FiatOption = ReturnType<typeof useFiat>['fiatOptions'][number];

export default useFiat;
export { FiatOption };
