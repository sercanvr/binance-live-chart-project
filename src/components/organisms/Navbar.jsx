import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import ThemeToggle from '../molecules/ThemeToggle';
import LanguageSelector from '../molecules/LanguageSelector';

const Navbar = () => {
    const { t, i18n } = useTranslation();
    const { theme, setTheme } = useTheme();
    const isDark = theme === 'dark';
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// Mobil menü açıkken body scroll'unu kilitle
useEffect(() => {
    if (mobileMenuOpen) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
}, [mobileMenuOpen]);

// Logo tıklanınca sayfayı yenile
const handleLogoClick = () => {
    window.location.reload();
};

// Mobil menüde dil değiştir ve menüyü kapat
const handleMobileLang = (lang) => {
    i18n.changeLanguage(lang);
    setMobileMenuOpen(false);
};

// Mobil menüde tema değiştir ve menüyü kapat
const handleMobileTheme = (newTheme) => {
    setTheme(newTheme);
    setMobileMenuOpen(false);
};

// Liquid glass buton class'ı (tema duyarlı border)
// iOS Safari'de opacity-based bg renkleri beyaz görünebiliyor, bu yüzden
// light modda solid sarı bg + koyu border kullanıyoruz.
const glassBtn = `w-full max-w-xs py-3.5 rounded-xl font-bold text-base
    flex items-center justify-center gap-2 active:scale-[0.97] cursor-pointer
    backdrop-blur-md text-white
    ${isDark ? 'bg-[#FCD535]/85 border-2 border-white/30' : 'bg-[#e5bf00] border-2 border-[#09090b]/30'}`;

return (
    <>
      {/* Liquid Glass Navbar */}
    <nav className="sticky top-0 z-40 w-full border-b border-border/60
            bg-background/60 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          {/* Sol taraf: Logo + Başlık — hover opacity 0.7, tıkla → yenile */}
        <button
            onClick={handleLogoClick}
            className="flex items-center gap-3 cursor-pointer bg-transparent border-none p-0 hover:opacity-70"
            aria-label="Reload page"
        >
            <img
            src="/blc-logo.webp"
            alt="Binance Live Chart Logo"
            className="h-8 w-8 rounded-lg"
            />
            <span className="text-base font-bold text-foreground tracking-tight">
            {t('nav.title')}
            </span>
        </button>

          {/* Sağ taraf: Desktop — Tema toggle + Dil seçici */}
        <div className="hidden md:flex items-center gap-1">
            <ThemeToggle />
            <LanguageSelector />
        </div>

          {/* Sağ taraf: Mobil — Hamburger butonu */}
        <button
            onClick={() => setMobileMenuOpen(true)}
            className="flex md:hidden items-center justify-center h-9 w-9 rounded-md
                    hover:bg-accent transition-colors cursor-pointer text-foreground"
            aria-label="Open menu"
        >
            <Menu className="h-5 w-5" />
        </button>
        </div>
    </nav>

      {/* === MOBİL TAM EKRAN MENÜ (Liquid Glass) === */}
    {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-xl flex flex-col md:hidden">
          {/* Üst bar: Logo + Kapat (X) butonu */}
        <div className="flex items-center justify-between px-4 h-14 border-b border-border/60">
            <button
            onClick={() => { setMobileMenuOpen(false); handleLogoClick(); }}
            className="flex items-center gap-3 cursor-pointer bg-transparent border-none p-0 hover:opacity-70"
            >
            <img
                src="/blc-logo.webp"
                alt="Binance Live Chart Logo"
                className="h-8 w-8 rounded-lg"
            />
            <span className="text-base font-bold text-foreground tracking-tight">
                {t('nav.title')}
            </span>
            </button>
            {/* X butonu: hover → kırmızı */}
            <button
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center h-9 w-9 rounded-md
                    cursor-pointer text-foreground hover:text-red-500"
            aria-label="Close menu"
            >
            <X className="h-5 w-5" />
            </button>
        </div>

          {/* 5 liquid glass buton — üst tarafa çekildi (pt-16) */}
        <div className="flex-1 flex flex-col items-center pt-16 gap-3 px-6">
            <button onClick={() => handleMobileLang('tr')} className={glassBtn}>
                TR Türkçe
            </button>
            <button onClick={() => handleMobileLang('en')} className={glassBtn}>
                EN English
            </button>
            <button onClick={() => handleMobileLang('de')} className={glassBtn}>
                DE Deutsch
            </button>
            <button onClick={() => handleMobileTheme('light')} className={glassBtn}>
            <Sun className="h-4.5 w-4.5" />
            {t('theme.light')}
            </button>
            <button onClick={() => handleMobileTheme('dark')} className={glassBtn}>
            <Moon className="h-4.5 w-4.5" />
            {t('theme.dark')}
            </button>
        </div>
        </div>
    )}
    </>
);
};

export default Navbar;