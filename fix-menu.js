/**
 * This script adds a fix for the menu toggle button
 * It should be run once to patch all HTML files
 */

const fs = require('fs');
const path = require('path');

// Get all HTML files in the current directory
const htmlFiles = fs.readdirSync('./').filter(file => file.endsWith('.html'));

htmlFiles.forEach(file => {
  console.log(`Processing ${file}...`);
  
  let content = fs.readFileSync(file, 'utf8');
  
  // Check if the file already has the menu-toggle.js script
  if (!content.includes('src="js/menu-toggle.js"')) {
    // Add the script before the closing body tag
    content = content.replace('</body>', '    <script src="js/menu-toggle.js"></script>\n</body>');
    fs.writeFileSync(file, content);
    console.log(`Added menu-toggle.js script to ${file}`);
  } else {
    console.log(`${file} already has menu-toggle.js script`);
  }
});

console.log('All files processed!'); 