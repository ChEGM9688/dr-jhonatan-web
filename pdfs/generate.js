import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generatePDFs() {
  console.log("Starting PDF generation...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Array of PDF configurations
  const pdfs = [
    { id: 'guia-preanestesica', title: 'Guía Preanestésica para Pacientes', type: 'Guía' },
    { id: 'checklist-cirugia', title: 'Checklist para Cirugía Segura', type: 'Checklist' },
    { id: 'pierde-el-miedo', title: 'Mini Curso: Pierde el miedo a la anestesia', type: 'Material Educativo' }
  ];

  for (const doc of pdfs) {
    console.log(`Generating: ${doc.title}`);
    
    // Read the HTML template
    let html = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf-8');
    
    // Read the specific content for this PDF
    const contentPath = path.join(__dirname, `${doc.id}.html`);
    let content = "";
    if (fs.existsSync(contentPath)) {
      content = fs.readFileSync(contentPath, 'utf-8');
    } else {
      content = `<h2>Contenido en construcción</h2><p>El contenido para ${doc.title} aún no ha sido escrito.</p>`;
    }

    let useNativeFooter = true;
    if (content.includes('<!DOCTYPE html>')) {
        html = content;
        useNativeFooter = false;
    } else {
        // Replace placeholders
        html = html.replaceAll('{{TITLE}}', doc.title);
        html = html.replaceAll('{{TYPE}}', doc.type);
        html = html.replaceAll('{{CONTENT}}', content);
    }

    // Set content and render
    await page.setContent(html, { waitUntil: 'load' });
    
    // Save PDF
    await page.pdf({
      path: path.join(__dirname, `${doc.id}.pdf`),
      format: 'A4',
      printBackground: true,
      displayHeaderFooter: useNativeFooter,
      headerTemplate: '<span></span>',
      footerTemplate: `<div style="font-size: 10px; color: #94a3b8; text-align: center; width: 100%; font-family: 'Arial', sans-serif;">Página <span class="pageNumber"></span> | ${doc.title}</div>`,
      margin: {
        top: '60px',
        right: '50px',
        bottom: '60px',
        left: '50px'
      }
    });
    console.log(`Saved: ${doc.id}.pdf`);
  }

  await browser.close();
  console.log("Finished generating PDFs.");
}

generatePDFs().catch(console.error);
