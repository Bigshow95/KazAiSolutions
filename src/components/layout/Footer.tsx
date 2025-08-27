import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram, MessageCircle, Send } from 'lucide-react';
import logo from "@/assets/KazAiSolutions_logo2.png";
import { useI18n } from '@/i18n/i18n';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useI18n();

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="h-8 w-8 rounded-lg" />
              <span className="font-bold text-xl">KazAISolutions</span>
            </Link>
            <p className="text-sm text-secondary-foreground/80 leading-relaxed">
              {t("footer.tagline")}
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/kaz.ai.solutions/" target="_blank" rel="noopener" className="text-secondary-foreground/60 hover:text-accent transition-smooth" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://wa.me/77751445154" target="_blank" rel="noopener" className="text-secondary-foreground/60 hover:text-accent transition-smooth" aria-label="WhatsApp">
                <MessageCircle className="h-5 w-5" />
              </a>
              <a href="https://t.me/baisansyzbay" target="_blank" rel="noopener" className="text-secondary-foreground/60 hover:text-accent transition-smooth" aria-label="Telegram">
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-accent mb-4">{t("footer.quickLinks")}</h3>
            <div className="space-y-3">
              <Link to="/services" className="block text-sm text-secondary-foreground/80 hover:text-accent transition-smooth">
                {t("nav.services")}
              </Link>
              <Link to="/about" className="block text-sm text-secondary-foreground/80 hover:text-accent transition-smooth">
                {t("nav.about")}
              </Link>
              <Link to="/pricing" className="block text-sm text-secondary-foreground/80 hover:text-accent transition-smooth">
                {t("nav.pricing")}
              </Link>
              <Link to="/contact" className="block text-sm text-secondary-foreground/80 hover:text-accent transition-smooth">
                {t("nav.contact")}
              </Link>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-accent mb-4">{t("footer.services")}</h3>
            <div className="space-y-3">
              <div className="text-sm text-secondary-foreground/80">{t("home.services.chatbots.title")}</div>
              <div className="text-sm text-secondary-foreground/80">{t("home.services.websites.title")}</div>
              <div className="text-sm text-secondary-foreground/80">{t("home.services.automation.title")}</div>
              <div className="text-sm text-secondary-foreground/80">{t("home.services.analytics.title")}</div>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-accent mb-4">{t("footer.contactInfo")}</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-secondary-foreground/80">
                <Mail className="h-4 w-4 text-accent" />
                <span>kz.ai.solutions@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-secondary-foreground/80">
                <Phone className="h-4 w-4 text-accent" />
                <span>+7 775 144 5154</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-secondary-foreground/80">
                <MapPin className="h-4 w-4 text-accent" />
                <span>{t("footer.location")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-secondary-foreground/60">
            © {currentYear} KazAISolutions. {t("footer.rights")}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-secondary-foreground/60 hover:text-accent transition-smooth">
              {t("footer.privacy")}
            </a>
            <a href="#" className="text-sm text-secondary-foreground/60 hover:text-accent transition-smooth">
              {t("footer.terms")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
