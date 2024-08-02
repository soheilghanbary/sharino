'use client';
import { addLink as addLinkAction } from '@/actions';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { useLinkStore } from '@/store/link-store';
import { DndContext, type DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit2Icon, ExpandIcon, PlusCircleIcon, TrashIcon } from 'lucide-react';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { TextField } from '../text-field';
import { Button } from '../ui/button';

const linkSchema = z.object({
  name: z.string().min(1),
  url: z.string().min(1),
});

type LinkSchema = z.infer<typeof linkSchema>;

const AddLinkModal = () => {
  const [pending, mutate] = useTransition();
  const addLink = useLinkStore((state) => state.addLink);
  const [open, setOpen] = useState(false);
  const { register, reset, handleSubmit } = useForm<LinkSchema>({
    resolver: zodResolver(linkSchema),
    defaultValues: { name: '', url: '' },
  });
  const onSubmit = handleSubmit((data) => {
    mutate(async () => {
      await addLinkAction({
        ...data,
        id: new Date().getMilliseconds().toString(),
      });
      toast.success('لینک با موفقیت اضافه شد');
    });
    addLink(data);
    setOpen(false);
    reset();
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={'default'} className="w-fit">
          <PlusCircleIcon className="ml-2 size-4" />
          افزودن لینک
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>افزودن لینک جدید</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-4">
          <TextField label="نام سایت" {...register('name')} />
          <TextField label="آدرس" dir="ltr" {...register('url')} />
          <div className="grid grid-cols-2 gap-4">
            <Button>افزودن</Button>
            <Button
              type="button"
              variant={'secondary'}
              onClick={() => setOpen(false)}
            >
              انصراف
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const EditLinkModal = (link: LinkProps) => {
  const { updateLink } = useLinkStore();
  const [open, setOpen] = useState(false);
  const { register, reset, handleSubmit } = useForm<LinkSchema>({
    resolver: zodResolver(linkSchema),
    defaultValues: { name: link.name, url: link.url },
  });

  useEffect(() => {
    if (open) {
      reset({ name: link.name, url: link.url });
    }
  }, [open, link, reset]);

  const onSubmit = handleSubmit((data) => {
    updateLink(link.id, data.name, data.url);
    setOpen(false);
    reset();
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size={'icon'} className="size-8" variant={'green'}>
          <Edit2Icon className="size-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>ویرایش لینک</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="grid gap-4">
          <TextField label="نام سایت" {...register('name')} />
          <TextField label="آدرس" dir="ltr" {...register('url')} />
          <div className="grid grid-cols-2 gap-4">
            <Button>بروزرسانی</Button>
            <Button
              type="button"
              variant={'secondary'}
              onClick={() => setOpen(false)}
            >
              انصراف
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export function LinkList({ links: initialLinks }: any) {
  const { links, moveLink } = useLinkStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      moveLink(active.id as string, over?.id as string);
    }
  };

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={links} strategy={verticalListSortingStrategy}>
          {links.map((link) => (
            <LinkItem key={link.id} {...link} />
          ))}
        </SortableContext>
      </DndContext>
      <AddLinkModal />
    </>
  );
}

const LinkItem = ({ id, name, url }: LinkProps) => {
  const { deleteLink } = useLinkStore();
  const {
    attributes,
    listeners,
    isDragging,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      style={style}
      ref={setNodeRef}
      className={cn(
        'mb-2 flex items-center justify-between gap-2 rounded-md border bg-background p-2.5',
        { 'bg-muted': isDragging },
      )}
      {...attributes}
    >
      <div className="flex flex-1 flex-col">
        <p className="font-semibold text-sm/6">{name}</p>
        <p className="text-muted-foreground text-xs">{url}</p>
      </div>
      <Button
        size={'icon'}
        className="size-8"
        variant={'destructive'}
        onClick={() => deleteLink(id)}
      >
        <TrashIcon className="size-3.5" />
      </Button>
      <EditLinkModal {...{ name, url, id }} />
      <Button
        size={'icon'}
        className="size-8"
        variant={'secondary'}
        {...listeners}
      >
        <ExpandIcon key={id} className="size-3.5" />
      </Button>
    </div>
  );
};
