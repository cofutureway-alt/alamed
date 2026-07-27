import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const cache = new Map<string, { url: string; expires: number }>();

function isDirectUrl(path: string | null | undefined): boolean {
  if (!path) return false;
  return (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:") ||
    path.startsWith("/")
  );
}

export const useSignedThumbnail = (path: string | null | undefined) => {
  const [url, setUrl] = useState<string | null>(() => {
    if (!path) return null;
    if (isDirectUrl(path)) return path;
    const cached = cache.get(path);
    return cached && cached.expires > Date.now() ? cached.url : null;
  });

  useEffect(() => {
    let cancelled = false;
    if (!path) {
      setUrl(null);
      return;
    }

    if (isDirectUrl(path)) {
      setUrl(path);
      return;
    }

    const cached = cache.get(path);
    if (cached && cached.expires > Date.now()) {
      setUrl(cached.url);
      return;
    }

    supabase.storage
      .from("thumbnails")
      .createSignedUrl(path, 3600)
      .then(({ data, error }) => {
        if (cancelled) return;
        if (data?.signedUrl) {
          cache.set(path, {
            url: data.signedUrl,
            expires: Date.now() + 55 * 60 * 1000,
          });
          setUrl(data.signedUrl);
        } else {
          // Fallback to getPublicUrl if createSignedUrl fails or bucket is public
          const pub = supabase.storage.from("thumbnails").getPublicUrl(path).data.publicUrl;
          if (pub) {
            setUrl(pub);
          }
        }
      })
      .catch(() => {
        if (cancelled) return;
        const pub = supabase.storage.from("thumbnails").getPublicUrl(path).data.publicUrl;
        if (pub) {
          setUrl(pub);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [path]);

  return url;
};

