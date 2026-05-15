(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/lib/firebase.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "app",
    ()=>app,
    "database",
    ()=>database
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/@firebase/app/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$database$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/database/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/database/dist/index.esm.js [app-client] (ecmascript)");
;
;
const firebaseConfig = {
    apiKey: "AIzaSyBYBd6MKtA7M8qRaqIp0oNlHKb4MvqVlhk",
    authDomain: "family-day-3.firebaseapp.com",
    databaseURL: "https://family-day-3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "family-day-3",
    storageBucket: "family-day-3.firebasestorage.app",
    messagingSenderId: "667730142447",
    appId: "1:667730142447:web:96b24a8fd57b1f11f4e71a"
};
// This prevents Next.js from crashing during hot-reloads
const app = !(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApps"])().length ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["initializeApp"])(firebaseConfig) : (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$app$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["getApp"])();
// Export the Realtime Database instance
const database = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getDatabase"])(app);
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/firebase.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$firebase$2f$database$2f$dist$2f$esm$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/firebase/database/dist/esm/index.esm.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@firebase/database/dist/index.esm.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
// Haversine formula to calculate distance between two coordinates in meters
function getDistanceInMeters(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // Earth's radius in meters
    const toRadians = (deg)=>deg * Math.PI / 180;
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c);
}
// 🎯 TARGET LOCATIONS: 5 POIs per cluster
const TARGET_LOCATIONS = [
    // Cluster 1
    {
        id: 1,
        cluster: 1,
        name: "Alpha Checkpoint",
        lat: 3.116576,
        lng: 101.657091
    },
    {
        id: 2,
        cluster: 1,
        name: "Beta Beacon",
        lat: 3.117301,
        lng: 101.656851
    },
    {
        id: 3,
        cluster: 1,
        name: "Charlie Comms",
        lat: 3.117500,
        lng: 101.656500
    },
    {
        id: 4,
        cluster: 1,
        name: "Delta Drop",
        lat: 3.116800,
        lng: 101.657500
    },
    {
        id: 5,
        cluster: 1,
        name: "Echo Extract",
        lat: 3.116200,
        lng: 101.656200
    },
    // Cluster 2
    {
        id: 6,
        cluster: 2,
        name: "Foxtrot Base",
        lat: 3.118000,
        lng: 101.657500
    },
    {
        id: 7,
        cluster: 2,
        name: "Golf Gateway",
        lat: 3.118500,
        lng: 101.657800
    },
    {
        id: 8,
        cluster: 2,
        name: "Hotel Hub",
        lat: 3.118200,
        lng: 101.658200
    },
    {
        id: 9,
        cluster: 2,
        name: "India Intel",
        lat: 3.118800,
        lng: 101.657200
    },
    {
        id: 10,
        cluster: 2,
        name: "Juliet Junction",
        lat: 3.119200,
        lng: 101.658500
    },
    // Cluster 3
    {
        id: 11,
        cluster: 3,
        name: "Kilo Kinetic",
        lat: 3.119000,
        lng: 101.658000
    },
    {
        id: 12,
        cluster: 3,
        name: "Lima Landing",
        lat: 3.119500,
        lng: 101.658800
    },
    {
        id: 13,
        cluster: 3,
        name: "Mike Matrix",
        lat: 3.119800,
        lng: 101.657800
    },
    {
        id: 14,
        cluster: 3,
        name: "November Node",
        lat: 3.120200,
        lng: 101.658200
    },
    {
        id: 15,
        cluster: 3,
        name: "Oscar Orbit",
        lat: 3.120500,
        lng: 101.659000
    }
];
const WIN_RADIUS = 10; // Success within 10 meters
// PIN Mapping
const TEAM_PINS = {
    1: "67676767",
    2: "verystrongpassword",
    3: "iforgotmypassword",
    4: "RyanCoolestEP",
    5: "JiongXiHenHandsome"
};
function Home() {
    _s();
    // Authentication State
    const [selectedTeam, setSelectedTeam] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pendingTeam, setPendingTeam] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [pinInput, setPinInput] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [pinError, setPinError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    // Game State
    const [tokenCount, setTokenCount] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [globalActiveCluster, setGlobalActiveCluster] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [completedPOIs, setCompletedPOIs] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [missionStatus, setMissionStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Tracking State
    const [latestCoords, setLatestCoords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const watchIdRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // --- DERIVED STATE: Auto-Targeting ---
    const { activeTarget, minDistance, clusterTargets } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "Home.useMemo": ()=>{
            let target = null;
            let distance = null;
            let targets = [];
            if (selectedTeam !== null) {
                targets = TARGET_LOCATIONS.filter({
                    "Home.useMemo": (t)=>t.cluster === globalActiveCluster
                }["Home.useMemo"]);
                const uncompletedTargets = targets.filter({
                    "Home.useMemo.uncompletedTargets": (t)=>!completedPOIs.includes(t.id)
                }["Home.useMemo.uncompletedTargets"]);
                if (uncompletedTargets.length > 0 && latestCoords) {
                    let closest = uncompletedTargets[0];
                    let closestDist = getDistanceInMeters(latestCoords.lat, latestCoords.lng, closest.lat, closest.lng);
                    for(let i = 1; i < uncompletedTargets.length; i++){
                        const d = getDistanceInMeters(latestCoords.lat, latestCoords.lng, uncompletedTargets[i].lat, uncompletedTargets[i].lng);
                        if (d < closestDist) {
                            closest = uncompletedTargets[i];
                            closestDist = d;
                        }
                    }
                    target = closest;
                    distance = closestDist;
                }
            }
            return {
                activeTarget: target,
                minDistance: distance,
                clusterTargets: targets
            };
        }
    }["Home.useMemo"], [
        selectedTeam,
        globalActiveCluster,
        completedPOIs,
        latestCoords
    ]);
    const activeTargetId = activeTarget?.id || null;
    // --- FIREBASE LISTENERS ---
    // 1. Global Game State
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (selectedTeam === null) return;
            const gameStateRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["database"], "gameState/activeCluster");
            const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onValue"])(gameStateRef, {
                "Home.useEffect.unsubscribe": (snapshot)=>{
                    const val = snapshot.val();
                    if (val !== null) setGlobalActiveCluster(val);
                }
            }["Home.useEffect.unsubscribe"]);
            return ({
                "Home.useEffect": ()=>unsubscribe()
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        selectedTeam
    ]);
    // 2. Team Tokens & Completed POIs
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (selectedTeam === null) return;
            // Tokens
            const teamTokensRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["database"], `teams/${selectedTeam}/token_count`);
            const unsubTokens = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onValue"])(teamTokensRef, {
                "Home.useEffect.unsubTokens": (snapshot)=>{
                    const data = snapshot.val();
                    setTokenCount(data !== null ? data : 0);
                }
            }["Home.useEffect.unsubTokens"]);
            // Completed POIs
            const completedRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["database"], `teams/${selectedTeam}/completedPOIs`);
            const unsubCompleted = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onValue"])(completedRef, {
                "Home.useEffect.unsubCompleted": (snapshot)=>{
                    const data = snapshot.val();
                    if (data) {
                        if (Array.isArray(data)) {
                            setCompletedPOIs(data.filter(Boolean));
                        } else {
                            setCompletedPOIs(Object.values(data));
                        }
                    } else {
                        setCompletedPOIs([]);
                    }
                }
            }["Home.useEffect.unsubCompleted"]);
            return ({
                "Home.useEffect": ()=>{
                    unsubTokens();
                    unsubCompleted();
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        selectedTeam
    ]);
    // 3. Mission Status Queue
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (selectedTeam === null || activeTargetId === null) {
                setMissionStatus(null);
                return;
            }
            const missionsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["database"], 'missions');
            const unsubscribe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["onValue"])(missionsRef, {
                "Home.useEffect.unsubscribe": (snapshot)=>{
                    const data = snapshot.val();
                    if (data) {
                        // Find missions for this team and POI
                        const missions = Object.entries(data).map({
                            "Home.useEffect.unsubscribe.missions": ([key, val])=>({
                                    id: key,
                                    ...val
                                })
                        }["Home.useEffect.unsubscribe.missions"]);
                        const relevantMissions = missions.filter({
                            "Home.useEffect.unsubscribe.relevantMissions": (m)=>m.teamId === selectedTeam && m.poiId === activeTargetId
                        }["Home.useEffect.unsubscribe.relevantMissions"]);
                        if (relevantMissions.length > 0) {
                            // Sort descending by timestamp
                            relevantMissions.sort({
                                "Home.useEffect.unsubscribe": (a, b)=>b.timestamp - a.timestamp
                            }["Home.useEffect.unsubscribe"]);
                            setMissionStatus(relevantMissions[0].status);
                        } else {
                            setMissionStatus(null);
                        }
                    } else {
                        setMissionStatus(null);
                    }
                }
            }["Home.useEffect.unsubscribe"]);
            return ({
                "Home.useEffect": ()=>unsubscribe()
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        selectedTeam,
        activeTargetId
    ]);
    // 4. GPS Tracking Logic
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Home.useEffect": ()=>{
            if (selectedTeam !== null) {
                if (!("geolocation" in navigator)) {
                    setError("Geolocation is not supported by your browser");
                    return;
                }
                watchIdRef.current = navigator.geolocation.watchPosition({
                    "Home.useEffect": (position)=>{
                        setLatestCoords({
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        });
                        setError(null);
                    }
                }["Home.useEffect"], {
                    "Home.useEffect": (err)=>{
                        setError(err.message);
                    }
                }["Home.useEffect"], {
                    enableHighAccuracy: true,
                    maximumAge: 0,
                    timeout: 5000
                });
            }
            return ({
                "Home.useEffect": ()=>{
                    if (watchIdRef.current !== null) {
                        navigator.geolocation.clearWatch(watchIdRef.current);
                        watchIdRef.current = null;
                    }
                }
            })["Home.useEffect"];
        }
    }["Home.useEffect"], [
        selectedTeam
    ]);
    // --- ACTIONS ---
    const handlePinSubmit = (e)=>{
        e.preventDefault();
        if (pendingTeam && pinInput === TEAM_PINS[pendingTeam]) {
            setSelectedTeam(pendingTeam);
            setPendingTeam(null);
            setPinInput("");
            setPinError(false);
        } else {
            setPinError(true);
            setPinInput("");
        }
    };
    const submitMission = async ()=>{
        if (selectedTeam && activeTarget && minDistance !== null && minDistance <= WIN_RADIUS) {
            try {
                const missionsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ref"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$firebase$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["database"], 'missions');
                await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$firebase$2f$database$2f$dist$2f$index$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["push"])(missionsRef, {
                    teamId: selectedTeam,
                    poiId: activeTarget.id,
                    poiName: activeTarget.name,
                    clusterId: globalActiveCluster,
                    status: 'pending',
                    timestamp: Date.now()
                });
            } catch (err) {
                console.error("Error submitting mission:", err);
            }
        }
    };
    const handleLogout = ()=>{
        setSelectedTeam(null);
        setLatestCoords(null);
        if (watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
        }
    };
    // --- UI: LOGIN ---
    if (selectedTeam === null) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-[100dvh] relative flex flex-col items-center justify-center p-6 bg-slate-950 overflow-hidden",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 rounded-full blur-[120px] pointer-events-none"
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 285,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none"
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 286,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "relative z-10 max-w-md w-full bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 shadow-2xl border border-white/10",
                    children: pendingTeam === null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-center mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-4xl font-extrabold text-white tracking-tight drop-shadow-sm mb-2",
                                        children: "Select Team"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 292,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-400 font-medium",
                                        children: "Choose your group to begin"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 295,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 291,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    1,
                                    2,
                                    3,
                                    4,
                                    5
                                ].map((teamId)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>{
                                            setPendingTeam(teamId);
                                            setPinError(false);
                                            setPinInput("");
                                        },
                                        className: "group w-full bg-white/5 hover:bg-white/10 text-white font-medium text-lg py-4 px-6 rounded-3xl transition-all duration-300 border border-white/5 hover:border-white/20 flex justify-between items-center shadow-[0_4px_24px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_32px_rgba(255,255,255,0.05)]",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "tracking-wide",
                                                children: [
                                                    "Group ",
                                                    teamId
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 309,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-slate-500 group-hover:text-white transition-colors duration-300 transform group-hover:translate-x-1",
                                                children: "→"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 310,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, teamId, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 300,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 298,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                        className: "text-3xl font-extrabold text-white tracking-tight drop-shadow-sm mb-2",
                                        children: [
                                            "Group ",
                                            pendingTeam
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 318,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-slate-400 font-medium",
                                        children: "Enter your password"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 321,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 317,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: handlePinSubmit,
                                className: "space-y-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "password",
                                                value: pinInput,
                                                onChange: (e)=>{
                                                    setPinInput(e.target.value);
                                                    setPinError(false);
                                                },
                                                className: `w-full bg-black/20 backdrop-blur-md rounded-2xl text-center text-2xl text-white font-bold tracking-widest py-4 focus:outline-none transition-all duration-300 shadow-inner ${pinError ? 'border border-red-500/50 bg-red-500/10 placeholder:text-red-300/50' : 'border border-white/10 focus:border-white/30 focus:bg-white/10 placeholder:text-white/20'}`,
                                                placeholder: "Password",
                                                autoFocus: true
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 326,
                                                columnNumber: 19
                                            }, this),
                                            pinError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "text-red-400 text-sm font-medium mt-3",
                                                children: "Incorrect password. Please try again."
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 342,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 325,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex space-x-4 pt-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "button",
                                                onClick: ()=>{
                                                    setPendingTeam(null);
                                                    setPinInput("");
                                                    setPinError(false);
                                                },
                                                className: "flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-4 rounded-full transition-all duration-300 border border-white/10 active:scale-95",
                                                children: "Cancel"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 347,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                type: "submit",
                                                className: "flex-1 bg-white text-black font-bold py-4 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:hover:scale-100",
                                                disabled: pinInput.length === 0,
                                                children: "Submit"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/page.tsx",
                                                lineNumber: 358,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 346,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 324,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 316,
                        columnNumber: 13
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 288,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/page.tsx",
            lineNumber: 283,
            columnNumber: 7
        }, this);
    }
    // --- UI: TRACKING ---
    // Dynamic Background and Glow Logic
    let bgGradient = "from-slate-950 to-slate-900";
    let glowColor = "bg-slate-500/20";
    let distanceAnimateClass = "";
    if (activeTarget && minDistance !== null) {
        if (minDistance > 1000) {
            bgGradient = "from-blue-950 to-slate-950";
            glowColor = "bg-blue-500/30";
        } else if (minDistance > 500) {
            bgGradient = "from-yellow-950 to-slate-950";
            glowColor = "bg-yellow-500/30";
        } else if (minDistance > WIN_RADIUS) {
            bgGradient = "from-orange-950 to-slate-950";
            glowColor = "bg-orange-500/30";
        } else {
            bgGradient = "from-emerald-950 to-slate-950";
            glowColor = "bg-emerald-500/40";
            distanceAnimateClass = "animate-pulse";
        }
    } else if (!activeTarget) {
        // Cluster Complete theme
        bgGradient = "from-emerald-950 to-slate-950";
        glowColor = "bg-emerald-500/40";
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: `min-h-[100dvh] relative flex flex-col items-center p-6 bg-gradient-to-br transition-colors duration-1000 overflow-hidden ${bgGradient}`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[140px] pointer-events-none transition-colors duration-1000 ${glowColor}`
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 405,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-6 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-black/20 backdrop-blur-3xl border border-white/10 rounded-full py-2 px-6 shadow-2xl flex items-center space-x-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "relative flex h-3 w-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 411,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "relative inline-flex rounded-full h-3 w-3 bg-emerald-500"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 412,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 410,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-white font-bold text-sm tracking-wide",
                            children: [
                                "Active Phase: Cluster ",
                                globalActiveCluster
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 414,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 409,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 408,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed top-20 left-0 right-0 px-6 z-40 flex justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-black/30 backdrop-blur-2xl border border-white/10 rounded-full py-3 px-6 shadow-2xl flex items-center space-x-5",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "text-slate-300 font-semibold uppercase tracking-widest text-xs",
                            children: [
                                "Group ",
                                selectedTeam
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 423,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-4 w-px bg-white/10"
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 426,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center space-x-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-xl",
                                    children: "🪙"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 428,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-white font-bold text-lg tabular-nums tracking-tight",
                                    children: tokenCount
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 429,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 427,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/page.tsx",
                    lineNumber: 422,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 421,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-40 mt-36 md:fixed md:top-32 md:right-8 w-full max-w-sm md:w-80 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-5 shadow-2xl flex-shrink-0",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-white font-bold text-xs uppercase tracking-widest mb-4 opacity-80",
                        children: [
                            "Cluster ",
                            globalActiveCluster,
                            " Objectives"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 436,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-3",
                        children: clusterTargets.map((poi)=>{
                            const isCompleted = completedPOIs.includes(poi.id);
                            const isActive = activeTarget?.id === poi.id;
                            let statusClasses = "opacity-40 text-slate-400";
                            let icon = "⚪";
                            if (isCompleted) {
                                statusClasses = "line-through opacity-40 text-slate-500";
                                icon = "✅";
                            } else if (isActive) {
                                statusClasses = "opacity-100 font-bold text-white bg-white/10 rounded-xl px-3 py-2 -ml-3 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]";
                                icon = "📍";
                            }
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `flex items-center space-x-3 text-sm transition-all duration-500 ${statusClasses}`,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "flex-shrink-0",
                                        children: icon
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 457,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate",
                                        children: poi.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 458,
                                        columnNumber: 17
                                    }, this),
                                    isActive && minDistance !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "ml-auto flex-shrink-0 text-xs text-blue-300 font-mono font-bold animate-pulse",
                                        children: [
                                            minDistance,
                                            "m"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 460,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, poi.id, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 456,
                                columnNumber: 15
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 439,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 435,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 max-w-md w-full bg-white/5 backdrop-blur-3xl rounded-[2.5rem] p-8 shadow-2xl border border-white/10 mt-8 md:mt-auto md:mb-auto",
                children: [
                    activeTarget ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 bg-black/20 backdrop-blur-md rounded-3xl border border-white/5 shadow-inner text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-blue-300 text-xs uppercase tracking-widest font-bold mb-2 animate-pulse",
                                children: "Active Target"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 475,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: `text-2xl font-bold text-white tracking-tight`,
                                children: activeTarget.name
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 478,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 474,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "p-6 bg-emerald-500/20 backdrop-blur-md rounded-3xl border border-emerald-500/50 shadow-inner text-center",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-2xl font-bold text-emerald-300 tracking-tight",
                            children: "Cluster Complete!"
                        }, void 0, false, {
                            fileName: "[project]/src/app/page.tsx",
                            lineNumber: 484,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 483,
                        columnNumber: 11
                    }, this),
                    activeTarget && minDistance !== null ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `py-4 text-center ${distanceAnimateClass}`,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-slate-500 text-xs uppercase tracking-widest font-bold mb-2",
                                children: "Distance"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 490,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-baseline justify-center space-x-1",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-7xl font-bold text-white tracking-tighter tabular-nums drop-shadow-lg",
                                        children: minDistance > 1000 ? (minDistance / 1000).toFixed(2) : minDistance
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 494,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-2xl font-medium text-slate-400",
                                        children: minDistance > 1000 ? "km" : "m"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/page.tsx",
                                        lineNumber: 497,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 493,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 489,
                        columnNumber: 11
                    }, this) : activeTarget ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-12 text-center flex flex-col items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "animate-spin rounded-full h-12 w-12 border-b-2 border-white mb-4"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 504,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-slate-400 font-medium",
                                children: "Acquiring GPS..."
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 505,
                                columnNumber: 14
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 503,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "py-8 text-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-6xl block mb-4",
                                children: "🎉"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 509,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-slate-400 font-medium",
                                children: "Await further instructions from HQ."
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 510,
                                columnNumber: 14
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 508,
                        columnNumber: 11
                    }, this),
                    error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-red-500/20 backdrop-blur-xl text-red-200 p-4 rounded-2xl text-sm font-medium border border-red-500/30 mb-4",
                        children: error
                    }, void 0, false, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 515,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4 mt-6",
                        children: [
                            activeTarget && minDistance !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: missionStatus === 'pending' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "w-full bg-blue-500/20 text-blue-200 border border-blue-500/50 font-bold text-lg py-5 px-8 rounded-full flex justify-center items-center space-x-3 shadow-inner",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "animate-spin rounded-full h-5 w-5 border-b-2 border-blue-200"
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 526,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: "Waiting for Admin..."
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/page.tsx",
                                            lineNumber: 527,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 525,
                                    columnNumber: 17
                                }, this) : missionStatus === 'rejected' ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: submitMission,
                                    disabled: minDistance > WIN_RADIUS,
                                    className: "w-full bg-red-500/20 hover:bg-red-500/40 text-red-200 border border-red-500/50 font-bold text-lg py-5 px-8 rounded-full shadow-[0_0_20px_rgba(239,68,68,0.2)] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:active:scale-100",
                                    children: "Mission Rejected! Try Again"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 530,
                                    columnNumber: 17
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: submitMission,
                                    disabled: minDistance > WIN_RADIUS,
                                    className: `w-full font-bold text-lg py-5 px-8 rounded-full active:scale-95 transition-all duration-300 ${minDistance <= WIN_RADIUS ? "bg-emerald-500/20 hover:bg-emerald-500/40 text-emerald-200 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]" : "bg-slate-800/50 text-slate-400 border border-slate-700 cursor-not-allowed opacity-50 active:scale-100"}`,
                                    children: minDistance <= WIN_RADIUS ? "Submit Mission to HQ" : `Get closer to interact (${minDistance}m)`
                                }, void 0, false, {
                                    fileName: "[project]/src/app/page.tsx",
                                    lineNumber: 538,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleLogout,
                                className: "w-full bg-white/5 hover:bg-white/10 text-white font-medium text-lg py-5 px-8 rounded-full active:scale-95 transition-all duration-300 border border-white/10",
                                children: "Log Out"
                            }, void 0, false, {
                                fileName: "[project]/src/app/page.tsx",
                                lineNumber: 553,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/page.tsx",
                        lineNumber: 521,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 471,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "relative z-10 mt-8 mb-6 text-slate-500 text-xs font-medium text-center px-6 max-w-sm",
                children: "Location permissions required."
            }, void 0, false, {
                fileName: "[project]/src/app/page.tsx",
                lineNumber: 563,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/page.tsx",
        lineNumber: 403,
        columnNumber: 5
    }, this);
}
_s(Home, "6uLjqBASuxdG1iXp3j9d8KJudjs=");
_c = Home;
var _c;
__turbopack_context__.k.register(_c, "Home");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_0op9n5m._.js.map