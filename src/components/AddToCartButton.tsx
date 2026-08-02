import { Button } from "@/components/ui/button";
import { ShoppingCart, Check, Loader2, ArrowLeft, AlertCircle } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/hooks/use-cart";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
  bookId: string;
  bookType: "digital" | "physical";
  stockQuantity?: number | null;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "secondary";
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
}

export default function AddToCartButton({
  bookId,
  bookType,
  stockQuantity,
  size = "default",
  variant = "default",
  className,
  fullWidth,
  disabled = false,
}: Props) {
  const { addToCart, items } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const inCart = items.some((i) => i.book_id === bookId);
  const isPhysicalOutOfStock =
    bookType === "physical" && stockQuantity !== undefined && stockQuantity !== null && stockQuantity <= 0;

  const handle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPhysicalOutOfStock) return;

    // If item is already in cart, navigate to /cart directly
    if (inCart) {
      navigate("/cart");
      return;
    }

    setLoading(true);
    const ok = await addToCart(bookId, bookType);
    setLoading(false);
    if (ok) {
      setDone(true);
      setTimeout(() => setDone(false), 1200);
    }
  };

  const currentVariant = isPhysicalOutOfStock
    ? "outline"
    : inCart
    ? "secondary"
    : variant;

  return (
    <Button
      size={size}
      variant={currentVariant}
      disabled={loading || isPhysicalOutOfStock || disabled}
      onClick={handle}
      className={`${fullWidth ? "w-full" : ""} ${className ?? ""}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {loading ? (
          <motion.span key="l" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> جاري الإضافة…
          </motion.span>
        ) : isPhysicalOutOfStock ? (
          <motion.span key="out" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2 text-destructive font-bold">
            <AlertCircle className="w-4 h-4" /> نفدت الكمية
          </motion.span>
        ) : done ? (
          <motion.span key="d" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
            <Check className="w-4 h-4" /> تمت الإضافة
          </motion.span>
        ) : inCart ? (
          <motion.span key="in" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 text-primary" /> عرض السلة
            <ArrowLeft className="w-3.5 h-3.5" />
          </motion.span>
        ) : (
          <motion.span key="c" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" /> إضافة للسلة
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
