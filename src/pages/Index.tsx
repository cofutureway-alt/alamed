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
  Phone,
  MessageCircle,
  Cpu,
  FileCode2,
  GraduationCap,
  CheckCircle2,
  Globe,
  Award,
} from "lucide-react";
import { Link } from "react-router-dom";

const SOCIAL_ICONS: Record<string, JSX.Element> = {
  facebook: <Facebook className="h-4 w-4 text-primary" />,
  instagram: <Instagram className="h-4 w-4 text-primary" />,
  youtube: <Youtube className="h-4 w-4 text-primary" />,
  twitter: <MessageCircle className="h-4 w-4 text-primary" />,
  whatsapp: <Phone className="h-4 w-4 text-primary" />,
};

const DEFAULT_SOCIALS = [
  { platform: "فيسبوك", url: "https://www.facebook.com/share/162bhrjDzPg/?mibextid=wwXIfr" },
  { platform: "إنستجرام", url: "https://www.instagram.com/alameedonline" },
  { platform: "يوتيوب", url: "https://www.youtube.com/@alameedonline/videos" },
  { platform: "واتساب", url: "https://wsend.co/201027379022" },
];

const features = [
  { Icon: FileCode2, title: "شرح عملي", desc: "كل درس مدعوم بأمثلة كود وتطبيقات مباشرة." },
  { Icon: Cpu, title: "منهج منظّم", desc: "ترتيب الدروس حسب المنهج الرسمي لنظام البكالوريا." },
  { Icon: GraduationCap, title: "متابعة الطالب", desc: "واجبات وتقييمات دورية لقياس المستوى." },
  { Icon: CheckCircle2, title: "استعداد للامتحان", desc: "مراجعات نهائية ونماذج محلولة." },
];

const teacherFacts = [
  "خبرة تزيد عن 15 عامًا في مجال التدريب والتدريس",
  "حاصل على الماجستير في تكنولوجيا المعلومات من جامعة ريفورد بأمريكا",
  "حاصل على رخصة مدرب دولي معتمد في الذكاء الاصطناعي",
  "حاصل على أقوى شهادات التسويق من جوجل",
  "صاحب ومدير شركة العميد للخدمات الإلكترونية",
];

