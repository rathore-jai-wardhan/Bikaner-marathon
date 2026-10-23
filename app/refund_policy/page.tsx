
export default function RefundPolicy() {
  const sections = [
    {
      title: "1. Registration Fees",
      paragraphs: [
        "All registration fees paid for Bikaner Marathon are non-refundable, non-transferable, and non-deferrable, subject to the terms of this policy and applicable law.",
      ],
    },
    {
      title: "2. Cancellation by Participant",
      paragraphs: [
        "If a participant is unable to attend the event for personal reasons, a refund will not ordinarily be provided, subject to applicable law and the terms expressly stated in this policy.",
        "Reasons may include, but are not limited to:",
      ],
      bullets: [
        "Injury or illness.",
        "Personal or professional commitments.",
        "Travel delays or cancellations.",
        "Scheduling conflicts.",
        "A change in personal plans.",
        "Any other reason preventing the participant from attending.",
      ],
    },
    {
      title: "3. Event Cancellation or Postponement",
      paragraphs: [
        "The organisers reserve the right to postpone, reschedule, modify, shorten, suspend, or cancel the event where reasonably necessary due to circumstances beyond their reasonable control or where required for public safety, legal compliance, or operational reasons.",
        "Such circumstances may include:",
      ],
      bullets: [
        "Natural disasters.",
        "Extreme or unsafe weather conditions.",
        "Government directives, restrictions, or withdrawal of required permissions.",
        "Public health emergencies or pandemics.",
        "Civil unrest or law-and-order situations.",
        "Force majeure events.",
        "Any other circumstances that materially affect participant safety or the safe conduct of the event.",
      ],
      closing:
        "The refund or alternative arrangements applicable to a cancellation, postponement, rescheduling, or material change will be communicated by the organisers and handled in accordance with applicable law. Any proposed non-refund arrangement must be confirmed and approved by the organisers before this policy is published.",
    },
    {
      title: "4. No Transfer or Resale",
      paragraphs: [
        "Registered entries may not be transferred to another participant, deferred to a future edition, sold, exchanged, or resold unless the organisers expressly announce an authorised exception.",
        "Unauthorised transfer or resale of a registration or race bib may result in disqualification, cancellation of the entry, or other appropriate action under the event rules. Any refund entitlement remains subject to this policy and applicable law.",
      ],
    },
    {
      title: "5. Duplicate Payments",
      paragraphs: [
        "If a participant is charged more than once for the same registration due to a technical error or payment-processing issue, the participant should contact the organisers with the relevant transaction references and proof of payment.",
        "Once the duplicate payment has been verified as successfully received, the eligible duplicate amount will be refunded to the original payment method. The time required for the refund to appear in the participant's account may depend on the payment provider and bank.",
      ],
    },
    {
      title: "6. Failed or Incomplete Transactions",
      paragraphs: [
        "If a payment fails or registration is not successfully completed, a race entry will not be confirmed unless the organisers subsequently verify a valid completed registration.",
        "Where an amount has been debited for a failed or incomplete transaction, its reversal or refund will be handled through the relevant payment provider or bank under the applicable transaction-resolution process and timelines.",
        "If the amount has not been reversed within the expected timeframe, participants should contact their bank or payment provider and, where necessary, notify the event organisers with the transaction details.",
      ],
    },
    {
      title: "7. Merchandise & Add-on Purchases",
      paragraphs: [
        "Optional merchandise, event add-ons, and other additional purchases made during registration are subject to the conditions displayed at the time of purchase.",
        "Unless otherwise stated by the organisers or required by applicable law, such purchases are non-refundable once the order has been successfully placed. Any exceptions, including those relating to unavailable or incorrectly supplied items, will be handled in accordance with the applicable purchase terms and law.",
      ],
    },
    {
      title: "8. Refund Processing",
      paragraphs: [
        "Refunds approved under this policy, including verified duplicate-payment refunds, will ordinarily be issued to the original payment method.",
        "Processing times may vary depending on the payment gateway, banking institution, and payment method. Participants will be informed if additional information is reasonably required to verify a refund request.",
        "For assistance, participants should provide their registration reference, transaction ID, payment date, and relevant supporting information. Do not send passwords, card PINs, or payment authentication credentials.",
      ],
    },
    {
      title: "9. Acceptance of This Policy",
      paragraphs: [
        "By proceeding with registration and payment for Bikaner Marathon, participants acknowledge that they have been given an opportunity to read this Refund & Cancellation Policy before completing their purchase.",
        "This policy should be read alongside the event's Terms & Conditions and Privacy Policy. Where a provision is subject to applicable law, that law will prevail to the extent required.",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Header */}
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
            Refund &amp; Cancellation Policy
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/85 sm:text-base">
            Please review this policy carefully before registering
            for the event or making a payment.
          </p>

          <p className="mt-5 text-sm text-white/75">
            Event edition: Inaugural
          </p>

          <p className="mt-1 text-sm text-white/75">
            Last updated: 22nd Oct, 2026
          </p>
        </div>
      </section>

      {/* Policy content */}
      <section className="px-5 py-10 sm:px-8 sm:py-14">
        <article className="mx-auto max-w-5xl">
          <div className="mb-10 rounded-lg border border-gray-200 bg-gray-50 p-5 sm:p-6">
            <h2 className="mb-3 text-lg font-semibold text-gray-900 sm:text-xl">
              Important information
            </h2>

            <p className="text-sm leading-7 text-gray-600 sm:text-base">
              This policy explains the circumstances in which
              registration fees and other eligible payments may
              or may not be refunded. Please ensure you understand
              the applicable conditions before completing payment.
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
                  {section.paragraphs.map((paragraph, index) => (
                    <p
                      key={index}
                      className="break-words text-sm leading-7 text-gray-600 sm:text-base sm:leading-8"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {section.bullets && (
                  <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                )}

                {section.closing && (
                  <p className="mt-4 break-words text-sm leading-7 text-gray-600 sm:text-base sm:leading-8">
                    {section.closing}
                  </p>
                )}
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
              Need help with a payment?
            </h2>

            <p className="mt-3 text-sm leading-7 text-white/85 sm:text-base">
              For questions about registration payments, duplicate
              charges, or refund requests, contact the event
              organising team using the verified details below.
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
                <strong>Website:</strong>{" "}
                https://www.bikanermarathon.com/
              </p>
            </div>
          </section>
        </article>
      </section>
    </main>
  );
}
