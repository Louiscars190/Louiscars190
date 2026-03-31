const pdfUrl = "./assets/Mechanical_Resume_Louis.pdf";

const canvas = document.getElementById("pdf-canvas");
const pageStatus = document.getElementById("pdf-page-status");
const zoomStatus = document.getElementById("pdf-zoom-status");
const fallback = document.getElementById("pdf-fallback");
const prevBtn = document.getElementById("pdf-prev");
const nextBtn = document.getElementById("pdf-next");
const zoomInBtn = document.getElementById("pdf-zoom-in");
const zoomOutBtn = document.getElementById("pdf-zoom-out");

if (canvas && window.pdfjsLib) {
  const ctx = canvas.getContext("2d");
  let pdfDoc = null;
  let pageNum = 1;
  let scale = 1.15;
  let rendering = false;
  let queuedPage = null;

  window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.3.136/pdf.worker.min.js";

  const updateControls = () => {
    pageStatus.textContent = `Page ${pageNum} / ${pdfDoc?.numPages || 1}`;
    zoomStatus.textContent = `${Math.round(scale * 100)}%`;
    prevBtn.disabled = pageNum <= 1;
    nextBtn.disabled = !pdfDoc || pageNum >= pdfDoc.numPages;
    zoomOutBtn.disabled = scale <= 0.6;
    zoomInBtn.disabled = scale >= 2.5;
  };

  const renderPage = async (num) => {
    rendering = true;
    const page = await pdfDoc.getPage(num);
    const viewport = page.getViewport({ scale });
    canvas.width = Math.ceil(viewport.width);
    canvas.height = Math.ceil(viewport.height);

    await page.render({ canvasContext: ctx, viewport }).promise;
    rendering = false;

    if (queuedPage !== null) {
      const next = queuedPage;
      queuedPage = null;
      renderPage(next);
    }

    updateControls();
  };

  const queueRender = (num) => {
    if (rendering) {
      queuedPage = num;
      return;
    }
    renderPage(num);
  };

  prevBtn.addEventListener("click", () => {
    if (pageNum <= 1) return;
    pageNum -= 1;
    queueRender(pageNum);
  });

  nextBtn.addEventListener("click", () => {
    if (!pdfDoc || pageNum >= pdfDoc.numPages) return;
    pageNum += 1;
    queueRender(pageNum);
  });

  zoomInBtn.addEventListener("click", () => {
    scale = Math.min(scale + 0.15, 2.5);
    queueRender(pageNum);
  });

  zoomOutBtn.addEventListener("click", () => {
    scale = Math.max(scale - 0.15, 0.6);
    queueRender(pageNum);
  });

  window.pdfjsLib.getDocument(pdfUrl).promise
    .then((doc) => {
      pdfDoc = doc;
      updateControls();
      renderPage(pageNum);
    })
    .catch(() => {
      fallback.hidden = false;
      if (canvas.parentElement) {
        canvas.parentElement.hidden = true;
      }
      document.querySelector(".pdf-toolbar")?.setAttribute("hidden", "hidden");
    });
} else if (fallback) {
  fallback.hidden = false;
}
