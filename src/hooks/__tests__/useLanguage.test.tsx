import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useLanguage } from '../useLanguage';

// Mock react-i18next
const mockChangeLanguage = vi.fn().mockResolvedValue(undefined);
const mockOn = vi.fn();
const mockOff = vi.fn();
const mockI18n = {
  language: 'en',
  changeLanguage: mockChangeLanguage,
  isInitialized: true,
  on: mockOn,
  off: mockOff,
};

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    i18n: mockI18n,
    ready: true,
  }),
}));

describe('useLanguage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockI18n.language = 'en';
  });

  it('returns current language', () => {
    const { result } = renderHook(() => useLanguage());
    expect(result.current.currentLanguage).toBe('en');
  });

  it('returns available languages', () => {
    const { result } = renderHook(() => useLanguage());
    expect(result.current.availableLanguages).toContain('en');
    expect(result.current.availableLanguages).toContain('fr');
    expect(result.current.availableLanguages.length).toBe(10);
  });

  it('changes language when changeLanguage is called', () => {
    const { result } = renderHook(() => useLanguage());

    act(() => {
      result.current.changeLanguage('fr');
    });

    expect(mockChangeLanguage).toHaveBeenCalledWith('fr');
  });

  it('toggles to next language', () => {
    const { result } = renderHook(() => useLanguage());

    act(() => {
      result.current.toggleLanguage();
    });

    expect(mockChangeLanguage).toHaveBeenCalled();
  });

  it('returns isEnglish correctly', () => {
    const { result } = renderHook(() => useLanguage());
    expect(result.current.isEnglish).toBe(true);
    expect(result.current.isFrench).toBe(false);
  });
});
