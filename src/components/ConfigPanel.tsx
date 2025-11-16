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
import { Switch } from "./ui/switch";
import { toast } from "sonner";

interface ConfigPanelProps {
  config: ITheme;
  onSave: (config: ITheme) => Promise<void>;
}

export const ConfigPanel: React.FC<ConfigPanelProps> = ({ config, onSave }) => {
  const linkRule = {
    validate: (value: string) =>
      !value ||
      /^(https?:\/\/|\/)[^\s]+$/.test(value) ||
      "Link must start with http(s):// or /",
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
      console.error("Failed to save config:", err);
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
          <SheetTitle>Config Panel</SheetTitle>
          <SheetDescription>Edit site configuration</SheetDescription>
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
                  <h3 className="text-lg font-semibold">Basic Info</h3>

                  <FormField
                    control={form.control}
                    name="templateId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Template ID</FormLabel>
                        <div className="flex items-center gap-2">
                          <Select
                            value={field.value}
                            onValueChange={(id) => {
                              field.onChange(id);
                              (async () => {
                                try {
                                  const res = await fetch(
                                    `/data/config${id}.json`
                                  );
                                  const data = await res.json();
                                  if (data?.lifeTimeImg)
                                    form.setValue(
                                      "lifeTimeImg",
                                      data.lifeTimeImg
                                    );
                                  if (data?.quarterImg)
                                    form.setValue(
                                      "quarterImg",
                                      data.quarterImg
                                    );
                                  if (data?.monthImg)
                                    form.setValue("monthImg", data.monthImg);
                                  if (data?.yearImg)
                                    form.setValue("yearImg", data.yearImg);
                                } catch (e) {
                                  console.error(e);
                                }
                              })();
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a template" />
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
                          <Button
                            type="button"
                            size="sm"
                            variant="destructive"
                            onClick={async () => {
                              const id = field.value;
                              if (!id) return;
                              try {
                                const res = await fetch(
                                  `/data/config${id}.json`
                                );
                                const data = await res.json();
                                form.reset(data as ITheme);
                                await form.handleSubmit(handleSave)();
                              } catch (e) {
                                console.error(e);
                              }
                            }}
                          >
                            Load Template Defaults
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="metaTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Site Title</FormLabel>
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
                        <FormLabel>Favicon</FormLabel>
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
                        <FormLabel>Hero Title</FormLabel>
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
                        <FormLabel>Hero Gradient Text</FormLabel>
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
                        <FormLabel>Hero Subtitle</FormLabel>
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
                        <FormLabel>Community Intro 1</FormLabel>
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
                        <FormLabel>Community Intro 2</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {["9"].includes(templateId) ? (
                    <>
                      <FormField
                        control={form.control}
                        name="clubIcon1"
                        rules={linkRule}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Community Icon 1</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="clubIcon2"
                        rules={linkRule}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Community Icon 2</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  ) : null}

                  {["9", "10"].includes(templateId) ? (
                    <>
                      <FormField
                        control={form.control}
                        name="clubLink1"
                        rules={linkRule}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Community Link 1</FormLabel>
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
                            <FormLabel>Community Link 2</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  ) : null}

                  {["8"].includes(templateId) ? (
                    <>
                      <FormField
                        control={form.control}
                        name="badge1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Community Badge 1</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="badge2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Community Badge 2</FormLabel>
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
                  <h3 className="text-lg font-semibold">Hero Images</h3>

                  <FormField
                    control={form.control}
                    name="heroImg"
                    rules={linkRule}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hero Image</FormLabel>
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
                            <FormLabel>Hero Image 1</FormLabel>
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
                            <FormLabel>Hero Image 2</FormLabel>
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
                            <FormLabel>Hero Image 3</FormLabel>
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

                {/* Avatar Settings */}
                {["1", "2"].includes(templateId) ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Avatar Settings</h3>

                    <FormField
                      control={form.control}
                      name="avatar1"
                      rules={linkRule}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Avatar 1</FormLabel>
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
                          <FormLabel>Avatar 2</FormLabel>
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
                          <FormLabel>Avatar 3</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="/avatar3.png" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ) : null}

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Membership Images</h3>

                  <FormField
                    control={form.control}
                    name="lifeTimeImg"
                    rules={linkRule}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lifetime Member Image</FormLabel>
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
                        "Link must start with http(s):// or /",
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quarterly Member Image</FormLabel>
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
                        "Link must start with http(s):// or /",
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Monthly Member Image</FormLabel>
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
                        "Link must start with http(s):// or /",
                    }}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Yearly Member Image</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="/year.png" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Display Settings</h3>
                  <FormField
                    control={form.control}
                    name="showMemberOption"
                    render={({ field }) => (
                      <FormItem className="flex items-center justify-between">
                        <FormLabel>Show Membership Options</FormLabel>
                        <FormControl>
                          <Switch
                            checked={!!field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">
                      Verification Images
                    </h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addVerifyImg}
                      className="flex items-center gap-2"
                    >
                      <Plus className="h-4 w-4" />
                      Add Image
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
                            <FormLabel>
                              Verification Image {index + 1}
                            </FormLabel>
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

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Social Media</h3>
                    <Button type="button" onClick={addSocial} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>

                  {socialFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">
                          Social Media {index + 1}
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
                              <FormLabel>Name</FormLabel>
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
                              <FormLabel>Button Text</FormLabel>
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
                          rules={{
                            validate: (value) =>
                              !value ||
                              /^(https?:\/\/|\/|mailto:)[^\s]+$/.test(value) ||
                              "Link must start with http(s)://, /, or mailto:",
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Link</FormLabel>
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
                              <FormLabel>Icon</FormLabel>
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

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">News</h3>
                    <Button type="button" onClick={addNews} size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>

                  {newsFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="border rounded-lg p-4 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">News {index + 1}</span>
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
                              <FormLabel>Title</FormLabel>
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
                              <FormLabel>Category</FormLabel>
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
                              <FormLabel>Time</FormLabel>
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
                              <FormLabel>Source</FormLabel>
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
                              <FormLabel>Image</FormLabel>
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
                              "Link must start with http(s):// or /",
                          }}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Link</FormLabel>
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
            <Button variant="outline" onClick={handleCancel} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={form.handleSubmit(handleSave)}
              className="flex-1"
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
