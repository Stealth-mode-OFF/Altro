export function WebsiteThumbnail() {
  return (
    <div 
      className="relative w-full aspect-[2/1] overflow-hidden"
      style={{
        background: 'var(--background)',
      }}
    >
      {/* Background Image - Authentic Neapolitan Pizza */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1765652584214-ab9167622c8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Authentic Neapolitan pizza from wood-fired oven"
          className="w-full h-full object-cover object-center"
          style={{
            filter: 'brightness(0.88) contrast(1.1) saturate(1.15)',
          }}
        />
        
        {/* Premium gradient overlay - sophisticated depth */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 65% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 100%), linear-gradient(135deg, rgba(200,74,71,0.12) 0%, rgba(0,0,0,0.2) 50%, rgba(43,43,43,0.45) 100%)',
          }}
        />
        
        {/* Soft vignette */}
        <div 
          className="absolute inset-0"
          style={{
            boxShadow: 'inset 0 0 180px rgba(0,0,0,0.4)',
          }}
        />
      </div>

      {/* Content Overlay - Premium Layout */}
      <div className="relative h-full flex flex-col justify-between p-10 md:p-16 lg:p-20">
        {/* Top Left - Elegant Logo Card */}
        <div className="flex justify-start">
          <div 
            className="relative backdrop-blur-xl rounded-3xl px-12 py-7 transition-all duration-[var(--animation-duration-ultra-slow)] ease-[var(--ease-out-smooth)] hover:scale-[1.02]"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(250,249,246,0.9) 100%)',
              border: '1px solid rgba(255,255,255,0.4)',
              boxShadow: '0 16px 64px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.1)',
            }}
          >
            {/* Decorative corner accent */}
            <div 
              className="absolute top-0 left-0 w-16 h-16"
              style={{
                background: 'linear-gradient(135deg, var(--primary-soft) 0%, transparent 100%)',
                borderTopLeftRadius: '1.5rem',
              }}
            />
            
            {/* Decorative corner accent - bottom right */}
            <div 
              className="absolute bottom-0 right-0 w-12 h-12"
              style={{
                background: 'linear-gradient(-45deg, var(--accent-soft) 0%, transparent 100%)',
                borderBottomRightRadius: '1.5rem',
              }}
            />
            
            <h1 
              className="relative"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 600,
                color: 'var(--foreground)',
                letterSpacing: '0.02em',
                textShadow: '0 1px 3px rgba(0,0,0,0.05)',
              }}
            >
              Altro da Tony
            </h1>
            
            {/* Elegant decorative line */}
            <div 
              className="absolute bottom-4 left-12 right-12 h-[2px] rounded-full"
              style={{
                background: 'linear-gradient(to right, transparent 0%, var(--primary) 15%, var(--accent) 50%, var(--primary) 85%, transparent 100%)',
                opacity: 0.4,
              }}
            />
          </div>
        </div>

        {/* Bottom Center - Refined Subtitle Badge */}
        <div className="flex justify-center items-end">
          <div 
            className="relative backdrop-blur-lg rounded-full px-10 py-5 transition-all duration-[var(--animation-duration-slow)] ease-[var(--ease-out-smooth)] hover:-translate-y-1"
            style={{
              background: 'linear-gradient(to top, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.85) 100%)',
              border: '1px solid rgba(200,74,71,0.2)',
              boxShadow: '0 12px 48px rgba(0,0,0,0.2), 0 4px 12px rgba(200,74,71,0.15)',
            }}
          >
            {/* Subtle inner glow */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at center, var(--primary-soft) 0%, transparent 70%)',
              }}
            />
            
            <div className="relative flex items-center gap-4">
              {/* Minimalist Italian flag */}
              <div className="hidden md:flex items-center gap-0.5 opacity-70">
                <div className="w-1 h-7 rounded-full bg-[#009246]" />
                <div className="w-1 h-7 rounded-full bg-white" />
                <div className="w-1 h-7 rounded-full bg-[#CE2B37]" />
              </div>
              
              <p 
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                  fontWeight: 400,
                  color: 'var(--foreground)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                <span 
                  style={{ 
                    color: 'var(--primary)',
                    fontWeight: 500,
                  }}
                >
                  Italian Restaurant
                </span>
                {' '}
                <span style={{ color: 'var(--accent)', opacity: 0.5, fontWeight: 300 }}>·</span>
                {' '}
                <span style={{ opacity: 0.75 }}>Vinohrady</span>
                {' '}
                <span style={{ color: 'var(--accent)', opacity: 0.5, fontWeight: 300 }}>·</span>
                {' '}
                <span style={{ opacity: 0.75 }}>Prague</span>
              </p>
              
              {/* Location pin - refined */}
              <svg 
                width="16" 
                height="16" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor"
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="hidden md:block"
                style={{ 
                  color: 'var(--primary)',
                  opacity: 0.6,
                }}
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative accents - premium touches */}
      <div 
        className="absolute top-1/3 left-0 w-2 h-40 transition-opacity duration-1000"
        style={{
          background: 'linear-gradient(to bottom, transparent, var(--primary) 40%, var(--primary) 60%, transparent)',
          boxShadow: '0 0 24px var(--primary)',
          opacity: 0.5,
        }}
      />
      
      {/* Soft light accent - top right */}
      <div 
        className="absolute top-12 right-12 w-32 h-32 rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
          filter: 'blur(20px)',
        }}
      />

      {/* Bottom decorative element */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/3 h-1 rounded-full"
        style={{
          background: 'linear-gradient(to right, transparent, var(--accent), transparent)',
          opacity: 0.3,
        }}
      />
    </div>
  );
}