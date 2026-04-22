import React, { useState } from 'react';

// --- רכיבים פנימיים משותפים ---

const Disclaimer = () => (
  <p className="disclaimer-text" style={{
    fontFamily: '"Secular One", sans-serif', margin: '5px 0 0 0', fontSize: '0.78rem',
    fontWeight: 'normal', color: '#D8BFD8', maxWidth: '940px', lineHeight: '1.5', opacity: 0.7, textAlign: 'center'
  }}>
   יישומון זו הינו כלי עזר פרטי ואינו מוצר רשמי של שירותי בריאות כללית. המידע והחישובים המוצגים בו מבוססים על הערכות ופרשנות אישית של הסכמי השכר, ואין לראות בהם נתונים מחייבים או ייעוץ מקצועי. התוצאות בפועל עשויות להיות שונות. המידע הקובע והרשמי נמצא אך ורק בידי מחלקת משאבי אנוש והשכר בארגון.
  </p>
);

const BackButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
      title="חזרה לדף הבית"
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', width: 'fit-content' }}
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div style={{
        width: '50px', height: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', boxSizing: 'border-box',
        border: isHovered ? '2px solid #ffffff' : '1px solid rgba(216, 191, 216, 0.2)', 
        backgroundColor: isHovered ? '#2a293d' : '#1c1b29', 
        boxShadow: isHovered ? '0 8px 16px rgba(0,0,0,0.5)' : '0 2px 6px rgba(0,0,0,0.2)',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)', 
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={isHovered ? '#ffffff' : '#9CAF88'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}>
          <polyline points="11 18 17 12 11 6"></polyline>
        </svg>
      </div>
    </div>
  );
};

// --- הרכיב הראשי של הכותרת ---

const PageHeader = ({ title, subtitle, onBack }) => {
  return (
    <div className="header-card-wrapper" style={{ position: 'relative', width: '100%', maxWidth: '1000px', margin: '0 auto 40px auto' }}>
      
      {/* הגדרות עיצוב ייעודיות למובייל מוזרקות פנימה */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .header-card-wrapper { margin-top: 25px !important; margin-bottom: 30px !important; }
          .header-card { margin: 0 !important; padding: 25px 15px 10px 15px !important; background-color: #1c1b29 !important; background-image: none !important; }
          .header-pink-bar { height: 10px !important; }
          .header-card-wrapper .corner-action-btn { top: 3px !important; right: 15px !important; transform: scale(0.6) !important; transform-origin: top right !important; }
          .page-header-title { font-size: 2.0rem !important; margin-bottom: 5px !important; }
          .page-header-subtitle { font-size: 1.2rem !important; }
          .title-divider { margin-top: 10px !important; margin-bottom: 0px !important; }
          .disclaimer-text { font-size: 9.5px !important; line-height: 1.3 !important; margin-top: 10px !important; }
        }
      `}} />

      <div className="corner-action-btn" style={{ position: 'absolute', top: '5px', right: '25px', zIndex: 10 }}>
        <BackButton onClick={onBack} />
      </div>

      <div className="header-card" style={{ 
        backgroundColor: '#1c1b29', borderRadius: '24px', border: '1px solid rgba(216, 191, 216, 0.15)',
        width: '100%', boxSizing: 'border-box', padding: '45px 20px 25px 20px', display: 'flex', 
        flexDirection: 'column', alignItems: 'center', position: 'relative', 
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)', overflow: 'hidden' 
      }}>
        
        <div className="header-pink-bar" style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '20px', backgroundColor: '#D8BFD8', zIndex: 1 }} />

        <h1 className="page-header-title" style={{ fontFamily: '"Secular One", sans-serif', margin: '0 0 10px 0', fontSize: '2.8rem', fontWeight: 'bold', color: '#ffffff', position: 'relative', zIndex: 2 }}>
          {title}
        </h1>

        {subtitle && (
          <h2 className="page-header-subtitle" style={{ fontFamily: '"Secular One", sans-serif', margin: '0', fontSize: '1.4rem', fontWeight: 'bold', color: '#9CAF88', opacity: 0.9, textAlign: 'center', position: 'relative', zIndex: 2 }}>
            {subtitle}
          </h2>
        )}
      
        <div className="title-divider" style={{ alignSelf: 'stretch', margin: '20px -20px 15px -20px', height: '3px', backgroundColor: '#14141b', position: 'relative', zIndex: 2 }}></div>
        
        <Disclaimer />
      </div>
    </div>
  );
};

export default PageHeader;