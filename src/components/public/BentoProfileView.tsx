import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { downloadVCard } from "@/lib/vcard";
import {
  MapPin, Mail, Phone, Globe, Linkedin, Github,
  UserPlus, FileText, Briefcase, MessageSquare,
} from "lucide-react";
import { useCallback } from "react";

interface BentoProfileViewProps {
  merged: {
    display_name?: string | null;
    headline?: string | null;
    bio?: string | null;
    avatar_url?: string | null;
    email_public?: string | null;
    phone?: string | null;
    location?: string | null;
    website?: string | null;
    linkedin_url?: string | null;
    github_url?: string | null;
    cv_url?: string | null;
    accent_color: string;
    availability_status?: string | null;
    work_mode?: string | null;
    show_availability?: boolean | null;
    show_location?: boolean | null;
    user_id: string;
  };
  persona?: {
    slug?: string;
    avatar_position?: any;
    font_family?: string | null;
  } | null;
  textColor: string;
  accentColor: string;
  fontStack: string;
}

const cardAnim = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function BentoProfileView({ merged, persona, textColor, accentColor, fontStack }: BentoProfileViewProps) {
  const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;

  const track = useCallback((type: string, meta?: Record<string, any>) => {
    fetch(`https://${projectId}.supabase.co/functions/v1/log-interaction`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        target_user_id: merged.user_id,
        interaction_type: type,
        metadata: { ...meta, ua: navigator.userAgent, persona_slug: persona?.slug },
      }),
    }).catch(() => {});
  }, [merged.user_id, persona?.slug, projectId]);

  const handleSaveContact = () => {
    track("vcard_download");
    downloadVCard({
      displayName: merged.display_name ?? undefined,
      email: merged.email_public ?? undefined,
      phone: merged.phone ?? undefined,
      website: merged.website ?? undefined,
      linkedin: merged.linkedin_url ?? undefined,
      github: merged.github_url ?? undefined,
      headline: merged.headline ?? undefined,
      location: merged.location ?? undefined,
    });
  };

  const handleDownloadCV = () => {
    if (!merged.cv_url) return;
    track("cv_download");
    window.open(merged.cv_url, "_blank");
  };

  const ap = persona?.avatar_position;
  const avatarPos = ap ? { x: ap.x ?? 50, y: ap.y ?? 50, scale: ap.scale ?? 100 } : { x: 50, y: 50, scale: 100 };

  const socials = [
    merged.linkedin_url && { icon: Linkedin, href: merged.linkedin_url, label: "LinkedIn", type: "linkedin" },
    merged.github_url && { icon: Github, href: merged.github_url, label: "GitHub", type: "github" },
    merged.website && { icon: Globe, href: merged.website, label: "Website", type: "website" },
  ].filter(Boolean) as { icon: any; href: string; label: string; type: string }[];

  const contacts = [
    merged.email_public && { icon: Mail, label: merged.email_public, href: `mailto:${merged.email_public}`, type: "email" },
    merged.phone && { icon: Phone, label: merged.phone, href: `tel:${merged.phone}`, type: "phone" },
    merged.show_location && merged.location && { icon: MapPin, label: merged.location, type: "location" },
  ].filter(Boolean) as { icon: any; label: string; href?: string; type: string }[];

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12 md:py-20" style={{ fontFamily: fontStack }}>
      <div className="w-full max-w-2xl space-y-4">

        {/* Hero Card */}
        <motion.div
          custom={0}
          variants={cardAnim}
          initial="hidden"
          animate="visible"
          className="rounded-3xl p-6 md:p-8 backdrop-blur-xl border border-white/10"
          style={{ backgroundColor: `${accentColor}10` }}
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {merged.avatar_url && (
              <div className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white/15 shrink-0">
                <img
                  src={merged.avatar_url}
                  alt={merged.display_name ?? "Avatar"}
                  className="w-full h-full"
                  style={{
                    objectFit: "cover",
                    objectPosition: `${avatarPos.x}% ${avatarPos.y}%`,
                    transform: `scale(${avatarPos.scale / 100})`,
                    transformOrigin: `${avatarPos.x}% ${avatarPos.y}%`,
                  }}
                />
              </div>
            )}
            <div className="text-center sm:text-left flex-1 min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold font-display" style={{ color: textColor }}>
                {merged.display_name}
              </h1>
              {merged.headline && (
                <p className="text-sm md:text-base mt-1" style={{ color: `${textColor}aa` }}>
                  {merged.headline}
                </p>
              )}
              <div className="flex items-center gap-2 mt-3 flex-wrap justify-center sm:justify-start">
                {merged.show_availability && merged.availability_status && (
                  <Badge className="border-0 text-xs" style={{ backgroundColor: accentColor, color: "#fff" }}>
                    {merged.availability_status}
                  </Badge>
                )}
                {merged.work_mode && (
                  <Badge variant="secondary" className="bg-white/10 border-0 text-xs" style={{ color: `${textColor}cc` }}>
                    <Briefcase className="w-3 h-3 mr-1" />
                    {merged.work_mode}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bio Card */}
        {merged.bio && (
          <motion.div
            custom={1}
            variants={cardAnim}
            initial="hidden"
            animate="visible"
            className="rounded-3xl p-5 md:p-6 backdrop-blur-xl border border-white/10"
            style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
          >
            <div className="flex items-start gap-3">
              <MessageSquare className="w-4 h-4 mt-0.5 shrink-0" style={{ color: accentColor }} />
              <p className="text-sm leading-relaxed" style={{ color: `${textColor}dd` }}>
                {merged.bio}
              </p>
            </div>
          </motion.div>
        )}

        {/* Bento Grid: Contact + Socials */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Contact Info */}
          {contacts.length > 0 && (
            <motion.div
              custom={2}
              variants={cardAnim}
              initial="hidden"
              animate="visible"
              className="rounded-3xl p-5 backdrop-blur-xl border border-white/10 space-y-1"
              style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              <h3 className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: `${textColor}55` }}>
                Contact
              </h3>
              <div className="space-y-2">
                {contacts.map((c) => {
                  const Inner = (
                    <div className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors">
                      <c.icon className="w-4 h-4 shrink-0" style={{ color: accentColor }} />
                      <span className="text-sm truncate" style={{ color: `${textColor}dd` }}>{c.label}</span>
                    </div>
                  );
                  return c.href ? (
                    <a key={c.type} href={c.href} onClick={() => track("link_click", { link_type: c.type })}>{Inner}</a>
                  ) : (
                    <div key={c.type}>{Inner}</div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Social Grid */}
          {socials.length > 0 && (
            <motion.div
              custom={3}
              variants={cardAnim}
              initial="hidden"
              animate="visible"
              className="rounded-3xl p-5 backdrop-blur-xl border border-white/10"
              style={{ backgroundColor: "rgba(255,255,255,0.04)" }}
            >
              <h3 className="text-[10px] font-semibold uppercase tracking-widest mb-3" style={{ color: `${textColor}55` }}>
                Connect
              </h3>
              <div className="grid grid-cols-1 gap-2">
                {socials.map((s) => (
                  <a
                    key={s.type}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("link_click", { link_type: s.type })}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${accentColor}20` }}>
                      <s.icon className="w-4 h-4" style={{ color: accentColor }} />
                    </div>
                    <span className="text-sm font-medium" style={{ color: `${textColor}cc` }}>{s.label}</span>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Action Buttons */}
        <motion.div
          custom={4}
          variants={cardAnim}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-3"
        >
          <Button
            onClick={handleSaveContact}
            className="flex-1 h-12 rounded-2xl text-sm font-semibold"
            style={{ backgroundColor: accentColor, color: "#fff" }}
          >
            <UserPlus className="w-4 h-4 mr-2" /> Save Contact
          </Button>
          {merged.cv_url && (
            <Button
              onClick={handleDownloadCV}
              variant="outline"
              className="flex-1 h-12 rounded-2xl border-white/20 text-sm"
              style={{ color: textColor }}
            >
              <FileText className="w-4 h-4 mr-2" /> Download CV
            </Button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
