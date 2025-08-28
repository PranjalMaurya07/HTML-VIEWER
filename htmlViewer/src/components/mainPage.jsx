import React, { useState, useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-okaidia.css";
import "prismjs/components/prism-markup";
import "../styles/mainPage.css";

const MainPage = () => {
  const [htmlCode, setHtmlCode] = useState("<h1>Hello World!</h1>");
  const [copyMessage, setCopyMessage] = useState("");
  useEffect(() => {
    Prism.highlightAll();
  }, [htmlCode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopyMessage("Code copied!");
    setTimeout(() => setCopyMessage(""), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([htmlCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "code.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <div className="container">
        <h1 className="title">HTML Viewer</h1>

        <div className="top-section">
          {/* Textarea */}
          <div className="panel">
            <h2 className="subtitle">Write/Paste HTML Code</h2>
            <textarea
              className="textarea"
              value={htmlCode}
              onChange={(e) => setHtmlCode(e.target.value)}
            />
          </div>

          {/* Live Preview */}
          <div className="panel">
            <h2 className="subtitle">Live Preview</h2>
            <div
              className="preview-box"
              dangerouslySetInnerHTML={{ __html: htmlCode }}
            />
          </div>
        </div>

        {/*Syntax Highlight*/}
        <div className="panel bottom-section">
          <div className="bottom-header">
            <h2 className="subtitle">Syntax Highlighted Code</h2>
            <div className="button-group">
              <button className="btn" onClick={handleCopy}>
                Copy
              </button>
              <button className="btn" onClick={handleDownload}>
                Download
              </button>
            </div>
          </div>
          {copyMessage && <p className="copy-msg">{copyMessage}</p>}
          <pre className="code-block">
            <code className="language-markup">{htmlCode}</code>
          </pre>
        </div>
      </div>
    </>
  );
};
export default MainPage;
