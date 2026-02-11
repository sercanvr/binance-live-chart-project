import { useTranslation } from 'react-i18next';

const Footer = () => {
const { t } = useTranslation();

// Dinamik yıl: Her zaman güncel yılı gösterir (1 Ocak'ta otomatik artar)
const currentYear = new Date().getFullYear();

return (
    <footer className="w-full border-t border-border bg-card/50 backdrop-blur-sm">
    <div className="mx-auto max-w-7xl px-4 py-4">
        <p className="text-center text-sm text-muted-foreground">
            {t('footer.copyright', { year: currentYear })}
        </p>
    </div>
    </footer>
);
};

export default Footer;