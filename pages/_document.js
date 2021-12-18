import Document, {Html, Head, Main, NextScript} from 'next/document'
import { ServerStyleSheet } from 'styled-components';
import React from "react";

export default class MyDocument extends Document {
    // static async getInitialProps(ctx) {
    //     const initialProps = await Document.getInitialProps(ctx);
    //     return {...initialProps}
    // }

    static async getInitialProps(ctx) {
        // Step 1: Tạo một instance của ServerStykeSheet
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage
    
        // Step 2: Nhận các styles từ component Page
        const page = ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: App => props => sheet.collectStyles(<App {...props} />),
            });
    
        // Step 3:Trình bày các css ra một thẻ <style />
        const styleTags = sheet.getStyleElement();
        const initialProps = await Document.getInitialProps(ctx);
    
        return { ...page, styleTags, ...initialProps };
    }

    render() {
        return (
            <Html lang="en">
            <Head>
                <link rel="stylesheet" href="/_next/static/style.css"/>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css" />

                {/* Step 5: import thẻ style vào head của html server trả về  */}
                {this.props.styleTags}
            </Head>
            <body className="bg-gray-100">
            <Main/>
            <NextScript/>
            </body>
            </Html>
        )
    }
}