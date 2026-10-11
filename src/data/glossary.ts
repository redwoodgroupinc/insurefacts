// Insurance terms for /glossary/. Keep definitions general and factual.
// `regions` notes where a term is used or differs between countries.

export interface GlossaryTerm {
  term: string;
  definition: string;
  regions?: string;
  /** Other terms on this page that readers may want to compare. */
  seeAlso?: string[];
}

export const glossary: GlossaryTerm[] = [
  {
    term: 'Actual cash value',
    definition:
      'A way of valuing a claim that pays what the damaged or stolen item was worth at the time of the loss, allowing for wear and tear (depreciation), rather than the cost of buying a new one.',
    regions: 'Mainly used in the US and Canada.',
    seeAlso: ['Replacement cost'],
  },
  {
    term: 'Add-on',
    definition:
      'Optional extra cover that can be added to a policy for an additional cost, such as breakdown cover on a car insurance policy.',
    regions:
      'Common in the UK and Australia (also called an optional extra). In the US and Canada, a similar addition is often called a rider or endorsement.',
    seeAlso: ['Rider'],
  },
  {
    term: 'Beneficiary',
    definition:
      'The person or organisation named in a life insurance policy to receive the payout when the insured person dies.',
  },
  {
    term: 'Broker',
    definition:
      'A person or firm that arranges insurance on behalf of customers and can usually offer policies from more than one insurer. Brokers are licensed or authorised by the relevant regulator.',
  },
  {
    term: 'Claim',
    definition: 'A formal request to an insurer to pay for a loss or event covered by the policy.',
  },
  {
    term: 'Coinsurance',
    definition:
      'In US health insurance, your share of the cost of a covered service, calculated as a percentage of the allowed amount, usually after you have paid your deductible.',
    regions: 'A US health insurance term.',
    seeAlso: ['Copayment', 'Deductible'],
  },
  {
    term: 'Comprehensive cover',
    definition:
      'The meaning depends on the country. In the UK and Australia, comprehensive car insurance is the highest level of cover and includes damage to your own vehicle as well as to other people’s property. In the US and Canada, comprehensive coverage is one part of a car policy that covers damage not caused by a collision, such as theft, fire, hail or hitting an animal.',
    regions: 'Means different things in the US and Canada compared with the UK and Australia.',
  },
  {
    term: 'Cooling-off period',
    definition:
      'A period after buying a policy during which you can cancel it, usually with a refund of the premium. The length depends on the type of insurance and the rules where you live.',
    regions:
      'The term used in the UK and Australia. In the US, a similar period for life insurance is called a free look period.',
    seeAlso: ['Free look period'],
  },
  {
    term: 'Copayment',
    definition:
      'In US health insurance, a fixed amount you pay for a covered health care service, usually when you get the service. Also called a copay.',
    regions: 'A US health insurance term.',
    seeAlso: ['Coinsurance'],
  },
  {
    term: 'Deductible',
    definition:
      'The amount you pay towards a claim, or towards covered costs, before the insurer starts paying. A higher deductible usually means a lower premium.',
    regions: 'Called a deductible in the US and Canada, and an excess in the UK and Australia.',
    seeAlso: ['Excess'],
  },
  {
    term: 'Endorsement',
    definition: 'A written change to an insurance policy that adds, removes or changes cover.',
    regions: 'Common in the US and Canada.',
    seeAlso: ['Rider'],
  },
  {
    term: 'Excess',
    definition:
      'The amount you pay towards each claim before the insurer pays the rest. Some policies have a compulsory excess set by the insurer and a voluntary excess you can choose to add.',
    regions: 'Called an excess in the UK and Australia, and a deductible in the US and Canada.',
    seeAlso: ['Deductible'],
  },
  {
    term: 'Exclusion',
    definition:
      'Something a policy specifically does not cover. Exclusions are listed in the policy documents.',
  },
  {
    term: 'Free look period',
    definition:
      'A period after you receive a new policy, most often life insurance, during which you can cancel it and get your premium back. The minimum length is set by state law.',
    regions: 'A US term. In the UK and Australia, the similar idea is called a cooling-off period.',
    seeAlso: ['Cooling-off period'],
  },
  {
    term: 'Insurance Product Information Document (IPID)',
    definition:
      'A short, standard-format summary of a general insurance product that sets out the main features, what is and isn’t covered, and key obligations.',
    regions: 'A UK term.',
    seeAlso: ['Product Disclosure Statement (PDS)'],
  },
  {
    term: 'Insurer',
    definition:
      'The company that provides the insurance and pays valid claims. Also called the insurance company or underwriter.',
  },
  {
    term: 'Liability',
    definition:
      'Legal responsibility for injury to other people or damage to their property. Liability insurance pays claims made against you, up to the policy limit.',
    regions:
      'In the UK and Australia, cover for liability to others is often called third party cover.',
    seeAlso: ['Third party'],
  },
  {
    term: 'Medicare',
    definition:
      'The name of two very different public health programs. In the US, Medicare is the federal health insurance program for people aged 65 or older, certain younger people with disabilities, and people with End-Stage Renal Disease. In Australia, Medicare is the public health system that covers eligible residents of all ages.',
    regions: 'Means different things in the US and Australia.',
  },
  {
    term: 'No-claims bonus',
    definition:
      'A discount on your premium for each year you hold a policy without making a claim. Also called a no-claims discount.',
    regions:
      'Used in the UK (no-claims bonus or discount) and Australia (no claim bonus). In the US and Canada, insurers may offer a claims-free discount.',
  },
  {
    term: 'Out-of-pocket maximum',
    definition:
      'In US health insurance, the most you have to pay for covered in-network services in a plan year. After you reach it through deductibles, copayments and coinsurance, the plan pays 100% of the cost of covered benefits for the rest of the plan year.',
    regions: 'A US health insurance term.',
  },
  {
    term: 'Policy',
    definition:
      'The contract between you and the insurer that sets out what is covered, what isn’t, the limits, and the conditions you must meet.',
  },
  {
    term: 'Policyholder',
    definition: 'The person or organisation that owns an insurance policy.',
  },
  {
    term: 'Pre-existing condition',
    definition:
      'A health condition you had before your cover started. Many travel, pet and some health policies limit or exclude cover for pre-existing conditions; the rules depend on the type of insurance and the country.',
  },
  {
    term: 'Premium',
    definition: 'The amount you pay for an insurance policy, usually monthly or yearly.',
  },
  {
    term: 'Product Disclosure Statement (PDS)',
    definition:
      'A document that explains an insurance product’s features, benefits, risks and costs, given to customers before they buy most types of insurance.',
    regions: 'An Australian term.',
    seeAlso: ['Insurance Product Information Document (IPID)'],
  },
  {
    term: 'Replacement cost',
    definition:
      'A way of valuing a claim that pays what it would cost to replace or repair the item with a new one of similar kind and quality, without deducting for wear and tear. Called new-for-old cover in the UK and Australia.',
    seeAlso: ['Actual cash value'],
  },
  {
    term: 'Rider',
    definition:
      'An addition to an insurance policy, especially life or health insurance, that adds or changes cover, usually for an extra premium.',
    regions: 'Common in the US and Canada.',
    seeAlso: ['Add-on', 'Endorsement'],
  },
  {
    term: 'Sum insured',
    definition:
      'The maximum amount an insurer will pay under a policy, or for a particular item or type of loss.',
    regions:
      'Used in the UK and Australia. In the US and Canada, the usual terms are coverage limit or policy limit.',
    seeAlso: ['Underinsurance'],
  },
  {
    term: 'Term life insurance',
    definition:
      'Life insurance that covers a set period, such as 10 or 20 years. It pays out only if the insured person dies during that period.',
    seeAlso: ['Whole life insurance'],
  },
  {
    term: 'Third party',
    definition:
      'Someone other than you or your insurer, such as another driver or a pedestrian. Third party insurance covers your legal liability for injury to them or damage to their property.',
    regions: 'A common term in the UK and Australia.',
    seeAlso: ['Liability'],
  },
  {
    term: 'Underinsurance',
    definition:
      'Having a sum insured or coverage limit that is lower than the real cost to rebuild, repair or replace what is insured. If you are underinsured, a claim payment may not cover the full cost.',
  },
  {
    term: 'Underwriting',
    definition:
      'The process an insurer uses to assess the risk of insuring someone, which decides whether cover is offered and on what terms and price.',
  },
  {
    term: 'Waiting period',
    definition:
      'A period after cover starts during which you can’t claim for some or all benefits. For income protection, it is the time after you stop working before payments begin (called the deferred period in the UK).',
  },
  {
    term: 'Whole life insurance',
    definition:
      'Permanent life insurance designed to last for the rest of the insured person’s life, as long as premiums are paid. In the US and Canada, whole life policies may also build a cash value.',
    seeAlso: ['Term life insurance'],
  },
];

