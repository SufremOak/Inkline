import * as pdfjsLib from "pdfjs-dist";

// Set up worker source
pdfjsLib.GlobalWorkerOptions.workerSrc =
  "//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";

const container = document.getElementById("reader-container");
const fileInput = document.getElementById("file-input") as HTMLInputElement;

// Handle file selection
fileInput?.addEventListener("change", (event) => {
  const file = (event.target as HTMLInputElement).files?.[0];

  if (file && container) {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const arrayBuffer = e.target?.result as ArrayBuffer;

      // Load the PDF from the file
      pdfjsLib.getDocument({ data: arrayBuffer }).promise.then((pdf) => {
        // Render the first page
        pdf.getPage(1).then((page) => {
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          if (context) {
            page.render({ canvasContext: context, viewport });
            container.innerHTML = ""; // Clear the container before appending new content
            container.appendChild(canvas);
          }
        });
      });
    };

    // Read the selected file as an array buffer
    fileReader.readAsArrayBuffer(file);
  }
});
