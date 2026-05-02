import React, { useState, useEffect, useRef } from 'react';
import PageHeader from './PageHeader';

// --- פונקציות עזר לחישוב זמנים ---
const timeToDecimal = (t) => {
  if (!t) return 0;
  const parts = t.split(':');
  const h = parseInt(parts[0], 10) || 0;
  const m = parseInt(parts[1], 10) || 0;
  return h + (m / 60);
};

// הפונקציה החדשה שמציגה מספר עשרוני נקי (במקום שעות ודקות)
const formatTotal = (d) => {
  if (!d || d === 0) return '';
  return Number(d.toFixed(2)); // חותך את המספר לעד 2 ספרות עשרוניות, ומעלים אפסים מיותרים
};

const calcDiff = (start, end) => {
  if (!start || !end) return 0;
  const diff = timeToDecimal(end) - timeToDecimal(start);
  return diff > 0 ? diff : 0;
};

// --- כפתור חזרה מותאם אישית ---
const BackButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="back-btn"  
      title="חזרה לדף הבית"
      style={{ 
        cursor: 'pointer', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '45px', 
        height: '45px', 
        borderRadius: '50px', 
        backgroundColor: isHovered ? '#9CAF88' : '#1C1B29', 
        border: '1px solid rgba(216, 191, 216, 0.15)',
        transition: 'background-color 0.2s ease'
      }}
      onMouseEnter={() => setIsHovered(true)} 
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
        <svg className="back-btn-icon" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke={isHovered ? '#1C1B29' : '#9CAF88'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: 'stroke 0.2s ease' }}>
          <polyline points="11 18 17 12 11 6"></polyline>
        </svg>
    </div>
  );
};


// --- רכיבי המידע החדשים והחכמים (כפתור ומודאל) ---

const InfoButton = ({ onClick, style }) => (
  <button 
    className="no-print"
    onClick={onClick}
    style={{
      background: 'transparent',   /* רקע שקוף */
      color: '#9CAF88',            /* צבע האות ירוק מרווה */
      border: '1px solid rgba(255,255,255,0.15)', /* קו מתאר מרובע ירוק */
      borderRadius: '6px',         /* פינות מעט מעוגלות למראה נקי ומודרני */
      width: '22px', height: '22px', minWidth: '22px', minHeight: '22px', padding: '0', 
      boxSizing: 'border-box', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', 
      display: 'inline-flex', justifyContent: 'center', alignItems: 'center',
      transition: 'all 0.3s ease',
      ...style
    }}
    onMouseEnter={(e) => {
      /* כשעוברים עם העכבר - הכפתור מתמלא בירוק והאות הופכת לכהה */
      e.currentTarget.style.backgroundColor = '#9CAF88';
      e.currentTarget.style.color = '#1c1b29';
      e.currentTarget.style.transform = e.currentTarget.style.transform ? e.currentTarget.style.transform + ' scale(1.1)' : 'scale(1.1)';
    }}
    onMouseLeave={(e) => {
      /* כשמזיזים את העכבר - הכפתור חוזר לקו מתאר שקוף */
      e.currentTarget.style.backgroundColor = 'transparent';
      e.currentTarget.style.color = '#9CAF88';
      e.currentTarget.style.transform = e.currentTarget.style.transform.replace(' scale(1.1)', '').replace('scale(1.1)', '');
    }}
  >
    i
  </button>
);

const InfoModal = ({ title, children, onClose }) => (
  <div className="no-print" style={{
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
    backgroundColor: 'transparent', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' 
  }} onClick={onClose}>
    <div 
      onClick={(e) => e.stopPropagation()} 
      style={{
        backgroundColor: 'rgba(20, 20, 27, 0.95)', 
        backdropFilter: 'blur(0px)',
        border: '1px solid rgba(156, 175, 136, 0.6)', 
        borderRadius: '16px',
        padding: '15px', maxWidth: '700px', width: '90%', 
        color: '#ffffff', 
        position: 'relative', 
        boxShadow: '0 10px 40px rgba(0,0,0,0.6)'
    }}>
      <button 
        onClick={onClose}
        style={{ 
          position: 'absolute', top: '8px', right: '8px', background: 'transparent', border: 'none', 
          color: '#ffffff', cursor: 'pointer', fontSize: '1.0rem', transition: 'all 0.2s', opacity: 0.6 
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'scale(1.1)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.6'; e.currentTarget.style.transform = 'scale(1)'; }}
      >✕</button>
      
      <h3 style={{ marginTop: 0, color: '#9CAF88', fontSize: '1rem', paddingBottom: '0px' }}>
        {title}
      </h3>
      
      <div style={{ lineHeight: '1.5', fontSize: '0.8rem', marginTop: '10px', textAlign: 'right', direction: 'rtl'}}>
        {children}
      </div>
    </div>
  </div>
);

