export function useSeoDescription(postData:any, maxLength = 160){
  if(!postData) return ''

  const rowContent = postData.excerpt?.rendered || postData.content.rendered || ''

  const cleanText = rowContent
  .replace(/<[^>]+>/g,'')
  .replace(/\s+/g,' ')
  .trim()
  .slice(0,maxLength)

  return cleanText
}
