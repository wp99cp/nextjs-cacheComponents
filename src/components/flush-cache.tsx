'use client'

import {usePathname, useRouter} from 'next/navigation';
import {useState} from 'react';

/**
 * A simple client component which flushes the current page cache by calling an API route
 */
const FlushCache: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname()

    const [isFlushing, setIsFlushing] = useState(false);

    const flushCache = async () => {
        setIsFlushing(true);
        try {
            const response = await fetch(
                '/api/flush-cache?tag=' + encodeURIComponent(pathname), {
                    method: 'POST',
                });
            if (response.ok) {
                console.log(response);
                router.refresh();
            } else {
                console.error('Failed to flush cache');
            }
        } catch (error) {
            console.error('Error flushing cache:', error);
        } finally {
            setIsFlushing(false);
        }
    }

    return (
        <button onClick={flushCache} disabled={isFlushing}>
            {isFlushing ? 'Flushing Cache...' : 'Flush Cache'}
        </button>
    );

}

export default FlushCache;