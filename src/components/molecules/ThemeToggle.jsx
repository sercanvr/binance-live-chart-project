import { Sun, Moon } from 'lucide-react';
import { Tooltip } from 'radix-ui';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../contexts/ThemeContext';
import Button from '../atoms/Button';

const ThemeToggle = () => {
const { theme, toggleTheme } = useTheme();
const { t } = useTranslation();
const isDark = theme === 'dark';

return (
    <Tooltip.Provider delayDuration={200}>
    <Tooltip.Root>
        <Tooltip.Trigger asChild>
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="relative overflow-hidden"
        >
            {/* Güneş/Ay ikonu geçişi - CSS transition animasyonu */}
            <div className="transition-transform duration-300" style={{ transform: isDark ? 'rotate(0deg)' : 'rotate(180deg)' }}>
            {isDark ? (
                <Sun className="h-4 w-4 text-yellow-400" />
            ) : (
                <Moon className="h-4 w-4 text-slate-700" />
            )}
            </div>
        </Button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
        <Tooltip.Content
            sideOffset={8}
            className="z-50 rounded-md bg-[#FCD535] px-3 py-1.5 text-xs font-medium text-white shadow-md
                    animate-in fade-in-0 zoom-in-95"
        >
            {t('tooltips.themeToggle')}
            <Tooltip.Arrow className="fill-[#FCD535]" />
        </Tooltip.Content>
        </Tooltip.Portal>
    </Tooltip.Root>
    </Tooltip.Provider>
);
};

export default ThemeToggle;