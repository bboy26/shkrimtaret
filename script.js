// Simulated data for poems and quotes
const posts = [
  { title: "Vjeshta", author: "Ndre Mjeda", category: "Poem", content: "Dhe ju po shkoni, Bylbyla kshtu! Po treni kendynaj, Dallndysha ju! Deken mendova, Se mvjen kurdo; Se mleni vetun S'mendova jo Por ma fort zemren Ma bren nji idhnim: Cerdhen qi i leni Kujdesit tim. Ndoshta, kur t'ktheni Mue vorri mba, E ju kerkoni Cerdhen qi s'a" },
  { title: "Do Not Go Gentle into That Good Night", author: "Dylan Thomas", category: "Poem", content: "Do not go gentle into that good night, Old age should burn and rave at close of day..." },
  { title: "The only way to deal with this life meaningfully", author: "Fyodor Dostoevsky", category: "Quote", content: "is to find one's true purpose." },
  { title: "Happiness depends upon ourselves", author: "Aristotle", category: "Quote", content: "Happiness depends upon ourselves." },
  { title: "I have loved the stars too fondly", author: "Sarah Williams", category: "Poem", content: "I have loved the stars too fondly to be fearful of the night." },
  { title: "The unexamined life is not worth living", author: "Socrates", category: "Quote", content: "The unexamined life is not worth living." },
  // Add more posts as needed...
];

let filteredPosts = [...posts]; // Filtered posts based on user input
let currentPage = 1;
const postsPerPage = 8;

// Load authors and categories dynamically for the filter options
function loadFilters() {
  const authors = [...new Set(posts.map(post => post.author))];
  const categories = [...new Set(posts.map(post => post.category))];

  const authorSelect = document.getElementById('authorFilter');
  authors.forEach(author => {
    const option = document.createElement('option');
    option.value = author;
    option.innerText = author;
    authorSelect.appendChild(option);
  });

  const categorySelect = document.getElementById('categoryFilter');
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.innerText = category;
    categorySelect.appendChild(option);
  });
}

// Apply filters based on selected author, category, and search title
function applyFilters() {
  const author = document.getElementById('authorFilter').value;
  const category = document.getElementById('categoryFilter').value;
  const title = document.getElementById('searchTitle').value.toLowerCase();

  filteredPosts = posts.filter(post => {
    return (
      (author ? post.author === author : true) &&
      (category ? post.category === category : true) &&
      (title ? post.title.toLowerCase().includes(title) : true)
    );
  });

  currentPage = 1;
  loadPosts();
}

// Load the posts to the page based on current page and filters
function loadPosts() {
  const postsContainer = document.getElementById('postsContainer');
  postsContainer.innerHTML = ''; // Clear previous posts

  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage);

  currentPosts.forEach((post, index) => {
    const postElement = document.createElement('div');
    postElement.className = 'grid-item';
    postElement.innerHTML = `
      <h3>${post.title}</h3>
      <p>by ${post.author}</p>
      <p>Category: ${post.category}</p>
      <p><button onclick="showModal(${startIndex + index})">Read More</button></p>
    `;
    postsContainer.appendChild(postElement);
  });

  updatePagination();
}


// Open the modal with the full content
// Open the modal with the full content
function showModal(index) {
  const post = filteredPosts[index]; // Get the post data
  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalContent = document.getElementById('modalContent');

  // Set the content of the modal
  modalTitle.textContent = post.title;        // Title in h3
  modalContent.textContent = post.content;    // Poem/Quote content, italicized

  // Show the modal
  modal.style.display = 'flex';
}

// Close the modal when clicking the close button or outside the modal
document.getElementById('closeModal').addEventListener('click', function() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
});

// Close modal when clicking anywhere outside the modal content
window.addEventListener('click', function(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});


// Close modal when clicking anywhere outside the modal content
window.addEventListener('click', function(event) {
  const modal = document.getElementById('modal');
  if (event.target === modal) {
    modal.style.display = 'none';
  }
});



// Pagination: Move to the next page
function nextPage() {
  if (currentPage < Math.ceil(filteredPosts.length / postsPerPage)) {
    currentPage++;
    loadPosts();
  }
}

// Pagination: Move to the previous page
function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    loadPosts();
  }
}

// Update pagination buttons
function updatePagination() {
  const prevButton = document.querySelector('.pagination button:first-child');
  const nextButton = document.querySelector('.pagination button:last-child');

  if (currentPage === 1) {
    prevButton.disabled = true;
  } else {
    prevButton.disabled = false;
  }

  if (currentPage === Math.ceil(filteredPosts.length / postsPerPage)) {
    nextButton.disabled = true;
  } else {
    nextButton.disabled = false;
  }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  loadFilters();
  loadPosts();
});
