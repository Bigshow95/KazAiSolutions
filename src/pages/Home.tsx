import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, 
  Globe, 
  BarChart3, 
  Zap, 
  TrendingUp, 
  Users, 
  Star, 
  ChevronRight,
  MessageSquare,
  ShoppingCart,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useI18n } from "@/i18n/i18n";
import heroImage from '../assets/background_image.jpg';

export const Home = () => {
  const { t } = useI18n();

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/90 to-background/95"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Badge variant="secondary" className="mb-4 px-4 py-2 text-sm font-medium">
              {t("home.hero.badge")}
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="gradient-text">{t("home.hero.title1")}</span> 
              <br />
              {t("home.hero.title2")}
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("home.hero.subtitle")}
            </p>
            
            <div className="flex gap-3 justify-center">
              <Link
                to="/contact"
                className="gradient-bg inline-flex items-center px-4 py-2 rounded-md shadow-elegant hover:shadow-strong transition-smooth"
              >
                {t("cta.getStarted")}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>

              <a
                href="https://wa.me/77751445154"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center px-4 py-2 rounded-md border border-primary hover:bg-primary/10 transition-smooth"
              >
                {t("cta.bookDemo")}
                <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>

            <div className="flex flex-wrap justify-center items-center gap-8 pt-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-success rounded-full"></div>
                <span>{t("home.cta.features.kaspi")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-success rounded-full"></div>
                <span>{t("home.cta.features.multilang")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 bg-success rounded-full"></div>
                <span>{t("home.cta.features.support")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Intro */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">{t("home.intro.title")}</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("home.intro.text")}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">50+</div>
                <div className="text-muted-foreground">{t("home.intro.stat.automated")}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24/7</div>
                <div className="text-muted-foreground">{t("home.intro.stat.support")}</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">3x</div>
                <div className="text-muted-foreground">{t("home.intro.stat.roi")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3м font-bold mb-4">{t("home.services.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("home.services.subtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Bot,
                title: t("home.services.chatbots.title"),
                description: t("home.services.chatbots.desc"),
                color: "text-primary"
              },
              {
                icon: Globe,
                title: t("home.services.websites.title"),
                description: t("home.services.websites.desc"),
                color: "text-accent"
              },
              {
                icon: Zap,
                title: t("home.services.automation.title"),
                description: t("home.services.automation.desc"),
                color: "text-secondary"
              },
              {
                icon: BarChart3,
                title: t("home.services.analytics.title"),
                description: t("home.services.analytics.desc"),
                color: "text-primary"
              }
            ].map((service, index) => (
              <Card key={index} className="border-card-border hover:shadow-elegant transition-smooth group cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`mx-auto w-12 h-12 rounded-lg bg-gradient-to-br from-${service.color.split('-')[1]}/10 to-${service.color.split('-')[1]}/20 flex items-center justify-center group-hover:scale-110 transition-smooth`}>
                    <service.icon className={`h-6 w-6 ${service.color}`} />
                  </div>
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center pt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/services">
                {t("home.services.explore")}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("home.benefits.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("home.benefits.subtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: TrendingUp,
                title: t("home.benefits.reduce"),
                description: t("home.benefits.reduceDesc"),
                stat: t("home.benefits.reduceStat")
              },
              {
                icon: ShoppingCart,
                title: t("home.benefits.increase"),
                description: t("home.benefits.increaseDesc"),
                stat: t("home.benefits.increaseStat")
              },
              {
                icon: Users,
                title: t("home.benefits.satisfaction"),
                description: t("home.benefits.satisfactionDesc"),
                stat: t("home.benefits.satisfactionStat")
              }
            ].map((benefit, index) => (
              <Card key={index} className="border-card-border shadow-soft hover:shadow-medium transition-smooth">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center justify-between">
                    <benefit.icon className="h-8 w-8 text-primary" />
                    <Badge variant="secondary" className="text-xs font-semibold">{benefit.stat}</Badge>
                  </div>
                  <h3 className="font-semibold text-xl">{benefit.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("home.testimonials.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("home.testimonials.subtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                company: "Almaty Fashion Store",
                testimonial: t("home.testimonials.case1"),
                author: "Ainur Nazarbayeva",
                role: t("home.testimonials.roleOwner"),
                rating: 5
              },
              {
                company: "Nur-Sultan Electronics",
                testimonial: t("home.testimonials.case2"),
                author: "Malik Tolegenov",
                role: t("home.testimonials.roleOps"),
                rating: 5
              },
              {
                company: "Shymkent Local Market",
                testimonial: t("home.testimonials.case3"),
                author: "Sara Bekmuratova",
                role: t("home.testimonials.roleOwner"),
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-card-border">
                <CardContent className="p-6 space-y-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-sm italic leading-relaxed">"{testimonial.testimonial}"</p>
                  <div className="border-t border-card-border pt-4">
                    <div className="font-semibold text-sm">{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-accent">{t("home.cta.title")}</h2>
            <p className="text-lg text-secondary-foreground/80">
              {t("home.cta.text")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <a
                href="https://wa.me/77751445154"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center px-4 py-2 rounded-md border border-primary hover:bg-primary/10 transition-smooth"
              >
                {t("cta.bookDemo")}
                <MessageSquare className="h-5 w-5 ml-2" />
              </a>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-4 border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                <Link to="/contact">
                  {t("home.cta.contact")}
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
