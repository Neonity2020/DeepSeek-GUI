export const WRITE_INFOGRAPHIC_MAX_TEXT_CHARS = 6_000

/**
 * Default prompt prefix for infographic generation. Users can override it via
 * write.selectionAssist.infographicPrompt; the selected text is appended after
 * the prefix either way.
 */
export const WRITE_INFOGRAPHIC_DEFAULT_PROMPT = [
  'Create a clean, modern infographic that visually summarizes the following content.',
  'Use a clear visual hierarchy: a short headline, grouped sections with icons or simple charts, and readable labels.',
  'Keep the text in the infographic in the same language as the source content. Flat design, light background.',
  'Source content:'
].join(' ')

export type WriteInfographicRequest = {
  /** Selected document text the infographic should summarize. */
  text: string
  /** Absolute path of the markdown document that will embed the image. */
  filePath: string
  /** Active write workspace root; the image is saved to its img/ folder. */
  workspaceRoot: string
}

export type WriteInfographicResult =
  | {
      ok: true
      /** Path relative to the document directory, ready for a markdown image link. */
      relativePath: string
      absolutePath: string
      fileName: string
    }
  | {
      ok: false
      message: string
    }
