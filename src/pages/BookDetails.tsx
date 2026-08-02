import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ArrowRight,
  Cloud,
  Package,
  CheckCircle2,
  AlertCircle,
  FileText,
  GraduationCap,
  Layers,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Sparkles,
  User,
  Building2,
  Calendar,
  Hash,
  Globe2,
  Tag,
  ShieldCheck,
  Download,
  Scale,
  Ruler,
  Image as ImageIcon,
  X,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Eye,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatPiastres, getEffectivePrice } from "@/lib/money";
import { useSignedUrl } from "@/hooks/use-signed-url";
import AddToCartButton from "@/components/AddToCartButton";

interface BookDetail {
  id: string;
  title: string;
  author: string | null;
  publisher: string | null;
  publication_year: string | number | null;
  isbn: string | null;
  language: string | null;
  description: string | null;
  cover_image_url: string | null;
  book_type: "digital" | "physical";
  price_piastres: number;
  discount_price_piastres: number | null;
  discount_expires_at: string | null;
  stock_quantity: number | null;
  subject_id: string | null;
  stage_id: string | null;
  tags: string[] | null;
  digital_file_url: string | null;
  download_limit: number | null;
  unlimited_downloads: boolean | null;
  is_drm_protected: boolean | null;
  weight_grams: number | null;
  length_cm: number | null;
  width_cm: number | null;
  height_cm: number | null;
  subjects?: { name: string } | null;
  stages?: { name: string } | null;
}

interface BookImage {
  id: string;
  image_url: string;
  order_index: number;
}

function LargeCover({
  path,
  title,
  onClick,
}: {
  path: string | null;
  title: string;
  onClick?: () => void;
}) {
  const url = useSignedUrl("book-assets", path);
  return (
    <div
      onClick={onClick}
      className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-border bg-card shadow-lg flex items-center justify-center cursor-pointer group"
    >
      {url ? (
        <>
          <img src={url} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white font-bold text-sm">
            <ZoomIn className="w-6 h-6" />
            <span>عرض الغلاف بالكامل</span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-3 text-muted-foreground p-6 text-center">
          <BookOpen className="w-16 h-16 stroke-[1.5] text-primary/40" />
          <span className="text-sm font-medium">{title}</span>
        </div>
      )}
    </div>
  );
}

function GalleryImage({
  path,
  onClick,
}: {
  path: string;
  onClick?: () => void;
}) {
  const url = useSignedUrl("book-assets", path);
  if (!url) return null;
  return (
    <div
      onClick={onClick}
      className="aspect-[4/3] rounded-xl overflow-hidden border border-border bg-card shadow-sm cursor-pointer relative group"
    >
      <img src={url} alt="معاينة" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-bold">
        <Eye className="w-4 h-4" />
        <span>تكبير الصور</span>
      </div>
    </div>
  );
}

function LightboxItem({ path }: { path: string }) {
  const url = useSignedUrl("book-assets", path);
  if (!url) {
    return <Loader2 className="w-8 h-8 animate-spin text-white" />;
  }
  return (
    <img
      src={url}
      alt="عرض مكبر"
      className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg shadow-2xl transition-transform"
    />
  );
}

