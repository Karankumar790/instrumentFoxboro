// src/pages/RefundReturn.tsx
import React from "react";

export default function RefundReturn() {
  return (
    <div className="min-h-screen bg-gray-50 flex justify-center px-4 py-12">
      <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Refund & Return Policy
        </h1>
        <p className="text-gray-600 mb-6">
          We want you to be completely satisfied with your purchase. This policy
          outlines the process for requesting refunds and returns.
        </p>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            1. Eligibility for Returns
          </h2>
          <p className="text-gray-600">
            Items can be returned within 7–14 days of delivery if they are
            unused, in original packaging, and accompanied by proof of purchase.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            2. Non-Returnable Items
          </h2>
          <ul className="list-disc list-inside text-gray-600 space-y-1">
            <li>Digital/downloadable products</li>
            <li>Gift cards</li>
            <li>Clearance or final sale items</li>
          </ul>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            3. Refund Process
          </h2>
          <p className="text-gray-600">
            Once we receive your return, we will inspect the item and notify you
            of the approval or rejection of your refund. Approved refunds will
            be processed within 5–7 business days.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-2 text-gray-700">
            4. Exchanges
          </h2>
          <p className="text-gray-600">
            Defective or damaged items may be exchanged for the same product. To
            request an exchange, please contact our support team.
          </p>
        </section>

        <p className="text-gray-500 mt-6 text-sm">
          <strong>Contact Us:</strong> For refund and return inquiries, email us
          at support@example.com
        </p>
      </div>
    </div>
  );
}
