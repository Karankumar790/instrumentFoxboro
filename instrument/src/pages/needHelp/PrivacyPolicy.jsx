// src/pages/PrivacyPolicy.tsx
import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-12">
      <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-6">
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, and protect your information when you use our services.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            1. Information We Collect
          </h2>
          <p className="text-gray-600">
            We may collect personal information such as your name, email
            address, contact details, and usage data when you register or
            interact with our services.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            2. How We Use Your Information
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>To provide and improve our services</li>
            <li>To personalize user experience</li>
            <li>To send important updates or promotional offers</li>
            <li>To maintain security and prevent fraud</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            3. Data Protection
          </h2>
          <p className="text-gray-600">
            We implement security measures to protect your personal information
            from unauthorized access, alteration, or disclosure. However, no
            method of transmission over the internet is 100% secure.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            4. Sharing Your Information
          </h2>
          <p className="text-gray-600">
            We do not sell or trade your personal information. We may share data
            with trusted third parties who assist us in operating our services,
            provided they agree to keep your information confidential.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            5. Your Rights
          </h2>
          <p className="text-gray-600">
            You have the right to access, update, or delete your personal
            information. To exercise these rights, please contact us at
            support@example.com.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            6. Updates to This Policy
          </h2>
          <p className="text-gray-600">
            We may update this Privacy Policy from time to time. Updates will be
            posted on this page with the “Last Updated” date.
          </p>
        </section>

        <p className="text-gray-500 mt-6 text-sm">
          <strong>Last Updated:</strong> August 2025
        </p>
      </div>
    </div>
  );
}
