/* 
   Candle Making Studio - Dashboard Interaction
*/

document.addEventListener('DOMContentLoaded', () => {
    const sidebarItems = document.querySelectorAll('.sidebar-item[data-target], .dropdown-item[data-target]');
    const sections = document.querySelectorAll('.dashboard-section');

    function switchSection(targetId) {
        if (!targetId) return;

        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });

        // Show target section
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
            setTimeout(() => {
                targetSection.classList.add('active');
            }, 50);
        }

        // Update sidebar active state
        sidebarItems.forEach(item => {
            if (item.getAttribute('data-target') === targetId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Close sidebar on mobile
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.remove('show');
        }

        // Scroll to top of content
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Event listeners
    sidebarItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = item.getAttribute('data-target');
            switchSection(targetId);
            
            // Update URL hash without reload if desired
            window.location.hash = targetId;
        });
    });

    // Handle initial load from hash
    const initialHash = window.location.hash.substring(1);
    if (initialHash && document.getElementById(initialHash)) {
        switchSection(initialHash);
    }
});
