

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
        menuBtn.addEventListener('click', openSidebar);
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSidebar();
        }
    });

    var resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 1024) {
                closeSidebar();
            }
        }, 200);
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
            localStorage.setItem('careconnect-theme', 'dark');
            if (themeBtn) {
                var icon = themeBtn.querySelector('i');
                if (icon) icon.className = 'bi bi-sun';
            }
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('careconnect-theme', 'light');
            if (themeBtn) {
                var icon = themeBtn.querySelector('i');
                if (icon) icon.className = 'bi bi-moon';
            }
        }
    }

    var savedTheme = localStorage.getItem('careconnect-theme');
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


    var counters = document.querySelectorAll('.counter');

    counters.forEach(function(counter) {
        var target = parseInt(counter.getAttribute('data-target'));
        var current = 0;
        var increment = Math.ceil(target / 50);

        function updateCounter() {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                return;
            }
            counter.textContent = current;
            setTimeout(updateCounter, 20);
        }

        updateCounter();
    });

   

    var searchInput = document.getElementById('mainSearch');

    if (searchInput) {
        searchInput.addEventListener('input', function() {
            var query = this.value.toLowerCase().trim();
            if (query.length > 2) {
                console.log('Searching:', query);
            }
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


    var readLinks = document.querySelectorAll('.reply-read-link');

    readLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Full reply will be shown here');
        });
    });

 

    var viewLinks = document.querySelectorAll('.post-view-link');

    viewLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            var item = this.closest('.post-item');
            if (item) {
                var title = item.querySelector('h4');
                if (title) {
                    alert('Viewing: ' + title.textContent.trim());
                }
            }
        });
    });


    var joinBtn = document.querySelector('.appt-buttons .appt-btn.primary');

    if (joinBtn) {
        joinBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Joining video consultation...');
        });
    }


    var cancelBtn = document.querySelector('.appt-buttons .cancel-appt');

    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            if (confirm('Cancel this appointment?')) {
                alert('Appointment cancelled');
            }
        });
    }



    var notifEntries = document.querySelectorAll('.notif-entry');

    notifEntries.forEach(function(item) {
        item.addEventListener('click', function() {
            this.classList.remove('unread');
            var title = this.querySelector('h4');
            var desc = this.querySelector('p');
            if (title && desc) {
                alert(title.textContent + '\n\n' + desc.textContent);
            }
        });
    });

    

    var editToggleBtn = document.getElementById('editToggleBtn');
    var saveProfileBtn = document.getElementById('saveProfileBtn');
    var cancelEditBtn = document.getElementById('cancelEditBtn');
    var editActions = document.getElementById('editActions');

    var bioText = document.getElementById('bioText');
    var bioEdit = document.getElementById('bioEdit');
    var infoValues = document.querySelectorAll('.info-val');
    var infoEdits = document.querySelectorAll('.info-edit');
    var displayName = document.getElementById('displayName');

    var isEditing = false;

    function toggleEditMode(enable) {
        isEditing = enable;

        if (editToggleBtn) {
            editToggleBtn.style.display = enable ? 'none' : 'inline-flex';
        }
        if (editActions) {
            editActions.style.display = enable ? 'flex' : 'none';
        }

        if (bioText) {
            bioText.style.display = enable ? 'none' : 'block';
        }
        if (bioEdit) {
            bioEdit.style.display = enable ? 'block' : 'none';
        }

        infoValues.forEach(function(el) {
            el.style.display = enable ? 'none' : 'inline';
        });
        infoEdits.forEach(function(el) {
            el.style.display = enable ? 'block' : 'none';
        });

        if (editToggleBtn && !enable) {
            editToggleBtn.innerHTML = '<i class="bi bi-pencil"></i> Edit Profile';
        }
    }

    if (editToggleBtn) {
        editToggleBtn.addEventListener('click', function() {
            toggleEditMode(true);
        });
    }

    if (cancelEditBtn) {
        cancelEditBtn.addEventListener('click', function() {
            bioEdit.value = bioText.textContent.trim();
            document.getElementById('editEmail').value = document.getElementById('infoEmail').textContent.trim();
            document.getElementById('editPhone').value = document.getElementById('infoPhone').textContent.trim();
            document.getElementById('editLocation').value = document.getElementById('infoLocation').textContent.trim();

            var genderText = document.getElementById('infoGender').textContent.trim();
            var genderSelect = document.getElementById('editGender');
            for (var i = 0; i < genderSelect.options.length; i++) {
                if (genderSelect.options[i].value === genderText) {
                    genderSelect.selectedIndex = i;
                    break;
                }
            }

            toggleEditMode(false);
        });
    }

    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', function() {
            bioText.textContent = bioEdit.value;
            document.getElementById('infoEmail').textContent = document.getElementById('editEmail').value;
            document.getElementById('infoPhone').textContent = document.getElementById('editPhone').value;
            document.getElementById('infoLocation').textContent = document.getElementById('editLocation').value;

            var genderSelect = document.getElementById('editGender');
            document.getElementById('infoGender').textContent = genderSelect.options[genderSelect.selectedIndex].value;

            var emailParts = document.getElementById('editEmail').value.split('@');
            if (emailParts.length > 0) {
                var nameParts = emailParts[0].split('.');
                var formattedName = nameParts.map(function(part) {
                    return part.charAt(0).toUpperCase() + part.slice(1);
                }).join(' ');
                displayName.textContent = formattedName || 'Nirdesh Tiwari';
            }

            var profileData = {
                name: displayName.textContent,
                email: document.getElementById('infoEmail').textContent,
                phone: document.getElementById('infoPhone').textContent,
                location: document.getElementById('infoLocation').textContent,
                gender: document.getElementById('infoGender').textContent,
                bio: bioText.textContent
            };
            localStorage.setItem('careconnect-profile', JSON.stringify(profileData));

            alert('✅ Profile updated successfully!');
            toggleEditMode(false);
        });
    }



    var savedProfile = localStorage.getItem('careconnect-profile');
    if (savedProfile) {
        try {
            var profile = JSON.parse(savedProfile);
            if (profile.name) document.getElementById('displayName').textContent = profile.name;
            if (profile.email) {
                document.getElementById('infoEmail').textContent = profile.email;
                document.getElementById('editEmail').value = profile.email;
            }
            if (profile.phone) {
                document.getElementById('infoPhone').textContent = profile.phone;
                document.getElementById('editPhone').value = profile.phone;
            }
            if (profile.location) {
                document.getElementById('infoLocation').textContent = profile.location;
                document.getElementById('editLocation').value = profile.location;
            }
            if (profile.gender) {
                document.getElementById('infoGender').textContent = profile.gender;
                var genderSelect = document.getElementById('editGender');
                for (var i = 0; i < genderSelect.options.length; i++) {
                    if (genderSelect.options[i].value === profile.gender) {
                        genderSelect.selectedIndex = i;
                        break;
                    }
                }
            }
            if (profile.bio) {
                document.getElementById('bioText').textContent = profile.bio;
                document.getElementById('bioEdit').value = profile.bio;
            }
        } catch(e) {
            console.log('Error loading profile');
        }
    }



    var uploadBtn = document.getElementById('uploadPhotoBtn');
    var photoInput = document.getElementById('photoInput');
    var profileAvatar = document.getElementById('profileAvatar');

    if (uploadBtn && photoInput) {
        uploadBtn.addEventListener('click', function() {
            photoInput.click();
        });

        photoInput.addEventListener('change', function(e) {
            var file = e.target.files[0];
            if (file) {
                if (file.size > 2 * 1024 * 1024) {
                    alert('Please upload an image smaller than 2MB.');
                    photoInput.value = '';
                    return;
                }

                if (!file.type.startsWith('image/')) {
                    alert('Please upload a valid image file.');
                    photoInput.value = '';
                    return;
                }

                var reader = new FileReader();
                reader.onload = function(e) {
                    profileAvatar.src = e.target.result;
                    localStorage.setItem('careconnect-avatar', e.target.result);
                    alert('✅ Profile photo updated successfully!');
                };
                reader.onerror = function() {
                    alert('Error reading file. Please try again.');
                };
                reader.readAsDataURL(file);
            }
        });
    }

    var savedAvatar = localStorage.getItem('careconnect-avatar');
    if (savedAvatar && profileAvatar) {
        profileAvatar.src = savedAvatar;
    }

 

    var msgBtns = document.querySelectorAll('.psych-item .msg-btn');

    msgBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            if (this.disabled) return;
            var item = this.closest('.psych-item');
            if (item) {
                var name = item.querySelector('h4');
                if (name) {
                    alert('💬 Messaging ' + name.textContent + '\nThis would open a chat window.');
                }
            }
        });
    });

  

    var postForm = document.getElementById('postForm');
    var postTitle = document.getElementById('postTitle');
    var postCategory = document.getElementById('postCategory');
    var postContent = document.getElementById('postContent');
    var titleCount = document.getElementById('titleCount');
    var contentCount = document.getElementById('contentCount');

    if (postTitle && titleCount) {
        postTitle.addEventListener('input', function() {
            var count = this.value.length;
            titleCount.textContent = count + '/100';
            titleCount.style.color = count > 100 ? '#EF4444' : '#999';
        });
    }

    if (postContent && contentCount) {
        postContent.addEventListener('input', function() {
            var count = this.value.length;
            contentCount.textContent = count + '/2000';
            contentCount.style.color = count > 2000 ? '#EF4444' : '#999';
        });
    }

    if (postForm) {
        postForm.addEventListener('submit', function(e) {
            e.preventDefault();

            var title = postTitle.value.trim();
            var category = postCategory.value;
            var content = postContent.value.trim();
            var privacy = document.querySelector('input[name="privacy"]:checked');
            var isAnonymous = privacy ? privacy.value === 'anonymous' : true;

            if (!title) {
                alert('Please enter a title.');
                postTitle.focus();
                return;
            }

            if (title.length > 100) {
                alert('Title must be 100 characters or less.');
                postTitle.focus();
                return;
            }

            if (!category) {
                alert('Please select a category.');
                postCategory.focus();
                return;
            }

            if (!content) {
                alert('Please write some content.');
                postContent.focus();
                return;
            }

            if (content.length > 2000) {
                alert('Content must be 2000 characters or less.');
                postContent.focus();
                return;
            }

            var newPost = {
                id: Date.now(),
                title: title,
                category: category,
                content: content,
                isAnonymous: isAnonymous,
                privacy: privacy ? privacy.value : 'anonymous',
                date: new Date().toISOString(),
                author: isAnonymous ? 'Anonymous' : 'Nirdesh',
                replies: 0,
                status: 'active'
            };

            var posts = JSON.parse(localStorage.getItem('careconnect-posts') || '[]');
            posts.unshift(newPost);
            localStorage.setItem('careconnect-posts', JSON.stringify(posts));

            alert('✅ Post published successfully!');

            postForm.reset();
            if (titleCount) titleCount.textContent = '0/100';
            if (contentCount) contentCount.textContent = '0/2000';

            loadRecentPosts();
            loadDashboardPosts();
            loadMyPosts();

            document.querySelector('.btn-submit').innerHTML = '<i class="bi bi-check-circle"></i> Posted!';
            setTimeout(function() {
                document.querySelector('.btn-submit').innerHTML = '<i class="bi bi-send"></i> Publish Post';
            }, 2000);
        });
    }

 

    function loadRecentPosts() {
        var postsList = document.getElementById('recentPostsList');
        if (!postsList) return;

        var posts = JSON.parse(localStorage.getItem('careconnect-posts') || '[]');
        var recentPosts = posts.slice(0, 5);

        if (recentPosts.length === 0) {
            postsList.innerHTML = `
                <div class="no-posts">
                    <i class="bi bi-inbox"></i>
                    <p>No posts yet. Create your first post!</p>
                </div>
            `;
            return;
        }

        var html = '';
        recentPosts.forEach(function(post) {
            var date = new Date(post.date);
            var dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            var statusClass = post.status === 'active' ? 'active' : (post.status === 'resolved' ? 'resolved' : 'pending');
            var statusLabel = post.status.charAt(0).toUpperCase() + post.status.slice(1);

            html += `
                <div class="recent-post-item">
                    <div class="post-info">
                        <h4>${post.title}</h4>
                        <span>${post.category} • ${dateStr} • ${post.replies || 0} replies</span>
                    </div>
                    <span class="post-status-small ${statusClass}">${statusLabel}</span>
                </div>
            `;
        });

        postsList.innerHTML = html;
    }

   

    function loadDashboardPosts() {
        var tableBody = document.querySelector('.post-table tbody');
        if (!tableBody) return;

        var posts = JSON.parse(localStorage.getItem('careconnect-posts') || '[]');
        var recentPosts = posts.slice(0, 4);

        if (recentPosts.length > 0) {
            var html = '';
            recentPosts.forEach(function(post) {
                var date = new Date(post.date);
                var dateStr = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
                var statusClass = post.status === 'active' ? 'active' : (post.status === 'resolved' ? 'resolved' : 'pending');
                var statusLabel = post.status.charAt(0).toUpperCase() + post.status.slice(1);
                var catClass = post.category.toLowerCase().replace(' ', '');

                html += `
                    <tr>
                        <td>${post.title}</td>
                        <td><span class="post-cat ${catClass}">${post.category}</span></td>
                        <td>${dateStr}</td>
                        <td><span class="post-status ${statusClass}">${statusLabel}</span></td>
                        <td>${post.replies || 0}</td>
                        <td><a href="#" class="post-view-link" data-id="${post.id}">View</a></td>
                    </tr>
                `;
            });
            tableBody.innerHTML = html;

            document.querySelectorAll('.post-view-link').forEach(function(link) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    alert('Viewing: ' + this.closest('tr').querySelector('td:first-child').textContent);
                });
            });
        }
    }


    function loadMyPosts() {
        var container = document.getElementById('myPostsContainer');
        if (!container) return;

        var posts = JSON.parse(localStorage.getItem('careconnect-posts') || '[]');

        if (posts.length === 0) {
            container.innerHTML = `
                <div class="no-posts">
                    <i class="bi bi-inbox"></i>
                    <p>No posts yet. Create your first post!</p>
                    <a href="create-post.html" class="edit-profile-btn" style="margin-top:10px;">
                        <i class="bi bi-plus"></i> Create Post
                    </a>
                </div>
            `;
            return;
        }

        var html = '';
        posts.forEach(function(post) {
            var date = new Date(post.date);
            var dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
            var timeStr = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            var statusClass = post.status === 'active' ? 'active' : (post.status === 'resolved' ? 'resolved' : 'pending');
            var statusLabel = post.status.charAt(0).toUpperCase() + post.status.slice(1);

            html += `
                <div class="post-card" data-id="${post.id}">
                    <div class="post-card-header">
                        <h3>${post.title}</h3>
                        <div class="post-actions">
                            <button class="edit-btn" onclick="editPost(${post.id})">
                                <i class="bi bi-pencil"></i> Edit
                            </button>
                            <button class="delete-btn" onclick="deletePost(${post.id})">
                                <i class="bi bi-trash"></i> Delete
                            </button>
                        </div>
                    </div>
                    <div class="post-card-meta">
                        <span class="post-cat ${post.category.toLowerCase().replace(' ', '')}">${post.category}</span>
                        <span>📅 ${dateStr} at ${timeStr}</span>
                        <span class="post-status ${statusClass}">${statusLabel}</span>
                        <span>${post.isAnonymous ? '🔒 Anonymous' : '👤 Public'}</span>
                    </div>
                    <div class="post-card-content">
                        ${post.content.length > 200 ? post.content.substring(0, 200) + '...' : post.content}
                    </div>
                    <div class="post-card-footer">
                        <span class="replies-count"><i class="bi bi-chat"></i> ${post.replies || 0} replies</span>
                        <span>${post.author}</span>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }



    window.editPost = function(postId) {
        var posts = JSON.parse(localStorage.getItem('careconnect-posts') || '[]');
        var post = posts.find(function(p) { return p.id === postId; });

        if (!post) {
            alert('Post not found!');
            return;
        }

        var newTitle = prompt('Edit Title:', post.title);
        if (newTitle !== null && newTitle.trim() !== '') {
            post.title = newTitle.trim();
        } else if (newTitle !== null && newTitle.trim() === '') {
            alert('Title cannot be empty.');
            return;
        }

        var newContent = prompt('Edit Content:', post.content);
        if (newContent !== null && newContent.trim() !== '') {
            post.content = newContent.trim();
        } else if (newContent !== null && newContent.trim() === '') {
            alert('Content cannot be empty.');
            return;
        }

        var newCategory = prompt('Edit Category (Anxiety, Depression, Stress, etc.):', post.category);
        if (newCategory !== null && newCategory.trim() !== '') {
            post.category = newCategory.trim();
        }

        localStorage.setItem('careconnect-posts', JSON.stringify(posts));
        alert('✅ Post updated successfully!');
        loadMyPosts();
        loadDashboardPosts();
        loadRecentPosts();
    };

   
    window.deletePost = function(postId) {
        if (!confirm('Are you sure you want to delete this post?')) return;

        var posts = JSON.parse(localStorage.getItem('careconnect-posts') || '[]');
        posts = posts.filter(function(p) { return p.id !== postId; });
        localStorage.setItem('careconnect-posts', JSON.stringify(posts));

        alert('🗑️ Post deleted successfully!');
        loadMyPosts();
        loadDashboardPosts();
        loadRecentPosts();
    };



    if (document.querySelector('.replies-container')) {

        // Mark as Read - Individual
        var markReadBtns = document.querySelectorAll('.mark-read-btn');

        markReadBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var card = this.closest('.reply-card');
                if (card) {
                    card.classList.remove('unread');

                    var statusBadge = card.querySelector('.reply-status');
                    if (statusBadge) {
                        statusBadge.className = 'reply-status read-badge';
                        statusBadge.textContent = 'Read';
                    }

                    this.style.display = 'none';
                    updateUnreadCount();
                    showToast('Marked as read ✓');
                }
            });
        });

        // View Full Reply
        var viewBtns = document.querySelectorAll('.view-reply-btn');

        viewBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var card = this.closest('.reply-card');
                if (card) {
                    var name = card.querySelector('.reply-info h4');
                    var text = card.querySelector('.reply-text');

                    if (name && text) {
                        alert('📝 Full Reply from ' + name.textContent + '\n\n' + text.textContent);
                    }
                }
            });
        });

        // Mark All as Read
        var markAllBtn = document.getElementById('markAllReadBtn');

        if (markAllBtn) {
            markAllBtn.addEventListener('click', function() {
                var unreadCards = document.querySelectorAll('.reply-card.unread');

                if (unreadCards.length === 0) {
                    showToast('No unread replies to mark');
                    return;
                }

                if (confirm('Mark all ' + unreadCards.length + ' replies as read?')) {
                    unreadCards.forEach(function(card) {
                        card.classList.remove('unread');

                        var statusBadge = card.querySelector('.reply-status');
                        if (statusBadge) {
                            statusBadge.className = 'reply-status read-badge';
                            statusBadge.textContent = 'Read';
                        }

                        var markBtn = card.querySelector('.mark-read-btn');
                        if (markBtn) {
                            markBtn.style.display = 'none';
                        }
                    });

                    updateUnreadCount();
                    showToast('✅ All replies marked as read');
                }
            });
        }

        // Update Unread Count
        function updateUnreadCount() {
            var unreadCards = document.querySelectorAll('.reply-card.unread');
            var unreadCount = unreadCards.length;

            var unreadBadge = document.querySelector('.unread-replies');
            if (unreadBadge) {
                unreadBadge.innerHTML = '<i class="bi bi-envelope"></i> ' + unreadCount + ' Unread';
                if (unreadCount === 0) {
                    unreadBadge.style.display = 'none';
                }
            }

            var totalReplies = document.querySelectorAll('.reply-card').length;
            var totalBadge = document.querySelector('.total-replies');
            if (totalBadge) {
                totalBadge.innerHTML = '<i class="bi bi-chat"></i> ' + totalReplies + ' Total';
            }
        }

        // Filter Functionality
        var filterStatus = document.getElementById('filterStatus');
        var filterPsych = document.getElementById('filterPsychologist');

        function filterReplies() {
            var status = filterStatus ? filterStatus.value : 'all';
            var psych = filterPsych ? filterPsych.value : 'all';

            var cards = document.querySelectorAll('.reply-card');

            cards.forEach(function(card) {
                var show = true;

                if (status === 'unread') {
                    if (!card.classList.contains('unread')) {
                        show = false;
                    }
                } else if (status === 'read') {
                    if (card.classList.contains('unread')) {
                        show = false;
                    }
                }

                if (psych !== 'all') {
                    var psychAttr = card.getAttribute('data-psych');
                    if (psychAttr !== psych) {
                        show = false;
                    }
                }

                card.style.display = show ? '' : 'none';
            });

            var visibleCards = document.querySelectorAll('.reply-card[style*="display: none"]');
            var visibleCount = cards.length - visibleCards.length;

            var container = document.querySelector('.replies-container');
            var noResults = container.querySelector('.no-results');

            if (visibleCount === 0) {
                if (!noResults) {
                    var msg = document.createElement('div');
                    msg.className = 'no-results';
                    msg.innerHTML = `
                        <i class="bi bi-inbox"></i>
                        <p>No replies found matching your filters</p>
                        <button class="clear-filters-btn" onclick="clearFilters()">Clear Filters</button>
                    `;
                    container.appendChild(msg);
                }
            } else {
                if (noResults) {
                    noResults.remove();
                }
            }
        }

        window.clearFilters = function() {
            if (filterStatus) filterStatus.value = 'all';
            if (filterPsych) filterPsych.value = 'all';
            filterReplies();
        };

        if (filterStatus) {
            filterStatus.addEventListener('change', filterReplies);
        }

        if (filterPsych) {
            filterPsych.addEventListener('change', filterReplies);
        }

        // Pagination
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

        // Toast Notification
        function showToast(message) {
            var existingToast = document.querySelector('.toast-message');
            if (existingToast) {
                existingToast.remove();
            }

            var toast = document.createElement('div');
            toast.className = 'toast-message';
            toast.textContent = message;
            toast.style.cssText = `
                position: fixed;
                bottom: 30px;
                left: 50%;
                transform: translateX(-50%);
                background: #1a1a2e;
                color: #fff;
                padding: 12px 24px;
                border-radius: 10px;
                font-weight: 500;
                font-size: 0.9rem;
                z-index: 9999;
                box-shadow: 0 8px 30px rgba(0,0,0,0.2);
                animation: slideUpToast 0.3s ease;
                font-family: 'Montserrat', sans-serif;
            `;

            if (document.body.classList.contains('dark-mode')) {
                toast.style.background = '#1E293B';
                toast.style.border = '1px solid #334155';
            }

            document.body.appendChild(toast);

            setTimeout(function() {
                toast.style.opacity = '0';
                toast.style.transition = '0.3s';
                setTimeout(function() {
                    toast.remove();
                }, 300);
            }, 2500);
        }

        // Toast Animation
        var style = document.createElement('style');
        style.textContent = `
            @keyframes slideUpToast {
                from {
                    transform: translateX(-50%) translateY(20px);
                    opacity: 0;
                }
                to {
                    transform: translateX(-50%) translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);

        // Clear Filters Styling
        var clearBtnStyle = document.createElement('style');
        clearBtnStyle.textContent = `
            .no-results {
                text-align: center;
                padding: 40px 20px;
                color: #999;
            }
            .no-results i {
                font-size: 3rem;
                display: block;
                margin-bottom: 10px;
                color: #ddd;
            }
            .no-results p {
                font-size: 1rem;
                margin-bottom: 12px;
            }
            .clear-filters-btn {
                background: #4F46E5;
                color: #fff;
                padding: 8px 20px;
                border-radius: 8px;
                font-weight: 600;
                font-size: 0.85rem;
                transition: 0.2s;
                font-family: 'Montserrat', sans-serif;
                cursor: pointer;
                border: none;
            }
            .clear-filters-btn:hover {
                background: #3730A3;
            }
            body.dark-mode .no-results {
                color: #94A3B8;
            }
            body.dark-mode .no-results i {
                color: #475569;
            }
            body.dark-mode .clear-filters-btn {
                background: #4F46E5;
            }
            body.dark-mode .clear-filters-btn:hover {
                background: #3730A3;
            }
        `;
        document.head.appendChild(clearBtnStyle);

        // Initialize - Update unread count
        updateUnreadCount();

        console.log('Replies page loaded successfully');
    }

    

    loadRecentPosts();
    loadDashboardPosts();
    loadMyPosts();

    console.log('CareConnect Dashboard loaded');
});




if (document.querySelector('.appt-grid')) {

   

    var bookNowBtns = document.querySelectorAll('.btn-book-now');

    bookNowBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var name = this.getAttribute('data-psych');
            openBookingModal(name);
        });
    });

    

    var bookBtn = document.getElementById('bookAppointmentBtn');

    if (bookBtn) {
        bookBtn.addEventListener('click', function() {
            openBookingModal(null);
        });
    }

   

    var bookingModal = document.getElementById('bookingModal');
    var bookingOverlay = document.getElementById('modalOverlay');
    var bookingClose = document.getElementById('modalClose');
    var bookingCancel = document.getElementById('modalCancel');
    var bookingBook = document.getElementById('modalBook');

    function openBookingModal(psychName) {
        bookingModal.classList.add('active');
        bookingOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        if (psychName) {
            var select = document.getElementById('modalPsych');
            for (var i = 0; i < select.options.length; i++) {
                if (select.options[i].value === psychName) {
                    select.selectedIndex = i;
                    break;
                }
            }
        }

        // Set default date to tomorrow
        var dateInput = document.getElementById('modalDate');
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var year = tomorrow.getFullYear();
        var month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        var day = String(tomorrow.getDate()).padStart(2, '0');
        dateInput.value = year + '-' + month + '-' + day;

        // Reset time dropdown
        document.getElementById('modalTime').value = '';
    }

    function closeBookingModal() {
        bookingModal.classList.remove('active');
        bookingOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (bookingClose) {
        bookingClose.addEventListener('click', closeBookingModal);
    }

    if (bookingCancel) {
        bookingCancel.addEventListener('click', closeBookingModal);
    }

    if (bookingOverlay) {
        bookingOverlay.addEventListener('click', closeBookingModal);
    }

    // ESC key to close
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeBookingModal();
            closeRescheduleModal();
        }
    });



    if (bookingBook) {
        bookingBook.addEventListener('click', function() {
            var psych = document.getElementById('modalPsych').value;
            var date = document.getElementById('modalDate').value;
            var time = document.getElementById('modalTime').value;
            var type = document.getElementById('modalType').value;

            if (!psych) {
                alert('Please select a psychologist.');
                return;
            }

            if (!date) {
                alert('Please select a date.');
                return;
            }

            if (!time) {
                alert('Please select a time.');
                return;
            }

            var dateObj = new Date(date);
            var dateStr = dateObj.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            var typeLabels = {
                'video': 'Video Consultation',
                'audio': 'Audio Consultation',
                'chat': 'Chat Consultation'
            };

            var appointment = {
                id: Date.now(),
                psychologist: psych,
                date: dateStr,
                time: time,
                type: typeLabels[type] || type,
                status: 'pending',
                createdAt: new Date().toISOString()
            };

            var appointments = JSON.parse(localStorage.getItem('careconnect-appointments') || '[]');
            appointments.push(appointment);
            localStorage.setItem('careconnect-appointments', JSON.stringify(appointments));

            alert('✅ Appointment booked with ' + psych + ' on ' + dateStr + ' at ' + time);
            closeBookingModal();
            location.reload();
        });
    }



    var reschedModal = document.getElementById('rescheduleModal');
    var reschedOverlay = document.getElementById('rescheduleOverlay');
    var reschedClose = document.getElementById('rescheduleClose');
    var reschedCancel = document.getElementById('rescheduleCancel');
    var reschedConfirm = document.getElementById('rescheduleConfirm');

    var currentReschedCard = null;

    function openRescheduleModal(card) {
        currentReschedCard = card;

        var name = card.querySelector('.appt-doctor h4');
        var infoRows = card.querySelectorAll('.info-row span');

        document.getElementById('reschedDoc').textContent = name ? name.textContent : 'Unknown';
        document.getElementById('reschedDate').textContent = infoRows[0] ? infoRows[0].textContent : 'N/A';
        document.getElementById('reschedTime').textContent = infoRows[1] ? infoRows[1].textContent : 'N/A';

        var dateInput = document.getElementById('reschedNewDate');
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var year = tomorrow.getFullYear();
        var month = String(tomorrow.getMonth() + 1).padStart(2, '0');
        var day = String(tomorrow.getDate()).padStart(2, '0');
        dateInput.value = year + '-' + month + '-' + day;

        document.getElementById('reschedNewTime').value = '';
        document.getElementById('reschedReason').value = '';

        reschedModal.classList.add('active');
        reschedOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeRescheduleModal() {
        reschedModal.classList.remove('active');
        reschedOverlay.classList.remove('active');
        document.body.style.overflow = '';
        currentReschedCard = null;
    }

    if (reschedClose) {
        reschedClose.addEventListener('click', closeRescheduleModal);
    }

    if (reschedCancel) {
        reschedCancel.addEventListener('click', closeRescheduleModal);
    }

    if (reschedOverlay) {
        reschedOverlay.addEventListener('click', closeRescheduleModal);
    }

    

    function initRescheduleButtons() {
        var btns = document.querySelectorAll('.btn-reschedule');
        btns.forEach(function(btn) {
            btn.removeEventListener('click', function() {});
            btn.addEventListener('click', function() {
                var card = this.closest('.appt-card');
                if (card) {
                    openRescheduleModal(card);
                }
            });
        });
    }

    initRescheduleButtons();

 

    if (reschedConfirm) {
        reschedConfirm.addEventListener('click', function() {
            var newDate = document.getElementById('reschedNewDate').value;
            var newTime = document.getElementById('reschedNewTime').value;
            var reason = document.getElementById('reschedReason').value.trim();

            if (!newDate) {
                alert('Please select a new date.');
                return;
            }

            if (!newTime) {
                alert('Please select a new time.');
                return;
            }

            if (!currentReschedCard) {
                alert('Error: No appointment selected.');
                return;
            }

            var dateObj = new Date(newDate);
            var dateStr = dateObj.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            var infoRows = currentReschedCard.querySelectorAll('.info-row span');
            if (infoRows.length >= 2) {
                infoRows[0].textContent = dateStr;
                infoRows[1].textContent = newTime;
            }

            var badge = currentReschedCard.querySelector('.appt-badge');
            if (badge) {
                badge.className = 'appt-badge rescheduled';
                badge.textContent = 'Rescheduled';
            }

            var name = currentReschedCard.querySelector('.appt-doctor h4');
            var msg = '✅ Appointment rescheduled!\n\n';
            msg += 'Doctor: ' + (name ? name.textContent : 'Unknown') + '\n';
            msg += 'New Date: ' + dateStr + '\n';
            msg += 'New Time: ' + newTime + '\n';
            if (reason) {
                msg += 'Reason: ' + reason;
            }
            alert(msg);

            closeRescheduleModal();
        });
    }

   

    var joinBtns = document.querySelectorAll('.btn-join');

    joinBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var card = this.closest('.appt-card');
            if (card) {
                var name = card.querySelector('.appt-doctor h4');
                if (name) {
                    alert('🎥 Joining meeting with ' + name.textContent);
                }
            }
        });
    });


    var cancelBtns = document.querySelectorAll('.btn-cancel');

    cancelBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            if (confirm('Cancel this appointment?')) {
                var card = this.closest('.appt-card');
                if (card) {
                    var name = card.querySelector('.appt-doctor h4');

                    var badge = card.querySelector('.appt-badge');
                    if (badge) {
                        badge.className = 'appt-badge cancelled';
                        badge.textContent = 'Cancelled';
                    }

                    var btns = card.querySelectorAll('.appt-btns button');
                    btns.forEach(function(b) {
                        b.style.display = 'none';
                    });

                    card.style.opacity = '0.6';

                    alert('❌ Appointment cancelled with ' + name.textContent);
                }
            }
        });
    });


    function loadAppointments() {
        var appointments = JSON.parse(localStorage.getItem('careconnect-appointments') || '[]');
        console.log('Appointments loaded:', appointments.length);

        // Update stats based on localStorage data
        var upcoming = appointments.filter(function(a) { return a.status === 'pending' || a.status === 'confirmed' || a.status === 'rescheduled'; }).length;
        var completed = appointments.filter(function(a) { return a.status === 'completed'; }).length;
        var cancelled = appointments.filter(function(a) { return a.status === 'cancelled'; }).length;

        var statNums = document.querySelectorAll('.stat-num');
        if (statNums.length >= 3) {
            statNums[0].textContent = upcoming || 3;
            statNums[1].textContent = completed || 12;
            statNums[2].textContent = cancelled || 2;
        }
    }

    loadAppointments();

    console.log('Appointments page loaded');
}



