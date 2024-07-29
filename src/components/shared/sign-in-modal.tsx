'use client';
import { GithubIcon, GoogleIcon, LoadingIcon } from '@/components/icons';
import { TextLine } from '@/components/text-line';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useMediaQuery } from '@/hooks/use-media-query';
import { signIn } from 'next-auth/react';
import { useState } from 'react';

export const OAuth = () => {
  const [loading, setLoading] = useState({
    google: false,
    github: false,
  });
  const onAuth = (provider: 'github' | 'google') => {
    setLoading((prev) => ({ ...prev, [provider]: true }));
    signIn(provider);
  };
  return (
    <div className="grid grid-cols-2 gap-4">
      <Button
        variant={'secondary'}
        onClick={() => onAuth('github')}
        disabled={loading.google || loading.github}
      >
        {loading.github ? (
          <LoadingIcon className="ml-2 scale-75 fill-foreground" />
        ) : (
          <GithubIcon className="ml-2 size-6" />
        )}
        گیت هاب
      </Button>
      <Button
        variant={'secondary'}
        onClick={() => onAuth('google')}
        disabled={loading.google || loading.github}
      >
        {loading.google ? (
          <LoadingIcon className="ml-2 scale-75 fill-foreground" />
        ) : (
          <GoogleIcon className="ml-2 size-6" />
        )}
        گوگل
      </Button>
    </div>
  );
};

export function SignIn() {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button>وارد شوید</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>ورود به حساب کاربری</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 p-4">
            <TextLine text="ورود با" />
            <OAuth />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>وارد شوید</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>ورود به حساب کاربری</DrawerTitle>
        </DrawerHeader>
        <div className="grid gap-4 p-4">
          <TextLine text="ورود با" />
          <OAuth />
        </div>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline" className="w-full">
              انصراف
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
