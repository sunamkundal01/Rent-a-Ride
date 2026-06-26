import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pickup_district: "",
  pickup_location: "",
  dropoff_location: "",
  pickuptime: {},
  dropofftime: {},
  pickupDate: {},
  dropoffDate: {},
  selectedVehicle: "",
};

const bookingDataSlice = createSlice({
  name: "bookingData",
  initialState,
  reducers: {
    setSelectedData: (state, action) => {
      const {
        pickup_district,
        pickup_location,
        dropoff_location,
        dropofftime,
        pickuptime,
      } = action.payload;

      // Set pickup details
      state.pickup_district = pickup_district;
      state.pickup_location = pickup_location;

      // Set dropoff details
      state.dropoff_location = dropoff_location;

      // Set pickupDate and dropoffDate
      (state.pickupDate = {
        day: pickuptime.$D,
        month: pickuptime.$M,
        year: pickuptime.$y,
        humanReadable: pickuptime.$d,
      }),
        (state.dropoffDate = {
          day: dropofftime.$D,
          month: dropofftime.$M,
          year: dropofftime.$y,
          humanReadable: dropofftime.$d,
        });

      // Set pickuptime and dropofftime
      state.pickuptime = {
        hour: pickuptime.$H,
        minute: pickuptime.$m,
        seconds: pickuptime.$s,
        year: pickuptime.$y,
      };

      state.dropofftime = {
        hour: dropofftime.$H,
        minute: dropofftime.$m,
        seconds: dropofftime.$s,
        year: dropofftime.$y,
      };
    },

    // set booking data from plain values (used on the checkout page when a
    // user books directly from a vehicle without going through the search form)
    setManualBookingData: (state, action) => {
      const {
        pickup_district,
        pickup_location,
        dropoff_location,
        pickupISO,
        dropoffISO,
      } = action.payload;

      if (pickup_district) state.pickup_district = pickup_district;
      if (pickup_location) state.pickup_location = pickup_location;
      if (dropoff_location) state.dropoff_location = dropoff_location;

      if (pickupISO) {
        const p = new Date(pickupISO);
        state.pickupDate = {
          day: p.getDate(),
          month: p.getMonth(),
          year: p.getFullYear(),
          humanReadable: pickupISO,
        };
        state.pickuptime = {
          hour: p.getHours(),
          minute: p.getMinutes(),
          seconds: p.getSeconds(),
          year: p.getFullYear(),
        };
      }

      if (dropoffISO) {
        const d = new Date(dropoffISO);
        state.dropoffDate = {
          day: d.getDate(),
          month: d.getMonth(),
          year: d.getFullYear(),
          humanReadable: dropoffISO,
        };
        state.dropofftime = {
          hour: d.getHours(),
          minute: d.getMinutes(),
          seconds: d.getSeconds(),
          year: d.getFullYear(),
        };
      }
    },
  },
});

export const { setSelectedData, setManualBookingData } =
  bookingDataSlice.actions;
export default bookingDataSlice.reducer;
