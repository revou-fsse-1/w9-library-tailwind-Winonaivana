function getPageFromUrl() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  let page = urlParams.get("page");

  return page;
}

async function getBooksData() {
  let response = await fetch("./data.json");
  let json = await response.json();
  return json["books"];
}

function toggleMenuButton() {
  const menu = document.getElementById("m-menu");
  const buttonChildren = document.getElementById("m-menu-button").children;

  if (menu.classList.contains("hidden")) {
    menu.classList.replace("hidden", "block");
    buttonChildren[1].classList.replace("block", "hidden");
    buttonChildren[2].classList.replace("hidden", "block");
  } else {
    menu.classList.replace("block", "hidden");
    buttonChildren[1].classList.replace("hidden", "block");
    buttonChildren[2].classList.replace("block", "hidden");
  }
}

const searchForm = document.getElementById("search-form");
const searchResult = document.getElementById("search-result");

async function searchBooks(e) {
  e.preventDefault();

  const books = await getBooksData();
  const value = document.getElementById("search").value.toLowerCase();

  if (value.length < 2) {
    searchResult.innerHTML = "";
    searchResult.classList.add("hidden");
  } else {
    searchResult.innerHTML = "";
    searchResult.classList.remove("hidden");

    books.forEach((book) => {
      const title = book.title.toLowerCase();
      const authors = book.authors.join(", ").toLowerCase();
      const subjects = book.subjects.join(", ").toLowerCase();

      if (
        title.includes(value) ||
        authors.includes(value) ||
        subjects.includes(value)
      ) {
        searchResult.innerHTML += `
          <div class="flex md:flex-row flex-col  items-center bg-white border border-gray-200 p-4 shadow md:flex-row hover:bg-gray-100 ">
            <a href="#" class="flex flex-col items-center mx-4 md:flex-row">
              <img class="object-cover w-full rounded-lg h-96 md:h-auto md:w-24" src="${
                book.image
              }"  />
              <div class="flex flex-col justify-between p-4 leading-normal text-gray-400">
                <h4 class="mb-2 text-2xl font-bold tracking-tight ">${
                  book.title
                }</h4>
                <p class=""mb-3 font-normal">
                  <strong>Author(s): </strong>
                  ${book.authors.join(", ")}
                </p>
              </div>
            </a>
          </div>
        `;
      }
    });
  }
}

function func() {
  searchForm.addEventListener("submit", searchBooks);
}

const bookgrid = document.getElementById("book-grid");

async function loadBooks() {
  var e = window.location.search;
  let o = new URLSearchParams(e).get("page");
  o = o ? Number(o) : 1;
  const books = await getBooksData();

  books.slice(12 * (o - 1), 12 * o).forEach((book) => {
    bookgrid.innerHTML += `
    <div class="w-full bg-white border border-gray-200 rounded-lg shadow">
            <a href="#" class="flex flex-col items-center mx-4 ">
              <img class=" h-72 mx-auto  " src="${book.image}"  />
              <div class="p-5 text-center sm:text-left">
                <h4 class="mt-2 mb-2 text-md font-bold text-black ">${
                  book.title
                }</h4>
                <p class="mb-2 text-gray-500">
                  <strong>Author(s): </strong>
                  ${book.authors.join(", ")}
                </p>
              </div>
            </a>
          </div>
        `;
  });
}
function previous() {
  var e = window.location.search,
    e = new URLSearchParams(e).get("page");
  e && "2" == e ? window.location.replace("?page=1") : window.location.reload();
}
function next() {
  var e = window.location.search,
    e = new URLSearchParams(e).get("page");
  e && "1" == e ? window.location.replace("?page=2") : window.location.reload();
}

function first() {
  window.location.href = "?page=1";
}

function second() {
  window.location.href = "?page=2";
}

/**
 * To get books data, you should make sure that your function is async function
 * and call `getBooksData` function with await.
 *
 * e.g.
 * async function yourFunction() {
 *      let books = await getBooksData();
 * }
 */
