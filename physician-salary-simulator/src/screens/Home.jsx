import React, { useState } from 'react';
import Credit from '../components/Credit';

const Disclaimer = () => (
  <p className="disclaimer-text" style={{
    fontFamily: '"Secular One", sans-serif',
    margin: '0 auto 120px auto',
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

const NavCard = ({ title, viewName, onNavigate, renderIcon }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // ==========================================
  // 🎛️ לוח בקרה לעיצוב הכרטיסייה (מחשב) 🎛️
  // ==========================================
  
  const cardWidth = '140px'; 
  const cardHeight = '140px'; 

  const iconDefaultColor = '#9CAF88'; 
  const iconHoverColor = '#ffffff';   

  const textDefaultColor = '#D8BFD8';
  const textHoverColor = '#D8BFD8';  
  
  // ==========================================

  return (
    <div 
      className="nav-card"
      onClick={() => onNavigate(viewName)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '20px', // הריווח במסכים גדולים
        cursor: 'pointer', 
        padding: '0px', 
        textAlign: 'center', 
        fontFamily: '"Secular One", sans-serif',
        backgroundColor: '#1c1b29', 
        borderRadius: '40px', // הפינות במסכים גדולים
        width: cardWidth,
        height: cardHeight,
        boxSizing: 'border-box',
        transition: 'all 0.3s ease'
      }}
    >
      <div className="icon-circle" style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        transform: isHovered ? 'scale(1.15)' : 'scale(1)', 
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 2.275)'
      }}>
        {renderIcon(isHovered ? iconHoverColor : iconDefaultColor)}
      </div>
      
      <h2 style={{ 
        color: isHovered ? textHoverColor : textDefaultColor, 
        fontSize: '1.0rem', 
        margin: '0px', 
        letterSpacing: '0px',
        transition: 'color 0.2s ease' 
      }}>
        {title}
      </h2>
    </div>
  );
};

const Home = ({ onNavigate }) => {
  
  const titleStyle = {
    fontFamily: '"Secular One", sans-serif',
    color: '#ffffff',
    fontSize: '4rem',
    textAlign: 'center',
    marginBottom: '20px',
    letterSpacing: '-1px'
  };

  const subtitleStyle = {
    fontFamily: '"Secular One", sans-serif',
    color: '#D8BFD8',
    textAlign: 'center',
    marginBottom: '45px',
    fontSize: '1.3rem',
    opacity: 0.7,
    letterSpacing: '0px'
  };

  return (
    <div style={{ backgroundColor: 'var(--app-bg)', minHeight: '100vh', width: '100%' }}>
      
      <div style={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        boxSizing: 'border-box',
        padding: '60px 20px 20px 20px',
        maxWidth: '900px', 
        margin: '0 auto', 
        direction: 'rtl',
      }}>
        
        <header style={{ marginBottom: '20px' }}>
          <h1 style={titleStyle}>פורטל רופאים</h1>
          <p className="home-subtitle" style={subtitleStyle}>עבור רופאי משפחה בקופ"ח כללית</p>
          <Disclaimer />
        </header>

        <div className="icon-grid" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', gap: '20px' }}>
          
          <NavCard 
            title="סימולטור שכר" 
            viewName="simulator" 
            onNavigate={onNavigate} 
            renderIcon={(color) => (
              <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}>
                <line x1="12" y1="20" x2="12" y2="10"></line>
                <line x1="18" y1="20" x2="18" y2="4"></line>
                <line x1="6" y1="20" x2="6" y2="16"></line>
              </svg>
            )} 
          />

          <NavCard 
            title="מידע וזכויות" 
            viewName="info" 
            onNavigate={onNavigate} 
            renderIcon={(color) => (
              <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}>
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
            )} 
          />

          <NavCard 
            title="טפסים" 
            viewName="forms" 
            onNavigate={onNavigate} 
            renderIcon={(color) => (
              <svg width="55" height="55" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}>
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            )} 
          />

        </div>

        <Credit />

        <style dangerouslySetInnerHTML={{__html: `
          @media (max-width: 768px) {
            h1 { 
              font-size: 2.6rem !important; 
              margin-top: 0px !important;
              margin-bottom: 8px !important;
            }
            .home-subtitle {
              margin-bottom: 30px !important;
              font-size: 1.0rem !important;  
            }
            .disclaimer-text {
              text-align: center !important;
              margin: 5px 0 40px 0 !important;
              opacity: 0.8 !important;
              font-family: "Secular One", sans-serif !important;
              line-height: 1.2 !important;
              font-size: 0.60rem !important;
            }
            .icon-grid {
              flex-direction: row !important;
              flex-wrap: wrap !important;
              justify-content: center !important;
              gap: 25px !important;
              margin-top: 80px !important;
            }
            /* התאמת הכרטיסיות החדשות למסך מובייל קטן */
            .nav-card {
              width: 80px !important;
              height: 80px !important; /* שליטה בגובה החלון במובייל */
              padding: 5px !important;
              border-radius: 20px !important; /* שליטה ברדיוס הפינות במובייל */
              gap: 10px !important; /* שליטה ברווח בין האייקון לטקסט במובייל */
            }
            .icon-circle svg {
              width: 35px !important;
              height: 35px !important;
            }
            .nav-card h2 { font-size: 0.7rem !important; }
          }
        `}} />
      </div>
    </div>
  );
};

export default Home;