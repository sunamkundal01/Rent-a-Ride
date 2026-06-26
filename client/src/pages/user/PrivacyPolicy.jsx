const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 mt-10 text-gray-800">
      <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-10">Last updated: June 2026</p>

      <p className="mb-6 leading-7">
        At <strong>Rent a Ride</strong> ("we", "us", or "our") we are committed to
        protecting your privacy. This Privacy Policy explains how we collect, use,
        and safeguard your information when you use our car rental platform.
      </p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
        <ul className="list-disc pl-6 space-y-2 leading-7">
          <li>
            <strong>Account information:</strong> name, email address, phone number,
            and address provided during sign up or checkout.
          </li>
          <li>
            <strong>Booking information:</strong> pickup and drop-off locations,
            dates, and the vehicles you book.
          </li>
          <li>
            <strong>Payment information:</strong> payments are processed securely by
            our payment partner (Razorpay). We do not store your card details on our
            servers.
          </li>
          <li>
            <strong>Vendor information:</strong> if you list vehicles, the vehicle
            and document details you upload.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
        <ul className="list-disc pl-6 space-y-2 leading-7">
          <li>To create and manage your account and bookings.</li>
          <li>To process payments and send you booking confirmations and receipts.</li>
          <li>To verify vendors and approve vehicle listings.</li>
          <li>To improve our services, security, and customer support.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">3. Sharing of Information</h2>
        <p className="leading-7">
          We do not sell your personal information. We share information only with
          service providers necessary to operate the platform (such as payment,
          email, and media-storage providers) and when required by law.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
        <p className="leading-7">
          Passwords are stored using one-way encryption (hashing) and access is
          protected using authentication tokens. While we take reasonable measures to
          protect your data, no method of transmission over the internet is 100%
          secure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">5. Your Rights</h2>
        <p className="leading-7">
          You can view and edit your profile, view your booking history, and delete
          your account at any time from your profile page. Deleting your account
          removes your personal information from our active systems.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">6. Contact Us</h2>
        <p className="leading-7">
          If you have any questions about this Privacy Policy, contact us at{" "}
          <a href="mailto:sunamkundal366@gmail.com" className="text-blue-600 underline">
            sunamkundal366@gmail.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
