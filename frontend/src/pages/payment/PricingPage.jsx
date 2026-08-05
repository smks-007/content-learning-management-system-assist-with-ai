import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiZap } from 'react-icons/fi';

const plans = [
  {
    name: 'Free', price: { monthly: 0, yearly: 0 }, color: 'border-white/10', badge: null,
    features: ['5 courses', 'Basic AI assistant', 'Community support', 'Mobile access', 'Quiz system'],
    missing: ['Unlimited courses', 'Advanced AI tools', 'Certificates', 'Priority support', 'Code playground'],
  },
  {
    name: 'Pro', price: { monthly: 29, yearly: 23 }, color: 'border-indigo-500/60', badge: 'Most Popular',
    features: ['Unlimited courses', 'All AI features', 'Priority support', 'Certificates', 'Code playground', 'Progress analytics', 'Download resources'],
    missing: ['Custom domain', 'White-label', 'API access'],
  },
  {
    name: 'Enterprise', price: { monthly: 99, yearly: 79 }, color: 'border-purple-500/40', badge: null,
    features: ['Everything in Pro', 'Custom domain', 'White-label branding', 'API access', 'SLA guarantee', 'Dedicated support', 'Custom integrations'],
    missing: [],
  },
];

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="min-h-screen bg-dark-950 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm mb-4">
            <FiZap className="w-4 h-4" /> Transparent Pricing
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">Simple, Honest Pricing</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">Choose the plan that fits your learning goals. Upgrade or downgrade anytime.</p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm ${!yearly ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
            <button onClick={() => setYearly(!yearly)}
              className={`w-14 h-7 rounded-full transition-all relative ${yearly ? 'bg-indigo-600' : 'bg-gray-700'}`}>
              <div className={`absolute w-5 h-5 rounded-full bg-white top-1 transition-transform ${yearly ? 'translate-x-8' : 'translate-x-1'}`} />
            </button>
            <span className={`text-sm ${yearly ? 'text-white' : 'text-gray-400'}`}>
              Yearly <span className="text-emerald-400 text-xs font-medium">Save 20%</span>
            </span>
          </div>
        </motion.div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className={`relative bg-white/5 backdrop-blur-xl border-2 ${plan.color} rounded-3xl p-8 ${plan.name === 'Pro' ? 'ring-2 ring-indigo-500/30 shadow-2xl shadow-indigo-500/10 scale-105' : ''}`}>
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold whitespace-nowrap">
                  {plan.badge}
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-bold text-white">${yearly ? plan.price.yearly : plan.price.monthly}</span>
                  <span className="text-gray-400 text-sm mb-1">/mo</span>
                </div>
                {yearly && plan.price.yearly !== plan.price.monthly && (
                  <div className="text-emerald-400 text-xs mt-1">Save ${(plan.price.monthly - plan.price.yearly) * 12}/year</div>
                )}
              </div>
              <button className={`w-full py-3 rounded-xl font-semibold text-sm mb-6 transition-all ${plan.name === 'Pro' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white' : 'border border-white/20 text-gray-300 hover:text-white hover:border-white/40'}`}>
                {plan.price.monthly === 0 ? 'Get Started Free' : `Start ${plan.name}`}
              </button>
              <div className="space-y-3">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <FiCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />{f}
                  </div>
                ))}
                {plan.missing.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-gray-600 line-through">
                    <div className="w-4 h-4 flex-shrink-0" />{f}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          {[
            ['Can I switch plans?', 'Yes, you can upgrade or downgrade at any time. Changes take effect immediately.'],
            ['Is there a free trial?', 'Yes! Our Free plan gives you access to 5 courses with no credit card required.'],
            ['What payment methods do you accept?', 'We accept all major credit cards, PayPal, and bank transfers for annual plans.'],
            ['Can I get a refund?', 'Yes, we offer a 30-day money-back guarantee, no questions asked.'],
          ].map(([q, a]) => (
            <details key={q} className="mb-3 group bg-white/5 border border-white/10 rounded-xl overflow-hidden">
              <summary className="p-4 cursor-pointer text-white font-medium flex justify-between items-center list-none">
                {q} <span className="text-indigo-400 group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="px-4 pb-4 text-gray-400 text-sm">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
