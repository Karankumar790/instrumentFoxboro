// src/pages/TermsConditions.tsx
import React from "react";

export default function TermsConditions() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-12">
      <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Terms & Conditions
        </h1>
        <p className="text-gray-600 mb-6">
          By accessing and using our website, you agree to the following terms
          and conditions. Please read them carefully.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            1. Use of Service
          </h2>
          <p className="text-gray-600">
            You agree to use our services only for lawful purposes and in a way
            that does not infringe on the rights of others or restrict their use
            of the platform.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            2. User Accounts
          </h2>
          <p className="text-gray-600">
            You are responsible for maintaining the confidentiality of your
            account credentials. We are not liable for unauthorized use of your
            account.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            3. Intellectual Property
          </h2>
          <p className="text-gray-600">
            All content, designs, and materials on this site are the property of
            our company and may not be reproduced without permission.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            4. Limitation of Liability
          </h2>
          <p className="text-gray-600">
            We are not liable for any damages resulting from the use or
            inability to use our services, except as required by law.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            5. Changes to Terms
          </h2>
          <p className="text-gray-600">
            We reserve the right to update these Terms & Conditions at any time.
            Changes will be effective immediately upon posting.
          </p>
        </section>

        <p className="text-gray-500 mt-6 text-sm">
          <strong>Last Updated:</strong> August 2025
        </p>
      </div>
    </div>
  );
}
