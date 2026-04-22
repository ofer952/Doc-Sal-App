import React, { useState } from 'react';

// רכיב הדיסקליימר האחיד
const Disclaimer = () => (
  <p className="disclaimer-text" style={{
    fontFamily: '"Secular One", sans-serif',
    margin: '0 auto 100px auto',
    fontSize: '0.8rem',
    fontWeight: 'normal',
    color: '#D8BFD8',
    maxWidth: '800px',
    lineHeight: '1.2',
    opacity: 0.7,
    textAlign: 'center'
  }}>
   יישומון זו הינו כלי עזר פרטי ואינו מוצר רשמי של שירותי בריאות כללית. המידע והחישובים המוצגים בו מבוססים על הערכות ופרשנות אישית של הסכמי השכר, ואין לראות בהם נתונים מחייבים או ייעוץ מקצועי. התוצאות בפועל עשויות להיות שונות. המידע הקובע והרשמי נמצא אך ורק בידי מחלקת משאבי אנוש והשכר בארגון.
  </p>
);

const FooterCredits = () => (
  <footer style={{ 
    marginTop: 'auto',
    textAlign: 'center', 
    opacity: 0.4,
    padding: '40px 0 20px 0', // רווח עליון מהאייקונים ורווח תחתון מקצה המסך
    width: '100%'
  }}>
    <p style={{ color: '#D8BFD8', fontSize: '0.8rem', letterSpacing: '0.5px', fontFamily: '"Secular One", sans-serif', margin: 0 }}>
      {new Date().getFullYear()} Created by Ofer Dahan
    </p>
  </footer>
);

// --- הרכיב החדש: כפתור ניווט חכם וקפיצי ---
const NavCard = ({ title, viewName, onNavigate, renderIcon }) => {
  const [isHovered, setIsHovered] = useState(false);
  const themeColor = '#9CAF88';

  return (
    <div 
      onClick={() => onNavigate(viewName)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', padding: '20px', textAlign: 'center', fontFamily: '"Secular One", sans-serif'
      }}
    >
      <div className="icon-circle" style={{
        width: '100px', height: '100px', borderRadius: '50%',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        marginBottom: '15px', boxSizing: 'border-box',
        
        /* --- השינויים של מצב העכבר (Hover) בדומה לכפתור חזור --- */
        border: isHovered ? '2px solid #ffffff' : '1px solid rgba(156, 175, 136, 0.2)', 
        backgroundColor: isHovered ? '#2a293d' : '#14141b', 
        boxShadow: isHovered ? '0 12px 24px rgba(0,0,0,0.4)' : '0 4px 12px rgba(0,0,0,0.1)',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)', 
        
        /* --- האנימציה הקפיצית --- */
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}>
        {/* העברת הצבע לאייקון בהתאם למצב העכבר */}
        {renderIcon(isHovered ? '#ffffff' : themeColor)}
      </div>
      <h2 style={{ 
        color: isHovered ? '#ffffff' : themeColor, 
        fontSize: '1.2rem', 
        margin: '0', 
        transition: 'color 0.2s ease' 
      }}>
        {title}
      </h2>
    </div>
  );
};

const Home = ({ onNavigate }) => {
  const themeColor = '#9CAF88';
  
  const titleStyle = {
    fontFamily: '"Secular One", sans-serif',
    color: '#ffffff',
    fontSize: '3.5rem',
    textAlign: 'center',
    marginBottom: '15px',
    letterSpacing: '0px'
  };

  const subtitleStyle = {
    fontFamily: '"Secular One", sans-serif',
    color: themeColor,
    textAlign: 'center',
    marginBottom: '25px',
    fontSize: '1.3rem',
    opacity: 0.9
  };

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      boxSizing: 'border-box',
      padding: '60px 20px 20px 20px',
      maxWidth: '900px', 
      margin: '0 auto', 
      direction: 'rtl' 
    }}>
      
      <header style={{ marginBottom: '20px' }}>
        <h1 style={titleStyle}>פורטל רופאים</h1>
        <p className="home-subtitle" style={subtitleStyle}>עבור רופאי משפחה בקופ"ח כללית</p>
        <Disclaimer />
      </header>

      <div className="icon-grid" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', gap: '0px' }}>
        
        {/* כפתור סימולטור שכר */}
        <NavCard 
          title="סימולטור שכר" 
          viewName="simulator" 
          onNavigate={onNavigate} 
          renderIcon={(color) => (
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}>
              <line x1="12" y1="20" x2="12" y2="10"></line>
              <line x1="18" y1="20" x2="18" y2="4"></line>
              <line x1="6" y1="20" x2="6" y2="16"></line>
            </svg>
          )} 
        />

        {/* כפתור מידע וזכויות */}
        <NavCard 
          title="מידע וזכויות" 
          viewName="info" 
          onNavigate={onNavigate} 
          renderIcon={(color) => (
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}>
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          )} 
        />

        {/* כפתור טפסים */}
        <NavCard 
          title="טפסים" 
          viewName="forms" 
          onNavigate={onNavigate} 
          renderIcon={(color) => (
            <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}>
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          )} 
        />

      </div>

      <FooterCredits />

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          h1 { 
            font-size: 2.2rem !important; 
            margin-top: 2px !important;
            margin-bottom: 4px !important;
          }
          .home-subtitle {
            margin-bottom: 8px !important; 
          }
          .disclaimer-text {
            text-align: center !important;
            margin: 5px 0 70px 0 !important;
            opacity: 0.6 !important;
            font-family: "Secular One", sans-serif !important;
            line-height: 1.2 !important;
            font-size: 0.60rem !important;
          }
          .icon-grid {
            flex-direction: row !important;
            flex-wrap: wrap !important;
            justify-content: center !important;
            gap: 14px !important;
          }
          .icon-circle {
            width: 60px !important;
            height: 60px !important;
          }
          .icon-circle svg {
            width: 30px !important;
            height: 30px !important;
          }
          h2 { font-size: 0.8rem !important; }
        }
      `}} />
    </div>
  );
};

export default Home;