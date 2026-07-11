/* ==========================================================
   Admin Psychologists - Complete JS
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
    // NAV LINKS - Mobile active state
    // ==========================================================

    var mobileLinks = document.querySelectorAll('.mobile-sidebar-links a');

    mobileLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            mobileLinks.forEach(function(l) {
                l.classList.remove('active');
            });
            this.classList.add('active');

            if (window.innerWidth <= 1024) {
                closeSidebar();
            }
        });
    });

    // ==========================================================
    // SEARCH FUNCTION
    // ==========================================================

    var searchInput = document.getElementById('searchPsychologists');

    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            var query = this.value.toLowerCase().trim();
            var rows = document.querySelectorAll('.users-table tbody tr');

            rows.forEach(function(row) {
                var text = row.textContent.toLowerCase();
                if (text.indexOf(query) > -1) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }

    // ==========================================================
    // FILTER FUNCTION
    // ==========================================================

    var filterStatus = document.getElementById('filterStatus');
    var filterVerification = document.getElementById('filterVerification');
    var applyFilterBtn = document.getElementById('applyFilterBtn');

    function applyFilters() {
        var status = filterStatus ? filterStatus.value : 'all';
        var verification = filterVerification ? filterVerification.value : 'all';
        var rows = document.querySelectorAll('.users-table tbody tr');

        rows.forEach(function(row) {
            var show = true;
            var statusCell = row.querySelector('.status-badge');
            var verifyCell = row.querySelector('.verify-badge');

            if (status !== 'all' && statusCell) {
                var statusText = statusCell.textContent.toLowerCase().trim();
                if (statusText !== status) {
                    show = false;
                }
            }

            if (verification !== 'all' && verifyCell) {
                var verifyText = verifyCell.textContent.toLowerCase().trim();
                if (verifyText !== verification) {
                    show = false;
                }
            }

            row.style.display = show ? '' : 'none';
        });
    }

    if (applyFilterBtn) {
        applyFilterBtn.addEventListener('click', applyFilters);
    }

    if (filterStatus) {
        filterStatus.addEventListener('change', applyFilters);
    }

    if (filterVerification) {
        filterVerification.addEventListener('change', applyFilters);
    }

    // ==========================================================
    // ACTION BUTTONS
    // ==========================================================

    // View Psychologist
    var viewBtns = document.querySelectorAll('.action-btn.view');

    viewBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            window.location.href = 'admin-view-psychologist.html';
        });
    });

    // Edit Psychologist
    var editBtns = document.querySelectorAll('.action-btn.edit');

    editBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var row = this.closest('tr');
            var name = row.querySelector('.user-cell span');
            if (name) {
                var newName = prompt('Edit psychologist name:', name.textContent);
                if (newName !== null && newName.trim() !== '') {
                    name.textContent = newName.trim();
                    showToast('✅ Psychologist name updated successfully!');
                }
            }
        });
    });

    // Verify Psychologist
    var verifyBtns = document.querySelectorAll('.action-btn.verify');

    verifyBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var row = this.closest('tr');
            var name = row.querySelector('.user-cell span');
            var status = row.querySelector('.status-badge');
            var verify = row.querySelector('.verify-badge');

            if (name && status && verify) {
                if (confirm('Verify ' + name.textContent + '?')) {
                    status.className = 'status-badge active';
                    status.textContent = 'Active';
                    verify.className = 'verify-badge verified';
                    verify.textContent = 'Verified';
                    showToast('✅ Psychologist verified successfully!');
                    updateCounts();
                }
            }
        });
    });

    // Suspend Psychologist
    var suspendBtns = document.querySelectorAll('.action-btn.suspend');

    suspendBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var row = this.closest('tr');
            var name = row.querySelector('.user-cell span');
            var status = row.querySelector('.status-badge');

            if (name && status) {
                if (confirm('Are you sure you want to suspend ' + name.textContent + '?')) {
                    status.className = 'status-badge inactive';
                    status.textContent = 'Inactive';
                    showToast('🚫 Psychologist suspended successfully!');
                    updateCounts();
                }
            }
        });
    });

    // Activate Psychologist
    var activateBtns = document.querySelectorAll('.action-btn.activate');

    activateBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var row = this.closest('tr');
            var name = row.querySelector('.user-cell span');
            var status = row.querySelector('.status-badge');

            if (name && status) {
                if (confirm('Are you sure you want to activate ' + name.textContent + '?')) {
                    status.className = 'status-badge active';
                    status.textContent = 'Active';
                    showToast('✅ Psychologist activated successfully!');
                    updateCounts();
                }
            }
        });
    });

    // Delete Psychologist
    var deleteBtns = document.querySelectorAll('.action-btn.delete');

    deleteBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var row = this.closest('tr');
            var name = row.querySelector('.user-cell span');

            if (name) {
                if (confirm('⚠️ Are you sure you want to permanently delete ' + name.textContent + '?\nThis action cannot be undone!')) {
                    var confirmText = prompt('Type DELETE to confirm:');
                    if (confirmText === 'DELETE') {
                        row.style.transition = '0.3s';
                        row.style.opacity = '0';
                        setTimeout(function() {
                            row.remove();
                            showToast('🗑️ Psychologist deleted successfully!');
                            updateCounts();
                        }, 300);
                    } else {
                        showToast('Deletion cancelled');
                    }
                }
            }
        });
    });

    // ==========================================================
    // UPDATE COUNTS
    // ==========================================================

    function updateCounts() {
        var total = document.querySelectorAll('.users-table tbody tr').length;
        var active = document.querySelectorAll('.users-table tbody tr .status-badge.active').length;
        var pending = document.querySelectorAll('.users-table tbody tr .status-badge.pending').length;

        var totalBadge = document.querySelector('.stat-badge.total');
        var activeBadge = document.querySelector('.stat-badge.active');
        var pendingBadge = document.querySelector('.stat-badge.pending');

        if (totalBadge) {
            totalBadge.innerHTML = '<i class="bi bi-person-badge"></i> ' + total + ' Total';
        }
        if (activeBadge) {
            activeBadge.innerHTML = '<i class="bi bi-check-circle"></i> ' + active + ' Active';
        }
        if (pendingBadge) {
            pendingBadge.innerHTML = '<i class="bi bi-clock"></i> ' + pending + ' Pending';
        }
    }

    // ==========================================================
    // TOAST NOTIFICATION
    // ==========================================================

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

    // ==========================================================
    // PAGINATION
    // ==========================================================

    var pageBtns = document.querySelectorAll('.page-btn');
    var currentPage = 1;
    var itemsPerPage = 5;
    var totalItems = document.querySelectorAll('.users-table tbody tr').length;
    var totalPages = Math.ceil(totalItems / itemsPerPage);

    function showPage(page) {
        var rows = document.querySelectorAll('.users-table tbody tr');
        var start = (page - 1) * itemsPerPage;
        var end = start + itemsPerPage;

        rows.forEach(function(row, index) {
            row.style.display = (index >= start && index < end) ? '' : 'none';
        });

        pageBtns.forEach(function(btn) {
            btn.classList.remove('active');
            if (parseInt(btn.textContent) === page) {
                btn.classList.add('active');
            }
        });

        var prevBtn = document.querySelector('.page-btn.prev');
        var nextBtn = document.querySelector('.page-btn.next');

        if (prevBtn) {
            prevBtn.disabled = (page === 1);
            prevBtn.style.opacity = (page === 1) ? '0.4' : '1';
        }

        if (nextBtn) {
            nextBtn.disabled = (page === totalPages);
            nextBtn.style.opacity = (page === totalPages) ? '0.4' : '1';
        }
    }

    pageBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var pageNum = parseInt(this.textContent);

            if (!isNaN(pageNum)) {
                currentPage = pageNum;
                showPage(currentPage);
                return;
            }

            if (this.classList.contains('prev')) {
                if (currentPage > 1) {
                    currentPage--;
                    showPage(currentPage);
                }
            } else if (this.classList.contains('next')) {
                if (currentPage < totalPages) {
                    currentPage++;
                    showPage(currentPage);
                }
            }
        });
    });

    if (totalPages > 1) {
        showPage(1);
    } else {
        document.querySelectorAll('.users-table tbody tr').forEach(function(row) {
            row.style.display = '';
        });
        var prevBtn = document.querySelector('.page-btn.prev');
        var nextBtn = document.querySelector('.page-btn.next');
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
    }

    console.log('Admin Psychologists page loaded');
});