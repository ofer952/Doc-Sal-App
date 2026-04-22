import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';

// --- רכיבים מותאמים אישית (Custom Components) ---

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
      backgroundColor: '#14141b', 
      borderRadius: '12px', 
      border: '1px solid rgba(216, 191, 216, 0.2)',
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
          color: value === opt ? '#14141b' : '#D8BFD8',
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
          backgroundColor: '#14141b',
          color: '#D8BFD8',
          padding: '0 16px',
          borderRadius: '12px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxSizing: 'border-box',
          border: isOpen ? '1px solid #9CAF88' : '1px solid rgba(216, 191, 216, 0.2)',
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
          backgroundColor: '#14141b',
          border: '1px solid #9CAF88',
          borderRadius: '12px',
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
                  color: hovered === idx ? '#14141b' : '#D8BFD8',
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

// --- הרכיב הראשי של הסימולטור ---
const Simulator = ({ onNavigate }) => {

  // --- 1. כל נתוני הקלט ---
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

  // --- צבעים וסגנונות ---
  const bgMain = '#14141b'; 
  const bgCard = '#1c1b29'; 
  const textLilac = '#D8BFD8'; 
  const inputBg = '#14141b'; 
  const inputText = '#D8BFD8'; 

  const fontArial = { fontFamily: '"Secular One", sans-serif' };

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

  const CategoryHeader = ({ title, total, bgColor = '#D8BFD8' }) => (
    <div className="category-header" style={{
      margin: '-20px -30px 0px -30px', 
      padding: '5px 20px', 
      backgroundColor: bgColor, 
      borderTopLeftRadius: '24px', 
      borderTopRightRadius: '24px',
      borderBottom: '3px solid #14141b',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center' 
    }}>
      <h3 style={{ ...fontArial, color: '#14141b', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
        {title}
      </h3>
      {total !== undefined && (
        <div style={{ 
          ...fontArial, 
          fontSize: '1.2rem', 
          color: '#14141b', 
          fontWeight: 'bold', 
          display: 'flex',
          alignItems: 'center'
        }}>
          <span style={{ color: '#14141b', marginLeft: '8px', fontSize: '1.2rem' }}>סה"כ </span>
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
    borderBottom: '3px solid #14141b',
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
    border: '1px solid rgba(216, 191, 216, 0.2)',
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

  return (
    <div id="salary-simulator-root" style={mainWrapperStyle}>
      
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Secular+One&display=swap');

        #salary-simulator-root {
          --edge-margin: -30px;
          --edge-padding: 30px;
        }

        #salary-simulator-root * {
          font-family: 'Secular One', sans-serif !important;
        }

        ::selection {
          background-color: #9CAF88 !important;
          color: #14141b !important;
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
          background: #14141b;
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
          background-color: #14141b !important;
          box-shadow: inset 0 0 0 1px #D8BFD8 !important;
        }
        .hover-input:focus {
          background-color: #14141b !important;
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

        .inputs-list > div {
          margin: 0 var(--edge-margin) !important;
          padding: 7px var(--edge-padding) !important;
        }
        .inputs-list > div:not(:last-child) {
          border-bottom: 3px solid #14141b;
        }

        @media (max-width: 768px) {
          .main-layout { 
            grid-template-columns: 1fr !important; 
            gap: 30px !important; 
          }
          
          #salary-simulator-root {
            --edge-margin: -14px;
            --edge-padding: 14px;
            font-size: 12px !important; 
            padding: 15px 10px !important; 
          }

          .hover-input , .select-wrapper {
            width: 140px !important; 
            max-width: 55vw !important;
            font-size: 18px !important; 
          }
          
          h1 { font-size: 2.0rem !important; margin-bottom: 5px !important; }
          h2, h3 { font-size: 20px !important; }

          .data-card {
            padding: 10px 14px 0px !important;
          }
          
          .category-header {
            margin: -20px -14px 0px -14px !important;
            padding: 4px 14px !important;
          }

          #clinic-row .select-wrapper * {
            font-size: 16px !important;
          }

        }
      `}} />

      {/* כרטיסיית הכותרת המשותפת */}
      <PageHeader 
        title="סימולטור שכר" 
        subtitle='רופאי משפחה בקופ"ח כללית' 
        onBack={() => onNavigate('home')} 
      />
          
      <div className="main-layout" style={{ display: 'grid', gap: '30px', maxWidth: '1000px', margin: '0 auto' }}>
        
        <div className="data-card" style={{ ...cardStyle, height: 'fit-content' }}>
          <CategoryHeader title="הזנת נתונים" bgColor="#9CAF88" />
          
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
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
        color: '#14141b',
        maxWidth: '1000px',
        margin: '30px auto 20px auto',
        borderRadius: '24px', 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxSizing: 'border-box',
        position: 'sticky',
        bottom: '10px',
        padding: '16px 20px',
        zIndex: 100,
        boxShadow: '0 -5px 25px rgba(0, 0, 0, 0.3)'
      }}>
        <h2 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 'bold', color: '#14141b' }}>סה"כ (ברוטו)</h2>
        <div style={{ fontSize: '1.6rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', direction: 'ltr', color: '#14141b' }}>
          <span style={{ marginRight: '8px' }}>₪</span>
          <span>{grossSalary.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
        </div>
      </div>

      <FooterCredits />
    </div>
  );
};

export default Simulator;