import { removeVNTones } from '@/utils';
const books = [
  { id: 1, title: 'Đinh trang mộng', author: 'Diêm Liên Khoa', category: 'novel', price: 0, rating: 5, cover: 'https://bizweb.dktcdn.net/thumb/large/100/299/049/products/92d3909b-9476-4602-bf7c-c1f375a50a7a.png?v=1654680256023' },
  { id: 2, title: 'Ngày, tháng, năm', author: 'Diêm Liên Khoa', category: 'novel', price: 0, rating: 4.8, cover: 'https://bizweb.dktcdn.net/thumb/large/100/299/049/products/1326b212-e9c7-49ff-951a-0efd24ffe762.jpg?v=1654680192940' },
  { id: 3, title: 'Tứ Thư', author: 'Diêm Liên Khoa', category: 'novel', price: 0, rating: 4.8, cover: 'https://bizweb.dktcdn.net/thumb/large/100/299/049/products/tu-thu-35482648-eea3-4323-8557-883330400b94.png?v=1709260092523' },
  { id: 4, title: 'Phong nhã tụng', author: 'Diêm Liên Khoa', category: 'novel', price: 0, rating: 4.8, cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1420526370i/24316728.jpg' },
  { id: 5, title: 'Kiên ngạnh như thủy', author: 'Diêm Liên Khoa', category: 'novel', price: 0, rating: 4.8, cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1424091254i/24948308.jpg' },
  { id: 6, title: 'Nàng kim liên ở trấn tây môn', author: 'Diêm Liên Khoa', category: 'novel', price: 0, rating: 4.8, cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1528806874i/40516534.jpg' },
  { id: 7, title: 'Người Tình Phu Nhân Sư Trưởng', author: 'Diêm Liên Khoa', category: 'novel', price: 0, rating: 4.8, cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1543760895i/43079781.jpg' },
  { id: 8, title: 'Sơn ca vẫn hót', author: 'Kristin Hannah', category: 'novel', price: 0, rating: 4.5, cover: 'https://nxbphunu.com.vn/wp-content/uploads/2018/09/son-ca-van-hot.jpg' },
  { id: 9, title: 'Bốn Ngọn Gió', author: 'Kristin Hannah', category: 'novel', price: 0, rating: 4.5, cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1674010360i/79330072.jpg' },
  { id: 10, title: 'Nữ Phi Công', author: 'Kristin Hannah', category: 'novel', price: 0, rating: 4.5, cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1483119232i/33642217.jpg' },
  { id: 11, title: 'Chùm nho thịnh nộ', author: 'John steinbeck', category: 'novel', price: 0, rating: 4.8, cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1607689299i/56249053.jpg' },
  { id: 12, title: 'Phía Đông vườn địa đàng', author: 'John steinbeck', category: 'novel', price: 0, rating: 4.8, cover: 'https://salt.tikicdn.com/cache/750x750/ts/product/c5/a4/7e/d50a5524013aad705f32c3c1ee652183.jpg.webp' },
  { id: 13, title: 'Phố cannery row', author: 'John steinbeck', category: 'novel', price: 0, rating: 4.8, cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1533653795i/41064902.jpg' },
  { id: 14, title: 'Hạt Ngọc Trai', author: 'John steinbeck', category: 'novel', price: 0, rating: 4.8, cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1674830204i/87849153.jpg' },
  { id: 15, title: 'Của chuột và người', author: 'John steinbeck', category: 'novel', price: 0, rating: 4.8, cover: 'https://salt.tikicdn.com/cache/750x750/ts/product/93/b6/fb/42938a24c0609655ad0c4cff5307af01.jpg.webp' },
  { id: 16, title: 'Trường Ca Achilles', author: 'Madeline Miller', category: 'novel', price: 0, rating: 4.8, cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1591173933i/53792546.jpg' },
  { id: 17, title: 'Nhựa Cây', author: 'Ane Riel', category: 'novel', price: 0, rating: 4.8, cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1619061862i/57816131.jpg' },
  { id: 18, title: 'Cánh Tư', author: 'Rebecca Yarros', category: 'novel', price: 0, rating: 4.8, cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1709813551i/209593812.jpg' },
  { id: 19, title: 'Thợ Xăm Ở Auschwitz', author: 'Heather Morris', category: 'novel', price: 0, rating: 4.8, cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1603726283i/55808268.jpg' },
  { id: 20, title: 'Lò sát sinh số 5', author: 'Kurt Vonnegut Jr.', category: 'novel', price: 0, rating: 4.8, cover: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566616728l/52341770.jpg' },
];


export async function fetchBooks({ query, category }) {
  if (query) return books.filter(book =>
    removeVNTones(book.title.toLowerCase()).includes(removeVNTones(query.toLowerCase()))
    || removeVNTones(book.author.toLowerCase()).includes(removeVNTones(query.toLowerCase()))
  );
  if (category) return books.filter(book => book.category === category);
  return books;
}