/** Same terms, different words: shown as a comparison table at the top of the glossary. */
export const terminology: { concept: string; usCa: string; ukAu: string }[] = [
  { concept: 'What you pay towards a claim', usCa: 'Deductible', ukAu: 'Excess' },
  { concept: 'Cover for a vehicle', usCa: 'Auto or car insurance', ukAu: 'Motor or car insurance' },
  {
    concept: 'Cover for liability to others',
    usCa: 'Liability coverage',
    ukAu: 'Third party cover',
  },
  {
    concept: 'Maximum the insurer pays',
    usCa: 'Coverage limit or policy limit',
    ukAu: 'Sum insured',
  },
  {
    concept: 'Discount for not claiming',
    usCa: 'Claims-free discount',
    ukAu: 'No-claims bonus or discount',
  },
  {
    concept: 'Extra cover added to a policy',
    usCa: 'Rider or endorsement',
    ukAu: 'Add-on or optional extra',
  },
  {
    concept: 'Time to cancel a new policy',
    usCa: 'Free look period (US)',
    ukAu: 'Cooling-off period',
  },
  {
    concept: 'Insurance for a renter’s belongings',
    usCa: 'Renters insurance (US), tenant insurance (Canada)',
    ukAu: 'Contents insurance',
  },
  { concept: 'Spelling', usCa: 'Tire', ukAu: 'Tyre' },
];

export function termId(term: string): string {
  return term
    .toLowerCase()
    .replace(/\(.*?\)/g, '')
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
