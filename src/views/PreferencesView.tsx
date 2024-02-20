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
import { getSettingsByNames } from "@/lib/utils";
import { setIsPreferencesModalOpen, updateSetting } from "@/states/settings";
import { CategoryUI, SettingsChild } from "@/types/settings";
import { Button } from "@nextui-org/button";
import { Chip } from "@nextui-org/chip";
import { Divider } from "@nextui-org/divider";
import { Input } from "@nextui-org/input";
import { Switch } from "@nextui-org/switch";
import { Tooltip } from "@nextui-org/tooltip";
import { useState } from 'react';

export default function PreferencesView() {
    // states
    const categories: CategoryUI[] = settingsPresentation;
    const [selectedCategory, setSelectedCategory] = useState<CategoryUI>(categories[0]);
    const settings = useAppSelector(state => state.settings.value);
    const isPreferencesModalOpen = useAppSelector(state => state.settings.isPreferencesModalOpen);
    const dispatch = useAppDispatch();

    return <>
        {/* Preferences Modal */}
        <Sheet open={isPreferencesModalOpen} onOpenChange={(value) => dispatch(setIsPreferencesModalOpen(value))}>
            <SheetContent className="min-w-full sm:min-w-[80vw] md:min-w-[70vw] lg:min-w-[60vw] xl:min-w-[50vw] 2xl:min-w-[30vw] rounded-l dark:bg-zinc-900 border-l-zinc-800 px-2 py-2" role="dialog">
                <SheetHeader className="mb-4">
                    <SheetTitle>Preferences</SheetTitle>
                </SheetHeader>
                <div className="flex h-screen my-2">
                    {/* Side Navigation */}
                    <div className="flex flex-col w-max">

                        {/* Side Navigation Categories */}
                        <nav className="flex flex-col gap-2">
                            {categories.map(category => (
                                <Button
                                    key={category.name}
                                    variant={selectedCategory.id == category.id ? 'solid' : 'light'}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`flex flex-row justify-start align-middle gap-3 px-2 md:px-6 py-2 rounded-lg`}
                                >
                                    <category.icon />
                                    <span>{category.name}</span>
                                </Button>
                            ))}
                        </nav>
                    </div>

                    <Divider orientation="vertical" className="mx-2" />

                    {/* Settings Section */}
                    <div className="flex flex-col flex-grow overflow-x-auto">
                        <span className="text-2xl font-semibold mb-4">{selectedCategory.name}</span>
                        {/* Category Settings */}
                        <ul className="space-y-1">
                            {selectedCategory.children?.map(child => {
                                let parentSetting: SettingsChild | undefined = undefined;
                                const currentSetting: SettingsChild | undefined = getSettingsByNames(settings, selectedCategory.name, child.name);

                                if (child.link != undefined) {
                                    parentSetting = getSettingsByNames(settings, selectedCategory.name, child.link);
                                }
                                return (
                                    <li key={currentSetting?.name} className="py-2 px-1">
                                        <Tooltip content={child.description}>
                                            <label className={`flex items-center flex-wrap gap-2 ${!child.available ? 'text-gray-400' : ''}`}>
                                                {!child.hideName && child.name}

                                                {child.type == 'select' && (
                                                    <Select defaultValue={currentSetting?.options[0].name || (child.default as string)} disabled={!child.available} onValueChange={(value) => {
                                                        const selectedOption = child.options?.find(option => option.name == value);
                                                        return dispatch(updateSetting({
                                                            settingId: selectedCategory.id,
                                                            childId: child.id,
                                                            optionName: currentSetting?.options[0].name ?? child.name.toLocaleLowerCase(),
                                                            value: selectedOption,
                                                            updateOption: true,
                                                        }))
                                                    }}>
                                                        <SelectTrigger className="w-2/3 shadow dark:bg-zinc-800">
                                                            <SelectValue placeholder="Background" />
                                                        </SelectTrigger>
                                                        <SelectContent className="dark:bg-zinc-900">
                                                            {child.options?.map(option => (
                                                                <SelectItem key={option.name} value={option.name}>{option.label}</SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                )}

                                            {!child.available && (
                                                <div>
                                                    <Chip size="sm" variant="flat" color="warning" className="mx-2">soon</Chip>
                                                </div>
                                            )}

                                                {child.type == 'switch' && (
                                                    <Switch isDisabled={!child.available} className="ml-auto" defaultSelected={child.default as boolean} isSelected={currentSetting?.options[0].value as boolean} onValueChange={(value) => dispatch(updateSetting({
                                                        settingId: selectedCategory.id,
                                                        childId: child.id,
                                                        optionName: currentSetting?.options[0].name ?? child.name.toLocaleLowerCase(),
                                                        value,
                                                    }))} />
                                                )}

                                                {child.type == 'input' && parentSetting && (
                                                    <div className="flex flex-row gap-2 flex-wrap lg:flex-nowrap">
                                                        {child.options && child.options.map(input => {
                                                            const option: string = (parentSetting?.options[0].value as any)[input.name] as string;
                                                            return (
                                                                <Input
                                                                    isDisabled={!child.available}
                                                                    type="number"
                                                                    key={input.name}
                                                                    label={input.label}
                                                                    placeholder={option}
                                                                    labelPlacement="outside"
                                                                />
                                                            )
                                                        }
                                                        )}
                                                    </div>
                                                )}
                                            </label>
                                        </Tooltip>
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