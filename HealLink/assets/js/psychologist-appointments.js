

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
            closeVideoModal();
            closeRescheduleModal();
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeSidebar();
            closeVideoModal();
            closeRescheduleModal();
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



    var joinBtns = document.querySelectorAll('.btn-join');

    joinBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var patientName = this.getAttribute('data-patient') || 'Patient';
            openVideoModal(patientName);
        });
    });



    var cancelBtns = document.querySelectorAll('.btn-cancel');

    cancelBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            if (confirm('Are you sure you want to cancel this appointment?')) {
                var card = this.closest('.appt-card');
                if (card) {
                    var status = card.querySelector('.appt-status');
                    if (status) {
                        status.className = 'appt-status cancelled';
                        status.textContent = 'Cancelled';
                    }
                    // Disable buttons
                    var btns = card.querySelectorAll('.appt-btns button');
                    btns.forEach(function(b) {
                        b.style.display = 'none';
                    });
                    card.style.opacity = '0.5';
                    alert('❌ Appointment cancelled successfully');
                }
            }
        });
    });

   

    var viewNotesBtns = document.querySelectorAll('.btn-view-notes');

    viewNotesBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var card = this.closest('.appt-card');
            if (card) {
                var name = card.querySelector('.appt-patient h4');
                if (name) {
                    alert('📝 Session Notes for ' + name.textContent + '\n\nThis would open the session notes.');
                }
            }
        });
    });



    var reschedModal = document.getElementById('rescheduleModal');
    var reschedOverlay = document.getElementById('rescheduleOverlay');
    var reschedClose = document.getElementById('rescheduleClose');
    var reschedCancel = document.getElementById('rescheduleCancel');
    var reschedConfirm = document.getElementById('rescheduleConfirm');

    var currentReschedCard = null;

    function openRescheduleModal(card) {
        currentReschedCard = card;

        var name = card.querySelector('.appt-patient h4');
        var infoRows = card.querySelectorAll('.info-row span');
        var date = infoRows[0] ? infoRows[0].textContent : 'N/A';
        var time = infoRows[1] ? infoRows[1].textContent : 'N/A';

        document.getElementById('reschedPatient').textContent = name ? name.textContent : 'Unknown';
        document.getElementById('reschedDate').textContent = date;
        document.getElementById('reschedTime').textContent = time;

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

    // Reschedule buttons
    var reschedBtns = document.querySelectorAll('.btn-reschedule');

    reschedBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            var card = this.closest('.appt-card');
            if (card) {
                openRescheduleModal(card);
            }
        });
    });

    if (reschedClose) {
        reschedClose.addEventListener('click', closeRescheduleModal);
    }

    if (reschedCancel) {
        reschedCancel.addEventListener('click', closeRescheduleModal);
    }

    if (reschedOverlay) {
        reschedOverlay.addEventListener('click', closeRescheduleModal);
    }

    // Confirm Reschedule
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

            var status = currentReschedCard.querySelector('.appt-status');
            if (status) {
                status.className = 'appt-status pending';
                status.textContent = 'Rescheduled';
            }

            var name = currentReschedCard.querySelector('.appt-patient h4');
            var msg = '✅ Appointment rescheduled!\n\n';
            msg += 'Patient: ' + (name ? name.textContent : 'Unknown') + '\n';
            msg += 'New Date: ' + dateStr + '\n';
            msg += 'New Time: ' + newTime + '\n';
            if (reason) {
                msg += 'Reason: ' + reason;
            }
            alert(msg);

            closeRescheduleModal();
        });
    }

    console.log('Psychologist Appointments loaded');
});