import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/i18n/i18n';
import { 
  Check, 
  X, 
  ChevronRight, 
  Bot, 
  Globe, 
  Zap, 
  BarChart3, 
  Phone,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

type PlanFeature = { nameKey: string; included: boolean };

export const Pricing = () => {
  const { t } = useI18n();

  const plans: {
    nameKey: string;
    priceKey: string;
    currencyKey: string;
    periodKey: string;
    descriptionKey: string;
    badgeKey?: string | null;
    features: PlanFeature[];
    ctaKey: string;
    popular?: boolean;
  }[] = [
    {
      nameKey: "pricing.plans.starter.name",
      priceKey: "pricing.plans.starter.price",
      currencyKey: "pricing.currency",
      periodKey: "pricing.period",
      descriptionKey: "pricing.plans.starter.desc",
      badgeKey: null,
      features: [
        { nameKey: "pricing.f.chatbot.basic", included: true },
        { nameKey: "pricing.f.website.simple", included: true },
        { nameKey: "pricing.f.automation.basic", included: true },
        { nameKey: "pricing.f.support.email", included: true },
        { nameKey: "pricing.f.payment.kaspi", included: true },
        { nameKey: "pricing.f.analytics.monthly", included: true },
        { nameKey: "pricing.f.chatbot.advanced", included: false },
        { nameKey: "pricing.f.website.custom", included: false },
        { nameKey: "pricing.f.automation.sms", included: false },
        { nameKey: "pricing.f.support.priority", included: false },
        { nameKey: "pricing.f.analytics.realtime", included: false },
        { nameKey: "pricing.f.integration.multi", included: false },
      ],
      ctaKey: "pricing.plans.starter.cta",
      popular: false,
    },
    {
      nameKey: "pricing.plans.growth.name",
      priceKey: "pricing.plans.growth.price",
      currencyKey: "pricing.currency",
      periodKey: "pricing.period",
      descriptionKey: "pricing.plans.growth.desc",
      badgeKey: "pricing.badge.popular",
      features: [
        { nameKey: "pricing.f.chatbot.advanced3", included: true },
        { nameKey: "pricing.f.website.custom10", included: true },
        { nameKey: "pricing.f.automation.full", included: true },
        { nameKey: "pricing.f.support.priorityPhone", included: true },
        { nameKey: "pricing.f.payment.kaspiHalyk", included: true },
        { nameKey: "pricing.f.analytics.weekly", included: true },
        { nameKey: "pricing.f.automation.smsCampaigns", included: true },
        { nameKey: "pricing.f.inventory", included: true },
        { nameKey: "pricing.f.loyalty", included: true },
        { nameKey: "pricing.f.analytics.basicRealtime", included: true },
        { nameKey: "pricing.f.customization.advanced", included: false },
        { nameKey: "pricing.f.manager.dedicated", included: false },
      ],
      ctaKey: "pricing.plans.growth.cta",
      popular: true,
    },
    {
      nameKey: "pricing.plans.pro.name",
      priceKey: "pricing.plans.pro.price",
      currencyKey: "pricing.currency",
      periodKey: "pricing.period",
      descriptionKey: "pricing.plans.pro.desc",
      badgeKey: "pricing.badge.enterprise",
      features: [
        { nameKey: "pricing.f.chatbot.premiumUnlimited", included: true },
        { nameKey: "pricing.f.website.unlimited", included: true },
        { nameKey: "pricing.f.automation.complete", included: true },
        { nameKey: "pricing.f.support.247", included: true },
        { nameKey: "pricing.f.payment.all", included: true },
        { nameKey: "pricing.f.analytics.dashboard", included: true },
        { nameKey: "pricing.f.automation.smsEmailAdvanced", included: true },
        { nameKey: "pricing.f.inventory.advanced", included: true },
        { nameKey: "pricing.f.loyalty.premium", included: true },
        { nameKey: "pricing.f.integrations.custom", included: true },
        { nameKey: "pricing.f.manager.dedicated", included: true },
        { nameKey: "pricing.f.strategy.monthly", included: true },
      ],
      ctaKey: "pricing.plans.pro.cta",
      popular: false,
    },
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              {t("pricing.badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">{t("pricing.hero.title1")}</span>
              <br />
              {t("pricing.hero.title2")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("pricing.hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative border-card-border hover:shadow-elegant transition-smooth ${
                  plan.popular ? 'shadow-medium border-primary' : ''
                }`}
              >
                {plan.badgeKey && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge 
                      variant={plan.popular ? "default" : "secondary"}
                      className={plan.popular ? "gradient-bg text-primary-foreground" : ""}
                    >
                      {t(plan.badgeKey)}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center space-y-4 pb-8">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl font-bold">{t(plan.nameKey)}</CardTitle>
                    <p className="text-sm text-muted-foreground">{t(plan.descriptionKey)}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-4xl font-bold text-primary">{t(plan.priceKey)}</span>
                      <span className="text-lg text-muted-foreground">{t(plan.currencyKey)}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">{t("pricing.per")} {t(plan.periodKey)}</div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((f, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        {f.included ? (
                          <Check className="h-4 w-4 text-success flex-shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        )}
                        <span className={`text-sm ${f.included ? '' : 'text-muted-foreground'}`}>
                          {t(f.nameKey)}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  <Button 
                    className={`w-full ${plan.popular ? 'gradient-bg' : ''}`}
                    variant={plan.popular ? "hero" : "outline"}
                    size="lg"
                  >
                    {t(plan.ctaKey)}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              {t("pricing.custom.need")}
            </p>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">
                {t("pricing.custom.cta")}
                <MessageSquare className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("pricing.features.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("pricing.features.subtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Bot,
                title: t("pricing.features.cards.chatbots.title"),
                description: t("pricing.features.cards.chatbots.desc"),
                plans: [t("pricing.features.cards.chatbots.p1"), t("pricing.features.cards.chatbots.p2"), t("pricing.features.cards.chatbots.p3")]
              },
              {
                icon: Globe,
                title: t("pricing.features.cards.websites.title"), 
                description: t("pricing.features.cards.websites.desc"),
                plans: [t("pricing.features.cards.websites.p1"), t("pricing.features.cards.websites.p2"), t("pricing.features.cards.websites.p3")]
              },
              {
                icon: Zap,
                title: t("pricing.features.cards.automation.title"),
                description: t("pricing.features.cards.automation.desc"),
                plans: [t("pricing.features.cards.automation.p1"), t("pricing.features.cards.automation.p2"), t("pricing.features.cards.automation.p3")]
              },
              {
                icon: BarChart3,
                title: t("pricing.features.cards.analytics.title"),
                description: t("pricing.features.cards.analytics.desc"),
                plans: [t("pricing.features.cards.analytics.p1"), t("pricing.features.cards.analytics.p2"), t("pricing.features.cards.analytics.p3")]
              }
            ].map((feature, index) => (
              <Card key={index} className="border-card-border">
                <CardContent className="p-6 text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.plans.map((p, planIndex) => (
                      <div key={planIndex} className="text-xs text-muted-foreground">
                        {p}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("pricing.faq.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("pricing.faq.subtitle")}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {[
              { q: t("pricing.faq.q1.q"), a: t("pricing.faq.q1.a") },
              { q: t("pricing.faq.q2.q"), a: t("pricing.faq.q2.a") },
              { q: t("pricing.faq.q3.q"), a: t("pricing.faq.q3.a") },
              { q: t("pricing.faq.q4.q"), a: t("pricing.faq.q4.a") },
              { q: t("pricing.faq.q5.q"), a: t("pricing.faq.q5.a") },
            ].map((faq, index) => (
              <Card key={index} className="border-card-border">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">{faq.q}</h3>
                  <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">{t('pricing.ready')}</h2>
            <p className="text-lg opacity-90">
              {t("pricing.readySubtitle")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" variant="accent" className="text-lg px-8 py-4">
                <Link to="/contact">
                  {t("pricing.cta.primary")}
                  <Phone className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <Link to="/services">
                  {t("pricing.cta.secondary")}
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
