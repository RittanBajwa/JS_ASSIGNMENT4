// Use relative path to JSON file
const jsonUrl = 'https://rittanbajwa.github.io/JS_ASSIGNMENT4/';

function fetchBooks() {
    return new Promise((resolve, reject) => {
        fetch(jsonUrl)
            .then(response => {
                console.log('Response status:', response.status);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(books => {
                console.log('Fetched books:', books);
                resolve(books);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                reject(error);
            });
    });
}

function displayBooks(books) {
    const bookDisplay = document.getElementById('bookDisplay');
    
    books.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        
        console.log('Book image URL:', book.imageUrl); // Log image URL
        
        const img = new Image();
        img.src = book.imageUrl;
        img.alt = book.title;
        img.classList.add('book-image');
        
        // Log image loading events
        img.onload = () => console.log('Image loaded successfully:', book.imageUrl);
        img.onerror = () => {
            console.error('Failed to load image:', book.imageUrl);
            img.src = 'https://via.placeholder.com/300x450.png?text=Book+Cover';
            img.alt = 'Default book cover';
        };
        
        bookCard.innerHTML = `
            <div class="book-image-container"></div>
            <div class="book-info">
                <h2>${book.title}</h2>
                <p>Author: ${book.author}</p>
                <p>Published: ${book.publishYear}</p>
            </div>
        `;
        
        const imageContainer = bookCard.querySelector('.book-image-container');
        imageContainer.appendChild(img);
        
        bookDisplay.appendChild(bookCard);
    });
}

// Main execution
document.addEventListener('DOMContentLoaded', () => {
    fetchBooks()
        .then(books => displayBooks(books))
        .catch(error => {
            console.error('Error in main execution:', error);
            const bookDisplay = document.getElementById('bookDisplay');
            bookDisplay.innerHTML = `<p>Error loading books: ${error.message}</p>`;
        });
});
