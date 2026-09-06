import { getMessages, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import InfoSection from '@/components/InfoSection';
import RouteSection from '@/components/RouteSection';
import PhotoSpotsSection from '@/components/PhotoSpotsSection';
import HotelsSection from '@/components/HotelsSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import MapEmbed from '@/components/MapEmbed';
import Footer from '@/components/Footer';
import FaqSection from '@/components/FaqSection';
import SourcesSection from '@/components/SourcesSection';
import FacilitiesSection from '@/components/FacilitiesSection';
import WeatherSection from '@/components/WeatherSection';
import StoriesSection from '@/components/StoriesSection';

export const revalidate = 900;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = (await getMessages()) as {
    faq?: { title?: string; subtitle?: string; items: { q: string; a: string }[] };
    sources?: {
      title?: string;
      intro?: string;
      breadcrumb?: string;
      nearby?: string;
      note?: string;
      items: { label: string; url: string }[];
    };
  };

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <BasicInfo />
        <HoursSection />
        <TicketsSection />
        <WeatherSection locale={locale} />
        <TransportSection />
        <FacilitiesSection />
        <InfoSection />
        <StoriesSection />
        <RouteSection />
        <PhotoSpotsSection />
        <HotelsSection />
        <Gallery />
        <Reviews />
        <FaqSection
          title={messages.faq?.title ?? ''}
          subtitle={messages.faq?.subtitle ?? ''}
          items={messages.faq?.items ?? []}
        />
        <MapEmbed />
        <SourcesSection
          title={messages.sources?.title ?? ''}
          intro={messages.sources?.intro}
          breadcrumb={messages.sources?.breadcrumb}
          nearby={messages.sources?.nearby}
          items={messages.sources?.items}
          note={messages.sources?.note}
        />
      </main>
      <Footer />
    </>
  );
}
