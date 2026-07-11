

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
            closeModerateModal();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSidebar();
            closeModerateModal();
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

  

    var searchInput = document.getElementById('searchPosts');

    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            var query = this.value.toLowerCase().trim();
            var rows = document.querySelectorAll('.posts-table tbody tr');

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

  

    var filterStatus = document.getElementById('filterStatus');
    var filterCategory = document.getElementById('filterCategory');
    var applyFilterBtn = document.getElementById('applyFilterBtn');

    function applyFilters() {
        var status = filterStatus ? filterStatus.value : 'all';
        var category = filterCategory ? filterCategory.value : 'all';
        var rows = document.querySelectorAll('.posts-table tbody tr');

        rows.forEach(function(row) {
            var show = true;
            var statusCell = row.querySelector('.status-badge');
            var catCell = row.querySelector('.category-badge');

            if (status !== 'all' && statusCell) {
                var statusText = statusCell.textContent.toLowerCase().trim();
                if (statusText !== status) {
                    show = false;
                }
            }

            if (category !== 'all' && catCell) {
                var catText = catCell.textContent.toLowerCase().trim();
                if (catText !== category) {
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

    if (filterCategory) {
        filterCategory.addEventListener('change', applyFilters);
    }



    var viewBtns = document.querySelectorAll('.action-btn.view');

    viewBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var row = this.closest('tr');
            var title = row.querySelector('.post-title');
            if (title) {
                alert('👁️ Viewing post: ' + title.textContent);
            }
        });
    });

    // Moderate Post
    var moderateBtns = document.querySelectorAll('.action-btn.moderate');

    moderateBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var row = this.closest('tr');
            var title = row.querySelector('.post-title');
            var content = row.querySelector('.post-preview');
            var author = row.querySelector('.author-badge');
            var category = row.querySelector('.category-badge');

            if (title && content) {
                document.getElementById('moderatePostTitle').textContent = title.textContent;
                document.getElementById('moderatePostContent').textContent = content.textContent;
                document.getElementById('moderatePostAuthor').textContent = author ? author.textContent.trim() : 'Anonymous';
                document.getElementById('moderatePostCategory').textContent = category ? category.textContent : 'General';

                var status = row.querySelector('.status-badge');
                var statusSelect = document.getElementById('moderateStatus');
                if (status) {
                    var currentStatus = status.textContent.toLowerCase().trim();
                    for (var i = 0; i < statusSelect.options.length; i++) {
                        if (statusSelect.options[i].value === currentStatus) {
                            statusSelect.selectedIndex = i;
                            break;
                        }
                    }
                }

                document.getElementById('moderateReason').value = '';
                openModerateModal(row);
            }
        });
    });

    // Flag/Report Post
    var flagBtns = document.querySelectorAll('.action-btn.flag');

    flagBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var row = this.closest('tr');
            var title = row.querySelector('.post-title');
            var status = row.querySelector('.status-badge');

            if (title && status) {
                if (confirm('Report this post: "' + title.textContent + '"\n\nThis will mark it as reported.')) {
                    status.className = 'status-badge reported';
                    status.textContent = 'Reported';
                    showToast('🚩 Post reported successfully!');
                    updateCounts();
                }
            }
        });
    });

    // Delete Post
    var deleteBtns = document.querySelectorAll('.action-btn.delete');

    deleteBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var row = this.closest('tr');
            var title = row.querySelector('.post-title');

            if (title) {
                if (confirm('⚠️ Are you sure you want to permanently delete this post?\n\n"' + title.textContent + '"\n\nThis action cannot be undone!')) {
                    var confirmText = prompt('Type DELETE to confirm:');
                    if (confirmText === 'DELETE') {
                        row.style.transition = '0.3s';
                        row.style.opacity = '0';
                        setTimeout(function() {
                            row.remove();
                            showToast('🗑️ Post deleted successfully!');
                            updateCounts();
                        }, 300);
                    } else {
                        showToast('Deletion cancelled');
                    }
                }
            }
        });
    });

   

    var moderateModal = document.getElementById('moderateModal');
    var moderateOverlay = document.getElementById('moderateOverlay');
    var moderateClose = document.getElementById('moderateModalClose');
    var moderateCancel = document.getElementById('moderateCancel');
    var moderateConfirm = document.getElementById('moderateConfirm');

    var currentModerateRow = null;

    function openModerateModal(row) {
        currentModerateRow = row;
        moderateModal.classList.add('active');
        moderateOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModerateModal() {
        moderateModal.classList.remove('active');
        moderateOverlay.classList.remove('active');
        document.body.style.overflow = '';
        currentModerateRow = null;
    }

    if (moderateClose) {
        moderateClose.addEventListener('click', closeModerateModal);
    }

    if (moderateCancel) {
        moderateCancel.addEventListener('click', closeModerateModal);
    }

    if (moderateOverlay) {
        moderateOverlay.addEventListener('click', closeModerateModal);
    }

    if (moderateConfirm) {
        moderateConfirm.addEventListener('click', function() {
            if (!currentModerateRow) {
                alert('Error: No post selected.');
                return;
            }

            var newStatus = document.getElementById('moderateStatus').value;
            var reason = document.getElementById('moderateReason').value.trim();

            var statusBadge = currentModerateRow.querySelector('.status-badge');
            if (statusBadge) {
                var statusClass = {
                    'active': 'active',
                    'pending': 'pending',
                    'reported': 'reported',
                    'resolved': 'resolved'
                };
                var statusLabel = {
                    'active': 'Active',
                    'pending': 'Pending',
                    'reported': 'Reported',
                    'resolved': 'Resolved'
                };
                statusBadge.className = 'status-badge ' + statusClass[newStatus];
                statusBadge.textContent = statusLabel[newStatus];
            }

            var title = currentModerateRow.querySelector('.post-title');
            var msg = '✅ Post moderated successfully!\n\n';
            msg += 'Title: ' + (title ? title.textContent : 'Unknown') + '\n';
            msg += 'New Status: ' + statusLabel[newStatus] + '\n';
            if (reason) {
                msg += 'Reason: ' + reason;
            }
            alert(msg);

            closeModerateModal();
            updateCounts();
        });
    }



    function updateCounts() {
        var total = document.querySelectorAll('.posts-table tbody tr').length;
        var active = document.querySelectorAll('.posts-table tbody tr .status-badge.active').length;
        var pending = document.querySelectorAll('.posts-table tbody tr .status-badge.pending').length;
        var reported = document.querySelectorAll('.posts-table tbody tr .status-badge.reported').length;

        var totalBadge = document.querySelector('.stat-badge.total');
        var activeBadge = document.querySelector('.stat-badge.active');
        var pendingBadge = document.querySelector('.stat-badge.pending');
        var reportedBadge = document.querySelector('.stat-badge.reported');

        if (totalBadge) {
            totalBadge.innerHTML = '<i class="bi bi-journal-text"></i> ' + total + ' Total';
        }
        if (activeBadge) {
            activeBadge.innerHTML = '<i class="bi bi-check-circle"></i> ' + active + ' Active';
        }
        if (pendingBadge) {
            pendingBadge.innerHTML = '<i class="bi bi-clock"></i> ' + pending + ' Pending';
        }
        if (reportedBadge) {
            reportedBadge.innerHTML = '<i class="bi bi-flag"></i> ' + reported + ' Reported';
        }
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



    var pageBtns = document.querySelectorAll('.page-btn');
    var currentPage = 1;
    var itemsPerPage = 5;
    var totalItems = document.querySelectorAll('.posts-table tbody tr').length;
    var totalPages = Math.ceil(totalItems / itemsPerPage);

    function showPage(page) {
        var rows = document.querySelectorAll('.posts-table tbody tr');
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
        document.querySelectorAll('.posts-table tbody tr').forEach(function(row) {
            row.style.display = '';
        });
        var prevBtn = document.querySelector('.page-btn.prev');
        var nextBtn = document.querySelector('.page-btn.next');
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
    }

    console.log('Admin Posts page loaded');
});