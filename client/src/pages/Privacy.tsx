import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Privacy() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-16 lg:py-24">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Privacy Policy
          </h1>
          
          <div className="prose prose-gray max-w-none space-y-8">
            <p className="text-muted-foreground mb-8">
              <strong>Effective Date:</strong> January 1, 2026<br />
              <strong>Last Updated:</strong> January 17, 2026
            </p>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction and Commitment to Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                DumoExpress Sdn Bhd ("DumoExpress," "we," "us," or "our") is deeply committed to protecting the privacy and personal data of our customers, website visitors, and all individuals who interact with our services. This Privacy Policy explains in detail how we collect, use, process, disclose, store, and protect your personal information in accordance with the Personal Data Protection Act 2010 (PDPA) of Malaysia and other applicable data protection laws and regulations.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                This Privacy Policy applies to all personal data collected through our website (www.dumoexpress.com), mobile applications, customer service channels, and any other platforms or touchpoints where you interact with DumoExpress. By using our services, accessing our website, or providing your personal information to us, you acknowledge that you have read, understood, and consent to the practices described in this Privacy Policy.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                We recognize that your personal data is valuable and sensitive, and we take our responsibility to protect it seriously. This policy is designed to be transparent about our data practices and to empower you with knowledge and control over your personal information. If you have any questions or concerns about how we handle your data, please do not hesitate to contact our Data Protection Officer using the contact information provided at the end of this policy.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <p className="text-muted-foreground leading-relaxed">
                We collect various types of personal information to provide, maintain, and improve our courier and delivery services. The information we collect falls into several categories, each serving specific purposes related to our business operations and service delivery.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">2.1 Personal Identification Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                When you create an account, book a delivery, or interact with our services, we collect personal identification information including your full name, email address, mobile phone number, identity card (IC) or passport number (for business accounts and high-value shipments), date of birth (for age verification purposes), and business registration details (for corporate accounts). This information is essential for account creation, identity verification, communication, and service provision.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">2.2 Address and Location Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                To facilitate pickup and delivery services, we collect detailed address information including pickup addresses with complete street addresses, building names, unit numbers, and postal codes, delivery addresses with similar comprehensive details, GPS coordinates and geolocation data (when you use our mobile app with location services enabled), and address history for frequent delivery locations. This information is critical for accurate routing, efficient delivery, and providing real-time tracking updates.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">2.3 Payment and Financial Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                For processing payments, we collect credit or debit card information (card number, expiration date, CVV), bank account details (for business accounts with credit terms), billing address, transaction history, and payment preferences. Please note that sensitive payment information such as full credit card numbers and CVV codes are processed through secure, PCI-DSS compliant payment gateways and are not stored on our servers. We only retain tokenized payment information and transaction records necessary for accounting, refunds, and dispute resolution.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">2.4 Shipment and Delivery Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                Each shipment generates data that we collect and process, including parcel details such as weight, dimensions, and contents description, service type selected (same-day, next-day, scheduled, bulk), tracking numbers and delivery status updates, delivery instructions and special handling requirements, proof of delivery including recipient signatures and photographs, and delivery attempt history. This information is essential for fulfilling our service obligations, providing tracking visibility, and resolving any delivery issues.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">2.5 Communication and Interaction Data</h3>
              <p className="text-muted-foreground leading-relaxed">
                We collect records of your communications with us through various channels, including customer service call recordings and transcripts, email correspondence, live chat messages, feedback and survey responses, social media interactions on our official pages, and complaint or inquiry records. This information helps us improve our customer service, resolve issues effectively, and enhance the overall customer experience.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">2.6 Technical and Usage Information</h3>
              <p className="text-muted-foreground leading-relaxed">
                When you access our website or mobile application, we automatically collect certain technical information including IP address, browser type and version, device information (device model, operating system, unique device identifiers), cookies and similar tracking technologies, pages visited, time spent on pages, referring website or source, search queries entered on our website, and app usage analytics. This data helps us understand how users interact with our digital platforms, identify technical issues, prevent fraud, and optimize user experience.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We process your personal information for specific, legitimate purposes that are necessary for providing our courier services and operating our business. The legal bases for processing your data under the PDPA include your consent, contractual necessity, legal obligations, and our legitimate business interests.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">3.1 Service Delivery and Operations</h3>
              <p className="text-muted-foreground leading-relaxed">
                We use your information to process and fulfill delivery bookings, coordinate pickup and delivery logistics, provide real-time tracking and status updates, communicate delivery schedules and any changes, verify recipient identity upon delivery, handle failed delivery attempts and re-delivery arrangements, and maintain shipment records for reference and dispute resolution. These processing activities are necessary to perform our contractual obligations to you as our customer.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">3.2 Payment Processing and Financial Management</h3>
              <p className="text-muted-foreground leading-relaxed">
                Your payment information is used to process transactions, issue invoices and receipts, manage business account billing and credit terms, process refunds and compensation claims, detect and prevent fraudulent transactions, and maintain financial records for accounting and tax purposes. Payment processing is essential for the performance of our contract with you and compliance with financial regulations.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">3.3 Customer Service and Support</h3>
              <p className="text-muted-foreground leading-relaxed">
                We process your data to respond to inquiries and support requests, resolve complaints and service issues, provide assistance with tracking and delivery questions, handle claims for lost or damaged items, and maintain records of customer interactions for quality assurance and training purposes. This processing is based on our legitimate interest in providing excellent customer service and fulfilling our contractual obligations.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">3.4 Service Improvement and Analytics</h3>
              <p className="text-muted-foreground leading-relaxed">
                We analyze usage patterns and customer feedback to improve our delivery routes and efficiency, enhance our website and mobile app functionality, develop new services and features, optimize pricing and service offerings, identify and fix technical issues, and conduct market research and customer satisfaction surveys. These activities are based on our legitimate business interests in improving our services and remaining competitive.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">3.5 Marketing and Communications</h3>
              <p className="text-muted-foreground leading-relaxed">
                With your consent, we may use your contact information to send promotional offers and discounts, notify you of new services and features, share company news and updates, send personalized recommendations based on your shipping history, and invite you to participate in customer surveys and feedback programs. You can opt out of marketing communications at any time by clicking the unsubscribe link in our emails or contacting our customer service team.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">3.6 Legal Compliance and Security</h3>
              <p className="text-muted-foreground leading-relaxed">
                We process your information to comply with legal obligations including tax laws, customs regulations, and data protection requirements, respond to lawful requests from government authorities and law enforcement, enforce our Terms of Service and other agreements, protect against fraud, security threats, and illegal activities, defend our legal rights in disputes and litigation, and conduct internal audits and compliance monitoring. These processing activities are necessary to comply with legal obligations and protect our legitimate interests.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed">
                We understand the importance of keeping your personal information confidential. We do not sell, rent, or trade your personal data to third parties for their marketing purposes. However, we may share your information with carefully selected third parties in the following circumstances, always ensuring appropriate safeguards are in place to protect your data.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">4.1 Service Providers and Business Partners</h3>
              <p className="text-muted-foreground leading-relaxed">
                We engage trusted third-party service providers to assist with our operations, including delivery partners and courier agents who handle physical transportation of parcels, payment processors and financial institutions that facilitate secure payment transactions, IT service providers who maintain our website, servers, and databases, cloud storage providers for secure data storage and backup, SMS and email service providers for sending notifications and communications, customer service platforms and call center operators, and analytics and marketing service providers. All service providers are contractually obligated to protect your data, use it only for the specified purposes, and comply with applicable data protection laws.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">4.2 Legal and Regulatory Authorities</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may disclose your information to government agencies, law enforcement, and regulatory bodies when required by law or legal process, in response to valid subpoenas, court orders, or legal requests, to comply with customs and import/export regulations, to protect our legal rights and defend against legal claims, to investigate and prevent fraud, security breaches, or illegal activities, and to protect the safety and rights of our customers, employees, and the public. We will only disclose the minimum amount of information necessary to fulfill the legal requirement.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">4.3 Business Transfers</h3>
              <p className="text-muted-foreground leading-relaxed">
                In the event of a merger, acquisition, reorganization, sale of assets, or bankruptcy, your personal information may be transferred to the acquiring or successor entity. We will notify you via email and/or prominent notice on our website of any such change in ownership or control of your personal information, and you will have the opportunity to opt out of the transfer if you do not wish your data to be transferred to the new entity.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">4.4 With Your Consent</h3>
              <p className="text-muted-foreground leading-relaxed">
                We may share your information with other third parties when you have given us explicit consent to do so. For example, if you request us to share delivery information with a third party for coordination purposes, or if you participate in a co-marketing program with one of our partners, we will obtain your consent before sharing your data.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Data Security and Protection Measures</h2>
              <p className="text-muted-foreground leading-relaxed">
                Protecting your personal information is a top priority for DumoExpress. We implement comprehensive technical, physical, and organizational security measures to safeguard your data against unauthorized access, disclosure, alteration, and destruction. Our security framework includes multiple layers of protection designed to maintain the confidentiality, integrity, and availability of your personal information.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">5.1 Technical Security Measures</h3>
              <p className="text-muted-foreground leading-relaxed">
                We employ industry-standard encryption protocols including SSL/TLS encryption for all data transmitted between your browser and our servers, encryption of sensitive data at rest in our databases, secure tokenization of payment card information, regular security patches and updates to all systems and software, firewalls and intrusion detection systems to prevent unauthorized access, secure API authentication and authorization mechanisms, and regular vulnerability assessments and penetration testing conducted by independent security experts.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">5.2 Access Controls and Authentication</h3>
              <p className="text-muted-foreground leading-relaxed">
                Access to personal data is strictly controlled and limited to authorized personnel who need the information to perform their job functions. We implement role-based access controls, multi-factor authentication for administrative access, regular access reviews and privilege audits, immediate revocation of access when employees leave the company or change roles, and comprehensive logging and monitoring of all data access activities.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">5.3 Physical Security</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our data centers and offices where personal information is stored or processed are protected by 24/7 security personnel and surveillance, biometric access controls and visitor management systems, secure disposal procedures for physical documents containing personal data, and environmental controls to protect against fire, flood, and other physical threats.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">5.4 Organizational Measures</h3>
              <p className="text-muted-foreground leading-relaxed">
                We maintain a comprehensive data protection program that includes mandatory data protection training for all employees, confidentiality agreements and data protection clauses in employment contracts, clear data protection policies and procedures, a designated Data Protection Officer responsible for overseeing compliance, regular internal audits and compliance reviews, and an incident response plan for handling potential data breaches.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">5.5 Data Breach Notification</h3>
              <p className="text-muted-foreground leading-relaxed">
                Despite our best efforts, no security system is completely impenetrable. In the unlikely event of a data breach that poses a risk to your rights and freedoms, we will notify affected individuals and the relevant authorities in accordance with PDPA requirements. We will provide information about the nature of the breach, the data affected, the potential consequences, and the measures we are taking to address the breach and prevent future occurrences.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Data Retention and Deletion</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, resolve disputes, and enforce our agreements. Our retention periods are based on the nature of the information, the purposes for which it is processed, and applicable legal requirements.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">6.1 Retention Periods</h3>
              <p className="text-muted-foreground leading-relaxed">
                Account information is retained for the duration of your active account plus 2 years after account closure, shipment and delivery records are kept for 7 years to comply with tax and accounting regulations, payment and financial records are maintained for 7 years as required by Malaysian financial regulations, customer service communications are retained for 3 years for quality assurance and dispute resolution, marketing consent records are kept for as long as you remain subscribed plus 2 years, and website usage data and analytics are typically retained for 2 years.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">6.2 Secure Deletion</h3>
              <p className="text-muted-foreground leading-relaxed">
                When personal information is no longer needed, we securely delete or anonymize it using industry-standard methods. Electronic data is overwritten or cryptographically erased to prevent recovery, physical documents are shredded or destroyed, and backup copies are systematically purged according to our data retention schedule. In some cases, we may anonymize data instead of deleting it, removing all personally identifiable information so that it can no longer be associated with you.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Your Rights Under the PDPA</h2>
              <p className="text-muted-foreground leading-relaxed">
                Under the Personal Data Protection Act 2010 (PDPA) of Malaysia, you have several important rights regarding your personal data. We are committed to facilitating the exercise of these rights and will respond to your requests in a timely manner.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">7.1 Right of Access</h3>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to request access to the personal data we hold about you. Upon receiving a valid access request, we will provide you with a copy of your personal information, details about how we use your data, information about who we share your data with, and the retention period for your data. We will respond to access requests within 21 days as required by the PDPA. There is no fee for your first access request in a calendar year; subsequent requests may incur a reasonable administrative fee.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">7.2 Right to Correction</h3>
              <p className="text-muted-foreground leading-relaxed">
                If you believe that any personal information we hold about you is inaccurate, incomplete, or out-of-date, you have the right to request correction. You can update most of your account information directly through your online account dashboard. For other corrections, please contact our Data Protection Officer with details of the information you wish to correct and supporting documentation if applicable. We will update your information promptly and notify any third parties with whom we have shared the incorrect data.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">7.3 Right to Withdraw Consent</h3>
              <p className="text-muted-foreground leading-relaxed">
                Where we process your personal data based on your consent (such as for marketing communications), you have the right to withdraw that consent at any time. You can unsubscribe from marketing emails by clicking the unsubscribe link in any promotional email, opt out of SMS marketing by replying STOP to any marketing SMS, or contact our customer service to withdraw consent for other processing activities. Please note that withdrawing consent does not affect the lawfulness of processing based on consent before its withdrawal, and we may still process your data if we have another legal basis to do so.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">7.4 Right to Data Portability</h3>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to receive your personal data in a structured, commonly used, and machine-readable format, and to transmit that data to another service provider. We will provide your data in CSV or JSON format upon request, subject to technical feasibility and legal requirements.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">7.5 Right to Object and Restrict Processing</h3>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to object to certain types of processing, including processing for direct marketing purposes and processing based on our legitimate interests. You may also request that we restrict the processing of your personal data in certain circumstances, such as when you contest the accuracy of the data or object to processing. We will honor such requests unless we have compelling legitimate grounds to continue processing or need to process the data for legal claims.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">7.6 How to Exercise Your Rights</h3>
              <p className="text-muted-foreground leading-relaxed">
                To exercise any of your rights under the PDPA, please submit a written request to our Data Protection Officer at privacy@dumoexpress.com or by mail to the address provided in Section 12. To protect your privacy and security, we may need to verify your identity before processing your request. We will respond to all valid requests within 21 days as required by the PDPA, or inform you if we need additional time and the reasons for the delay.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Cookies and Tracking Technologies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website and mobile application use cookies and similar tracking technologies to enhance your user experience, analyze usage patterns, and deliver personalized content. Cookies are small text files stored on your device that help us remember your preferences and understand how you interact with our services.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">8.1 Types of Cookies We Use</h3>
              <p className="text-muted-foreground leading-relaxed">
                We use several categories of cookies: Essential cookies that are necessary for the website to function properly, including session management, security, and load balancing; Performance cookies that collect information about how visitors use our website, helping us improve functionality and user experience; Functional cookies that remember your preferences and choices to provide enhanced features; and Targeting/Advertising cookies that track your browsing habits to deliver relevant advertisements and measure campaign effectiveness. You can control cookie settings through your browser preferences, though disabling certain cookies may limit your ability to use some features of our website.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Third-Party Links and Services</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our website and communications may contain links to third-party websites, applications, or services that are not operated by DumoExpress. This Privacy Policy does not apply to those third-party sites, and we are not responsible for their privacy practices. We encourage you to review the privacy policies of any third-party sites you visit. When you click on third-party links or use integrated third-party services (such as social media sharing buttons), those third parties may collect information about you. We do not control and are not responsible for the data collection and use practices of these third parties.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our services are not directed to individuals under the age of 18, and we do not knowingly collect personal information from children. If you are under 18 years of age, please do not use our services or provide any personal information to us. If we become aware that we have collected personal information from a child under 18 without parental consent, we will take steps to delete that information as soon as possible. Parents or guardians who believe we may have collected information from a child should contact our Data Protection Officer immediately.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">11. International Data Transfers</h2>
              <p className="text-muted-foreground leading-relaxed">
                Your personal information is primarily stored and processed in Malaysia. However, some of our service providers and business partners may be located in other countries. When we transfer personal data outside of Malaysia, we ensure that appropriate safeguards are in place to protect your information in accordance with the PDPA. These safeguards may include standard contractual clauses approved by data protection authorities, adequacy decisions recognizing that the destination country provides adequate data protection, or other legally recognized transfer mechanisms. We will only transfer your data internationally when necessary for service provision and with appropriate protections in place.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or business operations. When we make material changes to this policy, we will notify you by email (if you have provided an email address) and/or by posting a prominent notice on our website at least 30 days before the changes take effect. The "Last Updated" date at the top of this policy indicates when it was last revised. We encourage you to review this Privacy Policy periodically to stay informed about how we protect your personal information. Your continued use of our services after the effective date of any changes constitutes your acceptance of the updated Privacy Policy.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Contact Information and Complaints</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions, concerns, or complaints about this Privacy Policy or our data protection practices, please contact our Data Protection Officer through the following channels:
              </p>
              <div className="mt-4 p-6 bg-gray-50 rounded-lg">
                <p className="text-muted-foreground"><strong>Data Protection Officer</strong></p>
                <p className="text-muted-foreground">DumoExpress Sdn Bhd</p>
                <p className="text-muted-foreground">Level 15, Menara KL</p>
                <p className="text-muted-foreground">Jalan Sultan Ismail</p>
                <p className="text-muted-foreground">50250 Kuala Lumpur, Malaysia</p>
                <p className="text-muted-foreground mt-4"><strong>Email:</strong> privacy@dumoexpress.com</p>
                <p className="text-muted-foreground"><strong>Phone:</strong> +60 3-1234 5678</p>
                <p className="text-muted-foreground"><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM (GMT+8)</p>
              </div>
              <p className="text-muted-foreground leading-relaxed mt-6">
                We are committed to resolving any privacy concerns or complaints in a timely and transparent manner. If you are not satisfied with our response, you have the right to lodge a complaint with the Personal Data Protection Commissioner of Malaysia. Contact information for the Commissioner can be found at the Department of Personal Data Protection website (www.pdp.gov.my).
              </p>
            </section>
            
            <section className="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-gray-700">
                <strong>Consent Acknowledgment:</strong> By using DumoExpress services and providing your personal information, you acknowledge that you have read and understood this Privacy Policy and consent to the collection, use, and disclosure of your personal data as described herein. If you do not agree with this Privacy Policy, please do not use our services or provide us with your personal information.
              </p>
            </section>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
