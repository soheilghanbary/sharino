'use client';
import { updateUser } from '@/actions';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { useDebouncedCallback } from 'use-debounce';
import { TextField } from '../text-field';

type Props = {
  name: string;
  title: string;
};

export const UpdateDetailsForm = ({
  name: initialName,
  title: initialTitle,
}: Props) => {
  const [pending, mutate] = useTransition();
  const [name, setName] = useState(initialName);
  const [title, setTitle] = useState(initialTitle);
  const debouncedName = useDebouncedCallback((value) => {
    mutate(async () => {
      const res = await updateUser({ name: value, title });
      toast.success('بروزرسانی شد!');
      console.log(res);
    });
    setName(value);
  }, 500);

  const debouncedTitle = useDebouncedCallback((value) => {
    mutate(async () => {
      const res = await updateUser({ name, title: value });
      toast.success('بروزرسانی شد!');
      console.log(res);
    });
    setTitle(value);
  }, 500);

  return (
    <div className="grid grid-cols-2 gap-4">
      <TextField
        label="نام و نام خانوادگی"
        defaultValue={initialName}
        onChange={(e) => debouncedName(e.target.value)}
      />
      <TextField
        label="عنوان"
        defaultValue={initialTitle}
        onChange={(e) => debouncedTitle(e.target.value)}
      />
    </div>
  );
};
