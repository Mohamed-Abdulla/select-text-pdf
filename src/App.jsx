// import { useState } from "react";
import "./App.css";
import pdf from "../src/assets/invoice.jpg";
import data from "./data.json";
import { useEffect, useState } from "react";

function App() {
  const [highlightedText, setHighlightedText] = useState("");

  const handleSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    const range = selection.getRangeAt(0);
    const boundingRect = range.getBoundingClientRect();
    const highlight = document.createElement("span");
    highlight.className = "highlight";
    highlight.style.top = boundingRect.top + "px";
    highlight.style.left = boundingRect.left + "px";
    highlight.style.width = boundingRect.width + "px";
    highlight.style.height = boundingRect.height + "px";
    range.surroundContents(highlight);
    setHighlightedText(selectedText);
    const highlightRect = highlight.getBoundingClientRect();
    console.table({
      left: highlightRect.left,
      top: highlightRect.top,
      right: highlightRect.right,
      bottom: highlightRect.bottom,
    });
    return {
      left: highlightRect.left,
      top: highlightRect.top,
      right: highlightRect.right,
      bottom: highlightRect.bottom,
    };
  };

  const url = "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf";

  const createSaveBtn = () => {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };
  console.log(highlightedText);

  return (
    <div className="container">
      <img src={pdf} alt="" className="pdf" />
      <button className="download" type="button" onClick={createSaveBtn}>
        Download Co-ordinates
      </button>

      <object
        className="pdfobject"
        data={url}
        datatype="application/pdf"
        aria-label="pdfObject"
        style={{ height: "50rem", width: "50rem" }}
      ></object>

      <div onMouseUp={handleSelection}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis tempora tenetur libero aliquid odio eos error,
        voluptate non cupiditate, ex aliquam esse enim labore ipsam temporibus et adipisci reprehenderit nam?
      </div>

      {/* <div>
        <Document file="https://www.clickdimensions.com/links/TestPDFfile.pdf" onLoadSuccess={handleLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
        <p>Number of pages: {numPages}</p>
      </div> */}
    </div>
  );
}

export default App;
