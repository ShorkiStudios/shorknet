<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" doctype-system="about:legacy-compat" encoding="UTF-8"/>
  <xsl:template match="/rss/channel">
    <html lang="en">
      <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta name="robots" content="noai, noimageai"/>
        <title><xsl:value-of select="title"/> — feed</title>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml"/>
        <link rel="stylesheet" href="/css/style.css"/>
        <style>
          .page { max-width: 720px; margin: 0 auto; padding: 48px 24px 64px; }
          .tag { font-size: 12px; text-transform: uppercase; letter-spacing: 3px; color: #4a7a6e; margin-bottom: 8px; }
          .headline { font-size: 2.4em; font-weight: 700; letter-spacing: -0.03em; line-height: 1.1; margin: 0 0 4px; color: #e0eee8; }
          .headline em { font-style: normal; color: #2dd4bf; }
          .sub { color: #5a8a7e; font-size: 14px; margin: 0 0 32px; }
          .callout { background: #16221e; border: 1px solid #1e2e2a; padding: 20px 24px; margin: 0 0 40px; font-size: 14px; color: #a0beb4; }
          .callout strong { color: #e0eee8; }
          .callout code { background: #0a0d0b; border: 1px solid #1e2e2a; padding: 2px 8px; color: #2dd4bf; font-size: 13px; word-break: break-all; }
          .post { background: #16221e; border: 1px solid #1e2e2a; padding: 20px 24px; margin: 0 0 16px; }
          .post-date { color: #4a7a6e; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; }
          .post h2 { margin: 6px 0 8px; }
          .post p { color: #7aa89c; font-size: 14px; margin: 0; }
          .foot { margin-top: 48px; padding-top: 20px; border-top: 1px solid #162622; font-size: 12px; color: #3a5a52; text-align: center; }
          @media (max-width: 540px) { .page { padding: 28px 16px 48px; } .headline { font-size: 1.6em; } }
        </style>
      </head>
      <body>
        <div class="page">
          <div class="tag">shorknet / rss feed</div>
          <h1 class="headline">shorknet<em>.</em></h1>
          <p class="sub"><xsl:value-of select="description"/></p>

          <div class="callout">
            <strong>hey — this is an RSS feed</strong>, not a regular page.
            paste this address into your feed reader and you'll get new blog
            posts as they land. no account, no algorithm, no spam.<br/><br/>
            <code>https://shorknet.net/feed.xml</code><br/><br/>
            or just head to the <a href="/blog/">blog</a> and read it there.
          </div>

          <xsl:for-each select="item">
            <div class="post">
              <div class="post-date"><xsl:value-of select="pubDate"/></div>
              <h2><a><xsl:attribute name="href"><xsl:value-of select="link"/></xsl:attribute><xsl:value-of select="title"/></a></h2>
              <p><xsl:value-of select="description"/></p>
            </div>
          </xsl:for-each>

          <div class="foot">shorki &#x1F988;<br/>&#x1F6AB;&#x1F916; no bots — human-made site. no scraping, no ai training, no automated harvesting.</div>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
