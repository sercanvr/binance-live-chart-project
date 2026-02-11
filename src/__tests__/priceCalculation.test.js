/**
 * Fiyat Hesaplama Testleri
 * =========================
 * Kripto para fiyat değişim yüzdesini hesaplayan mantığın doğruluğunu test eder.
 * Bu testler, useMultiCryptoWebSocket hook'undaki değişim hesaplamasını simüle eder.
 *
 * Test edilen formül: ((currentPrice - openPrice) / openPrice) * 100
 */
import { describe, it, expect } from 'vitest';

/**
 * Fiyat değişim yüzdesini hesaplar.
 * @param {number} currentPrice - Güncel fiyat
 * @param {number} openPrice - Açılış fiyatı (referans)
 * @returns {number} Yüzde değişim
 */
const calculatePriceChange = (currentPrice, openPrice) => {
if (!openPrice || openPrice === 0) return 0;
  return ((currentPrice - openPrice) / openPrice) * 100;
};

describe('Fiyat Değişim Yüzdesi Hesaplaması', () => {
// Pozitif değişim senaryosu: Fiyat yükseldiğinde pozitif yüzde döner
it('fiyat artışında pozitif yüzde döndürmeli', () => {
    const result = calculatePriceChange(105, 100);
    expect(result).toBe(5);
});

// Negatif değişim senaryosu: Fiyat düştüğünde negatif yüzde döner
it('fiyat düşüşünde negatif yüzde döndürmeli', () => {
    const result = calculatePriceChange(95, 100);
    expect(result).toBe(-5);
});

// Sıfır değişim: Fiyat aynı kaldığında %0 döner
it('fiyat değişmediğinde sıfır döndürmeli', () => {
    const result = calculatePriceChange(100, 100);
    expect(result).toBe(0);
});

// Sıfır açılış fiyatı: Division by zero koruması
it('açılış fiyatı sıfır olduğunda sıfır döndürmeli (division by zero koruması)', () => {
    const result = calculatePriceChange(100, 0);
    expect(result).toBe(0);
});

// Büyük değişim senaryosu: BTC gibi yüksek fiyatlı coinler
it('büyük fiyat değişimlerini doğru hesaplamalı', () => {
    const result = calculatePriceChange(100000, 97000);
    expect(result).toBeCloseTo(3.0928, 2);
});

// Küçük fiyat değişimi: ADA gibi düşük fiyatlı coinler
it('küçük ondalıklı fiyatları doğru hesaplamalı', () => {
    const result = calculatePriceChange(0.45, 0.40);
    expect(result).toBeCloseTo(12.5, 2);
});
});