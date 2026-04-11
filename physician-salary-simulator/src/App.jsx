import React, { useState } from 'react';

// --- רכיבים מותאמים אישית (Custom Components) ---

// 1. כפתור בחירה מפוצל (Segmented Control) לכן/לא
const SegmentedControl = ({ value, onChange, options }) => (
  <div 
    className="hover-input" // <--- הוספת האפקט
    style={{ 
      display: 'flex', 
      backgroundColor: '#0e2e38', 
      borderRadius: '12px', 
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
          backgroundColor: value === opt ? '#e69a88' : 'transparent',
          color: value === opt ? '#082129' : '#e69a88',
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

// 2. תפריט נפתח מעוצב (Custom Dropdown)
const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  const currentItem = options.find(o => (typeof o === 'object' ? o.value === value : o === value));
  const displayValue = typeof currentItem === 'object' ? currentItem.label : currentItem;

  return (
    <div style={{ position: 'relative', width: '200px', height: '36px', fontFamily: 'Arial, "Helvetica Neue", Helvetica, sans-serif' }}>
      {isOpen && <div style={{ position: 'fixed', inset: 0, zIndex: 9 }} onClick={() => setIsOpen(false)} />}
      
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="hover-input" // <--- הוספת האפקט
        style={{
          backgroundColor: '#0e2e38',
          color: '#e69a88',
          padding: '0 16px',
          borderRadius: '12px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxSizing: 'border-box',
          border: isOpen ? '1px solid rgba(230, 154, 136, 0.5)' : '1px solid transparent',
          transition: 'all 0.3s ease',
          width: '100%',
          height: '100%' 
        }}
      >
        <span style={{ flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>{displayValue}</span>
        <span style={{ fontSize: '0.7rem', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
      </div>
      
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 5px)',
          left: 0,
          right: 0,
          backgroundColor: '#082129',
          border: '1px solid rgba(230, 154, 136, 0.4)',
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
                  padding: '10px 16px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  color: hovered === idx ? '#082129' : '#e69a88',
                  backgroundColor: hovered === idx ? '#e69a88' : 'transparent',
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

// 3. כפתור מידע מעוצב (Info Button) ב-SVG ידני
const InfoButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute', 
        top: '40px',
        right: '40px',
        cursor: 'pointer',
        transform: isHovered ? 'scale(1.05)' : 'scale(1)', 
        transition: 'transform 0.3s ease'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open('https://your-link-here.com', '_blank')} 
      title="למידע נוסף על תלוש השכר"
    >
      <svg 
        width="44" 
        height="44" 
        viewBox="0 0 24 24" 
        fill={isHovered ? '#ffffff' : '#f09888'} 
        xmlns="http://www.w3.org/2000/svg"
        style={{ transition: 'fill 0.3s ease' }}
      >
        <circle cx="12" cy="12" r="12" />
        <path d="M12 17V11" stroke="#012733" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="12" cy="7.5" r="1.5" fill="#012733" />
      </svg>
      <span style={{ 
        fontFamily: 'Arial, sans-serif', 
        fontSize: '0.85rem', 
        color: isHovered ? '#ffffff' : '#f09888', 
        marginTop: '0px',
        transition: 'color 0.3s ease'
      }}>
        מידע נוסף
      </span>
    </div>
  );
};


export default function App() {
  // --- 1. כל נתוני הקלט (עם ערכי ברירת המחדל) ---
  const [data, setData] = useState({
    age: 40.2, 
    status: 'מומחה',
    grade: '4', 
    seniority: 7.92, 
    management: 'לא',
    mother: 'לא',
    community: 'לא',
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

  // --- צבעים וסגנונות ---
  const bgMain = '#0e2e38'; 
  const bgCard = '#082129'; 
  const textPeach = '#e69a88'; 
  const textDisclaimer = '#f09888'; 
  const inputBg = '#0e2e38'; 
  const inputText = '#e69a88'; 

  const fontArial = { fontFamily: '"Arial", "Helvetica Neue", Helvetica, sans-serif' };

  const mainWrapperStyle = {
    ...fontArial,
    direction: 'rtl',
    padding: '40px 20px',
    backgroundColor: bgMain,
    minHeight: '100vh',
    color: textPeach,
    position: 'relative' 
  };

  const cardStyle = { 
    backgroundColor: bgCard, 
    padding: '20px 30px 30px',
    borderRadius: '24px', 
    border: `1px solid rgba(240, 152, 136, 0.25)`, 
    display: 'flex',
    flexDirection: 'column'
  };

  const rowFlex = { 
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  };

  const CategoryHeader = ({ title, total }) => (
    <div style={{
      margin: '-20px -30px 20px -30px', 
      padding: '12px 30px 8px 30px',
      borderBottom: `8px solid ${bgMain}`, 
      borderTopLeftRadius: '24px', 
      borderTopRightRadius: '24px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }}>
      <h3 style={{ ...fontArial, color: '#ffffff', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
        {title}
      </h3>
      {total !== undefined && (
        <div style={{ ...fontArial, fontSize: '1.1rem', color: '#ffffff', fontWeight: 'bold' }}>
          <span>סה"כ </span>
          {formatCurrency(total)}
        </div>
      )}
    </div>
  );

  const listItemStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: bgMain, 
    borderRadius: '12px', 
    padding: '6px 16px', 
    marginBottom: '16px' 
  };

  const inputLabelStyle = {
    ...fontArial,
    color: textPeach,
    fontSize: '1.1rem',
    fontWeight: 'bold',
    textAlign: 'right'
  };

  const subLabelStyle = {
    ...fontArial,
    fontSize: '0.85rem',
    fontWeight: 'normal',
    color: textPeach,
    opacity: 0.8,
    textAlign: 'right',
    marginTop: '0px'
  };

  const labelStyle = {
    ...fontArial,
    color: textPeach,
    fontSize: '1.1rem',
    fontWeight: 'bold'
  };

  const valStyle = {
    ...fontArial,
    color: textPeach,
    fontSize: '1.1rem',
    fontWeight: 'bold'
  };

  const inputFieldStyle = { 
    ...fontArial,
    backgroundColor: inputBg,
    color: inputText,
    padding: '0 16px', 
    borderRadius: '12px',
    border: 'none', 
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
    color: textPeach, 
    opacity: 0.8,
    marginTop: '2px', 
    lineHeight: '1.2',
    textAlign: 'right'
  };

  const highlightStyle = {
    backgroundColor: textPeach, 
    borderRadius: '12px',
    padding: '6px 16px',
    marginTop: '8px',
    border: 'none'
  };

  return (
    <div id="salary-simulator-root" style={mainWrapperStyle}>
      
      <style dangerouslySetInnerHTML={{__html: `
        #salary-simulator-root,
        #salary-simulator-root * {
          font-family: Arial, "Helvetica Neue", Helvetica, sans-serif !important;
        }

        /* --- צבע ה-Select All --- */
        ::selection {
          background-color: #e69a88 !important;
          color: #082129 !important;
        }
        ::-moz-selection {
          background-color: #e69a88 !important;
          color: #082129 !important;
        }

        /* ביטול החצים בשדות מספר */
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type=number] {
          -moz-appearance: textfield;
        }

        /* Custom Scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: #082129;
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: #e69a88;
          border-radius: 10px;
        }
        
        /* אפקט ריחוף (Hover) */
        .hover-input {
          transition: all 0.3s ease !important;
          outline: none !important;
        }
        .hover-input:hover {
          background-color: #164250 !important;
          box-shadow: inset 0 0 0 1px rgba(230, 154, 136, 0.4) !important;
        }

        /* אפקט פוקוס (Focus) */
        .hover-input:focus {
          background-color: #1c5465 !important;
          box-shadow: 0 0 0 2px rgba(230, 154, 136, 0.8) !important;
          color: #ffffff !important;
        }

        /* --- התאמות למובייל (רספונסיביות) --- */
        .main-layout {
          grid-template-columns: 1fr 1fr;
        }

        @media (max-width: 768px) {
          .main-layout {
            grid-template-columns: 1fr !important; /* הופך לעמודה אחת */
          }
          
          .hover-input {
            width: 100% !important; /* מרחיב את השדות לרוחב הטלפון */
            max-width: 100% !important;
          }
          
          #salary-simulator-root {
            padding: 20px 10px !important; /* מקטין שוליים בטלפון */
          }
        }
      `}} />

      <InfoButton />
      
      <div style={{ textAlign: 'center', marginBottom: '50px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
          <h1 style={{ ...fontArial, margin: 0, fontSize: '2.8rem', fontWeight: 'bold', letterSpacing: '-0.5px', color: '#ffffff' }}>
            סימולטור שכר
          </h1>
        </div>

        <h2 style={{ ...fontArial, margin: '0', fontSize: '1.4rem', fontWeight: 'bold', color: textPeach, opacity: 0.9 }}>
          רופאי משפחה בקופ"ח כללית
        </h2>
        
        <div style={{ width: '100%', maxWidth: '800px', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.2)', marginTop: '20px', marginBottom: '5px' }}></div>
        
        <p style={{
          ...fontArial,
          margin: '15px 0 0 0',
          fontSize: '0.95rem',
          fontWeight: 'normal',
          color: textDisclaimer,
          maxWidth: '800px',
          lineHeight: '1.5',
          opacity: 0.9
        }}>
          סימולטור זה הינו כלי עזר פרטי ואינו מוצר רשמי של שירותי בריאות כללית. החישובים המוצגים בו מבוססים על הערכות ופרשנות אישית של הסכמי השכר, ואין לראות בהם נתונים מחייבים או ייעוץ מקצועי. התוצאות עשויות להיות שונות מהשכר בפועל. המידע הקובע והרשמי נמצא אך ורק בידי מחלקת משאבי אנוש והשכר בארגון.
        </p>
      </div>

      <div className="main-layout" style={{ display: 'grid', gap: '30px', maxWidth: '1000px', margin: '0 auto' }}>
        
        <div style={{ ...cardStyle, height: 'fit-content' }}>
          <CategoryHeader title="הזנת נתונים" />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
              <label style={inputLabelStyle}>הסכם קהילה</label>
              <SegmentedControl value={data.community} onChange={v => update('community', v)} options={['לא', 'כן']} />
            </div>
            <div style={rowFlex}>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                <label style={inputLabelStyle}>רופא נלווה</label>
                <span style={subLabelStyle}>השתתפות בתוכנית</span>
              </div>
              <SegmentedControl value={data.accompanying} onChange={v => update('accompanying', v)} options={['לא', 'כן']} />
            </div>
            <div style={rowFlex}>
              <label style={inputLabelStyle}>משרת אם</label>
              <SegmentedControl value={data.mother} onChange={v => update('mother', v)} options={['לא', 'כן']} />
            </div>
            <div style={rowFlex}>
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          <div style={cardStyle}>
            <CategoryHeader title="היקף משרה" total={norm} />
            
            <div style={listItemStyle}><div style={rowFlex}><span style={labelStyle}>קיצור יום (תקן יום)</span><span style={valStyle}>{dayStandard} ש</span></div></div>
            <div style={listItemStyle}><div style={rowFlex}><span style={labelStyle}>שעות למשרה בשבוע</span><span style={valStyle}>{weeklyHours} ש</span></div></div>
            <div style={listItemStyle}><div style={rowFlex}><span style={labelStyle}>שעות פרונטליות בשבוע</span><span style={valStyle}>{frontalHours} ש</span></div></div>
            <div style={listItemStyle}><div style={rowFlex}><span style={labelStyle}>שעות לא פרונטליות</span><span style={valStyle}>{nonFrontalHours} ש</span></div></div>
            <div style={listItemStyle}><div style={rowFlex}><span style={labelStyle}>שעות השתלמות עצמית</span><span style={valStyle}>{selfStudyHours} ש</span></div></div>
            <div style={listItemStyle}><div style={rowFlex}><span style={labelStyle}>שעות תקן (חודשי)</span><span style={valStyle}>{monthStandard} ש</span></div></div>
            
            <div style={{...rowFlex, ...highlightStyle, marginBottom: '0'}}>
              <span style={{...labelStyle, color: '#082129'}}>נורמת נפשות</span>
              <span style={{...valStyle, color: '#082129'}}>{norm.toLocaleString()}</span>
            </div>
          </div>

          <div style={cardStyle}>
            <CategoryHeader title="שכר למשרה" total={totalBaseSalary} />
            <div style={listItemStyle}><div style={rowFlex}><span style={labelStyle}>4 - שכר משולב</span><span style={valStyle}>{formatCurrency(combinedSalary)}</span></div></div>
            <div style={{...listItemStyle, marginBottom: '0'}}><div style={rowFlex}><span style={labelStyle}>553 - תוספת שקלית</span><span style={valStyle}>{formatCurrency(incremental2024)}</span></div></div>
          </div>

          <div style={cardStyle}>
            <CategoryHeader title="תוספות קבועות" total={totalFixedAdditions} />
            {data.management !== 'לא' && (
              <div style={listItemStyle}>
                <div style={rowFlex}>
                  <span style={labelStyle}>1129 - רופא אזורי (תוספת ניהול)</span>
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

          <div style={cardStyle}>
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

          <div style={cardStyle}>
            <CategoryHeader title="החזר הוצאות" total={totalExpenses} />
            <div style={listItemStyle}><div style={rowFlex}><span style={labelStyle}>1201 - נסיעות</span><span style={valStyle}>{formatCurrency(travelExpense)}</span></div></div>
            <div style={{...listItemStyle, marginBottom: '0'}}><div style={rowFlex}><span style={labelStyle}>1285 - השתתפות טלפון</span><span style={valStyle}>{formatCurrency(phoneExpense)}</span></div></div>
          </div>

        </div>

      </div>

      <div style={{
        backgroundColor: '#e69a88',
        color: '#082129',
        maxWidth: '1000px',
        margin: '30px auto 0 auto',
        borderRadius: '16px', 
        padding: '15px 30px', 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box'
      }}>
        <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 'bold', color: '#082129' }}>סה"כ תשלומים (ברוטו)</h2>
        <div style={{ fontSize: '1.6rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', direction: 'ltr', color: '#082129' }}>
          <span style={{ marginRight: '8px' }}>₪</span>
          <span>{grossSalary.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>

    </div>
  );
}