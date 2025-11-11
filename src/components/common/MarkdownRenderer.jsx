import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export const MarkdownRenderer = ({ children }) => {
  return (
    <ReactMarkdown
      className="prose prose-sm prose-sky max-w-none"
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ node, ...props }) => (
          <a {...props} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800" />
        ),
        p: ({node, ...props}) => <p {...props} className="mb-4" />,
        ul: ({node, ...props}) => <ul {...props} className="list-disc list-outside" />,
        ol: ({node, ...props}) => <ol {...props} className="list-decimal list-outside" />,
        code: ({node, inline, className, children, ...props}) => {
          const match = /language-(\w+)/.exec(className || '')
          return !inline ? (
            <pre className="p-4 rounded-lg bg-gray-800 text-white overflow-x-auto">
              <code className={className} {...props}>
                {children}
              </code>
            </pre>
          ) : (
            <code className="px-1.5 py-0.5 bg-gray-200 rounded text-sm" {...props}>
              {children}
            </code>
          )
        }
      }}
    >
      {children}
    </ReactMarkdown>
  );
};