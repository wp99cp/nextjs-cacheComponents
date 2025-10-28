/**
 * a simple api route which invalidates a cache entry based on a qery parameter
 */
import {revalidateTag} from 'next/cache'

const POST = async (request: Request): Promise<Response> => {

    const {searchParams} = new URL(request.url);
    const tag = searchParams.get('tag');


    if (!tag || Array.isArray(tag)) {
        return new Response('Bad Request: Missing or invalid tag parameter', {status: 400});
    }

    revalidateTag(tag, "max");
    return new Response(`Cache flushed for tag: ${tag}`, {status: 200});
}

export {POST};

