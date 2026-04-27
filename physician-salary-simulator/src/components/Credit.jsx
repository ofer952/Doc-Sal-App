import React from 'react';

const Credit = () => (
  <footer className="no-print" style={{ 
    marginTop: 'auto',
    textAlign: 'center', 
    opacity: 0.7,
    padding: '40px 0 20px 0', // רווח עליון מהאייקונים ורווח תחתון מקצה המסך
    width: '100%'
  }}>
    <style dangerouslySetInnerHTML={{__html: `
      .credit-text {
        color: #D8BFD8;
        font-size: 0.8rem; /* גודל הפונט במחשב */
        letter-spacing: 0.5px;
        font-family: "Secular One", sans-serif;
        margin: 0;
      }

      /* התאמה למובייל */
      @media (max-width: 768px) {
        .credit-text {
          font-size: 9.5px !important;
        }
      }
    `}} />
    
    <p className="credit-text">
      נוצר על ידי עופר דהן {new Date().getFullYear()}
    </p>
  </footer>
);

export default Credit;