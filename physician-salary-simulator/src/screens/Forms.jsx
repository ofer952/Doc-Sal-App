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
        backgroundColor: isHovered ? '#1c1b29' : '#1C1B29', 
        borderRadius: '24px', 
        border: isHovered ? '1px solid rgba(216, 191, 216, 0.15)' : '1px solid transparent',
        padding: '5px 20px', 
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxSizing: 'border-box',
        width: '100%'
      }}
    >
      <div className="form-card-content" style={{ display: 'flex', alignItems: 'center', gap: '40px' }}> 
        <div className="form-card-icon" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          flexShrink: 0
        }}>
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke={isHovered ? '#ffffff' : '#9CAF88'} strokeWidth="1.0" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.3s ease' }}>
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
            margin: '5px 0px 0px 0px', 
            lineHeight: '0.8',
            color: isHovered ? '#ffffff' : themeColor, 
            fontSize: '1.2rem', 
            transition: 'color 0.3s ease' 
          }}> 
            {title}
          </h3>
          <p className="form-card-subtitle" style={{ 
            margin: '0px 0px 0px 0px',
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

          #forms-root h2,
          #forms-root h3 { font-size: 20px !important; }
         
          /* --- התאמות מובייל לכרטיסיית הטופס --- */
          .form-card {
            padding: 4px 10px !important; 
          }
          .form-card-content {
            gap: 20px !important; 
          }
          .form-card-icon svg {
            width: 28px !important; 
            height: 28px !important;
          }
          #forms-root .form-card-title {
            font-size: 1.05rem !important;
            margin: 0 !important;
            line-height: 0.6 !important;
            margin-top: 4px !important;
          }
          #forms-root .form-card-subtitle {
            font-size: 0.75rem !important; 
            margin: 0 !important; 
            margin-top: 0px !important; 
            margin-bottom: -3px !important; 
          }
        }
      `}} />

      <PageHeader 
        title="טפסים"
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