const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 mt-10 text-gray-800">
      <h1 className="text-4xl font-bold mb-2">Terms &amp; Conditions</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: June 2026</p>

      <p className="mb-6 leading-7">
        Welcome to <strong>Rent a Ride</strong>. By accessing or using our platform,
        you agree to be bound by these Terms &amp; Conditions. Please read them
        carefully before making a booking or listing a vehicle.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">1. Eligibility</h2>
        <p className="leading-7">
          You must be at least 18 years old and hold a valid driving licence to rent
          a vehicle. By using the platform you confirm that the information you
          provide is accurate and complete.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">2. Bookings &amp; Payments</h2>
        <ul className="list-disc pl-6 space-y-2 leading-7">
          <li>
            Bookings are confirmed only after successful payment through our payment
            partner.
          </li>
          <li>
            The total rental price is calculated based on the daily rate and the
            number of rental days, plus applicable charges.
          </li>
          <li>
            A booking receipt is emailed to you after a successful payment.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">3. Use of Vehicle</h2>
        <ul className="list-disc pl-6 space-y-2 leading-7">
          <li>The vehicle must be returned at the agreed location and time.</li>
          <li>
            The renter is responsible for traffic violations, fines, and damage
            caused during the rental period, as per policy.
          </li>
          <li>Sub-letting or using the vehicle for illegal activities is prohibited.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">4. Cancellations &amp; Refunds</h2>
        <p className="leading-7">
          Cancellation and refund eligibility depend on how far in advance the
          booking is cancelled. Refunds, where applicable, are processed back to the
          original payment method.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">5. Vendor Responsibilities</h2>
        <p className="leading-7">
          Vendors listing vehicles must ensure their vehicles are roadworthy,
          insured, and accurately described. All listings are subject to approval by
          our admin team before going live.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">6. Limitation of Liability</h2>
        <p className="leading-7">
          Rent a Ride acts as a platform connecting renters and vehicle owners. We
          are not liable for any indirect or consequential loss arising from the use
          of a rented vehicle, to the extent permitted by law.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">7. Changes to These Terms</h2>
        <p className="leading-7">
          We may update these Terms from time to time. Continued use of the platform
          after changes constitutes acceptance of the revised Terms.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">8. Contact</h2>
        <p className="leading-7">
          Questions about these Terms? Email us at{" "}
          <a href="mailto:sunamkundal366@gmail.com" className="text-blue-600 underline">
            sunamkundal366@gmail.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default TermsAndConditions;
