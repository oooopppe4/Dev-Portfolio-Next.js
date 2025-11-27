"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, Phone, Copy, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { Github, Linkedin } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { SOCIAL_LINKS, ABOUT_ME, USER_NAMES } from "../constants/data";
import { MdOutlineArrowOutward } from "react-icons/md";

// =============================================
// HELPER FUNCTIONS
// =============================================
const extractUsername = (url: string): string => {
  if (!url || url.trim() === "") return "";
  
  try {
    // Remove mailto: prefix if present
    if (url.startsWith("mailto:")) {
      return url.replace("mailto:", "");
    }
    
    // Extract username from various URL formats
    const patterns = [
      /github\.com\/([^\/\?]+)/,
      /linkedin\.com\/in\/([^\/\?]+)/,
      /leetcode\.com\/(u\/)?([^\/\?]+)/,
      /instagram\.com\/([^\/\?]+)/,
      /twitter\.com\/([^\/\?]+)/,
      /peerlist\.io\/([^\/\?]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) {
        return match[match.length - 1];
      }
    }

    // If no pattern matches, return the domain
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.replace("www.", "");
    } catch {
      return url;
    }
  } catch {
    return url;
  }
};

const getDisplayText = (url: string, type: string): string => {
  if (!url || url.trim() === "") return "";
  
  if (type === "email") {
    return url.replace("mailto:", "");
  }
  
  if (type === "github") {
    const username = USER_NAMES.githubUsername || extractUsername(url);
    return username ? `github.com/${username}` : url;
  }
  
  if (type === "linkedin") {
    const username = extractUsername(url);
    return username ? `linkedin.com/in/${username}` : url;
  }
  
  if (type === "leetcode") {
    const username = USER_NAMES.leetcodeUsername || extractUsername(url);
    return username ? `leetcode.com/u/${username}` : url;
  }
  
  if (type === "instagram") {
    const username = extractUsername(url);
    return username ? `instagram.com/${username}` : url;
  }

  return url;
};

// =============================================
// PROFILE LINKS DATA
// =============================================
const PROFILE_LINKS = [
  {
    href: SOCIAL_LINKS.email,
    label: "Email",
    icon: <Mail className="w-5 h-5" />,
    type: "email",
  },
  {
    href: SOCIAL_LINKS.github,
    label: "GitHub",
    icon: <Github className="w-5 h-5" />,
    type: "github",
  },
  {
    href: SOCIAL_LINKS.linkedin,
    label: "LinkedIn",
    icon: <Linkedin className="w-5 h-5" />,
    type: "linkedin",
  },
  {
    href: SOCIAL_LINKS.leetcode,
    label: "LeetCode",
    icon: <SiLeetcode className="w-5 h-5" />,
    type: "leetcode",
  },
  ...(ABOUT_ME.phone
    ? [
        {
          href: `tel:${ABOUT_ME.phone.replace(/\s/g, "")}`,
          label: "Phone",
          icon: <Phone className="w-5 h-5" />,
          type: "phone",
          displayText: ABOUT_ME.phone,
        },
      ]
    : []),
  {
    href: SOCIAL_LINKS.instagram,
    label: "Instagram",
    icon: <FaInstagram className="w-5 h-5" />,
    type: "instagram",
  },
];

// =============================================
// MAIN COMPONENT
// =============================================
const Contact = () => {
  const [copied, setCopied] = useState(false);
  const emailAddress = ABOUT_ME.email || SOCIAL_LINKS.email.replace("mailto:", "");

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  };

  return (
    <section className="py-5">
      {/* Main Heading */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Get In Touch
        </h2>
        <p className="text-sm text-muted-foreground">
          Let&apos;s collaborate on your next big idea — I&apos;m just a message away.
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column: Let's Connect */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Let&apos;s Connect</h3>
            <p className="text-sm text-muted-foreground mb-4">
              I&apos;m always open to discussing new projects, creative ideas, or
              opportunities to be part of your visions.
            </p>
          </div>

          <div className="space-y-3">
            {PROFILE_LINKS.filter((link) => link.href && link.href.trim() !== "")
              .map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto:") || link.href.startsWith("tel:") ? "_self" : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg border border-border hover:border-border-hover transition-colors group"
                >
                  <div className="text-muted-foreground group-hover:text-link transition-colors">
                    {link.icon}
                  </div>
                  <span className="text-sm text-foreground">
                    {link.type === "phone"
                      ? link.displayText
                      : getDisplayText(link.href, link.type)}
                  </span>
                </Link>
              ))}
          </div>
        </div>

        {/* Right Column: Get In Touch */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-2">Get In Touch</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Choose your preferred way to contact me
            </p>
          </div>

          <div className="space-y-4">
            {/* Email Card */}
            {SOCIAL_LINKS.email && (
              <div className="box bg-background border border-border p-6 rounded-lg">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <Mail className="w-6 h-6 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base mb-1">Email Me</h4>
                    <p className="text-xs text-muted-foreground">
                      Send me an email directly
                    </p>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="px-4 py-2 rounded-lg btn text-sm font-medium flex items-center gap-2 hover:scale-95 transition-transform"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Email
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* WhatsApp Card */}
            {SOCIAL_LINKS.whatsapp && (
              <div className="box bg-background border border-border p-6 rounded-lg">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                    <FaWhatsapp className="w-6 h-6 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-base mb-1">WhatsApp</h4>
                    <p className="text-xs text-muted-foreground">
                      Chat with me instantly
                    </p>
                  </div>
                  <Link
                    href={SOCIAL_LINKS.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg btn text-sm font-medium flex items-center gap-2 hover:scale-95 transition-transform"
                  >
                    <FaWhatsapp className="w-4 h-4" />
                    Open WhatsApp
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
