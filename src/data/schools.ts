export type SchoolType = "university" | "vocational" | "applied";

export type Field =
  | "tech"
  | "health"
  | "business"
  | "arts"
  | "science"
  | "social"
  | "trades"
  | "service"
  | "agri"
  | "security"
  | "transport"
  | "education";

export interface Profession {
  id: string;
  name: string;
  field: Field;
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

export const fieldLabels: Record<Field, string> = {
  tech: "Tehnoloogia ja IT",
  health: "Tervis ja meditsiin",
  business: "Majandus ja ettevõtlus",
  arts: "Kunst ja disain",
  science: "Loodusteadused",
  social: "Sotsiaal- ja humanitaaria",
  trades: "Käsitöö ja tehnika",
  service: "Teenindus ja toitlustus",
  agri: "Põllumajandus ja toiduainetööstus",
  security: "Turvalisus ja kaitse",
  transport: "Transport ja logistika",
  education: "Haridus ja kasvatus",
};

export const typeLabels: Record<SchoolType, string> = {
  university: "Ülikool",
  applied: "Rakenduskõrgkool",
  vocational: "Kutsekool",
};

export const schools: School[] = [
  // ===== UNIVERSITIES =====
  {
    id: "taltech",
    name: "Tallinna Tehnikaülikool (TalTech)",
    city: "Tallinn",
    type: "university",
    acceptsAfter9: false,
    website: "https://taltech.ee",
    description: "Eesti ainus tehnikaülikool — inseneeria, IT, majandus ja loodusteadused.",
    professions: [
      { id: "tt-cs", name: "Tarkvaratehnika", field: "tech", description: "Veebi- ja mobiilirakenduste, süsteemide ehitamine." },
      { id: "tt-cyber", name: "Küberturvalisus", field: "tech", description: "Süsteemide ja andmete kaitse rünnakute eest." },
      { id: "tt-ai", name: "Andmeteadus ja tehisintellekt", field: "tech", description: "Andmete analüüs ja masinõppe mudelid." },
      { id: "tt-civil", name: "Ehitusinseneeria", field: "science", description: "Hoonete, sildade ja taristu projekteerimine." },
      { id: "tt-mech", name: "Mehhatroonika", field: "tech", description: "Mehaanika, elektroonika ja tarkvara koos." },
      { id: "tt-bus", name: "Ärindus ja juhtimine", field: "business", description: "Ettevõtete juhtimine, finants ja strateegia." },
      { id: "tt-energy", name: "Energiatehnoloogia", field: "science", description: "Taastuvenergia ja energiasüsteemid." },
      { id: "tt-arch", name: "Arhitektuur ja linnaplaneerimine", field: "arts", description: "Hoonete ja linnaruumi kujundamine." },
    ],
  },
  {
    id: "ut",
    name: "Tartu Ülikool",
    city: "Tartu",
    type: "university",
    acceptsAfter9: false,
    website: "https://ut.ee",
    description: "Eesti rahvusülikool — meditsiin, õigus, loodus- ja humanitaarteadused.",
    professions: [
      { id: "ut-med", name: "Arstiteadus", field: "health", description: "Saa arstiks, 6-aastane õpe." },
      { id: "ut-dent", name: "Hambaarstiteadus", field: "health", description: "Hambaarsti haridus." },
      { id: "ut-pharm", name: "Proviisor", field: "health", description: "Apteegi- ja ravimiala spetsialist." },
      { id: "ut-law", name: "Õigusteadus", field: "social", description: "Juristi ja kohtuniku ettevalmistus." },
      { id: "ut-psych", name: "Psühholoogia", field: "social", description: "Inimese psüühika ja käitumise uurimine." },
      { id: "ut-bio", name: "Bioloogia", field: "science", description: "Eluprotsesside ja ökosüsteemide uurimine." },
      { id: "ut-cs", name: "Informaatika", field: "tech", description: "Programmeerimine ja arvutiteadus." },
      { id: "ut-econ", name: "Majandusteadus", field: "business", description: "Majanduse ja andmeanalüüsi õpe." },
      { id: "ut-teach", name: "Klassiõpetaja", field: "education", description: "Algkooli õpetaja ettevalmistus." },
      { id: "ut-journ", name: "Ajakirjandus ja kommunikatsioon", field: "social", description: "Meedia ja avalik suhtlus." },
    ],
  },
  {
    id: "emu",
    name: "Eesti Maaülikool",
    city: "Tartu",
    type: "university",
    acceptsAfter9: false,
    website: "https://emu.ee",
    description: "Loodusteaduste ülikool — põllumajandus, metsandus, veterinaaria.",
    professions: [
      { id: "emu-vet", name: "Veterinaarmeditsiin", field: "health", description: "Loomaarstiks õppimine." },
      { id: "emu-forest", name: "Metsandus", field: "agri", description: "Metsade hoid ja majandamine." },
      { id: "emu-agri", name: "Põllumajandus", field: "agri", description: "Kaasaegne taimekasvatus ja loomakasvatus." },
      { id: "emu-food", name: "Toiduainete tehnoloogia", field: "agri", description: "Toidu tootmine ja ohutus." },
      { id: "emu-env", name: "Keskkonnateadus", field: "science", description: "Keskkonna kaitse ja säästev areng." },
      { id: "emu-land", name: "Maastikuarhitektuur", field: "arts", description: "Välisruumi ja parkide kujundamine." },
    ],
  },
  {
    id: "eka",
    name: "Eesti Kunstiakadeemia",
    city: "Tallinn",
    type: "university",
    acceptsAfter9: false,
    website: "https://artun.ee",
    description: "Kunsti, disaini ja arhitektuuri ülikool.",
    professions: [
      { id: "eka-arch", name: "Arhitektuur ja linnaplaneerimine", field: "arts", description: "Hoonete ja ruumi disain." },
      { id: "eka-graph", name: "Graafiline disain", field: "arts", description: "Visuaalne identiteet ja tüpograafia." },
      { id: "eka-anim", name: "Animatsioon", field: "arts", description: "Animafilmide ja visuaalide loomine." },
      { id: "eka-fashion", name: "Moedisain", field: "arts", description: "Riiete ja kollektsioonide loomine." },
      { id: "eka-prod", name: "Tootedisain", field: "arts", description: "Esemete ja toodete kujundamine." },
      { id: "eka-art", name: "Vabad kunstid", field: "arts", description: "Maal, skulptuur, fotograafia." },
    ],
  },
  {
    id: "ema",
    name: "Eesti Muusika- ja Teatriakadeemia",
    city: "Tallinn",
    type: "university",
    acceptsAfter9: false,
    website: "https://eamt.ee",
    description: "Muusika, teatri ja kultuurikorralduse kõrgkool.",
    professions: [
      { id: "ema-mus", name: "Muusika esitamine", field: "arts", description: "Klassikaline ja kaasaegne muusika." },
      { id: "ema-comp", name: "Helilooming", field: "arts", description: "Muusika loomine ja arranžeerimine." },
      { id: "ema-act", name: "Lavakunst (näitlejatöö)", field: "arts", description: "Professionaalne näitlejakoolitus." },
      { id: "ema-cult", name: "Kultuurikorraldus", field: "business", description: "Kultuuriürituste juhtimine." },
    ],
  },
  {
    id: "tlu",
    name: "Tallinna Ülikool",
    city: "Tallinn",
    type: "university",
    acceptsAfter9: false,
    website: "https://tlu.ee",
    description: "Humanitaaria, haridus, digimeedia ja sotsiaalteadused.",
    professions: [
      { id: "tlu-teach", name: "Õpetajakoolitus", field: "education", description: "Aine- ja klassiõpetaja." },
      { id: "tlu-media", name: "Digimeedia ja interaktsioonidisain", field: "arts", description: "Digitaalne sisuloome ja kasutajaliidesed." },
      { id: "tlu-soc", name: "Sotsiaaltöö", field: "social", description: "Inimeste abistamine sotsiaaltöö kaudu." },
      { id: "tlu-psych", name: "Psühholoogia", field: "social", description: "Käitumise ja vaimu uurimine." },
      { id: "tlu-history", name: "Ajalugu", field: "social", description: "Mineviku uurimine ja tõlgendamine." },
      { id: "tlu-film", name: "Kino ja meedia", field: "arts", description: "Filmilavastus ja meediatootmine." },
    ],
  },
  // ===== APPLIED UNIVERSITIES =====
  {
    id: "ttk",
    name: "Tallinna Tehnikakõrgkool (TTK)",
    city: "Tallinn",
    type: "applied",
    acceptsAfter9: false,
    website: "https://tktk.ee",
    description: "Praktiline insenerikool — tehnika, logistika, disain.",
    professions: [
      { id: "ttk-log", name: "Logistika", field: "transport", description: "Tarneahel ja transpordijuhtimine." },
      { id: "ttk-auto", name: "Autotehnika", field: "tech", description: "Sõidukite tehnika ja elektroonika." },
      { id: "ttk-build", name: "Hooneehitus", field: "trades", description: "Ehitusobjektide juhtimine." },
      { id: "ttk-cloth", name: "Rõivadisain ja tehnoloogia", field: "arts", description: "Moedisaini praktiline õpe." },
      { id: "ttk-rdwy", name: "Teedeehitus", field: "trades", description: "Teede ja taristu projekteerimine." },
    ],
  },
  {
    id: "lcc",
    name: "Eesti Lennuakadeemia",
    city: "Tartu",
    type: "applied",
    acceptsAfter9: false,
    website: "https://lennuakadeemia.ee",
    description: "Lennundusala kõrgkool — piloodid, mehaanikud, lennujuhid.",
    professions: [
      { id: "la-pilot", name: "Õhusõiduki juht (piloot)", field: "transport", description: "Lennukite ja kopterite juhtimine." },
      { id: "la-atc", name: "Lennuliiklusteenindus", field: "transport", description: "Lennujuhi amet." },
      { id: "la-mech", name: "Õhusõidukite hooldus", field: "tech", description: "Lennukite tehnik." },
    ],
  },
  {
    id: "smk",
    name: "Tervishoiu Kõrgkool",
    city: "Tallinn",
    type: "applied",
    acceptsAfter9: false,
    website: "https://ttk.ee/et",
    description: "Tallinna Tervishoiu Kõrgkool — õed, ämmaemandad, terapeudid.",
    professions: [
      { id: "smk-nurse", name: "Õde", field: "health", description: "Õe kutseharidus haiglatöö jaoks." },
      { id: "smk-midw", name: "Ämmaemand", field: "health", description: "Sünnituste ja naistetervise spetsialist." },
      { id: "smk-physio", name: "Füsioterapeut", field: "health", description: "Kehalise taastusravi spetsialist." },
      { id: "smk-radio", name: "Radioloogiatehnik", field: "health", description: "Pildidiagnostika spetsialist." },
    ],
  },
  {
    id: "sks",
    name: "Sisekaitseakadeemia",
    city: "Tallinn / Paikuse",
    type: "applied",
    acceptsAfter9: false,
    website: "https://sisekaitse.ee",
    description: "Politsei, päästja, piirivalvur, vanglaametnik, maksuamet.",
    professions: [
      { id: "sk-pol", name: "Politseiametnik", field: "security", description: "Patrulli- ja kriminaalpolitsei töö." },
      { id: "sk-rescue", name: "Päästja", field: "security", description: "Tulekahjud, õnnetused, päästetööd." },
      { id: "sk-border", name: "Piirivalvur", field: "security", description: "Piiri turvalisus ja kontroll." },
      { id: "sk-cust", name: "Maksu- ja tolliametnik", field: "security", description: "Maksunduse ja piiril toimuva järelevalve." },
    ],
  },
  {
    id: "eek",
    name: "Eesti Ettevõtluskõrgkool Mainor",
    city: "Tallinn / Tartu",
    type: "applied",
    acceptsAfter9: false,
    website: "https://eek.ee",
    description: "Erakõrgkool ettevõtluse, turunduse ja IT alal.",
    professions: [
      { id: "eek-mark", name: "Turundus ja kommunikatsioon", field: "business", description: "Turundusstrateegia ja brändijuhtimine." },
      { id: "eek-it", name: "IT-süsteemide arendus", field: "tech", description: "Ärirakenduste arendus." },
      { id: "eek-bus", name: "Ettevõtlus ja äriinfotehnoloogia", field: "business", description: "Oma ettevõtte loomine." },
    ],
  },
  // ===== VOCATIONAL (after 9th grade) =====
  {
    id: "tthk",
    name: "Tallinna Tööstushariduskeskus",
    city: "Tallinn",
    type: "vocational",
    acceptsAfter9: true,
    website: "https://tthk.ee",
    description: "Üks Eesti suurimaid kutsekoole — IT, ehitus, autotehnika, toitlustus.",
    professions: [
      { id: "tthk-it", name: "IT-süsteemide nooremspetsialist", field: "tech", description: "IT-tugi ja võrkude haldus." },
      { id: "tthk-dev", name: "Tarkvaraarendaja", field: "tech", description: "Veebi- ja mobiilirakenduste arendus." },
      { id: "tthk-cook", name: "Kokk", field: "service", description: "Professionaalne kokakoolitus." },
      { id: "tthk-electr", name: "Elektrik", field: "trades", description: "Elektritööd ja paigaldus." },
      { id: "tthk-weld", name: "Keevitaja", field: "trades", description: "Metallikonstruktsioonide keevitus." },
      { id: "tthk-build", name: "Ehitusviimistleja", field: "trades", description: "Hoonete sisetööd." },
      { id: "tthk-mech", name: "Autotehnik", field: "trades", description: "Sõidukite remont." },
      { id: "tthk-print", name: "Trükitehnoloog", field: "arts", description: "Trükitööstus ja graafika." },
    ],
  },
  {
    id: "tkhk",
    name: "Tartu Rakenduslik Kolledž (VOCO)",
    city: "Tartu",
    type: "vocational",
    acceptsAfter9: true,
    website: "https://voco.ee",
    description: "Suur kutsekool Tartus — laia valikuga erialad pärast 9. klassi.",
    professions: [
      { id: "voco-bake", name: "Pagar-kondiiter", field: "service", description: "Leivad, saiad, koogid." },
      { id: "voco-hair", name: "Juuksur", field: "service", description: "Juuksuri kutseharidus." },
      { id: "voco-cosm", name: "Kosmeetik", field: "service", description: "Iluteenused ja näohooldus." },
      { id: "voco-mech", name: "Autotehnik", field: "trades", description: "Autode hooldus ja remont." },
      { id: "voco-care", name: "Hooldustöötaja", field: "health", description: "Vanurite ja patsientide hooldus." },
      { id: "voco-it", name: "Tarkvaraarendaja", field: "tech", description: "Programmeerimine algajatele." },
      { id: "voco-design", name: "Multimeedia spetsialist", field: "arts", description: "Video, foto, disain." },
      { id: "voco-tour", name: "Turismikorraldaja", field: "service", description: "Reiside ja ürituste korraldamine." },
    ],
  },
  {
    id: "ptk",
    name: "Pärnumaa Kutsehariduskeskus",
    city: "Pärnu",
    type: "vocational",
    acceptsAfter9: true,
    website: "https://hariduskeskus.ee",
    description: "Pärnu kutsekool — turism, IT, käsitöö.",
    professions: [
      { id: "ptk-tour", name: "Turismikorraldaja", field: "service", description: "Turismi- ja vabaajaürituste korraldus." },
      { id: "ptk-wood", name: "Puidutöötleja", field: "trades", description: "Puidu töötlemine ja viimistlus." },
      { id: "ptk-it", name: "Nooremtarkvaraarendaja", field: "tech", description: "Veebiarendus algajatele." },
      { id: "ptk-cook", name: "Kokk", field: "service", description: "Toitlustusala kutse." },
      { id: "ptk-hotel", name: "Hotelliteenindaja", field: "service", description: "Majutusasutuse teenindus." },
    ],
  },
  {
    id: "vkhk",
    name: "Võrumaa Haridus- ja Tehnoloogiakeskus",
    city: "Võru",
    type: "vocational",
    acceptsAfter9: true,
    website: "https://vkhk.ee",
    description: "Tuntud puidutöö, IT ja disaini poolest.",
    professions: [
      { id: "vkhk-wood", name: "Tisler", field: "trades", description: "Mööbli ja sisustuselementide valmistamine." },
      { id: "vkhk-it", name: "IT-spetsialist", field: "tech", description: "Süsteemide hooldus." },
      { id: "vkhk-design", name: "Sisekujundaja abi", field: "arts", description: "Interjööri kujundamine." },
      { id: "vkhk-cnc", name: "CNC-operaator", field: "trades", description: "Arvjuhtimisega pinkide kasutamine." },
    ],
  },
  {
    id: "ivkhk",
    name: "Ida-Virumaa Kutsehariduskeskus",
    city: "Jõhvi / Narva / Sillamäe",
    type: "vocational",
    acceptsAfter9: true,
    website: "https://ivkhk.ee",
    description: "Suurim kutsekool Ida-Virumaal.",
    professions: [
      { id: "iv-chem", name: "Keemiatehnoloogia", field: "science", description: "Keemiatööstuse operaator." },
      { id: "iv-mech", name: "Mehhatroonik", field: "tech", description: "Tööstusseadmete hooldus." },
      { id: "iv-cook", name: "Kokk", field: "service", description: "Toitlustamise kutse." },
      { id: "iv-log", name: "Logistik", field: "transport", description: "Veose- ja laologistika." },
      { id: "iv-weld", name: "Keevitaja", field: "trades", description: "Metallitöö." },
    ],
  },
  {
    id: "kpk",
    name: "Kuressaare Ametikool",
    city: "Kuressaare",
    type: "vocational",
    acceptsAfter9: true,
    website: "https://ametikool.ee",
    description: "Saaremaa kutsekool — laevaehitus, IT, toitlustus.",
    professions: [
      { id: "kpk-boat", name: "Väikelaevaehitaja", field: "trades", description: "Paatide ja jahtide ehitus." },
      { id: "kpk-it", name: "IT-süsteemide nooremspetsialist", field: "tech", description: "Arvutivõrkude tugi." },
      { id: "kpk-cook", name: "Kokk", field: "service", description: "Restoranitöö." },
    ],
  },
  {
    id: "rkhk",
    name: "Rakvere Ametikool",
    city: "Rakvere",
    type: "vocational",
    acceptsAfter9: true,
    website: "https://rak.ee",
    description: "Lääne-Virumaa kutsekool — IT, turism, käsitöö.",
    professions: [
      { id: "rk-it", name: "IT-süsteemide spetsialist", field: "tech", description: "Tehniline tugi." },
      { id: "rk-cook", name: "Kokk", field: "service", description: "Toitlustus." },
      { id: "rk-floor", name: "Florist", field: "arts", description: "Lillede kujundamine." },
      { id: "rk-care", name: "Hooldustöötaja", field: "health", description: "Tervishoiu hooldus." },
    ],
  },
  {
    id: "vamk",
    name: "Valgamaa Kutseõppekeskus",
    city: "Valga",
    type: "vocational",
    acceptsAfter9: true,
    website: "https://vkok.ee",
    description: "Lõuna-Eesti kutsekool — autotehnika, ehitus, toitlustus.",
    professions: [
      { id: "vk-auto", name: "Autotehnik", field: "trades", description: "Sõidukite hooldus." },
      { id: "vk-build", name: "Müürsepp", field: "trades", description: "Ehitustöö ja müüritöö." },
      { id: "vk-cook", name: "Kokk", field: "service", description: "Toitlustus." },
    ],
  },
  {
    id: "haapsalu",
    name: "Haapsalu Kutsehariduskeskus",
    city: "Haapsalu",
    type: "vocational",
    acceptsAfter9: true,
    website: "https://hkhk.edu.ee",
    description: "Lääne-Eesti kutsekool.",
    professions: [
      { id: "ha-care", name: "Hooldustöötaja", field: "health", description: "Hooldekodu ja haigla töö." },
      { id: "ha-cook", name: "Kokk", field: "service", description: "Toitlustamine." },
      { id: "ha-it", name: "IT-spetsialist", field: "tech", description: "Arvutid ja võrgud." },
    ],
  },
  {
    id: "olustvere",
    name: "Olustvere Teenindus- ja Maamajanduskool",
    city: "Olustvere",
    type: "vocational",
    acceptsAfter9: true,
    website: "https://olustvere.edu.ee",
    description: "Maamajandus, käsitöö, mahetoit.",
    professions: [
      { id: "ol-farm", name: "Põllumajandustootja", field: "agri", description: "Talupidamine ja taimekasvatus." },
      { id: "ol-cheese", name: "Juustumeister", field: "agri", description: "Piimatoodete tehnoloogia." },
      { id: "ol-craft", name: "Käsitöömeister", field: "arts", description: "Rahvuslik käsitöö." },
    ],
  },
  {
    id: "luua",
    name: "Luua Metsanduskool",
    city: "Luua",
    type: "vocational",
    acceptsAfter9: true,
    website: "https://luua.ee",
    description: "Eesti ainus metsandusele spetsialiseerunud kutsekool.",
    professions: [
      { id: "lu-forest", name: "Metsur", field: "agri", description: "Metsa raie ja hooldus." },
      { id: "lu-arb", name: "Arborist", field: "agri", description: "Puuhooldusspetsialist." },
      { id: "lu-mach", name: "Metsamasina operaator", field: "trades", description: "Harvesteri ja forwardi juhtimine." },
    ],
  },
  {
    id: "rmk",
    name: "Räpina Aianduskool",
    city: "Räpina",
    type: "vocational",
    acceptsAfter9: true,
    website: "https://aianduskool.ee",
    description: "Aianduse, maastikuehituse ja keskkonna kutsekool.",
    professions: [
      { id: "ra-gard", name: "Maastikuehitaja", field: "agri", description: "Aedade ja maastiku rajamine." },
      { id: "ra-flor", name: "Florist", field: "arts", description: "Lilleseaded ja kompositsioonid." },
      { id: "ra-keep", name: "Aednik", field: "agri", description: "Taimede kasvatamine." },
    ],
  },
];

export const allProfessions = schools.flatMap((s) =>
  s.professions.map((p) => ({ ...p, schoolId: s.id, schoolName: s.name, schoolCity: s.city, schoolType: s.type, acceptsAfter9: s.acceptsAfter9 }))
);
