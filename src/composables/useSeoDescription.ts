export function useSeoDescription(postData:any, maxLength = 100){
  if(!postData) return ''

  const rowContent = postData.excerpt?.rendered || postData.content.rendered || ''

  const cleanText = rowContent
  .replace(/<[^>]+>/g,'')
  .replace(/\s+/g,' ')
  .trim()
  // .slice(0,maxLength)

  if(cleanText.length > maxLength){
    return cleanText.slice(0,maxLength) + '...'
  }

  return cleanText
}
