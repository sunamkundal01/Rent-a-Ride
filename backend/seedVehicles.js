import mongoose from "mongoose";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import Vehicle from "./models/vehicleModel.js";
import User from "./models/userModel.js";

dotenv.config();

// Reliable Unsplash car images (cycled across vehicles)
const carImages = [
  "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=900",
  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=900",
  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=900",
  "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=900",
  "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=900",
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=900",
  "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=900",
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=900",
];

// district -> location must match seed.js cityLocations exactly
const raw = [
  { reg: "DL01AB1001", company: "Maruti Suzuki", name: "Swift VXI", model: "MARUTI SWIFT Petrol AT", car_type: "hatchback", fuel_type: "petrol", transmition: "automatic", seats: 5, year: 2022, price: 2200, district: "Delhi", location: "Connaught Place : Metro Station" },
  { reg: "DL02CD1002", company: "Hyundai", name: "Creta SX", model: "HYUNDAI ALCAZAR Diesel AT", car_type: "suv", fuel_type: "diesel", transmition: "automatic", seats: 5, year: 2023, price: 3800, district: "Delhi", location: "IGI Airport : Terminal 3" },
  { reg: "MH01EF1003", company: "Skoda", name: "Slavia Style", model: "SKODA SLAVIA PETROL AT", car_type: "sedan", fuel_type: "petrol", transmition: "automatic", seats: 5, year: 2023, price: 3200, district: "Mumbai", location: "Andheri : Metro Station" },
  { reg: "MH02GH1004", company: "Toyota", name: "Innova Crysta", model: "MG HECTOR Petrol AT", car_type: "suv", fuel_type: "diesel", transmition: "manual", seats: 7, year: 2021, price: 4500, district: "Mumbai", location: "Chhatrapati Shivaji Airport : T2" },
  { reg: "KA01IJ1005", company: "Tata", name: "Nexon EV", model: "NISSAN KICKS Petrol MT", car_type: "suv", fuel_type: "electirc", transmition: "automatic", seats: 5, year: 2023, price: 3500, district: "Bengaluru", location: "MG Road : Metro Station" },
  { reg: "KA02KL1006", company: "Maruti Suzuki", name: "Dzire ZXI", model: "MARUTI DZIRE Petrol MT", car_type: "sedan", fuel_type: "petrol", transmition: "manual", seats: 5, year: 2022, price: 2400, district: "Bengaluru", location: "Kempegowda Airport : Arrivals" },
  { reg: "TS01MN1007", company: "Volkswagen", name: "Taigun GT", model: "VW TAIGUN Petrol MT", car_type: "suv", fuel_type: "petrol", transmition: "manual", seats: 5, year: 2023, price: 3300, district: "Hyderabad", location: "Hitech City : Metro" },
  { reg: "TS02OP1008", company: "Skoda", name: "Kushaq Monte", model: "SKODA KUSHAQ Petrol MT", car_type: "suv", fuel_type: "petrol", transmition: "manual", seats: 5, year: 2022, price: 3100, district: "Hyderabad", location: "Rajiv Gandhi Airport : Shamshabad" },
  { reg: "TN01QR1009", company: "MG", name: "Hector Sharp", model: "MG HECTOR Petrol MT", car_type: "suv", fuel_type: "petrol", transmition: "manual", seats: 5, year: 2021, price: 3600, district: "Chennai", location: "T Nagar : Pondy Bazaar" },
  { reg: "TN02ST1010", company: "Citroen", name: "C3 Live", model: "CITROEN C3 Petrol MT", car_type: "hatchback", fuel_type: "petrol", transmition: "automatic", seats: 5, year: 2023, price: 2000, district: "Chennai", location: "Chennai Airport : Meenambakkam" },
  { reg: "WB01UV1011", company: "Maruti Suzuki", name: "Alto K10", model: "Alto 800", car_type: "hatchback", fuel_type: "petrol", transmition: "manual", seats: 4, year: 2022, price: 1500, district: "Kolkata", location: "Park Street : Metro" },
  { reg: "WB02WX1012", company: "Hyundai", name: "Verna SX", model: "HYUNDAI ALCAZAR Diesel AT", car_type: "sedan", fuel_type: "diesel", transmition: "automatic", seats: 5, year: 2023, price: 3400, district: "Kolkata", location: "Howrah : Railway Station" },
  { reg: "MH12YZ1013", company: "Volkswagen", name: "Polo GT", model: "VW POLO Petrol MT", car_type: "hatchback", fuel_type: "petrol", transmition: "manual", seats: 5, year: 2021, price: 2100, district: "Pune", location: "Hinjewadi : IT Park" },
  { reg: "MH14AB1014", company: "Nissan", name: "Magnite Turbo", model: "NISSAN MAGNITE PETROL MT", car_type: "suv", fuel_type: "petrol", transmition: "manual", seats: 5, year: 2023, price: 2700, district: "Pune", location: "Pune Airport : Lohegaon" },
  { reg: "GJ01CD1015", company: "Skoda", name: "Rapid Rider", model: "SKODA RAPID Petrol MT", car_type: "sedan", fuel_type: "petrol", transmition: "manual", seats: 5, year: 2020, price: 2300, district: "Ahmedabad", location: "SG Highway : Bopal" },
  { reg: "GJ05EF1016", company: "Tata", name: "Punch Creative", model: "NISSAN KICKS Petrol MT", car_type: "suv", fuel_type: "petrol", transmition: "automatic", seats: 5, year: 2023, price: 2600, district: "Ahmedabad", location: "Kalupur : Railway Station" },
  { reg: "RJ14GH1017", company: "Mahindra", name: "Thar LX", model: "MG HECTOR Petrol MT", car_type: "suv", fuel_type: "diesel", transmition: "manual", seats: 4, year: 2022, price: 4200, district: "Jaipur", location: "MI Road : City Center" },
  { reg: "RJ19IJ1018", company: "Maruti Suzuki", name: "Swift Dzire", model: "MARUTI SWIFT Petrol AT", car_type: "sedan", fuel_type: "petrol", transmition: "automatic", seats: 5, year: 2023, price: 2500, district: "Jaipur", location: "Jaipur Airport : Sanganer" },
  { reg: "KL07KL1019", company: "Volkswagen", name: "Virtus Topline", model: "VW POLO Petrol AT", car_type: "sedan", fuel_type: "petrol", transmition: "automatic", seats: 5, year: 2023, price: 3000, district: "Kochi", location: "Kalamassery : Metro Station" },
  { reg: "UP32MN1020", company: "Hyundai", name: "Alcazar Signature", model: "HYUNDAI ALCAZAR Diesel AT", car_type: "suv", fuel_type: "hybrid", transmition: "automatic", seats: 7, year: 2023, price: 4000, district: "Lucknow", location: "Hazratganj : City Center" },
];

