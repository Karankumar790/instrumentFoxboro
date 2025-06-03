import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer/Footer";

function TermsConditions() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-400">
      <Header />
      <main className="flex-grow justify-center items-center flex">
        <h1 className="text-3xl font-semibold text-black">
          Terms And conditions
        </h1>
      </main>
      <Footer />
    </div>
  );
}

export default TermsConditions;
