"use client"

import React from 'react';
import { useDocumentInfo, Button} from "@payloadcms/ui";

const CopyUUIDButton: React.FC = () => {
    const { initialData } = useDocumentInfo();

    const copyToClipboard = () => {
        if (initialData?.['eventUuid']) {
            const url = `${process.env.NEXT_PUBLIC_TERRUM_BASE_URL}/events/${initialData?.['eventUuid']}`
            navigator.clipboard.writeText(url)
                .then(() => {
                })
                .catch((err) => {
                    // Show error message
                    console.error('Failed to copy URL: ', err);
                });
        } else {
            console.debug('No UUID available');
        }
    };

    return (
        <Button onClick={copyToClipboard} buttonStyle="primary">
            Copy Event URL
        </Button>
    );
};

export default CopyUUIDButton;