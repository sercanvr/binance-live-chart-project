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

    // Mobil menü açıkken arkaplanın kaymasını (scroll) engelle
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
            // Mobil menü açıldığında en üste scrollamak isterseniz:
            // window.scrollTo({ top: 0, behavior: 'instant' });
        } else {
            document.body.style.overflow = 'unset';
        }
        
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

// Logo tıklanınca sayfayı yenile
const handleLogoClick = () => {
    window.location.reload();
};

// Mobil menüde dil değiştir ve menüyü kapat, üst kısıma scroll yap
const handleMobileLang = (lang) => {
    i18n.changeLanguage(lang);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
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
            bg-background/60 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-[1536px] items-center justify-between px-3 md:px-8">
          {/* Sol taraf: Logo + Başlık — hover opacity 0.7, tıkla → yenile */}
        <button
            onClick={handleLogoClick}
            className="flex items-center gap-2 md:gap-3 cursor-pointer bg-transparent border-none p-0 hover:opacity-70"
            aria-label="Reload page"
        >
            <img
            src="/blc-logo.webp"
            alt="Binance Live Chart Logo"
            className="h-8 w-8 shrink-0 object-contain rounded-lg [filter:drop-shadow(0px_0px_0.75px_rgba(0,0,0,1))]"
            />
            <span className="text-[25px] leading-none font-normal text-[#fcd535] [text-shadow:0px_0px_2px_rgba(0,0,0,1)] [font-family:'Lobster',sans-serif]">
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
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden items-center justify-center h-9 w-9 rounded-md
                    hover:bg-accent transition-colors cursor-pointer text-[#fcd535]"
            aria-label="Toggle menu"
        >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
        </div>
    </nav>

      {/* === MOBİL TAM EKRAN MENÜ (Liquid Glass) === */}
    {mobileMenuOpen && (
        <div className="fixed top-14 inset-x-0 bottom-0 z-40 bg-background/60 backdrop-blur-sm flex flex-col md:hidden border-t border-border/60">
          {/* 5 liquid glass buton */}
          <div className="flex flex-col items-center pt-8 gap-3 px-6 h-full overflow-y-auto pb-8">
            <button onClick={() => handleMobileLang('tr')} className={glassBtn}>
                Turkish
            </button>
            <button onClick={() => handleMobileLang('en')} className={glassBtn}>
                English
            </button>
            <button onClick={() => handleMobileLang('de')} className={glassBtn}>
                Deutsch
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