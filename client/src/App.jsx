import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Technology from './components/Technology';
import Statistics from './components/Statistics';
import CallToAction from './components/CallToAction';
import Sustainability from './components/Sustainability';
import RoiCalculator from './components/RoiCalculator';
import DroneSimulator from './components/DroneSimulator';
import CaseStudiesAndProof from './components/CaseStudiesAndProof';
import FaqAccordion from './components/FaqAccordion';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AuditCalendarModal from './components/AuditCalendarModal';
import LegalModal from './components/LegalModal';
import CookieBanner from './components/CookieBanner';
import { Articles, ContentBlock } from './components/CmsContent';
import { defaultPage, defaultSettings } from './data/cmsDefaults';

const sections = {
  hero: Hero, about: About, technology: Technology, stats: Statistics, ctaBanner: CallToAction,
  sustainability: Sustainability, roi: RoiCalculator, ndviDemo: DroneSimulator,
  caseStudies: CaseStudiesAndProof, faq: FaqAccordion, contact: Contact,
};

const path = window.location.pathname.replace(/\/$/, '') || '/';
const isPreview = new URLSearchParams(window.location.search).has('preview');
const fetchPath = isPreview ? '/admin/preview' : '/api/cms';

export default function CmsApp() {
  const [lang, setLang] = useState(() => localStorage.getItem('agverse-language') === 'ar' ? 'ar' : 'en');
  const [isDark, setIsDark] = useState(false);
  const [interest, setInterest] = useState('Tech Audit');
  const [calendar, setCalendar] = useState(false);
  const [legal, setLegal] = useState(null);
  const [site, setSite] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`${fetchPath}?path=${encodeURIComponent(path)}`, { signal: controller.signal, headers: { Accept: 'application/json' } })
      .then(async (response) => {
        if (!response.ok && response.status !== 404) throw new Error('CMS unavailable');
        setSite(await response.json());
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setSite({ unavailable: true });
      });
    return () => controller.abort();
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('agverse-language', lang);
  }, [lang]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const publishedSettings = site?.settings?.[lang];
  const settings = {
    ...defaultSettings[lang],
    ...publishedSettings,
    footer: { ...defaultSettings[lang].footer, ...publishedSettings?.footer },
  };
  const page = site?.kind === 'page' && site.content
    ? site.content
    : path === '/' && !isPreview ? defaultPage : null;
  const article = site?.kind === 'article' ? site.content : null;
  const articleMeta = article?.[lang] || {};
  const pageMeta = page?.content?.[lang]?.meta;
  const title = articleMeta.seoTitle || articleMeta.title || article?.en?.seoTitle || article?.en?.title ||
    pageMeta?.title || (site?.kind === 'articleIndex' ? (lang === 'ar' ? 'المقالات' : 'Articles') : settings.seoTitle);
  const description = articleMeta.seoDescription || articleMeta.summary || article?.en?.seoDescription || article?.en?.summary ||
    pageMeta?.description || settings.seoDescription;

  useEffect(() => {
    if (title) document.title = title;
    const metadata = {
      'meta[name="title"], meta[property="og:title"], meta[property="twitter:title"]': title,
      'meta[name="description"], meta[property="og:description"], meta[property="twitter:description"]': description,
      'meta[property="og:url"], meta[property="twitter:url"]': new URL(path, window.location.origin).href,
      'meta[property="og:site_name"], meta[name="author"]': settings.brand,
      'meta[property="og:locale"]': lang === 'ar' ? 'ar_AE' : 'en_US',
      'meta[property="og:type"]': article ? 'article' : 'website',
    };
    for (const [selector, value] of Object.entries(metadata)) {
      if (value) document.querySelectorAll(selector).forEach((element) => { element.content = value; });
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.href = new URL(path, window.location.origin).href;
  }, [title, description, settings.brand, lang, article]);

  const handleInterest = (name) => {
    setInterest(name);
    const contact = document.getElementById('contact');
    if (contact) contact.scrollIntoView({ behavior: 'smooth' });
    else if (path !== '/') window.location.assign('/#contact');
  };

  const t = { ...settings, homeHref: path === '/' ? '#home' : '/#home' };
  const openAudit = () => setCalendar(true);
  return (
    <div className="min-h-screen bg-[#F5F1E8] dark:bg-[#0B3D2E] text-[#14201B] dark:text-[#F5F1E8] flex flex-col">
      <Navbar t={t} lang={lang} setLang={setLang} isDark={isDark} setIsDark={setIsDark} onOpenAudit={openAudit} solid={page?.blocks.find((block) => block.enabled)?.type !== 'hero'}>
        {isPreview && (
          <p className="bg-[#8BC34A] px-4 py-1.5 text-center text-sm text-[#0B3D2E]">
            Draft preview · <a href="/admin/media" className="font-semibold underline underline-offset-2">Back to editor</a>
          </p>
        )}
      </Navbar>
      <main id="main-content" className="flex-1">
        {page ? page.blocks.filter((block) => block.enabled).map((block) => {
          const content = page.content?.[lang]?.[block.id] ?? page.content?.en?.[block.id];
          if (!content) return null;
          const Section = sections[block.type];
          return Section
            ? <Section key={block.id} lang={lang} t={{ ...t, [block.type]: { ...defaultPage.content[lang][block.type], ...content } }} onSelectInterest={handleInterest} selectedInterest={interest} onOpenCalendar={openAudit} />
            : <ContentBlock key={block.id} lang={lang} type={block.type} content={content} />;
        }) : article || site?.kind === 'articleIndex' ? (
          <Articles article={article} articles={site.articles} lang={lang} />
        ) : (
          <section className="section-container pt-32 pb-20">
            <h1 className="font-heading text-4xl">{!site ? 'Loading…' : site.unavailable ? 'Content unavailable' : 'Page not found'}</h1>
            {site && <a className="underline" href="/">Home</a>}
          </section>
        )}
      </main>
      <Footer t={t} onOpenPrivacy={() => setLegal('privacy')} onOpenTerms={() => setLegal('terms')} />
      <AuditCalendarModal isOpen={calendar} onClose={() => setCalendar(false)} content={settings.auditCalendar} />
      <LegalModal isOpen={Boolean(legal)} type={legal} onClose={() => setLegal(null)} content={settings.legal} />
      <CookieBanner onOpenPrivacy={() => setLegal('privacy')} content={settings.cookies} />
    </div>
  );
}