const certificates = [
  { src: "/cert1.jpg", title: "شهادة رخصة المدرب الدولي المعتمد" },
  { src: "/cert2.jpg", title: "بطاقة الاتحاد العربي لتدريب التنمية البشرية" },
  { src: "/cert3.jpg", title: "بطاقة مدرب معتمد من مؤسسة ذا واي" },
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
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="border-b border-border bg-gradient-to-b from-background via-card/50 to-background py-10 md:py-14">
          <div className="container mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2">
            <div>
              <span className="inline-block rounded-md border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                نظام البكالوريا - مسار البرمجة
              </span>
              <h1 className="mt-5 text-3xl font-extrabold leading-snug md:text-5xl whitespace-pre-line">
                {headlineLines.map((line, idx) => (
                  <span key={idx} className={idx > 0 ? "block text-primary mt-1" : ""}>
                    {line}
                  </span>
                ))}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
                {subtext}
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                {ctaUrl.startsWith("http") ? (
                  <a
                    href={ctaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 shadow-md"
                  >
                    {ctaLabel}
                  </a>
                ) : (
                  <Link
                    to={ctaUrl}
                    className="rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 shadow-md"
                  >
                    {ctaLabel}
                  </Link>
                )}
              </div>
              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6 text-center">
                <div>
                  <dt className="text-2xl font-extrabold text-primary">2</dt>
                  <dd className="text-xs font-medium text-muted-foreground">صفوف دراسية</dd>
                </div>
                <div>
                  <dt className="text-2xl font-extrabold text-primary">100%</dt>
                  <dd className="text-xs font-medium text-muted-foreground">مطابق للمنهج</dd>
                </div>
                <div>
                  <dt className="text-2xl font-extrabold text-primary">أونلاين</dt>
                  <dd className="text-xs font-medium text-muted-foreground">في أي وقت</dd>
                </div>
              </dl>
            </div>
            <div className="w-full">
              {heroImage ? (
                <div className="relative rounded-2xl overflow-hidden border border-border shadow-xl">
                  <img
                    src={heroImage}
                    alt="صورة الهيرو"
                    className="w-full max-h-[420px] object-cover rounded-2xl"
                  />
                </div>
              ) : (
                <CodeAnimation />
              )}
            </div>
          </div>
        </section>

        {/* Real Dynamic Stages Section from API */}
        <StagesSection />

        {/* Real Dynamic Featured Courses from API */}
        <FeaturedCoursesSection />

        {/* Features Section */}
        <section id="features" className="border-y border-border bg-card/60">
          <div className="container mx-auto max-w-6xl px-4 py-10 md:py-14">
            <h2 className="text-2xl font-extrabold md:text-3xl text-center md:text-right">لماذا منصة العميد</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {features.map(({ Icon, title, desc }) => (
                <div key={title} className="border border-border bg-background p-6 rounded-xl shadow-sm">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 font-bold text-base">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Code Playground Section */}
        <section id="playground" className="container mx-auto max-w-6xl px-4 py-10 md:py-14">
          <div className="mb-8 text-center md:text-right">
            <h2 className="text-2xl font-extrabold md:text-3xl">جرّب الكود بنفسك</h2>
            <p className="mt-2 text-muted-foreground">
              محرر بسيط داخل المنصة: عدّل الكود، اضغط تشغيل، وشاهد النتيجة أو رسالة الخطأ.
            </p>
          </div>
          <CodePlayground />
        </section>

        {/* Teacher Section & Real Certificates */}
        <section id="teacher" className="border-t border-border bg-card/40 py-10 md:py-14">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid items-center gap-8 md:grid-cols-3">
              <div className="border border-border bg-card p-3 rounded-2xl shadow-sm overflow-hidden flex justify-center">
                <img
                  src="/teacher.jpg"
                  alt="صورة معلم مادة البرمجة - منصة العميد"
                  className="w-full max-w-xs object-cover rounded-xl shadow-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
              <div className="md:col-span-2">
                <h2 className="text-2xl font-extrabold md:text-3xl">عن المعلم</h2>
                <ul className="mt-5 space-y-3">
                  {teacherFacts.map((fact) => (
                    <li key={fact} className="flex items-start gap-2 text-sm leading-relaxed">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="text-muted-foreground">{fact}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center gap-3">
                  <a
                    href="https://wsend.co/201027379022"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex rounded-md bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-opacity hover:opacity-90 shadow-sm"
                  >
                    تواصل عبر واتساب
                  </a>
                </div>
              </div>
            </div>

            {/* Official Certificates Grid */}
            <div className="mt-16 pt-10 border-t border-border">
              <div className="flex items-center gap-2 mb-6">
                <Award className="h-6 w-6 text-primary" />
                <h3 className="text-xl font-extrabold">شهادات التقدير والرخص المعتمدة</h3>
              </div>
              <div className="grid gap-6 md:grid-cols-3">
                {certificates.map((cert, idx) => (
                  <div key={idx} className="border border-border bg-card p-3 rounded-xl shadow-sm overflow-hidden group">
                    <img
                      src={cert.src}
                      alt={cert.title}
                      loading="lazy"
                      className="w-full h-56 object-contain rounded-lg transition-transform group-hover:scale-105"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <p className="mt-3 text-xs text-center font-bold text-muted-foreground">{cert.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact & Socials Section from API */}
        <section id="contact" className="border-t border-border bg-card">
          <div className="container mx-auto max-w-6xl px-4 py-10 text-center md:py-12">
            <h2 className="text-2xl font-extrabold md:text-3xl">تابعنا على وسائل التواصل</h2>
            <p className="mt-2 text-lg font-bold text-primary" dir="ltr">01027379022</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              {activeSocials.map((social, idx) => {
                const iconKey = social.platform.toLowerCase();
                const icon = SOCIAL_ICONS[iconKey] ?? <Globe className="h-4 w-4 text-primary" />;
                return (
                  <a
                    key={idx}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-5 py-3 text-sm font-bold transition-colors hover:border-primary hover:text-primary shadow-sm"
                  >
                    {icon}
                    {social.platform}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
