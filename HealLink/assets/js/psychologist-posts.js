

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
            closeReplyModal();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSidebar();
            closeReplyModal();
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

   

    var replyModal = document.getElementById('replyModal');
    var replyOverlay = document.getElementById('replyModalOverlay');
    var replyClose = document.getElementById('replyModalClose');
    var replyCancel = document.getElementById('replyCancel');
    var replySend = document.getElementById('replySend');
    var replyContent = document.getElementById('replyContent');
    var replyPostTitle = document.getElementById('replyPostTitle');
    var replyPostContent = document.getElementById('replyPostContent');

    var currentPostId = null;

    function openReplyModal(postId) {
        var postCard = document.querySelector('.post-card[data-post="' + postId + '"]');
        if (!postCard) {
            alert('Post not found');
            return;
        }

        var title = postCard.querySelector('.post-title h3');
        var content = postCard.querySelector('.post-content');

        if (title) replyPostTitle.textContent = title.textContent;
        if (content) replyPostContent.textContent = content.textContent;

        currentPostId = postId;
        replyContent.value = '';

        replyModal.classList.add('active');
        replyOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeReplyModal() {
        replyModal.classList.remove('active');
        replyOverlay.classList.remove('active');
        document.body.style.overflow = '';
        currentPostId = null;
    }

    // Reply buttons
    var replyBtns = document.querySelectorAll('.btn-reply');

    replyBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var postId = this.getAttribute('data-post');
            openReplyModal(postId);
        });
    });

    // Close modal events
    if (replyClose) {
        replyClose.addEventListener('click', closeReplyModal);
    }

    if (replyCancel) {
        replyCancel.addEventListener('click', closeReplyModal);
    }

    if (replyOverlay) {
        replyOverlay.addEventListener('click', closeReplyModal);
    }

    // Send Reply
    if (replySend) {
        replySend.addEventListener('click', function() {
            var content = replyContent.value.trim();

            if (!content) {
                alert('Please write your reply before sending.');
                return;
            }

            if (content.length < 20) {
                alert('Please write a more detailed reply (at least 20 characters).');
                return;
            }

            // Update the post card status
            if (currentPostId) {
                var postCard = document.querySelector('.post-card[data-post="' + currentPostId + '"]');
                if (postCard) {
                    postCard.className = 'post-card replied';
                    var statusSpan = postCard.querySelector('.post-status');
                    if (statusSpan) {
                        statusSpan.textContent = 'Replied';
                        statusSpan.className = 'post-status replied';
                    }
                    var replyBtn = postCard.querySelector('.btn-reply');
                    if (replyBtn) {
                        replyBtn.textContent = 'View Reply';
                        replyBtn.className = 'btn-reply replied';
                    }
                    postCard.classList.remove('new', 'pending');
                }
            }

            // Save reply to localStorage
            var replies = JSON.parse(localStorage.getItem('careconnect-psychologist-replies') || '[]');
            replies.push({
                postId: currentPostId,
                content: content,
                date: new Date().toISOString(),
                psychologist: 'Dr. Jagadish Oli'
            });
            localStorage.setItem('careconnect-psychologist-replies', JSON.stringify(replies));

            alert('✅ Reply sent successfully!');
            closeReplyModal();
            location.reload();
        });
    }

  

    var filterBtns = document.querySelectorAll('.filter-btn');
    var filterCategory = document.getElementById('filterCategory');

    function applyFilters() {
        var activeFilter = document.querySelector('.filter-btn.active');
        var filter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
        var category = filterCategory ? filterCategory.value : 'all';

        var cards = document.querySelectorAll('.post-card');
        var visible = 0;

        cards.forEach(function(card) {
            var show = true;

            if (filter === 'new' && !card.classList.contains('new')) {
                show = false;
            } else if (filter === 'pending' && !card.classList.contains('pending')) {
                show = false;
            } else if (filter === 'replied' && !card.classList.contains('replied')) {
                show = false;
            }

            if (category !== 'all') {
                var cat = card.getAttribute('data-category');
                if (cat !== category) {
                    show = false;
                }
            }

            card.style.display = show ? '' : 'none';
            if (show) visible++;
        });

        var container = document.querySelector('.posts-container');
        var noResults = container.querySelector('.no-results-msg');

        if (visible === 0) {
            if (!noResults) {
                var msg = document.createElement('div');
                msg.className = 'no-results-msg';
                msg.innerHTML = `
                    <i class="bi bi-search" style="font-size:2.5rem;display:block;margin-bottom:8px;color:#ddd;"></i>
                    <p>No posts found matching your filters</p>
                    <button class="clear-filters-btn" onclick="clearPostsFilters()" style="background:#4F46E5;color:#fff;padding:6px 16px;border-radius:6px;font-weight:600;font-size:0.8rem;border:none;cursor:pointer;margin-top:8px;">Clear Filters</button>
                `;
                container.appendChild(msg);
            }
        } else {
            if (noResults) {
                noResults.remove();
            }
        }
    }

    window.clearPostsFilters = function() {
        filterBtns.forEach(function(btn) {
            btn.classList.remove('active');
            if (btn.getAttribute('data-filter') === 'all') {
                btn.classList.add('active');
            }
        });
        if (filterCategory) {
            filterCategory.value = 'all';
        }
        applyFilters();
    };

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            filterBtns.forEach(function(b) {
                b.classList.remove('active');
            });
            this.classList.add('active');
            applyFilters();
        });
    });

    if (filterCategory) {
        filterCategory.addEventListener('change', applyFilters);
    }

    

    function updateNewCount() {
        var newPosts = document.querySelectorAll('.post-card.new').length;
        var totalPosts = document.querySelectorAll('.post-card').length;

        var newBadge = document.querySelector('.stat-badge.new');
        var totalBadge = document.querySelector('.stat-badge.total');

        if (newBadge) {
            newBadge.innerHTML = '<i class="bi bi-envelope"></i> ' + newPosts + ' New';
        }
        if (totalBadge) {
            totalBadge.innerHTML = '<i class="bi bi-journal-text"></i> ' + totalPosts + ' Total';
        }
    }

    updateNewCount();

    console.log('Psychologist Posts loaded');
});