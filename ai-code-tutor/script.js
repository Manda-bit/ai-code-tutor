// ===== Live preview =====
// Every time the learner types in the code box, we write that code
// straight into the hidden preview pane (an iframe) so they see the
// result instantly — no "Run" button needed.

const codeInput = document.getElementById('codeInput');
const preview = document.getElementById('preview');
const resetBtn = document.getElementById('resetBtn');

// Remember the starting code so the Reset button can bring it back.
const startingCode = codeInput.value;

function updatePreview() {
  const code = codeInput.value;

  // We write the learner's HTML into the iframe's own little document.
  // Think of the iframe as a tiny, separate web page living inside our page.
  const previewDocument = preview.contentDocument || preview.contentWindow.document;

  previewDocument.open();
  previewDocument.write(`
    <html>
      <head>
        <style>
          body {
            font-family: system-ui, sans-serif;
            color: #1b2e28;
            padding: 16px;
          }
        </style>
      </head>
      <body>${code}</body>
    </html>
  `);
  previewDocument.close();
}

// A small delay (debounce) so we're not re-rendering on every single
// keystroke — just whenever the learner pauses briefly.
let debounceTimer;
codeInput.addEventListener('input', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(updatePreview, 250);
});

resetBtn.addEventListener('click', () => {
  codeInput.value = startingCode;
  updatePreview();
});

// Render once when the page first loads.
updatePreview();
