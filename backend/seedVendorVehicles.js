import mongoose from "mongoose";
import dotenv from "dotenv";
import Vehicle from "./models/vehicleModel.js";
import User from "./models/userModel.js";

dotenv.config();

const carImages = [
  "https://images.unsplash.com/photo-1549924231-f129b911e442?w=900",
  "https://images.unsplash.com/photo-1493238792000-8113da705763?w=900",
  "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=900",
  "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=900",
  "https://images.unsplash.com/photo-1542362567-b07e54358753?w=900",
  "https://images.unsplash.com/photo-1494905998402-395d579af36f?w=900",
];

// approved -> visible publicly; pending -> waits for admin approval
const raw = [
  { reg: "KA05VN2001", company: "Toyota", name: "Fortuner", model: "MG HECTOR Petrol AT", car_type: "suv", fuel_type: "diesel", transmition: "automatic", seats: 7, year: 2023, price: 5200, district: "Bengaluru", location: "MG Road : Metro Station", approved: true },
  { reg: "MH02VN2002", company: "Honda", name: "City ZX", model: "SKODA SLAVIA PETROL AT", car_type: "sedan", fuel_type: "petrol", transmition: "automatic", seats: 5, year: 2022, price: 3000, district: "Mumbai", location: "Andheri : Metro Station", approved: true },
  { reg: "DL08VN2003", company: "Kia", name: "Seltos HTX", model: "NISSAN KICKS Petrol MT", car_type: "suv", fuel_type: "petrol", transmition: "manual", seats: 5, year: 2023, price: 3400, district: "Delhi", location: "Connaught Place : Metro Station", approved: true },
  { reg: "TS09VN2004", company: "Hyundai", name: "Venue SX", model: "HYUNDAI ALCAZAR Diesel AT", car_type: "suv", fuel_type: "petrol", transmition: "manual", seats: 5, year: 2022, price: 2800, district: "Hyderabad", location: "Hitech City : Metro", approved: false },
  { reg: "TN10VN2005", company: "Mahindra", name: "XUV700", model: "MG HECTOR Petrol MT", car_type: "suv", fuel_type: "diesel", transmition: "automatic", seats: 7, year: 2023, price: 4800, district: "Chennai", location: "T Nagar : Pondy Bazaar", approved: false },
  { reg: "WB11VN2006", company: "Tata", name: "Harrier XZ", model: "VW TAIGUN Petrol MT", car_type: "suv", fuel_type: "diesel", transmition: "manual", seats: 5, year: 2022, price: 3900, district: "Kolkata", location: "Park Street : Metro", approved: false },
];

async function run() {
  if (!process.env.mongo_uri) {
    console.error("Missing mongo_uri in .env");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.mongo_uri);
    console.log("connected to database");

    const vendor = await User.findOne({ email: "vendor@gmail.com", isVendor: true });
    if (!vendor) {
      console.error("vendor@gmail.com not found — create the vendor first");
      process.exit(1);
    }
    const vendorId = vendor._id.toString();

    // clean previous vendor-seeded demo cars (reg numbers ending VN20xx)
    await Vehicle.deleteMany({ registeration_number: /VN20\d{2}$/ });

    const now = new Date().toISOString();
    const vehicles = raw.map((v, i) => ({
      registeration_number: v.reg,
      car_title: `${v.company} ${v.name}`,
      car_description: `${v.year} ${v.company} ${v.name} — ${v.seats} seater ${v.car_type}, ${v.fuel_type} ${v.transmition}. Listed by vendor in ${v.district}.`,
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
      isAdminAdded: false, // vendor-added (boolean false so it shows in vendor dashboard)
      addedBy: vendorId,
      isAdminApproved: v.approved,
      isRejected: false,
    }));

    await Vehicle.insertMany(vehicles);
    const approved = vehicles.filter((v) => v.isAdminApproved).length;
    console.log(
      `seeded ${vehicles.length} vehicles for vendor@gmail.com (${vendorId}) — ${approved} approved (public), ${vehicles.length - approved} pending admin approval`
    );
  } catch (error) {
    console.error("seeding failed:", error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

run();
