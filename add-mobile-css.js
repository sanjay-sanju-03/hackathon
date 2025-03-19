/**
 * This script adds the mobile-menu.css link to all HTML files
 * Run this script once to update all pages
 */

const fs = require('fs');
const path = require('path');

// Get all HTML files in the current directory
const htmlFiles = fs.readdirSync('./').filter(file => file.endsWith('.html'));

htmlFiles.forEach(file => {
  console.log(`Processing ${file}...`);
  
  let content = fs.readFileSync(file, 'utf8');
  
  // Check if the file already has the mobile-menu.css link
  if (!content.includes('href="css/mobile-menu.css"')) {
    // Add the link before the closing head tag
    content = content.replace('</head>', '    <link rel="stylesheet" href="css/mobile-menu.css">\n</head>');
    fs.writeFileSync(file, content);
    console.log(`Added mobile-menu.css link to ${file}`);
  } else {
    console.log(`${file} already has mobile-menu.css link`);
  }
});

console.log('All files processed!'); 