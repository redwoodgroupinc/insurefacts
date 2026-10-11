export const COUNTRY_CODES = ['us', 'uk', 'ca', 'au'] as const;
export type CountryCode = (typeof COUNTRY_CODES)[number];

export interface OfficialLink {
  name: string;
  url: string;
  note: string;
}

export interface Country {
  code: CountryCode;
  name: string;
  /** Short label for the header switcher. */
  short: string;
  /** BCP 47 language tag used for the `lang` attribute on this country's pages. */
  lang: 'en-US' | 'en-GB' | 'en-CA' | 'en-AU';
  ogLocale: string;
  flag: string;
  tagline: string;
  /** Plain-text paragraphs shown at the top of the country hub page. */
  intro: string[];
  metaDescription: string;
  officialSources: OfficialLink[];
}

export const countries: Country[] = [
  {
    code: 'us',
    name: 'United States',
    short: 'US',
    lang: 'en-US',
    ogLocale: 'en_US',
    flag: '/flags/us.svg',
    tagline: 'Health, car, home, life and more',
    intro: [
      'In the United States, insurance is regulated mainly by the states. Each state, the District of Columbia and the US territories has its own insurance department, which licenses insurers and agents and handles consumer complaints.',
      'Some health coverage is run or overseen by the federal government, including Medicare and the Health Insurance Marketplace at HealthCare.gov. The guides below explain how each type of insurance works in the US, with links to the official sources we used.',
    ],
    metaDescription:
      'Factual guides to US insurance: health, car, homeowners, renters, life, Medicare, travel and pet insurance, with links to official government sources.',
    officialSources: [
      {
        name: 'NAIC: State insurance departments',
        url: 'https://content.naic.org/state-insurance-departments',
        note: 'Find the insurance regulator for your state.',
      },
      {
        name: 'HealthCare.gov',
        url: 'https://www.healthcare.gov/',
        note: 'The federal Health Insurance Marketplace.',
      },
      {
        name: 'Medicare.gov',
        url: 'https://www.medicare.gov/',
        note: 'Official US government site for Medicare.',
      },
      {
        name: 'USA.gov: Health insurance',
        url: 'https://www.usa.gov/health-insurance',
        note: 'Overview of Medicaid, Medicare, CHIP, the Marketplace and COBRA.',
      },
    ],
  },
  {
    code: 'uk',
    name: 'United Kingdom',
    short: 'UK',
    lang: 'en-GB',
    ogLocale: 'en_GB',
    flag: '/flags/gb.svg',
    tagline: 'Car, home, life, travel and more',
    intro: [
      'In the UK, the Financial Conduct Authority (FCA) regulates how insurers, brokers and other firms sell insurance and treat their customers. Insurers are also supervised for their financial strength by the Prudential Regulation Authority.',
      'If a complaint about an authorised firm isn’t resolved, the Financial Ombudsman Service can look at it free of charge. The guides below explain how each type of insurance works in the UK, with links to the official sources we used.',
    ],
    metaDescription:
      'Factual guides to UK insurance: car, home, life, travel, pet and landlord insurance and income protection, with links to the FCA, MoneyHelper and GOV.UK.',
    officialSources: [
      {
        name: 'FCA Firm Checker',
        url: 'https://www.fca.org.uk/consumers/fca-firm-checker',
        note: 'Check whether a firm is authorised to sell insurance.',
      },
      {
        name: 'MoneyHelper: Insurance',
        url: 'https://www.moneyhelper.org.uk/en/everyday-money/insurance',
        note: 'Free, impartial guides backed by the government.',
      },
      {
        name: 'Financial Ombudsman Service',
        url: 'https://www.financial-ombudsman.org.uk/consumers/complaints-can-help/insurance',
        note: 'Free complaints service for insurance disputes.',
      },
      {
        name: 'GOV.UK: Vehicle insurance',
        url: 'https://www.gov.uk/vehicle-insurance',
        note: 'The legal rules on motor insurance.',
      },
    ],
  },
  {
    code: 'ca',
    name: 'Canada',
    short: 'Canada',
    lang: 'en-CA',
    ogLocale: 'en_CA',
    flag: '/flags/ca.svg',
    tagline: 'Car, home, life, travel and more',
    intro: [
      'In Canada, insurance is regulated mostly by the provinces and territories, so rules and products can differ depending on where you live. Federally incorporated insurers are also supervised by federal regulators.',
      'Car insurance is a good example: in British Columbia, Saskatchewan and Manitoba, mandatory coverage is bought from a government insurer, while most other provinces use private insurers. The guides below explain how each type of insurance works in Canada, with links to the official sources we used.',
    ],
    metaDescription:
      'Factual guides to Canadian insurance: car insurance by province, home and tenant, life, travel and supplementary health insurance, with official sources.',
    officialSources: [
      {
        name: 'Financial Consumer Agency of Canada: Insurance',
        url: 'https://www.canada.ca/en/financial-consumer-agency/services/insurance.html',
        note: 'Government of Canada consumer guides.',
      },
      {
        name: 'Canadian Council of Insurance Regulators',
        url: 'https://www.ccir-ccrra.org/Members',
        note: 'Provincial and territorial insurance regulators.',
      },
      {
        name: 'Travel.gc.ca: Travel health insurance',
        url: 'https://travel.gc.ca/travelling/documents/travel-insurance',
        note: 'Government of Canada advice for travellers.',
      },
      {
        name: 'Insurance Bureau of Canada: Mandatory auto coverage',
        url: 'https://www.ibc.ca/insurance-basics/auto/types-of-auto-coverage/mandatory-auto-insurance-requirements',
        note: 'Minimum car insurance by province (industry association).',
      },
    ],
  },
  {
    code: 'au',
    name: 'Australia',
    short: 'Australia',
    lang: 'en-AU',
    ogLocale: 'en_AU',
    flag: '/flags/au.svg',
    tagline: 'CTP, car, home, health, life and more',
    intro: [
      'In Australia, the Australian Prudential Regulation Authority (APRA) supervises general, life and private health insurers for financial soundness, and the Australian Securities and Investments Commission (ASIC) licenses and regulates insurance brokers and agents. Compulsory third party (CTP) insurance is set up under state and territory laws.',
      'Complaints about most general and life insurance can go to the Australian Financial Complaints Authority (AFCA), which does not handle CTP or private health insurance complaints. The guides below explain how each type of insurance works in Australia, with links to the official sources we used.',
    ],
    metaDescription:
      'Factual guides to Australian insurance: CTP, car, home and contents, private health, life, income protection and landlord insurance, with official sources.',
    officialSources: [
      {
        name: 'Moneysmart (ASIC)',
        url: 'https://moneysmart.gov.au/',
        note: 'Free government guides to insurance and money.',
      },
      {
        name: 'APRA: General, life and private health insurers',
        url: 'https://www.apra.gov.au/questions-about-general-life-and-private-health-insurers',
        note: 'The prudential regulator for insurers.',
      },
      {
        name: 'privatehealth.gov.au',
        url: 'https://privatehealth.gov.au/health_insurance/howitworks/index.htm',
        note: 'Government guide to private health insurance.',
      },
      {
        name: 'AFCA: Insurance complaints',
        url: 'https://www.afca.org.au/make-a-complaint/insurance',
        note: 'Free complaints service for general and life insurance.',
      },
    ],
  },
];

export function getCountry(code: string): Country {
  const country = countries.find((c) => c.code === code);
  if (!country) throw new Error(`Unknown country code "${code}"`);
  return country;
}
