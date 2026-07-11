/* ==========================================================
   Admin Settings - Complete JS
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
            localStorage.setItem('admin-theme', 'dark');
            if (themeBtn) {
                var icon = themeBtn.querySelector('i');
                if (icon) icon.className = 'bi bi-sun';
            }
            if (darkModeToggle) {
                darkModeToggle.checked = true;
            }
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('admin-theme', 'light');
            if (themeBtn) {
                var icon = themeBtn.querySelector('i');
                if (icon) icon.className = 'bi bi-moon';
            }
            if (darkModeToggle) {
                darkModeToggle.checked = false;
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
    // SELECTS - Save state
    // ==========================================================

    var selects = document.querySelectorAll('.setting-select');

    selects.forEach(function(select) {
        var id = select.id;
        var saved = localStorage.getItem('setting_' + id);
        if (saved !== null) {
            select.value = saved;
        }

        select.addEventListener('change', function() {
            localStorage.setItem('setting_' + this.id, this.value);
            var label = this.closest('.setting-row').querySelector('h4');
            if (label) {
                console.log(label.textContent + ' changed to ' + this.value);
            }
        });
    });

    // ==========================================================
    // CLEAR ALL DATA
    // ==========================================================

    var clearDataBtn = document.getElementById('clearAllDataBtn');

    if (clearDataBtn) {
        clearDataBtn.addEventListener('click', function() {
            if (confirm('⚠️ WARNING: This will permanently delete ALL platform data!\n\nThis includes:\n- All users\n- All psychologists\n- All posts\n- All replies\n- All appointments\n- All notifications\n\nAre you sure?')) {
                var confirmText = prompt('Type "CLEAR ALL" to confirm:');
                if (confirmText === 'CLEAR ALL') {
                    // Clear all localStorage data
                    localStorage.clear();
                    showToast('🗑️ All data cleared successfully!');
                    setTimeout(function() {
                        location.reload();
                    }, 1000);
                } else {
                    showToast('❌ Action cancelled');
                }
            }
        });
    }

    // ==========================================================
    // RESET SETTINGS
    // ==========================================================

    var resetBtn = document.getElementById('resetSettingsBtn');

    if (resetBtn) {
        resetBtn.addEventListener('click', function() {
            if (confirm('⚠️ This will reset all settings to default values.\n\nAre you sure?')) {
                var confirmText = prompt('Type "RESET" to confirm:');
                if (confirmText === 'RESET') {
                    // Reset toggles
                    document.querySelectorAll('.toggle input').forEach(function(toggle) {
                        if (toggle.id === 'darkModeToggle') {
                            toggle.checked = false;
                        } else {
                            toggle.checked = true;
                        }
                        localStorage.setItem('setting_' + toggle.id, toggle.checked);
                    });

                    // Reset selects
                    document.querySelectorAll('.setting-select').forEach(function(select) {
                        if (select.id === 'defaultLanguage') select.value = 'en';
                        else if (select.id === 'timeZone') select.value = 'Asia/Kathmandu';
                        else if (select.id === 'maxLoginAttempts') select.value = '5';
                        else if (select.id === 'reportThreshold') select.value = '5';
                        else if (select.id === 'accentColor') select.value = 'purple';
                        else if (select.id === 'sidebarBehavior') select.value = 'expanded';
                        localStorage.setItem('setting_' + select.id, select.value);
                    });

                    // Reset text fields
                    var siteName = document.querySelector('[data-field="siteName"]').closest('.setting-row').querySelector('.setting-action span');
                    var siteDesc = document.querySelector('[data-field="siteDesc"]').closest('.setting-row').querySelector('.setting-action span');
                    if (siteName) siteName.textContent = 'CareConnect';
                    if (siteDesc) siteDesc.textContent = 'Anonymous Mental Health Support';

                    showToast('✅ All settings reset to default!');
                } else {
                    showToast('❌ Action cancelled');
                }
            }
        });
    }

    // ==========================================================
    // DEACTIVATE SYSTEM
    // ==========================================================

    var deactivateBtn = document.getElementById('deactivateSystemBtn');

    if (deactivateBtn) {
        deactivateBtn.addEventListener('click', function() {
            if (confirm('⚠️ This will temporarily deactivate the entire platform.\n\nUsers will not be able to access the system.\n\nAre you sure?')) {
                var confirmText = prompt('Type "DEACTIVATE" to confirm:');
                if (confirmText === 'DEACTIVATE') {
                    showToast('🔒 System deactivated successfully!');
                    // In a real system, this would update a database flag
                } else {
                    showToast('❌ Action cancelled');
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

            localStorage.setItem('careconnect-admin-settings', JSON.stringify(settings));

            showToast('✅ All settings saved successfully!');
            console.log('Settings saved:', settings);
        });
    }

    // ==========================================================
    // LOAD SAVED SETTINGS
    // ==========================================================

    function loadSavedSettings() {
        var saved = localStorage.getItem('careconnect-admin-settings');
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

    console.log('Admin Settings loaded');
});