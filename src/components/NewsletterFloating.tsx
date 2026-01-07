import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { X, Mail, CheckCircle } from 'lucide-react';

interface NewsletterFloatingProps {
  onClose?: () => void;
  isVisible?: boolean;
}

export default function NewsletterFloating({ onClose, isVisible = true }: NewsletterFloatingProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isVisible && !localStorage.getItem('newsletter_shown')) {
        setIsMinimized(false);
        localStorage.setItem('newsletter_shown', 'true');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [isVisible]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock subscription logic
      const subscribers = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
      
      if (subscribers.includes(email)) {
        setStatus('error');
        setMessage('Email already subscribed');
        return;
      }
      
      subscribers.push(email);
      localStorage.setItem('newsletter_subscribers', JSON.stringify(subscribers));
      
      setStatus('success');
      setMessage('Successfully subscribed!');
      setEmail('');
      
      setTimeout(() => {
        setIsMinimized(true);
      }, 2000);
      
    } catch (error) {
      setStatus('error');
      setMessage('Subscription failed. Please try again.');
    }
  };

  const handleClose = () => {
    setIsMinimized(true);
    onClose?.();
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'transform translate-y-full opacity-0 pointer-events-none' : ''
    }`}>
      <Card className="w-80 bg-white/95 backdrop-blur-sm border-green-200 shadow-lg">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-gray-900">Stay Updated</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-6 w-6 p-0 text-gray-400 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          {status === 'success' ? (
            <div className="text-center py-2">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-green-600 font-medium">{message}</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-gray-600 mb-3">
                Get weekly insights on regenerative impact and investment opportunities.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-sm"
                  required
                />
                
                <Button 
                  type="submit" 
                  className="w-full text-sm"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                </Button>
                
                {message && status === 'error' && (
                  <p className="text-xs text-red-600">{message}</p>
                )}
              </form>
              
              <p className="text-xs text-gray-500 mt-2">
                Unsubscribe anytime. No spam, ever.
              </p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}