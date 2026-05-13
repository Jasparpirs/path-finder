import type { Profession } from "./schools";

export type Field = Profession["field"];

export interface QuizOption {
  label: string;
  weights: Partial<Record<Field, number>>;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
}

export const questions: QuizQuestion[] = [
  {
    id: "q1",
    question: "Which activity sounds most fun on a free Saturday?",
    options: [
      { label: "Building or fixing something with my hands", weights: { trades: 3, tech: 1 } },
      { label: "Coding a small app or playing with a computer", weights: { tech: 3, science: 1 } },
      { label: "Drawing, designing or making music", weights: { arts: 3 } },
      { label: "Helping a friend or volunteering", weights: { social: 3, health: 2 } },
      { label: "Reading about science or nature", weights: { science: 3, health: 1 } },
      { label: "Cooking a meal for friends", weights: { service: 3, trades: 1 } },
    ],
  },
  {
    id: "q2",
    question: "Which school subject do you enjoy the most?",
    options: [
      { label: "Math & Physics", weights: { tech: 2, science: 2, business: 1 } },
      { label: "Biology & Chemistry", weights: { health: 3, science: 2 } },
      { label: "Art & Music", weights: { arts: 3 } },
      { label: "Languages & History", weights: { social: 3, arts: 1 } },
      { label: "Economics & Social Studies", weights: { business: 3, social: 1 } },
      { label: "Crafts / Workshop", weights: { trades: 3, service: 1 } },
    ],
  },
  {
    id: "q3",
    question: "How long do you want to study?",
    options: [
      { label: "I want to start working soon (after 9th grade)", weights: { trades: 3, service: 2, tech: 1 } },
      { label: "A few years of practical training", weights: { trades: 2, service: 2, health: 1 } },
      { label: "A full university degree (3–6 years)", weights: { science: 2, health: 2, social: 2, business: 2, tech: 1 } },
    ],
  },
  {
    id: "q4",
    question: "What kind of work environment do you prefer?",
    options: [
      { label: "Workshop, outdoors or on-site", weights: { trades: 3, science: 1 } },
      { label: "Office or in front of a computer", weights: { tech: 3, business: 2 } },
      { label: "Hospital, clinic or care setting", weights: { health: 3, social: 1 } },
      { label: "Studio, stage or creative space", weights: { arts: 3 } },
      { label: "Restaurant, hotel or shop", weights: { service: 3 } },
      { label: "Lab or research facility", weights: { science: 3, health: 1 } },
    ],
  },
  {
    id: "q5",
    question: "Which of these matters most to you in a job?",
    options: [
      { label: "Helping people directly", weights: { health: 3, social: 2, service: 1 } },
      { label: "Solving puzzles and logic problems", weights: { tech: 3, science: 2 } },
      { label: "Creating something beautiful", weights: { arts: 3 } },
      { label: "Earning good money & leadership", weights: { business: 3, tech: 1 } },
      { label: "Seeing a finished, physical result", weights: { trades: 3, service: 1 } },
      { label: "Discovering how the world works", weights: { science: 3 } },
    ],
  },
  {
    id: "q6",
    question: "Pick a personal strength:",
    options: [
      { label: "Patient and careful with details", weights: { health: 2, science: 2, trades: 1, arts: 1 } },
      { label: "Creative and imaginative", weights: { arts: 3, tech: 1 } },
      { label: "Analytical and logical", weights: { tech: 3, science: 2, business: 1 } },
      { label: "Empathetic and good listener", weights: { social: 3, health: 2 } },
      { label: "Practical and hands-on", weights: { trades: 3, service: 2 } },
      { label: "Persuasive and organised", weights: { business: 3, social: 1 } },
    ],
  },
];
