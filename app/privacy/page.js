"use client";

import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-pink-50/30 py-12 px-4 md:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-[#002050] to-[#1a3a6e] rounded-3xl p-8 md:p-12 mb-10 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#F43676] rounded-full blur-3xl"></div>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-white leading-tight relative z-10">
            Privacy Policy
          </h1>
          <p className="text-center text-white/80 mt-4 text-lg relative z-10">
            Your privacy matters to us
          </p>
        </div>

        {/* Content Section */}
        <div className="bg-white shadow-lg rounded-3xl p-6 md:p-10 space-y-8">
          {/* Privacy Section */}
          <section>
            <h2 className="text-2xl font-bold text-[#002050] mb-4 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-[#F43676] rounded-full"></span>
              PRIVACY
            </h2>
            <div className="space-y-4 text-[#302d55] leading-relaxed">
              <p>
                As a condition of your use of sosign.in, you agree to abide by the terms of our Privacy Policy. You agree to respect the privacy of all visitors and signers of your petition and not to disclose any information acquired from them without prior consent. The sole exception to this rule, as per our Privacy Policy, is when you are presenting the petition to its intended recipient. At that time, and only on one single occasion, you may present a disaggregated list of signers. You will not use any information collected from your petition for marketing or other mass email (spam) purposes without the explicit consent of your signers.
              </p>
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-[#F43676] p-4 rounded-r-xl">
                <p className="text-sm text-[#302d55] uppercase font-semibold">
                  IN NO EVENT SHALL THE COMPANY, ITS PARTNERS, OR ITS SUPPLIERS BE LIABLE TO ANY USER OR ANY THIRD PARTY FOR ANY DAMAGES WHATSOEVER (INCLUDING, WITHOUT LIMITATION, DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY OR LOST PROFITS) RESULTING FROM VIOLATIONS OF PRIVACY ARISING FROM YOUR PETITION, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT THE COMPANY IS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. YOU WILL BE SOLELY RESPONSIBLE FOR ANY VIOLATIONS OF PRIVACY AND MAY BE HELD IN BREACH OF sosign.in TERMS OF USE.
                </p>
              </div>
            </div>
          </section>

          {/* Important Note Section */}
          <section>
            <div className="bg-gradient-to-r from-[#002050]/5 to-[#1a3a6e]/5 rounded-2xl p-6 border border-[#002050]/10">
              <h3 className="text-lg font-bold text-[#002050] mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-[#F43676]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                PLEASE NOTE
              </h3>
              <p className="text-[#302d55] leading-relaxed mb-4">
                In line with its Privacy Policy, the company may at its sole discretion share personally identifiable information (including but not limited to name, email, and IP information) if it believes such sharing to be legally necessary. Such sharing may occur in direct response to a request from a legal authority or without a direct request if we believe such sharing to be legally warranted. In the event we respond to a specific request, we may at our sole discretion waive the requirement of service of summons and respond to a request received in a verbal, emailed or other fashion.
              </p>
              <p className="text-sm text-[#302d55] uppercase font-semibold bg-white/60 p-3 rounded-lg">
                IN NO EVENT SHALL THE COMPANY, ITS PARTNERS, OR ITS SUPPLIERS BE LIABLE TO ANY USER OR ANY THIRD PARTY FOR ANY DAMAGES WHATSOEVER (INCLUDING, WITHOUT LIMITATION, DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY OR LOST PROFITS) RESULTING FROM VIOLATIONS OF PRIVACY ARISING FROM YOUR PETITION, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT THE COMPANY IS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
              </p>
            </div>
          </section>

          {/* Termination Section */}
          <section>
            <h2 className="text-2xl font-bold text-[#002050] mb-4 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-[#F43676] rounded-full"></span>
              TERMINATION AND ACCESS RESTRICTION
            </h2>
            <div className="space-y-4 text-[#302d55] leading-relaxed">
              <p>
                The Company reserves the right, at its sole discretion, to terminate your access to any or all Angle Three Associates or sosign Sites/Services and the related services or any portion thereof at any time, without notice.
              </p>
              <p>
                The Company may also terminate or suspend your access to sosign Site/Service(s) for inactivity, which is defined as failing to log into a particular service for an extended period of time, as determined by the Company. Upon termination of the sosign Site/Service, your right to use the sosign.in Site/Service immediately ceases.
              </p>
            </div>
          </section>

          {/* Jurisdiction Section */}
          <section>
            <h2 className="text-2xl font-bold text-[#002050] mb-4 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-[#F43676] rounded-full"></span>
              JURISDICTION
            </h2>
            <p className="text-[#302d55] leading-relaxed">
              The Company makes no claims that the Materials are appropriate for any particular purpose or audience. Recognizing the global nature of the Internet, you agree to comply with all local rules regarding online conduct and acceptable Materials. Specifically, you agree to comply with all applicable laws regarding the transmission of technical data exported from Indian States or the country in which you reside. You are responsible for compliance with the laws of your jurisdiction.
            </p>
          </section>

          {/* Links Section */}
          <section>
            <h2 className="text-2xl font-bold text-[#002050] mb-4 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-[#F43676] rounded-full"></span>
              LINKS TO THIRD PARTY SITES
            </h2>
            <div className="space-y-4 text-[#302d55] leading-relaxed">
              <p>
                The website may contain links to third party Web sites (&quot;Linked Sites&quot;). The Linked Sites are not under the control of the Company and the Company is not responsible for the contents of any Linked Site, including without limitation any link contained in a Linked Site, or any changes or updates to a Linked Site. The Company is providing these links to you only as a convenience, and the inclusion of any link does not imply endorsement by the Company of the site or any association with its operators. You are responsible for viewing and abiding by the privacy statements and terms of use posted at the Linked Sites.
              </p>
              <p>
                Any dealings with third parties (including advertisers) included within the sosign.in website or participation in promotions, including the delivery of and the payment for goods and services, and any other terms, conditions, warranties or representations associated with such dealings or promotions, are solely between you and the advertiser or other third party. The Company shall not be responsible or liable for any part of any such dealings or promotions.
              </p>
            </div>
          </section>

          {/* Petition Hosts Section */}
          <section>
            <h2 className="text-2xl font-bold text-[#002050] mb-4 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-[#F43676] rounded-full"></span>
              PETITION HOSTS
            </h2>
            <div className="space-y-4 text-[#302d55] leading-relaxed">
              <p>
                We make every effort to ensure that individuals or groups hosting petitions at sosign.in respect these Terms of Use and our Privacy Policy. However, we cannot assume responsibility for any violations of these Terms of Use or our Privacy Policy by users. In the event of a concern that a petition host may have committed a violation, we encourage you to contact us directly.
              </p>
              <div className="bg-gradient-to-r from-red-50 to-pink-50 border-l-4 border-[#F43676] p-4 rounded-r-xl">
                <p className="text-sm text-[#302d55] uppercase font-semibold">
                  IN NO EVENT SHALL THE COMPANY, ITS PARTNERS, OR ITS SUPPLIERS BE LIABLE TO ANY USER OR ANY THIRD PARTY FOR ANY DAMAGES WHATSOEVER (INCLUDING, WITHOUT LIMITATION, DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, EXEMPLARY OR LOST PROFITS) RESULTING FROM VIOLATIONS OF PRIVACY OR TERMS OF USE ARISING, WHETHER BASED ON WARRANTY, CONTRACT, TORT, OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT THE COMPANY IS ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                </p>
              </div>
            </div>
          </section>

          {/* Edits Section */}
          <section>
            <h2 className="text-2xl font-bold text-[#002050] mb-4 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-[#F43676] rounded-full"></span>
              EDITS AND MISREPRESENTATIONS
            </h2>
            <p className="text-[#302d55] leading-relaxed">
              The Company offers its users tools to edit the text of petitions. These tools are intended to be used only for light edits and minor changes or additions/deletions. If in the opinion of the Company a user substantially edits a petition so as to change or misrepresent its original meaning, The Company reserves the right to remove a petition or suspend an account. This right may be exercised at the sole discretion of The Company.
            </p>
          </section>

          {/* Payments Section */}
          <section>
            <h2 className="text-2xl font-bold text-[#002050] mb-4 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-[#F43676] rounded-full"></span>
              PAYMENTS, CONTRIBUTIONS AND DONATIONS
            </h2>
            <div className="space-y-4 text-[#302d55] leading-relaxed">
              <p>
                At several points on the website (notably but not limited to the home page and the page users see after signing a petition) the company may ask its users to consider making a payment, contribution or donation to the Company (collectively, &quot;Payments&quot;). These Payments are entirely optional and are never required to join sosign.in as a member or to sign a petition. They are what allow the company to offer a service to thousands of users around the world. It is always clearly stated that the Payment is directed toward the Company and not to the petition hosts or their associated causes.
              </p>
              <div className="bg-gradient-to-r from-[#002050]/5 to-[#1a3a6e]/5 border border-[#002050]/20 p-4 rounded-xl">
                <p className="text-sm text-[#302d55] font-semibold uppercase">
                  IN AGREEING TO THESE TERMS OF SERVICE, YOU EXPRESSLY AGREE THAT THE COMPANY SHALL HAVE THE RIGHT TO REQUEST SUCH PAYMENTS AND THAT THE PROCEEDS OF SUCH PAYMENTS SHALL BE EXCLUSIVELY MAINTAINED BY THE COMPANY AND NOT BY ANY USER OF SOSIGN.IN OR OTHER INDIVIDUAL OR ENTITY.
                </p>
              </div>
            </div>
          </section>

          {/* Violations Section */}
          <section>
            <h2 className="text-2xl font-bold text-[#002050] mb-4 flex items-center gap-3">
              <span className="w-1.5 h-8 bg-[#F43676] rounded-full"></span>
              VIOLATIONS
            </h2>
            <div className="space-y-4 text-[#302d55] leading-relaxed">
              <p>
                Please report any violations of these Terms through our Contact page.
              </p>
              <p>
                If any provision of this Agreement is found to be invalid by any court having competent jurisdiction, the invalidity of such provision shall not affect the validity of the remaining provisions of this Agreement, which shall remain in full force and effect.
              </p>
            </div>
          </section>

          {/* Footer */}
          <div className="pt-8 mt-8 border-t border-gray-200">
            <p className="text-center text-lg font-bold text-[#F43676]">
              Thank you for trusting sosign.in with your voice for change!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
