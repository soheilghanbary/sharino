'use client';
import { useLinkStore } from '@/store/link-store';
import { DndContext, type DragEndEvent, closestCenter } from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ExpandIcon, TrashIcon } from 'lucide-react';
import type { ChangeEvent } from 'react';
import { TextField } from '../text-field';
import { Button } from '../ui/button';

export function LinkList() {
  const { links, addLink, moveLink } = useLinkStore();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      moveLink(active.id as string, over?.id as string);
    }
  };

  return (
    <>
      <Button variant={'default'} onClick={addLink}>
        افزودن لینک
      </Button>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={links} strategy={verticalListSortingStrategy}>
          {links.map((link) => (
            <LinkItem key={link.id} id={link.id} />
          ))}
        </SortableContext>
      </DndContext>
    </>
  );
}

const LinkItem: React.FC<{ id: string }> = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const { links, updateLink } = useLinkStore();
  const link = links.find((link) => link.id === id);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (link) {
      updateLink(id, e.target.value, link.url);
    }
  };

  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (link) {
      updateLink(id, link.name, e.target.value);
    }
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="space-y-4 rounded-lg border bg-card p-4"
      {...attributes}
    >
      <div className="flex items-center justify-end gap-4">
        <Button size={'icon'} variant={'destructive'}>
          <TrashIcon className="size-4" />
        </Button>
        <Button size={'icon'} variant={'secondary'} {...listeners}>
          <ExpandIcon className="size-4" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <TextField
          className="flex-1"
          label="عنوان سایت"
          value={link?.name || ''}
          onChange={handleNameChange}
        />
        <TextField
          dir="ltr"
          label="آدرس"
          value={link?.url || ''}
          onChange={handleUrlChange}
        />
      </div>
    </div>
  );
};
