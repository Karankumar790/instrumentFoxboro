import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer/Footer";

function RefundReturn() {
  return (
    // <div>
    //   <Header />
    //   <h1>refund and return</h1>
    //    <div className="bg-slate-400 bottom-0 mt-96">
    //     <Footer />
    //   </div>
    // </div>
    <div className="min-h-screen flex flex-col  bg-slate-400">
      <Header />

      <main className="flex-grow justify-center items-center flex">
        <h1 className="text-3xl font-semibold text-black">Refund and Return</h1>
        {/* Add more content here if needed */}
      </main>

      <Footer />
    </div>
  );
}

export default RefundReturn;