if (document.querySelector('.notif-list')) {

    

    var markAllBtn = document.getElementById('markAllReadBtn');

    if (markAllBtn) {
        markAllBtn.addEventListener('click', function() {
            var unread = document.querySelectorAll('.notif-card.unread');
            if (unread.length === 0) {
                alert('No unread notifications');
                return;
            }
            if (confirm('Mark all ' + unread.length + ' as read?')) {
                unread.forEach(function(card) {
                    card.classList.remove('unread');
                    var dot = card.querySelector('.notif-dot');
                    if (dot) dot.style.display = 'none';
                });
                updateStats();
                showToast('All marked as read ✅');
            }
        });
    }



    var cards = document.querySelectorAll('.notif-card');

    cards.forEach(function(card) {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.btn-view') || e.target.closest('.btn-dismiss') || e.target.closest('.notif-dot')) {
                return;
            }
            if (this.classList.contains('unread')) {
                this.classList.remove('unread');
                var dot = this.querySelector('.notif-dot');
                if (dot) dot.style.display = 'none';
                updateStats();
                showToast('Marked as read');
            }
        });
    });

   

    var dismissBtns = document.querySelectorAll('.btn-dismiss');

    dismissBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            var card = this.closest('.notif-card');
            if (card && confirm('Dismiss this notification?')) {
                card.style.transition = '0.3s';
                card.style.opacity = '0';
                setTimeout(function() {
                    card.style.display = 'none';
                    updateStats();
                    showToast('Dismissed');
                }, 300);
            }
        });
    });



    var viewBtns = document.querySelectorAll('.btn-view');

    viewBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            var card = this.closest('.notif-card');
            if (card) {
                if (card.classList.contains('unread')) {
                    card.classList.remove('unread');
                    var dot = card.querySelector('.notif-dot');
                    if (dot) dot.style.display = 'none';
                    updateStats();
                }
                var title = card.querySelector('.notif-head h4');
                var text = card.querySelector('.notif-body p');
                if (title && text) {
                    alert('📌 ' + title.textContent + '\n\n' + text.textContent);
                }
            }
        });
    });


    var filterBtns = document.querySelectorAll('.filter-btn');
    var filterType = document.getElementById('filterType');

    function applyFilters() {
        var activeFilter = document.querySelector('.filter-btn.active');
        var filter = activeFilter ? activeFilter.getAttribute('data-filter') : 'all';
        var type = filterType ? filterType.value : 'all';

        var cards = document.querySelectorAll('.notif-card');
        var visible = 0;

        cards.forEach(function(card) {
            var show = true;
            if (filter === 'unread' && !card.classList.contains('unread')) show = false;
            if (filter === 'read' && card.classList.contains('unread')) show = false;
            if (type !== 'all' && card.getAttribute('data-type') !== type) show = false;
            card.style.display = show ? '' : 'none';
            if (show) visible++;
        });

        document.getElementById('totalNotif').textContent = visible;
    }

    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            filterBtns.forEach(function(b) { b.classList.remove('active'); });
            this.classList.add('active');
            applyFilters();
        });
    });

    if (filterType) {
        filterType.addEventListener('change', applyFilters);
    }


    function updateStats() {
        var total = document.querySelectorAll('.notif-card:not([style*="display: none"])').length;
        var unread = document.querySelectorAll('.notif-card.unread:not([style*="display: none"])').length;
        document.getElementById('totalNotif').textContent = total;
        document.getElementById('unreadNotif').textContent = unread;
        document.getElementById('readNotif').textContent = total - unread;
    }

    

    var pageBtns = document.querySelectorAll('.page-btn');
    var currentPage = 1;
    var perPage = 5;
    var totalItems = document.querySelectorAll('.notif-card').length;
    var totalPages = Math.ceil(totalItems / perPage);

    function showPage(page) {
        var cards = document.querySelectorAll('.notif-card');
        var start = (page - 1) * perPage;
        var end = start + perPage;
        cards.forEach(function(card, i) {
            card.style.display = (i >= start && i < end) ? '' : 'none';
        });
        pageBtns.forEach(function(btn) {
            btn.classList.remove('active');
            if (parseInt(btn.textContent) === page) btn.classList.add('active');
        });
        var prev = document.querySelector('.page-btn.prev');
        var next = document.querySelector('.page-btn.next');
        if (prev) { prev.disabled = page === 1; prev.style.opacity = page === 1 ? '0.4' : '1'; }
        if (next) { next.disabled = page === totalPages; next.style.opacity = page === totalPages ? '0.4' : '1'; }
    }

    pageBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var num = parseInt(this.textContent);
            if (!isNaN(num)) { currentPage = num; showPage(currentPage); return; }
            if (this.classList.contains('prev') && currentPage > 1) { currentPage--; showPage(currentPage); }
            if (this.classList.contains('next') && currentPage < totalPages) { currentPage++; showPage(currentPage); }
        });
    });

    if (totalPages > 1) {
        showPage(1);
    } else {
        document.querySelectorAll('.notif-card').forEach(function(c) { c.style.display = ''; });
        document.querySelector('.page-btn.prev').style.display = 'none';
        document.querySelector('.page-btn.next').style.display = 'none';
    }

  

    function showToast(msg) {
        var old = document.querySelector('.toast-msg');
        if (old) old.remove();
        var toast = document.createElement('div');
        toast.className = 'toast-msg';
        toast.textContent = msg;
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

    updateStats();
    console.log('Notifications loaded');
}




