import ReactMarkdown from 'react-markdown';

type Props = { content: string; className?: string };

const baseProse =
  'prose prose-stone max-w-none prose-headings:text-brand-ink prose-p:text-brand-ink-muted prose-a:text-brand-leaf prose-a:no-underline hover:prose-a:underline prose-strong:text-brand-ink prose-li:text-brand-ink-muted';

export default function MarkdownBody({ content, className = '' }: Props) {
  return (
    <div className={`${baseProse} ${className}`}>
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
