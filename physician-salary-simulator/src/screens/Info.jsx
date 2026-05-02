import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';
import Credit from '../components/Credit';

// --- רכיבי עזר עיצוביים ---

const CategoryHeader = ({ title, bgColor = '#9CAF88' }) => (
  <div className="category-header" style={{
    margin: '-20px -30px 0px -30px', 
    padding: '3px 20px', 
    backgroundColor: bgColor, 
    borderTopLeftRadius: '24px', 
    borderTopRightRadius: '24px',
    borderBottom: '3px solid var(--app-bg)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center' 
  }}>
    <h3 style={{ 
      fontFamily: '"Secular One", sans-serif', 
      color: '#14141b', 
      fontSize: '1.3rem', 
      fontWeight: 'bold', 
      margin: 0, 
      letterSpacing: '-0.7px' 
    }}>
      {title}
    </h3>
  </div>
);

// --- רכיב החלון הקופץ האחיד ---
const ModalPopup = ({ title, onClose, children }) => (
  <div 
    onClick={onClose}
    style={{ 
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', 
      backgroundColor: 'rgba(13,13,18,0.85)', zIndex: 9999, 
      display: 'flex', justifyContent: 'center', alignItems: 'center', 
      padding: '20px', boxSizing: 'border-box', 
    }}
  >
    <div 
      onClick={(e) => e.stopPropagation()} 
      style={{ 
        backgroundColor: 'var(--card-bg, #14141b)', 
        border: '1px solid #D8BFD8', 
        borderRadius: '24px', 
        padding: 'var(--modal-padding)', 
        maxWidth: 'var(--modal-max-width, 800px)',
        width: '100%', 
        position: 'relative', 
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)', 
        textAlign: 'right', 
        direction: 'rtl', 
        maxHeight: '90vh', 
        overflowY: 'auto' 
      }}
    >
      <button 
        onClick={onClose}
        style={{ 
          position: 'absolute', 
          top: 'var(--modal-close-top, 10px)', 
          right: 'var(--modal-close-right, 20px)', 
          background: 'none', border: 'none', color: '#9CAF88', 
          fontSize: 'var(--modal-close-size)', cursor: 'pointer', fontWeight: 'bold' 
        }}
      >
        ✕
      </button>
      
      <h2 style={{ color: '#D8BFD8', marginTop: 0, fontSize: 'var(--modal-title-size)', textAlign: 'center' }}>
        {title}
      </h2>
      
      <div style={{ borderTop: '1px solid rgba(216,191,216,0.1)', margin: 'var(--modal-gap) 0' }}></div>
      <div style={{ color: '#ffffff', margin: 0 }}>
        {children}
      </div>
    </div>
  </div>
);

