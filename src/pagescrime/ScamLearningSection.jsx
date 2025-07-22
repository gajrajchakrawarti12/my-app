import React, { useState } from 'react';
import './ScamLearningSection.css';

const scamData = [
  {
    type: '🎣 Phishing',
    summary: 'Fake emails or websites tricking users into sharing sensitive info.',
    details: [
      '🚫 Don’t click unknown links',
      '🔍 Verify sender identity',
      '📞 Report at cybercrime.gov.in or call 1930',
    ],
    color: '#e91e63',
  },
  {
    type: '📞 Vishing',
    summary: 'Fraud calls pretending to be officials or bank reps.',
    details: [
      '❌ Never share OTP or CVV',
      '📴 Hang up if unsure',
      '🔒 Confirm with your bank directly',
    ],
    color: '#3f51b5',
  },
  {
    type: '📱 Smishing',
    summary: 'Scam SMS with malicious links or fake offers.',
    details: [
      '🚫 Avoid clicking links in random texts',
      '🔗 Check sender URL carefully',
      '🛡️ Use spam filters on your phone',
    ],
    color: '#ff9800',
  },
  {
    type: '🎰 Lottery Scam',
    summary: '“You’ve won!” messages demanding fees or taxes.',
    details: [
      '🚫 Real lotteries don’t ask for money',
      '🕵️‍♂️ Verify with official sources',
      '💰 Never share financial info',
    ],
    color: '#009688',
  },
  {
    type: '📲 Fake Apps',
    summary: 'Malicious apps stealing data or installing malware.',
    details: [
      '🛡️ Download only from trusted stores',
      '🔒 Avoid apps with excessive permissions',
      '🧹 Keep antivirus software updated',
    ],
    color: '#795548',
  },
  {
    type: '🚓 Digital Arrest',
    summary: 'Scammers impersonate agencies and demand money online.',
    details: [
      '📴 No real arrest over video calls',
      '🧘 Stay calm, disconnect',
      '📞 Call 1930 and preserve evidence',
    ],
    color: '#607d8b',
  },
  {
    type: '💸 Investment Fraud',
    summary: 'Schemes promising high returns quickly.',
    details: [
      '🚨 Avoid pressure-selling',
      '🔍 Research before investing',
      '🤔 If it sounds too good—it probably is',
    ],
    color: '#9c27b0',
  },
  {
    type: '💼 Fake Job Offers',
    summary: 'Scammers offer fake jobs and demand fees or documents.',
    details: [
      '📄 Apply only via official company sites',
      '💰 Don’t pay for interviews or training',
      '🔍 Verify recruiter credentials',
    ],
    color: '#4caf50',
  },
  {
    type: '🧠 Deepfake Scams',
    summary: 'AI-generated videos impersonating celebrities or officials.',
    details: [
      '🎭 Don’t trust viral videos blindly',
      '🔍 Cross-check with verified sources',
      '🚫 Avoid downloading promoted apps without research',
    ],
    color: '#f44336',
  },
  {
    type: '📦 Fake Courier Scams',
    summary: 'Scammers impersonate delivery services to extort money.',
    details: [
      '📞 Don’t respond to unknown calls about parcels',
      '🔍 Verify tracking numbers on official sites',
      '💳 Never pay fees via unknown links',
    ],
    color: '#00bcd4',
  },
  {
    type: '🧑‍⚖️ Fake Supreme Court Hearings',
    summary: 'Scammers stage fake legal proceedings to intimidate victims.',
    details: [
      '⚖️ No real court operates via video calls',
      '📴 Disconnect and report immediately',
      '📞 Call 1930 for help',
    ],
    color: '#8bc34a',
  },
  {
    type: '🔗 QR Code Scams',
    summary: 'Malicious QR codes redirecting to fake websites.',
    details: [
      '📷 Scan only trusted QR codes',
      '🔒 Don’t enter personal info on redirected sites',
      '🧠 Check URL spelling and design',
    ],
    color: '#ffc107',
  },
];


const ScamLearningSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleScam = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="scam-learning-container">
      <h2 className="head">🧠 Cyber Scam Awareness</h2>
      <div className="scam-grid">
        {scamData.map((scam, index) => (
          <div
            key={index}
            className={`scam-card ${activeIndex === index ? 'active' : ''}`}
            style={{ borderColor: scam.color }}
            onClick={() => toggleScam(index)}
          >
            <div className="scam-header" style={{ backgroundColor: scam.color }}>
              <h3>{scam.type}</h3>
              <span className="scam-arrow">{activeIndex === index ? '▲' : '▼'}</span>
            </div>
            <p className="scam-summary">{scam.summary}</p>
            {activeIndex === index && (
              <div className="scam-details">
                {scam.details.map((point, i) => (
                  <p key={i}>{point}</p>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScamLearningSection;
