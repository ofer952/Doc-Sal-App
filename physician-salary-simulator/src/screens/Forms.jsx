import React, { useState, useEffect, useRef } from 'react';
import PageHeader from '../components/PageHeader';

// --- פונקציות עזר לחישוב זמנים ---
const timeToDecimal = (t) => {
  if (!t) return 0;
  const parts = t.split(':');
  const h = parseInt(parts[0], 10) || 0;
  const m = parseInt(parts[1], 10) || 0;
  return h + (m / 60);
};

const decimalToTime = (d) => {
  if (!d || d === 0) return '';
  const h = Math.floor(d);
  const m = Math.round((d - h) * 60);
  return `${h}:${m.toString().padStart(2, '0')}`;
};

const calcDiff = (start, end) => {
  if (!start || !end) return 0;
  const diff = timeToDecimal(end) - timeToDecimal(start);
  return diff > 0 ? diff : 0;
};

const FooterCredits = () => (
  <footer style={{ 
    marginTop: 'auto',
    textAlign: 'center', 
    opacity: 0.4, 
    padding: '50px 0'  // כאן אתה שולט ברווח הקבוע מהקצה התחתון של המסך
  }}>
    <p style={{ color: '#D8BFD8', fontSize: '0.8rem', letterSpacing: '0.5px', fontFamily: '"Secular One", sans-serif', margin: 0 }}>
      {new Date().getFullYear()} Created by Ofer Dahan
    </p>
  </footer>
);

const BackButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
      title="חזרה לדף הבית"
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', width: 'fit-content'
      }}
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div style={{
        width: '50px', height: '50px', borderRadius: '50%',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        boxSizing: 'border-box',
        
        /* --- השינויים של מצב העכבר (Hover) --- */
        border: isHovered ? '2px solid #ffffff' : '1px solid rgba(216, 191, 216, 0.2)', 
        backgroundColor: isHovered ? '#2a293d' : '#1c1b29', 
        boxShadow: isHovered ? '0 8px 16px rgba(0,0,0,0.5)' : '0 2px 6px rgba(0,0,0,0.2)',
        transform: isHovered ? 'scale(1.1)' : 'scale(1)', 
        
        /* --- האנימציה הקפיצית --- */
        transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      }}>
        {/* אייקון חץ ימינה */}
        <svg 
          width="24" height="24"
          viewBox="0 0 24 24" fill="none" 
          stroke={isHovered ? '#ffffff' : '#9CAF88'} 
          strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          style={{ transition: 'stroke 0.2s ease' }} 
        >
          <polyline points="11 18 17 12 11 6"></polyline>
        </svg>
      </div>
    </div>
  );
};


