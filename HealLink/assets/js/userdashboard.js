
document.addEventListener('DOMContentLoaded', function() {

    var sidebar = document.getElementById('sidebar');
    var menuBtn = document.getElementById('menuBtn');
    var closeBtn = document.getElementById('closeSidebar');
    var overlay = document.getElementById('overlay');

    function openSidebar() {
        sidebar.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (menuBtn) {
        menuBtn.addEventListener('click', openSidebar);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    // Close sidebar on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSidebar();
        }
    });

    // Close sidebar on resize to desktop
    var resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 1024) {
                closeSidebar();
            }
        }, 200);
    });

    var profileBtn = document.getElementById('profileBtn');
    var dropdown = document.getElementById('dropdown');

    if (profileBtn && dropdown) {
        profileBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });

        document.addEventListener('click', function() {
            dropdown.classList.remove('active');
        });
    }

    var themeBtn = document.getElementById('themeBtn');

    function setTheme(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('careconnect-theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('careconnect-theme', 'light');
        }
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', function() {
            var isDark = document.body.classList.contains('dark-mode');
            setTheme(!isDark);

            // Update icon
            var icon = this.querySelector('i');
            if (isDark) {
                icon.className = 'bi bi-moon';
            } else {
                icon.className = 'bi bi-sun';
            }
        });
    }

    // Load saved theme
    var savedTheme = localStorage.getItem('careconnect-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeBtn) {
            var icon = themeBtn.querySelector('i');
            if (icon) icon.className = 'bi bi-sun';
        }
    }

    var counters = document.querySelectorAll('.counter');

    counters.forEach(function(counter) {
        var target = parseInt(counter.getAttribute('data-target'));
        var current = 0;
        var increment = Math.ceil(target / 60);

        function updateCounter() {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                return;
            }
            counter.textContent = current;
            setTimeout(updateCounter, 25);
        }

        updateCounter();
    });

    var searchInput = document.getElementById('searchInput');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            var query = this.value.toLowerCase().trim();

            // Simple search - just log for now
            if (query.length > 2) {
                console.log('Searching for:', query);
            }
        });
    }

    var notifBtn = document.getElementById('notifBtn');

    if (notifBtn) {
        notifBtn.addEventListener('click', function() {
            alert('You have 5 new notifications');
        });
    }

    var navLinks = document.querySelectorAll('.sidebar-nav a');

    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navLinks.forEach(function(l) {
                l.classList.remove('active');
            });
            this.classList.add('active');

            // Close sidebar on mobile
            if (window.innerWidth <= 1024) {
                closeSidebar();
            }
        });
    });

    var readMoreBtns = document.querySelectorAll('.read-more');

    readMoreBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Full reply will be displayed here');
        });
    });

    var viewBtns = document.querySelectorAll('.btn-view');

    viewBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var row = this.closest('tr');
            if (row) {
                var title = row.querySelector('td:first-child');
                if (title) {
                    alert('Viewing: ' + title.textContent.trim());
                }
            }
        });
    });

    var joinBtn = document.querySelector('.appt-actions .btn-primary');

    if (joinBtn) {
        joinBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Joining video consultation...');
        });
    }

    var cancelBtn = document.querySelector('.appt-actions .btn-outline');

    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to cancel this appointment?')) {
                alert('Appointment cancelled successfully');
            }
        });
    }
    var quickActions = document.querySelectorAll('.quick');

    quickActions.forEach(function(action) {
        action.addEventListener('click', function(e) {
            // Let the link handle navigation, just log
            var label = this.querySelector('h4');
            if (label) {
                console.log('Quick action clicked:', label.textContent);
            }
        });
    });

    console.log('CareConnect Dashboard loaded successfully!');
    console.log('© 2026 CareConnect - All Rights Reserved');

});

document.addEventListener('DOMContentLoaded', function() {

            // Mark as Read buttons
            var markReadBtns = document.querySelectorAll('.btn-outline.small');

            markReadBtns.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var item = this.closest('.reply-item');
                    if (item) {
                        item.classList.remove('unread');
                        var badge = item.querySelector('.unread-badge');
                        if (badge) {
                            badge.textContent = 'Read';
                            badge.className = 'read-badge';
                        }
                        this.style.display = 'none';
                        alert('Marked as read');
                    }
                });
            });

            // View Full Reply buttons
            var viewBtns = document.querySelectorAll('.reply-footer .btn-primary.small');

            viewBtns.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var item = this.closest('.reply-item');
                    if (item) {
                        var name = item.querySelector('.reply-header h4');
                        if (name) {
                            alert('Viewing full reply from ' + name.textContent);
                        }
                    }
                });
            });

        });