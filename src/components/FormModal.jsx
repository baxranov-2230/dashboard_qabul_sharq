// components/FormModal.jsx
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function FormModal() {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form yuborildi:", formData);
        setOpen(false);
    };

    return (
        <>
            <Button onClick={() => setOpen(true)}>Formani ochish</Button>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Ma'lumotlar formasi</DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="fullName">F.I.O</Label>
                            <Input
                                id="fullName"
                                name="fullName"
                                placeholder="Ismingizni kiriting"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Emailingizni kiriting"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <DialogFooter>
                            <Button type="submit">Yuborish</Button>
                            <Button variant="outline" onClick={() => setOpen(false)}>Bekor qilish</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
