/**
 * App Bileşeni - Ana Uygulama Kökü
 * ==================================
 * ThemeProvider ile tema yönetimi, Navbar, Footer ve ScrollToTop
 * bileşenlerini entegre eder. Tüm sayfa düzeninin ana yapısıdır.
 */
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/organisms/Navbar';
import LiveChart from './components/organisms/LiveChart';
import Footer from './components/organisms/Footer';
import ScrollToTop from './components/atoms/ScrollToTop';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        {/* Navigasyon Çubuğu */}
        <Navbar />

        {/* Arka Plan Efekti (Hafif Sarı Glow) */}
        <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-500/5 via-transparent to-transparent"></div>

        {/* Ana İçerik */}
        <main className="flex-1 flex items-center justify-center p-4 md:p-8">
          <LiveChart />
        </main>

        {/* Footer */}
        <Footer />

        {/* Scroll to Top Butonu */}
        <ScrollToTop />
      </div>
    </ThemeProvider>
  );
}

export default App;