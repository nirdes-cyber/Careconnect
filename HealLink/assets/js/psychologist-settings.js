/* ==========================================================
   Psychologist Settings - Complete JS
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
    // DARK MODE - SYNC WITH MAIN THEME
    // ==========================================================

    var themeBtn = document.getElementById('navThemeBtn');
    var darkModeToggle = document.getElementById('darkModeToggle');

    function setTheme(isDark) {
        if (isDark) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('psychologist-theme', 'dark');
            if (themeBtn) {
                var icon = themeBtn.querySelector('i');
                if (icon) icon.className = 'bi bi-sun';
            }
            if (darkModeToggle) {
                darkModeToggle.checked = true;
            }
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('psychologist-theme', 'light');
            if (themeBtn) {
                var icon = themeBtn.querySelector('i');
                if (icon) icon.className = 'bi bi-moon';
            }
            if (darkModeToggle) {
                darkModeToggle.checked = false;
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
        if (darkModeToggle) {
            darkModeToggle.checked = true;
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
    // EDIT BUTTONS
    // ==========================================================

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

    // ==========================================================
    // CHANGE PASSWORD
    // ==========================================================

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

    // ==========================================================
    // MANAGE SESSIONS
    // ==========================================================

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

    // ==========================================================
    // TOGGLES - Save state
    // ==========================================================

    var toggles = document.querySelectorAll('.toggle input');

    toggles.forEach(function(toggle) {
        var id = toggle.id;
        var saved = localStorage.getItem('setting_' + id);
        if (saved !== null) {
            toggle.checked = saved === 'true';
        }

        toggle.addEventListener('change', function() {
            localStorage.setItem('setting_' + this.id, this.checked);
            var label = this.closest('.setting-row').querySelector('h4');
            if (label) {
                console.log(label.textContent + ' changed to ' + (this.checked ? 'ON' : 'OFF'));
            }
        });
    });

    // ==========================================================
    // DARK MODE TOGGLE (Sync with main theme)
    // ==========================================================

    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            var isDark = this.checked;
            setTheme(isDark);
        });
    }

    // ==========================================================
    // FONT SIZE
    // ==========================================================

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

    // ==========================================================
    // LANGUAGE
    // ==========================================================

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

    // ==========================================================
    // DEACTIVATE ACCOUNT
    // ==========================================================

    var deactivateBtn = document.getElementById('deactivateBtn');

    if (deactivateBtn) {
        deactivateBtn.addEventListener('click', function() {
            if (confirm('Your account will be temporarily deactivated.\n\nYou can reactivate anytime by logging in.\n\nContinue?')) {
                alert('Account deactivated successfully');
                window.location.href = 'logout.html';
            }
        });
    }

    // ==========================================================
    // CLEAR HISTORY
    // ==========================================================

    var clearHistoryBtn = document.getElementById('clearHistoryBtn');

    if (clearHistoryBtn) {
        clearHistoryBtn.addEventListener('click', function() {
            if (confirm('This will remove all your reply history.\n\nAre you sure?')) {
                localStorage.removeItem('careconnect-psychologist-replies');
                showToast('✅ History cleared successfully!');
            }
        });
    }

    // ==========================================================
    // DELETE ACCOUNT
    // ==========================================================

    var deleteBtn = document.getElementById('deleteAccountBtn');

    if (deleteBtn) {
        deleteBtn.addEventListener('click', function() {
            if (confirm('⚠️ WARNING: This will permanently delete your account and all data!\n\nAre you sure?')) {
                var confirmText = prompt('Type DELETE to confirm:');
                if (confirmText === 'DELETE') {
                    alert('Account deleted successfully');
                    window.location.href = 'logout.html';
                } else {
                    alert('Deletion cancelled');
                }
            }
        });
    }

    // ==========================================================
    // SAVE ALL SETTINGS
    // ==========================================================

    var saveAllBtn = document.getElementById('saveAllBtn');

    if (saveAllBtn) {
        saveAllBtn.addEventListener('click', function() {
            var settings = {};

            document.querySelectorAll('.toggle input').forEach(function(toggle) {
                settings[toggle.id] = toggle.checked;
            });

            document.querySelectorAll('.setting-select').forEach(function(select) {
                settings[select.id] = select.value;
            });

            document.querySelectorAll('.setting-action span').forEach(function(span) {
                var row = span.closest('.setting-row');
                var label = row ? row.querySelector('h4') : null;
                if (label) {
                    settings[label.textContent.trim()] = span.textContent.trim();
                }
            });

            localStorage.setItem('careconnect-psychologist-settings', JSON.stringify(settings));

            showToast('✅ All settings saved successfully!');
            console.log('Settings saved:', settings);
        });
    }

    // ==========================================================
    // LOAD SAVED SETTINGS
    // ==========================================================

    function loadSavedSettings() {
        var saved = localStorage.getItem('careconnect-psychologist-settings');
        if (saved) {
            try {
                var settings = JSON.parse(saved);
                console.log('Loaded settings:', settings);
            } catch(e) {}
        }
    }

    loadSavedSettings();

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

    console.log('Psychologist Settings loaded');
});