

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
            closeEditModal();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSidebar();
            closeEditModal();
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
            localStorage.setItem('psychologist-theme', 'dark');
            if (themeBtn) {
                var icon = themeBtn.querySelector('i');
                if (icon) icon.className = 'bi bi-sun';
            }
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('psychologist-theme', 'light');
            if (themeBtn) {
                var icon = themeBtn.querySelector('i');
                if (icon) icon.className = 'bi bi-moon';
            }
        }
    }

    var savedTheme = localStorage.getItem('psychologist-theme');
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

 

    var editModal = document.getElementById('editModal');
    var editOverlay = document.getElementById('editModalOverlay');
    var editClose = document.getElementById('editModalClose');
    var editCancel = document.getElementById('editCancel');
    var editSave = document.getElementById('editSave');
    var editContent = document.getElementById('editReplyContent');
    var editPostTitle = document.getElementById('editPostTitle');

    var currentReplyCard = null;

    function openEditModal(replyCard) {
        currentReplyCard = replyCard;

        var postRef = replyCard.querySelector('.reply-post-ref strong');
        var content = replyCard.querySelector('.reply-content');

        if (postRef) editPostTitle.textContent = postRef.textContent;
        if (content) editContent.value = content.textContent;

        editModal.classList.add('active');
        editOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeEditModal() {
        editModal.classList.remove('active');
        editOverlay.classList.remove('active');
        document.body.style.overflow = '';
        currentReplyCard = null;
    }

    // Edit buttons
    var editBtns = document.querySelectorAll('.reply-action.edit');

    editBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var card = this.closest('.reply-card');
            if (card) {
                openEditModal(card);
            }
        });
    });

    // Close modal events
    if (editClose) {
        editClose.addEventListener('click', closeEditModal);
    }

    if (editCancel) {
        editCancel.addEventListener('click', closeEditModal);
    }

    if (editOverlay) {
        editOverlay.addEventListener('click', closeEditModal);
    }

    // Save Edit
    if (editSave) {
        editSave.addEventListener('click', function() {
            var newContent = editContent.value.trim();

            if (!newContent) {
                alert('Please write your reply before saving.');
                return;
            }

            if (newContent.length < 20) {
                alert('Please write a more detailed reply (at least 20 characters).');
                return;
            }

            if (currentReplyCard) {
                var contentEl = currentReplyCard.querySelector('.reply-content');
                if (contentEl) {
                    contentEl.textContent = newContent;
                }
            }

            alert('✅ Reply updated successfully!');
            closeEditModal();
        });
    }

 
    var deleteBtns = document.querySelectorAll('.reply-action.delete');

    deleteBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this reply?')) {
                var card = this.closest('.reply-card');
                if (card) {
                    card.style.transition = '0.3s';
                    card.style.opacity = '0';
                    setTimeout(function() {
                        card.style.display = 'none';
                        updateCounts();
                        alert('🗑️ Reply deleted successfully!');
                    }, 300);
                }
            }
        });
    });

    function updateCounts() {
        var total = document.querySelectorAll('.reply-card:not([style*="display: none"])').length;
        var sent = document.querySelectorAll('.reply-status.sent').length;

        var totalBadge = document.querySelector('.stat-badge.total');
        var sentBadge = document.querySelector('.stat-badge.sent');

        if (totalBadge) {
            totalBadge.innerHTML = '<i class="bi bi-chat"></i> ' + total + ' Total';
        }
        if (sentBadge) {
            sentBadge.innerHTML = '<i class="bi bi-check-circle"></i> ' + sent + ' Sent';
        }
    }


    var pageBtns = document.querySelectorAll('.page-btn');
    var currentPage = 1;
    var itemsPerPage = 4;
    var totalItems = document.querySelectorAll('.reply-card').length;
    var totalPages = Math.ceil(totalItems / itemsPerPage);

    function showPage(page) {
        var cards = document.querySelectorAll('.reply-card');
        var start = (page - 1) * itemsPerPage;
        var end = start + itemsPerPage;

        cards.forEach(function(card, index) {
            card.style.display = (index >= start && index < end) ? '' : 'none';
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
        document.querySelectorAll('.reply-card').forEach(function(card) {
            card.style.display = '';
        });
        var prevBtn = document.querySelector('.page-btn.prev');
        var nextBtn = document.querySelector('.page-btn.next');
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
    }

    console.log('Psychologist Replies loaded');
});