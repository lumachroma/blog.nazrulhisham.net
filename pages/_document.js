import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  /* 
  * Default Custom 'Document' from: https://nextjs.org/docs/advanced-features/custom-document
  */

  /* Not in use */
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx)
  //   return { ...initialProps }
  // }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument