import { Avatar } from '@/components/avatar';
import { LinkList } from '@/components/shared/link-list';
import { TextField } from '@/components/text-field';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default () => {
  return (
    <section className="mx-auto max-w-md">
      <Tabs dir="rtl" defaultValue="editor">
        <TabsList>
          <TabsTrigger value="preview">پیش نمایش</TabsTrigger>
          <TabsTrigger value="editor">ویرایشگر</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">preview</TabsContent>
        <TabsContent value="editor">
          <section className="mb-4 grid gap-4 rounded-lg border bg-card p-4">
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
          </section>
          <LinkList />
        </TabsContent>
      </Tabs>
    </section>
  );
};
