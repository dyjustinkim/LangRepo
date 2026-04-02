function PdfViewer({ url, loadingFunc, loading }: { url: string, loadingFunc: (state: boolean) => void, loading: boolean; }) {
  return (
    <iframe
      src={url}
      onLoad={() => loadingFunc(false)}
      width="800px"
      height="600px"
      style={{ border: "none", display: loading ? "none" : "block" }}
      title="PDF Viewer"
    />
  );
}

export default PdfViewer;