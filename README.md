To make your GitHub repository look professional for your thesis, use this structured description. It focuses on the technical architecture while highlighting the academic validation of the project.
Handshake: NFC-Enabled Digital Business Card & Integrated CRM
Project Overview

Handshake is a modern, eco-friendly networking solution designed to replace traditional paper business cards. It utilizes NTAG215 NFC technology to trigger a custom-built digital profile, allowing users to seamlessly share contact information and capture leads directly into a centralized CRM system.  

This project was developed as a research initiative to address the high waste rate of paper cards (approx. 92%) and the manual inefficiencies of lead management in small businesses.  
Key Features

    Contactless Exchange: Instant digital profile loading via NFC tap, compatible with modern iOS and Android devices without requiring a dedicated mobile app.  

    Integrated CRM Backend: Real-time lead capture and storage using Supabase, ensuring contact data is organized and accessible.  

    Privacy-First Design: Compliant with the Data Privacy Act of 2012 (RA 10173), featuring granular, per-field opt-in consent toggles.  

    High Performance: Optimized via Next.js and Vercel for near-instantaneous loading states.  

Tech Stack

    Frontend: Next.js (React Framework)  

    Backend/Database: Supabase (PostgreSQL)  

    Deployment: Vercel  

    Hardware: NTAG215 NFC Tags  

Research Validation

The system was rigorously evaluated using the ISO/IEC 25010 Software Quality Model. Key findings from a study of 50 respondents include:  

    Overall Satisfaction Score: 3.53/4.00 (High Acceptance).  

    Security Rating: 3.58/4.00 (Highest rated construct due to privacy controls).  

    ANOVA Result: No significant difference in perception between students and professionals (p=0.554), proving universal utility.  

Installation & Deployment

(You can customize this section with your actual repo instructions)

    Clone the repo: git clone [https://github.com/yourusername/handshake-nfc.git](https://github.com/yourusername/handshake-nfc.git)

    Install dependencies: npm install

    Environment Variables: Configure your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.

    Run Locally: npm run dev

License

This project was developed at De La Salle University-Dasmariñas. All research data and system architecture are documented in the accompanying thesis.
