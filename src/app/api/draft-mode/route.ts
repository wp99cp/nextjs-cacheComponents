import {draftMode} from "next/headers";

const POST = async (request: Request): Promise<Response> => {

    const draft = await draftMode()

    const {searchParams} = new URL(request.url);
    const state = searchParams.get('state');

    if (!state) {
        return new Response('Bad Request: Missing state parameter', {status: 400});
    }

    if (state === 'enable') {
        draft.enable()
    } else if (state === 'disable') {
        draft.disable()
    } else {
        return new Response('Bad Request: Invalid state parameter. Use "enable" or "disable", got "' + state + '"', {status: 400});
    }

    return new Response(`Draft mode ${state}d`, {status: 200});

}

export {POST};

