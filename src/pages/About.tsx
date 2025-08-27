import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useI18n } from '@/i18n/i18n';
import { 
  Target, 
  Zap, 
  DollarSign, 
  Clock, 
  Settings, 
  Users, 
  Award, 
  Globe,
  ChevronRight,
  Heart,
  TrendingUp,
  Shield
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const About = () => {
  const { t } = useI18n();

  const reasons = [
    {
      icon: Globe,
      title: t("about.why.localized.title"),
      description: t("about.why.localized.desc"),
      color: "primary",
    },
    {
      icon: DollarSign,
      title: t("about.why.affordable.title"),
      description: t("about.why.affordable.desc"),
      color: "accent",
    },
    {
      icon: Zap,
      title: t("about.why.speed.title"),
      description: t("about.why.speed.desc"),
      color: "secondary",
    },
    {
      icon: Settings,
      title: t("about.why.custom.title"),
      description: t("about.why.custom.desc"),
      color: "primary",
    },
    {
      icon: Users,
      title: t("about.why.training.title"),
      description: t("about.why.training.desc"),
      color: "success",
    },
    {
      icon: Shield,
      title: t("about.why.secure.title"),
      description: t("about.why.secure.desc"),
      color: "accent",
    },
  ] as const;

  const approach = [
    { step: "01", title: t("about.approach.discovery.title"), desc: t("about.approach.discovery.desc") },
    { step: "02", title: t("about.approach.strategy.title"),  desc: t("about.approach.strategy.desc")  },
    { step: "03", title: t("about.approach.impl.title"),      desc: t("about.approach.impl.desc")      },
    { step: "04", title: t("about.approach.growth.title"),     desc: t("about.approach.growth.desc")    },
  ];

  const stats = [
    { number: "50+",  label: t("about.stats.transformed"), icon: Users },
    { number: "3x",   label: t("about.stats.roi"),         icon: TrendingUp },
    { number: "24/7", label: t("about.stats.support"),     icon: Clock },
    { number: "99.9%",label: t("about.stats.uptime"),      icon: Award },
  ];

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-accent/10 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              {t("about.hero.badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">{t("about.hero.title1")}</span>
              <br />
              {t("about.hero.title2")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("about.hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Target className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">{t('about.mission.title')}</h2>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              {t("about.mission.text")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              <div className="text-center space-y-3">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Globe className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-semibold text-lg">{t("about.mission.local.title")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("about.mission.local.desc")}
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="mx-auto w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <Heart className="h-8 w-8 text-accent" />
                </div>
                <h3 className="font-semibold text-lg">{t("about.mission.customer.title")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("about.mission.customer.desc")}
                </p>
              </div>
              <div className="text-center space-y-3">
                <div className="mx-auto w-16 h-16 bg-success/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-success" />
                </div>
                <h3 className="font-semibold text-lg">{t("about.mission.growth.title")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("about.mission.growth.desc")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("about.why.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("about.why.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <Card key={index} className="border-card-border hover:shadow-elegant transition-smooth group">
                <CardContent className="p-6 space-y-4">
                  <div className={`w-12 h-12 rounded-lg bg-${reason.color}/10 flex items-center justify-center group-hover:scale-110 transition-smooth`}>
                    <reason.icon className={`h-6 w-6 text-${reason.color}`} />
                  </div>
                  <h3 className="font-semibold text-lg">{reason.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{reason.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{t("about.approach.title")}</h2>
              <p className="text-lg text-muted-foreground">
                {t("about.approach.subtitle")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {approach.map((phase, index) => (
                <div key={index} className="text-center space-y-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {phase.step}
                  </div>
                  <h3 className="font-semibold text-lg">{phase.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{phase.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">{t("about.stats.title")}</h2>
            <p className="text-lg opacity-90">
              {t("about.stats.subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-3">
                <stat.icon className="h-8 w-8 mx-auto opacity-90" />
                <div className="text-3xl font-bold">{stat.number}</div>
                <div className="text-sm opacity-80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">{t("about.cta.title")}</h2>
            <p className="text-lg text-muted-foreground">
              {t("about.cta.text")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button asChild size="lg" variant="hero" className="text-lg px-8 py-4">
                <Link to="/contact">
                  {t("about.cta.primary")}
                  <ChevronRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4">
                <Link to="/services">
                  {t("about.cta.secondary")}
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
