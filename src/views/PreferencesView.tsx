import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";
import { settingsPresentation } from "@/db/settings";
import { useAppDispatch, useAppSelector } from "@/hooks/states";
import { getSettingsByIds } from "@/lib/utils";
import { updateSetting } from "@/states/settings";
import { CategoryUI, PreferencesViewProps } from "@/types/settings";
import { Button } from "@nextui-org/button";
import { Divider } from "@nextui-org/divider";
import { Switch } from "@nextui-org/switch";
import { useState } from 'react';

export default function PreferencesView({ isOpen, handleChange }: PreferencesViewProps) {
    // states
    const categories: CategoryUI[] = settingsPresentation;
    const [selectedCategory, setSelectedCategory] = useState<CategoryUI>(categories[0]);
    const settings = useAppSelector(state => state.settings);
    const dispatch = useAppDispatch();

    return <>
        {/* Preferences Modal */}
        <Sheet open={isOpen} onOpenChange={handleChange}>
            <SheetContent className="lg:max-w-2xl rounded-l dark:bg-zinc-900 border-l-zinc-800" role="dialog">
                <SheetHeader>
                    <SheetTitle>Preferences</SheetTitle>
                </SheetHeader>
                <div className="flex h-screen my-2">
                    {/* Side Navigation */}
                    <div className="flex flex-col w-max">

                        {/* Side Navigation Categories */}
                        <nav className="flex flex-col gap-2">
                            {categories.map(category => (
                                <>
                                    <Button
                                        key={category.id}
                                        variant={selectedCategory.id == category.id ? 'solid' : 'light'}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`flex flex-row justify-start align-middle gap-3 px-6 py-2 rounded-lg`}
                                    >
                                        <category.icon />
                                        <span>{category.name}</span>
                                    </Button>
                                </>
                            ))}
                        </nav>
                    </div>

                    <Divider orientation="vertical" className="mx-4" />

                    {/* Settings Section */}
                    <div className="flex flex-col flex-grow ml-8">
                        <span className="text-2xl font-semibold mb-4">{selectedCategory.name}</span>
                        {/* Category Settings */}
                        <ul>
                            {selectedCategory.children?.map(child => {
                                const currentSetting = getSettingsByIds(settings, selectedCategory.name, child.name);
                                return (
                                    <li key={child.name} className="py-2">
                                        <label className="flex items-center">
                                            {!child.hideName && child.name}
                                            {child.type == 'switch' && (
                                                <Switch className="ml-auto" defaultSelected={child.default} isSelected={currentSetting?.options[0].value as boolean} onValueChange={(value) => dispatch(updateSetting({
                                                    settingId: selectedCategory.id,
                                                    childId: child.id,
                                                    optionName: currentSetting?.options[0].name ?? child.name.toLocaleLowerCase(),
                                                    value,
                                                }))} />
                                            )}

                                            {child.type == 'select' && (
                                                <Select defaultValue="random">
                                                    <SelectTrigger className="w-2/3 shadow dark:bg-zinc-800">
                                                        <SelectValue placeholder="Background" />
                                                    </SelectTrigger>
                                                    <SelectContent className="dark:bg-zinc-900">
                                                        {child.options?.map(option => (
                                                            <SelectItem value={option.name}>{option.label}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            )}
                                        </label>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </SheetContent>
        </Sheet>
    </>
};