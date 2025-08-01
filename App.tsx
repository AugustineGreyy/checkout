
import React, { useState } from 'react';
import FormField from './components/FormField';
import Icon from './components/Icon';
import './types'; // Import for side-effects (global type declaration)
import type { FlutterwaveConfig } from './types';

const FLUTTERWAVE_PUBLIC_KEY = 'FLWPUBK-195e7cf35eaa32809681ce06b00b7efd-X';

const prices = {
  USD: { amount: 7, symbol: '$' },
  NGN: { amount: 7500, symbol: '₦' },
  GHS: { amount: 50, symbol: 'GH₵' },
  ZAR: { amount: 99, symbol: 'R' },
  GBP: { amount: 5, symbol: '£' },
  EUR: { amount: 6, symbol: '€' },
};
type Currency = keyof typeof prices;


const App: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // e.g., 0.5 for 50%
  const [discountStatus, setDiscountStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);


  const handleApplyDiscount = () => {
      setDiscountStatus(null);
      if (discountCode.toUpperCase() === '50ZXC') {
          setAppliedDiscount(0.5);
          setDiscountStatus({ type: 'success', message: 'Success! 50% discount has been applied.' });
      } else {
          setAppliedDiscount(0);
          setDiscountStatus({ type: 'error', message: 'This discount code is not valid.' });
      }
  };

  const basePrice = currency ? prices[currency].amount : 0;
  const discountAmount = basePrice * appliedDiscount;
  const totalPrice = basePrice - discountAmount;

  const handlePayment = () => {
    if (!name || !email || !currency) {
        setStatus({ type: 'error', message: 'Please fill in your name and email.' });
        return;
    }
    setLoading(true);
    setStatus(null);
    
    const config: FlutterwaveConfig = {
      public_key: FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: `checkout-${Date.now()}`,
      amount: totalPrice,
      currency: currency,
      payment_options: 'card,banktransfer,ussd',
      customer: {
        email: email,
        name: name,
        phone_number: '',
      },
      customizations: {
        title: 'Complete Your Purchase',
        description: `Payment for your order`,
        logo: 'https://i.postimg.cc/vBF0bW1Q/images-5.jpg',
      },
      callback: (response: any) => {
        setLoading(false);
        if (response.status === 'successful') {
            setStatus({ type: 'success', message: 'Payment successful! Your order is complete.' });
        } else {
            setStatus({ type: 'error', message: 'Payment was not successful. Please try again.' });
        }
      },
      onclose: () => {
        setLoading(false);
        if (!status || status.type === 'info') {
            setStatus({ type: 'info', message: 'Payment modal closed.' });
        }
      },
    };

    if (window.FlutterwaveCheckout) {
      window.FlutterwaveCheckout(config);
    } else {
      setLoading(false);
      setStatus({ type: 'error', message: 'Payment gateway could not be loaded. Please refresh the page.' });
      console.error('FlutterwaveCheckout function not found.');
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="flex items-center justify-center py-12 px-4">
        <main className="w-full max-w-lg mx-auto">
          <div className="bg-light rounded-2xl shadow-2xl overflow-hidden">
            
            {/* Checkout Form */}
            <div className="w-full p-8 md:p-12">
                 <div className="text-center mb-8">
                  <img src="https://i.postimg.cc/vBF0bW1Q/images-5.jpg" alt="Logo" className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-gray-200"/>
                </div>

                <h2 className="text-xl font-bold text-dark text-center">Complete Your Purchase</h2>
                
                <div className="mt-6 space-y-4">
                    <FormField 
                      id="name" 
                      label="Full Name" 
                      type="text" 
                      placeholder="John Doe" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      icon={<Icon className="w-5 h-5 text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg></Icon>} 
                    />
                    <FormField 
                      id="email" 
                      label="Email Address" 
                      type="email" 
                      placeholder="you@example.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      icon={<Icon className="w-5 h-5 text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 2.5l7.997 3.384A2 2 0 0019 7.574V15a2 2 0 01-2 2H3a2 2 0 01-2-2V7.574a2 2 0 001.003-1.69zM18 7.574l-8 3.393L2 7.574V5.884l8 3.393 8-3.393v1.69z" /></svg></Icon>}
                    />
                </div>
                
                <div className="mt-6">
                  <label className="block text-sm font-medium text-dark mb-2">Select Currency</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {(Object.keys(prices) as Currency[]).map(key => (
                          <button 
                              key={key} 
                              onClick={() => setCurrency(key)}
                              className={`px-4 py-2 text-sm font-semibold rounded-md transition-all duration-200 border-2 ${currency === key ? 'bg-primary text-light border-primary' : 'bg-light text-dark border-gray-300 hover:border-primary'}`}
                          >
                              {key}
                          </button>
                      ))}
                  </div>
                </div>

                <div className="mt-6">
                    <label htmlFor="discount" className="block text-sm font-medium text-dark mb-1">Discount Code (Optional)</label>
                    <div className="flex space-x-2">
                        <input 
                            type="text" 
                            id="discount" 
                            placeholder="Enter code"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                            className="block w-full px-3 py-2 bg-secondary border border-gray-200 rounded-md placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm text-dark"
                        />
                        <button onClick={handleApplyDiscount} className="px-4 py-2 bg-gray-200 text-dark font-semibold rounded-md hover:bg-gray-300 transition-colors shrink-0">Apply</button>
                    </div>
                    {discountStatus && (
                        <p className={`mt-2 text-sm ${discountStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>{discountStatus.message}</p>
                    )}
                </div>

                {currency && (
                  <div className="mt-6 p-4 bg-secondary rounded-lg border border-gray-200">
                      <h3 className="text-lg font-semibold text-dark">Order Summary</h3>
                      <div className="mt-4 space-y-2 text-gray-text">
                          <div className="flex justify-between">
                              <span>Price</span>
                              <span className="font-medium text-dark">{prices[currency].symbol}{basePrice.toFixed(2)}</span>
                          </div>
                          {appliedDiscount > 0 && (
                              <div className="flex justify-between text-green-600">
                                  <span>Discount ({appliedDiscount * 100}%)</span>
                                  <span>-{prices[currency].symbol}{discountAmount.toFixed(2)}</span>
                              </div>
                          )}
                          <div className="border-t border-gray-200 my-2"></div>
                          <div className="flex justify-between text-xl font-bold text-dark">
                              <span>Total</span>
                              <span>{prices[currency].symbol}{totalPrice.toFixed(2)}</span>
                          </div>
                      </div>
                  </div>
                )}

                {status && (
                    <div className={`mt-4 p-3 rounded-md text-sm ${
                        status.type === 'success' ? 'bg-green-100 text-green-800' : 
                        status.type === 'error' ? 'bg-red-100 text-red-800' : 
                        'bg-blue-100 text-blue-800'
                    }`}>
                        {status.message}
                    </div>
                )}
                
                <button
                    onClick={handlePayment}
                    disabled={loading || !currency || !name || !email}
                    className="w-full mt-8 bg-primary text-light font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all duration-300 disabled:bg-blue-300 disabled:cursor-not-allowed disabled:animate-none flex items-center justify-center text-lg animate-pulse-slow"
                >
                    {loading ? (
                       <>
                         <Icon className="w-6 h-6 mr-3 animate-spin">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                         </Icon>
                         Processing Payment...
                       </>
                    ) : currency ? (
                        `Pay ${prices[currency].symbol}${totalPrice.toFixed(2)} Now`
                    ) : (
                      'Complete Purchase'
                    )}
                </button>
                <div className="mt-4 text-center text-xs text-gray-text">
                  <span>Powered by flutterwave x gigbanc</span>
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;