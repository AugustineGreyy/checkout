export interface FlutterwaveConfig {
  public_key: string;
  tx_ref: string;
  amount: number;
  currency: 'USD' | 'NGN' | string;
  payment_options: string;
  redirect_url?: string;
  meta?: Record<string, any>;
  customer: {
    email: string;
    phone_number: string;
    name: string;
  };
  customizations: {
    title: string;
    description: string;
    logo?: string;
  };
  callback: (response: any) => void;
  onclose: () => void;
}

declare global {
  interface Window {
    FlutterwaveCheckout?: (config: FlutterwaveConfig) => void;
  }
}
