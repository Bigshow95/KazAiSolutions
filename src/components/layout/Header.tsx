import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Bot, Globe, ChevronRight } from "lucide-react";
import { useI18n } from "@/i18n/i18n";
import logo from "@/assets/KazAiSolutions_logo2.png";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t, lang, setLang } = useI18n();

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.services"), href: "/services" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.pricing"), href: "/pricing" },
    { name: t("nav.contact"), href: "/contact" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-8 w-8 rounded-lg" />
            <span className="font-bold text-xl">KazAISolutions</span>
          </Link>


          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={`text-sm font-medium transition-smooth hover:text-primary relative ${
                  isActive(item.href) ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side (desktop) */}
          <div className="hidden md:flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLang(lang === 'en' ? 'ru' : (lang === 'ru' ? 'kk' : 'en'))}
            className="text-muted-foreground hover:text-primary"
          >
            <Globe className="h-4 w-4 mr-2" />
            {lang.toUpperCase()}
          </Button>

          <Link
            to="/contact"
            className="gradient-bg shadow-elegant transition-smooth hover:shadow-strong inline-flex items-center px-4 py-2 rounded-md"
          >
            {t('cta.getStarted')}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>


          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            className="md:hidden p-2 text-muted-foreground hover:text-primary transition-smooth"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="grid gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 rounded-md transition-smooth ${
                    isActive(item.href)
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/60"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="grid grid-cols-2 gap-3 mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLang(lang === "en" ? "ru" : lang === "ru" ? "kk" : "en")}
                  className="text-muted-foreground hover:text-primary"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  {lang.toUpperCase()}
                </Button>

                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="gradient-bg inline-flex items-center justify-center px-4 py-2 rounded-md"
                >
                  {t("cta.getStarted")}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
