function open_reading(reading) {
    sessionStorage.setItem('reading', reading.innerHTML);
    window.location.href='../reading_plan/todays_reading.html';
}

function open_chapter(n, book_name) {
    sessionStorage.setItem('chapter_number', n);
    window.location = book_name;
}

function navbar_scroll_offset() {
    window.scrollBy(0, -80);
}
window.onload = navbar_scroll_offset;

function go_back_page() {
    window.history.back();
}

document.addEventListener('swiped-left', function(e) {
    window.history.back();
});


function get_full_book_name(short_book_title) {
    switch (short_book_title) {
      case "Rom":
        return "Romans";
        break;

      default:
      return short_book_title;
    }
}
