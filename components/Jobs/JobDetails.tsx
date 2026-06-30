import React from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Typography from '../Typography/Typography';
import { richTextOptions } from '../RichTextOptions/RichTextOptions'


interface RichTextJson {
    json: any;
}

interface JobDetailsProps {
    title: string;
    description: RichTextJson;
}

const JobDetails: React.FC<JobDetailsProps> = ({ title, description }) => {
    const year = "2026";

    return (
        <div className="flex flex-col h-full justify-between">
            <div>
                <div className="flex justify-between items-baseline mb-4 gap-4">
                    <Typography variant='h3'>
                        {title}
                    </Typography>
                    <span className="text-sm font-advisor font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                        {year}
                    </span>
                </div>

                <span className='prose prose-gray max-w-none font-poppins text-gray-600 space-y-4 whitespace-pre-line'>
                    {documentToReactComponents(description.json, richTextOptions)}
                </span>
            </div>
        </div>
    );
};

export default JobDetails;