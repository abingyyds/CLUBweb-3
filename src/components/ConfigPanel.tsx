import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Plus, Trash2, Settings } from "lucide-react";
import { ITheme } from "@/types";

interface ConfigPanelProps {
  config: ITheme;
  onSave: (config: ITheme) => Promise<void>;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, onSave }) => {
  const linkRule = {
    validate: (value: string) =>
      !value ||
      /^(https?:\/\/|\/)[^\s]+$/.test(value) ||
      "链接必须以 http(s):// 或 / 开头",
  };
  const [open, setOpen] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const form = useForm<ITheme>({
    defaultValues: config,
  });

  const {
    fields: socialFields,
    append: appendSocial,
    remove: removeSocial,
  } = useFieldArray({
    control: form.control,
    name: "socials",
  });

  const {
    fields: newsFields,
    append: appendNews,
    remove: removeNews,
  } = useFieldArray({
    control: form.control,
    name: "news",
  });

  const {
    fields: verifyImgsFields,
    append: appendVerifyImg,
    remove: removeVerifyImg,
  } = useFieldArray<any, "verifyImgs">({
    control: form.control as any,
    name: "verifyImgs",
  });

  const handleSave = async (data: ITheme) => {
    setIsSaving(true);
    try {
      await onSave(data);
      setOpen(false);
    } catch (err) {
      console.error("保存配置失败:", err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    form.reset(config);
    setOpen(false);
  };

  const addSocial = () => {
    appendSocial({
      name: "",
      link: "",
      text: "",
      icon: "",
    });
  };

  const addNews = () => {
    appendNews({
      image: "",
      title: "",
      category: "",
      time: "",
      source: "",
      link: "",
    });
  };

  const addVerifyImg = () => {
    appendVerifyImg("");
  };

  const templateId = form.watch("templateId");

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 left-4 z-50 h-12 w-12 rounded-full shadow-lg"
        >
          <Settings className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="sm:max-w-auto w-[600px] flex flex-col h-full"
        side="right"
      >
        <SheetHeader>
          <SheetTitle>配置面板</SheetTitle>
          <SheetDescription>编辑网站配置信息</SheetDescription>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="p-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSave)}
                className="space-y-6"
              >
                {/* 基本信息 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">基本信息</h3>

                  <FormField
                    control={form.control}
                    name="templateId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>模板ID</FormLabel>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="请选择模板" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {Array.from({ length: 10 }, (_, i) =>
                              String(i + 1)
                            ).map((v) => (
                              <SelectItem key={v} value={v}>
                                {v}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                    rules={linkRule}
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
                    name="heroGradientText"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>主标题渐变文字</FormLabel>
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

                  {["9", "10"].includes(templateId) ? (
                    <>
                      <FormField
                        control={form.control}
                        name="clubLink1"
                        rules={linkRule}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>社区链接1</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="clubLink2"
                        rules={linkRule}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>社区链接2</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  ) : null}
                </div>

                {/* 主图配置 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">主图配置</h3>

                  <FormField
                    control={form.control}
                    name="heroImg"
                    rules={linkRule}
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

                  {templateId === "2" && (
                    <>
                      <FormField
                        control={form.control}
                        name="heroImg1"
                        rules={linkRule}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>主图1</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="/hero1.png" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="heroImg2"
                        rules={linkRule}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>主图2</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="/hero2.png" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="heroImg3"
                        rules={linkRule}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>主图3</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="/hero3.png" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>

                {/* 头像配置 */}
                {["1", "2"].includes(templateId) ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">头像配置</h3>

                    <FormField
                      control={form.control}
                      name="avatar1"
                      rules={linkRule}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>头像1</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="/avatar1.png" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="avatar2"
                      rules={linkRule}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>头像2</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="/avatar2.png" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="avatar3"
                      rules={linkRule}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>头像3</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="/avatar3.png" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ) : null}

                {/* 会员图片 */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">会员图片</h3>

                  <FormField
                    control={form.control}
                    name="lifeTimeImg"
                    rules={linkRule}
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
                    rules={{
                      validate: (value) =>
                        !value ||
                        /^(https?:\/\/|\/)[^\s]+$/.test(value) ||
                        "链接必须以 http(s):// 或 / 开头",
                    }}
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
                    rules={{
                      validate: (value) =>
                        !value ||
                        /^(https?:\/\/|\/)[^\s]+$/.test(value) ||
                        "链接必须以 http(s):// 或 / 开头",
                    }}
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
                    rules={{
                      validate: (value) =>
                        !value ||
                        /^(https?:\/\/|\/)[^\s]+$/.test(value) ||
                        "链接必须以 http(s):// 或 / 开头",
                    }}
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
                </div>

                {/* 验证图片 */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">验证图片</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addVerifyImg}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      添加图片
                    </Button>
                  </div>

                  {verifyImgsFields.map((field, index) => (
                    <div key={field.id} className="flex items-center gap-2">
                      <FormField
                        control={form.control}
                        name={`verifyImgs.${index}`}
                        rules={linkRule}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>验证图片 {index + 1}</FormLabel>
                            <FormControl>
                              <Input {...field} placeholder="/verify1.png" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeVerifyImg(index)}
                        className="mt-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
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
                    <div
                      key={field.id}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          社交媒体 {index + 1}
                        </span>
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
                          rules={linkRule}
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
                          rules={linkRule}
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
                    <div
                      key={field.id}
                      className="border rounded-lg p-4 space-y-3"
                    >
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
                          rules={linkRule}
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
                          rules={{
                            validate: (value) =>
                              !value ||
                              /^(https?:\/\/|\/)[^\s]+$/.test(value) ||
                              "链接必须以 http(s):// 或 / 开头",
                          }}
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
          </div>
        </ScrollArea>

        <SheetFooter className="border-t bg-background p-4">
          <div className="flex gap-2">
            <Button
              onClick={form.handleSubmit(handleSave)}
              className="flex-1"
              disabled={isSaving}
            >
              {isSaving ? "保存中..." : "保存"}
            </Button>
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              取消
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
