"use client";

import React from 'react';
import { CheckboxGroup, Checkbox, Card, Divider, CardHeader, CardBody } from '@nextui-org/react';

interface Task {
    id: number;
    task: string;
    completed: boolean;
}

interface TaskProps {
    tasks: Task[];
}

const Task: React.FC<TaskProps> = ({ tasks }) => {
    const [selected, setSelected] = React.useState<string[]>(tasks.filter(task => task.completed).map(task => task.task));

    const handleCheckboxChange = (value: string[]) => {
        setSelected(value);
    };

    return (
        <Card className="w-full max-w-md  p-4 rounded-lg shadow-md border border-gray-300">
            <CardHeader>
                <h3 className="text-lg font-semibold">Your Tasks</h3>
            </CardHeader>
            <CardBody className="p-4">
                <CheckboxGroup

                    color="warning"
                    value={selected}
                    onValueChange={handleCheckboxChange}
                >
                    <Divider />
                    {tasks.map(task => (
                        <div key={task.id} className="mb-2">
                            <Checkbox value={task.task} isSelected={task.completed}>
                                {task.task}
                            </Checkbox>
                        </div>
                    ))}
                </CheckboxGroup>
                <Divider />
                <p className="text-default-500 text-small mt-2">Done: {selected.join(", ")}</p>
            </CardBody>
        </Card>
    );
};

export default Task;
