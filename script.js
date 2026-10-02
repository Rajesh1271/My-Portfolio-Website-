const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 240;
const currentFrame = index => `./video_frames/frame_${index.toString().padStart(6, '0')}.png`;

const images = [];

// Preload images
for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

// Initial draw
images[0].onload = () => {
    canvas.width = images[0].naturalWidth;
    canvas.height = images[0].naturalHeight;
    context.drawImage(images[0], 0, 0);
};

let currentFrameIndex = 0;

window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    
    // Calculate current scroll fraction
    const scrollFraction = Math.max(0, Math.min(1, scrollTop / maxScrollTop));
    
    // Determine which frame we should be on
    const frameIndex = Math.min(frameCount - 1, Math.floor(scrollFraction * frameCount));
    
    if (frameIndex !== currentFrameIndex) {
        requestAnimationFrame(() => {
            if (images[frameIndex].complete) {
                // Keep the canvas the same size and just update the image
                context.clearRect(0, 0, canvas.width, canvas.height);
                context.drawImage(images[frameIndex], 0, 0);
            }
        });
        currentFrameIndex = frameIndex;
    }
});

// Freelance Button Functionality
const FREELANCE_EMAIL = "rm1279269@gmail.com";

const freelanceBtns = document.querySelectorAll('#freelance-btn, .available-btn');
freelanceBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const subject = "Freelance Project Inquiry";
        const body = `Hello,\n\nI'm interested in working with you on a freelance project.\n\nProject details:\n[Please describe your project here]\n\nThank you.`;
        
        const gmailUrl =
          "https://mail.google.com/mail/?view=cm&fs=1" +
          "&to=" + encodeURIComponent(FREELANCE_EMAIL) +
          "&su=" + encodeURIComponent(subject) +
          "&body=" + encodeURIComponent(body);
        
        const newWindow = window.open(gmailUrl, "_blank", "noopener,noreferrer");
        
        // Fallback to mailto link if popup is blocked
        if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
            window.location.href = 
              "mailto:" + 
              encodeURIComponent(FREELANCE_EMAIL) + 
              "?subject=" + 
              encodeURIComponent(subject) + 
              "&body=" + 
              encodeURIComponent(body);
        }
    });
});
