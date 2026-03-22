import ReactMarkdown from 'react-markdown';

type Props = { content: string; className?: string };

export default function MarkdownBody({ content, className = '' }: Props) {
  return (
    <div
      className={`prose prose-invert prose-neutral max-w-none prose-headings:text-neutral-100 prose-p:text-neutral-300 prose-a:text-amber-500 prose-strong:text-amber-200/90 prose-li:text-neutral-300 ${className}`}
    >
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
