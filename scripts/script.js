function open_chapter(n, book_name) {
  sessionStorage.setItem('chapter_number', n);
  window.location = book_name;
}

function navbar_scroll_offset() {
  window.scrollBy(0, -80);
}
window.onload = navbar_scroll_offset;
