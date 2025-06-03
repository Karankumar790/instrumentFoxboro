import React from "react";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header";

function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-400">
      <Header />
      <main className="flex-grow justify-center items-center flex">
        <h1 className="text-3xl font-semibold text-black">
          Privacy and policy
        </h1>
      </main>
      <Footer />
    </div>
  );
}

export default PrivacyPolicy;
