import React, {Suspense} from "react"
import {cookies, draftMode} from "next/headers";
import {cacheLife, cacheTag} from "next/cache";
import Link from "next/link";
import FlushCache from "@/src/components/flush-cache";
import ToggleDraftMode from "@/src/components/toggle-draft-mode";
import ToggleAuth from "@/src/components/toggle-auth";
import {PHASE_PRODUCTION_BUILD} from "next/dist/shared/lib/constants";


/**
 * Mocks some slow data fetch from a CMS...
 *
 * @param slug
 * @param inDraftMode
 * @param locale
 */
const slowContentFetchFromCMS = async (slug: string, inDraftMode: boolean, locale: string) => {

    // this may take some time
    await new Promise(resolve => setTimeout(resolve, 5_000))

    if (slug === "private") {
        return {
            title: `Private Page (Draft Mode: ${inDraftMode ? "enabled" : "disabled"}) (Locale: ${locale})`,
            content: "This page is private and requires auth checks before rendering",
            contentTimestamp: new Date().toISOString(),
            requiresAuth: true
        }
    }

    return {
        title: `Public Page (Draft Mode: ${inDraftMode ? "enabled" : "disabled"}) (Locale: ${locale})`,
        content: "This page is public and should be cached",
        contentTimestamp: new Date().toISOString(),
        requiresAuth: false,
    }
}

const getCachedPageContent = async (slug: string, inDraftMode: boolean, locale: string) => {
    "use cache"
    cacheTag('page-content', slug)
    cacheLife('hours')
    return await slowContentFetchFromCMS(slug, inDraftMode, locale)
}

const isAuthenticated = async (cmsPageContent: { requiresAuth: boolean }): Promise<boolean> => {


    if (!cmsPageContent.requiresAuth) return true;
    const cookieStore = await cookies()
    return (cookieStore.get('auth-token')?.value === 'some-secret')
}

const RenderCMSPage: React.FC<{ slug: string }> = async ({slug}) => {

    const {isEnabled} = await draftMode();
    const locale = await getLocaleFromCookies();
    const cmsPageContent = await getCachedPageContent(slug, isEnabled, locale)

    return <>
        <h1>{cmsPageContent.title}</h1>
        <p>{cmsPageContent.content}</p>
        <span>{cmsPageContent.contentTimestamp}</span>
        <br/>
        <Link href="/private">Link to a Private Page </Link>
        <br/>
        <Link href="/public">Link to a Public Page </Link>
    </>
}

const getLocaleFromCookies = async () => {

    // fallback to default locale during pre-builds
    if (process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD) return 'en';

    const cookieStore = await cookies()
    return cookieStore.get('locale')?.value ?? 'en';
}


const CMSPageRendering: React.FC<{ params: Promise<{ slug: string }> }> = async ({params}) => {
    const {slug} = await params

    const {isEnabled} = await draftMode();
    const locale = await getLocaleFromCookies();

    console.log(`Render page with slug=${slug} isEnabled=${isEnabled} locale=${locale}`)
    const cmsPageContent = await getCachedPageContent(slug, isEnabled, locale)

    if (!await isAuthenticated(cmsPageContent)) {
        return <>
            <h1>Access Denied</h1>
            <br/>
            <Link href="/public">Link to a Public Page </Link>
        </>
    }

    return <RenderCMSPage slug={slug}/>;

}

const CMSPage: React.FC<{ params: Promise<{ slug: string }> }> = ({params}) => {


    return <>
        <Suspense fallback={<span>Loading CMS Content...</span>}>
            <CMSPageRendering params={params}/>
        </Suspense>
        <br/>
        <br/>
        <Suspense fallback={<span>Loading Client Components...</span>}>
            <FlushCache/>
            <ToggleDraftMode/>
            <ToggleAuth/>
        </Suspense>
    </>
}


// prerender some pages at build time
export const generateStaticParams = () => [{slug: 'public'}, {slug: 'private'}]
export default CMSPage