declare global {
  type Quote = {
    quote?: string;
    author?: string;
    category?: string;
  };
  type QuoteList = Quote[];
}
export {};
