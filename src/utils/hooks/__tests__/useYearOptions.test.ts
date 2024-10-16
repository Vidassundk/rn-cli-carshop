import {renderHook} from '@testing-library/react-hooks';
import {useYearOptions} from '../useYearOptions';

describe('useYearOptions', () => {
  it('should return an array of the last 20 years starting from the current year', () => {
    const {result} = renderHook(() => useYearOptions());

    const currentYear = new Date().getFullYear();
    const expectedYears = Array.from({length: 20}, (_, i) => currentYear - i);

    expect(result.current).toEqual(expectedYears);
  });
});
