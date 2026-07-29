import { motion } from "framer-motion";
import {
  BookOpen,
  ClipboardCheck,
  Users,
  Video,
  Award,
  Clock,
  Sparkles,
  CheckCircle2,
  Play,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { IslamicDivider, EightPointStar } from "@/components/IslamicPatterns";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 35, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 md:py-36 relative overflow-hidden bg-background">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-12 left-10 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-20 right-10 w-[350px] h-[350px] bg-amber-500/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Islamic pattern backdrop overlay */}
      <div
        className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80' fill='none'%3E%3Cg stroke='%23000' stroke-width='0.5'%3E%3Cpolygon points='40,10 55,17 60,33 55,48 40,55 25,48 20,33 25,17'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* Floating Rotating Ornaments */}
      <EightPointStar
        size={56}
        className="absolute top-16 right-[5%] text-primary/20 animate-spin-slow pointer-events-none hidden md:block"
      />
      <EightPointStar
        size={40}
        className="absolute bottom-20 left-[6%] text-primary/20 animate-spin-slow pointer-events-none hidden md:block"
        style={{ animationDirection: "reverse" }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-4">
          <IslamicDivider className="mb-4" />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-xs font-bold text-primary shadow-sm"
          >
            <Sparkles size={14} className="animate-pulse text-amber-500" />
            <span>بيئة تعليمية متكاملة وسلسة</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight leading-tight"
          >
            لماذا تختار <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-amber-500 to-primary">منصة الساعي؟</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            نُدمج أصالة العلوم الشرعية مع أحدث التقنيات التعليمية التفاعلية لنقدم لك تجربة فريدة وشاملة
          </motion.p>
        </div>

        {/* Bento Grid Container */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* ---------------- CARD 1: Hero Large Bento (Span 2 cols on MD/LG) ---------------- */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="md:col-span-2 group relative rounded-3xl bg-gradient-to-br from-card/80 via-card/50 to-primary/5 backdrop-blur-xl border border-border/80 hover:border-primary/60 transition-all duration-500 p-7 md:p-9 shadow-lg hover:shadow-2xl hover:shadow-primary/15 overflow-hidden flex flex-col justify-between"
          >
            {/* Top Glow Highlight */}
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -top-24 -left-24 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl group-hover:bg-amber-500/20 transition-all pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-3 max-w-lg">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-primary/20 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-inner group-hover:scale-110 transition-transform">
                    <Video size={28} />
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-bold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    بث مباشر وتفاعلي
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-extrabold text-foreground group-hover:text-primary transition-colors">
                  دروس مباشرة وتفاعل فوري
                </h3>
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                  حضور المحاضرات والدروس مباشرة مع كبار المعلمين والعلماء، مع إمكانية طرح الأسئلة والتواصل المباشر والسبورة الذكية التفاعلية.
                </p>
              </div>

              {/* Visual Micro-Widget: Live Video Room Preview */}
              <div className="w-full md:w-64 shrink-0 rounded-2xl bg-background/80 border border-border/80 p-4 shadow-md space-y-3 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <Play size={16} fill="currentColor" />
                    </div>
                    <div className="text-xs font-bold">قاعة البث المباشر</div>
                  </div>
                  <span className="text-[10px] text-emerald-500 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full">نشط الان</span>
                </div>

                <div className="h-20 rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 relative overflow-hidden flex items-center justify-center border border-white/10">
                  <div className="absolute inset-0 bg-primary/10 animate-pulse" />
                  <div className="flex items-center gap-2 z-10 text-white text-xs font-medium bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
                    <Zap size={14} className="text-amber-400 animate-bounce" />
                    <span>420 طالب يستمعون</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ---------------- CARD 2: Interactive Quizzes (1 col) ---------------- */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group relative rounded-3xl bg-card/60 backdrop-blur-xl border border-border/80 hover:border-emerald-500/50 transition-all duration-500 p-7 shadow-lg hover:shadow-2xl hover:shadow-emerald-500/10 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                  <ClipboardCheck size={28} />
                </div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                  تقييم فورى
                </span>
              </div>

              <h3 className="text-xl font-bold text-foreground group-hover:text-emerald-500 transition-colors">
                اختبارات تفاعلية
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                اختبارات وتدريبات دورية لقياس مدى الاستيعاب وتثبيت العلوم مع نتائج وإرشادات فورية.
              </p>
            </div>

            {/* Widget Preview: Progress Bar */}
            <div className="mt-6 pt-4 border-t border-border/40 space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-muted-foreground">نسبة إتقان الاختبارات</span>
                <span className="text-emerald-500">96%</span>
              </div>
              <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 rounded-full w-[96%] transition-all duration-1000" />
              </div>
            </div>
          </motion.div>

          {/* ---------------- CARD 3: Individual Student Tracking (1 col) ---------------- */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group relative rounded-3xl bg-card/60 backdrop-blur-xl border border-border/80 hover:border-blue-500/50 transition-all duration-500 p-7 shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                  <Users size={28} />
                </div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                  إشراف شخصي
                </span>
              </div>

              <h3 className="text-xl font-bold text-foreground group-hover:text-blue-500 transition-colors">
                متابعة فردية مستمرة
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                متابعة دقيقة لكل طالب لضمان الاستمرارية وتوجيه النصائح والإرشادات العلمية المناسبة.
              </p>
            </div>

            {/* Widget Preview: Growth Stat Badge */}
            <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between text-xs font-bold">
              <span className="text-muted-foreground">معدّل تحسّن الأداء</span>
              <span className="flex items-center gap-1 text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-lg">
                <TrendingUp size={14} /> +98% نمو
              </span>
            </div>
          </motion.div>

          {/* ---------------- CARD 4: Diverse Curricula (1 col) ---------------- */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="group relative rounded-3xl bg-card/60 backdrop-blur-xl border border-border/80 hover:border-purple-500/50 transition-all duration-500 p-7 shadow-lg hover:shadow-2xl hover:shadow-purple-500/10 overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
                  <BookOpen size={28} />
                </div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20">
                  مناهج موثوقة
                </span>
              </div>

              <h3 className="text-xl font-bold text-foreground group-hover:text-purple-500 transition-colors">
                مناهج شرعية متنوعة
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                مناهج مؤصلة تغطي العلوم الشرعية المختلفة كالفقه، الحديث، العقيدة، التفسير، واللغة.
              </p>
            </div>

            {/* Widget Preview: Subject Pills */}
            <div className="mt-6 pt-4 border-t border-border/40 flex flex-wrap gap-1.5">
              {["فقه", "حديث", "عقيدة", "تفسير"].map((sub) => (
                <span key={sub} className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-secondary text-foreground border border-border/60">
                  {sub}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ---------------- CARD 5: Certificates & Flexible Hours (Span 2 cols on LG) ---------------- */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="lg:col-span-2 group relative rounded-3xl bg-gradient-to-br from-card/80 via-card/50 to-amber-500/5 backdrop-blur-xl border border-border/80 hover:border-amber-500/60 transition-all duration-500 p-7 md:p-8 shadow-lg hover:shadow-2xl hover:shadow-amber-500/15 overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="space-y-3 max-w-lg">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                  <Award size={28} />
                </div>
                <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  شهادات معتمدة
                </span>
              </div>

              <h3 className="text-2xl font-bold text-foreground group-hover:text-amber-500 transition-colors">
                شهادات إتمام موثقة ومرونة كاملة
              </h3>

              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                احصل على شهادة موثقة عند إتمام كل مستوى دراسي، مع إمكانية مراجعة المحاضرات والدروس المسجلة في أي وقت يناسب جدولك 24/7.
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-background/80 border border-border/80 shadow-sm">
                <ShieldCheck size={20} className="text-amber-500 shrink-0" />
                <span className="text-xs font-bold">شهادات إجتاز معتمدة إدارياً</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-background/80 border border-border/80 shadow-sm">
                <Clock size={20} className="text-teal-500 shrink-0" />
                <span className="text-xs font-bold">وصول دائم للتسجيلات 24/7</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;


