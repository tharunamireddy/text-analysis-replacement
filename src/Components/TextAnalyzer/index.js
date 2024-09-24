import React, { useState, useEffect } from "react";
import "./index.css"; 

const TextAnalyzer = () => {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [uniqueWordCount, setUniqueWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [replaceText, setReplaceText] = useState("");
  const [highlightedText, setHighlightedText] = useState("");

  useEffect(() => {
    const words = text.trim().match(/\b\w+\b/g) || [];
    const uniqueWords = new Set(words.map((word) => word.toLowerCase()));
    const chars = text.replace(/[^a-zA-Z0-9]/g, "");

    setWordCount(words.length);
    setUniqueWordCount(uniqueWords.size);
    setCharCount(chars.length);

    // Highlight replaced words with yellow color
    if (searchText && replaceText) {
      const regex = new RegExp(`(${replaceText})`, "gi");
      setHighlightedText(
        text.replace(regex, (match) => `<span class="highlight">${match}</span>`)
      );
    } else {
      setHighlightedText(text);
    }
  }, [text, replaceText, searchText]);

  const handleReplace = () => {
    if (searchText && replaceText) {
      const updatedText = text.replaceAll(searchText, replaceText);
      setText(updatedText);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Text Analyzer</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="textarea"
        placeholder="Enter your text here..."
      />
      <div className="stats">
        <p>Word Count: {wordCount}</p>
        <p>Unique Word Count: {uniqueWordCount}</p>
        <p>Character Count (Excluding Spaces and Punctuation): {charCount}</p>
      </div>

      <div className="input-container">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search Text"
          className="input"
        />
        <input
          type="text"
          value={replaceText}
          onChange={(e) => setReplaceText(e.target.value)}
          placeholder="Replace With"
          className="input"
        />
        <button onClick={handleReplace} className="button">
          Replace
        </button>
      </div>

      {/* Conditionally render the highlighted text container */}
      {text && (
        <div
          className="highlighted-text-container"
          dangerouslySetInnerHTML={{ __html: highlightedText }}
        />
      )}
    </div>
  );
};

export default TextAnalyzer;
