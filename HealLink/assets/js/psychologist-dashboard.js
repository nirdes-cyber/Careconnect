/* ==========================================================
   Psychologist Dashboard - Complete JS
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
            closeVideoModal();
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

    // ==========================================================
    // COUNTER ANIMATION
    // ==========================================================

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

    // ==========================================================
    // VIEW POSTS - Reply Now / View Reply
    // ==========================================================

    var postActions = document.querySelectorAll('.post-action');

    postActions.forEach(function(action) {
        action.addEventListener('click', function(e) {
            e.preventDefault();
            var item = this.closest('.post-item');
            if (item) {
                var title = item.querySelector('.post-header h4');
                if (title) {
                    if (this.textContent.includes('Reply Now')) {
                        alert('✏️ Replying to: ' + title.textContent + '\n\nThis would open the reply form.');
                    } else {
                        alert('👁️ Viewing replies for: ' + title.textContent);
                    }
                }
            }
        });
    });

    // ==========================================================
    // APPOINTMENT BUTTONS - JOIN (Video Call)
    // ==========================================================

    var joinBtns = document.querySelectorAll('.join-btn');

    joinBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var item = this.closest('.appt-item');
            if (item) {
                var name = item.querySelector('.appt-info h4');
                if (name) {
                    openVideoModal(name.textContent);
                }
            }
        });
    });

    // ==========================================================
    // PREPARE BUTTONS
    // ==========================================================

    var prepareBtns = document.querySelectorAll('.prepare-btn');

    prepareBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var item = this.closest('.appt-item');
            if (item) {
                var name = item.querySelector('.appt-info h4');
                if (name) {
                    alert('📋 Preparing for session with ' + name.textContent + '\n\n- Review patient notes\n- Prepare discussion points\n- Set up consultation room');
                }
            }
        });
    });

    // ==========================================================
    // VIDEO SESSION MODAL
    // ==========================================================

    var videoModal = document.getElementById('videoModal');
    var videoOverlay = document.getElementById('videoModalOverlay');
    var videoClose = document.getElementById('videoModalClose');
    var localVideo = document.getElementById('localVideo');
    var muteBtn = document.getElementById('muteBtn');
    var videoOffBtn = document.getElementById('videoOffBtn');
    var endCallBtn = document.getElementById('endCallBtn');
    var shareBtn = document.getElementById('shareBtn');

    var isMuted = false;
    var isVideoOff = false;
    var stream = null;

    function openVideoModal(patientName) {
        videoModal.classList.add('active');
        videoOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';

        var title = videoModal.querySelector('.video-modal-header h3');
        if (title) {
            title.innerHTML = '<i class="bi bi-camera-video"></i> Video Consultation with ' + patientName;
        }

        resetControls();
        startCamera();
    }

    function closeVideoModal() {
        videoModal.classList.remove('active');
        videoOverlay.classList.remove('active');
        document.body.style.overflow = '';
        stopCamera();
        resetControls();
    }

    function startCamera() {
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert('⚠️ Your browser does not support camera access. Please use a modern browser.');
            showFallbackVideo();
            return;
        }

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(function(mediaStream) {
                stream = mediaStream;
                if (localVideo) {
                    localVideo.srcObject = mediaStream;
                    localVideo.style.display = 'block';
                }
                setTimeout(function() {
                    var remotePlaceholder = document.querySelector('.remote-placeholder');
                    if (remotePlaceholder) {
                        remotePlaceholder.innerHTML = '<i class="bi bi-person-circle" style="color:#10B981;"></i><p style="color:#34D399;">Patient connected</p><span style="color:#64748B;">Ready for session</span>';
                    }
                }, 2000);
            })
            .catch(function(err) {
                console.error('Camera error:', err);
                alert('⚠️ Camera/Microphone access denied. Please allow camera and microphone permissions.\n\nError: ' + err.message);
                showFallbackVideo();
            });
    }

    function showFallbackVideo() {
        if (localVideo) {
            localVideo.innerHTML = '<div style="text-align:center;color:#64748B;padding:30px;"><i class="bi bi-camera-video-off" style="font-size:2.5rem;display:block;margin-bottom:10px;color:#475569;"></i><p style="font-size:1rem;color:#94A3B8;">Camera access denied</p><p style="font-size:0.8rem;color:#64748B;">Please allow camera permissions in your browser settings</p></div>';
            localVideo.style.display = 'flex';
            localVideo.style.alignItems = 'center';
            localVideo.style.justifyContent = 'center';
            localVideo.style.background = '#0F172A';
        }
    }

    function stopCamera() {
        if (stream) {
            stream.getTracks().forEach(function(track) {
                track.stop();
            });
            stream = null;
        }
        if (localVideo) {
            localVideo.srcObject = null;
            if (localVideo.innerHTML.includes('camera-video-off')) {
                localVideo.innerHTML = '';
                var videoEl = document.createElement('video');
                videoEl.id = 'localVideo';
                videoEl.autoplay = true;
                videoEl.muted = true;
                localVideo.parentNode.replaceChild(videoEl, localVideo);
                localVideo = document.getElementById('localVideo');
            }
        }
    }

    function resetControls() {
        isMuted = false;
        isVideoOff = false;
        if (muteBtn) {
            muteBtn.classList.remove('muted');
            muteBtn.innerHTML = '<i class="bi bi-mic"></i>';
        }
        if (videoOffBtn) {
            videoOffBtn.classList.remove('off');
            videoOffBtn.innerHTML = '<i class="bi bi-camera-video"></i>';
        }
        var remotePlaceholder = document.querySelector('.remote-placeholder');
        if (remotePlaceholder) {
            remotePlaceholder.innerHTML = '<i class="bi bi-person-circle"></i><p>Patient is connecting...</p><span>Please wait</span>';
            remotePlaceholder.style.color = '#64748B';
        }
    }

    if (muteBtn) {
        muteBtn.addEventListener('click', function() {
            isMuted = !isMuted;
            if (stream) {
                stream.getAudioTracks().forEach(function(track) {
                    track.enabled = !isMuted;
                });
            }
            this.classList.toggle('muted');
            this.innerHTML = isMuted ? '<i class="bi bi-mic-mute"></i>' : '<i class="bi bi-mic"></i>';
        });
    }

    if (videoOffBtn) {
        videoOffBtn.addEventListener('click', function() {
            isVideoOff = !isVideoOff;
            if (stream) {
                stream.getVideoTracks().forEach(function(track) {
                    track.enabled = !isVideoOff;
                });
            }
            this.classList.toggle('off');
            this.innerHTML = isVideoOff ? '<i class="bi bi-camera-video-off"></i>' : '<i class="bi bi-camera-video"></i>';
        });
    }

    if (endCallBtn) {
        endCallBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to end this session?')) {
                closeVideoModal();
                alert('📞 Session ended successfully');
            }
        });
    }

    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.mediaDevices && navigator.mediaDevices.getDisplayMedia) {
                navigator.mediaDevices.getDisplayMedia({ video: true })
                    .then(function(screenStream) {
                        if (localVideo) {
                            localVideo.srcObject = screenStream;
                        }
                        alert('🖥️ Screen sharing started');
                    })
                    .catch(function(err) {
                        alert('Screen sharing cancelled or not supported');
                    });
            } else {
                alert('Screen sharing is not supported in this browser');
            }
        });
    }

    if (videoClose) {
        videoClose.addEventListener('click', function() {
            if (confirm('Are you sure you want to close the session?')) {
                closeVideoModal();
            }
        });
    }

    if (videoOverlay) {
        videoOverlay.addEventListener('click', function() {
            if (confirm('Are you sure you want to close the session?')) {
                closeVideoModal();
            }
        });
    }

    // ==========================================================
    // DETECT USER JOINING SESSION
    // ==========================================================

    function checkActiveSession() {
        var sessionData = localStorage.getItem('careconnect-active-session');
        if (sessionData) {
            try {
                var data = JSON.parse(sessionData);
                if (data.type === 'user-joining') {
                    showUserJoiningNotification(data.patient, data.doctor);
                }
            } catch(e) {
                console.log('Error parsing session data');
            }
        }
    }

    function showUserJoiningNotification(patientName, doctorName) {
        if (document.querySelector('.session-notification')) {
            return;
        }

        var notif = document.createElement('div');
        notif.className = 'session-notification';
        notif.style.cssText = 'position:fixed;top:80px;right:20px;background:#4F46E5;color:#fff;padding:16px 20px;border-radius:12px;z-index:999;box-shadow:0 8px 30px rgba(0,0,0,0.3);font-family:Montserrat,sans-serif;max-width:320px;animation:slideIn 0.3s ease;border:1px solid rgba(255,255,255,0.1);';
        notif.innerHTML = `
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
                <i class="bi bi-bell-fill" style="font-size:1.2rem;"></i>
                <strong style="font-size:0.9rem;">New Session Request</strong>
            </div>
            <p style="margin:5px 0;font-size:0.85rem;opacity:0.9;">${patientName} is waiting for you</p>
            <div style="display:flex;gap:8px;margin-top:10px;">
                <button onclick="acceptUserSession()" style="background:#10B981;color:#fff;border:none;padding:6px 18px;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.8rem;flex:1;">Accept</button>
                <button onclick="declineUserSession()" style="background:#EF4444;color:#fff;border:none;padding:6px 18px;border-radius:6px;cursor:pointer;font-weight:600;font-size:0.8rem;flex:1;">Decline</button>
            </div>
        `;
        document.body.appendChild(notif);

        if (!document.getElementById('notifStyle')) {
            var style = document.createElement('style');
            style.id = 'notifStyle';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100px); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .session-notification {
                    animation: slideIn 0.3s ease;
                }
            `;
            document.head.appendChild(style);
        }
    }

    window.acceptUserSession = function() {
        var notif = document.querySelector('.session-notification');
        if (notif) notif.remove();

        var sessionData = localStorage.getItem('careconnect-active-session');
        if (sessionData) {
            var data = JSON.parse(sessionData);
            openVideoModal(data.patient);
            setTimeout(function() {
                var remotePlaceholder = document.querySelector('.remote-placeholder');
                if (remotePlaceholder) {
                    remotePlaceholder.innerHTML = '<i class="bi bi-person-circle" style="color:#10B981;"></i><p style="color:#34D399;">Patient connected</p><span style="color:#64748B;">Session in progress</span>';
                }
            }, 1000);
        }
    };

    window.declineUserSession = function() {
        var notif = document.querySelector('.session-notification');
        if (notif) notif.remove();
        localStorage.removeItem('careconnect-active-session');
        alert('Session declined');
    };

    setInterval(checkActiveSession, 3000);
    setTimeout(checkActiveSession, 1000);

    // ==========================================================
    // QUICK ACTIONS
    // ==========================================================

    var quickItems = document.querySelectorAll('.quick-item');

    quickItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            var label = this.querySelector('h4');
            if (label) {
                console.log('Quick action: ' + label.textContent);
            }
        });
    });

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

    console.log('Psychologist Dashboard loaded');
});