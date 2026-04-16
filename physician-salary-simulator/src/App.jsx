import React, { useState } from 'react';

// --- רכיבים מותאמים אישית (Custom Components) ---

// רכיב דיסקליימר אחיד לכל האפליקציה
const Disclaimer = () => (
  <p className="disclaimer-text" style={{
    fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
    margin: '15px 0 0 0',
    fontSize: '0.9rem',
    fontWeight: 'normal',
    color: '#D8BFD8',
    maxWidth: '800px',
    lineHeight: '1.5',
    opacity: 0.7
  }}>
   יישומון זו הינו כלי עזר פרטי ואינו מוצר רשמי של שירותי בריאות כללית. המידע והחישובים המוצגים בו מבוססים על הערכות ופרשנות אישית של הסכמי השכר, ואין לראות בהם נתונים מחייבים או ייעוץ מקצועי. התוצאות בפועל עשויות להיות שונות. המידע הקובע והרשמי נמצא אך ורק בידי מחלקת משאבי אנוש והשכר בארגון.

  </p>
);

// רכיב קרדיט אישי בתחתית העמוד
const FooterCredits = () => (
  <div style={{ 
    textAlign: 'center', 
    padding: '40px 0 20px 0', 
    opacity: 0.4, 
    width: '100%'
  }}>
    <p style={{ 
      fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif', 
      fontSize: '0.8rem', 
      color: '#D8BFD8', 
      margin: 0,
      letterSpacing: '0.5px'
    }}>
      {new Date().getFullYear()} Created by Ofer Dahan
    </p>
  </div>
);

// 1. כפתור בחירה מפוצל (Segmented Control) לכן/לא
const SegmentedControl = ({ value, onChange, options }) => (
  <div 
    className="hover-input"
    style={{ 
      display: 'flex', 
      backgroundColor: '#1A1A26', 
      borderRadius: '12px', 
      border: '1px solid rgba(216, 191, 216, 0.5)',
      width: '200px', 
      height: '36px', 
      overflow: 'hidden',
      boxSizing: 'border-box',
      transition: 'all 0.3s ease'
    }}
  >
    {options.map(opt => (
      <div
        key={opt}
        onClick={() => onChange(opt)}
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          backgroundColor: value === opt ? '#9CAF88' : 'transparent',
          color: value === opt ? '#0D0D12' : '#D8BFD8',
          fontWeight: 'bold',
          fontSize: '1.1rem',
          transition: 'all 0.2s ease',
          fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif'
        }}
      >
        {opt}
      </div>
    ))}
  </div>
);

// 2. תפריט דרופ-דאון
const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  const currentItem = options.find(o => (typeof o === 'object' ? o.value === value : o === value));
  const displayValue = typeof currentItem === 'object' ? currentItem.label : currentItem;

  return (
    <div className="select-wrapper" style={{ position: 'relative', width: '200px', height: '36px', fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif' }}>
      {isOpen && <div style={{ position: 'fixed', inset: 0, zIndex: 9 }} onClick={() => setIsOpen(false)} />}
      
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="hover-input"
        style={{
          backgroundColor: '#1A1A26',
          color: '#D8BFD8',
          padding: '0 16px',
          borderRadius: '12px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxSizing: 'border-box',
          border: isOpen ? '1px solid #9CAF88' : '1px solid rgba(216, 191, 216, 0.5)',
          transition: 'all 0.3s ease',
          width: '100%',
          height: '100%' 
        }}
      >
        <span style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>{displayValue}</span>
        <span style={{ fontSize: '0.7rem', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', position: 'relative', right: '5px' }}>▼</span>
      </div>
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 5px)',
          left: 0,
          right: 0,
          backgroundColor: '#15151E',
          border: '1px solid #9CAF88',
          borderRadius: '16px',
          overflow: 'hidden',
          zIndex: 10,
          maxHeight: '220px',
          overflowY: 'auto',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)'
        }}>
          {options.map((opt, idx) => {
            const optValue = typeof opt === 'object' ? opt.value : opt;
            const optLabel = typeof opt === 'object' ? opt.label : opt;
            return (
              <div
                key={optValue}
                onClick={() => { onChange(optValue); setIsOpen(false); }}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: '4px 16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  color: hovered === idx ? '#0D0D12' : '#D8BFD8',
                  backgroundColor: hovered === idx ? '#9CAF88' : 'transparent',
                  transition: 'all 0.1s ease'
                }}
              >
                {optLabel}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// 3. כפתור מידע נוסף
const InfoButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', width: 'fit-content',
        transition: 'all 0.3s ease',
        transform: isHovered ? 'scale(1.15)' : 'scale(1)' /* אפקט ההגדלה בריחוף */
      }}
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div style={{
        width: '50px', height: '50px', borderRadius: '50%',
        border: 'none', 
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        backgroundColor: isHovered ? '#ffffff' : '#9CAF88', 
        transition: 'all 0.3s ease',
        boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 6px rgba(0,0,0,0.2)'
      }}>
        {/* שימוש ב-SVG כדי לשלוט על אורך הקו של ה-i */}
        <svg 
          width="20" height="34" /* מידות האייקון בתוך העיגול */
          viewBox="0 0 100 180" /* הגדרת מרחב הציור */
          fill="none" 
          stroke="#0D0D12" /* האייקון נשאר שחור תמיד */
          strokeWidth="25" /* עובי הקו */
          strokeLinecap="round" /* קצוות מעוגלים */
          style={{ transition: 'all 0.3s ease' }} 
        >
          {/* הנקודה של ה-i */}
          <circle cx="50" cy="30" r="15" fill="#0D0D12" stroke="none" />
          {/* הגזע הראשי של ה-i, מוארך כלפי מטה */}
          <path d="M50 75 L50 160" />
        </svg>
      </div>
    </div>
  );
};

// 4. כפתור חזרה לסימולטור
const BackButton = ({ onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div 
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', width: 'fit-content'
      }}
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div style={{
        width: '50px', height: '50px', borderRadius: '50%', /* הגדלנו את העיגול ל-50px */
        border: 'none', 
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        backgroundColor: isHovered ? '#ffffff' : '#9CAF88', 
        transition: 'all 0.3s ease',
        boxShadow: isHovered ? '0 4px 12px rgba(0,0,0,0.3)' : '0 2px 6px rgba(0,0,0,0.2)',
        transform: isHovered ? 'scale(1.15)' : 'scale(1)' 
      }}>
        <svg 
          width="30" height="30" /* הגדלנו את האייקון מ-26 ל-30 */
          viewBox="0 0 24 24" fill="none" 
          stroke="#0D0D12" 
          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          style={{ transition: 'all 0.3s ease' }} 
        >
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
          <line x1="8" y1="6" x2="16" y2="6"></line>
          <line x1="16" y1="14" x2="16.01" y2="14"></line>
          <line x1="12" y1="14" x2="12.01" y2="14"></line>
          <line x1="8" y1="14" x2="8.01" y2="14"></line>
          <line x1="16" y1="18" x2="16.01" y2="18"></line>
          <line x1="12" y1="18" x2="12.01" y2="18"></line>
          <line x1="8" y1="18" x2="8.01" y2="18"></line>
          <line x1="16" y1="10" x2="16.01" y2="10"></line>
          <line x1="12" y1="10" x2="12.01" y2="10"></line>
          <line x1="8" y1="10" x2="8.01" y2="10"></line>
        </svg>
      </div>
    </div>
  );
};

