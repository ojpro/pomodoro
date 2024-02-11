import {Tab, Tabs}       from "@nextui-org/tabs";
import SessionHelper     from "@/helpers/SessionHelper";
import React from "react";

interface TabProps {
    onChange: (type: string) => void;
}

export default function SessionTabs({onChange}: TabProps) {
    const handleSessionChange = (sessionType: React.Key) => {
        onChange(sessionType.toString());
    };

    return (
        <div className="flex flex-wrap gap-4 py-6">
            <Tabs radius='md' aria-label="Switch Sessions" className='mx-auto'
                  onSelectionChange={(key) => handleSessionChange(key)}>
                {Object.keys(SessionHelper.getAllTypes()).map((key) => (
                    <Tab key={key} title={SessionHelper.getAllTypes()[key].name}/>
                ))}
            </Tabs>
        </div>
    );
}