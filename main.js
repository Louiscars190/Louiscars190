const pdfUrl = "./assets/Mechanical_Resume_Louis.pdf";
const fallback = document.getElementById("pdf-fallback");
const CLIENT_ID = "REPLACE_WITH_YOUR_ADOBE_PDF_EMBED_CLIENT_ID";

const showFallback = () => {
  if (fallback) fallback.hidden = false;
};

if (!CLIENT_ID || CLIENT_ID.includes("REPLACE_WITH")) {
  showFallback();
} else {
  document.addEventListener("adobe_dc_view_sdk.ready", () => {
    try {
      const adobeDCView = new window.AdobeDC.View({
        clientId: CLIENT_ID,
        divId: "adobe-dc-view",
      });

      adobeDCView
        .previewFile(
          {
            content: { location: { url: pdfUrl } },
            metaData: { fileName: "Mechanical_Resume_Louis.pdf" },
          },
          {
            embedMode: "SIZED_CONTAINER",
            showDownloadPDF: true,
            showPrintPDF: true,
          },
        )
        .catch(showFallback);
    } catch (_error) {
      showFallback();
    }
  });

  window.setTimeout(() => {
    if (!window.AdobeDC) {
      showFallback();
    }
  }, 3000);
}
