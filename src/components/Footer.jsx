import { Link } from "react-router-dom"
import { Mail, Linkedin, Twitter, Github, Shield } from "lucide-react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { href: "/map-spot", label: "Real-time Crime Map" },
    { href: "/subscribe", label: "Subscribe to Alerts" },
    { href: "/learn/modules", label: "Learning" },
    { href: "/contact", label: "Contact Us" },
  ]

  const socialLinks = [
    { href: "#", label: "LinkedIn", icon: Linkedin },
    { href: "#", label: "Twitter", icon: Twitter },
    { href: "#", label: "GitHub", icon: Github },
  ]

  return (
    <footer className="bg-gray-900 text-gray-200 py-8 mt-auto">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          {/* About Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-cyan-400" />
              <h3 className="text-lg font-semibold text-cyan-400">Cyber Rakshak</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Empowering communities through cybersecurity awareness, gamified learning, and real-time crime insights.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cyan-400">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-gray-300 hover:text-cyan-400 hover:underline transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-cyan-400">Connect</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-cyan-400" />
                <span className="text-gray-300">Email:</span>
                <a
                  href="mailto:support@cyberrakshak.org"
                  className="text-gray-300 hover:text-cyan-400 hover:underline transition-colors duration-200"
                >
                  support@cyberrakshak.me
                </a>
              </div>

              <div>
                <p className="text-gray-300 mb-3">Follow us:</p>
                <div className="flex space-x-4">
                  {socialLinks.map(({ href, label, icon: Icon }) => (
                    <a
                      key={label}
                      href={href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                      aria-label={`Follow us on ${label}`}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-8 pt-6 border-t border-gray-700">
          <div className="text-center text-xs text-gray-400">
            <p>© {currentYear} Cyber Rakshak Initiative. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
