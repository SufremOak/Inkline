interface Book {
  title: string;
  desc: string;
}

document.addEventListener("DOMContentLoaded", () => {
  const books: Book[] = [
    { title: "The Wandering Tome", desc: "A fantasy story of ancient lore." },
    { title: "Ink & Shadows", desc: "Mystery in a sleepy Victorian town." },
    {
      title: "Digital Dreams",
      desc: "A sci-fi journey through simulated worlds.",
    },
  ];

  const list = document.getElementById("book-list");

  if (!list) return;

  books.forEach((book) => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.desc}</p>
    `;

    card.onclick = () => {
      window.location.href = `/reader?book=${encodeURIComponent(book.title)}`;
    };

    list.appendChild(card);
  });
});
