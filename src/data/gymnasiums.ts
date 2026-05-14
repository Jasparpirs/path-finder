export interface Gymnasium {
  id: string;
  name: string;
  city: string;
  website: string;
  description: string;
}

/** Tuntumad Eesti gümnaasiumid, kuhu saab pärast 9. klassi õppima minna. */
export const gymnasiums: Gymnasium[] = [
  { id: "reaal", name: "Tallinna Reaalkool", city: "Tallinn", website: "https://real.edu.ee", description: "Üks Eesti tugevamaid reaalkallakuga gümnaasiume." },
  { id: "ga", name: "Gustav Adolfi Gümnaasium", city: "Tallinn", website: "https://gag.ee", description: "Vanim Eesti gümnaasium, lai õppesuundade valik." },
  { id: "21k", name: "Tallinna 21. Kool", city: "Tallinn", website: "https://21k.ee", description: "Tugev humanitaar- ja keelteõppega gümnaasium." },
  { id: "tfg", name: "Tallinna Inglise Kolledž", city: "Tallinn", website: "https://tik.edu.ee", description: "Inglise keele süvaõppe ja IB-programmiga kool." },
  { id: "fr", name: "Tallinna Prantsuse Lütseum", city: "Tallinn", website: "https://tpl.edu.ee", description: "Prantsuse keele ja kultuuri süvaõpe." },
  { id: "rocca", name: "Rocca al Mare Kool", city: "Tallinn", website: "https://ramkool.ee", description: "Erakool laia akadeemilise programmiga." },
  { id: "treffner", name: "Hugo Treffneri Gümnaasium", city: "Tartu", website: "https://htg.tartu.ee", description: "Üks parimaid Eesti gümnaasiume, tugev reaal- ja loodussuund." },
  { id: "tmg", name: "Miina Härma Gümnaasium", city: "Tartu", website: "https://mhg.tartu.ee", description: "IB-programm ja keelesuunad." },
  { id: "tjk", name: "Tartu Jaan Poska Gümnaasium", city: "Tartu", website: "https://jpg.tartu.ee", description: "Mitmekülgne riigigümnaasium Tartus." },
  { id: "njp", name: "Nõo Reaalgümnaasium", city: "Nõo", website: "https://nrg.ee", description: "Reaalainete süvaõppega kool." },
  { id: "kuressaare", name: "Saaremaa Ühisgümnaasium", city: "Kuressaare", website: "https://syg.edu.ee", description: "Saaremaa juhtiv gümnaasium." },
  { id: "viljandi-g", name: "Viljandi Gümnaasium", city: "Viljandi", website: "https://viljandigymnaasium.ee", description: "Riigigümnaasium laia õppesuundade valikuga." },
  { id: "parnu-g", name: "Pärnu Sütevaka Humanitaargümnaasium", city: "Pärnu", website: "https://sytevaka.ee", description: "Tugeva humanitaarsuunaga erakool." },
  { id: "narva-g", name: "Narva Soldino Gümnaasium", city: "Narva", website: "https://soldino.edu.ee", description: "Suurim Narva gümnaasium." },
  { id: "rakvere-g", name: "Rakvere Riigigümnaasium", city: "Rakvere", website: "https://rrg.edu.ee", description: "Lääne-Viru moodne riigigümnaasium." },
  { id: "haapsalu-g", name: "Läänemaa Ühisgümnaasium", city: "Haapsalu", website: "https://lyg.edu.ee", description: "Haapsalu riigigümnaasium." },
  { id: "kohtla-g", name: "Jõhvi Gümnaasium", city: "Jõhvi", website: "https://johvig.edu.ee", description: "Ida-Viru riigigümnaasium." },
  { id: "voru-g", name: "Võru Gümnaasium", city: "Võru", website: "https://vorugymnaasium.ee", description: "Lõuna-Eesti riigigümnaasium." },
  { id: "paide-g", name: "Paide Gümnaasium", city: "Paide", website: "https://paidegymnaasium.ee", description: "Järvamaa riigigümnaasium." },
  { id: "valga-g", name: "Valga Gümnaasium", city: "Valga", website: "https://valgagymnaasium.ee", description: "Lõuna-Eesti riigigümnaasium." },
];
