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
  { id: 1,  cluster: 1, name: "POI A", lat: 3.118444, lng: 101.656472 },
  { id: 2,  cluster: 1, name: "POI B", lat: 3.146150, lng: 101.695775 },
  { id: 3,  cluster: 1, name: "POI C", lat: 3.147089, lng: 101.695909 },
  { id: 4,  cluster: 1, name: "POI D", lat: 3.145767, lng: 101.696159 },
  { id: 5,  cluster: 1, name: "POI E", lat: 3.143695, lng: 101.697860 },
  { id: 6,  cluster: 1, name: "POI F", lat: 3.142462, lng: 101.697955 },
  { id: 7,  cluster: 1, name: "POI G", lat: 3.142612, lng: 101.696539 },
  { id: 8,  cluster: 1, name: "POI H", lat: 3.144143, lng: 101.696682 },
  // Cluster 2 — KLCC (5 POIs)
  { id: 9,  cluster: 2, name: "POI A", lat: 3.160750, lng: 101.708306 },
  { id: 10, cluster: 2, name: "POI B", lat: 3.158797, lng: 101.710608 },
  { id: 11, cluster: 2, name: "POI C", lat: 3.156263, lng: 101.713009 },
  { id: 12, cluster: 2, name: "POI D", lat: 3.156206, lng: 101.713772 },
  { id: 13, cluster: 2, name: "POI E", lat: 3.156767, lng: 101.716090 },
];

// --- Clue Definitions ---

export const CLUSTER_CLUES: Record<number, ClueItem[]> = {
  // Pasar Seni — 8 clues
  1: [
    { id: "ps-1", text: "Pasar Seni Clue 1: Look near the old fountain at the entrance plaza." },
    { id: "ps-2", text: "Pasar Seni Clue 2: The mural on the east wall hides a secret symbol." },
    { id: "ps-3", text: "Pasar Seni Clue 3: Count the archways along the heritage corridor." },
    { id: "ps-4", text: "Pasar Seni Clue 4: The craft vendor nearest the river knows a tale." },
    { id: "ps-5", text: "Pasar Seni Clue 5: Seek the mosaic tile that faces north." },
    { id: "ps-6", text: "Pasar Seni Clue 6: A lantern above the tea stall marks the spot." },
    { id: "ps-7", text: "Pasar Seni Clue 7: Follow the painted footsteps on the walkway." },
    { id: "ps-8", text: "Pasar Seni Clue 8: The old clock tower chimes at the final mark." },
  ],
  // KLCC — 5 clues
  2: [
    { id: "klcc-1", text: "KLCC Clue 1: The twin towers reflection points to the starting line." },
    { id: "klcc-2", text: "KLCC Clue 2: Follow the jogging path past the children's playground." },
    { id: "klcc-3", text: "KLCC Clue 3: The fountain show hides coordinates in its rhythm." },
    { id: "klcc-4", text: "KLCC Clue 4: Between the whale sculpture and the wading pool." },
    { id: "klcc-5", text: "KLCC Clue 5: The skybridge view reveals the final destination." },
  ],
};
