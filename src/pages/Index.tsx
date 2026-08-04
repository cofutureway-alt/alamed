import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CodeAnimation from "@/components/CodeAnimation";
import CodePlayground from "@/components/CodePlayground";
import StagesSection from "@/components/StagesSection";
import FeaturedCoursesSection from "@/components/FeaturedCoursesSection";
import { usePlatformSettings } from "@/hooks/use-platform-settings";
import {
  Facebook,
  Instagram,
  Youtube,
  Cpu,
  FileCode2,
  GraduationCap,
  CheckCircle2,
  Globe,
  Award,
  Sparkles,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

const SOCIAL_ICONS: Record<string, JSX.Element> = {
  facebook: <Facebook className="h-4 w-4" />,
  instagram: <Instagram className="h-4 w-4" />,
  youtube: <Youtube className="h-4 w-4" />,
  twitter: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
    </svg>
  ),
  whatsapp: (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  ),
};

const DEFAULT_SOCIALS = [
  { platform: "فيسبوك", url: "https://www.facebook.com/share/162bhrjDzPg/?mibextid=wwXIfr" },
  { platform: "إنستجرام", url: "https://www.instagram.com/alameedonline" },
  { platform: "يوتيوب", url: "https://www.youtube.com/@alameedonline/videos" },
  { platform: "واتساب", url: "https://wsend.co/201027379022" },
];

const features = [
  { Icon: FileCode2, title: "شرح عملي مباشر", desc: "كل درس مدعوم بأمثلة كود وتطبيقات برمجية مباشرة ينفذها الطالب بنفسه." },
  { Icon: Cpu, title: "منهج منظم 100%", desc: "ترتيب الدروس الدقيق وفق المنهج الرسمي الجديد لنظام البكالوريا." },
  { Icon: GraduationCap, title: "متابعة وتقييم دوري", desc: "واجبات واختبارات وتحديد لمستوى الطالب خطوة بخطوة." },
  { Icon: CheckCircle2, title: "جاهزية تامة للامتحان", desc: "مراجعات نهائية مكثفة، وحل أسئلة وتجميعات الامتحانات السابقة." },
];

const teacherFacts = [
  "خبرة تزيد عن 15 عامًا في مجال التدريب والتدريس الأكاديمي والمهني",
  "حاصل على الماجستير في تكنولوجيا المعلومات من جامعة ريفورد بأمريكا",
  "حاصل على رخصة مدرب دولي معتمد في تطبيقات الذكاء الاصطناعي",
  "حاصل على أعلى الشهادات الدولية في التسويق والتكنولوجيا من Google",
  "صاحب ومدير شركة العميد للخدمات الإلكترونية والحلول البرمجية",
];

const certificates = [
  { src: "/cert1.jpg", title: "شهادة رخصة المدرب الدولي المعتمد", desc: "اعتماد دولي في تدريب تكنولوجيا المعلومات والذكاء الاصطناعي" },
  { src: "/cert2.jpg", title: "بطاقة الاتحاد العربي لتدريب التنمية البشرية", desc: "عضوية وتوثيق الاتحاد العربي للتدريب" },
  { src: "/cert3.jpg", title: "بطاقة مدرب معتمد من مؤسسة ذا واي", desc: "رخصة تدريب واستشارات تعليمية معتمدة" },
];