if (document.querySelector('.settings-grid')) {


    var editBtns = document.querySelectorAll('.edit-btn');

    editBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var field = this.getAttribute('data-field');
            var row = this.closest('.setting-row');
            var span = row.querySelector('.setting-action span');

            if (span) {
                var current = span.textContent.trim();
                var newVal = prompt('Edit ' + field + ':', current);

                if (newVal !== null && newVal.trim() !== '') {
                    span.textContent = newVal.trim();
                    showToast('✅ ' + field + ' updated!');
                } else if (newVal !== null && newVal.trim() === '') {
                    alert('Value cannot be empty');
                }
            }
        });
    });

  

    var changePassBtn = document.getElementById('changePasswordBtn');

    if (changePassBtn) {
        changePassBtn.addEventListener('click', function() {
            var oldPass = prompt('Enter current password:');
            if (oldPass === null) return;

            var newPass = prompt('Enter new password:');
            if (newPass === null || newPass.trim() === '') {
                alert('Password cannot be empty');
                return;
            }

            var confirmPass = prompt('Confirm new password:');
            if (confirmPass === null) return;

            if (newPass !== confirmPass) {
                alert('Passwords do not match!');
                return;
            }

            if (newPass.length < 6) {
                alert('Password must be at least 6 characters');
                return;
            }

            showToast('✅ Password changed successfully!');
        });
    }



    var sessionsBtn = document.getElementById('manageSessionsBtn');

    if (sessionsBtn) {
        sessionsBtn.addEventListener('click', function() {
            alert('📱 Active Sessions\n\n' +
                  '1. Current Device - This device\n' +
                  '2. Chrome - Windows (2 days ago)\n' +
                  '3. Mobile App - Android (5 days ago)\n\n' +
                  'Click OK to logout all other sessions');
            if (confirm('Logout all other sessions?')) {
                showToast('✅ All other sessions logged out');
            }
        });
    }

   

    var toggles = document.querySelectorAll('.toggle input');

    toggles.forEach(function(toggle) {
        // Load saved state
        var id = toggle.id;
        var saved = localStorage.getItem('setting_' + id);
        if (saved !== null) {
            toggle.checked = saved === 'true';
        }

        // Save on change
        toggle.addEventListener('change', function() {
            localStorage.setItem('setting_' + this.id, this.checked);
            var label = this.closest('.setting-row').querySelector('h4');
            if (label) {
                console.log(label.textContent + ' changed to ' + (this.checked ? 'ON' : 'OFF'));
            }
        });
    });

  

    var darkModeToggle = document.getElementById('darkModeToggle');

    if (darkModeToggle) {
        // Load saved state
        var darkSaved = localStorage.getItem('careconnect-theme');
        darkModeToggle.checked = darkSaved === 'dark';

        // Sync with main theme button
        var themeBtn = document.getElementById('navThemeBtn');
        if (themeBtn) {
            themeBtn.addEventListener('click', function() {
                var isDark = document.body.classList.contains('dark-mode');
                if (darkModeToggle) {
                    darkModeToggle.checked = isDark;
                }
            });
        }

        darkModeToggle.addEventListener('change', function() {
            var isDark = this.checked;
            if (isDark) {
                document.body.classList.add('dark-mode');
                localStorage.setItem('careconnect-theme', 'dark');
                if (themeBtn) {
                    var icon = themeBtn.querySelector('i');
                    if (icon) icon.className = 'bi bi-sun';
                }
            } else {
                document.body.classList.remove('dark-mode');
                localStorage.setItem('careconnect-theme', 'light');
                if (themeBtn) {
                    var icon = themeBtn.querySelector('i');
                    if (icon) icon.className = 'bi bi-moon';
                }
            }
        });
    }

 

    var fontSizeSelect = document.getElementById('fontSizeSelect');

    if (fontSizeSelect) {
        var savedFont = localStorage.getItem('careconnect-font');
        if (savedFont) {
            fontSizeSelect.value = savedFont;
            applyFontSize(savedFont);
        }

        fontSizeSelect.addEventListener('change', function() {
            var size = this.value;
            localStorage.setItem('careconnect-font', size);
            applyFontSize(size);
            showToast('✅ Font size updated');
        });
    }

    function applyFontSize(size) {
        var sizes = {
            'small': '13px',
            'medium': '15px',
            'large': '18px'
        };
        document.body.style.fontSize = sizes[size] || '15px';
    }

 

    var languageSelect = document.getElementById('languageSelect');

    if (languageSelect) {
        var savedLang = localStorage.getItem('careconnect-lang');
        if (savedLang) {
            languageSelect.value = savedLang;
        }

        languageSelect.addEventListener('change', function() {
            localStorage.setItem('careconnect-lang', this.value);
            var langs = {
                'en': 'Language set to English',
                'np': 'भाषा नेपालीमा सेट गरियो',
                'hi': 'भाषा हिंदी में सेट की गई'
            };
            showToast('✅ ' + (langs[this.value] || 'Language updated'));
        });
    }

  

    var deleteBtn = document.getElementById('deleteAccountBtn');

    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            if (confirm('⚠️ WARNING: This will permanently delete your account and all data!\n\nAre you sure?')) {
                if (confirm('Type "DELETE" to confirm:')) {
                    var confirmText = prompt('Type DELETE to confirm:');
                    if (confirmText === 'DELETE') {
                        alert('Account deleted successfully');
                        window.location.href = 'logout.html';
                    } else {
                        alert('Deletion cancelled');
                    }
                }
            }
        });
    }

  

    var clearHistoryBtn = document.getElementById('clearHistoryBtn');

    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', function() {
            if (confirm('This will remove all your post and activity history.\n\nAre you sure?')) {
                localStorage.removeItem('careconnect-posts');
                localStorage.removeItem('careconnect-appointments');
                showToast('✅ History cleared successfully!');
            }
        });
    }

    

    var deactivateBtn = document.getElementById('deactivateBtn');

    if (deactivateBtn) {
        deactivateBtn.addEventListener('click', function() {
            if (confirm('Your account will be temporarily deactivated.\n\nYou can reactivate anytime by logging in.\n\nContinue?')) {
                alert('Account deactivated successfully');
                window.location.href = 'logout.html';
            }
        });
    }


    var saveAllBtn = document.getElementById('saveAllBtn');

    if (saveAllBtn) {
        saveAllBtn.addEventListener('click', function() {
            // Collect all settings
            var settings = {};

            // Toggles
            document.querySelectorAll('.toggle input').forEach(function(toggle) {
                settings[toggle.id] = toggle.checked;
            });

            // Selects
            document.querySelectorAll('.setting-select').forEach(function(select) {
                settings[select.id] = select.value;
            });

            // Text values
            document.querySelectorAll('.setting-action span').forEach(function(span) {
                var row = span.closest('.setting-row');
                var label = row ? row.querySelector('h4') : null;
                if (label) {
                    settings[label.textContent.trim()] = span.textContent.trim();
                }
            });

            localStorage.setItem('careconnect-settings', JSON.stringify(settings));

            showToast('✅ All settings saved successfully!');
            console.log('Settings saved:', settings);
        });
    }

  

    function loadSavedSettings() {
        var saved = localStorage.getItem('careconnect-settings');
        if (saved) {
            try {
                var settings = JSON.parse(saved);
                console.log('Loaded settings:', settings);
            } catch(e) {}
        }
    }

    loadSavedSettings();



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

    console.log('Settings page loaded');
}