const now = new Date().toISOString();

const vehicles = raw.map((v, i) => ({
  registeration_number: v.reg,
  car_title: `${v.company} ${v.name}`,
  car_description: `${v.year} ${v.company} ${v.name} — ${v.seats} seater ${v.car_type}, ${v.fuel_type} ${v.transmition}. Available for rent in ${v.district}.`,
  title: `${v.company} ${v.name}`,
  description: `${v.year} ${v.company} ${v.name} available in ${v.district}.`,
  company: v.company,
  name: v.name,
  model: v.model,
  year_made: v.year,
  fuel_type: v.fuel_type,
  seats: v.seats,
  transmition: v.transmition,
  car_type: v.car_type,
  price: v.price,
  base_package: "100 km/day included",
  with_or_without_fuel: false,
  image: [carImages[i % carImages.length], carImages[(i + 1) % carImages.length]],
  location: v.location,
  district: v.district,
  created_at: now,
  updated_at: now,
  isDeleted: "false",
  isBooked: false,
  isAdminAdded: true,
  addedBy: "admin",
  isAdminApproved: true,
  isRejected: false,
}));

async function run() {
  if (!process.env.mongo_uri) {
    console.error("Missing mongo_uri in .env");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.mongo_uri);
    console.log("connected to database");

    // --- 1. Admin account: admin@gmail.com ---
    const adminEmail = "admin@gmail.com";
    const adminPass = bcryptjs.hashSync("Admin@123", 10);
    await User.updateOne(
      { email: adminEmail },
      {
        $set: { isAdmin: true, isUser: true, password: adminPass },
        $setOnInsert: { username: "admin", email: adminEmail },
      },
      { upsert: true }
    );
    console.log("admin ready -> admin@gmail.com / Admin@123");

    // demote the previously-promoted personal account
    await User.updateOne({ email: "kundalsunam@gmail.com" }, { $set: { isAdmin: false } });

    // --- 2. Vehicles ---
    await Vehicle.deleteMany({ addedBy: "admin" }); // clean previous demo seeds, keep vendor-added ones
    await Vehicle.insertMany(vehicles);
    const cities = [...new Set(vehicles.map((v) => v.district))];
    console.log(`seeded ${vehicles.length} vehicles across ${cities.length} cities: ${cities.join(", ")}`);
  } catch (error) {
    console.error("seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

run();
