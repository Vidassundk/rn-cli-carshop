import {useMemo} from 'react';

export const useYearOptions = () => {
  return useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({length: 20}, (_, i) => currentYear - i);
  }, []);
};
