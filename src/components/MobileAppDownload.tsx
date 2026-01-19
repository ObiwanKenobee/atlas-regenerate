import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { QrCode, Smartphone, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface MobileAppDownloadProps {
  className?: string;
  title?: string;
  description?: string;
  iosAppUrl?: string;
  androidAppUrl?: string;
  qrCodeUrl?: string;
}

export default function MobileAppDownload({
  className = "",
  title = "Download Our Mobile App",
  description = "Experience Atlas Sanctum on the go with our mobile app. Track your impact, manage projects, and stay connected to the regenerative ecosystem.",
  iosAppUrl = "https://apps.apple.com/app/atlas-sanctum",
  androidAppUrl = "https://play.google.com/store/apps/details?id=com.atlassanctum",
  qrCodeUrl = "/qr-code.png"
}: MobileAppDownloadProps) {
  const { user } = useAuth();
  const [downloadCount, setDownloadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch download count from Supabase
    const fetchDownloadCount = async () => {
      try {
        const { count, error } = await supabase
          .from("app_downloads")
          .select("*", { count: "exact", head: true });

        if (!error && count) {
          setDownloadCount(count);
        }
      } catch (error) {
        console.error("Error fetching download count:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDownloadCount();
  }, []);

  const trackDownload = async (platform: "ios" | "android") => {
    try {
      // Track download event in Supabase
      const { error } = await supabase
        .from("app_downloads")
        .insert({
          user_id: user?.id || "anonymous",
          platform,
          timestamp: new Date().toISOString()
        });

      if (!error) {
        // Update download count
        setDownloadCount(prev => prev + 1);
      }
    } catch (error) {
      console.error("Error tracking download:", error);
    }
  };

  const handleDownload = (url: string, platform: "ios" | "android") => {
    trackDownload(platform);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className={`w-full max-w-2xl mx-auto ${className}`}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
          <Smartphone className="h-6 w-6" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <p className="text-center text-muted-foreground">{description}</p>

          {/* App Store Badges */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="outline"
              className="w-full sm:w-auto flex items-center gap-2 justify-center"
              onClick={() => handleDownload(iosAppUrl, "ios")}
              disabled={isLoading}
              aria-label="Download on the App Store"
            >
              <Download className="h-4 w-4" />
              <span>Download on the</span>
              <span className="font-semibold">App Store</span>
            </Button>

            <Button
              variant="outline"
              className="w-full sm:w-auto flex items-center gap-2 justify-center"
              onClick={() => handleDownload(androidAppUrl, "android")}
              disabled={isLoading}
              aria-label="Get it on Google Play"
            >
              <Download className="h-4 w-4" />
              <span>GET IT ON</span>
              <span className="font-semibold">Google Play</span>
            </Button>
          </div>

          {/* QR Code Section */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Scan to download on your mobile device
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block p-4 bg-white rounded-lg shadow-sm cursor-pointer"
              onClick={() => window.open(qrCodeUrl, "_blank", "noopener,noreferrer")}
              aria-label="QR Code for mobile app download"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  window.open(qrCodeUrl, "_blank", "noopener,noreferrer");
                }
              }}
            >
              <div className="w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                <QrCode className="h-16 w-16 text-gray-600" />
              </div>
            </motion.div>
            <p className="text-xs text-muted-foreground mt-2">
              {isLoading ? "Loading..." : `${downloadCount.toLocaleString()}+ downloads`}
            </p>
          </div>

          {/* Features List */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Real-time impact tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Project management</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Community connection</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              <span>Offline capabilities</span>
            </div>
          </div>

          {/* No-JS Fallback */}
          <noscript>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                JavaScript is required for the full mobile app experience. 
                <a href={iosAppUrl} className="text-blue-600 underline">Download for iOS</a> or 
                <a href={androidAppUrl} className="text-blue-600 underline">Download for Android</a>.
              </p>
            </div>
          </noscript>
        </div>
      </CardContent>
    </Card>
  );
}