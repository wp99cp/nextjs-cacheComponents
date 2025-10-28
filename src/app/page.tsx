import React from "react";
import Link from "next/link";


const Page: React.FC = () => {

    return <>
        <h1>Welcome to the Demo Page</h1>
        <p>This page is rendered statically at build time.</p>

        <h2>Visit some dynamic pages</h2>
        - <Link href='/public'>A public page (pre-rendered)</Link>
        <br/>
        - <Link href='/public-on-visit' >A public page (rendered on first visit, then cached)</Link>
        <br/>
        - <Link href='/private'>A private page</Link>
    </>
}


export default Page