import { calculateLapSplits } from "./lapSplitCalculator";

// Test the calculation logic
console.log("Testing lap split calculation...");

// Test 1: Full laps
console.log("\nTest 1: 5km total distance, 1km laps, 5:00 pace");
const splits1 = calculateLapSplits(1, 5, 0, 5);
console.log(splits1);

// Test 2: Partial lap
console.log("\nTest 2: 5.5km total distance, 1km laps, 5:00 pace");
const splits2 = calculateLapSplits(1, 5, 0, 5.5);
console.log(splits2);

// Test 3: Different lap distance
console.log("\nTest 3: 10km total distance, 2km laps, 4:30 pace");
const splits3 = calculateLapSplits(2, 4, 30, 10);
console.log(splits3);
