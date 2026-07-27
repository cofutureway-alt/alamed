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

export const useSignedUrl = (
  bucket: string,
  path: string | null | undefined,
  ttlSeconds = 3600,
) => {
  const [url, setUrl] = useState<string | null>(() => {
    if (!path) return null;
    if (isDirectUrl(path)) return path;
    const key = `${bucket}::${path}`;
    const cached = cache.get(key);
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

    const key = `${bucket}::${path}`;
    const cached = cache.get(key);
    if (cached && cached.expires > Date.now()) {
      setUrl(cached.url);
      return;
    }

    supabase.storage
      .from(bucket)
      .createSignedUrl(path, ttlSeconds)
      .then(({ data }) => {
        if (cancelled) return;
        if (data?.signedUrl) {
          cache.set(key, {
            url: data.signedUrl,
            expires: Date.now() + Math.min(ttlSeconds - 60, 55 * 60) * 1000,
          });
          setUrl(data.signedUrl);
        } else {
          const pub = supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
          if (pub) setUrl(pub);
        }
      })
      .catch(() => {
        if (cancelled) return;
        const pub = supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
        if (pub) setUrl(pub);
      });

    return () => {
      cancelled = true;
    };
  }, [bucket, path, ttlSeconds]);

  return url;
};

