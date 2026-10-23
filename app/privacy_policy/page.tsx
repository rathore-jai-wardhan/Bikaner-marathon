interface Paragraph {
  heading?: string; // Optional, since you use paragraph.heading && ...
  text: string;
}

// Define the shape of a Subsection
interface Subsection {
  title?: string;   // Optional, since you use subsection.title && ...
  paragraphs: Paragraph[];
}

// Define the shape of a Section
interface Section {
    title: string;
  subsections: Subsection[];
}
export default function PrivacyPolicy() {
  const sections: Section[] = [
    {
      title: "1. Information We Collect",
      subsections: [
        {
          title: "1.1 Personal Information",
          paragraphs: [
            {
              heading: "Registration Information",
              text: "When you register for Bikaner Marathon, we may collect information such as your name, email address, mobile number, date of birth, gender, postal address, emergency contact details, T-shirt size, race category, and other information necessary to manage your registration.",
            },
            {
              heading: "Payment Information",
              text: "Registration payments are processed through authorised third-party payment service providers. The event organiser does not intend to store complete credit or debit card details, banking credentials, or other sensitive payment authentication information. Payment confirmations and transaction references may be retained for registration management and accounting.",
            },
            {
              heading: "Health Information",
              text: "If medical or health-related information is requested for participant safety, the organiser will explain why it is needed and handle it in accordance with applicable requirements. Such information should only be collected where necessary and through an appropriate process.",
            },
          ],
        },
        {
          title: "1.2 Automatically Collected Information",
          paragraphs: [
            {
              heading: "Website Usage Data",
              text: "Depending on the website's technical configuration, we may collect information such as browser type, device information, operating system, pages visited, access times, referring pages, and IP address. This information may be used to maintain website security and improve the user experience.",
            },
            {
              heading: "Cookies and Similar Technologies",
              text: "The website may use cookies or similar technologies for essential functionality, preferences, or analytics where enabled. You may be able to manage cookies through your browser settings. Disabling certain cookies may affect some website features.",
            },
          ],
        },
        {
          title: "1.3 Photography, Media and Race Results",
          paragraphs: [
            {
              heading: "Photography and Video",
              text: "Photography and video recording may take place at the event. Any use of identifiable photographs, videos, interviews, or recordings for promotional or other purposes will be handled in accordance with the notices, permissions, and applicable requirements communicated to participants. The organiser should specify how participants can raise concerns about particular uses.",
            },
            {
              heading: "Race Timing and Results",
              text: "Where applicable, race-related information such as bib number, timing-chip data, finish time, split timings, rankings, and results may be processed by the organiser and its timing partners. Selected results may be published through official event channels.",
            },
          ],
        },
      ],
    },
    {
      title: "2. How We Use Your Information",
      subsections: [
        {
          title: "2.1 Registration and Event Management",
          paragraphs: [
            {
              heading: "Participant Communication",
              text: "We use relevant contact details to provide registration confirmations, payment updates, race instructions, event announcements, race-kit collection information, certificates, schedule changes, and other essential communications.",
            },
            {
              heading: "Race-Day Operations",
              text: "Information may be used for participant verification, bib allocation, race-kit distribution, timing services, logistics, security, and coordination of event activities.",
            },
            {
              heading: "Health and Safety",
              text: "Where relevant information has been appropriately collected, it may be used to support emergency coordination and participant safety, with access limited to those who need it for these purposes.",
            },
          ],
        },
        {
          title: "2.2 Marketing and Promotions",
          paragraphs: [
            {
              heading: "Future Events",
              text: "We may send information about future marathons, sporting events, fitness initiatives, and related activities where you have provided the required consent or the communication is otherwise permitted by applicable law. Where applicable, you can opt out of promotional communications.",
            },
            {
              heading: "Event Media",
              text: "Event photographs, videos, testimonials, and recordings may be used for reporting or promotional purposes only in accordance with the applicable notices, permissions, and legal requirements.",
            },
          ],
        },
        {
          title: "2.3 Analytics and Improvement",
          paragraphs: [
            {
              heading: "Website Performance",
              text: "Where analytics tools are enabled, relevant usage information may help us understand website performance, identify technical issues, and improve registration and visitor experience.",
            },
            {
              heading: "Planning Future Events",
              text: "Aggregated or appropriately anonymised information may be used to understand participation trends, prepare reports, and improve future editions of the event.",
            },
          ],
        },
      ],
    },
    {
      title: "3. Sharing and Disclosure of Information",
      subsections: [
        {
          title: "3.1 Service Providers",
          paragraphs: [
            {
              text: "We may share relevant information with service providers involved in registration management, payment processing, website hosting, race timing, event logistics, communications, medical support, or other necessary event operations. Information shared should be limited to what is reasonably required for the relevant service.",
            },
          ],
        },
        {
          title: "3.2 Legal Requirements",
          paragraphs: [
            {
              text: "We may disclose information where required by applicable law, a valid legal process, or a lawful request from a competent court, regulator, government authority, or law enforcement agency.",
            },
          ],
        },
        {
          title: "3.3 Safety and Security",
          paragraphs: [
            {
              text: "Where reasonably necessary to address an emergency or protect the safety of participants or the public, relevant information may be shared with authorised medical personnel, emergency responders, or appropriate authorities.",
            },
          ],
        },
      ],
    },
    {
      title: "4. Data Security and Retention",
      subsections: [
        {
          title: "4.1 Security Measures",
          paragraphs: [
            {
              text: "The organiser will take reasonable measures appropriate to the information handled to protect it against unauthorised access, disclosure, alteration, loss, or misuse. Depending on the systems in use, safeguards may include access controls, secure connections, appropriate service-provider arrangements, and other technical and organisational measures.",
            },
          ],
        },
        {
          title: "4.2 Data Retention",
          paragraphs: [
            {
              text: "Personal information will be retained only for as long as reasonably necessary for the purposes described in this policy, subject to applicable legal, accounting, dispute-resolution, and event-record requirements. Information that is no longer required should be securely deleted or anonymised where appropriate.",
            },
          ],
        },
      ],
    },
    {
      title: "5. External Website Links",
      subsections: [
        {
          paragraphs: [
            {
              text: "Our website may contain links to external websites operated by sponsors, partners, payment providers, or other third parties. Those websites operate under their own terms and privacy practices. We encourage visitors to review the relevant privacy notices before submitting information to an external service.",
            },
          ],
        },
      ],
    },
    {
      title: "6. Children's Privacy",
      subsections: [
        {
          paragraphs: [
            {
              text: "Race participation is subject to the eligibility requirements for each category. Where participation by a minor is permitted, the organiser will follow applicable requirements concerning parental or guardian involvement and the collection and use of the minor's personal information. Questions or concerns about information relating to a minor can be directed to the contact listed below.",
            },
          ],
        },
      ],
    },
    {
      title: "7. Your Choices and Privacy Requests",
      subsections: [
        {
          paragraphs: [
            {
              text: "Subject to applicable law, you may contact the organiser to ask about personal information associated with your registration, request correction of inaccurate information, raise a concern about its use, or exercise other applicable privacy rights. Some records may need to be retained where required for legal, accounting, security, or event-administration purposes.",
            },
          ],
        },
      ],
    },
    {
      title: "8. Changes to This Policy",
      subsections: [
        {
          paragraphs: [
            {
              text: "This Privacy Policy may be updated to reflect changes in event operations, website functionality, or applicable requirements. The latest version will be published on this page with its updated effective date. We encourage visitors to review it periodically.",
            },
          ],
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Page heading */}
      <section
        className="px-5 py-12 text-white sm:px-8 sm:py-16 md:py-20"
        style={{ backgroundColor: "var(--maroon)" }}
      >
        <div className="mx-auto max-w-5xl">
          <p
            className="mb-3 text-sm font-semibold uppercase tracking-[0.2em]"
            style={{ color: "var(--gold)" }}
          >
            Bikaner Marathon
          </p>

          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
            Learn how we collect, use, protect, and share
            information when you visit our website or register
            for the event.
          </p>
        </div>
      </section>

      {/* Policy content */}
      <section className="px-5 py-10 sm:px-8 sm:py-14">
        <article className="mx-auto max-w-5xl">
          <div className="mb-10 rounded-lg border border-gray-200 bg-gray-50 p-5 sm:p-6">
            <h2 className="mb-3 text-lg font-semibold text-gray-900 sm:text-xl">
              About this policy
            </h2>

            <p className="text-sm leading-7 text-gray-600 sm:text-base">
              Bikaner Marathon is organised by{" "}
              <strong>BHAG BHARAT FOUNDATION</strong>. This
              policy explains how the organiser handles personal
              information relating to participants, visitors,
              volunteers, sponsors, and other users of the website
              and associated event services.
            </p>

            <p className="mt-3 text-sm leading-7 text-gray-600 sm:text-base">
              Please read this policy alongside the event&apos;s
              Terms and Conditions and any notices shown during
              registration. Information collected and how it is
              used will depend on the services and features
              actually provided.
            </p>
          </div>

          <div className="space-y-10 sm:space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <h2
                  className="mb-5 border-b-2 pb-3 text-xl font-bold leading-snug sm:text-2xl"
                  style={{ borderColor: "var(--gold)" }}
                >
                  {section.title}
                </h2>

                <div className="space-y-7">
                  {section.subsections.map((subsection, index) => (
                    <div key={`${section.title}-${index}`}>
                      {subsection.title && (
                        <h3 className="mb-3 text-base font-semibold text-gray-900 sm:text-lg">
                          {subsection.title}
                        </h3>
                      )}

                      <div className="space-y-4">
                        {subsection.paragraphs.map(
                          (paragraph, paragraphIndex) => (
                            <p
                              key={paragraphIndex}
                              className="break-words text-sm leading-7 text-gray-600 sm:text-base sm:leading-8"
                            >
                              {paragraph.heading && (
                                <strong className="font-semibold text-gray-800">
                                  {paragraph.heading}:{" "}
                                </strong>
                              )}
                              {paragraph.text}
                            </p>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Contact information */}
          <section
            className="mt-12 rounded-lg p-5 sm:mt-16 sm:p-8"
            style={{
              backgroundColor: "var(--maroon)",
              color: "white",
            }}
          >
            <h2 className="text-xl font-bold sm:text-2xl">
              9. Contact Us
            </h2>

            <p className="mt-3 text-sm leading-7 text-white/85 sm:text-base">
              If you have questions about this Privacy Policy or
              how your information is handled, contact the event
              organiser using the details below.
            </p>

            <div className="mt-5 space-y-3 text-sm sm:text-base">
              <p className="break-words">
                <strong>Organiser:</strong>{" "}
                BHAG BHARAT FOUNDATION
              </p>

              <p className="break-words">
                <strong>Email:</strong>{" "}
                team@bikanerrunclub.in
              </p>

              <p className="break-words">
                <strong>Phone:</strong>{" "}
                +91 94624 75332
              </p>

              <p className="break-words">
                <strong>Address:</strong>{" "}
                Behind Rajasthan Patrika Press, Amar singh pura , Bikaner 334001
              </p>
            </div>
          </section>

          <p className="mt-8 text-xs leading-6 text-gray-500 sm:text-sm">
            Last updated: 22nd Oct, 2026. Replace all bracketed
            placeholders and verify this policy against the
            organiser&apos;s actual data collection, technology,
            media, and registration practices before publication.
          </p>
        </article>
      </section>
    </main>
  );
}
