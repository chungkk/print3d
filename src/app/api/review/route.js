import axios from 'axios';
import * as cheerio from "cheerio";
const GET = async (request, context) => {

  const url = new URL(request.url);
  const searchParam = new URLSearchParams(url.searchParams);
  const targetUrl = searchParam.get('url');
  const html = await axios.get(targetUrl);
  let $ = cheerio.load(html.data);
  if (targetUrl.includes('tiki.vn')) {
    const imageUrl = $('.image-frame picture img').attr('srcset');
    const sources = imageUrl.split(',');
    // Lấy phần tử đầu tiên và loại bỏ kích thước
    const firstUrl = sources[0].trim().split(' ')[0];
    return Response.json({ url: firstUrl });
  } else if (targetUrl.includes('goodreads.com')) {
    const imageUrl = $('div.BookCover__image img').attr('src');
    return Response.json({ url: imageUrl });
  }


};
export { GET };