const Index = () => {
  const { settings } = usePlatformSettings();

  const activeSocials =
    settings.social_links && settings.social_links.length > 0
      ? settings.social_links
      : DEFAULT_SOCIALS;

  const headline = settings.hero_headline || "منصة العميد لشرح مادة البرمجة\nللثانوية العامة";
  const subtext =
    settings.hero_subtext ||
    "شرح مبسّط ومتدرّج لطلاب الصف الأول والثاني الثانوي، من أساسيات الخوارزميات حتى كتابة الكود وحل نماذج الامتحانات.";
  const ctaLabel = settings.hero_cta_label || "ابدأ التعلم الآن";
  const ctaUrl = settings.hero_cta_url || "/courses";
  const heroImage = settings.hero_image_url;

  const headlineLines = headline.split("\n");

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between antialiased selection:bg-primary/20">
      {/* Real Full Platform Navbar */}
      <Navbar />

      <main className="pt-16">
        {/* Dynamic Hero Section with Ambient Glowing Mesh */}
        <section className="relative overflow-hidden border-b border-border/80 bg-grid-pattern py-14 md:py-20">
          <div className="glow-blob -top-20 -right-20 h-96 w-96 bg-primary/20" />
          <div className="glow-blob top-40 -left-20 h-80 w-80 bg-amber-500/20" />

          <div className="relative container mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary shadow-sm backdrop-blur-md">
                <Sparkles className="h-3.5 w-3.5 animate-pulse" />
                <span>نظام البكالوريا الجديد - مسار البرمجة</span>
              </div>

              <h1 className="mt-5 text-3xl font-black leading-tight tracking-tight md:text-5xl whitespace-pre-line">
                {headlineLines.map((line, idx) => (
                  <span key={idx} className={idx > 0 ? "block text-gradient mt-1" : ""}>
                    {line}
                  </span>
                ))}
              </h1>

              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {subtext}
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-4">
                {ctaUrl.startsWith("http") ? (
                  <a
                    href={ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-amber-500 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-primary/35"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>{ctaLabel}</span>
                  </a>
                ) : (
                  <Link
                    to={ctaUrl}
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-amber-500 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-primary/25 transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-primary/35"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span>{ctaLabel}</span>
                  </Link>
                )}

              </div>

              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border/80 pt-6 text-center">
                <div className="rounded-xl border border-border/60 bg-card/50 p-3 backdrop-blur-sm">
                  <dt className="text-2xl font-black text-gradient">2 صفوف</dt>
                  <dd className="mt-1 text-xs font-semibold text-muted-foreground">الأول والثاني الثانوي</dd>
                </div>
                <div className="rounded-xl border border-border/60 bg-card/50 p-3 backdrop-blur-sm">
                  <dt className="text-2xl font-black text-gradient">100%</dt>
                  <dd className="mt-1 text-xs font-semibold text-muted-foreground">مطابق للبكالوريا</dd>
                </div>
                <div className="rounded-xl border border-border/60 bg-card/50 p-3 backdrop-blur-sm">
                  <dt className="text-2xl font-black text-gradient">أونلاين</dt>
                  <dd className="mt-1 text-xs font-semibold text-muted-foreground">مباشر ومسجل</dd>
                </div>
              </dl>
            </div>

            <div className="w-full">
              {heroImage ? (
                <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl">
                  <img
                    src={heroImage}
                    alt="صورة الهيرو"
                    className="w-full max-h-[420px] object-cover rounded-2xl"
                  />
                </div>
              ) : (
                <div className="relative">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/30 to-amber-500/30 opacity-75 blur-xl" />
                  <CodeAnimation />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Real Dynamic Stages Section from Backend */}
        <StagesSection />

        {/* Real Dynamic Featured Courses from Backend */}
        <FeaturedCoursesSection />

        {/* High-Contrast Dark Tech Section - Breaks White Rhythm */}
        <section id="features" className="relative overflow-hidden border-y border-slate-800 bg-[#090E17] py-16 text-white bg-grid-pattern">
          <div className="glow-blob top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[450px] bg-primary/15" />

          <div className="relative container mx-auto max-w-6xl px-4">
            <div className="text-center">
              <span className="inline-block rounded-full bg-primary/20 px-3.5 py-1 text-xs font-bold text-primary">
                مميزات المنصة
              </span>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl">لماذا تختار منصة العميد؟</h2>
              <p className="mt-2 text-slate-400">أسلوب تعليمي متطور يجمع بين البساطة والتطبيق البرمجي الفعلي.</p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(({ Icon, title, desc }) => (
                <div
                  key={title}
                  className="group relative rounded-xl border border-slate-800 bg-slate-900/80 p-6 backdrop-blur-md shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/50 hover:bg-slate-900"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary border border-primary/30 shadow-md shadow-primary/20 transition-transform group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Code Playground Section */}
        <section id="playground" className="container mx-auto max-w-6xl px-4 py-14 md:py-20">
          <div className="mb-10 text-center">
            <span className="inline-block rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
              بيئة التطوير الحية
            </span>
            <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">جرّب الكود بنفسك الآن</h2>
            <p className="mt-2 text-muted-foreground">
              محرر أكواد تفاعلي مدعوم داخل المنصة: عدّل البيانات، شغّل الكود، وشاهد النتيجة الفورية.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card/60 p-4 shadow-xl backdrop-blur-md md:p-6">
            <CodePlayground />
          </div>
        </section>

        {/* Teacher Section & Real Certificates */}
        <section id="teacher" className="border-t border-border/80 bg-secondary/30 py-14 md:py-20">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid items-center gap-12 md:grid-cols-3">
              <div className="relative group">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary to-amber-500 opacity-50 blur-lg transition-all group-hover:opacity-75" />
                <div className="relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-card p-3 shadow-xl">
                  <img
                    src="/teacher.jpg"
                    alt="صورة معلم مادة البرمجة - منصة العميد"
                    className="w-full rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/placeholder.svg";
                    }}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <span className="inline-block rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
                  الخبرة والكفاءة
                </span>
                <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">عن المعلم المحاضر</h2>

                <ul className="mt-6 space-y-3.5">
                  {teacherFacts.map((fact) => (
                    <li key={fact} className="flex items-start gap-3 text-sm leading-relaxed">
                      <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                      </span>
                      <span className="font-semibold text-foreground/90">{fact}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <a
                    href="https://wsend.co/201027379022"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-amber-500 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-primary/25 transition-all hover:opacity-95 hover:shadow-2xl hover:shadow-primary/35"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>تواصل مباشر مع المحاضر عبر واتساب</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Official Certificates Grid */}
            <div id="certificates" className="mt-20 pt-10 border-t border-border/80">
              <div className="text-center">
                <span className="inline-block rounded-full bg-primary/10 px-3.5 py-1 text-xs font-bold text-primary">
                  التراخيص المعتمدة
                </span>
                <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">شهادات التقدير والاعتمادات الدولية</h2>
                <p className="mt-2 text-muted-foreground">شهادات ورخص تدريب رسمية معتمدة محلياً ودولياً.</p>
              </div>

              <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                {certificates.map((cert, idx) => (
                  <div
                    key={idx}
                    className="group overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl"
                  >
                    <div className="overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-900 p-2">
                      <img
                        src={cert.src}
                        alt={cert.title}
                        loading="lazy"
                        className="h-56 w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <div className="mt-4 flex items-center gap-2">
                      <Award className="h-5 w-5 text-primary shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold text-foreground">{cert.title}</h4>
                        <p className="text-xs text-muted-foreground">{cert.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Socials Section */}
        <section id="contact" className="container mx-auto max-w-6xl px-4 py-14">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-primary/95 to-amber-700 p-10 md:p-14 text-white shadow-2xl shadow-primary/20 text-center">
            <div className="glow-blob top-0 right-0 h-64 w-64 bg-amber-400/30" />
            <div className="glow-blob bottom-0 left-0 h-64 w-64 bg-primary/40" />

            <div className="relative z-10 mx-auto max-w-2xl">
              <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-bold text-amber-200 backdrop-blur-md">
                تواصل مباشر وحجز المكان
              </span>
              <h2 className="mt-4 text-3xl font-black leading-snug md:text-5xl text-white">
                تابعنا على وسائل التواصل
              </h2>
              <p className="mt-4 text-sm md:text-base text-slate-200" dir="ltr">
                01027379022
              </p>

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {activeSocials.map((social, idx) => {
                  const iconKey = social.platform.toLowerCase();
                  const icon = SOCIAL_ICONS[iconKey] ?? <Globe className="h-4 w-4" />;
                  return (
                    <a
                      key={idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 py-3 text-xs font-bold text-white backdrop-blur-md transition-all hover:bg-white hover:text-slate-900"
                    >
                      {icon}
                      <span>{social.platform}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Real Full Platform Footer */}
      <Footer />
    </div>
  );
};

export default Index;
