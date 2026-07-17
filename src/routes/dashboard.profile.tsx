import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/dashboard/profile")({
  component: Profile,
});

function Profile() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold text-forest">Profile</h1>
      <div className="glass rounded-3xl p-6">
        <div className="flex items-center gap-4">
          <img src="https://i.pravatar.cc/160?img=47" className="h-20 w-20 rounded-full object-cover" alt="" />
          <div>
            <Button variant="outline" size="sm">Upload photo</Button>
            <p className="mt-2 text-xs text-muted-foreground">JPG or PNG. Max 2MB.</p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div><Label>First name</Label><Input className="mt-1 bg-card" defaultValue="Sophia" /></div>
          <div><Label>Last name</Label><Input className="mt-1 bg-card" defaultValue="Reyes" /></div>
          <div><Label>Email</Label><Input className="mt-1 bg-card" defaultValue="sophia@email.com" /></div>
          <div><Label>Phone</Label><Input className="mt-1 bg-card" defaultValue="+1 415 555 0100" /></div>
          <div><Label>Emergency contact</Label><Input className="mt-1 bg-card" defaultValue="Miguel Reyes · +1 415 555 0110" /></div>
          <div><Label>Nationality</Label><Input className="mt-1 bg-card" defaultValue="USA" /></div>
          <div className="sm:col-span-2"><Label>Medical details</Label><Textarea rows={3} className="mt-1 bg-card" placeholder="Allergies, medications..." /></div>
        </div>
        <div className="mt-6 flex justify-between">
          <Button variant="outline" className="text-destructive">Delete account</Button>
          <Button className="bg-forest text-forest-foreground shadow-glow">Save changes</Button>
        </div>
      </div>
    </div>
  );
}
