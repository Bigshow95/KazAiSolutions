import { useState, useEffect } from 'react';
import { useI18n } from '@/i18n/i18n';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useSearchParams } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  Instagram,
  ChevronRight,
  Bot,
  Globe,
  Zap,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Contact = () => {
  const { toast } = useToast();
  const { t } = useI18n();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessLink: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);

  // Prefill from ?service=...
  const [params] = useSearchParams();
  useEffect(() => {
    const s = params.get("service");
    if (s) {
      setFormData(prev => ({
        ...prev,
        message:
          prev.message ||
          t("contact.prefill").replace("{service}", s)
      }));
    }
  }, [params, t]);

  useEffect(() => {
    // Load reCAPTCHA v3 script
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    if (!siteKey) return;
    const id = "recaptcha-script";
    if (document.getElementById(id)) return;
    const s = document.createElement("script");
    s.id = id;
    s.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    document.head.appendChild(s);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    // Honeypot check
    const honeypot = (document.getElementById("company") as HTMLInputElement)?.value || "";
    if (honeypot) {
      setLoading(false);
      return;
    }

    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
    let token = "";
    try {
      // @ts-ignore
      token = siteKey && window.grecaptcha
        ? await window.grecaptcha.execute(siteKey, { action: "submit" })
        : "";
    } catch {}

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, token }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || "Failed");

      toast({
        title: t("common.success"),
        description: t("common.successDesc"),
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        businessLink: "",
        message: "",
      });
    } catch (err) {
      toast({
        title: t("common.error"),
        description: t("contact.error"),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-accent/10 to-primary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <Badge variant="secondary" className="mb-4 px-4 py-2">
              {t("contact.hero.badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">{t("contact.hero.title1")}</span>
              <br />
              {t("contact.hero.title2")}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t("contact.hero.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form (LEFT) */}
            <Card className="shadow-elegant border-card-border">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  {t("contact.form.title")}
                </CardTitle>
                <p className="text-muted-foreground text-center">
                  {t("contact.form.subtitle")}
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t("common.name")} *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t("contact.form.ph.name")}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t("common.email")} *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={t("contact.form.ph.email")}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">{t("common.phone")} *</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+7 775 144 5154"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="businessLink">{t("contact.form.ph.businessLinkLabel")}</Label>
                      <Input
                        id="businessLink"
                        name="businessLink"
                        type="url"
                        value={formData.businessLink}
                        onChange={handleChange}
                        placeholder="https://yourbusiness.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t("common.message")} *</Label>
                    {/* honeypot */}
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t("contact.form.ph.message")}
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" variant="hero" className="w-full" disabled={loading}>
                    {t("contact.form.submit")}
                    <Send className="h-4 w-4 ml-2" />
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* RIGHT COLUMN: Info + Quick Links */}
            <div className="space-y-8">
              {/* Contact Information */}
              <Card className="border-card-border">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">{t("contact.info.title")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{t("contact.info.email")}</p>
                      <p className="text-muted-foreground">kz.ai.solutions@gmail.com</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-accent/10 rounded-lg">
                      <Phone className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium">{t("contact.info.phone")}</p>
                      <p className="text-muted-foreground">+7 775 144 5154</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-success/10 rounded-lg">
                      <MapPin className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium">{t("contact.info.location")}</p>
                      <p className="text-muted-foreground">Astana, Kazakhstan</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-secondary/10 rounded-lg">
                      <Clock className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-medium">{t("contact.info.hours")}</p>
                      <p className="text-muted-foreground">{t("contact.info.hoursValue")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Links */}
              <Card className="border-card-border">
                <CardHeader>
                  <CardTitle className="text-xl font-bold">{t("contact.quick.title")}</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div
                    onClick={() => window.open('https://wa.me/77751445154', '_blank')}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-smooth cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="h-5 w-5 text-success" />
                      <span className="font-medium">{t("contact.quick.whatsapp")}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div
                    onClick={() => window.open('https://t.me/baisansyzbay', '_blank')}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-smooth cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <Send className="h-5 w-5 text-primary" />
                      <span className="font-medium">{t("contact.quick.telegram")}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>

                  <div
                    onClick={() => window.open('https://www.instagram.com/kaz.ai.solutions/', '_blank')}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-smooth cursor-pointer"
                  >
                    <div className="flex items-center space-x-3">
                      <Instagram className="h-5 w-5 text-accent" />
                      <span className="font-medium">{t("contact.quick.instagram")}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Cards */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("contact.services.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("contact.services.subtitle")}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Bot,
                title: t("home.services.chatbots.title"),
                description: t("home.services.chatbots.desc"),
                color: "primary"
              },
              {
                icon: Globe,
                title: t("home.services.websites.title"),
                description: t("home.services.websites.desc"),
                color: "accent"
              },
              {
                icon: Zap,
                title: t("home.services.automation.title"),
                description: t("home.services.automation.desc"),
                color: "secondary"
              },
              {
                icon: BarChart3,
                title: t("services.analytics.title"),
                description: t("services.analytics.desc"),
                color: "success"
              }
            ].map((service, index) => (
              <Card key={index} className="border-card-border hover:shadow-elegant transition-smooth group cursor-pointer">
                <CardContent className="p-6 text-center space-y-4">
                  <div className={`mx-auto w-12 h-12 bg-${service.color}/10 rounded-lg flex items-center justify-center group-hover:scale-110 transition-smooth`}>
                    <service.icon className={`h-6 w-6 text-${service.color}`} />
                  </div>
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
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
            <h2 className="text-3xl font-bold mb-4">{t("contact.faq.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t("contact.faq.subtitle")}
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: t("contact.faq.q1.q"), a: t("contact.faq.q1.a") },
              { q: t("contact.faq.q2.q"), a: t("contact.faq.q2.a") },
              { q: t("contact.faq.q3.q"), a: t("contact.faq.q3.a") },
              { q: t("contact.faq.q4.q"), a: t("contact.faq.q4.a") },
            ].map((faq, index) => (
              <Card key={index} className="border-card-border">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-3">{faq.q}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
