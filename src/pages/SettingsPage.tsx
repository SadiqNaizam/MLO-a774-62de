import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import MusicPlayerBar from '@/components/MusicPlayerBar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast"; // Assuming useToast is available

const settingsFormSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }).max(50),
  email: z.string().email({ message: "Please enter a valid email." }),
  enableDoraemonThemeFeatures: z.boolean().default(true).optional(),
  // Optional: Password change fields, could be a separate form/dialog
  // currentPassword: z.string().min(6, { message: "Password must be at least 6 characters." }).optional().or(z.literal('')),
  // newPassword: z.string().min(6, { message: "Password must be at least 6 characters." }).optional().or(z.literal('')),
});
type SettingsFormValues = z.infer<typeof settingsFormSchema>;

const defaultValues: Partial<SettingsFormValues> = {
  username: "Nobita Nobi",
  email: "nobita.n@example.com",
  enableDoraemonThemeFeatures: true,
};

const defaultPlayerTrack = {
  id: 'playerSettings',
  title: 'System Sounds',
  artist: 'App Settings',
  albumArtUrl: 'https://placehold.co/100x100/64748B/FFFFFF?text=Settings&font=sans',
  audioSrc: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
};

const SettingsPage = () => {
  console.log('SettingsPage loaded');

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: SettingsFormValues) {
    console.log("Settings updated:", data);
    toast({
      title: "Settings Saved!",
      description: "Your preferences have been updated.",
      className: "bg-blue-500 text-white", // Doraemon themed toast!
    });
  }

  return (
    <div className="relative min-h-screen bg-background">
      <NavigationMenu />
      <main className="ml-60 pt-6 pb-28 px-6">
        <ScrollArea className="h-[calc(100vh-theme(spacing.6)-theme(spacing.28)-theme(spacing.1))]">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-8">Settings</h1>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>Update your account's profile information and email address.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <Avatar className="h-20 w-20">
                        <AvatarImage src="https://placehold.co/128x128/FBBF24/000000?text=NN&font=sans" alt="User Avatar" />
                        <AvatarFallback>NN</AvatarFallback>
                      </Avatar>
                      <div>
                        <Button type="button" variant="outline">Change Avatar</Button>
                        <p className="text-xs text-muted-foreground mt-1">JPG, GIF or PNG. 1MB max.</p>
                      </div>
                    </div>
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="Your username" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Manage your application preferences.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="enableDoraemonThemeFeatures"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Enable Doraemon Theme Features</FormLabel>
                            <FormDescription>
                              Enjoy special UI elements and sounds inspired by Doraemon!
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="data-[state=checked]:bg-blue-500"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>
                
                {/* Example for Password Change - can be expanded */}
                {/* <Card>
                  <CardHeader>
                    <CardTitle>Password</CardTitle>
                    <CardDescription>Change your password.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <FormItem> ... Current Password ... </FormItem>
                     <FormItem> ... New Password ... </FormItem>
                  </CardContent>
                </Card> */}

                <div className="flex justify-end">
                  <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">Save Changes</Button>
                </div>
              </form>
            </Form>
          </div>
        </ScrollArea>
      </main>
      <MusicPlayerBar theme="doraemon" initialTrack={defaultPlayerTrack} />
    </div>
  );
};

export default SettingsPage;