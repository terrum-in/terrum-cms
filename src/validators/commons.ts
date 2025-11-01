export const validateUrl = (value?: string | string[] | null) => {
  // Return true if value is empty or undefined
  if (!value || value === '') {
    return true
  }

  if (typeof value === 'string') {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // Protocol (optional)
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // Domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // Port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // Query string
        '(\\#[-a-z\\d_]*)?$', // Fragment locator
      'i',
    )

    if (urlPattern.test(value)) {
      return true
    }
    return 'Invalid URL format.'
  }
  return 'Invalid URL format.'
}