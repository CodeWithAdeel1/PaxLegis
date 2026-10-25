export const SITE = {
  name: 'PaxLegis Advocates & Legal Consultants',
  short: 'PaxLegis',
  slogan: 'Peace through Law',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP || '923000000000',
  email: process.env.NEXT_PUBLIC_EMAIL || 'info@example.com',
  phone: process.env.NEXT_PUBLIC_PHONE || '+92 300 0000000',
  officeAddress: 'TODO: Add the verified office address',
  address: {
    streetAddress: 'TODO: Add verified street address',
    addressLocality: 'TODO: Add city',
    addressRegion: 'TODO: Add province or region',
    postalCode: 'TODO: Add postal code',
    addressCountry: 'PK',
  },
  officeHours: 'TODO: Add confirmed office hours',
  experienceYears: 'TODO: Add verified years of experience',
  barCouncilDetails: 'TODO: Add verified bar council and enrolment details',
  lawyerNames: '',
  lawyerPhotos: [],
  barCouncilNumbers: '',
  yearsExperience: '',
  officeAddressDetails: '',
  confirmedOfficeHours: '',
  logoUrl: 'TODO: Replace with the official firm logo',
  socialLinks: [],
  areaServed: ['Pakistan', 'United Kingdom', 'United Arab Emirates', 'United States', 'Canada'],
};

export const waLink = (text) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;
export const mailLink = (subject) =>
  `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}`;
export const cleanPhone = (phone) => String(phone || '').replace(/\D/g, '');
export const callLink = () => `tel:${cleanPhone(SITE.phone)}`;

