
export default function TermsAndConditions() {
  const sections = [
    {
      title: "1. Introduction & Acceptance",
      content: [
        "These Rules & Regulations govern participation in Bikaner Marathon, organised by BHAG BHARAT FOUNDATION. By registering for or participating in the event, participants acknowledge that they have read and understood these rules and agree to comply with the applicable event policies and instructions issued by the organisers.",
      ],
    },
    {
      title: "2. Definitions",
      content: [
        "Organiser: BHAG BHARAT FOUNDATION, responsible for organising the event.",
        "Participant: Any individual registered to participate in an event category.",
        "Race Bib: The identification number issued to a participant.",
        "Timing Chip: An electronic device used to record race timings, where applicable.",
        "Race Kit: The bib, event merchandise, and other items issued to a participant, as specified by the organisers.",
        "Gun Time: The elapsed time measured from the official race start signal.",
        "Net Time: The elapsed time measured from a participant's crossing of the start timing point to the finish timing point, where applicable.",
        "Cut-off Time: The maximum time permitted for completing a race category under the published event rules.",
        "Force Majeure: An event or circumstance beyond the reasonable control of the organisers that prevents, disrupts, or makes the event unsafe to conduct.",
      ],
    },
    {
      title: "3. Eligibility & Registration",
      content: [
        "There is no minimum or maximum age limit for any race category. Participants who will be under 18 years of age on race day (27 December 2026) must be registered with the name, mobile number and email address of a parent or legal guardian, who will receive all registration communications and is responsible for the participant's participation.",
        "Registration is considered confirmed only after successful payment, where applicable, and receipt of registration confirmation.",
        "Participants must provide accurate and complete information during registration. The organisers may cancel or invalidate a registration if materially false, misleading, or fraudulent information is identified, subject to applicable requirements.",
      ],
    },
    {
      title: "4. Registration Policy",
      content: [
        "Registration transfer, cancellation, refund, and deferral requests are governed by the event's published Refund & Cancellation Policy.",
        "Participants must not sell, transfer, duplicate, or otherwise misuse their registration or race bib without the organisers' express permission.",
        "The organisers may reject or cancel a registration for a legitimate event-related reason, subject to applicable law and the published policies.",
      ],
    },
    {
      title: "5. Medical Fitness & Participant Responsibility",
      content: [
        "Participants are responsible for assessing their fitness to participate and are encouraged to seek appropriate medical advice before undertaking strenuous physical activity.",
        "Participants must stop and seek assistance if they experience symptoms that may indicate a medical emergency.",
        "For participant safety, the organisers or authorised medical personnel may restrict or discontinue a participant's involvement where reasonably necessary.",
      ],
    },
    {
      title: "6. Race Categories & Eligibility",
      content: [
        "Participants may enter any race category, subject to these Rules & Regulations.",
        "Available categories, minimum age requirements, registration limits, and any category-change procedure will be announced through official event channels.",
        "Any request to change a race category is subject to organiser approval and operational feasibility.",
        "Confirmed Bikaner Marathon race categories: 2 Km Fun Run, 5 Km Run, 10 Km Challenge Run, 21 Km Half Marathon.",
       "2 Km Fun Run: participants receive an event T-shirt only. No race bib, finisher medal, or refreshments are provided for this category.",
        "5 Km Run, 10 Km Challenge Run and 21 Km Half Marathon: participants receive a race bib, event T-shirt, finisher medal (subject to finishing within the applicable cut-off) and on-course refreshments. Breakfast is not provided for any category.",
      ],
    },
    {
      title: "7. Bib Expo & Race Kit Collection",
      content: [
        "Race Kit: The items issued to a participant for their race category. For the 2 Km Fun Run this is an event T-shirt only. For the 5 Km, 10 Km and 21 Km categories it includes the race bib, event T-shirt and other items specified by the organisers.",
        "Participants may be required to present their registration confirmation and valid identification for verification.",
        "Race kit collection arrangements, authorised collection by another person, and any applicable deadlines will be communicated through official event channels.",
      ],
    },
    {
      title: "8. Race Bib, Timing Chip & Identity Verification",
      content: [
        "Participants in the 5 Km, 10 Km and 21 Km categories must display their race bib as instructed by the organisers. Where required, the bib must remain clearly visible on the front of the participant's clothing. Race bibs are not issued for the 2 Km Fun Run.",
        "Bib swapping, impersonation, unauthorised duplication, alteration of a bib, or tampering with timing equipment is prohibited.",
        "Electronic timing will be used where applicable. Participants are responsible for following the instructions provided for timing chips and other event equipment.",
      ],
    },
    {
      title: "9. Race Day Rules",
      content: [
        "Participants must follow the designated course, event signage, and instructions issued by race officials, volunteers, police, and authorised safety personnel.",
        "Participants must not take shortcuts, enter restricted areas, obstruct other participants, or interfere with event operations.",
        "Where timing checkpoints are specified, participants must pass through the required checkpoints to qualify for an official result.",
        "The organisers may adjust routes or race-day arrangements where reasonably necessary for safety, permissions, or operational reasons.",
      ],
    },
    {
      title: "10. Official Cut-off Timings",
      content: [
        "The official cut-off times for each category will be published by the organisers before race day. The following values must be confirmed before publication:",
        "21 Km Run: 3 Hours",
        "10 KM Run: 1 Hours 40 Minutes",
        "5 KM Run: 1 Hour",
        "2 KM Run: Non-timed Fun Run",
        "After a published cut-off, roads may reopen to normal traffic in accordance with permissions and directions from local authorities. Participants must follow police and race officials' instructions and use only routes or footpaths directed by them.",
        "Hydration stations, medical support, timing operations, and other race services may be reduced or withdrawn after the applicable cut-off. Where necessary for safety, officials may require a participant to leave the course.",
        "Finishing after the applicable cut-off may affect eligibility for official timing, medals, certificates, or inclusion in official results, as specified in the published category rules.",
      ],
    },
    {
      title: "11. Timing, Results & Finisher Benefits",
      content: [
        "Official results will be determined using the event's designated timing system and result-verification procedures, where applicable.",
        "Results may be published through official event channels. Participants should report suspected timing or result errors within the period and through the process announced by the organisers.",
        "Finisher medals are awarded only in the 5 Km, 10 Km and 21 Km categories, to participants who finish within the applicable cut-off. The 2 Km Fun Run is non-timed and does not include a medal, bib, rankings, or refreshments. Certificates and other benefits depend on the category entered and the applicable completion requirements.",
      ],
    },
   
    {
      title: "12. Code of Conduct & Anti-Cheating",
      content: [
        "Participants must behave respectfully towards other runners, volunteers, officials, spectators, and members of the public.",
        "Prohibited conduct includes bib swapping, impersonation, course cutting, deliberate obstruction, abusive or threatening behaviour, unauthorised assistance where prohibited, and tampering with timing equipment.",
        "Violations may result in warnings, disqualification, removal from the course, or other appropriate action under the event rules.",
      ],
    },
    {
      title: "13. Safety, Hydration & Medical Support",
      content: [
        "Medical assistance, hydration stations, and emergency support will be provided only at the locations and to the extent confirmed by the organisers for the event.",
        "Participants should familiarise themselves with event safety instructions and promptly alert an official or medical professional if they or another participant requires assistance.",
        "Participants must follow instructions from authorised medical personnel and emergency responders.",
      ],
    },
    {
      title: "14. Baggage Deposit",
      content: [
        "A baggage deposit facility will be available only if expressly announced by the organisers.",
        "Participants must follow the published baggage acceptance, labelling, collection, and closing-time instructions. Items that are prohibited or unsuitable for storage may be refused.",
        "Participants should avoid depositing cash, jewellery, electronics, important documents, or other valuables. Any baggage-related responsibility or limitations must be communicated in advance and will remain subject to applicable law.",
      ],
    },
    {
      title: "15. Photography, Media & Privacy",
      content: [
        "Photography or video recording may take place during the event. The collection and use of identifiable photographs, recordings, interviews, and race results will be handled in accordance with the event's Privacy Policy, applicable notices, permissions, and legal requirements.",
        "Personal information collected during registration will be handled as described in the published Privacy Policy.",
        "Participants should review the Privacy Policy for details about data use, media practices, and how to contact the organiser with privacy-related concerns.",
      ],
    },
    {
      title: "16. Refund, Cancellation & Force Majeure",
      content: [
        "Registration fees, participant cancellations, duplicate payments, and refund requests are governed by the published Refund & Cancellation Policy.",
        "The organisers may modify, postpone, suspend, or cancel the event where required by safety concerns, government directions, permissions, severe weather, a Force Majeure event, or other circumstances affecting the safe or lawful conduct of the event.",
        "Where an event is changed, postponed, or cancelled, the available options and any refund arrangements will be handled in accordance with the published Refund & Cancellation Policy and applicable law.",
        "Participants should read the Refund & Cancellation Policy before completing registration.",
      ],
    },
    {
      title: "17. Liability & Insurance",
      content: [
        "Participation in a marathon involves physical exertion and inherent risks, including injury, illness, and environmental or traffic-related hazards.",
        "Participants are responsible for following safety instructions, assessing their own fitness, and taking reasonable precautions during the event.",
        "Participants are encouraged to consider appropriate personal accident or health insurance.",
        "Nothing in these rules excludes or limits any liability or legal right that cannot lawfully be excluded or limited. Any additional liability terms must be reviewed and approved by the organiser before publication.",
      ],
    },
    {
      title: "18. Environmental Responsibility",
      content: [
        "Participants are encouraged to use designated waste bins, avoid littering, and respect the event route, local community, and surrounding environment.",
        "Participants must follow instructions concerning waste disposal, hydration containers, and environmentally responsible event practices.",
      ],
    },
    {
      title: "19. Amendments",
      content: [
        "The organisers may update event rules where reasonably necessary to address safety, operational requirements, permissions, or other legitimate event needs.",
        "Material changes will be communicated through official event channels where appropriate. Participants should review the latest published version before race day.",
      ],
    },
    {
      title: "20. Governing Law & Jurisdiction",
      content: [
        "These rules are governed by the applicable laws of India.",
        "Any jurisdiction clause must identify the legally appropriate courts and location after confirmation by the organiser. Proposed jurisdiction: New Court Building, Near Public Park, Rath Khana Colony, Bikaner, Rajasthan – 334001",
      ],
    },
    {
      title: "21. Contact Information",
      content: [
        "For questions about these Rules & Regulations, please contact the event organiser using the verified details below.",
        "Organiser: BHAG BHARAT FOUNDATION",
        "Website: https://www.bikanermarathon.com/",
        "Email: team@bikanerrunclub.in",
        "Helpline: +91 94624 75332",
        "Address: Behind Rajasthan Patrika Press, Amar singh pura , Bikaner 334001",
      ],
    },
    {
      title: "23. Acceptance",
      content: [
        "By registering for or participating in Bikaner Marathon, participants acknowledge that they have had the opportunity to review these Rules & Regulations and the other applicable event policies.",
        "Participants are expected to comply with the published rules and reasonable instructions issued by authorised event personnel. Registration acknowledgements and any additional consent requirements will be presented during the registration process where applicable.",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Maroon hero section */}
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
            Rules &amp; Regulations
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
            Official participation guidelines, race-day procedures,
            eligibility requirements, and safety rules for participants.
          </p>

          <p className="mt-5 text-sm text-white/75">
            Event edition: Inaugural
          </p>
          <p className="mt-1 text-sm text-white/75">
            Last updated: 22nd Oct, 2026
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="px-5 py-10 sm:px-8 sm:py-14">
        <article className="mx-auto max-w-5xl">
          <div className="mb-10 rounded-lg border border-gray-200 bg-gray-50 p-5 sm:p-6">
            <h2 className="mb-3 text-lg font-semibold text-gray-900 sm:text-xl">
              Official Rules &amp; Regulations
            </h2>
            <p className="text-sm leading-7 text-gray-600 sm:text-base">
              These rules are intended to help ensure a safe,
              fair, and well-organised event. Participants should
              read them alongside the Privacy Policy and Refund
              &amp; Cancellation Policy before registering.
            </p>
          </div>

          <div className="space-y-10 sm:space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <h2
                  className="mb-4 border-b-2 pb-3 text-xl font-bold leading-snug sm:text-2xl"
                  style={{ borderColor: "var(--gold)" }}
                >
                  {section.title}
                </h2>

                <div className="space-y-4">
                  {section.content.map((paragraph, index) => (
                    <p
                      key={index}
                      className="break-words text-sm leading-7 text-gray-600 sm:text-base sm:leading-8"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* Contact panel */}
          <section
            className="mt-12 rounded-lg p-5 sm:mt-16 sm:p-8"
            style={{
              backgroundColor: "var(--maroon)",
              color: "white",
            }}
          >
            <h2 className="text-xl font-bold sm:text-2xl">
              Questions about the rules?
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/85 sm:text-base">
              Contact the Bikaner Marathon organising team using
              the official contact details published on this page.
            </p>
            <p className="mt-4 break-words text-sm sm:text-base">
              <strong>Email:</strong> team@bikanerrunclub.in
            </p>
            <p className="mt-2 break-words text-sm sm:text-base">
              <strong>Phone:</strong> +91 94624 75332
            </p>
          </section>

        </article>
      </section>
    </main>
  );
}
