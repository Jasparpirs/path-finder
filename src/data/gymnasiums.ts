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
  { id: "polva-g", name: "Põlva Gümnaasium", city: "Põlva", website: "https://polvagymnaasium.edu.ee", description: "Põlvamaa riigigümnaasium." },
  { id: "jogeva-g", name: "Jõgevamaa Gümnaasium", city: "Jõgeva", website: "https://jmg.edu.ee", description: "Jõgevamaa riigigümnaasium." },
  { id: "tapa-g", name: "Tapa Gümnaasium", city: "Tapa", website: "https://tapagymnaasium.ee", description: "Lääne-Viru gümnaasium." },
  { id: "kuressaare-g", name: "Kuressaare Gümnaasium", city: "Kuressaare", website: "https://oesel.edu.ee", description: "Saaremaa suurim gümnaasium." },
  { id: "viimsi-g", name: "Viimsi Gümnaasium", city: "Viimsi", website: "https://viimsigymnaasium.ee", description: "Moodne Harjumaa gümnaasium." },
  { id: "saku-g", name: "Saku Gümnaasium", city: "Saku", website: "https://sakugymnaasium.ee", description: "Harjumaa gümnaasium." },
  { id: "kohila-g", name: "Kohila Gümnaasium", city: "Kohila", website: "https://kohilag.edu.ee", description: "Rapla maakonna gümnaasium." },
  { id: "rapla-g", name: "Rapla Gümnaasium", city: "Rapla", website: "https://raplag.edu.ee", description: "Raplamaa riigigümnaasium." },
  { id: "kuristiku", name: "Tallinna Kuristiku Gümnaasium", city: "Tallinn", website: "https://kuristiku.edu.ee", description: "Lasnamäe linnaosa suur gümnaasium." },
  { id: "kadriorg", name: "Kadrioru Saksa Gümnaasium", city: "Tallinn", website: "https://ksg.edu.ee", description: "Saksa keele süvaõppega kool." },
  { id: "mustamae", name: "Tallinna Mustamäe Gümnaasium", city: "Tallinn", website: "https://mustamaegumnaasium.ee", description: "Mustamäe riigigümnaasium." },
  { id: "laane-g", name: "Lääne-Tallinna Riigigümnaasium", city: "Tallinn", website: "https://ltrg.edu.ee", description: "Põhja-Tallinna riigigümnaasium." },
  { id: "tonismae", name: "Tallinna Tõnismäe Reaalkool", city: "Tallinn", website: "https://tonismae.edu.ee", description: "Reaalsuunaga vene õppekeelega kool." },
  { id: "ehte", name: "Tallinna Ehte Humanitaargümnaasium", city: "Tallinn", website: "https://ehte.edu.ee", description: "Humanitaarsuunaga gümnaasium." },
  { id: "audentes", name: "Audentese Erakool", city: "Tallinn", website: "https://audentes.ee", description: "Spordiakadeemia ja IB-programm." },
  { id: "vhk", name: "Vanalinna Hariduskolleegium", city: "Tallinn", website: "https://vhk.ee", description: "Klassikaliste väärtuste ja muusikatraditsiooniga kool." },
  { id: "narva-pahkla", name: "Narva Pähklimäe Gümnaasium", city: "Narva", website: "https://pahklimae.edu.ee", description: "Narva mitmekülgne gümnaasium." },
  { id: "sillamae-g", name: "Sillamäe Gümnaasium", city: "Sillamäe", website: "https://sillamaegymnaasium.ee", description: "Ida-Viru riigigümnaasium." },
  { id: "tartu-tamme", name: "Tartu Tamme Gümnaasium", city: "Tartu", website: "https://tamme.tartu.ee", description: "Loodussuunaga riigigümnaasium." },
  { id: "tartu-kjpg", name: "Tartu Kristjan Jaak Petersoni Gümnaasium", city: "Tartu", website: "https://kjpg.tartu.ee", description: "Tartu uuem riigigümnaasium." },
  { id: "elva-g", name: "Elva Gümnaasium", city: "Elva", website: "https://elvag.edu.ee", description: "Tartumaa riigigümnaasium." },
  { id: "otepaa", name: "Otepää Gümnaasium", city: "Otepää", website: "https://nuustaku.edu.ee", description: "Talispordisuunaga gümnaasium." },
  { id: "narva-keelg", name: "Narva Keeltelütseum", city: "Narva", website: "https://nkl.edu.ee", description: "Keelte süvaõppega gümnaasium." },
  { id: "parnu-yhis", name: "Pärnu Ühisgümnaasium", city: "Pärnu", website: "https://yhis.parnu.ee", description: "Pärnu suur riigigümnaasium." },
  { id: "kilingi", name: "Kilingi-Nõmme Gümnaasium", city: "Kilingi-Nõmme", website: "https://knk.edu.ee", description: "Pärnumaa väike gümnaasium." },
  { id: "tarvastu", name: "Tarvastu Gümnaasium", city: "Mustla", website: "https://tarvastu.edu.ee", description: "Viljandimaa gümnaasium." },
];
