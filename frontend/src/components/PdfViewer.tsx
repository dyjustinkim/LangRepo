function PdfViewer({ url, loadingFunc }: { url: string, loadingFunc: (state: boolean) => void; }) {
  return (
    <iframe
      src={url}
      onLoad={() => loadingFunc(false)}
      width="800px"
      height="600px"
      style={{ border: "none" }}
      title="PDF Viewer"
    />
  );
}

export default PdfViewer;