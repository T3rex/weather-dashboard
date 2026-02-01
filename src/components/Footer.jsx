import { Github, ExternalLink } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 mt-auto border-t bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Branding/Copyright */}
        <div className="text-sm text-muted-foreground text-center sm:text-left">
          <p>© {currentYear} WeatherDash. Built with React & RTK Query.</p>
        </div>

        {/* GitHub Link */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/T3rex/weather-dashboard" // Update this to your specific repo link
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github
              size={18}
              className="group-hover:scale-110 transition-transform"
            />
            <span>View Source Code</span>
            <ExternalLink
              size={14}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
