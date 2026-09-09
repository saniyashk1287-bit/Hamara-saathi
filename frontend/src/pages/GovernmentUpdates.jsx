import { useMemo, useState } from "react";
import "./GovernmentUpdates.css";

const GOVERNMENT_DATA = {
  scholarships: {
    title: "Scholarships",
    icon: "🎓",
    description:
      "Government scholarships and financial assistance for students.",
    items: [
      {
        title:
          "PM-USP Central Sector Scheme of Scholarship for College and University Students",
        category: "Higher Education",
        deadline: "31 October 2026",
        status: "Open",
        eligibility:
          "Meritorious college and university students who satisfy the income, academic and other conditions of the scheme.",
        benefits:
          "Financial assistance for higher education according to the scholarship guidelines.",
        documents:
          "OTR, academic records, income/category documents where applicable, bank details and other scheme-specific documents.",
        official:
          "https://scholarships.gov.in/All-Scholarships",
      },
      {
        title: "AICTE Pragati Scholarship Scheme for Girl Students",
        category: "Girl Students",
        deadline: "Check NSP for current closing date",
        status: "Open",
        eligibility:
          "Eligible girl students pursuing technical education in institutions covered by the scheme.",
        benefits:
          "Financial assistance to support technical education.",
        documents:
          "OTR, academic records, institute details and documents specified by the scheme.",
        official:
          "https://scholarships.gov.in/All-Scholarships",
      },
      {
        title: "AICTE Swanath Scholarship Scheme",
        category: "Technical Education",
        deadline: "Check NSP for current closing date",
        status: "Open",
        eligibility:
          "Students satisfying the eligibility conditions of the Swanath Scholarship Scheme.",
        benefits:
          "Financial support for eligible students pursuing technical education.",
        documents:
          "OTR, academic documents and scheme-specific supporting documents.",
        official:
          "https://scholarships.gov.in/All-Scholarships",
      },
      {
        title:
          "PM YASASVI – Top Class Education in College for OBC, EBC and DNT Students",
        category: "OBC / EBC / DNT",
        deadline: "Check NSP for current closing date",
        status: "Open",
        eligibility:
          "Eligible OBC, EBC and DNT students studying in institutions covered by the scheme.",
        benefits:
          "Financial assistance for higher education as provided under the scheme.",
        documents:
          "OTR, category certificate, academic records and other required documents.",
        official:
          "https://scholarships.gov.in/All-Scholarships",
      },
      {
        title: "Top Class Education Scheme for SC Students",
        category: "SC Students",
        deadline: "Check NSP for current closing date",
        status: "Open",
        eligibility:
          "Eligible SC students admitted to institutions covered by the scheme.",
        benefits:
          "Financial assistance for higher education.",
        documents:
          "OTR, caste certificate, academic records and scheme-specific documents.",
        official:
          "https://scholarships.gov.in/All-Scholarships",
      },
      {
        title:
          "National Fellowship and Scholarship for Higher Education of ST Students",
        category: "ST Students",
        deadline: "Check NSP for current closing date",
        status: "Open",
        eligibility:
          "Eligible ST students pursuing higher or professional education.",
        benefits:
          "Scholarship/fellowship support according to scheme provisions.",
        documents:
          "OTR, ST certificate, academic records and other required documents.",
        official:
          "https://scholarships.gov.in/All-Scholarships",
      },
      {
        title: "Scholarships for Students with Disabilities",
        category: "Students with Disabilities",
        deadline: "Check NSP for current closing date",
        status: "Open",
        eligibility:
          "Students with disabilities who satisfy the relevant scholarship conditions.",
        benefits:
          "Financial assistance for education.",
        documents:
          "OTR, disability-related documents, academic records and other required documents.",
        official:
          "https://scholarships.gov.in/All-Scholarships",
      },
      {
        title:
          "Financial Assistance for Education to Wards of Beedi/Cine/IOMC/LSDM Workers",
        category: "Welfare Scholarship",
        deadline: "Check NSP for current closing date",
        status: "Open",
        eligibility:
          "Eligible wards of workers covered by the relevant welfare schemes.",
        benefits:
          "Financial assistance towards education.",
        documents:
          "OTR, worker-related proof, academic documents and other scheme requirements.",
        official:
          "https://scholarships.gov.in/All-Scholarships",
      },
      {
        title:
          "Prime Minister's Scholarship Scheme for Central Armed Police Forces and Assam Rifles",
        category: "CAPF / Assam Rifles",
        deadline: "Check NSP for current closing date",
        status: "Open",
        eligibility:
          "Eligible wards of personnel covered under the scholarship scheme.",
        benefits:
          "Scholarship assistance for eligible higher/professional education.",
        documents:
          "OTR, service-related proof, academic documents and other required documents.",
        official:
          "https://scholarships.gov.in/All-Scholarships",
      },
      {
        title:
          "Prime Minister's Scholarship Scheme for Ministry of Railways",
        category: "Railway Employees' Wards",
        deadline: "Check NSP for current closing date",
        status: "Open",
        eligibility:
          "Eligible wards covered by the Ministry of Railways scholarship scheme.",
        benefits:
          "Scholarship assistance according to scheme rules.",
        documents:
          "OTR, railway/service proof, academic documents and other required documents.",
        official:
          "https://scholarships.gov.in/All-Scholarships",
      },
    ],
  },

  schemes: {
    title: "Government Schemes",
    icon: "🏛️",
    description:
      "Government schemes covering healthcare, housing, farmers, education, financial assistance and welfare.",
    items: [
      {
        title: "myScheme – Government Scheme Finder",
        category: "All Citizens",
        deadline: "No single deadline",
        status: "Available",
        eligibility:
          "Citizens can search schemes based on factors such as age, gender, state, category and other eligibility details.",
        benefits:
          "Helps users discover Central and State/UT government schemes and understand eligibility, benefits and application information.",
        documents:
          "Documents depend on the individual scheme.",
        official: "https://www.myscheme.gov.in/",
      },
      {
        title: "Ayushman Bharat – PM-JAY",
        category: "Healthcare",
        deadline: "No fixed deadline",
        status: "Available",
        eligibility:
          "Eligibility depends on the PM-JAY beneficiary criteria. The expanded senior citizen coverage includes citizens aged 70 years and above.",
        benefits:
          "Health coverage under the PM-JAY programme according to applicable rules.",
        documents:
          "Identity, age and beneficiary verification documents as applicable.",
        official: "https://beneficiary.nha.gov.in/",
      },
      {
        title: "PM-KISAN",
        category: "Farmers",
        deadline: "Scheme based",
        status: "Available",
        eligibility:
          "Eligible landholding farmer families subject to the scheme's conditions.",
        benefits:
          "Direct income support under the PM-KISAN scheme.",
        documents:
          "Identity, land and bank-related information as required.",
        official: "https://pmkisan.gov.in/",
      },
      {
        title: "Pradhan Mantri Awas Yojana – Urban",
        category: "Housing",
        deadline: "Scheme based",
        status: "Available",
        eligibility:
          "Eligible urban households according to the applicable PMAY-U provisions.",
        benefits:
          "Housing assistance under the applicable scheme component.",
        documents:
          "Identity, address, income and property-related documents as applicable.",
        official: "https://pmay-urban.gov.in/",
      },
      {
        title: "National Social Assistance Programme",
        category: "Social Security",
        deadline: "State / scheme process",
        status: "Available",
        eligibility:
          "Eligible beneficiaries under the different NSAP components.",
        benefits:
          "Social security assistance including eligible pension support.",
        documents:
          "Identity, age, eligibility and bank documents as required.",
        official: "https://nsap.nic.in/",
      },
    ],
  },

  senior: {
    title: "Senior Citizen Benefits",
    icon: "👴",
    description:
      "Government pensions, healthcare, welfare, safety and support services for senior citizens.",
    items: [
      {
        title: "Indira Gandhi National Old Age Pension Scheme",
        category: "Pension",
        deadline: "No single national deadline",
        status: "Available",
        eligibility:
          "Eligible senior citizens covered under the applicable NSAP criteria.",
        benefits:
          "Old-age pension assistance. The central contribution varies by age group, with states/UTs providing additional support where applicable.",
        documents:
          "Age proof, identity, eligibility/BPL-related documents and bank details as required.",
        official: "https://nsap.nic.in/",
      },
      {
        title: "Atal Vayo Abhyuday Yojana (AVYAY)",
        category: "Senior Citizen Welfare",
        deadline: "No fixed deadline",
        status: "Available",
        eligibility:
          "Senior citizens can benefit through the different welfare components implemented under AVYAY.",
        benefits:
          "Covers areas including financial security, healthcare and nutrition, shelter and welfare, protection of life and property, and active ageing.",
        documents:
          "Documents depend on the specific service or component.",
        official:
          "https://socialjustice.gov.in/schemes/43",
      },
      {
        title: "Rashtriya Vayoshri Yojana",
        category: "Assistive Devices",
        deadline: "Camp / service based",
        status: "Available",
        eligibility:
          "Eligible senior citizens with age-related disabilities or infirmities according to scheme conditions.",
        benefits:
          "Assistive living devices for eligible senior citizens.",
        documents:
          "Age, income/eligibility and disability/infirmity-related documents as required.",
        official: "https://socialjustice.gov.in/",
      },
      {
        title: "Elderline – National Helpline for Senior Citizens",
        category: "Support & Safety",
        deadline: "No deadline",
        status: "Available",
        eligibility:
          "Senior citizens seeking information, guidance, support or intervention.",
        benefits:
          "National senior-citizen helpline service available through 14567.",
        documents:
          "Usually not required for basic helpline assistance.",
        official: "https://socialjustice.gov.in/",
      },
      {
        title: "Ayushman Bharat PM-JAY – Senior Citizens 70+",
        category: "Healthcare",
        deadline: "No fixed deadline",
        status: "Available",
        eligibility:
          "Senior citizens aged 70 years and above under the expanded PM-JAY coverage.",
        benefits:
          "Health coverage according to the expanded PM-JAY senior-citizen provisions.",
        documents:
          "Age and identity verification documents as required.",
        official: "https://beneficiary.nha.gov.in/",
      },
      {
        title: "Integrated Programme for Senior Citizens",
        category: "Shelter & Care",
        deadline: "Programme based",
        status: "Available",
        eligibility:
          "Senior citizens requiring services provided through supported organisations.",
        benefits:
          "Includes senior citizen homes, continuous care, mobile medicare and other support services through eligible organisations.",
        documents:
          "Depends on the service provider.",
        official: "https://socialjustice.gov.in/",
      },
      {
        title: "Maintenance and Welfare of Parents and Senior Citizens Act",
        category: "Legal Protection",
        deadline: "No deadline",
        status: "Available",
        eligibility:
          "Parents and senior citizens covered by the applicable provisions of the Act.",
        benefits:
          "Legal protection and provisions relating to maintenance and welfare of senior citizens.",
        documents:
          "Depends on the complaint or legal process.",
        official: "https://socialjustice.gov.in/",
      },
    ],
  },

  women: {
    title: "Women Benefits & Opportunities",
    icon: "👩",
    description:
      "Government schemes, safety services, education and support programmes for women.",
    items: [
      {
        title: "Mission Shakti",
        category: "Women Empowerment",
        deadline: "Programme based",
        status: "Available",
        eligibility:
          "Women can access services and programmes implemented under Mission Shakti.",
        benefits:
          "Government interventions for women's safety, security and empowerment.",
        documents:
          "Depends on the service being requested.",
        official: "https://missionshakti.wcd.gov.in/",
      },
      {
        title: "Women Helpline – 181",
        category: "Women Support",
        deadline: "No deadline",
        status: "Available",
        eligibility:
          "Women seeking information, support, assistance or referral to relevant services.",
        benefits:
          "Women Helpline support and referral services.",
        documents:
          "Usually not required for basic helpline support.",
        official: "https://missionshakti.wcd.gov.in/",
      },
      {
        title: "One Stop Centre – Sakhi",
        category: "Women Safety",
        deadline: "No deadline",
        status: "Available",
        eligibility:
          "Women affected by violence who require integrated support services.",
        benefits:
          "Access to support such as counselling, legal, medical and other assistance.",
        documents:
          "Depends on the service required.",
        official: "https://missionshakti.wcd.gov.in/",
      },
      {
        title: "Pradhan Mantri Matru Vandana Yojana",
        category: "Maternity Support",
        deadline: "Scheme based",
        status: "Available",
        eligibility:
          "Eligible pregnant and lactating women according to the scheme conditions.",
        benefits:
          "Maternity benefit support under PMMVY.",
        documents:
          "Identity, pregnancy/birth and bank-related information as applicable.",
        official: "https://pmmvy.wcd.gov.in/",
      },
      {
        title: "Beti Bachao Beti Padhao",
        category: "Girl Child",
        deadline: "No fixed individual deadline",
        status: "Available",
        eligibility:
          "Government programme supporting the protection, education and empowerment of the girl child.",
        benefits:
          "Awareness and multi-sector interventions for the girl child.",
        documents:
          "Depends on the connected service or programme.",
        official: "https://wcd.gov.in/",
      },
    ],
  },

  jobs: {
    title: "Government Jobs",
    icon: "💼",
    description:
      "Current and upcoming government recruitment opportunities.",
    items: [
      {
        title: "UPSC Combined Geo-Scientist Examination 2027",
        category: "UPSC Recruitment",
        deadline: "22 September 2026 – 6:00 PM",
        status: "Open",
        eligibility:
          "Eligibility depends on the educational qualifications and other conditions in the official examination notification.",
        benefits:
          "Recruitment through the UPSC Combined Geo-Scientist examination.",
        documents:
          "Educational qualification, identity and other documents specified in the notification.",
        official:
          "https://www.upsc.gov.in/exams-related-info/exam-notification",
      },
      {
        title: "UPSC Online Recruitment Applications",
        category: "UPSC Recruitment",
        deadline: "Varies by vacancy",
        status: "Live",
        eligibility:
          "Depends on the individual recruitment advertisement.",
        benefits:
          "Access to current UPSC recruitment advertisements and online applications.",
        documents:
          "Depends on the advertised post.",
        official:
          "https://www.upsc.gov.in/vacancy-circulars",
      },
      {
        title: "Staff Selection Commission Recruitment",
        category: "SSC Recruitment",
        deadline: "Varies by examination",
        status: "Live",
        eligibility:
          "Depends on the individual SSC examination or recruitment notification.",
        benefits:
          "Central government recruitment opportunities through SSC.",
        documents:
          "Depends on the individual notification.",
        official: "https://ssc.gov.in/",
      },
      {
        title: "National Career Service – Government Jobs",
        category: "Government Employment",
        deadline: "Varies by vacancy",
        status: "Live Listings",
        eligibility:
          "Depends on the individual job vacancy.",
        benefits:
          "Search government-sector employment opportunities by different criteria.",
        documents:
          "Depends on the recruitment notification.",
        official:
          "https://ncs.gov.in/job-listing?isGovernmentJob=true",
      },
      {
        title: "Maharashtra Employment Portal",
        category: "Maharashtra",
        deadline: "Varies by vacancy",
        status: "Live Listings",
        eligibility:
          "Depends on the individual opportunity.",
        benefits:
          "Employment and job-related services for Maharashtra job seekers.",
        documents:
          "Depends on the opportunity.",
        official: "https://rojgar.mahaswayam.gov.in/",
      },
    ],
  },

  internships: {
    title: "Government Internships",
    icon: "💻",
    description:
      "Government internship programmes and opportunities for students and young people.",
    items: [
      {
        title: "Prime Minister's Internship Scheme",
        category: "Government Internship",
        deadline: "Check current application cycle",
        status: "Portal Available",
        eligibility:
          "Eligibility depends on the current PM Internship Scheme cycle and its official guidelines.",
        benefits:
          "Structured internship opportunities with participating organisations.",
        documents:
          "Education, identity and other documents required by the portal.",
        official: "https://pminternship.mca.gov.in/",
      },
      {
        title: "MoSPI Internship Programme",
        category: "Government Internship",
        deadline: "Check current notification",
        status: "Portal Available",
        eligibility:
          "Eligibility varies according to the internship notification.",
        benefits:
          "Internship opportunities with the Ministry of Statistics and Programme Implementation.",
        documents:
          "Academic and identity documents as specified.",
        official: "https://www.internship.mospi.gov.in/",
      },
    ],
  },
};

