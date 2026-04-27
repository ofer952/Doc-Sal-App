import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Credit from '../components/Credit';
import WorkScheduleForm from '../components/WorkScheduleForm';

// --- רכיב: כרטיסיית טופס ---
const FormCard = ({ title, subtitle, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const themeColor = '#9CAF88';

  return (
    <div 
      className="form-card"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        backgroundColor: isHovered ? '#1c1b29' : '#14141b', 
        borderRadius: '20px', 
        border: isHovered ? '1px solid #ffffff' : '1px solid rgba(216, 191, 216, 0.15)', 
        padding: '5px 30px', 
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        transition: 'all 0.3s ease',
        boxSizing: 'border-box',
        width: '100%'
      }}
    >
      <div className="form-card-content" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}> 
        <div className="form-card-icon" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          flexShrink: 0
        }}>
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke={isHovered ? '#ffffff' : '#9CAF88'} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.3s ease' }}>
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        </div>
        
        {/* טקסטים */}
        <div style={{ textAlign: 'right' }}>
          <h3 className="form-card-title" style={{ 
            margin: '0', 
            lineHeight: '1.1',
            color: isHovered ? '#ffffff' : themeColor, 
            fontSize: '1.2rem', 
            transition: 'color 0.3s ease' 
          }}> 
            {title}
          </h3>
          <p className="form-card-subtitle" style={{ 
            margin: '-2px 0 0 0',
            color: isHovered ? '#ffffff' : '#D8BFD8', 
            fontSize: '0.85rem', 
            transition: 'color 0.3s ease' 
          }}> 
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};

const Forms = ({ onBack }) => {
  const [activeForm, setActiveForm] = useState(null);
  const bgMain = 'var(--app-bg)'; 
  const bgCard = '#1c1b29'; 
  const textLilac = '#D8BFD8'; 
  const themeColor = '#9CAF88';
  const fontArial = { fontFamily: '"Secular One", sans-serif' };

  if (activeForm === 'work-schedule') {
    return <WorkScheduleForm onBack={() => setActiveForm(null)} />;
  }

  return (
    <div id="forms-root" style={{ 
      ...fontArial, 
      direction: 'rtl', 
      padding: '40px 20px 0 20px',
      backgroundColor: bgMain, 
      minHeight: '100vh',
      color: textLilac,
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        #forms-root {
          --edge-margin: -30px;
          --edge-padding: 30px;
        }

        @media (max-width: 768px) {
          #forms-root {
            --edge-margin: -14px;
            --edge-padding: 14px;
            padding: 15px 10px !important; 
          }

          #forms-root h1 { font-size: 2.0rem !important; margin-bottom: 5px !important;}
          #forms-root h2,
          #forms-root h3 { font-size: 20px !important; }

          .disclaimer-text {
            font-size: 11px !important;
            line-height: 1.3 !important;
          }
         
          /* --- התאמות מובייל לכרטיסיית הטופס --- */
          .form-card {
            padding: 5px 15px !important; 
          }
          .form-card-content {
            gap: 12px !important; 
          }
          .form-card-icon svg {
            width: 32px !important; 
            height: 32px !important;
          }
          #forms-root .form-card-title {
            font-size: 1.05rem !important;
          }
          #forms-root .form-card-subtitle {
            font-size: 0.75rem !important; 
            margin-top: -4px !important;
          }
        }
      `}} />

      <PageHeader 
        title="טפסים" 
        subtitle="בחירת טופס למילוי" 
        onBack={onBack} 
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
        
        <FormCard 
          title="סידור עבודה"
          subtitle="טופס חכם"
          onClick={() => setActiveForm('work-schedule')}
        />
        
      </div>
      
      <Credit />
    </div>
  );
};

export default Forms;