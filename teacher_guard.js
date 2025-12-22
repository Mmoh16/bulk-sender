// ============================================
// TEACHER SECURITY CONFIGURATION
// ============================================
const TEACHER_EMAILS = ["your-email@gmail.com"]; // <--- CHANGE THIS TO YOUR EMAIL
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

// 2. Run Security Check when Clerk loads
script.onload = async () => {
    try {
        await Clerk.load();

        if (Clerk.user) {
            const userEmail = Clerk.user.primaryEmailAddress.emailAddress;
            
            // Check if user is in the Teacher list
            if (TEACHER_EMAILS.includes(userEmail)) {
                // SUCCESS: Reveal the page
                document.body.style.display = "block";
                
                // If there is a spot for the User Button, add it
                const btnContainer = document.getElementById('user-button-container');
                if(btnContainer) Clerk.mountUserButton(btnContainer);
                
            } else {
                // FAIL: Redirect Students
                window.location.href = STUDENT_VIEW_URL;
            }
        } else {
            // FAIL: Not logged in
            window.location.href = LOGIN_PAGE_URL;
        }
    } catch (err) {
        console.error("Security Error:", err);
        window.location.href = LOGIN_PAGE_URL;
    }
};
