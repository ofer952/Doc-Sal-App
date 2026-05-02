import React, { useState } from 'react';

// --- רכיב כפתור הבית ---

const HomeButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      title="חזרה לדף הבית"
      style={{ 
        cursor: 'pointer', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '48px', // רוחב קבוע לריבוע
        height: '48px', // גובה קבוע לריבוע
        borderRadius: '50px', // פינות מעוגלות של הריבוע
        backgroundColor: isHovered ? '#29273a' : '#1C1B29', // רקע שמתבהר בעדינות בריחוף
        border: '1px solid rgba(216, 191, 216, 0.15)',
        transition: 'background-color 0.2s ease'
      }}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
        <svg width="45" height="45" viewBox="0 0 24 24" fill="none" stroke={isHovered ? '#ffffff' : '#9CAF88'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}>
          <polyline points="11 18 17 12 11 6"></polyline>
        </svg>
    </div>
  );
};

// --- הרכיב הראשי של הכותרת ---

const PageHeader = ({ title, onBack }) => {
  return (
    <div className="header-card-wrapper" style={{ position: 'relative', width: '100%', maxWidth: '1000px', margin: '0 auto 40px auto' }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .header-card-wrapper { margin-top: 25px !important; margin-bottom: 30px !important; }
          .header-card { margin: 0 !important; padding: 15px 15px !important; background-color: #1c1b29 !important; }
          /* התאמת האייקון למובייל - שומר על מרכוז אנכי וקרוב יותר לקצה */
          .header-card .corner-home-btn { right: 0px !important; transform: translateY(-50%) scale(0.7) !important; }
          .page-header-title { font-size: 2.2rem !important; margin-bottom: 0 !important; }
        }
      `}} />

      <div className="header-card" style={{ 
        backgroundColor: '#1c1b29', 
        borderRadius: '24px', 
        border: '0px solid rgba(216, 191, 216, 0.15)',
        width: '100%', 
        boxSizing: 'border-box', 
        padding: '20px 20px', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        position: 'relative', 
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)', 
        overflow: 'hidden' /* הוחזר ל-hidden כי עכשיו הכל בתוך המסגרת */
      }}>
        
        {/* מיקום האייקון - בתוך הכרטיסייה, ממורכז אנכית בצד ימין */}
        <div className="corner-home-btn" style={{ 
          position: 'absolute', 
          top: '50%', 
          right: '15px', 
          transform: 'translateY(-50%)', /* הנוסחה למרכוז אנכי מושלם */
          zIndex: 10 
        }}>
          <HomeButton onClick={onBack} />
        </div>

        <h1 className="page-header-title" style={{ 
          fontFamily: '"Secular One", sans-serif', 
          margin: '0', 
          fontSize: '2.8rem', 
          fontWeight: 'bold', 
          color: '#ffffff', 
          position: 'relative', 
          zIndex: 2 
        }}>
          {title}
        </h1>
      </div>
    </div>
  );
};

export default PageHeader;