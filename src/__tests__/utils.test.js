/**
 * Yardımcı Fonksiyon (Utils) Testleri
 * =====================================
 * cn() sınıf birleştirme fonksiyonunun doğruluğunu test eder.
 * getCoinSlug() fonksiyonunun logo URL'leri için doğru slug ürettiğini kontrol eder.
 *
 * cn() = clsx + tailwind-merge (çakışan Tailwind sınıflarını çözer)
 */
import { describe, it, expect } from 'vitest';
import { cn } from '../lib/utils';

describe('cn() - Sınıf Birleştirme Yardımcısı', () => {
  // Temel birleştirme: İki sınıfı boşlukla birleştirir
  it('birden fazla sınıfı birleştirmeli', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  // Koşullu sınıf: false olan sınıflar filtrelenir
  it('falsy değerleri filtrelemeli', () => {
    expect(cn('foo', false, null, undefined, 'bar')).toBe('foo bar');
  });

  // Tailwind çakışma çözümü: Aynı utility grubundaki sonuncu kazanır
  it('çakışan Tailwind sınıflarını çözmeli', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });

  // Boş girdi: Boş string döner
  it('boş girdi için boş string döndürmeli', () => {
    expect(cn()).toBe('');
  });
});

/**
 * getCoinSlug: Coin sembolünü CryptoLogos API slug formatına çevirir.
 * Örn: 'btcusdt' -> 'bitcoin-btc'
 */
const getCoinSlug = (symbol) => {
  const coin = symbol.slice(0, 3).toLowerCase();
  const map = {
    'btc': 'bitcoin-btc',
    'eth': 'ethereum-eth',
    'bnb': 'bnb-bnb',
    'sol': 'solana-sol',
    'xrp': 'xrp-xrp',
    'ada': 'cardano-ada',
  };
  return map[coin] || 'bitcoin-btc';
};

describe('getCoinSlug() - Coin Slug Dönüştürücü', () => {
  // Bilinen coinler doğru slug döndürmeli
  it('BTC için doğru slug döndürmeli', () => {
    expect(getCoinSlug('btcusdt')).toBe('bitcoin-btc');
  });

  it('ETH için doğru slug döndürmeli', () => {
    expect(getCoinSlug('ethusdt')).toBe('ethereum-eth');
  });

  it('SOL için doğru slug döndürmeli', () => {
    expect(getCoinSlug('solusdt')).toBe('solana-sol');
  });

  // Bilinmeyen coin: Varsayılan olarak bitcoin slug'ı döner
  it('bilinmeyen coin için varsayılan (bitcoin) döndürmeli', () => {
    expect(getCoinSlug('dogeusdt')).toBe('bitcoin-btc');
  });
});
