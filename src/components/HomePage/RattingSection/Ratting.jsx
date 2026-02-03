"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { useAxios } from "@/providers/AxiosProvider";

export const priceRefExport = { current: null };

// Helper function for smooth scrolling
const scrollToElement = (element) => {
  if (!element) return;
  try {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch {
    const y = element.getBoundingClientRect().top + window.pageYOffset - 80;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const Ratting = () => {
  const axios = useAxios();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const priceRef = useRef(null);

  const fetchPlans = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/subscriptions/plans/");
      setPlans(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
    priceRefExport.current = priceRef.current;
  }, []);

  useEffect(() => {
    const shouldScroll = localStorage.getItem("scrollToPricing") === "true";
    if (shouldScroll && priceRef.current) {
      setTimeout(() => {
        scrollToElement(priceRef.current);
        localStorage.removeItem("scrollToPricing");
      }, 600);
    }
  }, [plans]);

  const handlePlanClick = async (planId) => {
    try {
      const res = await axios.post("/subscriptions/create-checkout-session/", {
        plan_id: planId,
      });

      const checkoutUrl = res.data.url; // <-- updated to match your backend
      if (!checkoutUrl) throw new Error("No checkout URL returned");

      window.location.href = checkoutUrl;
    } catch (err) {
      console.error(err);
      alert("Payment system unavailable. Try again.");
    }
  };

  return (
    <div className="bg-black lg:px-16 px-5">
      <div id="pricing-section" ref={priceRef}>
        <div className="flex justify-center pt-32">
          <h1 className="text-white border border-white rounded-sm w-44 text-center text-xl">
            Our Pricing Plans
          </h1>
        </div>

        <h1 className="text-center mt-7 text-4xl font-bold text-white">
          Accessible{" "}
          <span className="font-playfair text-[#9D50FF] italic">therapy</span>{" "}
          for every mind
        </h1>

        <div className="mt-16 pb-20 flex flex-col lg:flex-row gap-6 justify-center">
          {loading && (
            <p className="text-white text-center text-lg">
              Loading pricing plans...
            </p>
          )}

          {error && (
            <div className="bg-[#001742] p-8 rounded-xl text-center">
              <p className="text-red-400 mb-2">{error}</p>
              <button
                onClick={fetchPlans}
                className="bg-[#9D50FF] px-6 py-2 rounded text-white"
              >
                Retry
              </button>
            </div>
          )}

          {!loading &&
            !error &&
            plans.map((plan) => {
              const features =
                Array.isArray(plan.features) ?
                  plan.features
                : String(plan.features || "").split("\n");

              return (
                <div
                  key={plan.id}
                  className="lg:w-[420px] min-h-[520px] bg-[#001742] rounded-xl p-10 flex flex-col justify-between border-2 border-transparent hover:border-white duration-300"
                >
                  <div>
                    <h1 className="text-[#9D50FF] text-3xl text-center">
                      {plan.name}
                    </h1>

                    <p className="text-white text-center mt-3 mb-10">
                      {plan.description}
                    </p>

                    {plan.recommended && (
                      <div className="absolute top-0 right-0 bg-[#9D50FF] px-3 py-1 text-white rounded-bl-xl">
                        Recommended
                      </div>
                    )}

                    {features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2 py-2">
                        <FaCheck className="text-[#9D50FF]" />
                        <span className="text-white">{feature}</span>
                      </div>
                    ))}

                    <div className="flex items-center gap-2 mt-4">
                      <FaCheck className="text-[#9D50FF]" />
                      <span className="text-white">
                        Validity – {plan.duration_days} days
                      </span>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-white text-center text-2xl font-bold my-6">
                      ${plan.price}
                    </h2>

                    <button
                      onClick={() => handlePlanClick(plan.id)}
                      className="w-full bg-[#9D50FF] py-2 rounded text-white hover:opacity-90"
                    >
                      Choose this plan
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Ratting;
export { Ratting };
