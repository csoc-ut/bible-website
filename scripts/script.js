function open_chapter(n, book_name) {
  sessionStorage.setItem('chapter_number', n);
  window.location = book_name;
}
