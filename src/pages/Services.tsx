import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/i18n/i18n';
import {
  Bot,
  Globe,
  Zap,
  BarChart3,
  MessageSquare,
  Smartphone,
  CreditCard,
  Search,
  ShoppingCart,
  Mail,
  Bell,
  TrendingUp,
  ChevronRight,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const Services = () => {
  const { t } = useI18n();

  const wa = (text: string) =>
    `https://wa.me/77751445154?text=${encodeURIComponent(text)}`;

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              {t('services.badge')}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">{t('services.title')}</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('services.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Service 1: AI Chatbots */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Bot className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">{t('services.chatbots.title')}</h2>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('services.chatbots.desc')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: MessageSquare, text: t('services.chatbots.f.whatsapp') },
                  { icon: Smartphone,    text: t('services.chatbots.f.instaTg') },
                  { icon: Globe,         text: t('services.chatbots.f.multilang') },
                  { icon: Bot,           text: t('services.chatbots.f.smart') },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <feature.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex gap-2 pt-2">
                <Link
                  to="/services/chatbots"
                  className="inline-flex items-center px-3 py-2 rounded-md border border-primary hover:bg-primary/10 transition-smooth"
                >
                  {t('services.card.learn')}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
                <Link
                  to="/contact?service=chatbots"
                  className="gradient-bg inline-flex items-center px-3 py-2 rounded-md"
                >
                  {t('services.card.start')}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
                <a
                  href={wa(t('services.chatbots.waText'))}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center px-3 py-2 rounded-md border border-primary hover:bg-primary/10"
                >
                  {t('services.card.whatsapp')}
                </a>
              </div>
            </div>

            <Card className="shadow-elegant border-card-border">
              <CardHeader>
                <CardTitle className="text-center">{t('services.chatbots.featuresTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  t('services.chatbots.features.1'),
                  t('services.chatbots.features.2'),
                  t('services.chatbots.features.3'),
                  t('services.chatbots.features.4'),
                  t('services.chatbots.features.5'),
                  t('services.chatbots.features.6'),
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="h-4 w-4 text-success" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service 2: Custom Websites */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Card className="shadow-elegant border-card-border order-2 lg:order-1">
              <CardHeader>
                <CardTitle className="text-center">{t('services.websites.featuresTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  t('services.websites.features.1'),
                  t('services.websites.features.2'),
                  t('services.websites.features.3'),
                  t('services.websites.features.4'),
                  t('services.websites.features.5'),
                  t('services.websites.features.6'),
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="h-4 w-4 text-success" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-6 order-1 lg:order-2">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Globe className="h-8 w-8 text-accent" />
                </div>
                <h2 className="text-3xl font-bold">{t('home.services.websites.title')}</h2>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('home.services.websites.desc')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: CreditCard, text: t('services.websites.f.integrations') },
                  { icon: Smartphone, text: t('services.websites.f.mobile') },
                  { icon: Search,     text: t('services.websites.f.seo') },
                  { icon: TrendingUp, text: t('services.websites.f.conversion') },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <feature.icon className="h-5 w-5 text-accent" />
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex gap-2 pt-2">
                <Link
                  to="/services/websites"
                  className="inline-flex items-center px-3 py-2 rounded-md border border-primary hover:bg-primary/10 transition-smooth"
                >
                  {t('services.card.learn')}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
                <Link
                  to="/contact?service=websites"
                  className="gradient-bg inline-flex items-center px-3 py-2 rounded-md"
                >
                  {t('services.card.start')}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
                <a
                  href={wa(t('services.websites.waText'))}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center px-3 py-2 rounded-md border border-primary hover:bg-primary/10"
                >
                  {t('services.card.whatsapp')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service 3: Automation Tools */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <Zap className="h-8 w-8 text-secondary" />
                </div>
                <h2 className="text-3xl font-bold">{t('home.services.automation.title')}</h2>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('home.services.automation.desc')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: ShoppingCart, text: t('services.automation.f.orders') },
                  { icon: Mail,         text: t('services.automation.f.email') },
                  { icon: Bell,         text: t('services.automation.f.sms') },
                  { icon: CreditCard,   text: t('services.automation.f.invoice') },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <feature.icon className="h-5 w-5 text-secondary" />
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex gap-2 pt-2">
                <Link
                  to="/services/automation"
                  className="inline-flex items-center px-3 py-2 rounded-md border border-primary hover:bg-primary/10 transition-smooth"
                >
                  {t('services.card.learn')}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
                <Link
                  to="/contact?service=automation"
                  className="gradient-bg inline-flex items-center px-3 py-2 rounded-md"
                >
                  {t('services.card.start')}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
                <a
                  href={wa(t('services.automation.waText'))}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center px-3 py-2 rounded-md border border-primary hover:bg-primary/10"
                >
                  {t('services.card.whatsapp')}
                </a>
              </div>
            </div>

            <Card className="shadow-elegant border-card-border">
              <CardHeader>
                <CardTitle className="text-center">{t('services.automation.featuresTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  t('services.automation.features.1'),
                  t('services.automation.features.2'),
                  t('services.automation.features.3'),
                  t('services.automation.features.4'),
                  t('services.automation.features.5'),
                  t('services.automation.features.6'),
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="h-4 w-4 text-success" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service 4: Analytics */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Card className="shadow-elegant border-card-border order-2 lg:order-1">
              <CardHeader>
                <CardTitle className="text-center">{t('services.analytics.featuresTitle')}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  t('services.analytics.features.1'),
                  t('services.analytics.features.2'),
                  t('services.analytics.features.3'),
                  t('services.analytics.features.4'),
                  t('services.analytics.features.5'),
                  t('services.analytics.features.6'),
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Check className="h-4 w-4 text-success" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="space-y-6 order-1 lg:order-2">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <BarChart3 className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold">{t('services.analytics.title')}</h2>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                {t('services.analytics.desc')}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { icon: TrendingUp, text: t('services.analytics.f.sales') },
                  { icon: BarChart3,  text: t('services.analytics.f.metrics') },
                  { icon: Search,     text: t('services.analytics.f.insights') },
                  { icon: Bell,       text: t('services.analytics.f.alerts') },
                ].map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <feature.icon className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex gap-2 pt-2">
                <Link
                  to="/services/analytics"
                  className="inline-flex items-center px-3 py-2 rounded-md border border-primary hover:bg-primary/10 transition-smooth"
                >
                  {t('services.card.learn')}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
                <Link
                  to="/contact?service=analytics"
                  className="gradient-bg inline-flex items-center px-3 py-2 rounded-md"
                >
                  {t('services.card.start')}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
                <a
                  href={wa(t('services.analytics.waText'))}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center px-3 py-2 rounded-md border border-primary hover:bg-primary/10"
                >
                  {t('services.card.whatsapp')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">{t('services.ready')}</h2>
            <p className="text-lg opacity-90">
              {t('services.choose')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" variant="accent" className="text-lg px-8 py-4">
                <Link to="/pricing">
                  {t('pricing.title')}
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-lg px-8 py-4 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
              >
                <Link to="/contact">
                  {t('common.contactUs')}
                  <MessageSquare className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
