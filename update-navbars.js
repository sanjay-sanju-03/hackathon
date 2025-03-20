/**
 * This script updates all HTML files to use a consistent navbar
 * It adds the navbar.css file and standardizes the navigation markup
 */

const fs = require('fs');
const path = require('path');

// The standard navbar markup that will be used in all pages
const standardNavbar = `<nav>
    <div class="nav-left">
        <button class="menu-toggle">
            <i class="fas fa-bars"></i>
        </button>
        <div class="nav-links">
            <a href="index.html">Home</a>
            <a href="cuisine.html">Cuisine</a>
            <a href="experience.html">Experiences</a>
            <a href="events.html">Events</a>
            <a href="house.html">Houseboats</a>
            <a href="arts-artisans.html">Art & Artisans</a>
            <a href="made-in-kasaragod.html">Made in Kasaragod</a>
        </div>
    </div>
    <div class="search-wrapper">
        <input type="text" id="searchInput" placeholder="Search...">
        <i class="fas fa-search search-icon"></i>
        <div class="search-suggestions"></div>
    </div>
</nav>`;

// Set active class for the current page
function setActiveClass(html, pageName) {
    // Map of filenames to nav items that should be marked active
    const activePageMap = {
        'index.html': 'Home',
        'cuisine.html': 'Cuisine',
        'experience.html': 'Experiences',
        'events.html': 'Events',
        'house.html': 'Houseboats',
        'arts-artisans.html': 'Art & Artisans',
        'made-in-kasaragod.html': 'Made in Kasaragod',
        'anantapura.html': 'Home', // Consider these part of home
        'bekal.html': 'Home'       // Consider these part of home
    };

    const activeLink = activePageMap[pageName] || 'Home';
    
    // Replace the navbar with active class for the current page
    return html.replace(/<div class="nav-links">([\s\S]*?)<\/div>/g, (match) => {
        return match.replace(
            `<a href="${pageName.toLowerCase()}">${activeLink}</a>`,
            `<a href="${pageName.toLowerCase()}" class="active">${activeLink}</a>`
        );
    });
}

// Add navbar.css link to head section if it doesn't exist
function addNavbarCss(html) {
    if (!html.includes('navbar.css')) {
        return html.replace(
            /<\/head>/,
            '    <link rel="stylesheet" href="css/navbar.css">\n</head>'
        );
    }
    return html;
}

// Get all HTML files in the current directory
const htmlFiles = fs.readdirSync('./').filter(file => file.endsWith('.html'));

htmlFiles.forEach(file => {
    console.log(`Processing ${file}...`);
    
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the existing navigation bar with the standard one
    if (content.includes('<nav>')) {
        content = content.replace(/<nav>[\s\S]*?<\/nav>/, standardNavbar);
    } else if (content.includes('<header>') && content.includes('<nav>')) {
        content = content.replace(
            /<header>[\s\S]*?<nav>[\s\S]*?<\/nav>[\s\S]*?<\/header>/, 
            `<header>\n    ${standardNavbar}\n</header>`
        );
    }
    
    // Add active class for current page
    content = setActiveClass(content, file);
    
    // Add navbar.css to head
    content = addNavbarCss(content);
    
    // Save the updated content
    fs.writeFileSync(file, content);
    console.log(`Updated navbar in ${file}`);
});

console.log('All files processed!'); 