// ==========================================
//        טופס סידור עבודה אינטראקטיבי
// ==========================================
const WorkScheduleForm = ({ onBack }) => {
  const themeColor = '#9CAF88';
  
  const [headerData, setHeaderData] = useState({
    idNumber: '', lastName: '', firstName: '', clinic: '',
    jobPercent: '100%', frontalHours: '35', community: 'לא', nonFrontalHours: '4.5', selfStudyHours: '2.5', totalWorkHours: '42'
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
  const [activeModalInfo, setActiveModalInfo] = useState(null); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDayDropdownOpen, setIsDayDropdownOpen] = useState(false);
  const [isCommunityDropdownOpen, setIsCommunityDropdownOpen] = useState(false);
  const [fridayReturn, setFridayReturn] = useState({ day: '', start: '', end: '' });

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

    const formattedStart = `${h}:${m}`;

    if (type === 'start') {
      // חישוב שעה אחת קדימה
      let endH = (parseInt(h) + 1).toString().padStart(2, '0');
      if (parseInt(endH) > 23) endH = '00'; // טיפול במעבר חצות אם רלוונטי
      
      setFridayReturn({
        ...fridayReturn, 
        start: formattedStart, 
        end: `${endH}:${m}`
      });
    } else {
      setFridayReturn({...fridayReturn, [type]: formattedStart});
    }
  };

  const getCellDiff = (row, day) => calcDiff(schedule[row][day].start, schedule[row][day].end);
  const getRowTotal = (row) => days.reduce((sum, day) => sum + getCellDiff(row, day), 0);
  const getDayFrontal = (day) => getCellDiff('morning', day) + getCellDiff('afternoon', day) + getCellDiff('training', day) + getCellDiff('accompanying', day);
  const getTotalFrontal = () => days.reduce((sum, day) => sum + getDayFrontal(day), 0);
  const getDayTotalCore = (day) => getDayFrontal(day) + getCellDiff('nonFrontal', day) + getCellDiff('selfStudy', day);
  const getTotalCore = () => days.reduce((sum, day) => sum + getDayTotalCore(day), 0);

  const timeLabelCell = (
    <td className="time-label-cell" style={{ border: '1px solid #555', padding: '4px', textAlign: 'center', fontSize: '0.6rem', verticalAlign: 'middle' }}>
      משעה<div style={{ borderTop: '1px dashed #888', margin: '4px 10px' }}></div>עד שעה
    </td>
  );

  const renderInputCell = (row, day) => (
    <td style={{ border: '1px solid #555', padding: '0px', textAlign: 'center', minWidth: '15px', verticalAlign: 'middle' }}>
      <input 
        type="text" 
        inputMode="numeric" 
        pattern="[0-9]*"
        dir="ltr" placeholder="--:--" value={schedule[row][day].start} 
        onChange={(e) => handleTimeChange(row, day, 'start', e.target.value)}
        onBlur={(e) => handleTimeBlur(row, day, 'start', e.target.value)}
        onFocus={(e) => e.target.select()} className="time-input" 
        style={{ width: '100%', background: 'transparent', color: 'inherit', border: 'none', outline: 'none', textAlign: 'center', fontSize: '0.7rem', padding: '4px 0', lineHeight: '1' }} 
      />
      <div style={{ borderTop: '1px dashed #888', margin: '0 10px' }}></div>
      <input 
        type="text" 
        inputMode="numeric" 
        pattern="[0-9]*"
        dir="ltr" placeholder="--:--" value={schedule[row][day].end} 
        onChange={(e) => handleTimeChange(row, day, 'end', e.target.value)}
        onBlur={(e) => handleTimeBlur(row, day, 'end', e.target.value)}
        onFocus={(e) => e.target.select()} className="time-input" 
        style={{ width: '100%', background: 'transparent', color: 'inherit', border: 'none', outline: 'none', textAlign: 'center', fontSize: '0.7rem', padding: '4px 0', lineHeight: '1' }} 
      />
    </td>
  );

  return (
    <div className="printable-form" style={{ fontFamily: '"Secular One", sans-serif', color: '#D8BFD8', direction: 'rtl', padding: '20px' }}>
      
      <style dangerouslySetInnerHTML={{__html: `
        ::selection { background-color: #9CAF88; color: #1c1b29; }
        ::-moz-selection { background-color: #9CAF88; color: #1c1b29; }

        h1 {
          letter-spacing: 1px;
          word-spacing: 1px;
        }
        .text-input { background: transparent; border: 1px solid rgba(216,191,216,0.3); color: #ffffff; border-radius: 6px; padding: 4px 8px; font-family: inherit; width: 90px; text-align: center; }
        
        input:not([type="checkbox"]) {
          background-color: #14141b !important;
          border-radius: 8px; 
        }

        input.time-input {
          background-color: transparent !important;
        }

        @media (max-width: 768px) {
          .top-bar {
            padding: 8px 12px !important; /* מקטין את הריווח הפנימי של הפס */
            margin-bottom: 15px !important; /* מקטין את המרווח מתחתיו */
            border-radius: 16px !important; /* פינות פחות מעוגלות */
          }

          .print-btn {
            padding: 6px 10px !important; /* מקטין את כפתור ההדפסה */
            font-size: 0.8rem !important;
            border-radius: 12px !important;
          }
          
          .print-btn span {
             font-size: 0.8rem !important;
          }

          .back-btn {
            width: 30px !important; 
            height: 30px !important; 
          }

          /* הגודל של החץ עצמו במובייל */
          .back-btn-icon {
            width: 28px !important;
            height: 28px !important;
          }
        }
                  
        @media print {
          html, body, #root { background: white !important; background-color: white !important; margin: 0 !important; padding: 0 !important; }
          * { box-shadow: none !important; text-shadow: none !important; }
          div { background-color: transparent !important; }
          *, table, th, td, tr, span, p, div, input, select { color: black !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          tr[style*="D8BFD8"], tr[style*="D8BFD8"] th, tr[style*="D8BFD8"] td { background-color: #D8BFD8 !important; }
          .no-print { display: none !important; }
          
          input:not([type="checkbox"]), select { 
            background-color: transparent !important; 
            border: none !important; appearance: none; -webkit-appearance: none; -moz-appearance: none; 
            padding: 0 !important; margin: 0 !important; height: auto !important; 
          }

          /* הסרת הרקע הכהה והשארת מסגרת נקייה בתיבות הסימון בהדפסה */
          input[type="checkbox"] {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            appearance: none !important;
            -webkit-appearance: none !important;
            -moz-appearance: none !important;
            background-color: white !important; /* דורש רקע לבן נקי */
            border: 1px solid black !important; /* מסגרת שחורה חדה */
            width: 14px !important;
            height: 14px !important;
            margin: 0 5px !important;
            position: relative;
          }
          
          /* יצירת ה-וי (V) בעצמנו כשהתיבה מסומנת בהדפסה */
          input[type="checkbox"]:checked::before {
            content: "✓";
            position: absolute;
            top: -8px;
            left: 1px;
            color: black !important; /* צבע ה-וי שחור במקום ירוק */
            font-size: 18px !important;
            font-weight: bold !important;
          }
          
          .print-wrapper { overflow: visible !important; width: auto !important; display: block !important; padding: 0 !important; }
          .header-box { border: none !important; padding: 0 !important; border-radius: 0 !important; background: white !important; margin: 0 !important; min-width: 0 !important; width: 100% !important; min-height: auto !important; }
          h1 { font-size: 18px !important; margin: 20px 0 20px 0 !important; border-bottom: 1px solid black !important; padding-bottom: 2px !important; letter-spacing: 2px !important; text-align: center !important; }
          .header-row { margin-bottom: 10px !important; gap: 15px !important; font-size: 14px !important; flex-wrap: nowrap !important; justify-content: flex-start !important; }
          .header-row > div { gap: 8px !important; white-space: nowrap !important; }
          .text-input { font-size: 14px !important; text-align: right !important; padding-right: 6px !important; border-bottom: 1px dotted #ccc !important; }
          
          /* --- התיקון לדרופ-דאונים בהדפסה --- */
          /* מכווץ את השדה לרוחב הטקסט כדי שייצמד למילה מימין */
          div.text-input { 
            width: auto !important; 
            min-width: 25px !important; 
            display: inline-block !important; 
            padding-left: 0 !important; 
          }

          table { border-collapse: collapse; width: 100% !important; font-size: 12px !important; margin-bottom: 5px !important; margin-top: 30px !important; table-layout: auto !important; }
          th, td { border: 1px solid black !important; padding: 1px 2px !important; }
          .printable-form table th { font-size: 12px !important; }
          .printable-form table tr td:first-child { font-size: 12px !important; }
          .time-input { font-size: 12px !important; margin-bottom: 0 !important; }
          .time-label-cell { font-size: 10px !important; }
          .notes-section { margin-top: 20px !important; font-size: 14px !important; line-height: 1.8 !important; }
          .notes-section p { margin: 4px 0 !important; }
          .notes-section > div { margin-top: 5px !important; }
          .signatures { margin-top: 20px !important; padding-top: 20px !important; font-size: 14px !important; }
          .notes-section .text-input { width: 40px !important; display: inline-block !important; min-width: 0 !important; max-width: none !important; padding: 0 !important; margin: 0px 4px !important; height: auto !important; line-height: inherit !important; vertical-align: baseline !important; }
          div[style*="background-image"], div[style*="backgroundImage"] { background-image: none !important; border: none !important; padding-left: 0 !important; }
          @page { size: A4 portrait; margin: 0; }
        }
      `}} />

      {/* הפס הוורוד החדש (ייעלם בהדפסה בגלל הקלאס no-print) */}
      <div className="top-bar no-print" style={{
        backgroundColor: '#1C1B29', 
        borderRadius: '24px', 
        width: '210mm', /* רוחב A4 - בדיוק כמו הטופס */
        maxWidth: '100%', /* הגנה למסכים קטנים במיוחד */
        margin: '0 auto 20px auto', 
        boxSizing: 'border-box', 
        padding: '5px 15px', 
        display: 'flex', 
        justifyContent: 'space-between', /* מפריד בין הכפתורים לשני הקצוות */
        alignItems: 'center', 
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)' 
      }}>
        
        {/* כפתור חזרה */}
        <BackButton onClick={onBack} />

        {/* כפתור הדפסה מקורי (אבל שיושב בתוך הפס) */}
        <button className="print-btn" onClick={() => window.print()} style={{
          backgroundColor: '#9CAF88', color: '#1C1B29', border: 'none', padding: '10px 15px', borderRadius: '18px',
          fontWeight: 'bold', fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', 
        }}
        >
          <span>שמירה/הדפסה כ-PDF</span>
        </button>
      </div>

      <div className="print-wrapper" style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch', padding: '0 0 20px 0' }}>
        <div style={{ 
          width: '210mm', minWidth: '210mm', minHeight: 'auto', margin: '0 auto', backgroundColor: '#1c1b29', 
          padding: '15mm', borderRadius: '24px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', position: 'relative', boxSizing: 'border-box'
        }} className="header-box">
        
        <h1 style={{ textAlign: 'center', color: '#ffffff', margin: '0 0 20px 0', fontSize: '1.8rem', borderBottom: '1px solid #D8BFD8', paddingBottom: '10px' }}>טופס סידור עבודה – רופאים</h1>
        
        <div className="header-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginBottom: '20px', fontSize: '0.7rem' }}>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}><span>מס' אישי:</span><input className="text-input" onFocus={(e) => e.target.select()} value={headerData.idNumber} onChange={e=>handleHeaderChange('idNumber', e.target.value)} /></div>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}><span>שם משפחה:</span><input className="text-input" onFocus={(e) => e.target.select()} value={headerData.lastName} onChange={e=>handleHeaderChange('lastName', e.target.value)} /></div>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}><span>שם פרטי:</span><input className="text-input" onFocus={(e) => e.target.select()} value={headerData.firstName} onChange={e=>handleHeaderChange('firstName', e.target.value)} /></div>
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}><span>מרפאה:</span><input className="text-input" onFocus={(e) => e.target.select()} value={headerData.clinic} onChange={e=>handleHeaderChange('clinic', e.target.value)} /></div>
        </div>
        
        <div className="header-row" style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', marginBottom: '20px', fontSize: '0.7rem' }}>
          {/* אחוז משרה - שונה לטקסט קבוע */}
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <span>אחוז משרה:</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>100%</span>
          </div>

          {/* הסכם קהילה - דרופ דאון במקום שדה טקסט */}
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <span>הסכם קהילה:</span>
            <div style={{ position: 'relative' }}>
              <div 
                className="text-input" 
                onClick={() => setIsCommunityDropdownOpen(!isCommunityDropdownOpen)}
                style={{ 
                  width: '45px', /* רוחב מותאם כדי שיכיל את המילה והחץ */
                  fontWeight: 'bold', backgroundColor: themeColor, color: '#1c1b29', fontSize: '0.8rem', 
                  border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'center', 
                  alignItems: 'center', height: '24px', 
                  backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231c1b29' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat', backgroundPosition: 'left 6px center', backgroundSize: '12px', paddingLeft: '16px', boxSizing: 'border-box'
                }}
              >
                {headerData.community}
              </div>
              
              {isCommunityDropdownOpen && (
                <div className="no-print" style={{
                  position: 'absolute', top: '115%', right: 0, width: '100%', backgroundColor: '#1c1b29', border: `1px solid ${themeColor}`,
                  borderRadius: '12px', overflow: 'hidden', zIndex: 50, boxShadow: '0 8px 24px rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column'
                }}>
                  {['לא', 'כן'].map(option => (
                    <div key={option}
                      onClick={() => { handleHeaderChange('community', option); setIsCommunityDropdownOpen(false); }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = themeColor; e.currentTarget.style.color = '#1c1b29'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#ffffff'; }}
                      style={{ padding: '4px 0', textAlign: 'center', cursor: 'pointer', fontWeight: 'bold', color: '#ffffff', transition: 'all 0.2s ease', borderBottom: option !== 'לא' ? '1px solid rgba(216, 191, 216, 0.1)' : 'none' }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <span>שעות פרונטליות:</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.8rem', padding: '0 4px' }}>{headerData.frontalHours}</span>
          </div>
          
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <span>שעות לא פרונטליות:</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.8rem', padding: '0 4px' }}>{headerData.nonFrontalHours}</span>
          </div>
          
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
            <span>השתלמות עצמית:</span>
            <span style={{ fontWeight: 'bold', fontSize: '0.8rem', padding: '0 4px' }}>{headerData.selfStudyHours}</span>
          </div>
        </div>
        
        <div className="header-row" style={{ display: 'flex', gap: '30px', marginBottom: '20px',  fontSize: '0.8rem', fontWeight: 'bold', color: '#ffffff' }}>
  <span style={{ display: 'flex', gap: '5px', alignItems: 'center', position: 'relative' }}>
    
    <InfoButton 
      style={{ position: 'absolute', right: '-40px', top: '50%', transform: 'translateY(-50%)' }}
      onClick={() => {
        const tableHeaders = ['', 'סך שעות עבודה בשבוע', 'קיצור יום', 'שעות פרונטליות', 'שעות לא פרונטליות', 'השתלמות עצמית'];

        const tableData = [
          ['עד גיל 40', '42', '7.5', '35', '4.5', '2.5'],
          ['+40 עם ותק 0-2 שנים', '42', '7.5', '35', '4.5', '2.5'],
          ['משרת אם בכל גיל עם ותק 0-2 שנים', '40', '7', '34', '3.5', '2.5'],
          ['+40 עם ותק 2-5 שנים', '40', '7', '34', '3.5', '2.5'],
          ['+40 עם ותק +5 שנים', '37.5', '6.5', '34', '1.5', '2'],
          ['+50 עם ותק +5 שנים', '35', '6', '32', '1.5', '1.5']
        ];

        setActiveModalInfo({
          title: "היקף משרה",
          content: (
            /* --- כאן הוספנו את המיכל שמאפשר גלילה הצידה במובייל --- */
            <div style={{ width: '100%', overflowX: 'auto', marginTop: '10px', borderRadius: '8px' }}>
              <table style={{ 
                width: '100%', 
                /* --- הגדרת רוחב מינימלי למניעת עיוות של העמודות במובייל --- */
                minWidth: '600px', 
                borderCollapse: 'collapse', 
                border: '1px solid rgba(156, 175, 136, 0.3)' 
              }}>
                <thead>
                  <tr style={{ backgroundColor: '#9CAF88' }}>
                    {tableHeaders.map((h, i) => (
                      <th key={i} style={{ 
                        border: '1px solid rgba(17, 31, 3, 0.3)', 
                        padding: '5px', 
                        textAlign: 'center', 
                        fontSize: '0.75rem', 
                        color: '#14141b',
                        width: i === 0 ? '120px' : 'auto', 
                        minWidth: i === 0 ? '120px' : 'auto'
                      }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((row, rowIndex) => (
                    <tr 
                      key={rowIndex}
                      style={{ 
                        backgroundColor: [1, 3, 5].includes(rowIndex) ? 'rgba(67, 67, 67, 0.2)' : 'transparent' 
                      }}
                    >
                      {row.map((cellText, colIndex) => (
                        <td key={colIndex} style={{ 
                          border: '1px solid rgba(156, 175, 136, 0.3)', 
                          padding: '5px', 
                          textAlign: 'center', 
                          fontSize: '0.75rem' 
                        }}>
                          {cellText}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        });
      }}
    />

    סה"כ שעות עבודה: 
    <div style={{ position: 'relative' }}>
      <div 
        className="text-input" onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        style={{ 
          width: '90px', fontWeight: 'bold', backgroundColor: themeColor, color: '#1c1b29', fontSize: '0.8rem', 
          border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'flex', justifyContent: 'center', 
          alignItems: 'center', height: '24px', backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231c1b29' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
          backgroundRepeat: 'no-repeat', backgroundPosition: 'left 8px center', backgroundSize: '14px', paddingLeft: '20px', boxSizing: 'border-box'
        }}
      >
        {headerData.totalWorkHours}
      </div>
              
              {isDropdownOpen && (
                <div className="no-print" style={{
                  position: 'absolute', top: '115%', right: 0, width: '100%', backgroundColor: '#1c1b29', border: `1px solid ${themeColor}`,
                  borderRadius: '12px', overflow: 'hidden', zIndex: 50, boxShadow: '0 8px 24px rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column'
                }}>
                  {['42', '40', '37.5', '35'].map(option => (
                    <div key={option}
                      onClick={() => { handleTotalHoursChange(option); setIsDropdownOpen(false); }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = themeColor; e.currentTarget.style.color = '#1c1b29'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#ffffff'; }}
                      style={{ padding: '2px 0', textAlign: 'center', cursor: 'pointer', fontWeight: 'bold', color: '#ffffff', transition: 'all 0.2s ease', borderBottom: option !== '35' ? '1px solid rgba(216, 191, 216, 0.1)' : 'none' }}
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
                <th colSpan="2" style={{ border: '1px solid #1C1B29', padding: '8px', textAlign: 'right' }}></th>
                {days.map(d => <th key={d} style={{ border: '1px solid #1C1B29', padding: '2px', textAlign: 'center', width: '55px' }}>{dayLabels[d]}</th>)}
                <th style={{ border: '1px solid #1C1B29', padding: '4px', textAlign: 'center', width: '65px' }}>סה"כ שעות</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold'}}>*מרפאה - לפני הצהריים</td>{timeLabelCell}{days.map(d => renderInputCell('morning', d))}<td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{formatTotal(getRowTotal('morning'))}</td></tr>
              <tr><td style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold'}}>*מרפאה - אחר הצהריים</td>{timeLabelCell}{days.map(d => renderInputCell('afternoon', d))}<td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{formatTotal(getRowTotal('afternoon'))}</td></tr>
              <tr><td style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold'}}>השתלמות</td>{timeLabelCell}{days.map(d => renderInputCell('training', d))}<td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{formatTotal(getRowTotal('training'))}</td></tr>
              <tr>
                <td style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold', position: 'relative' }}>
                  <InfoButton 
                    style={{ position: 'absolute', right: '-40px', top: '-15px', zIndex: 10 }}
                    onClick={() => setActiveModalInfo({
                      title: "השתלמות ורופא נלווה",
                      content: (
                        <>
                          <p style={{ marginBottom: '15px' }}>במהלך החודש אפשר לבצע או השתלמות או רופא נלווה (לא גם וגם).</p>
                          <p style={{ marginBottom: '15px' }}><strong>השתלמות:</strong> 4 שעות שבועיות שיורדות ממכסת השעות הפרונטליות.</p>
                          <p><strong>רופא נלווה:</strong> 5 שעות שבועיות שיורדות ממכסת השעות הפרונטליות. בנוסף, השתתפות בתוכנית מזכה בתוספת חודשית לשכר של סביב 1,200 ש"ח.</p>
                        </>
                      )
                    })}
                  />
                  רופא נלווה
                </td>
                {timeLabelCell}
                {days.map(d => renderInputCell('accompanying', d))}
                <td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{formatTotal(getRowTotal('accompanying'))}</td>
              </tr>
              
              <tr style={{ backgroundColor: '#D8BFD8', color: '#1c1b29' }}>
                <td colSpan="2" style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold' }}>סה"כ שעות פרונטליות</td>
                {days.map(d => <td key={d} style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{formatTotal(getDayFrontal(d))}</td>)}
                
                {/* התא המפוצל - עם הגנה מהדפסה לצד שמאל */}
                <td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold', padding: '0' }}>
                  <div style={{ display: 'flex', alignItems: 'stretch', width: '100%', height: '100%', minHeight: '24px' }}>
                    
                    {/* צד ימין - סכימת השעות בפועל - יופיע גם במסך וגם ב-PDF */}
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {formatTotal(getTotalFrontal())}
                    </div>
                    
                    {/* קו מפריד אנכי - ייעלם ב-PDF */}
                    <div className="no-print" style={{ width: '1px', backgroundColor: '#555' }}></div>
                    
                    {/* צד שמאל - שעות היעד - ייעלם ב-PDF */}
                    <div className="no-print" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#444', fontSize: '0.80rem' }}>
                      {declarations.waiveFriday ? Number(headerData.frontalHours) : Number(headerData.frontalHours) + 1}
                    </div>
                    
                  </div>
                </td>
              </tr>

              <tr><td style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold'}}>שעות לא פרונטליות</td>{timeLabelCell}{days.map(d => renderInputCell('nonFrontal', d))}<td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{formatTotal(getRowTotal('nonFrontal'))}</td></tr>
              <tr><td style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold'}}>שעות השתלמות עצמית</td>{timeLabelCell}{days.map(d => renderInputCell('selfStudy', d))}<td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{formatTotal(getRowTotal('selfStudy'))}</td></tr>

              <tr style={{ backgroundColor: '#D8BFD8', color: '#1c1b29' }}>
                <td colSpan="2" style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold' }}>סה"כ פרונטלי, לא פרונטלי והשתלמות עצמית</td>
                {days.map(d => <td key={d} style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{formatTotal(getDayTotalCore(d))}</td>)}
                
                {/* התא המפוצל השני - עם הגנה מהדפסה לצד שמאל */}
                <td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold', padding: '0' }}>
                  <div style={{ display: 'flex', alignItems: 'stretch', width: '100%', height: '100%', minHeight: '24px' }}>
                    
                    {/* צד ימין - סכימת השעות בפועל - יופיע גם במסך וגם ב-PDF */}
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      {formatTotal(getTotalCore())}
                    </div>
                    
                    {/* קו מפריד אנכי - ייעלם ב-PDF */}
                    <div className="no-print" style={{ width: '1px', backgroundColor: '#555' }}></div>
                    
                    {/* צד שמאל - שעות היעד המשוקללות - ייעלם ב-PDF */}
                    <div className="no-print" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#444', fontSize: '0.80rem' }}>
                      {Number(headerData.frontalHours) + Number(headerData.nonFrontalHours) + Number(headerData.selfStudyHours) + (declarations.waiveFriday ? 0 : 1)}
                    </div>
                    
                  </div>
                </td>
              </tr>

              <tr>
                <td style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold', position: 'relative' }}>
                  <InfoButton 
                    style={{ position: 'absolute', right: '-40px', top: '50%', transform: 'translateY(-50%)', zIndex: 10 }}
                    onClick={() => setActiveModalInfo({
                      title: "שעות הסכם קהילה",
                      content: (
                        <>
                          <p style={{ marginBottom: '15px' }}>חתימה על הסכם קהילה מחייבת הוספת שעות פרונטליות.</p>
                          <p style={{ marginBottom: '15px' }}>עד 400 נפשות מעל הנורמה נדרש להוסיף 2 שעות.</p>
                          <p style={{ marginBottom: '15px' }}>כל 150 נפשות נוספות (מהנפש הראשונה) נדרש להוסיף עוד שעה.</p>
                        </>
                      )
                    })}
                  />
                  שעות הסכם קהילה
                </td>
                {timeLabelCell}
                {days.map(d => renderInputCell('community', d))}
                <td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{formatTotal(getRowTotal('community'))}</td>
              </tr>
              <tr><td style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold'}}>עבודה נוספת קוד 99</td>{timeLabelCell}{days.map(d => renderInputCell('extra99', d))}<td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{formatTotal(getRowTotal('extra99'))}</td></tr>
              
              <tr style={{ backgroundColor: '#D8BFD8', color: '#1c1b29' }}>
                <td colSpan="2" style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold'}}>סה"כ שעות כולל</td>
                {days.map(d => <td key={d} style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{formatTotal(getDayTotalCore(d) + getCellDiff('community', d) + getCellDiff('extra99', d))}</td>)}
                <td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold' }}>{formatTotal(getTotalCore() + getRowTotal('community') + getRowTotal('extra99'))}</td>
              </tr>

              <tr><td style={{ border: '1px solid #555', padding: '4px', textAlign: 'right', fontWeight: 'bold'}}>**שעות ניהול</td>{timeLabelCell}{days.map(d => renderInputCell('management', d))}<td style={{ border: '1px solid #555', textAlign: 'center', fontWeight: 'bold'}}>{formatTotal(getRowTotal('management'))}</td></tr>
            </tbody>
          </table>
        </div>

        <div className="notes-section" style={{ marginTop: '20px', fontSize: '0.7rem', lineHeight: '1.6', textAlign: 'right' }}>
          <p style={{ margin: '5px 0' }}>* יש לציין את שם המרפאה ליד כל משמרת אם עובדים ביותר ממרפאה אחת.</p>
          <p style={{ margin: '5px 0' }}>** שורה זאת תמולא ע"י מנהלי מרפאות בלבד.</p>
          <p style={{ margin: '5px 0', position: 'relative' }}>
            {/* כפתור המידע - נשאר תמיד פעיל ובצבע מלא */}
            <InfoButton 
              style={{ position: 'absolute', right: '-40px', top: '50%', transform: 'translateY(-50%)' }}
              onClick={() => setActiveModalInfo({
                title: "עבודה בימי שישי",
                content: (
                  <>
                    <p style={{ marginBottom: '15px' }}>"שישי קהילה" - רופא במשרה מלאה זכאי שלא לעבוד ביום שישי אחת ל-4 שבועות. יום זה יחשב כיום עבודה ומזכה במיעוד. רופא במשרה חלקית זכאי גם ל"שישי קהילה", אך הוא יצטרך להחזיר חצי מהשעות.</p>
                    <p>"שישי חופשי" - רופא יכול לבחור להיעדר מיום שישי נוסף ("שישי חופשי") אחת ל-4 שבועות, אך עליו להחזיר את כל השעות (לרוב 4). נהוג להוסיף שעה אחת פרונטלית בשבוע לשם כך. גם "שישי חופשי" מזכה במיעוד.</p>
                  </>
                )
              })}
            />
            
            {/* הטקסט עצמו - רק הוא ידהה ויימחק כשמסמנים ויתור */}
            <span style={{
              textDecoration: declarations.waiveFriday ? 'line-through' : 'none',
              opacity: declarations.waiveFriday ? 0.5 : 1,
              transition: 'all 0.3s ease',
              display: 'inline-block'
            }}>
              "שישי קהילה" ו"שישי חופשי" יבוצעו אחת ל-4 שבועות כך שבפועל הרופא יעבוד לסירוגין (שישי כן, שישי לא).
            </span>
          </p>
          
          <div style={{ 
              margin: '5px 0', textAlign: 'right', display: 'block', textDecoration: declarations.waiveFriday ? 'line-through' : 'none',
              opacity: declarations.waiveFriday ? 0.5 : 1, pointerEvents: declarations.waiveFriday ? 'none' : 'auto', transition: 'all 0.3s ease'
            }}>
            <span>החזר שעות "שישי חופשי" יבוצע בימי</span>
            
            {/* הדרופ דאון של היום */}
            <div style={{ position: 'relative', display: 'inline-block', margin: '0 8px' }}>
              <div 
                className="text-input" onClick={() => setIsDayDropdownOpen(!isDayDropdownOpen)}
                style={{ 
                  width: '90px', fontWeight: 'bold', backgroundColor: themeColor, color: '#1c1b29', fontSize: '0.8rem', 
                  border: 'none', borderRadius: '8px', cursor: 'pointer', display: 'inline-flex', justifyContent: 'center', 
                  alignItems: 'center', height: '24px', backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231c1b29' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                  backgroundRepeat: 'no-repeat', backgroundPosition: 'left 8px center', backgroundSize: '14px', paddingLeft: '20px', boxSizing: 'border-box',
                  verticalAlign: 'middle'
                }}
              >
                {fridayReturn.day || '---'}
              </div>
              
              {isDayDropdownOpen && (
                <div className="no-print" style={{
                  position: 'absolute', bottom: '115%', right: 0, width: '100%', backgroundColor: '#1c1b29', border: `1px solid ${themeColor}`,
                  borderRadius: '12px', overflow: 'hidden', zIndex: 50, boxShadow: '0 8px 24px rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column'
                }}>
                  {['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי'].map(option => (
                    <div key={option}
                      onClick={() => { setFridayReturn({...fridayReturn, day: option}); setIsDayDropdownOpen(false); }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = themeColor; e.currentTarget.style.color = '#1c1b29'; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#ffffff'; }}
                      style={{ padding: '6px 0', textAlign: 'center', cursor: 'pointer', fontWeight: 'bold', color: '#ffffff', transition: 'all 0.2s ease', borderBottom: option !== 'חמישי' ? '1px solid rgba(216, 191, 216, 0.1)' : 'none' }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <span> בין השעות </span>
            
            {/* שעת התחלה - שדה הזנה יחיד */}
            <input 
              type="text" 
              inputMode="numeric" 
              pattern="[0-9]*" 
              dir="ltr" 
              placeholder="--:--" 
              className="text-input" 
              style={{ width: '45px', background: 'transparent', color: '#ffffff', textAlign: 'center', margin: '0 5px', fontFamily: 'inherit', fontWeight: 'bold' }} 
              value={fridayReturn.start} 
              onChange={(e) => handleFridayTimeChange('start', e.target.value)} 
              onBlur={(e) => handleFridayTimeBlur('start', e.target.value)} 
              onFocus={(e) => e.target.select()} 
            />
            
            <span> עד </span>
            
            {/* שעת סיום - מוצגת כטקסט רגיל ללא מלבן */}
            <span style={{ 
              display: 'inline-block', 
              minWidth: '35px', 
              textAlign: 'right', 
              color: '#ffffff', 
              fontWeight: 'bold', 
              margin: '0 5px',
              direction: 'ltr'
            }}>
              {fridayReturn.end || '--:--'}
            </span>
            
            <span>.</span>
          </div>
          
          <div style={{ marginTop: '15px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', justifyContent: 'flex-start' }}>
              <input type="checkbox" checked={declarations.waiveFriday} onChange={e=>setDeclarations({...declarations, waiveFriday: e.target.checked})} style={{ width: '16px', height: '16px', accentColor: themeColor }} />
              מבקש/ת לוותר על יום שישי חופשי נוסף .
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginTop: '8px', justifyContent: 'flex-start' }}>
              <input type="checkbox" checked={declarations.selfStudyConfirm} onChange={e=>setDeclarations({...declarations, selfStudyConfirm: e.target.checked})} style={{ width: '16px', height: '16px', accentColor: themeColor }} />
              הנני מצהיר/ה על ביצוע השתלמות עצמית לפי סידור העבודה, וכי אישור היומן על ידי יהווה אישור ביצוע לכל דבר ועניין .
            </label>
          </div>
        </div>

        <div className="signatures" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '50px', borderTop: '1px solid #D8BFD8', paddingTop: '20px', fontSize: '0.7rem', textAlign: 'right' }}>
          <div>תאריך:</div>
          <div>חתימת הרופא/ה:</div>
          <div>חתימת מנהל/ת המרפאה:</div>
          <div>אישור מנהל/ת רפואי במנהלת:</div>
        </div>

        {activeModalInfo && (
          <InfoModal 
            title={activeModalInfo.title} 
            onClose={() => setActiveModalInfo(null)}
          >
            {activeModalInfo.content}
          </InfoModal>
        )}

        </div>
      </div>
    </div>
  );
};

export default WorkScheduleForm;