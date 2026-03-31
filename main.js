const pdfUrl = "./assets/Mechanical_Resume_Louis.pdf";
const fallback = document.getElementById("pdf-fallback");
const CLIENT_ID = "72cdcdd2aa6f45b4a5663eae7bc7c08a";

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
	  	defaultViewMode: "FIT_WIDTH",  
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
