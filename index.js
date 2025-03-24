function fetchBooks() {
  return fetch("https://anapioficeandfire.com/api/books")
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(data => {
          renderBooks(data);
      })
      .catch(error => console.error("Error fetching books:", error));
}

function renderBooks(books) {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";
  books.forEach(book => {
      const li = document.createElement("li");
      li.textContent = book.title;
      bookList.appendChild(li);
  });
}

document.addEventListener("DOMContentLoaded", fetchBooks);

global.fetch = jest.fn(() =>
  Promise.resolve({
      ok: true,
      json: () => Promise.resolve([{ title: "A Game of Thrones" }]),
  })
);

test("fetchBooks calls renderBooks with book data", async () => {
  document.body.innerHTML = '<ul id="book-list"></ul>'; 

  const mockRenderBooks = jest.fn();
  global.renderBooks = mockRenderBooks;

  await fetchBooks();

  expect(global.fetch).toHaveBeenCalledWith("https://anapioficeandfire.com/api/books");
});
