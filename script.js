function Clock() {
    const clockElement = document.getElementById("clock");
    const now = new Date();
    const options = { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit", second: "2-digit" };
    const timeArray = new Intl.DateTimeFormat("en-US", options).format(now).split(':');
    
    clockElement.innerHTML = `
        <span class="clock-hours">${timeArray[0]}</span>:
        <span class="clock-minutes">${timeArray[1]}</span>:
        <span class="clock-seconds">${timeArray[2]}</span>
    `;
}

setInterval(Clock, 1000);
Clock();

document.addEventListener('DOMContentLoaded', () => {
    gsap.from(".profile-pic-frame", {
      duration: 1.5,
      opacity: 0,
      y: -50, 
      ease: "power4.out",
    });
  
    gsap.from(".username", {
      duration: 1.5,
      opacity: 0,
      x: -100, 
      ease: "power4.out",
      delay: 0.5,
    });
  
    gsap.from(".quote", {
      duration: 1.5,
      opacity: 0,
      y: 50, 
      ease: "power4.out",
      delay: 1,
    });
  
    gsap.from(".description-text", {
      duration: 1.5,
      opacity: 0,
      y: 30, 
      ease: "power4.out",
      delay: 2.5,
    });
  
    gsap.from(".skills-icons .icon", {
      duration: 1,
      opacity: 0,
      y: 50, 
      stagger: 0.2,
      ease: "power4.out",
      delay: 3,
    });
  
    gsap.from(".gallery-section", {
      duration: 1.5,
      opacity: 0,
      y: 50, 
      ease: "power4.out",
      delay: 3.5,
    });
  
    const profileFrame = document.querySelector('.profile-pic-frame');
    let isAlternateImage = false;

    profileFrame.addEventListener('click', () => {
        isAlternateImage = !isAlternateImage;
        if (isAlternateImage) {
            profileFrame.classList.add('show-alternate');
        } else {
            profileFrame.classList.remove('show-alternate');
        }
    });
});

function createParticles(e) {
    const profileFrame = e.currentTarget;
    const rect = profileFrame.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 35; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const angle = (Math.random() * Math.PI * 2);
        const distance = 70 + Math.random() * 150;

        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        particle.style.left = `${centerX}px`;
        particle.style.top = `${centerY}px`;
        particle.style.setProperty('--x', `${x}px`);
        particle.style.setProperty('--y', `${y}px`);
        
        const size = 2 + Math.random() * 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 1200);
    }
}

document.querySelector('.profile-pic-frame').addEventListener('click', createParticles);

document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', function(e) {

        document.querySelectorAll('.nav-button').forEach(btn => {
            btn.classList.remove('clicked');
        });
        
        this.classList.add('clicked');
        
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 400);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 40,
                density: {
                    enable: true,
                    value_area: 400
                }
            },
            color: {
                value: "#00ffff"
            },
            shape: {
                type: "circle"
            },
            opacity: {
                value: 0.5,
                random: false,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 2,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 100,
                color: "#00ffff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 4,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "bounce",
                bounce: true,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "attract"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                attract: {
                    distance: 150,
                    duration: 0.4,
                    speed: 5
                },
                grab: {
                    distance: 150,
                    line_linked: {
                        opacity: 0.8
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
});