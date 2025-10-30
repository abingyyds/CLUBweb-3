import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from './ui/drawer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Plus, Trash2, Settings } from 'lucide-react';

interface Social {
  name: string;
  link: string;
  text: string;
  icon: string;
}

interface News {
  image: string;
  title: string;
  category: string;
  time: string;
  source: string;
  link: string;
}

interface ConfigData {
  metaTitle: string;
  favicon: string;
  heroTitle: string;
  heroSubtitle: string;
  clubIntroduction1: string;
  clubIntroduction2: string;
  socials: Social[];
  news: News[];
  heroImg: string;
  lifeTimeImg: string;
  quarterImg: string;
  monthImg: string;
  yearImg: string;
  ethImg: string;
}

interface ConfigPanelProps {
  config: ConfigData;
  onSave: (config: ConfigData) => void;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, onSave }) => {
  const [open, setOpen] = React.useState(false);
  
  const form = useForm<ConfigData>({
    defaultValues: config,
  });

  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({
    control: form.control,
    name: 'socials',
  });

  const {
    fields: newsFields,
    append: appendNews,
    remove: removeNews,
  } = useFieldArray({
    control: form.control,
    name: 'news',
  });

  const handleSave = (data: ConfigData) => {
    onSave(data);
    setOpen(false);
  };

  const handleCancel = () => {
    form.reset(config);
    setOpen(false);
  };

  const addSocial = () => {
    appendSocial({
      name: '',
      link: '',
      text: '',
      icon: '',
    });
  };

  const addNews = () => {
    appendNews({
      image: '',
      title: '',
      category: '',
      time: '',
      source: '',
      link: '',
    });
  };

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full shadow-lg"
        >
          <Settings className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh] overflow-y-auto">
        <DrawerHeader>
          <DrawerTitle>配置面板</DrawerTitle>
          <DrawerDescription>
            编辑网站配置信息
          </DrawerDescription>
        </DrawerHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSave)} className="space-y-6 p-4">
            {/* 基本信息 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">基本信息</h3>
              
              <FormField
                control={form.control}
                name="metaTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>网站标题</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="favicon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>网站图标</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="/favicon.ico" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="heroTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>主标题</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="heroSubtitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>副标题</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clubIntroduction1"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>社区介绍1</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="clubIntroduction2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>社区介绍2</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 图片配置 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">图片配置</h3>
              
              <FormField
                control={form.control}
                name="heroImg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>主图</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="/hero.png" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lifeTimeImg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>终身会员图</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="/lifetime.png" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="quarterImg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>季度会员图</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="/quarter.png" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="monthImg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>月度会员图</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="/month.png" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="yearImg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>年度会员图</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="/year.png" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ethImg"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ETH图标</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="/aave.png" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* 社交媒体配置 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">社交媒体</h3>
                <Button type="button" onClick={addSocial} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  添加
                </Button>
              </div>
              
              {socialFields.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">社交媒体 {index + 1}</span>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeSocial(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name={`socials.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>名称</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`socials.${index}.text`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>按钮文字</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`socials.${index}.link`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>链接</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`socials.${index}.icon`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>图标</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* 新闻配置 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">新闻配置</h3>
                <Button type="button" onClick={addNews} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  添加
                </Button>
              </div>
              
              {newsFields.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">新闻 {index + 1}</span>
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeNews(index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={form.control}
                      name={`news.${index}.title`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>标题</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`news.${index}.category`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>分类</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`news.${index}.time`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>时间</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`news.${index}.source`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>来源</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`news.${index}.image`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>图片</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`news.${index}.link`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>链接</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          </form>
        </Form>

        <DrawerFooter>
          <div className="flex gap-2">
            <Button onClick={form.handleSubmit(handleSave)} className="flex-1">
              保存
            </Button>
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              取消
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};