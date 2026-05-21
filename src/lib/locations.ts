// ============================================================
// Shared Data Layer — Single source of truth for locations & clues
// ============================================================

// --- Type Definitions ---

export interface TargetLocation {
  id: number;
  cluster: number;
  name: string;
  lat: number;
  lng: number;
}

export interface ClueItem {
  id: string;
  text: string;
}

// --- Cluster Names ---

export const CLUSTER_NAMES: Record<number, string> = {
  1: "Pasar Seni",
  2: "KLCC",
};

// --- Target Locations (GPS coordinates unchanged) ---

export const TARGET_LOCATIONS: TargetLocation[] = [
  // Cluster 1 — Pasar Seni (8 POIs)
  { id: 1,  cluster: 1, name: "POI 1", lat: 3.144353, lng: 101.695690 },
  { id: 2,  cluster: 1, name: "POI 2", lat: 3.146150, lng: 101.695775 },
  { id: 3,  cluster: 1, name: "POI 3", lat: 3.147089, lng: 101.695909 },
  { id: 4,  cluster: 1, name: "POI 4", lat: 3.145767, lng: 101.696159 },
  { id: 5,  cluster: 1, name: "POI 5", lat: 3.143695, lng: 101.697860 },
  { id: 6,  cluster: 1, name: "POI 6", lat: 3.142462, lng: 101.697955 },
  { id: 7,  cluster: 1, name: "POI 7", lat: 3.142612, lng: 101.696539 },
  { id: 8,  cluster: 1, name: "POI 8", lat: 3.144143, lng: 101.696682 },
  // Cluster 2 — KLCC (5 POIs)
  { id: 9,  cluster: 2, name: "POI 1", lat: 3.160750, lng: 101.708306 },
  { id: 10, cluster: 2, name: "POI 2", lat: 3.158797, lng: 101.710608 },
  { id: 11, cluster: 2, name: "POI 3", lat: 3.156263, lng: 101.713009 },
  { id: 12, cluster: 2, name: "POI 4", lat: 3.156206, lng: 101.713772 },
  { id: 13, cluster: 2, name: "POI 5", lat: 3.156767, lng: 101.716090 },
];

// --- Clue Definitions ---

export const CLUSTER_CLUES: Record<number, ClueItem[]> = {
  // Pasar Seni — 8 clues
  1: [
    { id: "ps-1", text: "A lost person will probably find this" },
    { id: "ps-2", text: "northeast central market, might wanna take a step back" },
    { id: "ps-3", text: "what do you get when you throw butter out of a window?" },
    { id: "ps-4", text: "transformers: dark of the moon" },
    { id: "ps-5", text: "hokkien mee is red, no such thing as PRAWN NOODLE" },
    { id: "ps-6", text: "Why did the chicken cross the road?" },
    { id: "ps-7", text: "AIESEC logo" },
    { id: "ps-8", text: "When was this tokong built?" },
  ],
  // KLCC — 5 clues
  2: [
    { id: "klcc-1", text: "What is this bridge?" },
    { id: "klcc-2", text: "Azizulhasni \"The Pocket Rocketman\" Awang" },
    { id: "klcc-3", text: "someone may find the code sitting with remarkably bad posture" },
    { id: "klcc-4", text: "have you checked both sides of the bridge?" },
    { id: "klcc-5", text: "take a seat and stretch your neck" },
  ],
};
