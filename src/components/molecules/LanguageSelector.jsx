import { useTranslation } from 'react-i18next';
import { DropdownMenu, Tooltip } from 'radix-ui';
import { Globe } from 'lucide-react';
import Button from '../atoms/Button';

const LANGUAGES = [
    { code: 'tr', label: 'TR', fullName: 'Turkish' },
    { code: 'en', label: 'EN', fullName: 'English' },
    { code: 'de', label: 'DE', fullName: 'Deutsch' },
];

const LanguageSelector = () => {
const { i18n, t } = useTranslation();
const currentLang = i18n.language;

// Dil değiştir
const handleLanguageChange = (langCode) => {
    i18n.changeLanguage(langCode);
};

return (
    <Tooltip.Provider delayDuration={200}>
    <Tooltip.Root>
        <DropdownMenu.Root>
          {/* Tetikleyici buton: Dünya ikonu + aktif dil kodu */}
        <Tooltip.Trigger asChild>
            <DropdownMenu.Trigger asChild>
            <Button variant="ghost" size="md" className="gap-1.5 text-xs font-semibold">
                <Globe className="h-4 w-4" />
                <span className="uppercase">{currentLang}</span>
            </Button>
            </DropdownMenu.Trigger>
        </Tooltip.Trigger>

          {/* Tooltip içeriği — Sarı arka plan, beyaz yazı */}
        <Tooltip.Portal>
            <Tooltip.Content
            sideOffset={8}
            className="z-50 rounded-md bg-[#FCD535] px-3 py-1.5 text-xs font-medium text-gray-700 shadow-md
                        animate-in fade-in-0 zoom-in-95"
            >
            {t('tooltips.langToggle')}
            <Tooltip.Arrow className="fill-[#FCD535]" />
            </Tooltip.Content>
        </Tooltip.Portal>

          {/* Açılır menü içeriği */}
        <DropdownMenu.Portal>
            <DropdownMenu.Content
            sideOffset={8}
            align="end"
            className="z-50 min-w-[122px] rounded-lg border border-border bg-card p-1 shadow-lg
                        animate-in fade-in-0 zoom-in-95 data-[side=bottom]:slide-in-from-top-2"
            >
            {LANGUAGES.map((lang) => (
                <DropdownMenu.Item
                key={lang.code}
                onSelect={() => handleLanguageChange(lang.code)}
                className={`flex items-center justify-center rounded-md px-3 py-2 text-sm text-center cursor-pointer
                    outline-none transition-colors
                    ${currentLang === lang.code
                    ? 'bg-primary/10 text-[#B8860B] dark:text-[#FCD535] font-semibold'
                    : 'text-[#B8860B] dark:text-foreground hover:bg-accent hover:text-[#9A7400] dark:hover:text-[#FCD535]'
                    }`}
                >
                <span>{lang.fullName}</span>
                </DropdownMenu.Item>
            ))}
            </DropdownMenu.Content>
        </DropdownMenu.Portal>
        </DropdownMenu.Root>
    </Tooltip.Root>
    </Tooltip.Provider>
);
};

export default LanguageSelector