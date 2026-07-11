

document.addEventListener('DOMContentLoaded', function() {



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



    var themeBtn = document.getElementById('navThemeBtn');

    function setTheme(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('admin-theme', 'dark');
            if (themeBtn) {
                var icon = themeBtn.querySelector('i');
                if (icon) {
                    icon.className = 'bi bi-sun';
                }
            }
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('admin-theme', 'light');
            if (themeBtn) {
                var icon = themeBtn.querySelector('i');
                if (icon) {
                    icon.className = 'bi bi-moon';
                }
            }
        }
    }

    // Load saved theme on page load
    var savedTheme = localStorage.getItem('admin-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeBtn) {
            var icon = themeBtn.querySelector('i');
            if (icon) {
                icon.className = 'bi bi-sun';
            }
        }
    } else {
        // Default to light mode
        document.body.classList.remove('dark-mode');
        if (themeBtn) {
            var icon = themeBtn.querySelector('i');
            if (icon) {
                icon.className = 'bi bi-moon';
            }
        }
    }

    // Theme toggle button click
    if (themeBtn) {
        themeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            var isDark = document.body.classList.contains('dark-mode');
            setTheme(!isDark);
        });
    }



    var startDate = document.getElementById('startDate');
    var endDate = document.getElementById('endDate');
    var applyDateBtn = document.getElementById('applyDateBtn');
    var dateBtns = document.querySelectorAll('.date-btn');

    // Set default dates
    var today = new Date();
    var thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    if (startDate) {
        startDate.value = thirtyDaysAgo.toISOString().split('T')[0];
    }
    if (endDate) {
        endDate.value = today.toISOString().split('T')[0];
    }

    // Date button clicks
    dateBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            dateBtns.forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');

            var days = parseInt(this.getAttribute('data-range'));
            var end = new Date();
            var start = new Date();
            start.setDate(end.getDate() - days);

            if (startDate) {
                startDate.value = start.toISOString().split('T')[0];
            }
            if (endDate) {
                endDate.value = end.toISOString().split('T')[0];
            }

            showToast('📊 Report updated for last ' + days + ' days');
        });
    });

    // Apply date filter
    if (applyDateBtn) {
        applyDateBtn.addEventListener('click', function() {
            showToast('📊 Report updated with selected date range');
        });
    }


    var exportBtn = document.getElementById('exportReportBtn');

    if (exportBtn) {
        exportBtn.addEventListener('click', function() {
            showToast('📥 Report exported successfully!');
        });
    }

   

    var refreshBtn = document.getElementById('refreshLogBtn');

    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            var icon = this.querySelector('i');
            icon.classList.add('bi-arrow-clockwise');
            icon.style.animation = 'spin 0.5s linear';
            setTimeout(function() {
                icon.style.animation = '';
                showToast('🔄 Activity log refreshed!');
            }, 500);
        });
    }

 

    var style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);



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



    function animateBars() {
        var bars = document.querySelectorAll('.chart-bar');
        bars.forEach(function(bar) {
            var height = bar.style.height;
            bar.style.height = '0%';
            setTimeout(function() {
                bar.style.height = height;
                bar.style.transition = 'height 0.8s ease';
            }, 100);
        });
    }

    setTimeout(animateBars, 500);

    console.log('Admin Reports page loaded');
});