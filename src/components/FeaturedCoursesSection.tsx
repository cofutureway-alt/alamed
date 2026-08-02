import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { EightPointStar, IslamicDivider } from "@/components/IslamicPatterns";
import { usePublicCourses } from "@/hooks/use-public-courses";
import { useMyProgressMap } from "@/hooks/use-my-progress";
import { CourseCard } from "@/components/CourseCard";

const FeaturedCoursesSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const courses = usePublicCourses(6, { featuredOnly: true });
  const progressMap = useMyProgressMap();

  if (courses === null) return null;
  if (courses.length === 0) return null;

  return (
    <section id="featured-courses" className="py-10 md:py-14 relative overflow-hidden bg-accent/10">
      <div className="container mx-auto px-4 relative z-10" ref={ref}>

        {/* Header row */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-primary animate-bounce-soft" />
          <span className="text-sm font-bold text-primary uppercase tracking-wider">الدورات المتاحة</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3">
          الدورات التعليمية المميزة
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-lg mx-auto">
          اختر من بين أحدث الدورات والكورسات التعليمية المتاحة لشرح المنهج والدخول في التطبيق العملي
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((c, i) => (
            <CourseCard key={c.id} course={c} index={i} progress={progressMap[c.id]} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" variant="outline" className="gap-2 font-bold hover:scale-105 transition-transform">
            <Link to="/courses">
              عرض جميع الدورات
              <ArrowLeft size={18} />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCoursesSection;
