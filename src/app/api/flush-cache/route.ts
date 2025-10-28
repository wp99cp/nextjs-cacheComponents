/**
 * a simple api route which invalidates a cache entry based on a qery parameter
 */
import {revalidatePath, revalidateTag} from 'next/cache'

const POST = async (request: Request): Promise<Response> => {

    const {searchParams} = new URL(request.url);
    const tag = searchParams.get('tag');


    if (!tag || Array.isArray(tag)) {
        return new Response('Bad Request: Missing or invalid tag parameter', {status: 400});
    }

    const tags = tag.split('/').filter(t => t.trim().length > 0);
    if (tags.length === 0) {
        return new Response('Bad Request: Empty tag parameter', {status: 400});
    }

    console.log(`Flushing cache for tag: ${JSON.stringify(tags)}`);
    tags.forEach(t => revalidateTag(t, {expire: 0}));
    revalidatePath('/');


    return new Response(`Cache flushed for tag: ${tag}`, {status: 200});
}

export {POST};

