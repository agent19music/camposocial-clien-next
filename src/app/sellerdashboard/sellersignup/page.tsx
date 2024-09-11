'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from '@/components/ui/textarea';
import { useContext } from 'react';
import { AuthContext } from '@/context/authcontext';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { Pencil } from 'lucide-react';

export default function SellerSignup() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null); // Avatar file for upload
  const [about, setAbout] = useState('');

  const router = useRouter();
  const { currentUser, authToken } = useContext(AuthContext);
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference for file input

  console.log(currentUser);
  

  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email);
      setName(currentUser.first_name + " " + currentUser.last_name);
      setPhone(currentUser.phone_no);
      setAvatar(currentUser.avatar);
    }
  }, [currentUser]);

  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const fileURL = URL.createObjectURL(file);
      setAvatar(fileURL); // Update preview
    }
  };

  const handleFileUploadClick = () => {
    fileInputRef.current?.click(); // Trigger file input click
  };



  const addUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!displayName || !about) {
      toast.error('Kindly fill in all fields');
      return;
    }

    const formData = new FormData();

    // Append relevant form data
    formData.append('display_name', displayName);
    formData.append('about', about);
    formData.append('phone', phone);

    if (avatarFile) {
      // If a new avatar is selected, append the file
      formData.append('avatar_file', avatarFile);
    } else {
      // If no new avatar, use the existing URL
      formData.append('avatar_url', avatar);
    }


    console.log(authToken);
    for (const pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }    
    
    try {
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/seller`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
        body: formData, // Send formData instead of JSON
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Your account has been created successfully!');
        router.push('/dashboard');
      } else {
        toast.error(result.message || 'An error occurred');
      }
    } catch (error: any) {
      toast.error(`A network error occurred: ${error.message}`);
    }
  };

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Alert className="max-w-md mb-4">
          <AlertTitle>Not Logged In</AlertTitle>
          <AlertDescription>
            Please log in first to join the seller community.
          </AlertDescription>
        </Alert>
        <Button asChild>
          <Link href="/login">Go to Login</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <form onSubmit={addUser} className="mx-auto max-w-md space-y-8 p-4">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Join the Seller Community</h1>
            <p className="text-muted-foreground">
              Complete your seller profile to start selling on our marketplace
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src={avatar} alt="User's profile picture" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full"
                  onClick={handleFileUploadClick} // Trigger file selection
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={onSelectFile} // Handle file selection
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="displayName">Business Display Name</Label>
              <Input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Sam's Smoothies"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="about">About</Label>
              <Textarea
                id="about"
                placeholder="A brief description of your business"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Submit Seller Application
            </Button>
          </div>
        </form>
      </div>
      <div className="hidden bg-muted lg:flex lg:items-center lg:justify-center">
        <Image
          src="/logo.png"
          alt="Logo"
          width={288}
          height={162}
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}
