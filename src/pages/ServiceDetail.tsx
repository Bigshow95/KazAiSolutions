import { useParams, Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronRight } from 'lucide-react';
import { useI18n } from '@/i18n/i18n';

type Slug = 'chatbots' | 'websites' | 'automation' | 'analytics';

const META: Record<Slug, { titleKey: string; introKey: string; bulletsPrefix: string }> = {
  chatbots: {
    titleKey: 'svc.chatbots.title',
    introKey: 'svc.chatbots.intro',
    bulletsPrefix: 'svc.chatbots.bullets',
  },
  websites: {
    titleKey: 'svc.websites.title',
    introKey: 'svc.websites.intro',
    bulletsPrefix: 'svc.websites.bullets',
  },
  automation: {
    titleKey: 'svc.automation.title',
    introKey: 'svc.automation.intro',
    bulletsPrefix: 'svc.automation.bullets',
  },
  analytics: {
    titleKey: 'svc.analytics.title',
    introKey: 'svc.analytics.intro',
    bulletsPrefix: 'svc.analytics.bullets',
  },
};

export const ServiceDetail = () => {
  const { t } = useI18n();
  const { slug } = useParams<{ slug: Slug }>();

  if (!slug || !META[slug]) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Service not found</h1>
        <Link to="/services" className="underline">Back to Services</Link>
      </div>
    );
  }

  const meta = META[slug];
  const bulletKeys = [1, 2, 3, 4].map((n) => `${meta.bulletsPrefix}.${n}`);

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-2">{t(meta.titleKey)}</h1>
      <p className="text-muted-foreground mb-8">{t(meta.introKey)}</p>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {bulletKeys.map((k, i) => (
          <Card key={i} className="border-card-border">
            <CardContent className="p-6">{t(k)}</CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-3">
        <Link
          to={`/contact?service=${slug}`}
          className="gradient-bg inline-flex items-center px-4 py-2 rounded-md"
        >
          {t('cta.getStarted')}
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
        <a
          href={`https://wa.me/77751445154?text=${encodeURIComponent('Hi, I want ' + t(meta.titleKey))}`}
          target="_blank"
          rel="noopener"
          className="inline-flex items-center px-4 py-2 rounded-md border border-primary hover:bg-primary/10"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
};
