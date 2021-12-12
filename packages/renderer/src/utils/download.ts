export const download = (
  url: string,
  filename: string
): Promise<void> => new Promise((resolve) => {
  const a = document.createElement('a')
  a.download = filename
  a.href = url
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  resolve()
})