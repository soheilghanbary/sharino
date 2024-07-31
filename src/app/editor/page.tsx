import { getUser } from '@/actions';
import { Avatar } from '@/components/avatar';
import { LinkList } from '@/components/shared/link-list';
import { UpdateDetailsForm } from '@/components/shared/update-details-form';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default async () => {
  const user = await getUser();
  return (
    <section className="mx-auto max-w-md">
      <Tabs dir="rtl" defaultValue="preview">
        <TabsList>
          <TabsTrigger value="preview">پیش نمایش</TabsTrigger>
          <TabsTrigger value="editor">ویرایشگر</TabsTrigger>
        </TabsList>
        <TabsContent value="preview">
          <div className="flex flex-col items-center justify-center gap-2">
            <Avatar
              src={'https://avatars.githubusercontent.com/u/98669021?v=4'}
              alt=""
              className="size-20"
            />
            <h1 className="font-extrabold text-xl">{user?.name}</h1>
            <p className="text-muted-foreground text-sm">{user?.title}</p>
          </div>
        </TabsContent>
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
            <UpdateDetailsForm name={user?.name!} title={user?.title!} />
          </section>
          <LinkList />
        </TabsContent>
      </Tabs>
    </section>
  );
};
