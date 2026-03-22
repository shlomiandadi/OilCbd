export type FaqPair = { question: string; answer: string };

export function parseFaqJson(value: unknown): FaqPair[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((x) => {
      if (x && typeof x === 'object' && 'question' in x && 'answer' in x) {
        const o = x as { question: unknown; answer: unknown };
        if (typeof o.question === 'string' && typeof o.answer === 'string') {
          return { question: o.question.trim(), answer: o.answer.trim() };
        }
      }
      return null;
    })
    .filter((x): x is FaqPair => x !== null && x.question.length > 0 && x.answer.length > 0);
}

export function faqPageJsonLd(items: FaqPair[]) {
  if (items.length === 0) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
