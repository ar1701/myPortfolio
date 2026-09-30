import React, { useState, useEffect } from 'react';
import { Camera, ChevronLeft, ChevronRight } from 'lucide-react';

const numberToWord = (num) => {
  const ones = ['','one','two','three','four','five','six','seven','eight','nine'];
  const tens = ['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
  const teens = ['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
  if (num < 10) return ones[num];
  if (num < 20) return teens[num - 10];
  return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? ones[num % 10] : '');
};

const checkImage = (src) => new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = reject;
    img.src = src;
});

const GlimpsesSection = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-scroll
    useEffect(() => {
        if (images.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [images.length]);

    const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
    const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

    useEffect(() => {
        let isMounted = true;
        const loadGlimpses = async () => {
            let foundImages = [];
            let num = 1;
            let consecutiveFailures = 0;
            const exts = ['jpeg', 'png', 'jpg', 'webp'];

            // Check up to 50 images sequentially
            while (consecutiveFailures < 3 && num <= 50) {
                const word = numberToWord(num);
                let found = false;
                for (let ext of exts) {
                    const src = `/assets/glimpses/${word}.${ext}`;
                    try {
                        await checkImage(src);
                        if (isMounted) {
                            foundImages.push(src);
                            // Update state progressively so images appear as they are found
                            setImages([...foundImages]);
                        }
                        found = true;
                        consecutiveFailures = 0;
                        break; // Stop checking other extensions for this number
                    } catch (e) {
                        // ignore and try next extension
                    }
                }
                if (!found) {
                    consecutiveFailures++;
                }
                num++;
            }
            if (isMounted) setLoading(false);
        };
        loadGlimpses();
        return () => { isMounted = false; };
    }, []);

    return (
        <div style={{ padding: '32px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <Camera size={24} color="var(--accent-primary)" />
                <h2 style={{ fontSize: '24px', fontWeight: 600, fontFamily: 'var(--font-heading)' }}>Glimpses</h2>
            </div>
            
            <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', lineHeight: 1.6 }}>
                A visual journey through events, experiences, and memorable moments.
            </p>

            {loading && images.length === 0 && (
                <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '20px 0' }}>
                    Scanning /public/assets/glimpses for images...
                </div>
            )}

            {!loading && images.length === 0 && (
                <div style={{ color: 'var(--text-muted)', fontStyle: 'italic', padding: '20px 0', border: '1px dashed var(--mat-border)', borderRadius: '8px', textAlign: 'center' }}>
                    No glimpses found. <br />
                    Add images to <code>public/assets/glimpses/</code> using names like <code>one.jpeg</code>, <code>two.png</code>, etc.
                </div>
            )}

            {images.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                    <div style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '700px',
                        aspectRatio: '16/10',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        border: '1px solid var(--mat-border)',
                        background: 'var(--bg-secondary)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                    }}>
                        <img 
                            key={images[currentIndex]} 
                            src={images[currentIndex]} 
                            alt={`Glimpse ${currentIndex + 1}`} 
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                animation: 'fadeIn 0.5s ease-in-out'
                            }}
                        />
                        <button 
                            onClick={prevImage}
                            style={{
                                position: 'absolute',
                                left: '16px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(0,0,0,0.6)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                backdropFilter: 'blur(4px)',
                                transition: 'background 0.2s'
                            }}
                            onMouseOver={e => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
                            onMouseOut={e => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button 
                            onClick={nextImage}
                            style={{
                                position: 'absolute',
                                right: '16px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'rgba(0,0,0,0.6)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                backdropFilter: 'blur(4px)',
                                transition: 'background 0.2s'
                            }}
                            onMouseOver={e => e.currentTarget.style.background = 'rgba(0,0,0,0.8)'}
                            onMouseOut={e => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {images.map((_, idx) => (
                            <div 
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                style={{
                                    width: idx === currentIndex ? '24px' : '8px',
                                    height: '8px',
                                    borderRadius: '4px',
                                    background: idx === currentIndex ? 'var(--accent-primary)' : 'var(--text-muted)',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        ))}
                    </div>
                    <style>{`
                        @keyframes fadeIn {
                            from { opacity: 0; transform: scale(1.02); }
                            to { opacity: 1; transform: scale(1); }
                        }
                    `}</style>
                </div>
            )}
        </div>
    );
};

export default GlimpsesSection;
