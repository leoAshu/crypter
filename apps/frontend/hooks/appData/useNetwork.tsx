import { useMemo } from 'react';

const useNetwork = () => {
  const networks: Network[] = [
    {
      id: 'trc',
      name: 'Tron',
      code: 'TRC20',
      address: 'TX7JbYQvJfQ3q8E9hP6yWwR5zBbC8F9xkT',
    },
    {
      id: 'bep',
      name: 'BNB Smart Chain',
      code: 'BEP20',
      address: '0xB1E1a9dC1b6BfA6F9C2A4c5B35E35D0F2Ff73eD8',
    },
    {
      id: 'eth',
      name: 'Ethereum',
      code: 'ERC20',
      address: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0',
    },
  ];

  const getNetworkById = useMemo(() => (networkId: string) => networks.find((n) => n.id === networkId), [networks]);

  return {
    networks,
    getNetworkById,
  };
};

export default useNetwork;
