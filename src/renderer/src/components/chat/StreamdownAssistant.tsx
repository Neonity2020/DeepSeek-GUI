import type { ComponentPropsWithRef, MouseEvent, ReactElement } from 'react'
import { Streamdown, type AnimateOptions, type StreamdownProps } from 'streamdown'
import remarkGfm from 'remark-gfm'
import { harden } from 'rehype-harden'
import 'streamdown/styles.css'
import { parseFileReferenceHref, rehypeFileReferences } from '../../lib/file-references'
import { useValidatedFileReference } from '../../lib/file-reference-validation'
import { openWorkspacePathInEditor } from '../../lib/open-workspace-path'
import { previewWorkspaceFile } from '../../lib/workspace-file-preview'
import { useChatStore } from '../../store/chat-store'
import { StreamdownCode } from './StreamdownCode'

/**
 * No `stagger`: staggering queues each char N ms apart, so a bursty SSE
 * chunk (tens of chars) builds a queue longer than the chunk interval and
 * the next chunk interrupts it — streaming looks choppy. Instead every
 * char in a chunk starts the same 500ms blur-in at once; consecutive
 * chunks overlap into one continuous reveal regardless of chunk size.
 */
export const STREAMING_ANIMATED: AnimateOptions = {
  sep: 'char',
  duration: 500,
  easing: 'ease',
  animation: 'blurIn'
}

const rehypePlugins = [
  rehypeFileReferences,
  [
    harden,
    {
      allowedLinkPrefixes: ['*']
    }
  ]
] satisfies StreamdownProps['rehypePlugins']

const components = {
  code: StreamdownCode,
  a: StreamdownLink
} satisfies StreamdownProps['components']

type StreamdownLinkProps = ComponentPropsWithRef<'a'> & { node?: unknown }

function StreamdownLink({
  href,
  children,
  className,
  title
}: StreamdownLinkProps): ReactElement {
  const workspaceRoot = useChatStore((s) => s.workspaceRoot)
  const fileTarget = parseFileReferenceHref(href)
  const validation = useValidatedFileReference(fileTarget, workspaceRoot)
  const isExternal = href ? /^(https?:|mailto:)/i.test(href) : false
  const cleanClassName = className?.replace(/\bds-file-reference-link\b/g, '').trim()

  if (fileTarget && validation.status !== 'valid') {
    return (
      <span className={cleanClassName} title={title}>
        {children}
      </span>
    )
  }

  const resolvedFileTarget =
    fileTarget && validation.status === 'valid'
      ? { ...fileTarget, path: validation.path }
      : null

  const handleClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    if (resolvedFileTarget) {
      event.preventDefault()
      previewWorkspaceFile({ ...resolvedFileTarget, workspaceRoot })
      return
    }

    if (isExternal && href && typeof window.kunGui?.openExternal === 'function') {
      event.preventDefault()
      void window.kunGui.openExternal(href).catch(() => undefined)
    }
  }

  const handleDoubleClick = (event: MouseEvent<HTMLAnchorElement>): void => {
    if (!resolvedFileTarget) return
    event.preventDefault()
    void openWorkspacePathInEditor(resolvedFileTarget, workspaceRoot).then((result) => {
      if (!result.ok) {
        void window.kunGui?.logError?.('editor-open', 'Failed to open file reference', {
          message: result.message,
          target: resolvedFileTarget
        })?.catch(() => undefined)
      }
    })
  }

  return (
    <a
      href={href}
      title={title}
      className={[
        resolvedFileTarget ? 'ds-file-reference-link' : '',
        cleanClassName
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {children}
    </a>
  )
}

type Props = {
  /** Markdown source */
  text: string
  /**
   * When true (live SSE chunking), uses Streamdown `streaming` mode with a
   * char-level blur-in on newly appended content.
   */
  streaming: boolean
  className?: string
}

export function StreamdownAssistant({ text, streaming, className }: Props): ReactElement {
  const animated = streaming ? STREAMING_ANIMATED : false
  const isAnimating = animated !== false

  return (
    <Streamdown
      className={className}
      mode={streaming ? 'streaming' : 'static'}
      parseIncompleteMarkdown={streaming}
      isAnimating={isAnimating}
      animated={animated}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={rehypePlugins}
      components={components}
    >
      {text}
    </Streamdown>
  )
}