const CATEGORIES = [
  {
    id: "scholarships",
    icon: "🎓",
    title: "Scholarships",
    description:
      "Explore government scholarships and educational financial assistance.",
  },
  {
    id: "schemes",
    icon: "🏛️",
    title: "Government Schemes",
    description:
      "Find welfare, healthcare, housing, financial and social-security schemes.",
  },
  {
    id: "jobs",
    icon: "💼",
    title: "Jobs & Employment",
    description:
      "Find current government recruitment and employment opportunities.",
  },
  {
    id: "women",
    icon: "👩",
    title: "Women Benefits",
    description:
      "Explore government schemes, safety services and opportunities for women.",
  },
  {
    id: "senior",
    icon: "👴",
    title: "Senior Citizen Benefits",
    description:
      "Find pension, healthcare, welfare, safety and support services.",
  },
  {
    id: "internships",
    icon: "💻",
    title: "Internships",
    description:
      "Explore government internship programmes for students and young people.",
  },
];

export default function GovernmentUpdates({ onBack }) {
  const [category, setCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [search, setSearch] = useState("");

  const currentCategory = category
    ? GOVERNMENT_DATA[category]
    : null;

  const filteredItems = useMemo(() => {
    if (!currentCategory) return [];

    const searchText = search.trim().toLowerCase();

    if (!searchText) {
      return currentCategory.items;
    }

    return currentCategory.items.filter((item) => {
      return (
        item.title.toLowerCase().includes(searchText) ||
        item.category.toLowerCase().includes(searchText) ||
        item.eligibility.toLowerCase().includes(searchText) ||
        item.benefits.toLowerCase().includes(searchText)
      );
    });
  }, [category, search, currentCategory]);

  /* ---------------- DETAILS PAGE ---------------- */

  if (selectedItem && currentCategory) {
    return (
      <div className="government-page">
        <header className="government-topbar">
          <button
            className="government-back"
            onClick={() => setSelectedItem(null)}
          >
            ← Back
          </button>

          <strong>Hamara Saathi</strong>
        </header>

        <main className="government-details">
          <div className="details-header">
            <div className="details-icon">
              {currentCategory.icon}
            </div>

            <div>
              <span className="details-category">
                {selectedItem.category}
              </span>

              <h1>{selectedItem.title}</h1>

              <div
                className={
                  selectedItem.status === "Open"
                    ? "details-status open"
                    : "details-status"
                }
              >
                ● {selectedItem.status}
              </div>
            </div>
          </div>

          <div className="details-grid">
            <div className="details-box">
              <span className="details-box-icon">📅</span>
              <div>
                <h3>Application Deadline</h3>
                <p>{selectedItem.deadline}</p>
              </div>
            </div>

            <div className="details-box">
              <span className="details-box-icon">👥</span>
              <div>
                <h3>Eligibility</h3>
                <p>{selectedItem.eligibility}</p>
              </div>
            </div>

            <div className="details-box">
              <span className="details-box-icon">💰</span>
              <div>
                <h3>Benefits</h3>
                <p>{selectedItem.benefits}</p>
              </div>
            </div>

            <div className="details-box">
              <span className="details-box-icon">📄</span>
              <div>
                <h3>Required Documents</h3>
                <p>{selectedItem.documents}</p>
              </div>
            </div>
          </div>

          <div className="official-section">
            <div>
              <span className="official-label">
                OFFICIAL SOURCE
              </span>

              <h2>Apply or Learn More</h2>

              <p>
                Always verify the latest eligibility, deadline and
                application instructions on the official government
                website.
              </p>
            </div>

            <a
              href={selectedItem.official}
              target="_blank"
              rel="noopener noreferrer"
              className="official-button"
            >
              Open Official Website →
            </a>
          </div>
        </main>
      </div>
    );
  }

  /* ---------------- CATEGORY LIST ---------------- */

  if (currentCategory) {
    return (
      <div className="government-page">
        <header className="government-topbar">
          <button
            className="government-back"
            onClick={() => {
              setCategory(null);
              setSearch("");
            }}
          >
            ← All Categories
          </button>

          <strong>Hamara Saathi</strong>
        </header>

        <main className="government-content">
          <section className="government-heading">
            <div className="large-category-icon">
              {currentCategory.icon}
            </div>

            <div>
              <p>GOVERNMENT UPDATES</p>

              <h1>{currentCategory.title}</h1>

              <span>{currentCategory.description}</span>
            </div>
          </section>

          <div className="government-search">
            <div className="search-box">
              <span>⌕</span>

              <input
                type="text"
                placeholder={`Search ${currentCategory.title}...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <span className="result-count">
              {filteredItems.length} result
              {filteredItems.length !== 1 ? "s" : ""}
            </span>
          </div>

          <section className="government-list">
            {filteredItems.length === 0 ? (
              <div className="no-results">
                <div>🔎</div>
                <h3>No results found</h3>
                <p>Try searching with a different keyword.</p>
              </div>
            ) : (
              filteredItems.map((item, index) => (
                <article
                  className="government-item"
                  key={index}
                >
                  <div className="government-item-main">
                    <span className="item-category">
                      {item.category}
                    </span>

                    <h2>{item.title}</h2>

                    <p>{item.eligibility}</p>
                  </div>

                  <div className="item-information">
                    <div>
                      <small>DEADLINE</small>
                      <span>📅 {item.deadline}</span>
                    </div>

                    <div>
                      <small>STATUS</small>

                      <span
                        className={
                          item.status === "Open"
                            ? "status-open"
                            : "status-normal"
                        }
                      >
                        ● {item.status}
                      </span>
                    </div>
                  </div>

                  <div className="item-actions">
                    <button
                      onClick={() => setSelectedItem(item)}
                    >
                      View Details
                    </button>

                    <a
                      href={item.official}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Official Website ↗
                    </a>
                  </div>
                </article>
              ))
            )}
          </section>
        </main>
      </div>
    );
  }

  /* ---------------- MAIN GOVERNMENT UPDATES ---------------- */

  return (
    <div className="government-page">
      <header className="government-topbar">
        <button
          className="government-back"
          onClick={onBack}
        >
          ← Dashboard
        </button>

        <strong>Hamara Saathi</strong>
      </header>

      <main className="government-content">
        <section className="government-hero">
          <div className="hero-label">
            GOVERNMENT SERVICES
          </div>

          <h1>Government Updates</h1>

          <span>
            Explore government scholarships, schemes, jobs,
            women benefits, senior citizen benefits and
            internships.
          </span>
        </section>

        <section className="category-grid">
          {CATEGORIES.map((item) => (
            <button
              className="category-card"
              key={item.id}
              onClick={() => setCategory(item.id)}
            >
              <div className="category-card-top">
                <div className="category-card-icon">
                  {item.icon}
                </div>

                <span className="category-arrow">
                  →
                </span>
              </div>

              <h2>{item.title}</h2>

              <p>{item.description}</p>

              <span className="explore-link">
                Explore
              </span>
            </button>
          ))}
        </section>

        <div className="government-note">
          <span className="note-icon">!</span>

          <div>
            <strong>Important Information</strong>

            <p>
              Government schemes, eligibility requirements and
              application deadlines may change. Always verify the
              latest information on the official government website
              before applying.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}