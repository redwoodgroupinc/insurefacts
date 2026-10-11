// Every insurance category on the site is defined here. To add a category:
// 1. Add an entry below (the slug must be lowercase and hyphenated).
// 2. Create the folder src/content/articles/<country>/<slug>/ for its articles.
// The category page is generated automatically, and articles that name a
// category not listed here fail the build.

import type { CountryCode, OfficialLink } from './countries';
import type { IconName } from './icons';

/** Groups the same kind of insurance across countries (used for "Popular topics"). */
export type Topic =
  | 'car'
  | 'health'
  | 'home'
  | 'renters'
  | 'life'
  | 'travel'
  | 'pet'
  | 'income'
  | 'landlord'
  | 'medicare'
  | 'ctp';

export interface Category {
  country: CountryCode;
  slug: string;
  name: string;
  topic: Topic;
  icon: IconName;
  /** One line for cards (keep under ~90 characters). */
  description: string;
  /** Plain-text paragraphs for the top of the category page. */
  intro: string[];
  /** Official pages relevant to this category. */
  links?: OfficialLink[];
}

export const categories: Category[] = [
  // ───────────────────────── United States ─────────────────────────
  {
    country: 'us',
    slug: 'health-insurance',
    name: 'Health insurance',
    topic: 'health',
    icon: 'health',
    description: 'Employer plans, the Marketplace, Medicaid and how cost sharing works.',
    intro: [
      'Health insurance helps pay for medical care such as doctor visits, hospital stays and prescription drugs. In the US, people get coverage in different ways, including through an employer, through the Health Insurance Marketplace, or through government programs such as Medicare, Medicaid and the Children’s Health Insurance Program (CHIP).',
      'Most plans involve a monthly premium plus cost sharing, such as a deductible, copayments and coinsurance.',
    ],
    links: [
      {
        name: 'HealthCare.gov',
        url: 'https://www.healthcare.gov/',
        note: 'The federal Health Insurance Marketplace.',
      },
      {
        name: 'USA.gov: Health insurance',
        url: 'https://www.usa.gov/health-insurance',
        note: 'Medicaid, Medicare, CHIP, the Marketplace and COBRA.',
      },
    ],
  },
  {
    country: 'us',
    slug: 'car-insurance',
    name: 'Car insurance',
    topic: 'car',
    icon: 'car',
    description: 'State minimum requirements, liability, collision and comprehensive coverage.',
    intro: [
      'Car insurance covers financial losses from accidents and other damage involving a vehicle. Almost every state requires drivers to carry at least a minimum amount of liability insurance, and the required types and amounts are set by each state.',
      'Policies can also include optional coverage, such as collision and comprehensive coverage for damage to your own vehicle.',
    ],
    links: [
      {
        name: 'NAIC: State insurance departments',
        url: 'https://content.naic.org/state-insurance-departments',
        note: 'Your state insurance department publishes its own minimum requirements.',
      },
    ],
  },
  {
    country: 'us',
    slug: 'homeowners-insurance',
    name: 'Homeowners insurance',
    topic: 'home',
    icon: 'home',
    description: 'Dwelling, personal property and liability coverage, and what is usually excluded.',
    intro: [
      'Homeowners insurance typically covers the structure of a home, personal belongings and personal liability, subject to the policy’s limits and exclusions. It isn’t required by law, but mortgage lenders usually require it as a condition of the loan.',
      'Standard homeowners policies generally don’t cover flood damage. Flood insurance is sold separately.',
    ],
  },
  {
    country: 'us',
    slug: 'renters-insurance',
    name: 'Renters insurance',
    topic: 'renters',
    icon: 'renters',
    description: 'Cover for a tenant’s belongings and liability, but not the building.',
    intro: [
      'Renters insurance covers a tenant’s personal belongings and personal liability. It doesn’t cover the building itself, which the landlord insures separately.',
      'Some landlords require tenants to have renters insurance as a condition of the lease.',
    ],
  },
  {
    country: 'us',
    slug: 'life-insurance',
    name: 'Life insurance',
    topic: 'life',
    icon: 'life',
    description: 'Term and permanent life insurance, beneficiaries and how payouts work.',
    intro: [
      'Life insurance pays money to the people named in the policy (the beneficiaries) when the insured person dies. The two main types are term life insurance, which covers a set period, and permanent life insurance, such as whole life, which is designed to last a lifetime and may build cash value.',
      'Life insurance companies and agents are licensed and regulated by each state’s insurance department.',
    ],
    links: [
      {
        name: 'NAIC: Life insurance company locator',
        url: 'https://content.naic.org/consumer_life_co_locator.htm',
        note: 'Search for life insurance companies.',
      },
    ],
  },
  {
    country: 'us',
    slug: 'medicare',
    name: 'Medicare',
    topic: 'medicare',
    icon: 'medicare',
    description: 'The federal health insurance program for people 65+ and some younger people.',
    intro: [
      'Medicare is the federal health insurance program for people aged 65 or older, certain younger people with disabilities, and people with End-Stage Renal Disease (permanent kidney failure requiring dialysis or a transplant).',
      'Medicare has four parts: Part A (hospital insurance), Part B (medical insurance), Part C (Medicare Advantage) and Part D (prescription drug coverage).',
    ],
    links: [
      {
        name: 'Medicare.gov: Parts of Medicare',
        url: 'https://www.medicare.gov/basics/get-started-with-medicare/medicare-basics/parts-of-medicare',
        note: 'Official overview of Parts A, B, C and D.',
      },
    ],
  },
  {
    country: 'us',
    slug: 'travel-insurance',
    name: 'Travel insurance',
    topic: 'travel',
    icon: 'travel',
    description: 'Trip cancellation, travel medical cover, evacuation and baggage.',
    intro: [
      'Travel insurance can cover costs such as trip cancellation or interruption, emergency medical care while traveling, medical evacuation and lost baggage, depending on the policy.',
      'Coverage from a US health plan outside the country varies by plan, and Original Medicare usually doesn’t cover health care outside the US except in limited situations.',
    ],
  },
  {
    country: 'us',
    slug: 'pet-insurance',
    name: 'Pet insurance',
    topic: 'pet',
    icon: 'pet',
    description: 'Accident and illness plans, reimbursement rates and common exclusions.',
    intro: [
      'Pet insurance reimburses part of the cost of veterinary care, such as treatment for accidents and illnesses, depending on the plan. Plans usually have a deductible, a reimbursement percentage and a payout limit, and they commonly exclude pre-existing conditions.',
      'Pet insurance is regulated by state insurance departments.',
    ],
  },

  // ───────────────────────── United Kingdom ─────────────────────────
  {
    country: 'uk',
    slug: 'car-insurance',
    name: 'Car insurance',
    topic: 'car',
    icon: 'car',
    description: 'The legal minimum, levels of cover, excesses and no-claims discounts.',
    intro: [
      'In the UK, you must have at least third party insurance to drive a vehicle on the road. Cover is usually sold at three levels: third party only; third party, fire and theft; and comprehensive.',
      'A registered vehicle must be insured even when it isn’t being driven, unless it has been declared off the road with a Statutory Off Road Notification (SORN).',
    ],
    links: [
      {
        name: 'GOV.UK: Vehicle insurance',
        url: 'https://www.gov.uk/vehicle-insurance',
        note: 'The legal rules on motor insurance.',
      },
      {
        name: 'MoneyHelper: Car insurance',
        url: 'https://www.moneyhelper.org.uk/en/everyday-money/insurance/car-insurance-what-you-need-to-know',
        note: 'Impartial guide to how car insurance works.',
      },
    ],
  },
  {
    country: 'uk',
    slug: 'home-insurance',
    name: 'Home insurance (buildings & contents)',
    topic: 'home',
    icon: 'home',
    description: 'Buildings cover, contents cover and how they differ.',
    intro: [
      'Home insurance in the UK is usually split into buildings insurance, which covers the structure of the property, and contents insurance, which covers belongings inside it. They can be bought separately or together.',
      'Buildings insurance isn’t a legal requirement, but mortgage lenders normally require it as a condition of the mortgage.',
    ],
    links: [
      {
        name: 'MoneyHelper: What is home insurance?',
        url: 'https://www.moneyhelper.org.uk/en/everyday-money/insurance/home-insurance-how-to-get-the-best-deal',
        note: 'Buildings and contents cover explained.',
      },
      {
        name: 'MoneyHelper: What is contents insurance?',
        url: 'https://www.moneyhelper.org.uk/en/everyday-money/insurance/what-is-contents-insurance',
        note: 'What contents insurance covers.',
      },
    ],
  },
  {
    country: 'uk',
    slug: 'life-insurance',
    name: 'Life insurance',
    topic: 'life',
    icon: 'life',
    description: 'Level term, decreasing term and whole of life cover.',
    intro: [
      'Life insurance pays out a lump sum or regular payments if the insured person dies during the policy term. Common types include level term, decreasing term and whole of life cover.',
      'Related protection products include critical illness cover and income protection.',
    ],
  },
  {
    country: 'uk',
    slug: 'travel-insurance',
    name: 'Travel insurance',
    topic: 'travel',
    icon: 'travel',
    description: 'Medical cover abroad, cancellation, and how a GHIC fits in.',
    intro: [
      'Travel insurance can cover emergency medical treatment abroad, cancellation, cutting a trip short, and lost or stolen belongings, depending on the policy.',
      'A UK Global Health Insurance Card (GHIC) or European Health Insurance Card (EHIC) gives access to state healthcare in some countries, but it is not an alternative to travel insurance.',
    ],
    links: [
      {
        name: 'MoneyHelper: What is travel insurance?',
        url: 'https://www.moneyhelper.org.uk/en/everyday-money/insurance/what-is-travel-insurance',
        note: 'Impartial guide to travel cover.',
      },
    ],
  },
  {
    country: 'uk',
    slug: 'pet-insurance',
    name: 'Pet insurance',
    topic: 'pet',
    icon: 'pet',
    description: 'Accident-only, time-limited, maximum benefit and lifetime policies.',
    intro: [
      'Pet insurance helps pay vet fees if a pet is injured or becomes ill, depending on the policy. UK policies are commonly described as accident-only, time-limited, maximum benefit or lifetime, which differ in how long and how much they pay for each condition.',
      'Policies usually have an excess and exclude pre-existing conditions.',
    ],
  },
  {
    country: 'uk',
    slug: 'landlord-insurance',
    name: 'Landlord insurance',
    topic: 'landlord',
    icon: 'landlord',
    description: 'Cover for let properties: buildings, landlord’s contents, liability and rent.',
    intro: [
      'Landlord insurance is designed for people who let out property. Depending on the policy, it can include buildings cover, cover for contents the landlord provides, liability cover and loss of rent.',
      'Standard home insurance policies often don’t cover a property that is let to tenants.',
    ],
  },
  {
    country: 'uk',
    slug: 'income-protection',
    name: 'Income protection',
    topic: 'income',
    icon: 'income',
    description: 'Regular payments if illness or injury stops you working.',
    intro: [
      'Income protection insurance pays a regular income if you can’t work because of illness or injury. Payments usually start after a waiting period (called the deferred period) and continue until you return to work, the claim period ends or the policy ends.',
      'It is different from critical illness cover, which pays a lump sum if you are diagnosed with a condition listed in the policy.',
    ],
  },

  // ───────────────────────── Canada ─────────────────────────
  {
    country: 'ca',
    slug: 'car-insurance',
    name: 'Car insurance (by province)',
    topic: 'car',
    icon: 'car',
    description: 'Public and private systems, and what each province requires.',
    intro: [
      'Car insurance is mandatory across Canada, but each province and territory sets its own rules. In British Columbia, Saskatchewan and Manitoba, mandatory coverage is bought from a government insurer, while most other provinces and the territories use private insurers.',
      'Quebec has a mixed system: a public plan covers bodily injury, and private insurers sell property damage and liability coverage.',
    ],
    links: [
      {
        name: 'Insurance Bureau of Canada: Mandatory auto coverage',
        url: 'https://www.ibc.ca/insurance-basics/auto/types-of-auto-coverage/mandatory-auto-insurance-requirements',
        note: 'Minimum coverage by province (industry association).',
      },
    ],
  },
  {
    country: 'ca',
    slug: 'home-tenant-insurance',
    name: 'Home & tenant insurance',
    topic: 'home',
    icon: 'home',
    description: 'Homeowner, condo and tenant policies, and what they cover.',
    intro: [
      'Home insurance in Canada typically covers the building, its contents and personal liability. Tenant insurance covers a renter’s belongings and liability, but not the building.',
      'Home insurance isn’t required by law, but mortgage lenders usually require it, and some landlords ask tenants to have tenant insurance.',
    ],
    links: [
      {
        name: 'FCAC: Insurance',
        url: 'https://www.canada.ca/en/financial-consumer-agency/services/insurance.html',
        note: 'Government of Canada consumer guides.',
      },
    ],
  },
  {
    country: 'ca',
    slug: 'life-insurance',
    name: 'Life insurance',
    topic: 'life',
    icon: 'life',
    description: 'Term, whole life and universal life insurance in Canada.',
    intro: [
      'Life insurance pays a benefit to named beneficiaries when the insured person dies. Common types in Canada include term life insurance, which covers a set period, and permanent life insurance, such as whole life and universal life.',
      'How life insurance is sold is regulated by the provinces and territories.',
    ],
    links: [
      {
        name: 'FCAC: Insurance',
        url: 'https://www.canada.ca/en/financial-consumer-agency/services/insurance.html',
        note: 'Government of Canada consumer guides.',
      },
    ],
  },
  {
    country: 'ca',
    slug: 'travel-medical',
    name: 'Travel & out-of-province medical',
    topic: 'travel',
    icon: 'travel',
    description: 'What provincial health plans pay outside your province and outside Canada.',
    intro: [
      'Provincial and territorial health insurance plans may pay only part of the cost of medical care received outside your home province, and very little or nothing for care outside Canada. Costs such as prescription drugs and ambulance services are not covered by the Canada Health Act’s portability rules.',
      'Travel medical insurance can pay for emergency care while travelling, and some policies also cover trip cancellation or interruption.',
    ],
    links: [
      {
        name: 'Travel.gc.ca: Travel health insurance',
        url: 'https://travel.gc.ca/travelling/documents/travel-insurance',
        note: 'Government of Canada advice for travellers.',
      },
    ],
  },
  {
    country: 'ca',
    slug: 'supplementary-health',
    name: 'Supplementary health insurance',
    topic: 'health',
    icon: 'health',
    description: 'Cover for drugs, dental, vision and other costs public plans may not pay.',
    intro: [
      'Public health insurance in Canada covers medically necessary hospital and physician services. Supplementary health insurance, often provided by employers as group benefits or bought individually, can help pay for things public plans may not fully cover, such as prescription drugs, dental care, vision care and paramedical services like physiotherapy.',
      'What public plans cover varies by province and territory.',
    ],
    links: [
      {
        name: 'Health Canada: How publicly funded health care coverage works',
        url: 'https://www.canada.ca/en/health-canada/services/health-care-system/canada-health-care-system-medicare/canada-health-act/how-publicly-funded-coverage-works.html',
        note: 'What the Canada Health Act covers.',
      },
    ],
  },

  // ───────────────────────── Australia ─────────────────────────
  {
    country: 'au',
    slug: 'ctp',
    name: 'CTP (green slip)',
    topic: 'ctp',
    icon: 'ctp',
    description: 'Compulsory third party insurance for injuries caused in road crashes.',
    intro: [
      'Compulsory third party (CTP) insurance covers people injured or killed in a crash caused by the insured vehicle’s driver. Every state and territory has a CTP scheme, and it is required to register a vehicle.',
      'CTP doesn’t pay for damage to vehicles or property. In New South Wales a CTP policy is called a green slip.',
    ],
    links: [
      {
        name: 'MAIC (Queensland): What is CTP insurance?',
        url: 'https://maic.qld.gov.au/about-ctp-insurance/what-is-ctp-insurance/',
        note: 'Queensland’s CTP regulator.',
      },
      {
        name: 'SIRA (NSW): Green slips',
        url: 'https://www.sira.nsw.gov.au/insurance-coverage/CTP-insurance-Green-Slips/what-is-a-green-slip',
        note: 'The NSW CTP regulator.',
      },
    ],
  },
  {
    country: 'au',
    slug: 'car-insurance',
    name: 'Car insurance',
    topic: 'car',
    icon: 'car',
    description: 'Third party property, fire and theft, and comprehensive cover.',
    intro: [
      'Apart from compulsory CTP, car insurance in Australia is optional. The main types are third party property damage; third party, fire and theft; and comprehensive cover.',
      'These policies cover damage to vehicles and property, which CTP does not.',
    ],
    links: [
      {
        name: 'Moneysmart: Choosing car insurance',
        url: 'https://moneysmart.gov.au/car-insurance/choosing-car-insurance',
        note: 'ASIC’s guide to the types of car insurance.',
      },
    ],
  },
  {
    country: 'au',
    slug: 'home-contents',
    name: 'Home & contents insurance',
    topic: 'home',
    icon: 'home',
    description: 'Building and contents cover, listed events and underinsurance.',
    intro: [
      'Home and contents insurance in Australia can cover the building (home insurance), your belongings (contents insurance), or both. What is covered for events such as floods, storms and bushfires can vary between policies.',
      'If a home is insured for less than it would cost to rebuild, a claim payment may not cover the full cost.',
    ],
  },
  {
    country: 'au',
    slug: 'private-health',
    name: 'Private health insurance',
    topic: 'health',
    icon: 'health',
    description: 'Hospital cover, extras cover and how they work alongside Medicare.',
    intro: [
      'Medicare, Australia’s public health system, covers many medical and hospital costs. Private health insurance is optional and is generally divided into hospital cover, for treatment as a private patient, and general treatment (extras) cover, for services outside hospital such as dental, optical and physiotherapy.',
      'Government arrangements such as the Medicare levy surcharge, Lifetime Health Cover loading and the private health insurance rebate affect what people pay.',
    ],
    links: [
      {
        name: 'privatehealth.gov.au: Private health insurance basics',
        url: 'https://privatehealth.gov.au/health_insurance/howitworks/index.htm',
        note: 'Government guide to how private health insurance works.',
      },
    ],
  },
  {
    country: 'au',
    slug: 'life-insurance',
    name: 'Life insurance',
    topic: 'life',
    icon: 'life',
    description: 'Life, TPD, trauma and income protection cover, including through super.',
    intro: [
      'Life insurance in Australia includes life cover, total and permanent disability (TPD) cover, trauma cover and income protection.',
      'Most superannuation funds (other than self-managed funds) offer life, TPD and income protection cover, often automatically for eligible members. Cover can also be bought directly from an insurer or through an adviser.',
    ],
    links: [
      {
        name: 'Moneysmart: How life insurance works',
        url: 'https://moneysmart.gov.au/how-life-insurance-works',
        note: 'ASIC’s guide to the types of life insurance.',
      },
      {
        name: 'Moneysmart: Insurance through super',
        url: 'https://moneysmart.gov.au/how-life-insurance-works/insurance-through-super',
        note: 'How cover inside superannuation works.',
      },
    ],
  },
  {
    country: 'au',
    slug: 'income-protection',
    name: 'Income protection',
    topic: 'income',
    icon: 'income',
    description: 'Monthly payments if illness or injury stops you working.',
    intro: [
      'Income protection insurance pays a regular benefit, usually a portion of your income, if you can’t work because of illness or injury. Payments start after a waiting period and continue for a set benefit period, as long as you meet the policy’s conditions.',
      'Cover can be held inside superannuation or bought separately.',
    ],
    links: [
      {
        name: 'Moneysmart: How life insurance works',
        url: 'https://moneysmart.gov.au/how-life-insurance-works',
        note: 'Includes income protection.',
      },
    ],
  },
  {
    country: 'au',
    slug: 'landlord-insurance',
    name: 'Landlord insurance',
    topic: 'landlord',
    icon: 'landlord',
    description: 'Cover for rental properties, including liability and loss of rent.',
    intro: [
      'Landlord insurance is for people who rent out a residential property. Depending on the policy, it can cover the building, contents supplied by the landlord, legal liability and loss of rent.',
      'Standard home and contents insurance may not cover a property that is rented out.',
    ],
  },
];

export function getCategoriesForCountry(country: string): Category[] {
  return categories.filter((c) => c.country === country);
}

export function getCategory(country: string, slug: string): Category | undefined {
  return categories.find((c) => c.country === country && c.slug === slug);
}

export function categoryUrl(category: Pick<Category, 'country' | 'slug'>): string {
  return `/${category.country}/${category.slug}/`;
}
