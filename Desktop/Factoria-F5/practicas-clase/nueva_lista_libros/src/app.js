const URL_API = "http://localhost:3000/data";

// PASOS: 1. Crear GET function que espera la respuesta de json (await fetch) y devuelva los libros de db.json 2. Crear una función para que se impriman los libros en la pantalla (eliminar el contenido del tbody del html, con .map y una función flecha crear tr's dentro del tbody para añadir la base de datos con tr.innerHTML=`html a modificar (td)`).
async function getAllBooks(){
    const response = await fetch (URL_API,{
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    });
    const books = await response.json();
    return books
};

const tableBody = document.getElementById ('tableBody');

async function deleteBook(id) {
    
    const response = await fetch(`${URL_API}/${id}`, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json"
    },
    })
    const book = await response.json();

    if (response.ok) {
    console.log("tarea agregada" + book)
    await printAllBooks()
    }
    else {
        console.log("Error al crear el libro.")
    }
       
};
async function printAllBooks() {
    allBooks = await getAllBooks()
    let tableBody = document.getElementById("tableBody")
    tableBody.innerHTML = ''
    allBooks.map((book) => {
        let item = document.createElement('tr')
        item.innerHTML = `
            <td class="px-4 py-2 text-gray-800" id="title">${book.title}</td>
            <td class="px-4 py-2 text-gray-800" id="author">${book.author}</td>
            <td class="px-4 py-2 text-gray-800" id="year">${book.year}</td>
            <td class="px-4 py-2 text-gray-800" id="rating">${book.rating}</td>
            <button onclick="deleteBook('${book.id}')" class="bg-blue-500 text-white font-bold p-2 m-4 rounded hover:bg-blue-600">Eliminar<button/>`;
        tableBody.appendChild(item)
        
    });
}

printAllBooks();



async function postBooks() {
    const title = document.getElementById('inputName').value;
    const author = document.getElementById('inputAuthor').value;
    const year = document.getElementById('inputYear').value;
    const rating = document.getElementById('inputRating').value;

    if (!title || !author || !year || !rating) {
        return alert("Todos los campos son necesarios.");
    }

    const dataNewBook = {
        title: title,
        author: author,
        year: year,
        rating: rating
    };

    const response = await fetch(URL_API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataNewBook)
    });

    if (response.ok) {
        await printAllBooks();  // Volver a cargar la tabla después de añadir el libro
    }
}

// Asignar el event

async function takeInfo(book){
document.getElementById('inputName').value = book.name;
document.getElementById('inputAuthor').value = book.author;
document.getElementById('inputYear').value = book.year;
document.getElementById('inputRating').value = book.rating;
}
