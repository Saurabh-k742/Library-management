document.addEventListener("DOMContentLoaded", loadBooks);
        
        function addBook() {
            let title = document.getElementById("bookTitle").value;
            let author = document.getElementById("bookAuthor").value;
            if (title === "" || author === "") {
                alert("Please enter both title and author.");
                return;
            }
            
            let bookList = document.getElementById("bookList");
            let row = bookList.insertRow();
            row.innerHTML = `<td>${title}</td><td>${author}</td><td><button onclick="removeBook(this)">Delete</button></td>`;
            
            saveBook(title, author);
            document.getElementById("bookTitle").value = "";
            document.getElementById("bookAuthor").value = "";
        }
        
        function removeBook(button) {
            let row = button.parentNode.parentNode;
            let title = row.cells[0].innerText;
            row.remove();
            deleteBook(title);
        }
        
        function searchBooks() {
            let filter = document.getElementById("searchBox").value.toLowerCase();
            let rows = document.querySelectorAll("#bookList tr");
            rows.forEach(row => {
                let title = row.cells[0].innerText.toLowerCase();
                row.style.display = title.includes(filter) ? "" : "none";
            });
        }
        
        function saveBook(title, author) {
            let books = JSON.parse(localStorage.getItem("books")) || [];
            books.push({ title, author });
            localStorage.setItem("books", JSON.stringify(books));
        }
        
        function loadBooks() {
            let books = JSON.parse(localStorage.getItem("books")) || [];
            let bookList = document.getElementById("bookList");
            books.forEach(book => {
                let row = bookList.insertRow();
                row.innerHTML = `<td>${book.title}</td><td>${book.author}</td><td><button onclick="removeBook(this)">Delete</button></td>`;
            });
        }
        
        function deleteBook(title) {
            let books = JSON.parse(localStorage.getItem("books")) || [];
            books = books.filter(book => book.title !== title);
            localStorage.setItem("books", JSON.stringify(books));
        }