// ==========================================
//        טופס סידור עבודה אינטראקטיבי
// ==========================================
const WorkScheduleForm = ({ onBack }) => {
  const themeColor = '#9CAF88';
  
  const [headerData, setHeaderData] = useState({
    idNumber: '1-123456',
    lastName: 'ישראלי',
    firstName: 'ישראל',
    clinic: 'רמת השקמה',
    jobPercent: '100%',
    frontalHours: '35',
    community: 'לא',
    nonFrontalHours: '4.5',
    selfStudyHours: '2.5',
    totalWorkHours: '42'
  });

  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri'];
  const dayLabels = { sun: "א'", mon: "ב'", tue: "ג'", wed: "ד'", thu: "ה'", fri: "ו'" };
  
  const initialSchedule = {
    morning: { sun: { start: '', end: '' }, mon: { start: '', end: '' }, tue: { start: '', end: '' }, wed: { start: '', end: '' }, thu: { start: '', end: '' }, fri: { start: '', end: '' } },
    afternoon: { sun: { start: '', end: '' }, mon: { start: '', end: '' }, tue: { start: '', end: '' }, wed: { start: '', end: '' }, thu: { start: '', end: '' }, fri: { start: '', end: '' } },
    training: { sun: { start: '', end: '' }, mon: { start: '', end: '' }, tue: { start: '', end: '' }, wed: { start: '', end: '' }, thu: { start: '', end: '' }, fri: { start: '', end: '' } },
    accompanying: { sun: { start: '', end: '' }, mon: { start: '', end: '' }, tue: { start: '', end: '' }, wed: { start: '', end: '' }, thu: { start: '', end: '' }, fri: { start: '', end: '' } },
    nonFrontal: { sun: { start: '', end: '' }, mon: { start: '', end: '' }, tue: { start: '', end: '' }, wed: { start: '', end: '' }, thu: { start: '', end: '' }, fri: { start: '', end: '' } },
    selfStudy: { sun: { start: '', end: '' }, mon: { start: '', end: '' }, tue: { start: '', end: '' }, wed: { start: '', end: '' }, thu: { start: '', end: '' }, fri: { start: '', end: '' } },
    community: { sun: { start: '', end: '' }, mon: { start: '', end: '' }, tue: { start: '', end: '' }, wed: { start: '', end: '' }, thu: { start: '', end: '' }, fri: { start: '', end: '' } },
    extra99: { sun: { start: '', end: '' }, mon: { start: '', end: '' }, tue: { start: '', end: '' }, wed: { start: '', end: '' }, thu: { start: '', end: '' }, fri: { start: '', end: '' } },
    management: { sun: { start: '', end: '' }, mon: { start: '', end: '' }, tue: { start: '', end: '' }, wed: { start: '', end: '' }, thu: { start: '', end: '' }, fri: { start: '', end: '' } }
  };

  const [schedule, setSchedule] = useState(initialSchedule);
  const [declarations, setDeclarations] = useState({ waiveFriday: false, selfStudyConfirm: true });
  const [showFridayInfo, setShowFridayInfo] = useState(false); // כפתור מידע נוסף ימי שישי
  const [showExtraInfo, setShowExtraInfo] = useState(false); // כפתור מידע נוסף רופא נלווה
  const [showCommunityInfo, setShowCommunityInfo] = useState(false); // כפתור מידע נוסף הסכם קהילה

  // ה-State החדש שמנהל את ה-Dropdown המעוצב שלנו
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [fridayReturn, setFridayReturn] = useState({
    day: '',
    start: '',
    end: ''
  });

  const handleHeaderChange = (field, value) => setHeaderData({ ...headerData, [field]: value });
  
  const handleTotalHoursChange = (value) => {
    const autoFillMapping = {
      '42': { frontalHours: '35', nonFrontalHours: '4.5', selfStudyHours: '2.5' },
      '40': { frontalHours: '34', nonFrontalHours: '3.5', selfStudyHours: '2.5' },
      '37.5': { frontalHours: '34', nonFrontalHours: '1.5', selfStudyHours: '2' },
      '35': { frontalHours: '32', nonFrontalHours: '1.5', selfStudyHours: '1.5' }
    };
    if (autoFillMapping[value]) {
      setHeaderData({ ...headerData, totalWorkHours: value, ...autoFillMapping[value] });
    } else {
      setHeaderData({ ...headerData, totalWorkHours: value });
    }
  };

  const handleTimeChange = (row, day, type, value) => {
    let digits = value.replace(/\D/g, '').slice(0, 4);
    let formatted = digits;
    if (digits.length >= 3) {
      formatted = `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
    }
    setSchedule({ ...schedule, [row]: { ...schedule[row], [day]: { ...schedule[row][day], [type]: formatted } } });
  };

  const handleTimeBlur = (row, day, type, value) => {
    if (!value) return; 
    let [h, m] = value.split(':');
    if (!m) m = '00'; 
    h = h.padStart(2, '0');
    m = m.padEnd(2, '0').slice(0, 2); 
    if (parseInt(h) > 23) h = '23';
    if (parseInt(m) > 59) m = '59';
    setSchedule({ ...schedule, [row]: { ...schedule[row], [day]: { ...schedule[row][day], [type]: `${h}:${m}` } } });
  };

  const handleFridayTimeChange = (type, value) => {
    let digits = value.replace(/\D/g, '').slice(0, 4);
    let formatted = digits;
    if (digits.length >= 3) {
      formatted = `${digits.slice(0, 2)}:${digits.slice(2, 4)}`;
    }
    setFridayReturn({...fridayReturn, [type]: formatted});
  };

  const handleFridayTimeBlur = (type, value) => {
    if (!value) return;
    let [h, m] = value.split(':');
    if (!m) m = '00';
    h = h.padStart(2, '0');
    m = m.padEnd(2, '0').slice(0, 2);
    if (parseInt(h) > 23) h = '23';
    if (parseInt(m) > 59) m = '59';
    setFridayReturn({...fridayReturn, [type]: `${h}:${m}`});
  };

  const getCellDiff = (row, day) => calcDiff(schedule[row][day].start, schedule[row][day].end);
  const getRowTotal = (row) => days.reduce((sum, day) => sum + getCellDiff(row, day), 0);
  const getDayFrontal = (day) => getCellDiff('morning', day) + getCellDiff('afternoon', day) + getCellDiff('training', day) + getCellDiff('accompanying', day);
  const getTotalFrontal = () => days.reduce((sum, day) => sum + getDayFrontal(day), 0);
  const getDayTotalCore = (day) => getDayFrontal(day) + getCellDiff('nonFrontal', day) + getCellDiff('selfStudy', day);
  const getTotalCore = () => days.reduce((sum, day) => sum + getDayTotalCore(day), 0);

  const timeLabelCell = (
    <td className="time-label-cell" style={{ border: '1px solid #555', padding: '4px', textAlign: 'center', fontSize: '0.6rem', verticalAlign: 'middle' }}>
      משעה
      <div style={{ borderTop: '1px dashed #888', margin: '4px 10px' }}></div>
      עד שעה
    </td>
  );

  const renderInputCell = (row, day) => (
    <td style={{ border: '1px solid #555', padding: '0px', textAlign: 'center', minWidth: '15px' }}>
      <input 
        type="text" 
        dir="ltr"
        placeholder="--:--"
        value={schedule[row][day].start} 
        onChange={(e) => handleTimeChange(row, day, 'start', e.target.value)}
        onBlur={(e) => handleTimeBlur(row, day, 'start', e.target.value)}
        onFocus={(e) => e.target.select()}
        className="time-input" 
        style={{ width: '100%', background: 'transparent', color: 'inherit', border: 'none', outline: 'none', textAlign: 'center', fontSize: '0.7rem', marginBottom: '2px' }} 
      />
      <div style={{ borderTop: '1px dashed #888', margin: '2px 10px' }}></div>
      <input 
        type="text" 
        dir="ltr"
        placeholder="--:--"
        value={schedule[row][day].end} 
        onChange={(e) => handleTimeChange(row, day, 'end', e.target.value)}
        onBlur={(e) => handleTimeBlur(row, day, 'end', e.target.value)}
        onFocus={(e) => e.target.select()}
        className="time-input" 
        style={{ width: '100%', background: 'transparent', color: 'inherit', border: 'none', outline: 'none', textAlign: 'center', fontSize: '0.7rem' }} 
      />
    </td>
  );

  return (
    <div className="printable-form" style={{ fontFamily: '"Secular One", sans-serif', color: '#D8BFD8', direction: 'rtl', padding: '20px' }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        ::selection {
          background-color: #9CAF88;
          color: #1c1b29;
        }
        ::-moz-selection {
          background-color: #9CAF88;
          color: #1c1b29;
        }
        .text-input { background: transparent; border: 1px solid rgba(216,191,216,0.3); color: #ffffff; border-radius: 6px; padding: 4px 8px; font-family: inherit; width: 90px; text-align: center; }
                  
        @media print {
          html, body, #root { 
            background: white !important; 
            background-color: white !important; 
            margin: 0 !important; 
            padding: 0 !important;
          }
          
          * { 
            box-shadow: none !important; 
            text-shadow: none !important;
          }
          
          div { background-color: transparent !important; }
          
          *, table, th, td, tr, span, p, div, input, select { color: black !important; }
          
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          tr[style*="D8BFD8"], tr[style*="D8BFD8"] th, tr[style*="D8BFD8"] td {
            background-color: #D8BFD8 !important;
          }

          .no-print { display: none !important; }
          
          input:not([type="checkbox"]), select { border: none !important; appearance: none; -webkit-appearance: none; -moz-appearance: none; padding: 0 !important; margin: 0 !important; height: auto !important; }

          .print-wrapper {
            overflow: visible !important;
            width: auto !important;
            display: block !important;
            padding: 0 !important;
          }

          .header-box { 
            border: none !important; 
            padding: 0 !important; 
            border-radius: 0 !important; 
            background: white !important;
            margin: 0 !important;
            min-width: 0 !important; 
            width: 100% !important;
            min-height: auto !important;
          }
          
          h1 { font-size: 16px !important; margin: 20px 0 20px 0 !important; border-bottom: 1px solid black !important; padding-bottom: 2px !important; letter-spacing: 2px !important; text-align: center !important; }
          
          .header-row { margin-bottom: 4px !important; gap: 15px !important; font-size: 13px !important; flex-wrap: nowrap !important; justify-content: flex-start !important; }
          .header-row > div { gap: 2px !important; white-space: nowrap !important; }
          .text-input { font-size: 13px !important; text-align: right !important; padding-right: 6px !important; border-bottom: 1px dotted #ccc !important; }
          
          table { border-collapse: collapse; width: 100% !important; font-size: 12px !important; margin-bottom: 5px !important; margin-top: 30px !important; table-layout: auto !important; }
          th, td { border: 1px solid black !important; padding: 1px 2px !important; }
          .printable-form table th { font-size: 12px !important; }
          .printable-form table tr td:first-child { font-size: 12px !important; }
          .time-input { font-size: 12px !important; margin-bottom: 0 !important; }
          .time-label-cell { font-size: 10px !important; }

          .notes-section { margin-top: 20px !important; font-size: 12px !important; line-height: 1.8 !important; }
          .notes-section p { margin: 4px 0 !important; }
          .notes-section > div { margin-top: 5px !important; }
          .signatures { margin-top: 20px !important; padding-top: 20px !important; font-size: 12px !important; }
          
          .notes-section .text-input { 
            width: 35px !important;
            display: inline-block !important;
            min-width: 0 !important;
            max-width: none !important;
            padding: 0 !important;
            margin: 0px 2px !important;
            height: auto !important;
            line-height: inherit !important;
            vertical-align: baseline !important;
          }

          /* העלמת חץ הדרופ-דאון, המסגרת ומרכוז הטקסט בהדפסה */
          div[style*="background-image"], 
          div[style*="backgroundImage"] {
            background-image: none !important;
            border: none !important;
            padding-left: 0 !important;
          }

          @page { size: A4 portrait; margin: 0; }
        }
      `}} />

      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <BackButton onClick={onBack} />
        <button onClick={() => window.print()} style={{
          backgroundColor: themeColor, color: '#14141b', border: 'none', padding: '10px 20px', borderRadius: '12px',
          fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(156, 175, 136, 0.3)'
        }}>
          <span>שמירה / הדפסה כ-PDF</span>
        </button>
      </div>

      <div className="print-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch', padding: '20px 0' }}>
        
        <div style={{ 
          width: '210mm',         
          minWidth: '210mm',      
          minHeight: 'auto',
          margin: '0 auto', 
          backgroundColor: '#1c1b29', 
          padding: '15mm',        
          borderRadius: '4px',    
          boxShadow: '0 20px 50px rgba(0,0,0,0.5)', 
          position: 'relative',
          boxSizing: 'border-box'
        }} className="header-box">
        
        <h1 style={{ textAlign: 'center', color: '#ffffff', margin: '0 0 20px 0', fontSize: '1.8rem', borderBottom: '2px solid #555', paddingBottom: '10px' }}>טופס סידור עבודה – רופאים</h1>
        
        <div className="header-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '20px', fontSize: '0.7rem' }}>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}><span>מס' אישי:</span><input className="text-input" onFocus={(e) => e.target.select()} value={headerData.idNumber} onChange={e=>handleHeaderChange('idNumber', e.target.value)} /></div>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}><span>שם משפחה:</span><input className="text-input" onFocus={(e) => e.target.select()} value={headerData.lastName} onChange={e=>handleHeaderChange('lastName', e.target.value)} /></div>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}><span>שם פרטי:</span><input className="text-input" onFocus={(e) => e.target.select()} value={headerData.firstName} onChange={e=>handleHeaderChange('firstName', e.target.value)} /></div>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}><span>מרפאה:</span><input className="text-input" onFocus={(e) => e.target.select()} value={headerData.clinic} onChange={e=>handleHeaderChange('clinic', e.target.value)} /></div>
        </div>
        
        <div className="header-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '20px', fontSize: '0.7rem' }}>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}><span>אחוז משרה:</span><input className="text-input" onFocus={(e) => e.target.select()} style={{ width:'35px'}} value={headerData.jobPercent} onChange={e=>handleHeaderChange('jobPercent', e.target.value)} /></div>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}><span>הסכם קהילה:</span><input className="text-input" onFocus={(e) => e.target.select()} style={{ width:'15px'}} value={headerData.community} onChange={e=>handleHeaderChange('community', e.target.value)} /></div>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}><span>שעות פרונטליות:</span><input className="text-input" onFocus={(e) => e.target.select()} style={{ width:'20px'}} value={headerData.frontalHours} onChange={e=>handleHeaderChange('frontalHours', e.target.value)} /></div>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}><span>שעות לא פרונטליות:</span><input className="text-input" onFocus={(e) => e.target.select()} style={{ width:'20px'}} value={headerData.nonFrontalHours} onChange={e=>handleHeaderChange('nonFrontalHours', e.target.value)} /></div>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}><span>השתלמות עצמית:</span><input className="text-input" onFocus={(e) => e.target.select()} style={{ width:'20px'}} value={headerData.selfStudyHours} onChange={e=>handleHeaderChange('selfStudyHours', e.target.value)} /></div>
        </div>
        
        <div className="header-row" style={{ display: 'flex', gap: '30px', marginBottom: '20px',  fontSize: '0.8rem', fontWeight: 'bold', color: '#ffffff' }}>
          <span style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            סה"כ שעות עבודה: 
            
            {/* רכיב ה-Dropdown המעוצב החדש */}
            <div style={{ position: 'relative' }}>
              <div 
                className="text-input"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{ 
                  width: '90px',
                  fontWeight: 'bold', 
                  backgroundColor: themeColor, 
                  color: '#1c1b29', 
                  fontSize: '0.8rem', 
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '24px', 
                  /* חץ משולב כרקע ישר בתוך הדיב */
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231c1b29' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'left 8px center',
                  backgroundSize: '14px',
                  paddingLeft: '20px',
                  boxSizing: 'border-box'
                }}
              >
                {headerData.totalWorkHours}
              </div>
              
              {/* רשימת האפשרויות הנפתחת */}
              {isDropdownOpen && (
                <div className="no-print" style={{
                  position: 'absolute',
                  top: '115%', // יורד קצת מתחת לכפתור
                  right: 0,
                  width: '100%',
                  backgroundColor: '#1c1b29',
                  border: `1px solid ${themeColor}`,
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  zIndex: 50, 
                  boxShadow: '0 8px 24px rgba(0,0,0,0.6)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  {['42', '40', '37.5', '35'].map(option => (
                    <div 
                      key={option}
                      onClick={() => {
                        handleTotalHoursChange(option);
                        setIsDropdownOpen(false); // סוגר אחרי הלחיצה
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = themeColor;
                        e.currentTarget.style.color = '#1c1b29';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      style={{
                        padding: '2px 0',
                        textAlign: 'center',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        color: '#ffffff',
                        transition: 'all 0.2s ease',
                        borderBottom: option !== '35' ? '1px solid rgba(216, 191, 216, 0.1)' : 'none'
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

          </span>
        </div>

        <div style={{ overflow: 'visible' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', color: '#D8BFD8', fontSize: '0.7rem', lineHeight: '1.5' }}>
            <thead>
              <tr style={{ backgroundColor: '#D8BFD8', color: '#1c1b29' }}>
                <th colSpan="2" style={{ border: '1px solid #555', padding: '8px', textAlign: 'right' }}></th>
                {days.map(d => <th key={d} style={{ border: '1px solid #555', padding: '2px', textAlign: 'center', width: '55px' }}>{dayLabels[d]}</th>)}
                <th style={{ border: '1px solid #555', padding: '4px', textAlign: 'center', width: '65px' }}>סה"כ שעות</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold'}}>*מרפאה - לפני הצהריים</td>{timeLabelCell}{days.map(d => renderInputCell('morning', d))}<td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{decimalToTime(getRowTotal('morning'))}</td></tr>
              <tr><td style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold'}}>*מרפאה - אחר הצהריים</td>{timeLabelCell}{days.map(d => renderInputCell('afternoon', d))}<td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{decimalToTime(getRowTotal('afternoon'))}</td></tr>
              <tr><td style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold'}}>השתלמות</td>{timeLabelCell}{days.map(d => renderInputCell('training', d))}<td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{decimalToTime(getRowTotal('training'))}</td></tr>
              <tr>
              <td style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold', position: 'relative' }}>
                <button 
                  className="no-print"
                  onClick={() => setShowExtraInfo(true)}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.transform = 'scale(1.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = themeColor; e.currentTarget.style.transform = 'scale(1)'; }}
                  style={{
                    position: 'absolute',
                    right: '-30px', 
                    top: '-15px',   
                    background: themeColor, 
                    color: '#1c1b29', 
                    border: 'none', 
                    borderRadius: '50%',
                    width: '22px', 
                    height: '22px', 
                    padding: '0',
                    boxSizing: 'border-box',
                    fontSize: '14px', 
                    fontWeight: 'bold',
                    cursor: 'pointer', 
                    display: 'inline-flex', 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    zIndex: 10
                  }}
                >
                  i
                </button>
                רופא נלווה
              </td>
              {timeLabelCell}
              {days.map(d => renderInputCell('accompanying', d))}
              <td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{decimalToTime(getRowTotal('accompanying'))}</td>
            </tr>
              
              <tr style={{ backgroundColor: '#D8BFD8', color: '#1c1b29' }}>
                <td colSpan="2" style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold' }}>סה"כ שעות פרונטליות</td>
                {days.map(d => <td key={d} style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{decimalToTime(getDayFrontal(d))}</td>)}
                <td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{decimalToTime(getTotalFrontal())}</td>
              </tr>

              <tr><td style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold'}}>שעות לא פרונטליות</td>{timeLabelCell}{days.map(d => renderInputCell('nonFrontal', d))}<td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{decimalToTime(getRowTotal('nonFrontal'))}</td></tr>
              <tr><td style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold'}}>שעות השתלמות עצמית</td>{timeLabelCell}{days.map(d => renderInputCell('selfStudy', d))}<td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{decimalToTime(getRowTotal('selfStudy'))}</td></tr>

              <tr style={{ backgroundColor: '#D8BFD8', color: '#1c1b29' }}>
                <td colSpan="2" style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold' }}>סה"כ פרונטלי, לא פרונטלי והשתלמות עצמית</td>
                {days.map(d => <td key={d} style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{decimalToTime(getDayTotalCore(d))}</td>)}
                <td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{decimalToTime(getTotalCore())}</td>
              </tr>

              <tr>
                <td style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold', position: 'relative' }}>
                  <button 
                    className="no-print"
                    onClick={() => setShowCommunityInfo(true)}
                    onMouseEnter={(e) => { 
                      e.currentTarget.style.backgroundColor = '#ffffff'; 
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; 
                    }}
                    onMouseLeave={(e) => { 
                      e.currentTarget.style.backgroundColor = themeColor; 
                      e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; 
                    }}
                    style={{
                      position: 'absolute',
                      right: '-30px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: themeColor, 
                      color: '#1c1b29', 
                      border: 'none', 
                      borderRadius: '50%',
                      width: '22px', 
                      height: '22px', 
                      minWidth: '22px', 
                      minHeight: '22px',
                      padding: '0', 
                      boxSizing: 'border-box',
                      fontSize: '14px', 
                      fontWeight: 'bold',
                      cursor: 'pointer', 
                      display: 'inline-flex', 
                      justifyContent: 'center', 
                      alignItems: 'center',
                      transition: 'all 0.3s ease',
                      zIndex: 10
                    }}
                  >
                    i
                  </button>
                  שעות הסכם קהילה
                </td>
                {timeLabelCell}
                {days.map(d => renderInputCell('community', d))}
                <td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{decimalToTime(getRowTotal('community'))}</td>
              </tr>
              <tr><td style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold'}}>עבודה נוספת קוד 99</td>{timeLabelCell}{days.map(d => renderInputCell('extra99', d))}<td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{decimalToTime(getRowTotal('extra99'))}</td></tr>
              
              <tr style={{ backgroundColor: '#D8BFD8', color: '#1c1b29' }}>
                <td colSpan="2" style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold'}}>סה"כ שעות כולל</td>
                {days.map(d => <td key={d} style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{decimalToTime(getDayTotalCore(d) + getCellDiff('community', d) + getCellDiff('extra99', d))}</td>)}
                <td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{decimalToTime(getTotalCore() + getRowTotal('community') + getRowTotal('extra99'))}</td>
              </tr>

              <tr><td style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold'}}>**שעות ניהול</td>{timeLabelCell}{days.map(d => renderInputCell('management', d))}<td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold'}}>{decimalToTime(getRowTotal('management'))}</td></tr>
            </tbody>
          </table>
        </div>

        <div className="notes-section" style={{ marginTop: '20px', fontSize: '0.7rem', lineHeight: '1.6', textAlign: 'right' }}>
          <p style={{ margin: '5px 0' }}>* יש לציין את שם המרפאה ליד כל משמרת אם עובדים ביותר ממרפאה אחת.</p>
          <p style={{ margin: '5px 0' }}>** שורה זאת תמולא ע"י מנהלי מרפאות בלבד.</p>
          <p style={{ margin: '5px 0', position: 'relative' }}>
            <button 
              className="no-print"
              onClick={() => setShowFridayInfo(true)}
              style={{
                position: 'absolute',
                right: '-30px', /* מוציא את הכפתור ימינה אל מחוץ לקו הטקסט */
                top: '50%',
                transform: 'translateY(-50%)',
                background: themeColor, 
                color: '#1c1b29', 
                border: 'none', 
                borderRadius: '50%',
                width: '22px', 
                height: '22px', 
                fontSize: '14px', 
                fontWeight: 'bold',
                cursor: 'pointer', 
                display: 'inline-flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff'; /* צבע הרקע בהעברת עכבר */
                e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; /* אופציונלי: גורם לו גם לגדול קצת */
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = themeColor; /* החזרה לצבע המקורי */
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; /* החזרת הגודל למקור */
              }}
            >
              i
            </button>
            "שישי קהילה" ו"שישי חופשי" יבוצעו אחת ל-4 שבועות כך שבפועל הרופא יעבוד לסירוגין (שישי כן, שישי לא).
          </p>
          
          <div style={{ 
              margin: '5px 0', 
              textAlign: 'right', 
              display: 'block',
              textDecoration: declarations.waiveFriday ? 'line-through' : 'none',
              opacity: declarations.waiveFriday ? 0.5 : 1,
              pointerEvents: declarations.waiveFriday ? 'none' : 'auto',
              transition: 'all 0.3s ease'
            }}>
            <span>החזר שעות "שישי חופשי" יבוצע בימי</span>
            <input 
              type="text"
              className="text-input"
              onFocus={(e) => e.target.select()}
              style={{ 
                width: '80px',
                background: 'transparent',
                color: '#ffffff',
                textAlign: 'center',
                margin: '0 5px',
                fontFamily: 'inherit'
              }}
              value={fridayReturn.day}
              onChange={e => setFridayReturn({...fridayReturn, day: e.target.value})}
            />
            <span> בין השעות </span>
            
            <input 
              type="text" 
              dir="ltr"
              placeholder="--:--"
              className="text-input"
              style={{ 
                width: '40px', 
                background: 'transparent', 
                color: '#ffffff', 
                textAlign: 'center',
                margin: '0 5px',
                fontFamily: 'inherit'
              }}
              value={fridayReturn.start}
              onChange={(e) => handleFridayTimeChange('start', e.target.value)}
              onBlur={(e) => handleFridayTimeBlur('start', e.target.value)}
              onFocus={(e) => e.target.select()}
            />
            <span> - </span>
            <input 
              type="text" 
              dir="ltr"
              placeholder="--:--"
              className="text-input"
              style={{ 
                width: '40px', 
                background: 'transparent', 
                color: '#ffffff', 
                textAlign: 'center',
                margin: '0 5px',
                fontFamily: 'inherit'
              }}
              value={fridayReturn.end}
              onChange={(e) => handleFridayTimeChange('end', e.target.value)}
              onBlur={(e) => handleFridayTimeBlur('end', e.target.value)}
              onFocus={(e) => e.target.select()}
            />
            <span>.</span>
            
          </div>
          
          <div style={{ marginTop: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', justifyContent: 'flex-start' }}>
              <input type="checkbox" checked={declarations.waiveFriday} onChange={e=>setDeclarations({...declarations, waiveFriday: e.target.checked})} style={{ width: '16px', height: '16px' }} />
              מבקש/ת לוותר על יום שישי חופשי נוסף .
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginTop: '8px', justifyContent: 'flex-start' }}>
              <input type="checkbox" checked={declarations.selfStudyConfirm} onChange={e=>setDeclarations({...declarations, selfStudyConfirm: e.target.checked})} style={{ width: '16px', height: '16px' }} />
              הנני מצהיר/ה על ביצוע השתלמות עצמית לפי סידור העבודה, וכי אישור היומן על ידי יהווה אישור ביצוע לכל דבר ועניין .
            </label>
          </div>
        </div>

        <div className="signatures" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px', borderTop: '1px solid #555', paddingTop: '20px', fontSize: '0.7rem', textAlign: 'right' }}>
          <div>תאריך:</div>
          <div>חתימת הרופא/ה:</div>
          <div>חתימת מנהל/ת המרפאה:</div>
          <div>אישור מנהל/ת רפואי במנהלת:</div>
        </div>

        {/* חלונית המידע (Modal) */}
        {showFridayInfo && (
          <div className="no-print" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            backdropFilter: 'blur(3px)'
          }}>
            <div style={{
              backgroundColor: '#1c1b29', border: `2px solid ${themeColor}`, borderRadius: '16px',
              padding: '30px', maxWidth: '450px', width: '90%', color: '#D8BFD8', position: 'relative',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
              <button 
                onClick={() => setShowFridayInfo(false)}
                style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', color: '#D8BFD8', cursor: 'pointer', fontSize: '1.4rem', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#D8BFD8'}
              >✕</button>
              
              <h3 style={{ marginTop: 0, color: themeColor, fontSize: '1rem', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
               עבודה בימי שישי
              </h3>
              
              <div style={{ lineHeight: '2', fontSize: '0.8rem', marginTop: '15px', textAlign: 'right', direction: 'rtl'}}>
                <p style={{ marginBottom: '15px' }}>"שישי קהילה" - רופא במשרה מלאה זכאי שלא לעבוד ביום שישי אחת ל-4 שבועות. יום זה יחשב כיום עבודה ומזכה במיעוד. רופא במשרה חלקית זכאי גם ל"שישי קהילה", אך הוא יצטרך להחזיר חצי מהשעות.</p>
                <p>"שישי חופשי" - רופא יכול לבחור להיעדר מיום שישי נוסף ("שישי חופשי") אחת ל-4 שבועות, אך עליו להחזיר את כל השעות (לרוב 4). נהוג להוסיף שעה אחת פרונטלית בשבוע לשם כך. גם "שישי חופשי" מזכה במיעוד. </p>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              </div>
            </div>
          </div>
        )}

        {/* חלונית מידע נוספת - השתלמות ורופא נלווה */}
        {showExtraInfo && (
          <div className="no-print" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            backdropFilter: 'blur(3px)'
          }}>
            <div style={{
              backgroundColor: '#1c1b29', border: `2px solid ${themeColor}`, borderRadius: '16px',
              padding: '30px', maxWidth: '450px', width: '90%', color: '#D8BFD8', position: 'relative',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
              <button 
                onClick={() => setShowExtraInfo(false)}
                style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', color: '#D8BFD8', cursor: 'pointer', fontSize: '1.4rem', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#D8BFD8'}
              >✕</button>
              
              <h3 style={{ marginTop: 0, color: themeColor, fontSize: '1rem', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
              השתלמות ורופא נלווה
              </h3>
              
              <div style={{ lineHeight: '2', fontSize: '0.8rem', marginTop: '15px', textAlign: 'right', direction: 'rtl'}}>
                <p style={{ marginBottom: '15px' }}>במהלך החודש אפשר לבצע או השתלמות או רופא נלווה (לא גם וגם).</p>
                <p style={{ marginBottom: '15px' }}><strong>השתלמות:</strong> 4 שעות שבועיות שיורדות ממכסת השעות הפרונטליות.</p>
                <p><strong>רופא נלווה:</strong> 5 שעות שבועיות שיורדות ממכסת השעות הפרונטליות. בנוסף, השתתפות בתוכנית מזכה בתוספת חודשית לשכר של סביב 1,200 ש"ח.</p>
              </div>
            </div>
          </div>
        )}

        {showCommunityInfo && (
          <div className="no-print" style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000,
            display: 'flex', justifyContent: 'center', alignItems: 'center',
            backdropFilter: 'blur(3px)'
          }}>
            <div style={{
              backgroundColor: '#1c1b29', border: `2px solid ${themeColor}`, borderRadius: '16px',
              padding: '30px', maxWidth: '450px', width: '90%', color: '#D8BFD8', position: 'relative',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}>
              <button 
                onClick={() => setShowCommunityInfo(false)}
                style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', color: '#D8BFD8', cursor: 'pointer', fontSize: '1.4rem', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#D8BFD8'}
              >✕</button>
              
              <h3 style={{ marginTop: 0, color: themeColor, fontSize: '1rem', borderBottom: '1px solid #333', paddingBottom: '10px' }}>
              שעות הסכם קהילה
              </h3>
              
              <div style={{ lineHeight: '2', fontSize: '0.8rem', marginTop: '15px', textAlign: 'right', direction: 'rtl'}}>
                <p style={{ marginBottom: '15px' }}>חתימה על הסכם קהילה מגדילה את התעריף המשולם לנפש מעל הנורמה (1120 - נפשות עיר) וכן לנפשות מעל גיל 65 (סמל 832).</p>
                <p style={{ marginBottom: '15px' }}>חתימה על הסכם קהילה מחייבת הוספת שעות פרונטליות (קבלת קהל) נוספות.</p>
                <p style={{ marginBottom: '15px' }}>עד 400 נפשות מעל הנורמה נדרש להוסיף 2 שעות.</p>
                <p style={{ marginBottom: '15px' }}>כל 150 נפשות נוספות (מהנפש הראשונה) נדרש להוסיף עוד שעה.</p>
              </div>
            </div>
          </div>
        )}

        </div>
      </div>
    </div>
  );
};


// --- רכיב חדש: כרטיסיית טופס - רק שינויי צבע ללא תזוזה וללא עיגול ---
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
      <div className="form-card-content" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}> {/* <--- הוספנו מחלקה */}
        <div className="form-card-icon" style={{ // <--- הוספנו מחלקה
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
  const bgMain = '#14141b'; 
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
      
      <FooterCredits />
    </div>
  );
};

export default Forms;