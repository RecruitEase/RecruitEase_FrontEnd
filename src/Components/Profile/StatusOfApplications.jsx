import React from 'react';
import "./StatusOfApplications.css";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const statusClasses = {
    Submitted: 'bg-blue-500',
    Withdrawn: 'bg-yellow-500',
    UnderReview: 'bg-purple-500',
    Shortlist: 'bg-indigo-500',
    InterviewCalled: 'bg-green-500',
    Rejected: 'bg-red-500',
    Selected: 'bg-teal-500'
};
// const statusClasses = {
//     Submitted: 'bg-blue-500',
//     Withdrawn: 'bg-Gray-500',
//     UnderReview: 'bg-yellow-500',
//     Shortlist: 'bg-yellow-500',
//     InterviewCalled: 'bg-green-500',
//     Rejected: 'bg-red-500',
//     Selected: 'bg-teal-500'
// };

const StatusOfApplications = ({ cvStatus }) => {
    return (
        <div className="p-5">
            <div>
                <h2 className="mb-2 text-2xl font-bold">Status of Applications</h2>
                <p className="text-lg">{cvStatus.length} Applications</p>
            </div>
            <br />
            {cvStatus.length === 0 ? (
                <div className="empty">
                    <div className="empty-content"><p>No Applications Found!</p></div>
                </div>

            ) : (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {cvStatus.map((status, index) => (
                        <Card key={index} className="flex w-full max-w-xs mb-4 bg-gray-200 shadow-none">
                            <CardMedia
                                component="img"
                                className="max-w-[120px] h-auto p-4"
                                image={status.imageUrl}
                                alt={status.companyName}
                            />
                            <Box className="flex flex-col">
                                <CardContent className="flex-1 p-4">
                                    <Typography 
                                        component="div" 
                                        variant="h8" 
                                        className={`text-white text-center rounded-lg p-1 ${statusClasses[status.status]}`}
                                    >
                                        {status.status}
                                    </Typography>
                                    <Typography component="div" variant="h7" className="mt-2 font-bold">
                                        {status.position}
                                    </Typography>
                                    <Typography variant="subtitle" color="text.secondary" component="div" className="text-gray-600">
                                        {status.companyName}
                                    </Typography>
                                </CardContent>
                            </Box>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}

export default StatusOfApplications;
