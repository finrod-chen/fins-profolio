import type { ComponentPropsWithoutRef, ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import { CodeBlock } from "@/components/arc/code-block/code-block";
import styles from "./Markdown.module.css";

/** The `<code>` element react-markdown puts inside a fenced block. */
type CodeChild = ReactElement<{ className?: string; children?: unknown }>;

function isCodeChild(node: unknown): node is CodeChild {
  return (
    typeof node === "object" &&
    node !== null &&
    "props" in node &&
    typeof (node as { props?: unknown }).props === "object"
  );
}

/** Flattens the code element's children back into the original source text. */
function toText(children: unknown): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(toText).join("");
  return "";
}

/**
 * Markdown body for posts and project notes.
 *
 * Inline formatting comes from the shared `.prose` rules; fenced code goes
 * to Arc's `code-block` so copying, line limits and highlighting match the
 * rest of the site, and wide tables scroll inside their own box.
 */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeSlug]}
        components={{
          pre({ children: inner }) {
            const code = Array.isArray(inner) ? inner[0] : inner;
            if (!isCodeChild(code)) return <pre>{inner}</pre>;
            const language = /language-(\w+)/.exec(code.props.className ?? "")?.[1];
            return (
              <div className={styles.code}>
                <CodeBlock
                  code={toText(code.props.children).replace(/\n$/, "")}
                  language={language}
                  maxLines={24}
                />
              </div>
            );
          },
          table({ children: inner, ...rest }: ComponentPropsWithoutRef<"table">) {
            return (
              <div className="proseScroll">
                <table {...rest}>{inner}</table>
              </div>
            );
          },
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
