/* ==========================================================
   Admin View Psychologist - Complete JS
   ========================================================== */

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================================
    // MOBILE SIDEBAR
    // ==========================================================

    var menuBtn = document.getElementById('mobileMenuBtn');
    var closeBtn = document.getElementById('mobileSidebarClose');
    var sidebar = document.getElementById('mobileSidebar');
    var overlay = document.getElementById('mobileOverlay');

    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openSidebar();
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeSidebar();
        });
    }

    if (overlay) {
        overlay.addEventListener('click', function() {
            closeSidebar();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSidebar();
        }
    });

    window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
            closeSidebar();
        }
    });

    // ==========================================================
    // PROFILE DROPDOWN
    // ==========================================================

    var profileBtn = document.getElementById('navProfileBtn');
    var dropdown = document.getElementById('navDropdown');

    if (profileBtn && dropdown) {
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        document.addEventListener('click', function() {
            dropdown.classList.remove('active');
        });
    }

    // ==========================================================
    // DARK MODE
    // ==========================================================

    var themeBtn = document.getElementById('navThemeBtn');

    function setTheme(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('admin-theme', 'dark');
            if (themeBtn) {
                var icon = themeBtn.querySelector('i');
                if (icon) icon.className = 'bi bi-sun';
            }
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('admin-theme', 'light');
            if (themeBtn) {
                var icon = themeBtn.querySelector('i');
                if (icon) icon.className = 'bi bi-moon';
            }
        }
    }

    var savedTheme = localStorage.getItem('admin-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeBtn) {
            var icon = themeBtn.querySelector('i');
            if (icon) icon.className = 'bi bi-sun';
        }
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            var isDark = document.body.classList.contains('dark-mode');
            setTheme(!isDark);
        });
    }

    // ==========================================================
    // ACTION BUTTONS
    // ==========================================================

    // Edit Psychologist
    var editBtn = document.querySelector('.btn-action.primary');

    if (editBtn) {
        editBtn.addEventListener('click', function() {
            var name = document.querySelector('.profile-info h1');
            if (name) {
                var newName = prompt('Edit psychologist name:', name.textContent);
                if (newName !== null && newName.trim() !== '') {
                    name.textContent = newName.trim();
                    showToast('✅ Psychologist name updated successfully!');
                }
            }
        });
    }

    // Suspend Psychologist
    var suspendBtn = document.querySelector('.btn-action.warning');

    if (suspendBtn) {
        suspendBtn.addEventListener('click', function() {
            var name = document.querySelector('.profile-info h1');
            var status = document.querySelector('.profile-status .status-badge');

            if (name && status) {
                if (confirm('Are you sure you want to suspend ' + name.textContent + '?')) {
                    status.className = 'status-badge inactive';
                    status.textContent = 'Inactive';
                    showToast('🚫 Psychologist suspended successfully!');
                }
            }
        });
    }

    // Delete Psychologist
    var deleteBtn = document.querySelector('.btn-action.danger');

    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            var name = document.querySelector('.profile-info h1');

            if (name) {
                if (confirm('⚠️ Are you sure you want to permanently delete ' + name.textContent + '?\nThis action cannot be undone!')) {
                    var confirmText = prompt('Type DELETE to confirm:');
                    if (confirmText === 'DELETE') {
                        showToast('🗑️ Psychologist deleted successfully!');
                        setTimeout(function() {
                            window.location.href = 'admin-psychologists.html';
                        }, 1000);
                    } else {
                        showToast('Deletion cancelled');
                    }
                }
            }
        });
    }



    function showToast(message) {
        var old = document.querySelector('.toast-msg');
        if (old) old.remove();

        var toast = document.createElement('div');
        toast.className = 'toast-msg';
        toast.textContent = message;
        toast.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:#1a1a2e;color:#fff;padding:10px 24px;border-radius:10px;font-weight:500;font-size:0.85rem;z-index:9999;box-shadow:0 8px 30px rgba(0,0,0,0.2);font-family:Montserrat,sans-serif;';
        if (document.body.classList.contains('dark-mode')) {
            toast.style.background = '#1E293B';
            toast.style.border = '1px solid #334155';
        }
        document.body.appendChild(toast);
        setTimeout(function() {
            toast.style.opacity = '0';
            toast.style.transition = '0.3s';
            setTimeout(function() { toast.remove(); }, 300);
        }, 2500);
    }

    console.log('Admin View Psychologist loaded');
});