import { Link } from "react-router-dom";
import { IslamicDivider, EightPointStar } from "@/components/IslamicPatterns";
import { usePlatformSettings } from "@/hooks/use-platform-settings";
import { useTheme } from "@/contexts/ThemeContext";
import { Globe } from "lucide-react";

// ── Social icon map (platform name → inline SVG path data) ───────
const SOCIAL_ICONS: Record<string, JSX.Element> = {
  youtube: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  ),
  facebook: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  ),
  twitter: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.743l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117Z" />
    </svg>
  ),
  telegram: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  ),
  whatsapp: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  ),
  tiktok: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  ),
  linkedin: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  snapchat: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
    </svg>
  ),
};

function getSocialIcon(platform: string): JSX.Element {
  const key = platform.toLowerCase().trim();
  return SOCIAL_ICONS[key] ?? <Globe className="w-5 h-5" />;
}

// ─────────────────────────────────────────────────────────────────

const Footer = () => {
  const { settings } = usePlatformSettings();
  const { theme } = useTheme();

  const logoUrl =
    theme === "dark" && settings.logo_dark_url
      ? settings.logo_dark_url
      : settings.logo_light_url || "/logo.png";

  // Use DB social links if any, otherwise fall back to hardcoded defaults so the
  // footer is never empty before the admin first configures things.
  const socialLinks =
    settings.social_links.length > 0
      ? settings.social_links
      : [
          { platform: "YouTube", url: "https://www.youtube.com/@alameedonline/videos" },
          { platform: "Facebook", url: "https://www.facebook.com/share/162bhrjDzPg/?mibextid=wwXIfr" },
          { platform: "Instagram", url: "https://www.instagram.com/alameedonline" },
          { platform: "WhatsApp", url: "https://wsend.co/201027379022" },
        ];

  return (
    <footer className="py-12 border-t border-border relative overflow-hidden">
      {/* Subtle corner ornament */}
      <EightPointStar size={80} className="absolute -bottom-6 -left-6 text-primary/[0.03]" />
      <EightPointStar size={60} className="absolute -top-4 -right-4 text-primary/[0.03]" />

      <div className="container mx-auto px-4 relative z-10">
        <IslamicDivider className="mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <div className="flex items-center">
              <img src={logoUrl} alt="العميد" className="h-14 w-14 rounded-lg object-contain" />
            </div>
            <p className="text-sm text-muted-foreground">منصة خدمات العميد لشرح مادة البرمجة للبكالوريا</p>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-sm">روابط سريعة</h4>
            <div className="flex flex-col gap-2">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">الرئيسية</Link>
              <Link to="/courses" className="text-sm text-muted-foreground hover:text-foreground transition-colors">الدورات التعليمية</Link>
              <Link to="/bundles" className="text-sm text-muted-foreground hover:text-foreground transition-colors">الباقات</Link>
              <Link to="/books" className="text-sm text-muted-foreground hover:text-foreground transition-colors">الكتب والمراجع</Link>
              <Link to="/dashboard" className="text-sm text-muted-foreground hover:text-foreground transition-colors">لوحة الطالب</Link>
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-sm">تواصل معنا</h4>
            <div className="flex items-center gap-3 flex-wrap">
              {socialLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  title={link.platform}
                  className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {getSocialIcon(link.platform)}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>جميع الحقوق محفوظة لمنصة العميد {new Date().getFullYear()} ©</p>
          <a
            href="https://fakarli.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            title="فكرلي - Fakarli Studio"
          >
            <span>تم التطوير بواسطة</span>
            <img
              src={theme === "dark" ? "/fakarli-logo.png" : "/fakarli-logo-light.png"}
              alt="Fakarli"
              className="h-6 object-contain"
            />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
