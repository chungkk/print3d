import axios from 'axios';
import * as cheerio from "cheerio";

async function convertImageToBase64(url) {
  const response = await axios.get(url, { responseType: 'arraybuffer' });

  // Chuyển đổi dữ liệu ảnh thành base64
  const base64 = Buffer.from(response.data, 'binary').toString('base64');

  // Tạo chuỗi base64 hoàn chỉnh cho ảnh
  const mimeType = response.headers['content-type'];
  return `data:${mimeType};base64,${base64}`;
}


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
    const b64 = await convertImageToBase64(firstUrl);
    return Response.json({ url: b64 });
  } else if (targetUrl.includes('goodreads.com')) {
    const imageUrl = $('div.BookCover__image img').attr('src');
    const b64 = await convertImageToBase64(imageUrl);
    return Response.json({ url: b64 });
  }


};
export { GET };