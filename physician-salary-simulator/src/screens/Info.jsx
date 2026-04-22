import React, { useState } from 'react';
import PageHeader from '../components/PageHeader';

// --- רכיבים מותאמים אישית (Shared Components) ---

const FooterCredits = () => (
  <div style={{ 
    textAlign: 'center', 
    padding: '40px 0 20px 0', 
    opacity: 0.4, 
    width: '100%'
  }}>
    <p style={{ 
      fontFamily: '"Secular One", sans-serif', 
      fontSize: '0.8rem', 
      color: '#D8BFD8', 
      margin: 0,
      letterSpacing: '0.5px'
    }}>
      {new Date().getFullYear()} Created by Ofer Dahan
    </p>
  </div>
);

const CategoryHeader = ({ title, bgColor = '#D8BFD8' }) => (
  <div className="category-header" style={{
    margin: '-20px -30px 0px -30px', 
    padding: '10px 20px', 
    backgroundColor: bgColor, 
    borderTopLeftRadius: '24px', 
    borderTopRightRadius: '24px',
    borderBottom: '3px solid #14141b',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center' 
  }}>
    <h3 style={{ fontFamily: '"Secular One", sans-serif', color: '#14141b', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 }}>
      {title}
    </h3>
  </div>
);

// --- הרכיב הראשי של מסך המידע ---

const Info = ({ onBack }) => {
  const [selectedInfo, setSelectedInfo] = useState(null);

  // --- צבעים וסגנונות עיצוב ---
  const bgMain = '#14141b'; 
  const bgCard = '#1c1b29'; 
  const textLilac = '#D8BFD8'; 
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
              <div style={{ marginTop: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right', fontSize: '0.85rem', border: '1px solid rgba(216, 191, 216, 0.3)', minWidth: '600px' }}>
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
              <div style={{ marginTop: '10px', overflowX: 'auto', paddingBottom: '10px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.85rem', border: '1px solid rgba(216, 191, 216, 0.3)', minWidth: '1200px' }}>
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
              <div style={{ marginTop: '10px', overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.85rem', border: '1px solid rgba(216, 191, 216, 0.3)' }}>
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
    <div id="salary-simulator-info-root" style={mainWrapperStyle}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Secular+One&display=swap');

        #salary-simulator-info-root {
          --edge-margin: -30px;
          --edge-padding: 30px;
        }

        #salary-simulator-info-root * {
          font-family: 'Secular One', sans-serif !important;
        }

        ::selection {
          background-color: #9CAF88 !important;
          color: #14141b !important;
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

        .info-item-button:hover {
          background-color: rgba(156, 175, 136, 0.1) !important;
        }

        .info-item-button:hover span {
          color: #ffffff !important;
        }

        @keyframes slideLeftRight {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-6px); } 
        }

        .info-item-button:hover .animated-arrow {
          animation: slideLeftRight 0.8s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          #salary-simulator-info-root {
            --edge-margin: -14px;
            --edge-padding: 14px;
            font-size: 12px !important; 
            padding: 15px 10px !important; 
          }

          .info-item-button {
            width: auto !important;
            max-width: none !important;
          }

          .data-card {
            padding: 20px 14px 0px !important;
          }
          
          .category-header {
            margin: -20px -14px 0px -14px !important;
            padding: 6px 14px !important;
          }
        }

        @keyframes fadeInOverlay {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUpModal {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />

      {/* --- העטיפה המשותפת החדשה של הכותרת --- */}
      <PageHeader 
        title="מידע נוסף" 
        subtitle="רכיבי שכר ותוספות" 
        onBack={onBack} 
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', width: '100%', maxWidth: '1000px', margin: '0 auto' }}>
        {infoData.map((section, index) => (
          <div key={index} className="data-card" style={cardStyle}>
            
            <CategoryHeader title={section.category} bgColor="#9CAF88" />
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {section.items.map((item, itemIdx) => {
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
                      justifyContent: 'space-between', 
                      alignItems: 'center', 
                      margin: '0 var(--edge-margin)', 
                      padding: '16px var(--edge-padding)', 
                      borderBottom: isLast ? 'none' : '3px solid #14141b', 
                      borderBottomRightRadius: isLast ? '24px' : '0',
                      borderBottomLeftRadius: isLast ? '24px' : '0',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <span style={{ color: '#D8BFD8', fontSize: '1.2rem', fontWeight: 'bold' }}>
                      {item.title}
                    </span>
                    <span className="animated-arrow" style={{ color: '#9CAF88', fontSize: '1rem', opacity: 0.8, display: 'inline-block' }}>◀</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {selectedInfo && (
        <div 
          onClick={() => setSelectedInfo(null)}
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(13,13,18,0.85)', zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', boxSizing: 'border-box', animation: 'fadeInOverlay 0.3s ease-out' }}
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            style={{ backgroundColor: '#15151E', border: '1px solid #D8BFD8', borderRadius: '24px', padding: '15px', maxWidth: '600px', width: '100%', position: 'relative', boxShadow: '0 10px 40px rgba(0,0,0,0.5)', animation: 'slideUpModal 0.4s ease-out', textAlign: 'right', direction: 'rtl', maxHeight: '90vh', overflowY: 'auto' }}
          >
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

      <FooterCredits />
    </div>
  );
};

export default Info;