// --- תבנית תוכן חכמה לחלונות הקופצים ---
const PopupContentTemplate = ({ text1, text2, text3, customContent, table }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--modal-gap)', textAlign: 'right' }}>
    
    {text1 && (
      <div style={{ fontSize: 'var(--modal-text-size)', lineHeight: '1.5', color: '#ffffff', whiteSpace: 'pre-line' }}>
        {text1}
      </div>
    )}

    {text2 && (
      <div style={{ fontSize: 'var(--modal-text-size)', lineHeight: '1.5', color: '#ffffff', whiteSpace: 'pre-line' }}>
        {text2}
      </div>
    )}

    {text3 && (
      <div style={{ fontSize: 'var(--modal-text-size)', lineHeight: '1.5', color: '#ffffff', whiteSpace: 'pre-line' }}>
        {text3}
      </div>
    )}

    {customContent && (
      <div style={{ fontSize: 'var(--modal-text-size)', lineHeight: '1.5', color: '#ffffff' }}>
        {customContent}
      </div>
    )}

    {table && (
      <div style={{ marginTop: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
        <table style={{ 
          width: '100%', 
          borderCollapse: 'collapse', 
          textAlign: table.center ? 'center' : 'right', 
          fontSize: 'var(--modal-table-fs)', 
          lineHeight: 'var(--modal-table-lh, 1.2)',
          border: '1px solid rgba(216, 191, 216, 0.3)', 
          minWidth: table.mobileWidth || table.minWidth || '800px'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#9CAF88', color: '#14141b' }}>
              {table.headers.map((header, idx) => (
                <th key={idx} style={{ padding: 'var(--modal-table-padding, 8px)', border: '1px solid #1A1A26' }}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, rowIdx) => (
              <tr key={rowIdx} style={{ backgroundColor: rowIdx % 2 !== 0 ? '#1c1b29' : 'transparent' }}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} style={{ 
                    padding: 'var(--modal-table-padding, 8px)', 
                    border: '1px solid rgba(216, 191, 216, 0.3)', 
                    fontWeight: cellIdx === 0 ? 'bold' : 'normal' 
                  }}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
);

// --- רכיב Info הראשי ---

const Info = ({ onBack }) => {
  const [selectedInfo, setSelectedInfo] = useState(null);

  const mainWrapperStyle = {
    fontFamily: '"Secular One", sans-serif',
    direction: 'rtl',
    padding: '40px 20px',
    backgroundColor: 'transparent',
    minHeight: '100vh',
    color: '#D8BFD8',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column' 
  };

  const cardStyle = { 
    backgroundColor: 'var(--card-bg, #1c1b29)', 
    padding: '20px 30px 0px',
    borderRadius: '24px', 
    border: `0px solid rgba(216, 191, 216, 0.15)`, 
    display: 'flex',
    flexDirection: 'column',
    height: 'fit-content'
  };

  const infoData = [
    {
      category: "נתוני בסיס",
      items: [
        { 
          title: "ותק ודרגה", 
          description: (
            <PopupContentTemplate 
              text1="השכר המשולב נקבע על פי הותק והדרגה."
              text2="כל שנת ותק מעלה את השכר המשולב ב- 1%."
              text3="עבור הדרגה התוספת לשכר אינה קבועה - לכל דרגה תוספת שונה. ראה בטבלה פירוט לגבי אופן קביעת הדרגה."
              table={{
                minWidth: '600px',
                headers: ["תואר / תפקיד", "הסבר"],
                rows: [
                  ["סטאז'ר", "דרגה 1"],
                  ["מתמחה ברפואת המשפחה", "דרגה 2 מתחילת ההתמחות. לאחר שנה עולה לדרגה 3. לאחר 3 שנים נוספות עולה לדרגה 3+."],
                  ["רופא ללא תעודת מומחה", "מתחיל בדרגה 3. לאחר שנתיים עולה לדרגה 4. לאחר שנתיים נוספות עולה לדרגה 5. לאחר 4 שנים נוספות עולה לדרגה 6. לאחר 3 שנים נוספות עולה לדרגה 6+."],
                  ["רופא בעל תעודת מומחה", "מתחיל בדרגה 4. לאחר שנה עולה לדרגה 5. לאחר שנתיים נוספות עולה לדרגה 6. לאחר 3 שנים נוספות עולה לדרגה 7. לאחר 3 שנים נוספות עולה לדרגה 7+."],
                  ["רופא אזורי / מנהל מרפאה ללא מומחיות", "קידום כמו לרופא בעל תעודת מומחה. בכל מקרה לא תהא דרגתו נמוכה מדרגת רופא הכפוף אליו."],
                  ["רופא אזורי / מנהל מרפאה בעל מומחיות", "מתחיל בדרגה 7. לאחר 3 שנים עולה לדרגה 8. לאחר 3 שנים נוספות עולה לדרגה 8+. בכל מקרה לא תהא דרגתו נמוכה מדרגת רופא הכפוף אליו."],
                  ["סגן מנהל רפואי ורופא אחראי", "מתחיל בדרגה 7. לאחר שנתיים עולה לדרגה 8. לאחר 3 שנים נוספות עולה לדרגה 9. לאחר 3 שנים נוספות עולה לדרגה 9+."],
                  ["מנהל רפואי במחוז", "אחרי 3 שנים בתפקיד עולה לדרגה 10. לאחר 3 שנים נוספות עולה לדרגה 10+."],
                  ["מנהל המחוז", "מתחיל בדרגה 9. לאחר שנתיים עולה לדרגה 10. לאחר 3 שנים נוספות עולה לדרגה 11. לאחר 3 שנים נוספות עולה לדרגה 11+."]
                ]
              }}
            />
          )
        },
        {
          title: "היקף משרה ונורמת נפשות", 
          description: (
            <PopupContentTemplate 
              text1=""
              table={{
                minWidth: '1200px',
                mobileWidth: '850px',
                center: true,
                headers: ["קריטריון", "שעות למשרה בשבוע", "קיצור יום", "שעות תקן", "פרונטליות", "לא פרונטליות", "השתלמות", "נורמה כללית", "מנהל שירות", "מ.קטנה", "מ.בינונית", "מ.גדולה"],
                rows: [
                  ["עד גיל 40", "42", "7.5", "182", "35", "4.5", "2.5", "1,345", "1,321", "1,224", "1,199", "1,149"],
                  ["+40 עם ותק 0-2 שנים", "42", "7.5", "182", "35", "4.5", "2.5", "1,345", "1,321", "1,224", "1,199", "1,149"],
                  ["משרת אם בכל גיל עם ותק 0-2 שנים", "40", "7", "173", "34", "3.5", "2.5", "1,242", "1,217", "1,127", "1,102", "1,052"],
                  ["+40 עם ותק 2-5 שנים", "40", "7", "173", "34", "3.5", "2.5", "1,242", "1,217", "1,127", "1,102", "1,052"],
                  ["+40 עם ותק +5 שנים", "37.5", "6.5", "162", "34", "1.5", "2", "1,210", "1,186", "1,095", "1,070", "1,020"],
                  ["+50 עם ותק +5 שנים", "35", "6", "152", "32", "1.5", "1.5", "1,107", "1,082", "997", "972", "923"]
                ]
              }}
            />
          )
        }
      ]
    },
    {
      category: "תוספות קבועות",
      items: [
        { 
          title: "ניהול מרפאה", 
          description: (
            <PopupContentTemplate 
              text1="ניהול מרפאה מקנה מספר הטבות:"
              customContent={
                <ol style={{ paddingRight: '20px', margin: 0 }}>
                  <li style={{ marginBottom: '10px' }}>תוספת לשכר (1129 - רופא אזורי) הנקבעת בהתאם לגודל המרפאה ותעריף ערך יום של הרופא.</li>
                  <li style={{ marginBottom: '10px' }}>הפחתת נורמת הנפשות (ראה טבלה ב"היקף משרה").</li>
                  <li>"שעות ניהול" - מנהל מרפאה זכאי לזמן ייעודי למשימות ניהול. זמן זה יורד ממכסת השעות הפרונטליות הנדרשת.</li>
                </ol>
              }
              table={{
                minWidth: '600px',
                mobileWidth: '300px',
                center: true,
                headers: ["גודל מרפאה", "משרות רופא", "כוננויות", "שעות ניהול"],
                rows: [
                  ["מנהל שירות", "2.99 - 2", "8", "1"],
                  ["מרפאה קטנה", "3.99 - 3", "16", "3"],
                  ["מרפאה בינונית", "7.99 - 4", "18", "4"],
                  ["מרפאה גדולה", "8 ומעלה", "24", "6"]
                ]
              }}
            />
          )
        },
        { 
          title: "תוספת מתמחה", 
          description: (
            <PopupContentTemplate 
              text1="מתמחה זכאי לתוספת (1117 - תוספת מתמחה) בגובה 10% מהשכר המשולב. יוצא לרוב סביב 700 שח."
              text2="בסיום ההתמחות (מעבר לסטטוס מומחה) כבר אין את התוספת הזו אך יש תגמול אחר. ישנה תוספת תשלום עבור מטופלים מעל גיל 65. המקדם של הרכיב (832 - נפשות +65) עולה מ- 0.5 ל- 0.55."
            />
          )
        },
      ]
    },
    {
      category: "עבודה נוספת",
      items: [
        { 
          title: "הסכם קהילה", 
          description: (
            <PopupContentTemplate 
              text1="רופא (גם מתמחה משלב ב') יכול להצטרף להסכם קהילה בתנאי שהוא עובד בהיקף של חצי משרה ומעלה.&#10;חתימה על הסכם קהילה מגדילה את התעריף המשולם לנפש מעל הנורמה (1120 - נפשות עיר) וכן לנפשות מעל גיל 65 (סמל 832)."
              text2="חתימה על הסכם קהילה מחייבת הוספת שעות פרונטליות (קבלת קהל) נוספות:&#10;עד 400 נפשות מעל הנורמה נדרש להוסיף 2 שעות.&#10;כל 150 נפשות נוספות (מהנפש הראשונה) נדרש להוסיף עוד שעה."
            />
          )
        },
        { 
          title: 'תוכנית "רופא נלווה"', 
          description: (
            <PopupContentTemplate 
              text1='התוכנית נועדה לאפשר לרופאים להעמיק את הידע המקצועי שלהם ולהיחשף לתחומי רפואה נוספים, על ידי התלוות לרופא אחר בזמן עבודתו הקלינית. מדובר על 5 שעות שבועיות אשר יורדות ממכסת השעות הפרונטליות.'
              text2='תנאי השתתפות: התוכנית פתוחה רק לרופאים מומחים ברפואת משפחה ומותנית בקבלת אישור מההנהלה. לא ניתן לנצל באותו חודש קלנדרי גם "שעות השתלמות" וגם שעות במסגרת "רופא נלווה". יש לבחור במסלול אחד.'
              text3='תגמול: בניגוד ל"השתלמות" ישנו תגמול כספי עבור "רופא נלווה". הוא מחושב כסך השעות שבוצעו בתוכנית במהלך החודש כפול "ערך שעה". התגמול מותנה בהעברת אישור מדי חודש למחלקת משאבי אנוש. על האישור להעיד על ביצוע השעות בפועל, ועליו להיות חתום על ידי הגורם האחראי במקום בו בוצעה ההתלוות.'
            />
          )
        },
      ]
    }
  ];


  /* === משתנים לשליטה בחלונות הקופצים (מחשב) === */
  return (
    <div id="salary-simulator-info-root" style={mainWrapperStyle}>
      <style dangerouslySetInnerHTML={{__html: `
        #salary-simulator-info-root {
          --edge-margin: -30px;
          --edge-padding: 30px;
          --modal-padding: 20px;
          --modal-close-size: 1.5rem;   /* גודל הכפתור במחשב */
          --modal-close-top: 10px;
          --modal-close-right: 20px;
          --modal-title-size: 1.6rem;
          --modal-text-size: 0.9rem;
          --modal-gap: 10px;
          --modal-table-fs: 0.85rem;
          --modal-max-width: 900px;
          --modal-table-padding: 8px;    /* ריווח פנימי בתאים במחשב */
          --modal-table-lh: 1.4;
        }
          ::-webkit-scrollbar {
          width: 6px;
        }
        ::-webkit-scrollbar-track {
          background: var(--app-bg);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          background: #9CAF88; /* זה ירוק המרווה שלך! */
          border-radius: 10px;
        }

        .main-layout { grid-template-columns: 1fr 1fr; }
        .info-item-button:hover { background-color: rgba(156, 175, 136, 0.1) !important; }
        .info-item-button:hover span { color: #ffffff !important; }

        @media (max-width: 768px) {
          #salary-simulator-info-root {
            --edge-margin: -14px;
            --edge-padding: 14px;
            --modal-padding: 15px;
            --modal-close-size: 1.1rem;
            --modal-close-top: 6px;
            --modal-close-right: 8px;
            --modal-title-size: 1.2rem;
            --modal-text-size: 0.8rem;
            --modal-gap: 10px;
            --modal-table-fs: 0.75rem;
            --modal-table-padding: 7px 5px; /* ריווח בתאי הטבלה */
            --modal-table-lh: 1.2;
            --row-padding-y: 6px;
            padding: 15px 10px !important;
          }
          .main-layout { 
             grid-template-columns: 1fr !important; 
             gap: 30px !important; 
             margin-top: 10px !important; /* דוחף מעט כלפי מטה כדי להתיישר עם הסימולטור */
          }
          .data-card {
            padding: 10px 14px 0px !important;
          }
          .category-header {
            margin: -20px -14px 0px -14px !important;
            padding: 2px 14px !important;
          }
          .category-header h3 { font-size: 18px !important; }
          .info-item-button span { font-size: 16px !important; }
        }

        @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUpModal { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
      `}} />

      <PageHeader title="מידע וזכויות" subtitle="רכיבי שכר ותוספות" onBack={onBack} />

      <div className="main-layout" style={{ display: 'grid', gap: '30px', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
        {infoData.map((section, index) => (
          <div key={index} className="data-card" style={cardStyle}>
            <CategoryHeader title={section.category} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {section.items.map((item, itemIdx) => {
                const isLast = itemIdx === section.items.length - 1;
                return (
                  <div 
                    key={itemIdx}
                    className="hover-input info-item-button"
                    onClick={() => setSelectedInfo(item)}
                    style={{ 
                      backgroundColor: 'transparent', cursor: 'pointer', 
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                      margin: '0 var(--edge-margin)', padding: 'var(--row-padding-y, 8px) var(--edge-padding)',
                      borderBottom: isLast ? 'none' : '3px solid var(--app-bg)', 
                      borderBottomRightRadius: isLast ? '24px' : '0', borderBottomLeftRadius: isLast ? '24px' : '0',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <span style={{ color: '#D8BFD8', fontSize: '1.1rem', fontWeight: 'bold' }}>{item.title}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {selectedInfo && (
        <ModalPopup title={selectedInfo.title} onClose={() => setSelectedInfo(null)}>
          {selectedInfo.description}
        </ModalPopup>
      )}

      <Credit />
    </div>
  );
};

export default Info;