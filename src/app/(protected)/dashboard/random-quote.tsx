"use client";

import { useQuery } from "@tanstack/react-query";

type Quote = {
  quoteText: string;
  quoteAuthor: string;
};

export const RandomQuote = () => {
  const getRandomQuote = async () => {
    try {
      const res = await fetch("/data/quotes.json");
      const quotes = (await res.json()) as Quote[];

      const now = new Date();
      const hoursSinceEpoch = Math.floor(now.getTime() / (1000 * 60 * 60 * 6));

      const index = hoursSinceEpoch % quotes.length;
      return quotes[index];
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const { data } = useQuery<Quote | null | undefined>({
    queryKey: ["quote"],
    queryFn: getRandomQuote,

    staleTime: 1000 * 60 * 60 * 6, // 6 hours means we don't need to refetch
    gcTime: 1000 * 60 * 60 * 6, // 6 hours means we don't need to gc
  });

  return (
    <div className="from-secondary/50 to-secondary/20 ring-secondary/20 space-y-2 rounded-xl bg-gradient-to-br p-4 ring backdrop-blur-3xl">
      <p className="text-secondary-foreground font-serif text-base">
        {data?.quoteText}
      </p>
      <p className="text-muted-foreground font-mono text-xs italic">
        - {data?.quoteAuthor}
      </p>
    </div>
  );
};
