import './App.css'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import {useState} from "react";

function App() {
    const [pdfinfo  , setPdfinfo] = useState<any>()
  async function createPDF(){

// Create a new PDFDocument
      const pdfDoc = await PDFDocument.create()

// Embed the Times Roman font
      const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

// Add a blank page to the document
      const page = pdfDoc.addPage()

// Get the width and height of the page
      const { width, height } = page.getSize()

// Draw a string of text toward the top of the page
      const fontSize = 30
      page.drawText('Creating PDFs in JavaScript is awesome!', {
          x: 50,
          y: height - 4 * fontSize,
          size: fontSize,
          font: timesRomanFont,
          color: rgb(0, 0.53, 0.71),
      })

// Serialize the PDFDocument to bytes (a Uint8Array)
       const pdf  =await  pdfDoc.save()
       return pdf
  }
    const handleDownload = async () => {
        const pdfBytes = await createPDF();
        setPdfinfo(pdfBytes);
    };
  return (
      <div>
          <button onClick={handleDownload}>Tạo và Tải PDF</button>
          {pdfinfo && (
              <a
                  href={`data:application/pdf;base64,${btoa(
                      new Uint8Array(pdfinfo).reduce((data, byte) => data + String.fromCharCode(byte), '')
                  )}`}
                  download="example.pdf"
              >
                  Tải xuống PDF
              </a>
          )}
      </div>
  )
}

export default App
