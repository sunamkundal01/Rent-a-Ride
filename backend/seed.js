import mongoose from "mongoose";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import MasterData from "./models/masterDataModel.js";

dotenv.config();

// ---- Major cities of India with a few pickup/drop-off points each ----
const cityLocations = {
  Delhi: [
    "Connaught Place : Metro Station",
    "IGI Airport : Terminal 3",
    "New Delhi : Railway Station",
  ],
  Mumbai: [
    "Andheri : Metro Station",
    "CSMT : Railway Station",
    "Chhatrapati Shivaji Airport : T2",
  ],
  Bengaluru: [
    "MG Road : Metro Station",
    "Kempegowda Airport : Arrivals",
    "Majestic : KSR Railway Station",
  ],
  Hyderabad: [
    "Hitech City : Metro",
    "Rajiv Gandhi Airport : Shamshabad",
    "Secunderabad : Railway Station",
  ],
  Chennai: [
    "T Nagar : Pondy Bazaar",
    "Chennai Airport : Meenambakkam",
    "Chennai Central : Railway Station",
  ],
  Kolkata: [
    "Park Street : Metro",
    "NSC Bose Airport : Dum Dum",
    "Howrah : Railway Station",
  ],
  Pune: [
    "Hinjewadi : IT Park",
    "Pune Airport : Lohegaon",
    "Pune Junction : Railway Station",
  ],
  Ahmedabad: [
    "SG Highway : Bopal",
    "SVP Airport : Hansol",
    "Kalupur : Railway Station",
  ],
  Jaipur: [
    "MI Road : City Center",
    "Jaipur Airport : Sanganer",
    "Jaipur Junction : Railway Station",
  ],
  Kochi: [
    "Kalamassery : Metro Station",
    "Cochin Airport : Nedumbassery",
    "Ernakulam : Railway Station",
  ],
  Lucknow: [
    "Hazratganj : City Center",
    "Amausi Airport : Terminal 2",
    "Charbagh : Railway Station",
  ],
  Chandigarh: [
    "Sector 17 : Plaza",
    "Chandigarh Airport : Arrivals",
    "Chandigarh : Railway Station",
  ],
};

const locationData = Object.entries(cityLocations).flatMap(([district, spots]) =>
  spots.map((location) => ({ id: uuidv4(), district, location, type: "location" }))
);

// ---- Car models (needed for vendor "Add Vehicle" dropdowns) ----
const carData = [
  { id: uuidv4(), model: "Alto 800", variant: "manual", type: "car", brand: "maruthi" },
  { id: uuidv4(), model: "Alto 800", variant: "automatic", type: "car", brand: "maruthi" },
  { id: uuidv4(), model: "MARUTI SWIFT Petrol AT", variant: "automatic", type: "car", brand: "maruthi" },
  { id: uuidv4(), model: "MARUTI DZIRE Petrol MT", variant: "manual", type: "car", brand: "maruthi" },
  { id: uuidv4(), model: "SKODA SLAVIA PETROL AT", variant: "automatic", type: "car", brand: "skoda" },
  { id: uuidv4(), model: "SKODA KUSHAQ Petrol MT", variant: "manual", type: "car", brand: "skoda" },
  { id: uuidv4(), model: "SKODA RAPID Petrol MT", variant: "manual", type: "car", brand: "skoda" },
  { id: uuidv4(), model: "NISSAN MAGNITE PETROL MT", variant: "manual", type: "car", brand: "nissan" },
  { id: uuidv4(), model: "NISSAN KICKS Petrol MT", variant: "manual", type: "car", brand: "nissan" },
  { id: uuidv4(), model: "MG HECTOR Petrol MT", variant: "manual", type: "car", brand: "mg" },
  { id: uuidv4(), model: "MG HECTOR Petrol AT", variant: "automatic", type: "car", brand: "mg" },
  { id: uuidv4(), model: "HYUNDAI ALCAZAR Diesel AT", variant: "automatic", type: "car", brand: "hyundai" },
  { id: uuidv4(), model: "CITROEN C3 Petrol MT", variant: "automatic", type: "car", brand: "citroen" },
  { id: uuidv4(), model: "VW TAIGUN Petrol MT", variant: "manual", type: "car", brand: "volkswagen" },
  { id: uuidv4(), model: "VW POLO Petrol MT", variant: "manual", type: "car", brand: "volkswagen" },
];

async function seed() {
  if (!process.env.mongo_uri) {
    console.error("Missing mongo_uri in .env");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.mongo_uri);
    console.log("connected to database");

    // wipe old master data so we don't pile up duplicates on re-runs
    await MasterData.deleteMany({});
    console.log("cleared existing master data");

    await MasterData.insertMany([...locationData, ...carData]);
    console.log(
      `seeded ${locationData.length} locations across ${Object.keys(cityLocations).length} cities and ${carData.length} car models`
    );
  } catch (error) {
    console.error("seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seed();
