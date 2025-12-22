// ============================================
// TEACHER SECURITY CONFIGURATION
// ============================================
const TEACHER_EMAILS = ["mm9019783@gmail.com"]; // <--- CHANGE THIS TO YOUR EMAIL
const STUDENT_VIEW_URL = "https://mmoh16.github.io/bulk-sender/data-View.html";
const LOGIN_PAGE_URL = "https://mmoh16.github.io/bulk-sender/";
const CLERK_KEY = "pk_test_cHJlcGFyZWQtZmFsY29uLTU2LmNsZXJrLmFjY291bnRzLmRldiQ";
// ============================================

// 1. Inject Clerk Library
const script = document.createElement('script');
script.src = "https://prepared-falcon-56.clerk.accounts.dev/npm/@clerk/clerk-js@5/dist/clerk.browser.js";
script.async = true;
script.crossOrigin = "anonymous";
script.setAttribute('data-clerk-publishable-key', CLERK_KEY);
document.head.appendChild(script);

// 2. Create a Loading Overlay
const loadingOverlay = document.createElement('div');
loadingOverlay.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:white;z-index:99999;display:flex;justify-content:center;align-items:center;font-family:sans-serif;";
loadingOverlay.innerHTML = "<h3>🔒 Verifying Teacher Access...</h3>";
document.documentElement.appendChild(loadingOverlay);

// 3. Run Security Check when Clerk loads
script.onload = async () => {
    try {
        await Clerk.load();

        if (Clerk.user) {
            const userEmail = Clerk.user.primaryEmailAddress.emailAddress;
            
            // Check if user is in the Teacher list
            if (TEACHER_EMAILS.includes(userEmail)) {
                // === ACCESS GRANTED ===
                // Remove loading overlay
                loadingOverlay.remove();
                // Reveal the content
                document.body.style.display = "block";
                
                // If there is a spot for the User Button, add it
                const btnContainer = document.getElementById('user-button-container');
                if(btnContainer) Clerk.mountUserButton(btnContainer);
                
            } else {
                // === ACCESS DENIED (STUDENT) ===
                // 1. Destroy the page content immediately
                document.body.innerHTML = "";
                // 2. Show error
                document.write("<h1 style='text-align:center; margin-top:50px;'>⛔ Access Denied: Teachers Only</h1>");
                // 3. Kick them out
                window.location.href = STUDENT_VIEW_URL;
            }
        } else {
            // === NOT LOGGED IN ===
            window.location.href = LOGIN_PAGE_URL;
        }
    } catch (err) {
        console.error("Security Error:", err);
        window.location.href = LOGIN_PAGE_URL;
    }
};
