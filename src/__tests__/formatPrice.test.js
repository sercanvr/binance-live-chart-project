/**
 * Fiyat Formatlama Testleri
 * ==========================
 * LiveChart bileşeninde kullanılan formatPrice fonksiyonunun doğruluğunu test eder.
 * Farklı fiyat aralıklarında doğru ondalık hassasiyetini kontrol eder.
 *
 * Kural: 1$'dan düşük fiyatlar 4 ondalık, diğerleri 2 ondalık gösterir.
 */
import { describe, it, expect } from 'vitest';

/**
 * Fiyatı ABD formatında biçimlendirir.
 * @param {number|null} price - Biçimlendirilecek fiyat
 * @returns {string} Biçimlendirilmiş fiyat metni
 */
const formatPrice = (price) => {
if (!price) return '---.--';
return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: price < 1 ? 4 : 2,
    maximumFractionDigits: price < 1 ? 4 : 2,
}).format(price);
};

describe('Fiyat Formatlama', () => {
  // null değer geldiğinde placeholder gösterilmeli
it('null değer için placeholder döndürmeli', () => {
    expect(formatPrice(null)).toBe('---.--');
});

  // 0 değer de falsy olduğu için placeholder döner
it('sıfır değer için placeholder döndürmeli', () => {
    expect(formatPrice(0)).toBe('---.--');
});

  // BTC gibi yüksek fiyatlı coinler: 2 ondalık basamak
it('1$ üstü fiyatları 2 ondalık ile formatlamalı', () => {
    const result = formatPrice(97543.21);
    expect(result).toBe('97,543.21');
});

  // ADA gibi düşük fiyatlı coinler: 4 ondalık basamak
it('1$ altı fiyatları 4 ondalık ile formatlamalı', () => {
    const result = formatPrice(0.4523);
    expect(result).toBe('0.4523');
});

  // Binbaşlık ayracı kontrolü: Büyük sayılar virgülle ayrılmalı
it('binlik ayracı ile büyük sayıları formatlamalı', () => {
    const result = formatPrice(1234567.89);
    expect(result).toBe('1,234,567.89');
});

  // Tam sayı fiyat: .00 eklenmeli
it('tam sayı fiyatlara .00 eklemeli', () => {
    const result = formatPrice(50000);
    expect(result).toBe('50,000.00');
});
});