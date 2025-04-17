
interface FontType {
  id:number;
  name:string;
  slug:string;
}

export const useFontinuseFontType = async ():Promise<FontType[]> => {
  const fontTypes = useState<FontType[]>('fontinuseFontType', () => [])

  const config = useRuntimeConfig()
  const {locale} = useI18n()

  let langApiCumtom = config.public.wpApiCustom
  if(locale.value == 'en'){
    langApiCumtom = config.public.wpApiCustomEn
  }

  try {
    fontTypes.value = await $fetch(`${langApiCumtom}/fontinuseFontType?context=embed`)
    // console.log(fontTypes.value)
  } catch(error){
    console.error('fontinuseFontType', error)
  }

  return fontTypes.value
}
