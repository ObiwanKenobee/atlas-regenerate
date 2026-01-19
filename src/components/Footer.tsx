import { Leaf, Twitter, Linkedin, Github, Mail } from "lucide-react";
import MobileAppDownload from "./MobileAppDownload";

const Footer = () => {
  const footerLinks = {
    Platform: ["How It Works", "Ecosystem", "Governance", "Roadmap"],
    Resources: ["Documentation", "Research", "Impact Stories", "Blog"],
    Community: ["Discord", "Forum", "Events", "Partners"],
    Company: ["About", "Careers", "Press", "Contact"],
  };

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Mail, href: "#", label: "Email" },
  ];

  return (
    <footer className="py-20 border-t border-border/50 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest-deep/10 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-forest to-ocean flex items-center justify-center">
                <Leaf className="w-5 h-5 text-background" />
              </div>
              <span className="font-serif text-xl text-foreground">Atlas Sanctum</span>
            </a>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-6">
              A regenerative platform where ethics govern intelligence, intelligence 
              guides capital, and capital restores the world.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-medium text-foreground mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Mobile App Download Section */}
        <div className="pt-12">
          <MobileAppDownload
            title="Get Our Mobile App"
            description="Experience Atlas Sanctum on your mobile device"
            className="max-w-md mx-auto"
          />
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 Atlas Sanctum. Building regenerative futures.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors duration-300">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors duration-300">
              Cookie Settings
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
