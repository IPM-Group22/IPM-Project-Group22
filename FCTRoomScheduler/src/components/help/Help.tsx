import React from 'react';
import './help.css';
import FloatingButton from '../sharedComponents/FloatingButton';
import { useNavigate } from 'react-router-dom';

const Help: React.FC = () => {
    const navigate = useNavigate();
    const faqData = [
        {
            question: "What is this application for?",
            answer: "This application helps you schedule rooms efficiently and manage bookings seamlessly.",
        },
        {
            question: "How do I reset my password?",
            answer: "To reset your password, go to the login page and click 'Forgot Password'. Follow the instructions to set a new password.",
        },
        {
            question: "Can I share a room booking with others?",
            answer: "Yes, you can share booking details with others via email or direct link from the dashboard.",
        },
    ];

    return (
        <div className="help-container">
            <FloatingButton onClick={() => navigate(-1)} type={"back"} />
            <div className="help-content">
                <h1 className="help-title">Frequently Asked Questions</h1>
                <div className="faq-section">
                    {faqData.map((item, index) => (
                        <div className="faq-item" key={index}>
                            <div className="faq-question">{item.question}</div>
                            <div className="faq-answer">{item.answer}</div>
                        </div>
                    ))}
                </div>
                <div className="additional-info">
                    Need more help? contact us at <a href="/contact">nfrs@email.com</a>
                </div>
            </div>
        </div>
    );
};

export default Help;
