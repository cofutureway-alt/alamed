import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, MessageSquareQuote, Sparkles, Eye, X } from "lucide-react";
import { IslamicDivider, EightPointStar } from "@/components/IslamicPatterns";
import { fetchPublicTestimonials, TestimonialRow } from "@/lib/testimonials-api";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<TestimonialRow[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const data = await fetchPublicTestimonials();
        if (isMounted) setTestimonials(data);
      } catch (e) {
        if (isMounted) setTestimonials([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  // If loading or zero visible testimonials, hide the entire section gracefully
  if (loading || !testimonials || testimonials.length === 0) {
    return null;
  }

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden bg-secondary/20">
      {/* Background Ornaments */}
      <EightPointStar
        size={50}
        className="absolute top-12 right-10 text-primary/10 animate-spin-slow pointer-events-none hidden md:block"
      />
      <EightPointStar
        size={35}
        className="absolute bottom-12 left-10 text-primary/10 animate-spin-slow pointer-events-none hidden md:block"
        style={{ animationDirection: "reverse" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <IslamicDivider className="mb-4" />

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-bold text-primary shadow-sm">
            <MessageSquareQuote size={14} />
            <span>آراء وتجارب الطلاب</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight">
            آراء وانطباعات طلابنا
          </h2>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            اقرأ بعض من تجارب وانطباعات الطلاب والطالبات اللي بيتعلموا مع المعلم في المنصة
          </p>
        </div>

        {/* Mobile Carousel View (< md) */}
        <div className="md:hidden space-y-4">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[activeIndex].id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="rounded-2xl border border-border/80 overflow-hidden bg-card shadow-lg p-3">
                  <div
                    className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted cursor-pointer"
                    onClick={() => setSelectedImage(testimonials[activeIndex].image_url)}
                  >
                    <img
                      src={testimonials[activeIndex].image_url}
                      alt={testimonials[activeIndex].student_name || "رأي طالب"}
                      className="w-full h-full object-contain bg-black/40"
                    />
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-xs px-3 py-1 rounded-full flex items-center gap-1.5">
                      <Eye size={12} />
                      <span>دوس عشان تكبر الصورة</span>
                    </div>
                  </div>
                  {testimonials[activeIndex].student_name && (
                    <div className="p-3 text-center font-bold text-sm text-foreground">
                      {testimonials[activeIndex].student_name}
                    </div>
                  )}
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Navigation Controls */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-between pt-2">
              <Button variant="outline" size="icon" onClick={prevSlide} className="rounded-full">
                <ChevronRight className="w-5 h-5" />
              </Button>
              <div className="text-xs font-bold text-muted-foreground">
                {activeIndex + 1} / {testimonials.length}
              </div>
              <Button variant="outline" size="icon" onClick={nextSlide} className="rounded-full">
                <ChevronLeft className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>

        {/* Multi-column Grid View (>= md) */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <Card
                className="group relative rounded-2xl border border-border/80 overflow-hidden bg-card/60 backdrop-blur-xl hover:border-primary/50 hover:shadow-xl transition-all duration-300 cursor-pointer p-3 flex flex-col justify-between"
                onClick={() => setSelectedImage(t.image_url)}
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted/50">
                  <img
                    src={t.image_url}
                    alt={t.student_name || `رأي طالب ${idx + 1}`}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium text-xs gap-1.5 backdrop-blur-[2px]">
                    <Eye size={16} />
                    <span>تكبير الصورة</span>
                  </div>
                </div>

                {t.student_name && (
                  <div className="mt-3 text-center text-sm font-bold text-foreground truncate">
                    {t.student_name}
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl">
              <Button
                variant="secondary"
                size="icon"
                className="absolute top-3 left-3 z-10 rounded-full bg-black/50 text-white hover:bg-black/70"
                onClick={() => setSelectedImage(null)}
              >
                <X size={18} />
              </Button>
              <img
                src={selectedImage}
                alt="رأي الطالب"
                className="max-w-full max-h-[85vh] object-contain rounded-xl shadow-2xl"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
