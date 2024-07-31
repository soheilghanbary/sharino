import { Avatar } from '@/components/avatar';
import { LinkList } from '@/components/shared/link-list';
import { PreviewEditor } from '@/components/shared/preview-editor';
import { TextField } from '@/components/text-field';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default () => (
  <div className="mt-4 grid grid-cols-5 gap-4">
    <div className="col-span-3">
      <section className="grid gap-4 rounded-lg border bg-card p-4">
        <div className="flex items-center gap-4">
          <Avatar
            src={'https://avatars.githubusercontent.com/u/98669021?v=4'}
            alt=""
            className="size-20"
          />
          <Button variant={'outline'}>آپلود تصویر</Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <TextField label="نام و نام خانوادگی" />
          <TextField label="عنوان" />
        </div>
        <LinkList />
      </section>
    </div>
    <div className="col-span-2">
      <PreviewEditor />
    </div>
  </div>
);
