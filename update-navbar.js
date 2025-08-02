const fs = require('fs');
const path = require('path');

// Define the navigation component to be inserted
const navbarComponent = `
    <!-- Navigation Component -->
    <div id="navbar-container">
        <!-- This will be replaced by the navigation component -->
    </div>
    
    <!-- Back to Top Button -->
    <button id="back-to-top" class="back-to-top">
        <i class="fas fa-arrow-up"></i>
    </button>
`;

// Define the scripts to be added before the closing body tag
const scriptsToAdd = `
    <!-- jQuery -->
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    
    <!-- Load Navigation -->
    <script>
        $(function(){
            $("#navbar-container").load("includes/navbar.html");
        });
    </script>
    
    <!-- Navigation Scripts -->
    <script src="js/navbar.js"></script>
`;

// List of HTML files to update
const htmlFiles = [
    'index.html',
    'menu.html',
    'details.html',
    'consultations.html',
    'consultant-details.html'
];

// Function to update a single HTML file
function updateHtmlFile(filePath) {
    try {
        // Read the file
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove existing header and navigation
        content = content.replace(/<header[\s\S]*?<\/header>/, '');
        
        // Add the navigation component after the opening body tag
        content = content.replace(
            /<body[^>]*>/, 
            (match) => `${match}\n${navbarComponent}`
        );
        
        // Add scripts before the closing body tag
        content = content.replace(
            /<\/body>/, 
            `${scriptsToAdd}\n</body>`
        );
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
        
        return true;
    } catch (error) {
        console.error(`Error updating ${filePath}:`, error);
        return false;
    }
}

// Process all HTML files
console.log('Updating navigation across all pages...');

let successCount = 0;
htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        if (updateHtmlFile(filePath)) {
            successCount++;
        }
    } else {
        console.log(`Skipping (not found): ${filePath}`);
    }
});

console.log(`\nUpdate complete! Successfully updated ${successCount} of ${htmlFiles.length} files.`);