export const SERVICES = [
  {
    slug: 'family-litigation', nav: 'Family Law', title: 'Family Lawyers in Pakistan',
    h1: 'Family Litigation', area: 'Family Law',
    desc: 'Guidance on khula, divorce, child custody, maintenance and guardianship matters in Pakistan. Understand the process, documents and possible next steps.',
    icon: 'family',
    keywords: ['family lawyer Pakistan', 'khula lawyer', 'divorce lawyer', 'child custody Pakistan', 'guardian court'],
    intro: 'Family disputes can affect your home, finances and relationship with your children. Get clear guidance on the procedure, documents and options that may apply to your circumstances before deciding what to do.',
    items: [
      ['Khula', 'Filing, evidence and decree enforcement for women seeking dissolution of marriage.'],
      ['Divorce', 'Notice procedure, reconciliation proceedings and documentation under Pakistani law.'],
      ['Child Custody', 'Custody, visitation and welfare-of-minor arguments before the Guardian Court.'],
      ['Maintenance', 'Claims and defence for wife and child maintenance, dower and dowry articles.'],
      ['Guardian Cases', 'Guardianship petitions under the Guardians and Wards Act.'],
    ],
    faq: [
      ['How long does a Khula case take?', 'Timelines vary by court and cooperation of the parties. We give you a realistic estimate after reviewing your documents.'],
      ['Can I discuss a family case from abroad?', 'You can request an initial consultation remotely. Whether a Power of Attorney or personal appearance is needed depends on the matter and court requirements.'],
      ['What should I bring to an initial consultation?', 'Bring relevant court papers, notices and family records, and note important dates. Do not send original documents unless requested through an agreed secure process.'],
    ],
    steps: [
      { title: 'Share the basics', description: 'Explain the family issue, any deadlines or hearings, and what outcome you are seeking.' },
      { title: 'Review the records', description: 'A lawyer can review relevant notices, court papers and family records, then explain possible routes.' },
      { title: 'Agree on next steps', description: 'If you choose to proceed, confirm the scope, documents, fees and communication plan before work begins.' },
    ],
    prepare: ['Identity details for the parties involved.', 'Marriage, birth or guardianship records relevant to the matter.', 'Any notices, prior agreements, court orders or case numbers.', 'A short timeline of important events and upcoming dates.'],
    sections: [
      { heading: 'Understanding family court matters', paragraphs: [
        'Family disputes can involve marriage, separation, financial support and arrangements for children. In Pakistan, the correct process depends on the issue, the documents available and the applicable personal and procedural laws. A consultation can help identify which questions belong before a family court, which records may be important, and whether there are urgent dates or orders to consider. Each person’s circumstances are different, so general website information cannot determine the result of an individual case.',
        'Matters involving children require particular care. Courts consider the child’s welfare and the relevant circumstances when deciding custody, visitation or guardianship questions. Useful information may include the child’s routine, schooling, care arrangements and any existing orders. Keep communications respectful and preserve relevant records. Do not make decisions based only on assumptions about what a court will do; ask a lawyer to review the facts and explain the options and risks.',
      ] },
      { heading: 'Common questions and preparation', paragraphs: [
        'A first discussion often covers what has happened, what outcome you are seeking and whether any application or reply has a deadline. For a khula, divorce or related matter, bring available marriage records, notices, prior agreements and court papers. For maintenance or dower issues, organize relevant income, expense and payment information. For a custody matter, note the current care arrangements and important dates. Copies are usually enough for an initial review; keep original documents secure.',
        'If you are unsure which documents matter, start with a short timeline and a list of the people involved. Include previous case numbers, hearing dates and any orders already made. Avoid sending sensitive records through public channels. Ask the office which secure method to use and confirm who will have access to the documents. A clear record helps a lawyer identify missing information and explain what further material, if any, may be needed.',
      ] },
      { heading: 'Steps, representation and overseas clients', paragraphs: [
        'After the initial review, the next steps may include clarifying the legal issue, preparing or responding to an application, attending hearings, considering settlement where appropriate, or complying with an existing order. The sequence depends on the case and the court. Before proceeding, discuss the work involved, likely costs, communication arrangements and what decisions require your instructions. Court dates and outcomes are controlled by the court and cannot be promised in advance.',
        'Clients living in the UK, UAE, USA, Canada or elsewhere can begin with a remote consultation and share copies of relevant records. Whether a Power of Attorney, attestation or personal appearance is needed depends on the specific matter and current requirements of the court or authority. Do not sign or rely on a document until its purpose and formalities have been checked. Agree in advance how identity checks, instructions, document delivery and case updates will be handled.',
      ] },
    ],
  },
  {
    slug: 'criminal-defence', nav: 'Criminal Defence', title: 'Criminal Defence in Pakistan',
    h1: 'Criminal Defence', area: 'Criminal Law',
    desc: 'Guidance on criminal allegations, FIRs, bail applications, cybercrime inquiries and court proceedings in Pakistan. Learn what records to prepare.',
    icon: 'criminal',
    keywords: ['criminal lawyer Pakistan', 'bail lawyer', 'FIR cancellation', 'cybercrime lawyer', 'fraud case defence'],
    intro: 'A criminal allegation can have urgent consequences. Early advice can help you understand the allegation, preserve relevant records and identify lawful procedural options.',
    items: [
      ['Bail applications', 'Assess eligibility and prepare for pre-arrest, post-arrest or interim bail proceedings where available.'],
      ['FIR and investigation', 'Review the FIR and related records to understand the allegations and available procedural remedies.'],
      ['Fraud and financial allegations', 'Organize agreements, payment records and communications relevant to allegations of fraud or breach of trust.'],
      ['Cybercrime matters', 'Get guidance on responding to cybercrime inquiries and preserving relevant digital evidence.'],
      ['Trial and appeal matters', 'Understand hearing stages, evidence and potential appeal options with advice tailored to the case.'],
    ],
    faq: [
      ['What should I do if an FIR is registered against me?', 'Contact a qualified lawyer promptly and avoid discussing case details publicly. Do not ignore police or court notices; get advice on how to respond lawfully.'],
      ['What should I do with digital evidence?', 'Preserve original devices or records where possible, avoid editing or deleting material, and ask a lawyer how it should be handled.'],
      ['Can you guarantee bail or acquittal?', 'No. Decisions depend on the facts, evidence, applicable law and the court. A lawyer can explain the options after reviewing the case.'],
    ],
    steps: [
      { title: 'Check for urgent dates', description: 'Share any arrest concerns, court dates, notices or investigation deadlines promptly.' },
      { title: 'Review the case record', description: 'Provide the FIR or notice and related documents so the allegations and procedural status can be assessed.' },
      { title: 'Discuss lawful options', description: 'A lawyer can explain available steps and their risks; no bail decision or case outcome can be promised.' },
    ],
    prepare: ['FIR number, police station and any court case number.', 'Copies of notices, warrants, bail orders or other court papers.', 'A dated summary of events and relevant witness details.', 'Relevant messages, contracts or digital records; preserve originals and avoid editing them.'],
    sections: [
      { heading: 'Understanding a criminal case', paragraphs: [
        'A criminal matter may begin with a complaint, inquiry, arrest, First Information Report (FIR) or court summons. The legal options depend on the allegation, the available evidence, the procedural stage and any deadlines or orders. Early advice can help you understand what a notice requires, how to preserve relevant material and which authority is handling the matter. Do not ignore a court document or assume that an informal conversation replaces a formal response.',
        'Bail is a legal process for seeking release or protection from arrest in circumstances where the law allows it. The court considers the particular facts and legal standards; no lawyer can promise that bail will be granted. If an FIR or inquiry concerns you, keep a copy of the papers, record dates and seek prompt case-specific guidance. Avoid discussing sensitive facts publicly or contacting witnesses in a way that could be misunderstood.',
      ] },
      { heading: 'Evidence and first steps', paragraphs: [
        'A useful first review normally needs the FIR or complaint, any summons or notice, relevant court orders and a short account of events in date order. Include names of the police station or investigating authority and the next scheduled date. If a device, message, transaction or document may be relevant, preserve it in its original form. Do not delete, alter or circulate digital material; ask a lawyer how to handle it lawfully and safely.',
        'An allegation involving money or a contract may require agreements, receipts, account records and communications. A cybercrime inquiry may involve account identifiers, notices and original electronic records. Only share information through an agreed private channel. The lawyer can explain which records are relevant, whether further information is needed and what the next procedural step may be. Do not provide false information or attempt to interfere with an investigation.',
      ] },
      { heading: 'Court process and overseas clients', paragraphs: [
        'Depending on the case, work may involve reviewing the allegations, preparing a response or bail application, attending court, monitoring procedural dates and discussing trial or appeal steps. The available remedies are not identical for every offence or stage. You should understand the proposed work, fees, important risks and your responsibilities before engagement. Keep copies of filings and orders, and tell your lawyer promptly if you receive a new notice or learn of a changed hearing date.',
        'An overseas client can often arrange an initial remote discussion and provide copies of case papers for review. Whether a representative can act under a Power of Attorney, whether remote participation is possible, or whether you must attend personally depends on the matter and the relevant court. Confirm identity, authorization and document formalities before relying on them. For urgent situations, use the contact options on this page and state any arrest concern or court deadline clearly.',
      ] },
    ],
  },
  {
    slug: 'civil-litigation', nav: 'Civil Law', title: 'Civil & Property Lawyers in Pakistan',
    h1: 'Civil Litigation', area: 'Civil Law',
    desc: 'Legal guidance for property disputes, injunctions, contracts and recovery claims in Pakistan. Learn which records can help assess your civil matter.',
    icon: 'civil',
    keywords: ['civil lawyer Pakistan', 'property dispute lawyer', 'stay order', 'recovery suit', 'contract enforcement'],
    intro: 'Property, contract and recovery disputes often turn on documents, dates and the relief sought. Organizing the record early helps a lawyer assess practical legal options.',
    items: [
      ['Property and possession disputes', 'Review title, possession, partition, inheritance and alleged encroachment issues against the available records.'],
      ['Injunctions', 'Assess whether urgent interim relief may be available to prevent a specific threatened action.'],
      ['Contract disputes', 'Review agreements, performance records and communications to understand potential remedies for a breach.'],
      ['Recovery claims', 'Organize loan, cheque, invoice and payment records for a claim or response to a recovery action.'],
    ],
    faq: [
      ['Can the court issue an urgent injunction?', 'A lawyer can assess whether interim relief may be available. The decision and timing depend on the facts, evidence and court.'],
      ['What documents help with a property dispute?', 'Title and transfer records, payment evidence, possession details, notices and any prior court orders are often useful.'],
      ['Can I discuss a property case from abroad?', 'Remote consultation may be possible. Representation, attestation and appearance requirements depend on the case and relevant authority.'],
    ],
    steps: [
      { title: 'Identify the issue and deadlines', description: 'Describe the dispute, the other parties and any notices, hearings or threatened actions.' },
      { title: 'Collect the documents', description: 'Share copies of agreements, title records, payment evidence and relevant correspondence.' },
      { title: 'Review possible remedies', description: 'A lawyer can explain potential court or non-court routes, likely requirements and uncertainties.' },
    ],
    prepare: ['Agreements, title deeds, registry or mutation records relevant to the dispute.', 'Payment receipts, bank records, invoices or cheque details.', 'Notices, prior court filings, orders or case numbers.', 'A timeline of events, including dates of possession changes or missed payments.'],
    sections: [
      { heading: 'Property and civil disputes', paragraphs: [
        'Civil cases cover disputes between people, businesses or other entities about rights, obligations, property or money. In a property matter, the relevant records may include title documents, transfer history, possession information, inheritance records and prior orders. A document that looks important may not tell the whole story; dates, registration details and the actions of each party can also matter. A lawyer can review what you have and identify questions that need verification.',
        'An injunction is a court order that may restrain or require particular conduct while a dispute is considered. It is not automatic, and the court decides whether the legal requirements are met. If property may be transferred, altered or occupied, keep dated evidence and seek advice promptly. Avoid taking self-help action that could escalate the dispute or affect your legal position. Any immediate steps should be based on the actual documents and circumstances.',
      ] },
      { heading: 'Documents and assessment', paragraphs: [
        'For a contract or recovery dispute, collect the signed agreement, amendments, invoices, receipts, bank entries and messages about performance or payment. For land or housing matters, gather available title deeds, registry or mutation records, allotment papers and notices. If there has already been a case, include the case number, pleadings and every order. Keep originals safe and provide readable copies for an initial discussion.',
        'A simple event timeline helps connect the documents: when an agreement was made, when payment was due, when a notice was sent and what response followed. Include the names and roles of other parties, but avoid assumptions about their motives. If you do not have a document, note who may hold it and how it could be obtained. The review can then focus on missing evidence, possible deadlines and the kind of remedy you are seeking.',
      ] },
      { heading: 'Possible steps and remote assistance', paragraphs: [
        'Depending on the facts, a civil matter may involve a written notice, negotiation, filing or defending a claim, seeking interim relief, attending hearings, presenting evidence or considering an appeal. Some disputes have special procedures or limitation periods. The appropriate route and timetable cannot be determined without reviewing the case. Before work begins, ask what tasks are included, how updates will be shared and what fees or court expenses may arise.',
        'Overseas Pakistanis can start with a remote consultation and share copies of property or court records. A Power of Attorney may be useful for some tasks, but the form, attestation and acceptance requirements vary by purpose and authority. It does not mean that every matter can be handled without travel or a personal appearance. Have the document reviewed before signing, and agree on a secure way to exchange instructions and receive copies of filings and orders.',
      ] },
    ],
  },
  {
    slug: 'overseas-clients', nav: 'Overseas Clients', title: 'Legal Help for Overseas Pakistanis',
    h1: 'Overseas Clients Consultation', area: 'Overseas Clients',
    desc: 'Remote legal consultations for overseas Pakistanis with property, family and court matters in Pakistan, including guidance on documents and representation.',
    icon: 'overseas',
    keywords: ['lawyer for overseas Pakistanis', 'power of attorney Pakistan', 'online court appearance', 'expat legal services Pakistan'],
    intro: 'If you live abroad and have a legal matter in Pakistan, start by clarifying the issue, the documents available and whether an authorized representative or personal appearance may be required.',
    items: [
      ['Power of Attorney', 'Guidance on preparing and attesting a Power of Attorney, subject to the requirements of the relevant authorities.'],
      ['Remote consultations', 'Discuss your matter online and agree how documents, updates and decisions will be handled.'],
      ['Case updates', 'Establish a clear process for sharing hearing dates, orders and follow-up actions.'],
      ['Property and family cases', 'Get an initial review of property, inheritance or family issues connected to Pakistan.'],
    ],
    faq: [
      ['Do I need to travel to Pakistan?', 'Not necessarily. Whether travel or a personal appearance is required depends on the matter, court and relevant authorities.'],
      ['Will a Power of Attorney be accepted?', 'Requirements vary by purpose and authority. Have the document reviewed before signing or relying on it.'],
      ['How can I follow case progress?', 'Agree on a written update process covering hearing dates, orders and actions required from you.'],
    ],
    steps: [
      { title: 'Arrange a remote consultation', description: 'Share your country of residence, the Pakistan matter and any immediate deadline.' },
      { title: 'Confirm authority and documents', description: 'Check whether a Power of Attorney, attestation or personal appearance is required for your specific matter.' },
      { title: 'Set an update plan', description: 'If you engage the firm, agree how instructions, documents, hearing updates and costs will be communicated.' },
    ],
    prepare: ['Your passport or identity details and current country of residence.', 'Any case number, court order, notice or correspondence from Pakistan.', 'A clear summary of the issue and the people involved.', 'Existing Power of Attorney documents, if any; do not assume they are valid for every purpose.'],
    sections: [
      { heading: 'Handling a Pakistan matter from abroad', paragraphs: [
        'Living outside Pakistan can make it harder to attend meetings, obtain local records and follow court dates. A remote consultation is a practical first step to explain the issue, identify the relevant people and review available documents. Common matters include property, inheritance, family proceedings and existing court cases. The exact process depends on the facts, location and authority involved, so an initial review should clarify what can be done remotely and what may require local action.',
        'A clear communication plan is particularly important when the client and representative are in different time zones. Agree how instructions will be confirmed, how urgent dates will be raised and how copies of filings and orders will be shared. Keep an organized copy of all documents and messages. Confirm fees, responsibilities and the scope of any engagement in writing so there is a shared understanding of what the office will handle.',
      ] },
      { heading: 'Power of Attorney and identity documents', paragraphs: [
        'A Power of Attorney can authorize another person to carry out specified tasks, but its requirements depend on the purpose and the authority that must accept it. The wording, signing process, attestation, identity evidence and any stamping or registration requirements may differ. Do not assume that one document works for every court, bank or government office. Ask for the proposed purpose to be checked before signing or sending an original.',
        'For an initial review, prepare identity details, your country of residence, the other parties’ names and any relevant case or property numbers. Share existing authorization documents and related correspondence. Use secure channels for passport copies and other personal records. If a local appearance, biometric verification or original document is required, confirm the requirement and practical arrangements early rather than relying on an assumption that travel will never be necessary.',
      ] },
      { heading: 'Property, family and court case coordination', paragraphs: [
        'For a property issue, gather title and transfer records, payment proof, possession details and notices. For a family matter, collect relevant marriage, birth or court records and note any arrangements involving children. For an active case, provide the case number, next hearing date, recent order and details of counsel already involved. A chronological summary can help identify what is urgent and which records are still missing.',
        'After reviewing the information, a lawyer can explain possible steps, the role of any authorized representative and the limits of remote participation. If you decide to proceed, set expectations for written updates and decisions that need your approval. Court scheduling and outcomes remain outside the firm’s control. Ask for updates after significant events and retain copies of all orders, receipts and instructions for your own records.',
      ] },
    ],
  },
  {
    slug: 'immigration-visa', nav: 'Immigration & Visa', title: 'Visa & Immigration Guidance',
    h1: 'Immigration & Visa Consultation', area: 'Immigration & Visa',
    desc: 'Visa document review, refusal-letter assessment and attestation guidance. Requirements depend on the destination country and application category.',
    icon: 'immigration',
    keywords: ['immigration lawyer Pakistan', 'visa consultation', 'visa appeal', 'document legalization', 'attestation'],
    intro: 'Visa and immigration rules vary by destination and application category. A document review can help identify missing information, consistency issues and questions to confirm before submission.',
    items: [
      ['Application preparation', 'Review application requirements and supporting documents for the relevant visa category.'],
      ['Refusal review', 'Read refusal reasons and discuss whether review, appeal or a new application may be available.'],
      ['Attestation and legalization', 'Check which documents require certification and which authority handles the process for your destination.'],
      ['Work, study and family routes', 'Clarify the questions and evidence relevant to your intended route before taking action.'],
    ],
    faq: [
      ['Can anyone guarantee a visa?', 'No. Decisions are made by the relevant immigration authority, and outcomes cannot be guaranteed.'],
      ['Which documents need attestation?', 'It depends on the destination, application and issuing authority. Verify current requirements before submitting documents.'],
      ['Can you challenge a refusal?', 'Possible review or appeal routes depend on the country, refusal reason and deadline. Bring the refusal letter for assessment.'],
    ],
    steps: [
      { title: 'Identify the destination and route', description: 'Tell us the destination country, application type, current status and any relevant deadlines.' },
      { title: 'Review requirements and records', description: 'Share the checklist, application or refusal letter and supporting documents for an initial review.' },
      { title: 'Plan the next action', description: 'Confirm the applicable requirements and whether further advice from a destination-country specialist is needed.' },
    ],
    prepare: ['Destination country and visa or immigration category.', 'Application checklist, draft application or refusal letter.', 'Passport details and relevant travel or immigration history.', 'Deadlines and copies of documents already submitted.'],
    sections: [
      { heading: 'Visa applications and document review', paragraphs: [
        'Visa and immigration rules are set by each destination country and can change. The right application category depends on your purpose, personal circumstances and eligibility under that country’s rules. A document review can help identify missing evidence, inconsistent dates or questions that need clarification before submission. It cannot guarantee approval, and the final decision belongs to the relevant government authority.',
        'For work, study, visitor or family routes, start with the official checklist and keep a copy of the exact version used. Supporting information may include identity and travel documents, financial records, employment or education evidence, family records and prior immigration decisions. The requirements are not the same for every applicant. Do not submit inaccurate information or omit a fact because it seems unimportant; ask for advice if a question is unclear.',
      ] },
      { heading: 'Refusals, reviews and deadlines', paragraphs: [
        'If an application has been refused, preserve the complete refusal letter and note the date it was received. The letter may explain the reasons, whether a review or appeal is available and the deadline. Possible options vary widely by destination and case type; in some cases a corrected new application may be appropriate, while in others a formal challenge may be time-sensitive. A review should begin with the actual reasons rather than a general assumption.',
        'Gather the submitted application, document checklist, evidence that was provided and any correspondence with the authority. Make a note of what has changed since the application, if anything. Keep copies of passports and records secure. If you need advice on a country where specialist local representation is required, confirm that qualification and scope before proceeding. This service page is general information and does not replace destination-country legal advice.',
      ] },
      { heading: 'Attestation and overseas applicants', paragraphs: [
        'Document attestation or legalization verifies a signature, seal or document for a particular use; it does not necessarily confirm every fact written in the document. The required process depends on where the document was issued, where it will be used and which authority will receive it. Confirm the current checklist with the destination authority before paying fees or sending originals. Keep receipts and tracking details when documents are couriered.',
        'Applicants in Pakistan or overseas can begin by sharing the destination country, application route, any deadline and the relevant checklist or refusal letter. Copies are usually suitable for an initial discussion. If a document must be notarized, translated or attested in another country, local requirements may apply. Ask who is responsible for each step and how personal documents will be returned. No visa, appeal or processing-time outcome can be guaranteed.',
      ] },
    ],
  },
  {
    slug: 'taxation-financial-law', nav: 'Tax & Finance', title: 'Tax & FBR Guidance in Pakistan',
    h1: 'Taxation & Financial Law', area: 'Taxation & Financial Law',
    desc: 'Guidance on Pakistan income tax records, FBR notices, assessments and business compliance. Prepare the relevant tax-year documents for review.',
    icon: 'tax',
    keywords: ['tax lawyer Pakistan', 'FBR notice', 'income tax filing', 'corporate tax', 'tax appeal'],
    intro: 'Tax obligations depend on your facts, residence, income and current rules. Organize your records and any authority correspondence so the relevant questions can be assessed.',
    items: [
      ['Income tax records and filing', 'Review income details, expense records and relevant supporting documents for a filing or correction question.'],
      ['FBR notices and assessments', 'Understand the issue raised, response deadline and documents needed before replying to a notice.'],
      ['Business tax questions', 'Review general tax and withholding questions in light of the business structure and available records.'],
      ['Regulatory compliance', 'Identify relevant filing or compliance questions, including those involving corporate records or regulatory correspondence.'],
    ],
    faq: [
      ['I received an FBR notice. What should I do?', 'Check the response deadline and preserve the full notice with its attachments. Get advice before submitting a response.'],
      ['Do overseas Pakistanis need to file a return?', 'It depends on residence status, income sources and applicable rules for the tax year. A review of your circumstances is needed.'],
      ['Can a tax result be guaranteed?', 'No. Tax treatment depends on the law and facts, and decisions by authorities cannot be guaranteed.'],
    ],
    steps: [
      { title: 'Note the deadline', description: 'If you received a notice or order, identify its date and response deadline before gathering records.' },
      { title: 'Organize supporting documents', description: 'Collect relevant returns, statements, receipts, notices and prior correspondence.' },
      { title: 'Review the issue', description: 'A qualified adviser can assess the facts and applicable rules before you submit a response or filing.' },
    ],
    prepare: ['Tax year and relevant filing or registration details.', 'The complete notice, assessment or order, including attachments.', 'Copies of relevant returns, statements and payment records.', 'A brief summary of the issue and any response already sent.'],
    sections: [
      { heading: 'Tax questions depend on your circumstances', paragraphs: [
        'Tax treatment can depend on the tax year, residence status, type and source of income, business structure and records available. A general answer may not fit a particular person or business. Before filing a return or responding to an authority, identify the exact period and question involved. Keep copies of submissions and payment acknowledgements, and make sure figures can be traced to supporting documents.',
        'A consultation may help organize questions about income, expenses, wealth statements, withholding or business records. The available advice depends on the firm’s actual service scope and the relevant rules in force. Do not rely on an old return or a prior-year threshold without confirming it applies to the current period. If an issue needs specialist accounting or tax expertise, clarify who will provide that work and what review is included.',
      ] },
      { heading: 'FBR notices and response deadlines', paragraphs: [
        'If you receive an FBR notice, assessment or order, save the complete document with all attachments and record the date of receipt. Read the response deadline carefully and do not ignore it. A lawyer or tax adviser will need to understand the statutory provision cited, the issue raised and any earlier correspondence. A rushed or incomplete response may create further questions, so get the document reviewed before submitting an explanation.',
        'Prepare the relevant return, wealth statement, invoices, bank or payment records and evidence relating to the specific issue. Include prior replies and any proof of submission. If the figures or records are disputed, explain what you believe is incorrect and how you reached that view. Never alter or backdate documents. The proper response and any appeal route depend on the notice, the dates and the facts; results and deadlines cannot be promised without review.',
      ] },
      { heading: 'Business and overseas Pakistanis', paragraphs: [
        'For a business, useful records may include registration details, accounts, invoices, contracts, payroll or withholding records and prior filings. For an individual, organize income information, assets, deductions and relevant receipts by tax year. Keep source documents secure and share only what is necessary through an agreed channel. A concise timeline of any audit or correspondence helps the adviser understand what has already happened.',
        'Overseas Pakistanis may have questions involving residence, Pakistan-source income or reporting duties. The answer depends on individual facts and the rules for the relevant tax year; living abroad alone does not settle the question. Prepare travel or residence information and income records for review. If you receive an authority notice while outside Pakistan, note the deadline and arrange secure document sharing promptly. Obtain written advice tailored to your situation before relying on a filing position.',
      ] },
    ],
  },
  {
    slug: 'ecl-pnil-removal', nav: 'ECL & PNIL Removal', title: 'ECL & PNIL Travel Restriction Advice',
    h1: 'ECL & PNIL Legal Removal', area: 'ECL / PNIL Removal',
    desc: 'Legal guidance on ECL, PNIL, stop-list or related travel restrictions in Pakistan. Options depend on the responsible authority and case records.',
    icon: 'travel',
    keywords: ['ECL name removal', 'PNIL removal', 'exit control list lawyer', 'stop list removal', 'FIA travel ban'],
    intro: 'If travel has been restricted or you are concerned about a possible listing, first establish which authority or order is involved. The appropriate remedy depends on the record and current rules.',
    items: [
      ['ECL matters', 'Review available records and discuss administrative or court options relating to an Exit Control List matter.'],
      ['PNIL matters', 'Assess available information and possible steps for a Provisional National Identification List concern.'],
      ['Airport stop or offloading', 'Record the date, location, stated reason and any documents provided during an airport incident.'],
      ['Related inquiries and restrictions', 'Review relevant notices or inquiry records before deciding how to respond.'],
    ],
    faq: [
      ['How can I confirm the reason for a travel restriction?', 'The process depends on the authority and information available. Preserve any notice or reference details and seek case-specific guidance.'],
      ['Is a court petition always required?', 'Not necessarily. Possible steps depend on the order, responsible authority and facts of the case.'],
      ['Can removal or travel clearance be guaranteed?', 'No. The responsible authority or court decides the matter, and outcomes and timing cannot be guaranteed.'],
    ],
    steps: [
      { title: 'Record what happened', description: 'Write down the date, airport or authority involved, explanation given and any reference number.' },
      { title: 'Review available records', description: 'Share notices, orders or correspondence so the relevant authority and legal basis can be identified.' },
      { title: 'Assess possible remedies', description: 'A lawyer can explain available administrative or court procedures; removal or travel clearance cannot be promised.' },
    ],
    prepare: ['Passport details and any travel itinerary affected.', 'Written notice, order, reference number or documents provided by officials.', 'Date and details of any offloading or travel restriction incident.', 'Information about related cases, inquiries or court proceedings.'],
    sections: [
      { heading: 'Understanding a travel restriction', paragraphs: [
        'A travel restriction can arise from different lists, orders, inquiries or directions issued by different authorities. The name commonly used for a restriction may not identify the actual legal basis or decision-maker. The first step is to establish what happened, which authority was involved and whether a written order or reference exists. Avoid relying on an informal description alone when deciding what legal step to take.',
        'If you were stopped or offloaded, record the date, airport, flight, counter or authority involved and the explanation provided. Preserve any boarding pass, written notice, reference number or communication. Do not assume that every restriction is an ECL matter or that one court petition is always the answer. The available administrative or judicial process depends on the underlying record and the law applicable to that situation.',
      ] },
      { heading: 'Records and urgent travel dates', paragraphs: [
        'A lawyer reviewing a possible ECL, PNIL, stop-list or related issue may need passport details, travel itinerary, notices, inquiry documents and records of any connected criminal, civil or regulatory case. Include copies of prior applications and replies. If you have no written explanation, note the names or descriptions of the officials spoken to and the exact words used as accurately as possible. Keep original travel records safe.',
        'If travel is planned soon, share the date and destination at the beginning of the consultation. An approaching flight does not guarantee an expedited decision or a particular result. Do not buy a ticket or make irreversible plans based on an assumption that a restriction will be removed. Ask the adviser to explain what can be verified, which authority may need to be contacted and what uncertainties remain before taking further steps.',
      ] },
      { heading: 'Possible process and overseas clients', paragraphs: [
        'After identifying the authority and record, possible next steps may include a request for information, an administrative representation, gathering supporting documents or assessing whether a court remedy is appropriate. These options are not interchangeable and may have different deadlines or requirements. The lawyer should explain the basis for the suggested route, the documents needed, likely costs and what actions remain under the authority’s control. No removal or travel clearance can be guaranteed.',
        'An overseas Pakistani can begin with a remote consultation and share copies of notices, passport details and related case papers. Whether an authorized representative can act, whether a Power of Attorney is needed or whether personal attendance is required depends on the authority and procedure. Verify document attestation requirements before signing anything. Keep written copies of all representations and acknowledgements, and agree how the office will report responses, hearing dates and any additional instructions needed.',
      ] },
    ],
  },
];

export const getService = (slug) => SERVICES.find((s) => s.slug === slug);
