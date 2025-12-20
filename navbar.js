document.addEventListener("DOMContentLoaded", function() {
    
    // 1. INJECT STYLES
    const menuStyles = `
        /* --- MAIN MENU STYLES --- */
        .menu-container { position: relative; z-index: 1000; }
        
        .menu-btn {
            background-color: white;
            color: var(--primary-color, #0F9E99);
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            transition: background 0.3s;
        }

        .menu-btn:hover { background-color: #f0f0f0; }
        .menu-btn svg { width: 20px; height: 20px; fill: currentColor; }

        .dropdown-content {
            display: none;
            position: absolute;
            right: 0;
            top: 50px;
            background-color: white;
            min-width: 200px;
            box-shadow: 0 8px 20px rgba(0,0,0,0.15);
            border-radius: 12px;
            
            /* --- CHANGED HERE: Allow scrolling if menu is too tall --- */
            overflow-y: auto; 
            max-height: 80vh; 
            /* -------------------------------------------------------- */
            
            z-index: 1001;
            animation: fadeIn 0.2s ease-out;
            text-align: left;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .dropdown-content a {
            color: #333;
            padding: 15px 20px;
            text-decoration: none;
            display: flex;
            align-items: center;
            gap: 10px;
            border-bottom: 1px solid #f0f0f0;
            font-size: 16px;
            font-weight: 500;
        }

        .dropdown-content a:last-child { border-bottom: none; }
        .dropdown-content a:hover { background-color: #f9f9f9; color: var(--primary-color, #0F9E99); }
        .dropdown-content a svg { width: 18px; height: 18px; fill: currentColor; }

        .show-menu { display: block; }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.innerText = menuStyles;
    document.head.appendChild(styleSheet);

    // 2. INJECT HTML (WITH 4 BUTTONS)
    const menuHTML = `
        <button class="menu-btn" onclick="toggleMenu()">
            <svg viewBox="0 0 448 512"><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>
        </button>
        <div id="mainMenu" class="dropdown-content">
            <a href="index.html">
                <svg viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                Dashboard
            </a>

            <a href="data-View.html">
                <svg viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                Student View
            </a>
            <a href="Hw.html">
                <svg viewBox="0 0 448 512"><path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16z"/></svg>
                Send HW
            </a>
            <a href="attendance.html">
                <svg viewBox="0 0 448 512"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                Send Attend
            </a>
        </div>
    `;

    const menuContainer = document.getElementById('main-menu-container');
    if(menuContainer) {
        menuContainer.innerHTML = menuHTML;
        menuContainer.className = "menu-container";
    }
});

// 3. LOGIC (Attached to window so HTML can see it)
window.toggleMenu = function() {
    const menu = document.getElementById("mainMenu");
    if (menu) menu.classList.toggle("show-menu");
}

window.onclick = function(event) {
    if (!event.target.matches('.menu-btn') && !event.target.closest('.menu-btn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show-menu')) {
                openDropdown.classList.remove('show-menu');
            }
        }
    }
}
