
export type ClassType = {
  type: string,
  cls: string,
  lng:string
}

export type FontListType = {
  id:number,
  title:string,
  slug:string,
  thumbnail:string
}

export type Post = {
  id:number;
  title:{rendered:string};
  slug:string;
  type:string;
  thumbnail:{url_s:string,url_m:string,url:string;url_f:string,imgW:number,imgH:number};
  tax_info:{
    id:number;
    name:string;
    slug:string;
    terms:{
      id:number; name:string; tax:string;
    }[]
  }[];
  categories_info:{
    id:number;name:string;
  }[];
  acf?:{
    link?:boolean;
    url?:string;
    company_name?:string;
  }
}

export type PostTopNews = {
  id:number;
  title:{
    rendered:string;
  },
  date:string;
  slug:string;
  categories_info:{
    id:number;
    name:string;
  }[],
  tax_info:{
    id:number;
    name:string;
    slug:string;
  }[]
}

export type PostListFont = {
  id:number;
  slug:string;
  title:{
    rendered:string;
  },
  acf:{
    hover_style:string
  },
  thumbnail: {
    url: string;
  }
}

export type FontPost = {
  id: string,
  slug:string,
  title:{
    rendered:string
  },
  thumbnail:{
    url:string,
    url_f:string
  },
  acf:{
    hover_style:string
  },
  tax_info: { 
    terms: { 
    id:number,
    name:string,
    slug: string,
    tax:string
   }[] 
  }[];
}
