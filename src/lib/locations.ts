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
// Each clue is keyed by the POI's numeric ID so the nearest-POI logic
// can look up the exact clue for that specific location.
// POI 3 (id: 3) has no clue — it is intentionally omitted.

export const POI_CLUES: Record<number, ClueItem> = {
  // Cluster 1 — Pasar Seni
  1:  { id: "ps-1",  text: "A lost person will probably find this" },
  2:  { id: "ps-2",  text: "Northeast central market, might wanna take a step back" },
  // POI 3 (id: 3) — no clue needed, omitted intentionally
  4:  { id: "ps-4",  text: "Transformers: Dark of the Moon" },
  5:  { id: "ps-5",  text: "Hokkien mee is red, no such thing as PRAWN NOODLE" },
  6:  { id: "ps-6",  text: "Why did the chicken cross the road?" },
  7:  { id: "ps-7",  text: "AIESEC logo" },
  8:  { id: "ps-8",  text: "When was this tokong built?" },
  // Cluster 2 — KLCC
  9:  { id: "klcc-1", text: "What is this bridge?" },
  10: { id: "klcc-2", text: "Azizulhasni \"The Pocket Rocketman\" Awang" },
  11: { id: "klcc-3", text: "Someone may find the code sitting with remarkably bad posture" },
  12: { id: "klcc-4", text: "Have you checked both sides of the bridge?" },
  13: { id: "klcc-5", text: "Take a seat and stretch your neck" },
};

// --- Legacy cluster-keyed clue list (used for Inventory display) ---
// Built automatically from POI_CLUES so the Inventory tab renders all
// clues grouped by cluster without duplicating data.

export const CLUSTER_CLUES: Record<number, ClueItem[]> = {
  1: TARGET_LOCATIONS
    .filter(loc => loc.cluster === 1 && POI_CLUES[loc.id])
    .map(loc => POI_CLUES[loc.id]),
  2: TARGET_LOCATIONS
    .filter(loc => loc.cluster === 2 && POI_CLUES[loc.id])
    .map(loc => POI_CLUES[loc.id]),
};