export default function App() {
  
  // --- מתג המסכים - סימולטור / מידע נוסף
  const [currentView, setCurrentView] = useState('simulator');

  // שומר את הרכיב שהמשתמש לחץ עליו כדי להציג בחלון הצף
  const [selectedInfo, setSelectedInfo] = useState(null);

  // --- 1. כל נתוני הקלט (עם ערכי ברירת המחדל) ---
  const [data, setData] = useState({
    age: 40.2, 
    status: 'מומחה',
    grade: '4', 
    seniority: 7.92, 
    management: 'לא',
    mother: 'לא',
    community: 'לא',
    jobPercentage: '100%',
    accompanying: 'לא',
    weightedSouls: 0, 
    elderlyCount: 0,  
    miudCount: 28,
    peerNotesCount: 0,
    homeVisits: 0,
    splitBreaks: 0,
    certificates: 0,
    overtimeHours: 0
  });

  const update = (field, value) => {
    const formattedValue = (['age', 'seniority', 'weightedSouls', 'elderlyCount', 'miudCount', 'peerNotesCount', 'homeVisits', 'splitBreaks', 'certificates', 'overtimeHours'].includes(field)) 
      ? parseFloat(value) || 0 
      : value;
    setData({ ...data, [field]: formattedValue });
  };

  // --- לוגיקות חישוב ---
  const calculateJobScope = () => {
    const { age, seniority, mother, management } = data;
    let dayStandard = 7.5;

    if (age < 40) {
      dayStandard = (mother === 'כן') ? 7 : 7.5;
    } else if (age >= 40 && age < 50) {
      if (seniority >= 2 && seniority <= 5) dayStandard = 7;
      else if (seniority > 5) dayStandard = 6.5;
      else dayStandard = 7.5;
    } else if (age >= 50) {
      if (seniority > 5) dayStandard = 6;
      else if (seniority >= 2) dayStandard = 7;
      else dayStandard = 7.5;
    }
    if (mother === 'כן' && dayStandard > 7) dayStandard = 7;

    const hoursMapping = {
      7.5: { weeklyHours: 42, frontalHours: 35, nonFrontalHours: 4.5, selfStudyHours: 2.5, monthStandard: 182 },
      7:   { weeklyHours: 40, frontalHours: 34, nonFrontalHours: 3.5, selfStudyHours: 2.5, monthStandard: 173 },
      6.5: { weeklyHours: 37.5, frontalHours: 34, nonFrontalHours: 1.5, selfStudyHours: 2, monthStandard: 162 },
      6:   { weeklyHours: 35, frontalHours: 32, nonFrontalHours: 1.5, selfStudyHours: 1.5, monthStandard: 152 }
    };

    const normsMapping = {
      'לא':         { 7.5: 1345, 7: 1242, 6.5: 1210, 6: 1107 },
      'מנהל שירות': { 7.5: 1321, 7: 1217, 6.5: 1186, 6: 1082 },
      'קטנה':       { 7.5: 1224, 7: 1127, 6.5: 1095, 6: 997  },
      'בינונית':    { 7.5: 1199, 7: 1102, 6.5: 1070, 6: 972  },
      'גדולה':      { 7.5: 1149, 7: 1052, 6.5: 1020, 6: 923  }
    };

    const currentHours = hoursMapping[dayStandard] || hoursMapping[7.5];
    const currentNorm = normsMapping[management] ? normsMapping[management][dayStandard] : 1345;

    return { dayStandard, ...currentHours, norm: currentNorm };
  };

  const calculateSalary = () => {
    const base1 = 6079.98;
    const grades = { '1': base1, '2': base1 * 1.06, '3': (base1 * 1.06) * 1.08 };
    grades['3+'] = grades['3'] * 1.03;
    grades['4'] = grades['3+'] * 1.1;
    grades['5'] = grades['4'] * 1.06;
    grades['6'] = grades['5'] * 1.06;
    grades['6+'] = grades['6'] * 1.03;
    grades['7'] = grades['6+'] * 1.03;
    grades['7+'] = grades['7'] * 1.03;
    grades['8'] = grades['7+'] * 1.03;
    grades['8+'] = grades['8'] * 1.03;
    grades['9'] = grades['8+'] * 1.03;
    grades['9+'] = grades['9'] * 1.03;
    grades['10'] = grades['9+'] * 1.05;
    grades['10+'] = grades['10'] * 1.04;
    grades['11'] = grades['10+'] * 1.04;
    grades['11+'] = grades['11'] * 1.04;
    grades['12'] = grades['11+'] * 1.04;
    grades['12+'] = grades['12'] * 1.04;

    const gradeBase = grades[data.grade] || base1;
    const combinedSalary = gradeBase * Math.pow(1.01, data.seniority);

    const incrementalMapping = {
      '1': 190, '2': 790, '3': 790, '3+': 790, '4': 790, '5': 790, '6': 790, '6+': 790, '7': 790, '7+': 790,
      '8': 590, '8+': 590, '9': 590, '9+': 590, '10': 190, '10+': 190, '11': 190, '11+': 190, '12': 190, '12+': 190
    };
    const incremental2024 = incrementalMapping[data.grade] || 0;

    return { combinedSalary, incremental2024 };
  };

  const { dayStandard, weeklyHours, frontalHours, nonFrontalHours, selfStudyHours, monthStandard, norm } = calculateJobScope();
  const { combinedSalary, incremental2024 } = calculateSalary();
  const totalBaseSalary = combinedSalary + incremental2024;

  const calculateFixedAdditions = () => {
    let regionalDoctorAddition = 0;
    let onCallCount = 0;
    const dayValue = totalBaseSalary / 25;

    if (data.management !== 'לא') {
      if (data.management === 'מנהל שירות') onCallCount = 8;
      else if (data.management === 'קטנה') onCallCount = 16;
      else if (data.management === 'בינונית') onCallCount = 18;
      else if (data.management === 'גדולה') onCallCount = 24;
      
      regionalDoctorAddition = dayValue * onCallCount;
    }

    const clinicAdminAddition = combinedSalary * 0.42;

    const agreement2000Mapping = {
      '1': 920.69, '2': 2951.24, '3': 2951.24, '3+': 2951.24, '4': 1372.91, '5': 1372.91, '6': 1372.91, '6+': 1372.91,
      '7': 715.28, '7+': 715.28, '8': 915.28, '8+': 915.28, '9': 915.28, '9+': 915.28,
      '10': 1315.28, '10+': 1315.28, '11': 1315.28, '11+': 1315.28, '12': 1315.28, '12+': 1315.28
    };
    const agreement2000Addition = agreement2000Mapping[data.grade] || 0;
    const completion2012Addition = combinedSalary * 0.363;
    const internAddition = data.status === 'מתמחה' ? combinedSalary * 0.1 : 0;

    const totalFixedAdditions = regionalDoctorAddition + clinicAdminAddition + agreement2000Addition + completion2012Addition + internAddition;

    return { 
      regionalDoctorAddition, 
      dayValue, 
      onCallCount, 
      clinicAdminAddition, 
      agreement2000Addition, 
      completion2012Addition, 
      internAddition, 
      totalFixedAdditions 
    };
  };

  const { regionalDoctorAddition, dayValue, onCallCount, clinicAdminAddition, agreement2000Addition, completion2012Addition, internAddition, totalFixedAdditions } = calculateFixedAdditions();

  const calculateAdditionalWork = () => {
    const excessSouls = data.weightedSouls - norm;

    let sharedRate = 15.5;
    if (data.community === 'כן') {
      if (excessSouls <= 0) {
        sharedRate = 28.8;
      } else {
        let totalValue = 0;
        let remainder = excessSouls;
        if (remainder > 800) { totalValue += (remainder - 800) * 16.87; remainder = 800; }
        if (remainder > 500) { totalValue += (remainder - 500) * 37.19; remainder = 500; }
        if (remainder > 300) { totalValue += (remainder - 300) * 32.75; remainder = 300; }
        totalValue += remainder * 28.8;
        sharedRate = totalValue / excessSouls;
      }
    }

    const rate832 = sharedRate;
    const coeff832 = data.status === 'מומחה' ? 0.55 : 0.5;
    const souls65PlusAddition = data.elderlyCount * rate832 * coeff832;

    const rate1120 = sharedRate;
    const coeff1120 = data.community === 'לא' ? 1.0 : 1.1;
    let citySoulsAddition = 0;
    if (excessSouls > 0) {
      citySoulsAddition = excessSouls * rate1120 * coeff1120;
    }

    const homeVisitsAmount = data.homeVisits;
    const homeVisitsRate = 157.59;
    const homeVisitsAddition = homeVisitsAmount * homeVisitsRate;

    const peerNotesAmount = data.peerNotesCount;
    const peerNotesRate = 35.52;
    const peerNotesAddition = peerNotesAmount * peerNotesRate;

    const accompanyingAddition = data.accompanying === 'כן' ? 1200 : 0;

    const miudAmount = data.miudCount;
    const miudRate = 135.59;
    const miudAddition = miudAmount * miudRate;

    let splitAddition = 0;
    if (data.splitBreaks > 0) {
      const splitCountPerMonth = data.splitBreaks * 4;
      const denominator = Math.round(splitCountPerMonth / 4.33) * 4.33;
      const roundedQuantity = splitCountPerMonth / denominator;
      
      const percentageMap = { 1: 0.035, 2: 0.07, 3: 0.09, 4: 0.12, 5: 0.15 };
      const percentage = percentageMap[data.splitBreaks] || 0;
      
      splitAddition = roundedQuantity * totalBaseSalary * percentage;
    }

    const certificatesAmount = data.certificates;
    const certificatesRate = 72.13;
    const certificatesAddition = certificatesAmount * certificatesRate;

    const geriatricAmount = data.elderlyCount;
    const geriatricRate = 6.72;
    const geriatricCoeff = 1;
    const geriatricAddition = geriatricAmount * geriatricRate * geriatricCoeff;

    const overtimeAmount = data.overtimeHours;
    const hourlyRate = totalBaseSalary / monthStandard;
    const overtimeCoeff = 1.25; 
    const overtimeAddition = overtimeAmount * hourlyRate * overtimeCoeff;

    const totalAdditionalWork = souls65PlusAddition + citySoulsAddition + homeVisitsAddition + peerNotesAddition + accompanyingAddition + miudAddition + splitAddition + certificatesAddition + geriatricAddition + overtimeAddition;

    return { 
      excessSouls, souls65PlusAddition, rate832, coeff832, citySoulsAddition, rate1120, coeff1120,
      homeVisitsAddition, homeVisitsAmount, homeVisitsRate, peerNotesAddition, peerNotesAmount, peerNotesRate,
      accompanyingAddition, miudAddition, miudAmount, miudRate, splitAddition,
      certificatesAddition, certificatesAmount, certificatesRate,
      geriatricAddition, geriatricAmount, geriatricRate, geriatricCoeff,
      overtimeAddition, overtimeAmount, hourlyRate, overtimeCoeff,
      totalAdditionalWork
    };
  };

  const { 
    excessSouls, souls65PlusAddition, rate832, coeff832, citySoulsAddition, rate1120, coeff1120, 
    homeVisitsAddition, homeVisitsAmount, homeVisitsRate, peerNotesAddition, peerNotesAmount, peerNotesRate,
    accompanyingAddition, miudAddition, miudAmount, miudRate, splitAddition,
    certificatesAddition, certificatesAmount, certificatesRate,
    geriatricAddition, geriatricAmount, geriatricRate, geriatricCoeff,
    overtimeAddition, overtimeAmount, hourlyRate, overtimeCoeff, totalAdditionalWork
  } = calculateAdditionalWork();

  const calculateExpenses = () => {
    const travelExpense = 476;
    const phoneExpense = 36.45;
    const totalExpenses = travelExpense + phoneExpense;
    return { travelExpense, phoneExpense, totalExpenses };
  };

  const { travelExpense, phoneExpense, totalExpenses } = calculateExpenses();

  const grossSalary = totalBaseSalary + totalFixedAdditions + totalAdditionalWork + totalExpenses;

  const formatCurrency = (amount) => {
    return (
      <span style={{ display: 'inline-flex', direction: 'ltr', alignItems: 'center', whiteSpace: 'nowrap' }}>
        <span style={{ marginRight: '4px' }}>₪</span>
        <span>{amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
      </span>
    );
  };

  // --- צבעים וסגנונות (הפלטה החדשה) ---
  const bgMain = '#0D0D12'; 
  const bgCard = '#1c1b29'; 
  const textLilac = '#D8BFD8'; 
  const textSage = '#9CAF88'; 
  const inputBg = '#1c1b29'; 
  const inputText = '#D8BFD8'; 

  const fontArial = { fontFamily: '"Arial", "Helvetica Neue", Helvetica, sans-serif' };

  const mainWrapperStyle = {
    ...fontArial,
    direction: 'rtl',
    padding: '40px 20px',
    backgroundColor: bgMain,
    minHeight: '100vh',
    color: textLilac,
    position: 'relative' 
  };

  const cardStyle = { 
    backgroundColor: bgCard, 
    padding: '20px 30px 0px',
    borderRadius: '24px', 
    border: `1px solid rgba(216, 191, 216, 0.15)`, 
    display: 'flex',
    flexDirection: 'column',
    height: 'fit-content'
  };

  const rowFlex = { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  };

  // --- הקוד החדש של כותרת האזורים ---
  const CategoryHeader = ({ title, total }) => (
    <div className="category-header" style={{
      margin: '-20px -30px 0px -30px', 
      padding: '10px 20px', 
      backgroundColor: textSage, 
      borderTopLeftRadius: '24px', 
      borderTopRightRadius: '24px',
      borderBottom: '2px solid #000000', /* <--- הוספנו את פס ההפרדה השחור כאן */
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center' 
    }}>

      {/* --- שליטה בגודל הטקסט של הכותרת (למשל "היקף משרה") --- */}
      <h3 style={{ ...fontArial, color: '#0D0D12', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
        {title}
      </h3>
      
      {total !== undefined && (
        <div style={{ 
          ...fontArial, 
          /* --- שליטה בגודל הטקסט של המספר (סכום הסה"כ) --- */
          fontSize: '1.2rem', 
          color: '#000000', 
          fontWeight: 'bold', 
          display: 'flex',
          alignItems: 'center'
        }}>
          {/* --- שליטה בגודל הטקסט של המילה "סה"כ" --- */}
          <span style={{ color: '#000000', marginLeft: '8px', fontSize: '1.2rem' }}>סה"כ </span>
          {formatCurrency(total)}
        </div>
      )}
    </div>
  );

  const listItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: bgCard,
    borderRadius: '0px', 
    marginBottom: '0px',
    borderBottom: '2px solid #000000',
    margin: '0 var(--edge-margin)', 
    padding: '12px var(--edge-padding)' 
  };

  const inputLabelStyle = {
    ...fontArial,
    color: textLilac,
    fontSize: '1.1rem',
    fontWeight: 'bold',
    textAlign: 'right'
  };

  const subLabelStyle = {
    ...fontArial,
    fontSize: '0.85rem',
    fontWeight: 'normal',
    color: textLilac,
    opacity: 0.8,
    textAlign: 'right',
    marginTop: '0px'
  };

  const labelStyle = {
    ...fontArial,
    color: textLilac,
    fontSize: '1.1rem',
    fontWeight: 'bold'
  };

  const valStyle = {
    ...fontArial,
    color: textLilac,
    fontSize: '1.1rem',
    fontWeight: 'bold'
  };

  const inputFieldStyle = { 
    ...fontArial,
    backgroundColor: inputBg,
    color: inputText,
    padding: '0 16px', 
    borderRadius: '12px',
    border: '1px solid rgba(216, 191, 216, 0.5)',
    width: '200px', 
    height: '36px',
    textAlign: 'center',
    fontSize: '1.1rem',
    fontWeight: 'bold',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const detailStyle = { 
    ...fontArial,
    fontSize: '0.85rem', 
    fontWeight: 'normal',  
    color: textLilac, 
    opacity: 0.8,
    marginTop: '2px', 
    lineHeight: '1.2',
    textAlign: 'right'
  };

  const highlightStyle = {
    backgroundColor: textLilac, 
    borderRadius: '12px',
    padding: '6px 16px',
    marginTop: '8px',
    border: 'none'
  };

  // --- מאגר המידע של רכיבי השכר ---
  const infoData = [
    {
      category: "נתוני בסיס",
      items: [
        { 
          title: "דרגה", 
          description: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>פירוט אופן קביעת הדרגה</div>
              
              {/* הטבלה של מסלולי הקידום והדרגות */}
              <div style={{ marginTop: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right', fontSize: '0.75rem', border: '1px solid rgba(216, 191, 216, 0.3)', minWidth: '600px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#9CAF88', color: '#1A1A26' }}>
                      <th style={{ padding: '8px', border: '1px solid #1A1A26', width: '35%' }}>תואר / תפקיד</th>
                      <th style={{ padding: '8px', border: '1px solid #1A1A26', width: '65%' }}>הסבר</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '8px', border: '1px solid rgba(216, 191, 216, 0.3)', fontWeight: 'bold' }}>סטאז'ר</td>
                      <td style={{ padding: '8px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>דרגה 1</td>
                    </tr>
                    <tr style={{ backgroundColor: '#252435' }}>
                      <td style={{ padding: '8px', border: '1px solid rgba(216, 191, 216, 0.3)', fontWeight: 'bold' }}>מתמחה ברפואת המשפחה</td>
                      <td style={{ padding: '8px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>דרגה 2 מתחילת ההתמחות. לאחר שנה עולה לדרגה 3. לאחר 3 שנים נוספות עולה לדרגה 3+.</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px', border: '1px solid rgba(216, 191, 216, 0.3)', fontWeight: 'bold' }}>רופא ללא תעודת מומחה</td>
                      <td style={{ padding: '12px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>מתחיל בדרגה 3. לאחר שנתיים עולה לדרגה 4. לאחר שנתיים נוספות עולה לדרגה 5. לאחר 4 שנים נוספות עולה לדרגה 6. לאחר 3 שנים נוספות עולה לדרגה 6+.</td>
                    </tr>
                    <tr style={{ backgroundColor: '#252435' }}>
                      <td style={{ padding: '8px', border: '1px solid rgba(216, 191, 216, 0.3)', fontWeight: 'bold' }}>רופא בעל תעודת מומחה</td>
                      <td style={{ padding: '8px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>מתחיל בדרגה 4. לאחר שנה עולה לדרגה 5. לאחר שנתיים נוספות עולה לדרגה 6. לאחר 3 שנים נוספות עולה לדרגה 7. לאחר 3 שנים נוספות עולה לדרגה 7+.</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px', border: '1px solid rgba(216, 191, 216, 0.3)', fontWeight: 'bold' }}>רופא אזורי/ מנהל מרפאה ללא תעודת מומחה</td>
                      <td style={{ padding: '8px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>קידום כמו לרופא בעל תעודת מומחה. בכל מקרה לא תהא דרגתו נמוכה מדרגת רופא הכפוף אליו.</td>
                    </tr>
                    <tr style={{ backgroundColor: '#252435' }}>
                      <td style={{ padding: '8px', border: '1px solid rgba(216, 191, 216, 0.3)', fontWeight: 'bold' }}>רופא אזורי/ מנהל מרפאה בעל תעודת מומחה</td>
                      <td style={{ padding: '8px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>מתחיל בדרגה 7. לאחר 3 שנים עולה לדרגה 8. לאחר 3 שנים נוספות עולה לדרגה 8+. בכל מקרה לא תהא דרגתו נמוכה מדרגת רופא הכפוף אליו.</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px', border: '1px solid rgba(216, 191, 216, 0.3)', fontWeight: 'bold' }}>סגן מנהל רפואי במחוז ורופא אחראי במינהלה האזורית</td>
                      <td style={{ padding: '8px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>מתחיל בדרגה 7. לאחר שנתיים עולה לדרגה 8. לאחר 3 שנים נוספות עולה לדרגה 9. לאחר 3 שנים נוספות עולה לדרגה 9+.</td>
                    </tr>
                    <tr style={{ backgroundColor: '#252435' }}>
                      <td style={{ padding: '8px', border: '1px solid rgba(216, 191, 216, 0.3)', fontWeight: 'bold' }}>מנהל רפואי במחוז</td>
                      <td style={{ padding: '8px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>אחרי 3 שנים בתפקיד עולה לדרגה 10. לאחר 3 שנים נוספות עולה לדרגה 10+.</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '8px', border: '1px solid rgba(216, 191, 216, 0.3)', fontWeight: 'bold' }}>מנהל המחוז</td>
                      <td style={{ padding: '8px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>מתחיל בדרגה 9. לאחר שנתיים עולה לדרגה 10. לאחר 3 שנים נוספות עולה לדרגה 11. לאחר 3 שנים נוספות עולה לדרגה 11+.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )
        },
        {
          title: "היקף משרה ונורמת נפשות", 
          description: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>פירוט שעות העבודה ונורמת הנפשות בהתאם לגיל, ותק ותפקיד:</div>
              
              {/* עוטף שמאפשר גלילה אופקית לטבלה הרחבה */}
              <div style={{ marginTop: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.75rem', border: '1px solid rgba(216, 191, 216, 0.3)', minWidth: '1200px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#9CAF88', color: '#1A1A26' }}>
                      <th style={{ padding: '5px', border: '1px solid #1A1A26' }}>קריטריון</th>
                      <th style={{ padding: '5px', border: '1px solid #1A1A26' }}>שעות למשרה בשבוע</th>
                      <th style={{ padding: '5px', border: '1px solid #1A1A26' }}>קיצור יום (תקן יום)</th>
                      <th style={{ padding: '5px', border: '1px solid #1A1A26' }}>שעות תקן</th>
                      <th style={{ padding: '5px', border: '1px solid #1A1A26' }}>שעות פרונטליות</th>
                      <th style={{ padding: '5px', border: '1px solid #1A1A26' }}>שעות לא פרונטליות</th>
                      <th style={{ padding: '5px', border: '1px solid #1A1A26' }}>השתלמות עצמית</th>
                      <th style={{ padding: '5px', border: '1px solid #1A1A26' }}>נורמת נפשות ללא ניהול</th>
                      <th style={{ padding: '5px', border: '1px solid #1A1A26' }}>נ"נ מנהל שירות</th>
                      <th style={{ padding: '5px', border: '1px solid #1A1A26' }}>נ"נ מנהל מ.קטנה</th>
                      <th style={{ padding: '5px', border: '1px solid #1A1A26' }}>נ"נ מנהל מ.בינונית</th>
                      <th style={{ padding: '5px', border: '1px solid #1A1A26' }}>נ"נ מנהל מ.גדולה</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)', textAlign: 'right' }}>עד גיל 40</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>42</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>7.5</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>182</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>35</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>4.5</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>2.5</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,345</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,321</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,224</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,199</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,149</td>
                    </tr>
                    <tr style={{ backgroundColor: '#252435' }}>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)', textAlign: 'right' }}>+40 עם ותק 0-2 שנים</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>42</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>7.5</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>182</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>35</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>4.5</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>2.5</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,345</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,321</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,224</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,199</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,149</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)', textAlign: 'right' }}>משרת אם בכל גיל עם ותק 0-2 שנים</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>40</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>7</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>173</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>34</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>3.5</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>2.5</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,242</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,217</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,127</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,102</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,052</td>
                    </tr>
                    <tr style={{ backgroundColor: '#252435' }}>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)', textAlign: 'right' }}>+40 עם ותק 2-5 שנים</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>40</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>7</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>173</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>34</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>3.5</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>2.5</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,242</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,217</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,127</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,102</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,052</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)', textAlign: 'right' }}>+40 עם ותק +5 שנים</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>37.5</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>6.5</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>162</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>34</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1.5</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>2</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,210</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,186</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,095</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,070</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,020</td>
                    </tr>
                    <tr style={{ backgroundColor: '#252435' }}>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)', textAlign: 'right' }}>+50 עם ותק +5 שנים</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>35</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>6</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>152</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>32</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1.5</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1.5</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,107</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1,082</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>997</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>972</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>923</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )
        }
      ]
    },
    {
      category: "תוספות קבועות",
      items: [
        { 
          title: "תוספת ניהול מרפאה", 
          description: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>ניהול מרפאה מקנה מספר הטבות:</div>
              <ol style={{ paddingRight: '20px', margin: 0 }}>
                <li style={{ marginBottom: '10px' }}>תוספת קבועה לשכר (1129 - רופא אזורי) הנקבעת בהתאם לגודל המרפאה ומרכיב אישי משתנה בשם "ערך יום".</li>
                <li style={{ marginBottom: '10px' }}>הפחתת נורמת הנפשות (ראה טבלה ברכיב "היקף משרה").</li>
                <li>"שעות ניהול" - מנהל מרפאה מקבל זמן במהלך היום עבודה המוקדש לעבודת הניהול. זמן זה יורד מהשעות הפרונטליות, כך שבפועל יש למנהלי מרפאות פחות שעות קבלת קהל.</li>
              </ol>
              
              {/* --- הטבלה --- */}
              <div style={{ marginTop: '10px', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.75rem', border: '1px solid rgba(216, 191, 216, 0.3)' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#9CAF88', color: '#1A1A26' }}>
                      <th style={{ padding: '5px', border: '1px solid #1A1A26' }}>גודל מרפאה</th>
                      <th style={{ padding: '5px', border: '1px solid #1A1A26' }}>מספר משרות רופא</th>
                      <th style={{ padding: '5px', border: '1px solid #1A1A26' }}>מספר כוננויות</th>
                      <th style={{ padding: '5px', border: '1px solid #1A1A26' }}>שעות ניהול</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>מנהל שירות</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>2-2.99</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>8</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>1</td>
                    </tr>
                    <tr style={{ backgroundColor: '#252435' }}>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>מרפאה קטנה</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>3-3.99</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>16</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>3</td>
                    </tr>
                    <tr>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>מרפאה בינונית</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>4-7.99</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>18</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>4</td>
                    </tr>
                    <tr style={{ backgroundColor: '#252435' }}>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>מרפאה גדולה</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>8 ומעלה</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>24</td>
                      <td style={{ padding: '5px', border: '1px solid rgba(216, 191, 216, 0.3)' }}>6</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )
        },
      ]
    },
    {
      category: "עבודה נוספת",
      items: [
        { 
          title: "הסכם קהילה", 
          description: "רופא (גם מתמחה משלב ב') יכול להצטרף להסכם קהילה בתנאי שהוא עובד בהיקף של חצי משרה ומעלה.\nחתימה על הסכם קהילה מגדילה את התעריף המשולם לנפש מעל הנורמה (1120 - נפשות עיר) וכן לנפשות מעל גיל 65 (סמל 832).\n\nחתימה על הסכם קהילה מחייבת הוספת שעות פרונטליות (קבלת קהל) נוספות.\nעד 400 נפשות מעל הנורמה נדרש להוסיף 2 שעות.\nכל 150 נפשות נוספות (מהנפש הראשונה) נדרש להוסיף עוד שעה." 
        },
      ]
    },
  ];

  return (
    <div id="salary-simulator-root" style={mainWrapperStyle}>
      
      <style dangerouslySetInnerHTML={{__html: `
        #salary-simulator-root {
          --edge-margin: -30px;
          --edge-padding: 30px;
        }
        #salary-simulator-root * {
          font-family: Arial, "Helvetica Neue", Helvetica, sans-serif !important;
        }

        ::selection {
          background-color: #9CAF88 !important;
          color: #0D0D12 !important;
        }
        ::-moz-selection {
          background-color: #9CAF88 !important;
          color: #0D0D12 !important;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #000000;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: #9CAF88;
          border-radius: 10px;
        }
        
        .hover-input {
          transition: all 0.3s ease !important;
          outline: none !important;
        }
        .hover-input:hover {
          background-color: #333247 !important;
          box-shadow: inset 0 0 0 1px #D8BFD8 !important;
        }

        .hover-input:focus {
          background-color: #333247 !important;
          box-shadow: 0 0 0 1px #9CAF88 !important;
          color: #ffffff !important;
        }

        .main-layout {
          grid-template-columns: 1fr 1fr;
        }

        .data-card {
          height: max-content !important;
          flex: 0 0 auto !important;
        }

       .data-card > div:last-child {
          margin-bottom: 0 !important;
          border-bottom: none !important;
          border-bottom-right-radius: 24px !important;
          border-bottom-left-radius: 24px !important;
        }

        /* אפקט ריחוף ייחודי לשורות במסך המידע */
        .info-item-button:hover {
          background-color: rgba(156, 175, 136, 0.1) !important; /* הארה עדינה בירוק מרווה */
        }

        /* מוודא שהטקסט נשאר ברור בריחוף */
        .info-item-button:hover span {
          color: #ffffff !important;
        }

        /* הגדרת האנימציה החדשה למשולש (תזוזה שמאלה וחזרה) */
        @keyframes slideLeftRight {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-6px); } /* זז 6 פיקסלים שמאלה */
        }

        /* הפעלת האנימציה על המשולש רק כשמרחפים על השורה */
        .info-item-button:hover .animated-arrow {
          animation: slideLeftRight 0.8s ease-in-out infinite;
        }

        /* פסי הפרדה שחורים ורווחים לאזור הזנת הנתונים מקצה לקצה */
        .inputs-list > div {
          margin: 0 var(--edge-margin) !important;
          padding: 10px var(--edge-padding) !important;
        }
        .inputs-list > div:not(:last-child) {
          border-bottom: 2px solid #000000;
        }


        /* ---------- התמאה מובייל ---------- */
        @media (max-width: 768px) {
          .main-layout { 
            grid-template-columns: 1fr !important; 
            gap: 40px !important; 
          }
          
          #salary-simulator-root {
            --edge-margin: -14px;
            --edge-padding: 14px;
          }

          /* 1. הקטנת הפונט הכללי של האפליקציה (תוויות, טקסטים) */
          #salary-simulator-root {
            font-size: 12px !important; 
            padding: 15px 10px !important; 
          }

          /* 2. הקטנת שדות ההזנה והטקסט שבתוכם */
          .hover-input , .select-wrapper {
            width: 140px !important; 
            max-width: 55vw !important;
            font-size: 18px !important; 
          }
          
          /* מחריגים את שורות המידע מהגבלת הרוחב של שדות ההזנה במובייל */
          .info-item-button {
            width: auto !important;
            max-width: none !important;
          }

          /* 3. הקטנת הכותרת הראשית */
          h1 {
            font-size: 2.0rem !important; 
          }

          /* 4. הקטנת כותרות משניות (כמו "נתוני בסיס", "תוספות קבועות") */
          h2, h3 {
            font-size: 20px !important;
          }

          /* הקטנת כפתורי הפינה במובייל */
          .corner-action-btn {
            transform: scale(0.65); /* מכווץ את הכפתור ל-75% מגודלו */
            transform-origin: top right; /* שומר אותו צמוד בדיוק לפינה הימנית העליונה */
          }

          /* 6. הקטנת הדיסקליימר */
          .disclaimer-text {
            font-size: 11px !important;
            line-height: 1.3 !important;
            padding: 0 10px !important;
          }

          /* 7. הקטנת הרווח הפנימי של הכרטיסיות הכהות במובייל */
          .data-card {
            padding: 20px 14px 0px !important;
          }
          
            /* רוחב החלק העליון של הכרטיסיות */
          .category-header {
            margin: -20px -14px 0px -14px !important;
            padding: 6px 14px !important;
          }

          /* 8. הקטנת הטקסט ספציפית בדרופ-דאון של ניהול מרפאה */
          #clinic-row .select-wrapper * {
            font-size: 13px !important;
          }
          
          /* הקטנת הרווח בין הכותרות במובייל */
          .main-title-wrapper {
            margin-bottom: 15px !important;
          }

          /* הזזת אזור הכותרות למטה וצמצום הרווח מהכרטיסיות במובייל */
          .header-container {
            margin-top: 25px !important;   /* זהו הרווח מהקצה העליון של המסך */
            margin-bottom: 20px !important; /* זהו הרווח לכיוון הכרטיסיות */
          }

         /* צמצום הרווחים סביב קו ההפרדה במובייל */
          .title-divider {
            margin-top: 10px !important;    /* רווח מעל הקו */
            margin-bottom: 0px !important; /* צמצום הרווח מתחת לקו */
          }

          #salary-simulator-root {
            padding: 15px 10px !important; 
          }
        }

        /* --- אנימציות לחלון הצף --- */
        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUpModal {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
      `}} />

      {/* ================= מסך הסימולטור ================= */}
      {currentView === 'simulator' && (
        <>
          {/* מיכל הכותרת (מוגדר כ-relative כדי לאפשר לכפתור לצוף בתוכו) */}
          <div className="header-container" style={{ position: 'relative', textAlign: 'center', marginBottom: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            
            {/* הכפתור צף בפינה הימנית העליונה */}
            <div className="corner-action-btn" style={{ position: 'absolute', top: '0', right: '0' }}>
              <InfoButton onClick={() => setCurrentView('info')} />
            </div>
            
            <div className="main-title-wrapper" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
              <h1 style={{ ...fontArial, margin: 0, fontSize: '2.8rem', fontWeight: 'bold', letterSpacing: '-0.5px', color: '#ffffff' }}>
                סימולטור שכר
              </h1>
            </div>

            <h2 style={{ ...fontArial, margin: '0', fontSize: '1.4rem', fontWeight: 'bold', color: textSage, opacity: 0.9 }}>
              רופאי משפחה בקופ"ח כללית
            </h2>
            
            <div className="title-divider" style={{ width: '100%', maxWidth: '800px', height: '1px', backgroundColor: 'rgba(216, 191, 216, 0.2)', marginTop: '20px', marginBottom: '5px' }}></div>
            
            <Disclaimer />
          </div>
          
      <div className="main-layout" style={{ display: 'grid', gap: '30px', maxWidth: '1000px', margin: '0 auto' }}>
        
        <div className="data-card" style={{ ...cardStyle, height: 'fit-content' }}>
          <CategoryHeader title="הזנת נתונים" />
          
          <div className="inputs-list" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={rowFlex}>
              <label style={inputLabelStyle}>גיל</label>
              <input className="hover-input" type="number" step="0.1" value={data.age} onChange={e => update('age', e.target.value)} onFocus={e => e.target.select()} style={inputFieldStyle} />
            </div>
            <div style={rowFlex}>
              <label style={inputLabelStyle}>דרגה</label>
              <CustomSelect value={data.grade} onChange={v => update('grade', v)} options={['1', '2', '3', '3+', '4', '5', '6', '6+', '7', '7+', '8', '8+', '9', '9+', '10', '10+', '11', '11+', '12', '12+']} />
            </div>
            <div style={rowFlex}>
              <label style={inputLabelStyle}>ותק</label>
              <input className="hover-input" type="number" step="0.01" value={data.seniority} onChange={e => update('seniority', e.target.value)} onFocus={e => e.target.select()} style={inputFieldStyle} />
            </div>
            <div style={rowFlex}>
              <label style={inputLabelStyle}>סטטוס מעמד</label>
              <CustomSelect value={data.status} onChange={v => update('status', v)} options={['מומחה', 'מתמחה']} />
            </div>
            
            <div style={rowFlex}>
              <label style={inputLabelStyle}>חלקיות משרה</label>
              <CustomSelect value={data.jobPercentage} onChange={v => update('jobPercentage', v)} options={['100%']} />
            </div>

            <div style={rowFlex}>
              <label style={inputLabelStyle}>הסכם קהילה</label>
              <SegmentedControl value={data.community} onChange={v => update('community', v)} options={['כן', 'לא']} />
            </div>
            <div style={rowFlex}>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                <label style={inputLabelStyle}>רופא נלווה</label>
                <span style={subLabelStyle}>השתתפות בתוכנית</span>
              </div>
              <SegmentedControl value={data.accompanying} onChange={v => update('accompanying', v)} options={['כן', 'לא']} />
            </div>
            <div style={rowFlex}>
              <label style={inputLabelStyle}>משרת אם</label>
              <SegmentedControl value={data.mother} onChange={v => update('mother', v)} options={['כן', 'לא']} />
            </div>
            <div id="clinic-row" style={rowFlex}>
              <label style={inputLabelStyle}>ניהול מרפאה</label>
              <CustomSelect 
                value={data.management} 
                onChange={v => update('management', v)} 
                options={[
                  { label: 'לא', value: 'לא' },
                  { label: 'מנהל שירות', value: 'מנהל שירות' },
                  { label: 'מרפאה קטנה', value: 'קטנה' },
                  { label: 'מרפאה בינונית', value: 'בינונית' },
                  { label: 'מרפאה גדולה', value: 'גדולה' }
                ]} 
              />
            </div>
            
            <div style={rowFlex}>
              <label style={inputLabelStyle}>נפשות משוקללות</label>
              <input className="hover-input" type="number" value={data.weightedSouls} onChange={e => update('weightedSouls', e.target.value)} onFocus={e => e.target.select()} style={inputFieldStyle} />
            </div>
            <div style={rowFlex}>
              <label style={inputLabelStyle}>מטופלים +65</label>
              <input className="hover-input" type="number" value={data.elderlyCount} onChange={e => update('elderlyCount', e.target.value)} onFocus={e => e.target.select()} style={inputFieldStyle} />
            </div>
            
            <div style={rowFlex}>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                <label style={inputLabelStyle}>ביקורי בית</label>
                <span style={subLabelStyle}>באזור המרפאה</span>
              </div>
              <input className="hover-input" type="number" value={data.homeVisits} onChange={e => update('homeVisits', e.target.value)} onFocus={e => e.target.select()} style={inputFieldStyle} />
            </div>
            
            <div style={rowFlex}>
              <label style={inputLabelStyle}>פתקי עמית</label>
              <input className="hover-input" type="number" value={data.peerNotesCount} onChange={e => update('peerNotesCount', e.target.value)} onFocus={e => e.target.select()} style={inputFieldStyle} />
            </div>
            
            <div style={rowFlex}>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                <label style={inputLabelStyle}>מיעוד</label>
                <span style={subLabelStyle}>מספר משמרות בחודש</span>
              </div>
              <input className="hover-input" type="number" value={data.miudCount} onChange={e => update('miudCount', e.target.value)} onFocus={e => e.target.select()} style={inputFieldStyle} />
            </div>

            <div style={rowFlex}>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                <label style={inputLabelStyle}>פיצולים</label>
                <span style={subLabelStyle}>מספר הפסקות בשבוע</span>
              </div>
              <CustomSelect value={data.splitBreaks} onChange={v => update('splitBreaks', v)} options={[0, 1, 2, 3, 4, 5]} />
            </div>

            <div style={rowFlex}>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                <label style={inputLabelStyle}>תעודות רפואיות</label>
                <span style={subLabelStyle}>רשיון נשק / נהיגה</span>
              </div>
              <input className="hover-input" type="number" value={data.certificates} onChange={e => update('certificates', e.target.value)} onFocus={e => e.target.select()} style={inputFieldStyle} />
            </div>

            <div style={rowFlex}>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                <label style={inputLabelStyle}>שעות נוספות</label>
                <span style={subLabelStyle}>כמות חודשית</span>
              </div>
              <input className="hover-input" type="number" value={data.overtimeHours} onChange={e => update('overtimeHours', e.target.value)} onFocus={e => e.target.select()} style={inputFieldStyle} />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          <div className="data-card" style={cardStyle}>
            <CategoryHeader title="היקף משרה" />
            
            <div style={listItemStyle}><div style={rowFlex}><span style={labelStyle}>קיצור יום (תקן יום)</span><span style={valStyle}>{dayStandard} ש</span></div></div>
            <div style={listItemStyle}><div style={rowFlex}><span style={labelStyle}>שעות למשרה בשבוע</span><span style={valStyle}>{weeklyHours} ש</span></div></div>
            <div style={listItemStyle}>
              <div style={rowFlex}>
                <span style={labelStyle}>שעות פרונטליות בשבוע</span>
                <span style={valStyle}>{frontalHours} ש</span>
              </div>
              
              {data.community === 'כן' && (
                <div style={detailStyle}>
                  (שעות הסכם קהילה נדרשות: {excessSouls > 400 ? 2 + Math.ceil((excessSouls - 400) / 150) : 2})
                </div>
              )}
            </div>
            <div style={listItemStyle}><div style={rowFlex}><span style={labelStyle}>שעות לא פרונטליות</span><span style={valStyle}>{nonFrontalHours} ש</span></div></div>
            <div style={listItemStyle}><div style={rowFlex}><span style={labelStyle}>שעות השתלמות עצמית</span><span style={valStyle}>{selfStudyHours} ש</span></div></div>
            <div style={listItemStyle}><div style={rowFlex}><span style={labelStyle}>שעות תקן (חודשי)</span><span style={valStyle}>{monthStandard} ש</span></div></div>
            
            <div style={{...listItemStyle, marginBottom: '0'}}>
              <div style={rowFlex}>
                <span style={labelStyle}>נורמת נפשות</span>
                <span style={valStyle}>{norm.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="data-card" style={cardStyle}>
            <CategoryHeader title="שכר למשרה" total={totalBaseSalary} />
            <div style={listItemStyle}><div style={rowFlex}><span style={labelStyle}>4 - שכר משולב</span><span style={valStyle}>{formatCurrency(combinedSalary)}</span></div></div>
            <div style={{...listItemStyle, marginBottom: '0'}}><div style={rowFlex}><span style={labelStyle}>553 - תוספת שקלית</span><span style={valStyle}>{formatCurrency(incremental2024)}</span></div></div>
          </div>

          <div className="data-card" style={cardStyle}>
            <CategoryHeader title="תוספות קבועות" total={totalFixedAdditions} />
            {data.management !== 'לא' && (
              <div style={listItemStyle}>
                <div style={rowFlex}>
                  <span style={labelStyle}>1129 - רופא אזורי (ניהול)</span>
                  <span style={valStyle}>{formatCurrency(regionalDoctorAddition)}</span>
                </div>
                <div style={detailStyle}>(כוננויות: {onCallCount} | ערך יום: {dayValue.toFixed(2)})</div>
              </div>
            )}
            <div style={listItemStyle}><div style={rowFlex}><span style={labelStyle}>1223 - מינהל מרפאה</span><span style={valStyle}>{formatCurrency(clinicAdminAddition)}</span></div></div>
            <div style={listItemStyle}><div style={rowFlex}><span style={labelStyle}>1312 - הסכם 2000</span><span style={valStyle}>{formatCurrency(agreement2000Addition)}</span></div></div>
            <div style={listItemStyle}><div style={rowFlex}><span style={labelStyle}>1522 - משלימה 2012</span><span style={valStyle}>{formatCurrency(completion2012Addition)}</span></div></div>
            {data.status === 'מתמחה' && (
              <div style={{...listItemStyle, marginBottom: '0'}}><div style={rowFlex}><span style={labelStyle}>1117 - תוספת מתמחה</span><span style={valStyle}>{formatCurrency(internAddition)}</span></div></div>
            )}
          </div>

          <div className="data-card" style={cardStyle}>
            <CategoryHeader title="עבודה נוספת" total={totalAdditionalWork} />
            
            <div style={listItemStyle}>
              <div style={rowFlex}><span style={labelStyle}>832 - נפשות +65</span><span style={valStyle}>{formatCurrency(souls65PlusAddition)}</span></div>
              <div style={detailStyle}>(כמות: {data.elderlyCount} | תעריף: {rate832.toFixed(2)} | מקדם: {coeff832})</div>
            </div>

            {excessSouls > 0 && (
              <div style={listItemStyle}>
                <div style={rowFlex}><span style={labelStyle}>1120 - נפשות עיר</span><span style={valStyle}>{formatCurrency(citySoulsAddition)}</span></div>
                <div style={detailStyle}>(כמות: {excessSouls.toLocaleString()} | תעריף: {rate1120.toFixed(2)} | מקדם: {coeff1120})</div>
              </div>
            )}

            {homeVisitsAddition > 0 && (
              <div style={listItemStyle}>
                <div style={rowFlex}><span style={labelStyle}>1080 - ביקורי בית</span><span style={valStyle}>{formatCurrency(homeVisitsAddition)}</span></div>
                <div style={detailStyle}>(כמות: {homeVisitsAmount} | תעריף: {homeVisitsRate})</div>
              </div>
            )}

            {peerNotesAddition > 0 && (
              <div style={listItemStyle}>
                <div style={rowFlex}><span style={labelStyle}>1122 - פתקי עמית</span><span style={valStyle}>{formatCurrency(peerNotesAddition)}</span></div>
                <div style={detailStyle}>(כמות: {peerNotesAmount} | תעריף: {peerNotesRate})</div>
              </div>
            )}
            
            {accompanyingAddition > 0 && (
              <div style={listItemStyle}>
                <div style={rowFlex}><span style={labelStyle}>1159 - רופא נלווה</span><span style={valStyle}>{formatCurrency(accompanyingAddition)}</span></div>
              </div>
            )}

            {miudAddition > 0 && (
              <div style={listItemStyle}>
                <div style={rowFlex}><span style={labelStyle}>1192 - מיעוד</span><span style={valStyle}>{formatCurrency(miudAddition)}</span></div>
                <div style={detailStyle}>(כמות: {miudAmount} | תעריף: {miudRate})</div>
              </div>
            )}

            {splitAddition > 0 && (
              <div style={listItemStyle}>
                <div style={rowFlex}><span style={labelStyle}>1262 - תוספת פיצול</span><span style={valStyle}>{formatCurrency(splitAddition)}</span></div>
              </div>
            )}

            {certificatesAddition > 0 && (
              <div style={listItemStyle}>
                <div style={rowFlex}><span style={labelStyle}>1500 - תעודות רפואיות</span><span style={valStyle}>{formatCurrency(certificatesAddition)}</span></div>
                <div style={detailStyle}>(כמות: {certificatesAmount} | תעריף: {certificatesRate})</div>
              </div>
            )}

            {geriatricAddition > 0 && (
              <div style={listItemStyle}>
                <div style={rowFlex}><span style={labelStyle}>1616 - גריאטרי +65</span><span style={valStyle}>{formatCurrency(geriatricAddition)}</span></div>
                <div style={detailStyle}>(כמות: {geriatricAmount} | תעריף: {geriatricRate} | מקדם: {geriatricCoeff})</div>
              </div>
            )}

            {overtimeAddition > 0 && (
              <div style={{...listItemStyle, marginBottom: '0'}}>
                <div style={rowFlex}><span style={labelStyle}>841 - שעות נוספות (125%)</span><span style={valStyle}>{formatCurrency(overtimeAddition)}</span></div>
                <div style={detailStyle}>(כמות: {overtimeAmount} | ערך שעה: {hourlyRate.toFixed(2)} | מקדם: {overtimeCoeff})</div>
              </div>
            )}
          </div>

          <div className="data-card" style={cardStyle}>
            <CategoryHeader title="החזר הוצאות" total={totalExpenses} />
            <div style={listItemStyle}><div style={rowFlex}><span style={labelStyle}>1201 - נסיעות</span><span style={valStyle}>{formatCurrency(travelExpense)}</span></div></div>
            <div style={{...listItemStyle, marginBottom: '0'}}><div style={rowFlex}><span style={labelStyle}>1285 - השתתפות טלפון</span><span style={valStyle}>{formatCurrency(phoneExpense)}</span></div></div>
          </div>

        </div>

      </div>

      <div style={{
        backgroundColor: '#9CAF88',
        color: '#0D0D12',
        maxWidth: '1000px',
        margin: '30px auto 20px auto',
        borderRadius: '12px', 
        padding: '4px 20px', 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
        
        /* --- פקודות הריחוף החדשות --- */
        position: 'sticky',
        bottom: '20px',
        zIndex: 100,
        boxShadow: '0 -5px 25px rgba(0, 0, 0, 0.3)'
      }}>
        <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 'bold', color: '#0D0D12' }}>סה"כ (ברוטו)</h2>
        <div style={{ fontSize: '1.6rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', direction: 'ltr', color: '#0D0D12' }}>
          <span style={{ marginRight: '8px' }}>₪</span>
          <span>{grossSalary.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>
      </>
      )}

      {/* ================= מסך המידע הנוסף ================= */}
      {currentView === 'info' && (
        <>
          {/* מיכל הכותרת של מסך המידע */}
          <div className="header-container" style={{ position: 'relative', textAlign: 'center', marginBottom: '40px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            
            {/* כפתור החזרה צף בפינה הימנית העליונה */}
            <div className="corner-action-btn" style={{ position: 'absolute', top: '0', right: '0' }}>
              <BackButton onClick={() => setCurrentView('simulator')} />
            </div>

            <h1 style={{ ...fontArial, fontSize: '2.8rem', fontWeight: 'bold', color: '#ffffff', margin: '0 0 10px 0' }}>מידע נוסף</h1>
            <h2 style={{ ...fontArial, fontSize: '1.4rem', color: textSage, margin: 0, fontWeight: 'bold' }}>תוספות ורכיבי שכר</h2>
            
            <div className="title-divider" style={{ width: '100%', maxWidth: '800px', height: '1px', backgroundColor: 'rgba(216, 191, 216, 0.2)', marginTop: '20px', marginBottom: '5px' }}></div>
            
            <Disclaimer />
          </div>

          {/* ציור הכרטיסיות הכהות והרכיבים מתוך מאגר המידע */}
          <div className="main-layout" style={{ display: 'grid', gap: '30px' }}>
            {infoData.map((section, index) => (
              <div key={index} className="data-card" style={cardStyle}>
                
                <CategoryHeader title={section.category} />
                
                {/* ביטלנו את ה-gap כדי שהשורות ייצמדו, ויצרנו עיצוב שורות כמו בסימולטור */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {section.items.map((item, itemIdx) => {
                    // בודקים אם זה הפריט האחרון בכרטיסייה כדי לא לשים לו קו הפרדה למטה
                    const isLast = itemIdx === section.items.length - 1;
                    
                    return (
                      <div 
                        key={itemIdx}
                        className="hover-input info-item-button"
                        onClick={() => setSelectedInfo(item)}
                        style={{ 
                          backgroundColor: 'transparent', 
                          cursor: 'pointer', 
                          display: 'flex', 
                          justifyContent: 'space-between', /* מרווח בין הטקסט לחץ */
                          alignItems: 'center', 
                          margin: '0 var(--edge-margin)', /* מתיחה מקצה לקצה כמו בסימולטור */
                          padding: '16px var(--edge-padding)', 
                          borderBottom: isLast ? 'none' : '2px solid #000000', /* קו ההפרדה השחור! */
                          borderBottomRightRadius: isLast ? '24px' : '0',
                          borderBottomLeftRadius: isLast ? '24px' : '0',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <span style={{ 
                          color: '#D8BFD8', 
                          fontSize: '1.2rem', 
                          fontWeight: 'bold'
                        }}>
                          {item.title}
                        </span>
                        
                        {/* משולש שמאלה עם קלאס לאנימציה */}
                        <span className="animated-arrow" style={{ color: '#9CAF88', fontSize: '1rem', opacity: 0.8, display: 'inline-block' }}>◀</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* הציור של החלון הצף (Modal) - מופיע רק אם לחצו על משהו */}
          {selectedInfo && (
            <div 
              onClick={() => setSelectedInfo(null)} // סגירה בלחיצה על הרקע
              style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(13,13,18,0.85)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', boxSizing: 'border-box', animation: 'fadeInOverlay 0.3s ease-out' }}
            >
              <div 
                onClick={(e) => e.stopPropagation()} // מונע סגירה כשלוחצים בתוך החלון הלבן
                style={{ backgroundColor: '#15151E', border: '1px solid #D8BFD8', borderRadius: '24px', padding: '15px', maxWidth: '600px', width: '100%', position: 'relative', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', animation: 'slideUpModal 0.4s ease-out', textAlign: 'right', direction: 'rtl', maxHeight: '90vh', overflowY: 'auto' }}
              >
                {/* כפתור סגירה X */}
                <button 
                  onClick={() => setSelectedInfo(null)}
                  style={{ position: 'absolute', top: '10px', left: '20px', background: 'none', border: 'none', color: '#9CAF88', fontSize: '1.5rem', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  ✕
                </button>
                
                <h2 style={{ color: '#D8BFD8', marginTop: 0, fontSize: '1.8rem', paddingRight: '30px' }}>{selectedInfo.title}</h2>
                <div style={{ borderTop: '1px solid rgba(216,191,216,0.1)', margin: '15px 0' }}></div>
                <div style={{ color: '#ffffff', fontSize: '1.1rem', lineHeight: '1.6', margin: 0, whiteSpace: 'pre-line' }}>
                  {selectedInfo.description}
                </div>
              </div>
            </div>
          )}

        </>
      )}

    {/* הוספת הקרדיט בתחתית הקונטיינר הראשי */}
        <FooterCredits />
      </div>
    );
  }