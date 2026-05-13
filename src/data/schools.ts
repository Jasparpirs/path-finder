export type SchoolType = "university" | "vocational" | "applied";

export interface Profession {
  id: string;
  name: string;
  field: "tech" | "health" | "business" | "arts" | "science" | "social" | "trades" | "service";
  description: string;
}

export interface School {
  id: string;
  name: string;
  city: string;
  type: SchoolType;
  acceptsAfter9: boolean;
  website: string;
  description: string;
  professions: Profession[];
}

export const schools: School[] = [
  {
    id: "ttu",
    name: "Tallinna Tehnikaülikool (TalTech)",
    city: "Tallinn",
    type: "university",
    acceptsAfter9: false,
    website: "https://taltech.ee",
    description: "Estonia's only technological university, focused on engineering, IT and business.",
    professions: [
      { id: "ttu-cs", name: "Tarkvaratehnika (Software Engineering)", field: "tech", description: "Build software systems, web apps and infrastructure." },
      { id: "ttu-cyber", name: "Küberturve (Cybersecurity)", field: "tech", description: "Defend systems and data from attacks." },
      { id: "ttu-civil", name: "Ehitusinseneeria (Civil Engineering)", field: "science", description: "Design buildings, bridges and infrastructure." },
      { id: "ttu-business", name: "Ärindus (Business Administration)", field: "business", description: "Manage companies, finance and strategy." },
      { id: "ttu-mech", name: "Mehhatroonika", field: "tech", description: "Combine mechanics, electronics and software." },
    ],
  },
  {
    id: "ut",
    name: "Tartu Ülikool",
    city: "Tartu",
    type: "university",
    acceptsAfter9: false,
    website: "https://ut.ee",
    description: "Estonia's national university and oldest, strong in sciences, medicine and humanities.",
    professions: [
      { id: "ut-med", name: "Arstiteadus (Medicine)", field: "health", description: "Become a medical doctor." },
      { id: "ut-law", name: "Õigusteadus (Law)", field: "social", description: "Study law and become a lawyer or judge." },
      { id: "ut-psych", name: "Psühholoogia", field: "social", description: "Understand human behavior and mind." },
      { id: "ut-bio", name: "Bioloogia", field: "science", description: "Study living systems and ecosystems." },
      { id: "ut-cs", name: "Informaatika", field: "tech", description: "Computer science and programming." },
      { id: "ut-econ", name: "Majandusteadus", field: "business", description: "Economics and analytics." },
    ],
  },
  {
    id: "emu",
    name: "Eesti Maaülikool",
    city: "Tartu",
    type: "university",
    acceptsAfter9: false,
    website: "https://emu.ee",
    description: "University of life sciences — agriculture, forestry, veterinary.",
    professions: [
      { id: "emu-vet", name: "Veterinaarmeditsiin", field: "health", description: "Care for animals as a vet." },
      { id: "emu-forest", name: "Metsandus (Forestry)", field: "science", description: "Manage forests and natural resources." },
      { id: "emu-agri", name: "Põllumajandus", field: "science", description: "Modern agriculture and food production." },
    ],
  },
  {
    id: "eka",
    name: "Eesti Kunstiakadeemia (EKA)",
    city: "Tallinn",
    type: "university",
    acceptsAfter9: false,
    website: "https://artun.ee",
    description: "Estonian Academy of Arts — design, architecture and fine arts.",
    professions: [
      { id: "eka-arch", name: "Arhitektuur", field: "arts", description: "Design buildings and spaces." },
      { id: "eka-graph", name: "Graafiline disain", field: "arts", description: "Visual identity, typography, branding." },
      { id: "eka-anim", name: "Animatsioon", field: "arts", description: "Create animated films and visuals." },
    ],
  },
  {
    id: "ema",
    name: "Eesti Muusika- ja Teatriakadeemia",
    city: "Tallinn",
    type: "university",
    acceptsAfter9: false,
    website: "https://eamt.ee",
    description: "Music and theatre academy.",
    professions: [
      { id: "ema-mus", name: "Muusika esitamine", field: "arts", description: "Perform classical or contemporary music." },
      { id: "ema-act", name: "Lavakunst (Acting)", field: "arts", description: "Train as a professional actor." },
    ],
  },
  {
    id: "tlu",
    name: "Tallinna Ülikool",
    city: "Tallinn",
    type: "university",
    acceptsAfter9: false,
    website: "https://tlu.ee",
    description: "Humanities, education, digital media and social sciences.",
    professions: [
      { id: "tlu-teach", name: "Õpetajakoolitus", field: "social", description: "Become a teacher." },
      { id: "tlu-media", name: "Digimeedia", field: "arts", description: "Digital storytelling and media production." },
      { id: "tlu-soc", name: "Sotsiaaltöö", field: "social", description: "Help people through social work." },
    ],
  },
  {
    id: "ttk",
    name: "Tallinna Tehnikakõrgkool (TTK)",
    city: "Tallinn",
    type: "applied",
    acceptsAfter9: false,
    website: "https://tktk.ee",
    description: "University of applied sciences — practical engineering and logistics.",
    professions: [
      { id: "ttk-log", name: "Logistika", field: "business", description: "Supply chain and transport management." },
      { id: "ttk-auto", name: "Autotehnika", field: "tech", description: "Automotive engineering." },
      { id: "ttk-cloth", name: "Rõivadisain", field: "arts", description: "Fashion and clothing design." },
    ],
  },
  {
    id: "tthk",
    name: "Tallinna Tööstushariduskeskus",
    city: "Tallinn",
    type: "vocational",
    acceptsAfter9: true,
    website: "https://tthk.ee",
    description: "Largest vocational school in Tallinn — accepts students after 9th grade.",
    professions: [
      { id: "tthk-it", name: "IT-süsteemide nooremspetsialist", field: "tech", description: "Junior IT systems specialist." },
      { id: "tthk-cook", name: "Kokk", field: "service", description: "Professional chef." },
      { id: "tthk-electr", name: "Elektrik", field: "trades", description: "Licensed electrician." },
      { id: "tthk-weld", name: "Keevitaja", field: "trades", description: "Professional welder." },
      { id: "tthk-build", name: "Ehitusviimistleja", field: "trades", description: "Construction finisher." },
    ],
  },
  {
    id: "tkhk",
    name: "Tartu Kutsehariduskeskus",
    city: "Tartu",
    type: "vocational",
    acceptsAfter9: true,
    website: "https://khk.ee",
    description: "Tartu vocational education center — wide range of professions after 9th grade.",
    professions: [
      { id: "tkhk-bake", name: "Pagar-kondiiter", field: "service", description: "Baker and pastry chef." },
      { id: "tkhk-hair", name: "Juuksur", field: "service", description: "Hairdresser." },
      { id: "tkhk-mech", name: "Autotehnik", field: "trades", description: "Auto mechanic." },
      { id: "tkhk-nurse", name: "Hooldustöötaja", field: "health", description: "Healthcare assistant." },
      { id: "tkhk-it", name: "Tarkvaraarendaja", field: "tech", description: "Junior software developer." },
    ],
  },
  {
    id: "ptk",
    name: "Pärnumaa Kutsehariduskeskus",
    city: "Pärnu",
    type: "vocational",
    acceptsAfter9: true,
    website: "https://hariduskeskus.ee",
    description: "Vocational training in Pärnu region.",
    professions: [
      { id: "ptk-tour", name: "Turismikorraldaja", field: "service", description: "Tourism organizer." },
      { id: "ptk-wood", name: "Puidutöötleja", field: "trades", description: "Woodworking specialist." },
      { id: "ptk-it", name: "Nooremtarkvaraarendaja", field: "tech", description: "Junior developer." },
    ],
  },
  {
    id: "vkhk",
    name: "Võrumaa Kutsehariduskeskus",
    city: "Võru",
    type: "vocational",
    acceptsAfter9: true,
    website: "https://vkhk.ee",
    description: "Vocational center known for woodworking, IT and design.",
    professions: [
      { id: "vkhk-wood", name: "Tisler", field: "trades", description: "Cabinet maker / joiner." },
      { id: "vkhk-it", name: "IT-spetsialist", field: "tech", description: "IT specialist." },
      { id: "vkhk-design", name: "Sisekujundaja abi", field: "arts", description: "Interior design assistant." },
    ],
  },
  {
    id: "khk-ida",
    name: "Ida-Virumaa Kutsehariduskeskus",
    city: "Jõhvi / Narva",
    type: "vocational",
    acceptsAfter9: true,
    website: "https://ivkhk.ee",
    description: "Major vocational school in Eastern Estonia.",
    professions: [
      { id: "ivkhk-chem", name: "Keemiatehnoloogia", field: "science", description: "Chemical technology operator." },
      { id: "ivkhk-mech", name: "Mehhatroonik", field: "tech", description: "Mechatronics technician." },
      { id: "ivkhk-cook", name: "Kokk", field: "service", description: "Professional chef." },
    ],
  },
];

export const allProfessions = schools.flatMap((s) =>
  s.professions.map((p) => ({ ...p, schoolId: s.id, schoolName: s.name }))
);

export const fieldLabels: Record<Profession["field"], string> = {
  tech: "Technology & IT",
  health: "Health & Medicine",
  business: "Business & Economics",
  arts: "Arts & Design",
  science: "Science & Nature",
  social: "Social & Humanities",
  trades: "Skilled Trades",
  service: "Service & Hospitality",
};
