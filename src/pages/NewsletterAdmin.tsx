import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserFlowLayout from '@/components/UserFlowLayout';
import { 
  Mail, Users, Send, BarChart3, Settings, 
  Plus, Edit, Trash2, Download, Upload 
} from 'lucide-react';

interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  status: 'active' | 'unsubscribed';
}

interface Campaign {
  id: string;
  subject: string;
  content: string;
  sent_at?: string;
  status: 'draft' | 'sent' | 'scheduled';
  open_rate?: number;
  click_rate?: number;
}

export default function NewsletterAdmin() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [newCampaign, setNewCampaign] = useState({ subject: '', content: '' });
  const [stats, setStats] = useState({
    totalSubscribers: 0,
    activeSubscribers: 0,
    totalCampaigns: 0,
    avgOpenRate: 0
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    // Load subscribers from localStorage
    const subscriberEmails = JSON.parse(localStorage.getItem('newsletter_subscribers') || '[]');
    const subscriberData: Subscriber[] = subscriberEmails.map((email: string, index: number) => ({
      id: `sub_${index}`,
      email,
      subscribed_at: new Date().toISOString(),
      status: 'active' as const
    }));
    
    // Load campaigns from localStorage
    const campaignData = JSON.parse(localStorage.getItem('newsletter_campaigns') || '[]');
    
    setSubscribers(subscriberData);
    setCampaigns(campaignData);
    
    // Calculate stats
    setStats({
      totalSubscribers: subscriberData.length,
      activeSubscribers: subscriberData.filter(s => s.status === 'active').length,
      totalCampaigns: campaignData.length,
      avgOpenRate: campaignData.length > 0 
        ? campaignData.reduce((acc: number, c: Campaign) => acc + (c.open_rate || 0), 0) / campaignData.length 
        : 0
    });
  };

  const createCampaign = () => {
    if (!newCampaign.subject || !newCampaign.content) return;
    
    const campaign: Campaign = {
      id: `camp_${Date.now()}`,
      subject: newCampaign.subject,
      content: newCampaign.content,
      status: 'draft'
    };
    
    const updatedCampaigns = [...campaigns, campaign];
    setCampaigns(updatedCampaigns);
    localStorage.setItem('newsletter_campaigns', JSON.stringify(updatedCampaigns));
    
    setNewCampaign({ subject: '', content: '' });
  };

  const sendCampaign = (campaignId: string) => {
    const updatedCampaigns = campaigns.map(c => 
      c.id === campaignId 
        ? { 
            ...c, 
            status: 'sent' as const, 
            sent_at: new Date().toISOString(),
            open_rate: Math.random() * 30 + 15, // Mock open rate
            click_rate: Math.random() * 5 + 2   // Mock click rate
          }
        : c
    );
    
    setCampaigns(updatedCampaigns);
    localStorage.setItem('newsletter_campaigns', JSON.stringify(updatedCampaigns));
    loadData(); // Refresh stats
  };

  const deleteCampaign = (campaignId: string) => {
    const updatedCampaigns = campaigns.filter(c => c.id !== campaignId);
    setCampaigns(updatedCampaigns);
    localStorage.setItem('newsletter_campaigns', JSON.stringify(updatedCampaigns));
  };

  const exportSubscribers = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Email,Status,Subscribed At\n"
      + subscribers.map(s => `${s.email},${s.status},${s.subscribed_at}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "subscribers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <UserFlowLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Newsletter Admin</h1>
            <p className="text-gray-600">Manage subscribers and campaigns</p>
          </div>
          <Button onClick={() => window.location.reload()}>
            <Settings className="h-4 w-4 mr-2" />
            Refresh Data
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Subscribers</p>
                  <p className="text-2xl font-bold">{stats.totalSubscribers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Active Subscribers</p>
                  <p className="text-2xl font-bold">{stats.activeSubscribers}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Send className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="text-sm text-gray-600">Total Campaigns</p>
                  <p className="text-2xl font-bold">{stats.totalCampaigns}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm text-gray-600">Avg Open Rate</p>
                  <p className="text-2xl font-bold">{stats.avgOpenRate.toFixed(1)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="campaigns" className="space-y-4">
          <TabsList>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="subscribers">Subscribers</TabsTrigger>
            <TabsTrigger value="create">Create Campaign</TabsTrigger>
          </TabsList>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Email Campaigns</h2>
            </div>
            
            <div className="space-y-4">
              {campaigns.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No campaigns created yet</p>
                  </CardContent>
                </Card>
              ) : (
                campaigns.map((campaign) => (
                  <Card key={campaign.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold">{campaign.subject}</h3>
                            <Badge variant={
                              campaign.status === 'sent' ? 'default' : 
                              campaign.status === 'scheduled' ? 'secondary' : 'outline'
                            }>
                              {campaign.status}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-gray-600 mb-2">
                            {campaign.content.substring(0, 100)}...
                          </p>
                          
                          {campaign.sent_at && (
                            <div className="flex gap-4 text-sm text-gray-500">
                              <span>Sent: {new Date(campaign.sent_at).toLocaleDateString()}</span>
                              {campaign.open_rate && (
                                <span>Open Rate: {campaign.open_rate.toFixed(1)}%</span>
                              )}
                              {campaign.click_rate && (
                                <span>Click Rate: {campaign.click_rate.toFixed(1)}%</span>
                              )}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          {campaign.status === 'draft' && (
                            <Button 
                              size="sm" 
                              onClick={() => sendCampaign(campaign.id)}
                            >
                              <Send className="h-4 w-4 mr-1" />
                              Send
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => deleteCampaign(campaign.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Subscribers Tab */}
          <TabsContent value="subscribers" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Subscribers</h2>
              <Button onClick={exportSubscribers}>
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
            
            <Card>
              <CardContent className="p-0">
                {subscribers.length === 0 ? (
                  <div className="p-8 text-center">
                    <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No subscribers yet</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {subscribers.map((subscriber) => (
                      <div key={subscriber.id} className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{subscriber.email}</p>
                          <p className="text-sm text-gray-500">
                            Subscribed: {new Date(subscriber.subscribed_at).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant={subscriber.status === 'active' ? 'default' : 'secondary'}>
                          {subscriber.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Create Campaign Tab */}
          <TabsContent value="create" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Create New Campaign</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject Line</label>
                  <Input
                    placeholder="Enter email subject"
                    value={newCampaign.subject}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, subject: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Email Content</label>
                  <Textarea
                    placeholder="Write your newsletter content..."
                    rows={8}
                    value={newCampaign.content}
                    onChange={(e) => setNewCampaign(prev => ({ ...prev, content: e.target.value }))}
                  />
                </div>
                
                <Button 
                  onClick={createCampaign}
                  disabled={!newCampaign.subject || !newCampaign.content}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Campaign
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </UserFlowLayout>
  );
}