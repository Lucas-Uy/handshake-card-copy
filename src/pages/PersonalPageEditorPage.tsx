import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ImageUploadField } from "@/components/DesignStudio/ImageUploadField";
import { ColorPickerField } from "@/components/DesignStudio/ColorPickerField";
import { AvatarPositioner, DEFAULT_AVATAR_POSITION } from "@/components/DesignStudio/AvatarPositioner";
import { UpgradePrompt } from "@/components/UpgradePrompt";
import { BentoProfileView } from "@/components/public/BentoProfileView";
import { getFontStack } from "@/components/DesignStudio/FontPresets";
import { useAuth } from "@/contexts/AuthContext";
import { useSubscription } from "@/hooks/useSubscription";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import type { PersonaDesign } from "@/components/DesignStudio/types";
import {
  Loader2, Save, Eye, User, Palette, FileText, CreditCard,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const PersonalPageEditorPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const { isPro } = useSubscription();
  const [personas, setPersonas] = useState<(PersonaDesign & { page_mode?: string })[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editing, setEditing] = useState<(PersonaDesign & { page_mode?: string }) | null>(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"identity" | "style">("identity");

  useEffect(() => {
    if (!user) return;
    const load = async () => {
      const [{ data: personaData }, { data: profile }] = await Promise.all([
        supabase.from("personas").select("*").eq("user_id", user.id).order("created_at"),
        supabase.from("profiles").select("username").eq("user_id", user.id).single(),
      ]);
      const list = (personaData as unknown as (PersonaDesign & { page_mode?: string })[]) ?? [];
      setPersonas(list);
      setUsername(profile?.username ?? "");
      if (list.length > 0) { setSelectedId(list[0].id); setEditing({ ...list[0] }); }
      setLoading(false);
    };
    load();
  }, [user]);

  useEffect(() => {
    const p = personas.find((p) => p.id === selectedId);
    if (p) setEditing({ ...p });
  }, [selectedId]);

  const update = (field: string, value: unknown) => {
    if (!editing) return;
    setEditing({ ...editing, [field]: value });
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    const { id, slug, label, ...rest } = editing;
    const { error } = await supabase.from("personas").update(rest as any).eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setPersonas(personas.map((p) => (p.id === id ? editing : p)));
      toast({ title: "Personal page saved!" });
    }
    setSaving(false);
  };

  const avatarPos = editing?.avatar_position
    ? (typeof editing.avatar_position === "string"
      ? JSON.parse(editing.avatar_position as any)
      : editing.avatar_position)
    : DEFAULT_AVATAR_POSITION;

  const merged = editing ? {
    display_name: editing.display_name,
    headline: editing.headline,
    bio: editing.bio,
    avatar_url: editing.avatar_url,
    email_public: editing.email_public,
    phone: null as string | null,
    location: null as string | null,
    website: editing.website,
    linkedin_url: editing.linkedin_url,
    github_url: editing.github_url,
    cv_url: editing.cv_url,
    accent_color: editing.accent_color || "#0d9488",
    availability_status: null as string | null,
    work_mode: null as string | null,
    show_availability: false,
    show_location: false,
    user_id: user?.id || "",
  } : null;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      </DashboardLayout>
    );
  }

  if (personas.length === 0) {
    return (
      <DashboardLayout>
        <div className="glass-card rounded-2xl p-12 text-center">
          <CreditCard className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">
            Create a persona in the <Link to="/personas" className="text-primary underline">Persona Vault</Link> first.
          </p>
        </div>
      </DashboardLayout>
    );
  }

  const tabs = [
    { id: "identity" as const, label: "Identity", icon: User },
    { id: "style" as const, label: "Style", icon: Palette },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-display font-bold">Personal Page</h1>
            <Select value={selectedId ?? ""} onValueChange={setSelectedId}>
              <SelectTrigger className="w-44 rounded-xl h-9 text-xs">
                <SelectValue placeholder="Select persona" />
              </SelectTrigger>
              <SelectContent>
                {personas.map((p) => (
                  <SelectItem key={p.id} value={p.id}>{p.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button onClick={handleSave} disabled={saving} size="sm" className="gradient-primary text-primary-foreground rounded-xl h-9">
            {saving ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Save className="w-3.5 h-3.5 mr-1.5" />}
            Save
          </Button>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col lg:flex-row gap-0 rounded-2xl border border-border/60 bg-card/30 backdrop-blur-sm overflow-hidden" style={{ height: "calc(100vh - 180px)" }}>
          {/* Editor Panel */}
          <div className="flex-1 min-h-0 overflow-y-auto lg:max-w-md lg:border-r lg:border-border/40">
            {/* Tab Switcher */}
            <div className="flex border-b border-border/40">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-medium transition-colors ${
                      activeTab === tab.id
                        ? "text-primary border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="p-5 space-y-6">
              {activeTab === "identity" && (
                <>
                  {/* Profile Picture */}
                  <section className="space-y-3">
                    <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Profile</h3>
                    <ImageUploadField
                      label="Profile Picture"
                      value={editing?.avatar_url ?? null}
                      onChange={(url) => update("avatar_url", url)}
                      folder="avatars"
                      showFitControls={false}
                    />
                    {editing?.avatar_url && (
                      <AvatarPositioner
                        src={editing.avatar_url}
                        position={avatarPos}
                        onPositionChange={(pos) => update("avatar_position", pos)}
                      />
                    )}
                    <div className="space-y-1">
                      <Label className="text-xs">Display Name</Label>
                      <Input value={editing?.display_name ?? ""} onChange={(e) => update("display_name", e.target.value)} className="rounded-xl" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Headline</Label>
                      <Input value={editing?.headline ?? ""} onChange={(e) => update("headline", e.target.value)} placeholder="Full-Stack Developer" className="rounded-xl" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Bio</Label>
                      <Textarea value={editing?.bio ?? ""} onChange={(e) => update("bio", e.target.value)} className="rounded-xl" rows={3} />
                    </div>
                  </section>

                  <Separator className="opacity-40" />

                  {/* Links & Socials */}
                  <section className="space-y-3">
                    <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Links & Socials</h3>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="space-y-1"><Label className="text-xs">Email</Label><Input value={editing?.email_public ?? ""} onChange={(e) => update("email_public", e.target.value)} className="rounded-xl" /></div>
                      <div className="space-y-1"><Label className="text-xs">Website</Label><Input value={editing?.website ?? ""} onChange={(e) => update("website", e.target.value)} className="rounded-xl" /></div>
                      <div className="space-y-1"><Label className="text-xs">LinkedIn</Label><Input value={editing?.linkedin_url ?? ""} onChange={(e) => update("linkedin_url", e.target.value)} className="rounded-xl" /></div>
                      <div className="space-y-1"><Label className="text-xs">GitHub</Label><Input value={editing?.github_url ?? ""} onChange={(e) => update("github_url", e.target.value)} className="rounded-xl" /></div>
                    </div>
                  </section>

                  <Separator className="opacity-40" />

                  {/* CV */}
                  <section className="space-y-3">
                    <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5" /> CV / Resume
                    </h3>
                    <p className="text-[10px] text-muted-foreground">Appears as a download button on your personal page</p>
                    {isPro ? (
                      <>
                        {editing?.cv_url && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs truncate max-w-[200px] text-muted-foreground">{editing.cv_url.split("/").pop()}</span>
                            <Button size="sm" variant="ghost" className="text-xs h-7 text-destructive" onClick={() => update("cv_url", null)}>Remove</Button>
                          </div>
                        )}
                        <ImageUploadField
                          label="Upload CV (PDF or image)"
                          value={editing?.cv_url ?? null}
                          onChange={(url) => update("cv_url", url)}
                          folder="cv-uploads"
                        />
                      </>
                    ) : (
                      <UpgradePrompt feature="CV / Resume Hosting" description="Upload and track CV downloads with Pro." />
                    )}
                  </section>
                </>
              )}

              {activeTab === "style" && (
                <>
                  <section className="space-y-3">
                    <h3 className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Colors</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <ColorPickerField label="Accent" value={editing?.accent_color ?? "#0d9488"} onChange={(v) => update("accent_color", v)} />
                      <ColorPickerField label="Text" value={editing?.text_color ?? "#ffffff"} onChange={(v) => update("text_color", v)} />
                      <ColorPickerField label="Background" value={editing?.landing_bg_color ?? "#0a0a0f"} onChange={(v) => update("landing_bg_color", v)} />
                    </div>
                  </section>
                </>
              )}
            </div>
          </div>

          {/* Live Preview — Desktop */}
          <div className="flex-1 hidden lg:flex flex-col overflow-y-auto bg-background/50">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/40">
              <div className="flex items-center gap-2">
                <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">Preview</span>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto" style={{ backgroundColor: editing?.landing_bg_color ?? "#0a0a0f" }}>
              {merged && (
                <BentoProfileView
                  merged={merged}
                  persona={editing ? { slug: editing.slug, avatar_position: editing.avatar_position, font_family: editing.font_family } : null}
                  textColor={editing?.text_color ?? "#ffffff"}
                  accentColor={editing?.accent_color ?? "#0d9488"}
                  fontStack={getFontStack(editing?.font_family)}
                />
              )}
            </div>
          </div>

          {/* Mobile Preview FAB */}
          <div className="lg:hidden fixed bottom-6 right-6 z-50">
            <Sheet>
              <SheetTrigger asChild>
                <Button size="lg" className="rounded-full h-14 w-14 shadow-xl gradient-primary">
                  <Eye className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[85vh] rounded-t-3xl p-0 overflow-y-auto">
                <div className="p-4 border-b border-border/40">
                  <div className="flex items-center justify-center gap-2">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-semibold">Personal Page Preview</span>
                  </div>
                </div>
                <div style={{ backgroundColor: editing?.landing_bg_color ?? "#0a0a0f" }}>
                  {merged && (
                    <BentoProfileView
                      merged={merged}
                      persona={editing ? { slug: editing.slug, avatar_position: editing.avatar_position, font_family: editing.font_family } : null}
                      textColor={editing?.text_color ?? "#ffffff"}
                      accentColor={editing?.accent_color ?? "#0d9488"}
                      fontStack={getFontStack(editing?.font_family)}
                    />
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PersonalPageEditorPage;
