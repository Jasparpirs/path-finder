import type { Field } from "./schools";

export interface QuizOption {
  label: string;
  weights: Partial<Record<Field, number>>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

// Bigger, more accurate quiz — 12 questions covering subjects, environment,
// values, social style, school plans, hands-on vs theoretical, etc.
export const questions: QuizQuestion[] = [
  {
    id: "q1",
    question: "Millise tegevusega veedaksid hea meelega vaba laupäeva?",
    options: [
      { label: "Ehitan, parandan või meisterdan midagi käsitsi", weights: { trades: 3, agri: 1 } },
      { label: "Programmeerin, häkin või mängin arvutiga", weights: { tech: 3, science: 1 } },
      { label: "Joonistan, disainin või loon muusikat", weights: { arts: 3 } },
      { label: "Aitan sõpra või teen vabatahtlikku tööd", weights: { social: 3, health: 2, education: 2 } },
      { label: "Loen teadusraamatuid või teen katseid", weights: { science: 3, health: 1 } },
      { label: "Küpsetan ja korraldan õhtusöögi sõpradele", weights: { service: 3, agri: 1 } },
      { label: "Treenin, jooksen, sõidan rattaga, olen looduses", weights: { security: 2, agri: 2 } },
      { label: "Müün asju internetis või loon väikese projekti", weights: { business: 3, tech: 1 } },
    ],
  },
  {
    id: "q2",
    question: "Millist kooliainet naudid kõige rohkem?",
    options: [
      { label: "Matemaatika ja füüsika", weights: { tech: 2, science: 2, business: 1 } },
      { label: "Bioloogia ja keemia", weights: { health: 3, science: 2, agri: 1 } },
      { label: "Kunst ja muusika", weights: { arts: 3 } },
      { label: "Keeled ja ajalugu", weights: { social: 3, education: 1, arts: 1 } },
      { label: "Ühiskonnaõpetus ja majandus", weights: { business: 3, social: 1 } },
      { label: "Tööõpetus / käsitöö", weights: { trades: 3, service: 1 } },
      { label: "Geograafia ja loodusõpetus", weights: { science: 2, agri: 2 } },
      { label: "Kehaline kasvatus", weights: { security: 2, health: 1 } },
    ],
  },
  {
    id: "q3",
    question: "Kui kaua oled valmis õppima?",
    options: [
      { label: "Tahan tööle saada võimalikult kiiresti (pärast 9. klassi)", weights: { trades: 3, service: 2, transport: 2, agri: 1 } },
      { label: "Paar aastat praktilist õpet kutsekoolis", weights: { trades: 2, service: 2, health: 1, security: 1 } },
      { label: "Gümnaasium ja siis kõrgkool (5–8 aastat)", weights: { science: 2, health: 2, social: 2, business: 2, tech: 1, education: 2 } },
      { label: "Pole kindel, sõltub erialast", weights: { tech: 1, business: 1, arts: 1, social: 1 } },
    ],
  },
  {
    id: "q4",
    question: "Millise keskkonna sa valid?",
    options: [
      { label: "Töökoda, õues või objektil", weights: { trades: 3, agri: 2 } },
      { label: "Kontor või arvuti taga", weights: { tech: 3, business: 2 } },
      { label: "Haigla, kliinik või hooldekodu", weights: { health: 3, social: 1 } },
      { label: "Stuudio, lava või loovruum", weights: { arts: 3 } },
      { label: "Restoran, hotell, pood", weights: { service: 3 } },
      { label: "Labor või uurimisasutus", weights: { science: 3, health: 1 } },
      { label: "Kool või lasteaed", weights: { education: 3, social: 2 } },
      { label: "Tee peal, sõiduki kabiinis, lennujaamas", weights: { transport: 3 } },
      { label: "Politseiauto, tuletõrjedepoo, piiripunkt", weights: { security: 3 } },
      { label: "Talu, mets, kasvuhoone", weights: { agri: 3 } },
    ],
  },
  {
    id: "q5",
    question: "Mis on töö juures kõige tähtsam?",
    options: [
      { label: "Inimeste otsene aitamine", weights: { health: 3, social: 2, education: 2, service: 1 } },
      { label: "Loogiliste mõistatuste lahendamine", weights: { tech: 3, science: 2 } },
      { label: "Millegi ilusa loomine", weights: { arts: 3 } },
      { label: "Hea palk ja juhtimine", weights: { business: 3, tech: 1 } },
      { label: "Käegakatsutav valmis tulemus", weights: { trades: 3, service: 1, agri: 1 } },
      { label: "Maailma toimimise mõistmine", weights: { science: 3 } },
      { label: "Ühiskonnale kasuks olemine", weights: { security: 2, social: 2, education: 2, health: 1 } },
      { label: "Vabadus ja iseseisvus", weights: { arts: 1, business: 2, transport: 1 } },
    ],
  },
  {
    id: "q6",
    question: "Vali oma tugevus:",
    options: [
      { label: "Kannatlik ja tähelepanelik detailides", weights: { health: 2, science: 2, trades: 1, arts: 1 } },
      { label: "Loov ja fantaasiarikas", weights: { arts: 3, tech: 1 } },
      { label: "Analüütiline ja loogiline", weights: { tech: 3, science: 2, business: 1 } },
      { label: "Empaatiline ja hea kuulaja", weights: { social: 3, health: 2, education: 2 } },
      { label: "Praktiline ja tegutsemislembene", weights: { trades: 3, service: 2, agri: 1 } },
      { label: "Veenev ja organiseeritud", weights: { business: 3, social: 1, education: 1 } },
      { label: "Distsiplineeritud ja füüsiliselt vormis", weights: { security: 3, transport: 1 } },
    ],
  },
  {
    id: "q7",
    question: "Kuidas eelistad õppida?",
    options: [
      { label: "Teen ise — käed külge", weights: { trades: 3, service: 2, agri: 2 } },
      { label: "Loen, analüüsin, arutan", weights: { social: 2, science: 2, business: 1, education: 1 } },
      { label: "Vaatan, kuidas teised teevad, ja kordan", weights: { arts: 2, service: 1, trades: 1 } },
      { label: "Lahendan ülesandeid arvutis", weights: { tech: 3, science: 1 } },
    ],
  },
  {
    id: "q8",
    question: "Eelistad töötada…",
    options: [
      { label: "Üksi keskendunult", weights: { tech: 2, arts: 2, science: 2 } },
      { label: "Väikeses meeskonnas", weights: { trades: 2, business: 1, health: 1, tech: 1 } },
      { label: "Suure publiku ees või paljude inimestega", weights: { education: 2, social: 2, arts: 1, service: 1, security: 1 } },
    ],
  },
  {
    id: "q9",
    question: "Mis sind puudutab kõige rohkem?",
    options: [
      { label: "Tehnoloogia areng ja AI", weights: { tech: 3, science: 1 } },
      { label: "Inimeste tervis", weights: { health: 3 } },
      { label: "Kliimamuutus ja keskkond", weights: { science: 2, agri: 2 } },
      { label: "Kunst ja kultuur", weights: { arts: 3 } },
      { label: "Hariduse kvaliteet", weights: { education: 3, social: 1 } },
      { label: "Turvalisus ja kuritegevus", weights: { security: 3 } },
      { label: "Toidu päritolu ja maaelu", weights: { agri: 3 } },
      { label: "Majandus ja ettevõtlus", weights: { business: 3 } },
    ],
  },
  {
    id: "q10",
    question: "Kuidas suhtud riski ja vastutusse?",
    options: [
      { label: "Naudin vastutust ja juhtimist", weights: { business: 3, security: 2, education: 1 } },
      { label: "Olen valmis riskima oma ideede pärast", weights: { business: 2, arts: 2, tech: 1 } },
      { label: "Eelistan stabiilset ja selget tööd", weights: { trades: 2, service: 2, health: 1, education: 1 } },
      { label: "Tahan, et iga viga on välistatud", weights: { health: 2, science: 2, transport: 1 } },
    ],
  },
  {
    id: "q11",
    question: "Kuidas reageerid hädaolukorras?",
    options: [
      { label: "Jään rahulikuks ja tegutsen", weights: { security: 3, health: 2, transport: 1 } },
      { label: "Mõtlen kiiresti loogilise lahenduse", weights: { tech: 2, science: 2 } },
      { label: "Toetan emotsionaalselt teisi", weights: { social: 3, health: 1, education: 1 } },
      { label: "Otsin abi ja koordineerin", weights: { business: 2, service: 1 } },
    ],
  },
  {
    id: "q12",
    question: "Millist tulemust soovid tööst näha?",
    options: [
      { label: "Valmis ehitis, masin või toode", weights: { trades: 3, agri: 1 } },
      { label: "Töötav rakendus või süsteem", weights: { tech: 3 } },
      { label: "Terve patsient või rahulik klient", weights: { health: 3, social: 1, service: 1 } },
      { label: "Kaunis kunstiteos või etendus", weights: { arts: 3 } },
      { label: "Kasvanud ettevõte või müük", weights: { business: 3 } },
      { label: "Õnnelik laps või õpilane", weights: { education: 3 } },
      { label: "Päästetud inimene või lahendatud juhtum", weights: { security: 3 } },
      { label: "Kohale jõudnud kaup või reisija", weights: { transport: 3 } },
      { label: "Korjatud saak või terve loom", weights: { agri: 3 } },
    ],
  },
  {
    id: "q13",
    question: "Kui peaksid valima ühe oskuse, mida tahad väga hästi osata, siis milline?",
    options: [
      { label: "Programmeerida ja andmeid analüüsida", weights: { tech: 3, science: 1 } },
      { label: "Joonistada, kujundada või montaažida videosid", weights: { arts: 3 } },
      { label: "Esmaabi ja inimese eest hoolitsemine", weights: { health: 3, social: 1 } },
      { label: "Sõidukit, masinat või tööriista käsitseda", weights: { transport: 2, trades: 2 } },
      { label: "Veenev rääkimine ja müügitöö", weights: { business: 3, social: 1 } },
      { label: "Toidu valmistamine ja serveerimine", weights: { service: 3 } },
      { label: "Loomi, taimi ja loodust hooldada", weights: { agri: 3 } },
      { label: "Konflikte lahendada ja korda hoida", weights: { security: 3, social: 1 } },
      { label: "Selgitada ja õpetada teisi", weights: { education: 3, social: 1 } },
    ],
  },
  {
    id: "q14",
    question: "Kui hommikul ärkad tööle, kust sa pigem leiad end?",
    options: [
      { label: "Sülearvuti ja kohvitassiga vaikses kontoris", weights: { tech: 2, business: 2, science: 1 } },
      { label: "Valges kitlis, kindad käes", weights: { health: 3, science: 1 } },
      { label: "Töövormis objektil või töökojas", weights: { trades: 3, agri: 1 } },
      { label: "Vormiriietuses operatiivteenistuses", weights: { security: 3 } },
      { label: "Stuudios, lava taga või loometöös", weights: { arts: 3 } },
      { label: "Klassi või rühma ees", weights: { education: 3 } },
      { label: "Klienditeeninduses, vastuvõtus, köögis", weights: { service: 3 } },
      { label: "Tee peal, kabiinis, terminalis", weights: { transport: 3 } },
      { label: "Põllul, metsas või kasvuhoones", weights: { agri: 3 } },
    ],
  },
  {
    id: "q15",
    question: "Mis sind enim motiveerib pikas perspektiivis?",
    options: [
      { label: "Maailma muuta uue tehnoloogiaga", weights: { tech: 3, science: 1 } },
      { label: "Elusid päästa või parandada", weights: { health: 3 } },
      { label: "Luua midagi, mis jääb püsima (hooned, esemed)", weights: { trades: 3, arts: 1 } },
      { label: "Oma ettevõte ja rahaline iseseisvus", weights: { business: 3 } },
      { label: "Inimeste elu kvaliteeti parandada", weights: { social: 2, health: 2, education: 2 } },
      { label: "Loovus ja eneseväljendus", weights: { arts: 3 } },
      { label: "Kaitsta ühiskonda ja loodust", weights: { security: 2, agri: 1, science: 1 } },
      { label: "Stabiilne töö ja kindel tulu", weights: { trades: 2, service: 2, transport: 1, education: 1 } },
    ],
  },
];

