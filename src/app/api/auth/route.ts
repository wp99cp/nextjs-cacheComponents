const POST = async (request: Request): Promise<Response> => {


    const {searchParams} = new URL(request.url);
    const state = searchParams.get('auth-cookie');

    if (!state) {
        return new Response('Bad Request: Missing state parameter', {status: 400});
    }

    if (state === 'set') {
        const response = new Response();
        const token = 'some-secret'; // Replace with actual token generation logic
        response.headers.append('Set-Cookie', `auth-token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=3600`);
        return response;

    } else if (state === 'remove') {
        const response = new Response();
        response.headers.append('Set-Cookie', `auth-token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict`);
        return response;

    } else {
        return new Response('Bad Request: Invalid \'auth-cookie\' parameter. Use "set" or "remove", got "' + state + '"', {status: 400});
    }

}

export {POST};