export default function BookDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<BookDetail | null>(null);
  const [images, setImages] = useState<BookImage[]>([]);
  const [related, setRelated] = useState<BookDetail[]>([]);
  const [loading, setLoading] = useState(true);

  // Lightbox State
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      const { data, error } = await (supabase as any)
        .from("books")
        .select("*, subjects(name), stages(name)")
        .eq("id", id)
        .maybeSingle();

      if (error || !data) {
        setBook(null);
        setLoading(false);
        return;
      }

      setBook(data as BookDetail);
      document.title = `${data.title} — العميد`;

      // Query gallery images
      const { data: imgsData } = await (supabase as any)
        .from("book_images")
        .select("*")
        .eq("book_id", id)
        .order("order_index");

      setImages((imgsData ?? []) as BookImage[]);

      // Fetch related books
      const { data: relatedData } = await (supabase as any)
        .from("books")
        .select("*, subjects(name), stages(name)")
        .neq("id", id)
        .limit(3);

      setRelated((relatedData ?? []) as BookDetail[]);
      setLoading(false);
    })();
  }, [id]);

  // Combine cover image and gallery images for full lightbox list
  const allImagePaths: string[] = [];
  if (book?.cover_image_url) allImagePaths.push(book.cover_image_url);
  images.forEach((img) => {
    if (img.image_url) allImagePaths.push(img.image_url);
  });

  // Handle keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowLeft") {
        setLightboxIndex((prev) => (prev !== null && prev < allImagePaths.length - 1 ? prev + 1 : 0));
      }
      if (e.key === "ArrowRight") {
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : allImagePaths.length - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, allImagePaths.length]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground font-medium">جاري تحميل كافة تفاصيل الكتاب...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-background flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
          <AlertCircle className="w-12 h-12 text-destructive mb-4" />
          <h1 className="text-2xl font-bold">الكتاب غير موجود</h1>
          <p className="text-muted-foreground mt-2 mb-6">عذراً، لم نتمكن من العثور على هذا الكتاب.</p>
          <Link to="/books" className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline">
            <ArrowRight className="w-4 h-4" /> العودة لقائمة الكتب
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const eff = getEffectivePrice(book.price_piastres, book.discount_price_piastres, book.discount_expires_at);
  const inStock = book.book_type === "digital" || (book.stock_quantity ?? 0) > 0;

  const langMap: Record<string, string> = {
    ar: "العربية",
    en: "الإنجليزية",
    fr: "الفرنسية",
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <Navbar />

      <main className="pt-20 pb-16 flex-1">
        <div className="container mx-auto max-w-6xl px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-muted-foreground mb-8">
            <Link to="/" className="hover:text-foreground transition-colors">الرئيسية</Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <Link to="/books" className="hover:text-foreground transition-colors">الكتب والمراجع</Link>
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="text-foreground font-medium truncate max-w-[200px]">{book.title}</span>
          </nav>

          {/* Main Book Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Cover Column */}
            <div className="md:col-span-4 max-w-sm mx-auto md:max-w-none w-full">
              <LargeCover
                path={book.cover_image_url}
                title={book.title}
                onClick={() => setLightboxIndex(0)}
              />
            </div>

            {/* Main Info Column */}
            <div className="md:col-span-8 space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {book.book_type === "digital" ? (
                    <Badge variant="secondary" className="gap-1.5 px-3 py-1 text-xs">
                      <Cloud className="w-3.5 h-3.5 text-primary" /> نسخة إلكترونية (PDF)
                    </Badge>
                  ) : (
                    <Badge className="gap-1.5 px-3 py-1 text-xs">
                      <Package className="w-3.5 h-3.5" /> كتاب مطبوع شحن
                    </Badge>
                  )}
                  {book.stages?.name && (
                    <Badge variant="outline" className="gap-1 text-xs">
                      <GraduationCap className="w-3.5 h-3.5 text-primary" /> {book.stages.name}
                    </Badge>
                  )}
                  {book.subjects?.name && (
                    <Badge variant="outline" className="gap-1 text-xs">
                      <Layers className="w-3.5 h-3.5 text-primary" /> {book.subjects.name}
                    </Badge>
                  )}
                  {eff.discountActive && (
                    <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/30">
                      خصم لفترة محدودة
                    </Badge>
                  )}
                </div>

                <h1 className="text-2xl md:text-4xl font-extrabold leading-snug text-foreground">
                  {book.title}
                </h1>

                {book.author && (
                  <p className="text-base text-muted-foreground font-medium flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" /> المؤلف: <span className="text-foreground font-semibold">{book.author}</span>
                  </p>
                )}
              </div>

              {/* Price & Action Box */}
              <Card className="p-6 border-border bg-card/60 space-y-4 rounded-2xl shadow-sm">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-primary">
                    {formatPiastres(eff.amount)}
                  </span>
                  {eff.discountActive && (
                    <span className="text-base text-muted-foreground line-through">
                      {formatPiastres(eff.originalAmount ?? 0)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 text-xs">
                  {inStock ? (
                    <span className="flex items-center gap-1 text-emerald-600 font-bold">
                      <CheckCircle2 className="w-4 h-4" /> متوفر للطلب والاستلام
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-destructive font-bold">
                      <AlertCircle className="w-4 h-4" /> نفدت الكمية المؤقتة
                    </span>
                  )}
                </div>

                <div className="pt-2">
                  <AddToCartButton
                    bookId={book.id}
                    bookType={book.book_type}
                    stockQuantity={book.stock_quantity}
                    size="lg"
                    fullWidth
                    className="h-12 text-base font-bold shadow-md"
                  />
                </div>
              </Card>

              {/* Comprehensive Book Metadata Grid */}
              <Card className="p-6 border-border bg-card/40 rounded-2xl space-y-5">
                <h3 className="text-base font-bold flex items-center gap-2 text-foreground border-b border-border pb-3">
                  <FileText className="w-4 h-4 text-primary" /> البيانات والمعلومات الأساسية
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs md:text-sm">
                  {book.author && (
                    <div className="space-y-1">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-primary" /> المؤلف
                      </span>
                      <p className="font-bold text-foreground">{book.author}</p>
                    </div>
                  )}

                  {book.publisher && (
                    <div className="space-y-1">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-primary" /> الناشر
                      </span>
                      <p className="font-bold text-foreground">{book.publisher}</p>
                    </div>
                  )}

                  {book.publication_year && (
                    <div className="space-y-1">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-primary" /> سنة النشر
                      </span>
                      <p className="font-bold text-foreground">{book.publication_year}</p>
                    </div>
                  )}

                  {book.isbn && (
                    <div className="space-y-1">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Hash className="w-3.5 h-3.5 text-primary" /> ISBN
                      </span>
                      <p className="font-bold font-mono text-foreground">{book.isbn}</p>
                    </div>
                  )}

                  {book.language && (
                    <div className="space-y-1">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Globe2 className="w-3.5 h-3.5 text-primary" /> اللغة
                      </span>
                      <p className="font-bold text-foreground">{langMap[book.language] ?? book.language}</p>
                    </div>
                  )}

                  {book.stages?.name && (
                    <div className="space-y-1">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <GraduationCap className="w-3.5 h-3.5 text-primary" /> المرحلة
                      </span>
                      <p className="font-bold text-foreground">{book.stages.name}</p>
                    </div>
                  )}

                  {book.subjects?.name && (
                    <div className="space-y-1">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Layers className="w-3.5 h-3.5 text-primary" /> المادة
                      </span>
                      <p className="font-bold text-foreground">{book.subjects.name}</p>
                    </div>
                  )}

                  {book.book_type === "physical" && (book.weight_grams ?? 0) > 0 && (
                    <div className="space-y-1">
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Scale className="w-3.5 h-3.5 text-primary" /> الوزن
                      </span>
                      <p className="font-bold text-foreground">{book.weight_grams} جرام</p>
                    </div>
                  )}

                  {book.book_type === "physical" &&
                    (book.length_cm || book.width_cm || book.height_cm) && (
                      <div className="space-y-1">
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Ruler className="w-3.5 h-3.5 text-primary" /> الأبعاد (سم)
                        </span>
                        <p className="font-bold text-foreground font-mono">
                          {book.length_cm ?? 0} × {book.width_cm ?? 0} × {book.height_cm ?? 0}
                        </p>
                      </div>
                    )}
                </div>

                {/* Digital specific policies */}
                {book.book_type === "digital" && (
                  <div className="pt-3 border-t border-border flex flex-wrap gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5 font-medium">
                      <Download className="w-3.5 h-3.5 text-primary" />
                      {book.unlimited_downloads ? "تحميلات غير محدودة" : `حد التحميل: ${book.download_limit ?? 1} مرات`}
                    </div>
                    {book.is_drm_protected && (
                      <div className="flex items-center gap-1.5 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-primary" /> محمي بحقوق الملكية الفكرية الرقمية (DRM)
                      </div>
                    )}
                  </div>
                )}

                {/* Tags / Categories */}
                {book.tags && book.tags.length > 0 && (
                  <div className="pt-3 border-t border-border space-y-2">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5 text-primary" /> الوسوم والتصنيفات
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {book.tags.map((t, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-accent/60">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </Card>

              {/* Full Description */}
              {book.description && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" /> نبذة وشرح تفصيلي عن الكتاب
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-muted-foreground whitespace-pre-line bg-card border border-border p-5 rounded-2xl">
                    {book.description}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Gallery Images / Sample Pages */}
          {images.length > 0 && (
            <div className="mt-16 pt-10 border-t border-border space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-bold">صور وتفاصيل من داخل الكتاب</h2>
                </div>
                <span className="text-xs text-muted-foreground">اضغط على أي صورة لتكبيرها والمعاينة</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((img, idx) => (
                  <GalleryImage
                    key={img.id}
                    path={img.image_url}
                    onClick={() => {
                      const initialIndex = book.cover_image_url ? idx + 1 : idx;
                      setLightboxIndex(initialIndex);
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Related Books Section */}
          {related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-border space-y-6">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">كتب ومراجع أخرى قد تهمك</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((relBook) => {
                  const relEff = getEffectivePrice(relBook.price_piastres, relBook.discount_price_piastres, relBook.discount_expires_at);
                  return (
                    <Card key={relBook.id} className="p-4 border-border hover:shadow-lg transition-shadow flex flex-col justify-between rounded-xl">
                      <Link to={`/books/${relBook.id}`} className="space-y-3 group block">
                        <div className="font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {relBook.title}
                        </div>
                        {relBook.author && (
                          <div className="text-xs text-muted-foreground">{relBook.author}</div>
                        )}
                        <div className="text-sm font-extrabold text-primary">
                          {formatPiastres(relEff.amount)}
                        </div>
                      </Link>
                      <div className="mt-4 pt-3 border-t border-border">
                        <AddToCartButton bookId={relBook.id} bookType={relBook.book_type} stockQuantity={relBook.stock_quantity} size="sm" fullWidth />
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Lightbox Fullscreen Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && allImagePaths[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 md:p-8"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Header controls */}
            <div
              className="w-full flex items-center justify-between z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-white text-sm font-bold bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full">
                {lightboxIndex + 1} من {allImagePaths.length}
              </div>
              <button
                onClick={() => setLightboxIndex(null)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="إغلاق المعاينة"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Image viewport */}
            <div
              className="relative flex-1 w-full flex items-center justify-center my-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {allImagePaths.length > 1 && (
                <button
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev !== null && prev > 0 ? prev - 1 : allImagePaths.length - 1
                    )
                  }
                  className="absolute right-2 md:right-6 z-10 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors border border-white/10"
                  aria-label="الصورة السابقة"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}

              <LightboxItem path={allImagePaths[lightboxIndex]} />

              {allImagePaths.length > 1 && (
                <button
                  onClick={() =>
                    setLightboxIndex((prev) =>
                      prev !== null && prev < allImagePaths.length - 1 ? prev + 1 : 0
                    )
                  }
                  className="absolute left-2 md:left-6 z-10 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors border border-white/10"
                  aria-label="الصورة التالية"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Footer captions */}
            <div className="text-white/80 text-xs font-medium text-center">
              استخدم الأسهم أو التبديل للتنقل بين الصور | اضغط Esc للإغلاق
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
